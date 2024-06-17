from pinecone import Pinecone
from django.conf import settings
from videos.utils.encryption import Cipher


def create_pinecone_record(key, vector, test_json):
    cipher = Cipher(settings.ENCRYPTION_KEY)
    encrypted_key = cipher.encrypt(key)

    pc = Pinecone(api_key=settings.PINECONE_API_KEY)
    index = pc.Index(name='new-video-matching')
    index.upsert(vectors=[
        {
            'id': encrypted_key,
            'values': vector,
            'metadata': test_json
        }
    ])
