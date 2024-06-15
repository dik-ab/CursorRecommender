FROM python:3.10-slim
ENV PYTHONUNBUFFERED 1

WORKDIR /app

RUN apt-get update && apt-get install -y \
    git \
    && apt-get clean

COPY requirements.txt /app/
RUN pip install -r requirements.txt

COPY . /app
COPY .env .env

ENV DJANGO_SETTINGS_MODULE=voisync.settings

EXPOSE 8000

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
