from django.db import models


class Code(models.Model):
    code_block = models.TextField(blank=True)
