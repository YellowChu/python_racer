from rest_framework import serializers

from apps.pyracer.models import Code


class CodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Code
        fields = ["id", "code_block"]
