from apps.pyracer.views_api import CodeViewSet

from rest_framework import routers

router = routers.SimpleRouter()
router.register(r"code", CodeViewSet, basename="code")

urlpatterns = router.urls
