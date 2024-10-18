from django.db import models

# Create your models here.

class Email:
    link: str
    content: str
    type: str
