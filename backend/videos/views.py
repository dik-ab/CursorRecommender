import logging
import os
from django.http import JsonResponse
from django.views import View
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.core.files.storage import default_storage
from asgiref.sync import sync_to_async
import boto3
import json
import datetime
from django.conf import settings
from videos.services.summarize_text import summarize_text
from videos.services.generate_questions import generate_questions
from videos.services.convert_string_to_vector import convert_string_to_vector
from videos.services.upload_to_pinecone import create_pinecone_record
from videos.utils.video_to_text import video_to_text

logger = logging.getLogger(__name__)


@method_decorator(csrf_exempt, name='dispatch')
class FileUploadView(View):

    async def post(self, request, *args, **kwargs):
        if 'file' in request.FILES:
            file = request.FILES['file']
            current_time = datetime.datetime.now().strftime('%Y%m%d%H%M%S%f')
            try:
                file_path = default_storage.save(f'tmp/{file.name}', file)
                file_url = default_storage.url(file_path)
                s3_key = f"{current_time}_{file.name}"

                # S3にアップロード
                s3_client = boto3.client(
                    's3',
                    aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
                    aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
                    region_name=settings.AWS_S3_REGION_NAME
                )
                await sync_to_async(s3_client.upload_fileobj)(
                    file, settings.AWS_STORAGE_BUCKET_NAME, s3_key)

                # 音声抽出と文字変換処理
                text = await video_to_text(file_path)
                if text is None:
                    logger.error(
                        f'Failed to transcribe audio for file: {file_path}')
                    return JsonResponse({'error': 'Failed to transcribe audio!'}, status=500)

                summary = summarize_text(text)
                questions = generate_questions(summary)

                summary_json = json.loads(summary)
                questions_json = json.loads(questions)

                conbined_json = {**summary_json, **questions_json}
                json_text = json.dumps(conbined_json, ensure_ascii=False)
                questions_dict = questions_json["questions"]

                vector = convert_string_to_vector(json_text)

                create_pinecone_record(s3_key, vector, questions_dict)

                return JsonResponse({'message': 'File uploaded and transcribed successfully!', 'file_url': file_url, 'text': text})
            except Exception as e:
                logger.error(
                    f'An error occurred during file upload and processing: {str(e)}')
                return JsonResponse({'error': 'An internal server error occurred. Please try again later.'}, status=500)
            finally:
                # 一時ファイルを削除
                if default_storage.exists(file_path):
                    default_storage.delete(file_path)

            return JsonResponse({'error': 'Failed to upload file.'}, status=400)
