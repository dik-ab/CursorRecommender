import openai
from django.conf import settings
from videos.prompts.generate_question_prompt import GENERATE_QUESTION_PROMPT


def generate_questions(text):
    openai.api_key = settings.OPENAI_API_KEY
    prompt = GENERATE_QUESTION_PROMPT.format(text=text)

    response = openai.chat.completions.create(
        model="gpt-4o",
        messages=[
            {
              "role": "user",
                "content": prompt
            }
        ]
    )

    return response.choices[0].message.content
