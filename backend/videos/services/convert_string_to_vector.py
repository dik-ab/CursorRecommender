from openai import OpenAI
from django.conf import settings


client = OpenAI()


def convert_string_to_vector(input):
    print('convert started')
    response = client.embeddings.create(
        model='text-embedding-3-large',
        input=[input]
    )
    return response.data[0].embedding
