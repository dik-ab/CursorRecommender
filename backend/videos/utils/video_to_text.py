import os
import whisper
import tempfile
import asyncio
import ffmpeg
from moviepy.editor import VideoFileClip


async def video_to_text(tmp_file_path):
    model = whisper.load_model("tiny")
    tmp_audio_path = 'tmp/test_audio.mp3'
    try:
        # MP4ファイルから音声を抽出
        video = await asyncio.to_thread(VideoFileClip, tmp_file_path)
        if video is None:
            raise ValueError(f"Failed to load video file: {tmp_file_path}")
        print(f"Loaded video file: {video}")
        await asyncio.to_thread(video.audio.write_audiofile, tmp_audio_path)

        # 音声から文字を抽出
        print("text generating...")
        result = model.transcribe(tmp_audio_path)
        text = result['text']
    except Exception as e:
        print(f"Error processing video to text: {e}")
        text = None
    finally:
        if os.path.exists(tmp_audio_path):
            os.remove(tmp_audio_path)
    return text
