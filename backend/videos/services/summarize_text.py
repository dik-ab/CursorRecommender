import openai
from django.conf import settings
from videos.prompts.summarize_text_prompt import SUMMARIZE_TEXT_PROMPT


def summarize_text(text):
    openai.api_key = settings.OPENAI_API_KEY
    prompt = SUMMARIZE_TEXT_PROMPT.format(text=text)

    response = openai.chat.completions.create(
        model="gpt-4o",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ],
    )
    return response.choices[0].message.content
