from django.urls import path
from .views import FileUploadView


urlpatterns = [
    path('upload-video/', FileUploadView.as_view(), name='upload_video'),
]
