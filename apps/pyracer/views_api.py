import random
from random import randint

from apps.pyracer.models import Code
from apps.pyracer.serializers import CodeSerializer

from rest_framework import mixins
from rest_framework.viewsets import GenericViewSet, ModelViewSet


class CodeViewSet(
    GenericViewSet,
    mixins.ListModelMixin,
    mixins.CreateModelMixin,
    mixins.RetrieveModelMixin,
    mixins.UpdateModelMixin,
    mixins.DestroyModelMixin,
):
    serializer_class = CodeSerializer

    def get_queryset(self):
        qs = Code.objects.all()
        exclude_ids = self.request.query_params.getlist("exclude[]", [])
        if exclude_ids:
            qs = qs.exclude(id__in=exclude_ids)

        if qs:
            random_index = randint(0, qs.count() - 1)
            return qs[random_index:random_index+1]
        else:
            return qs
