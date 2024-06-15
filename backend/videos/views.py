from django.http import JsonResponse
from django.views import View
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.core.files.storage import default_storage
import boto3
from django.conf import settings


@method_decorator(csrf_exempt, name='dispatch')
class FileUploadView(View):

    def post(self, request, *args, **kwargs):
        print(request)
        if 'file' in request.FILES:
            file = request.FILES['file']
            file_name = default_storage.save(file.name, file)
            file_url = default_storage.url(file_name)

            # S3にアップロード
            s3_client = boto3.client(
                's3',
                aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
                aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
                region_name=settings.AWS_S3_REGION_NAME
            )
            response = s3_client.list_objects_v2(
                Bucket=settings.AWS_STORAGE_BUCKET_NAME)
            s3_client.upload_fileobj(
                file, settings.AWS_STORAGE_BUCKET_NAME, file.name)

            return JsonResponse({'message': 'File uploaded successfully!', 'file_url': file_url})
        return JsonResponse({'error': 'Failed to upload file.'}, status=400)
