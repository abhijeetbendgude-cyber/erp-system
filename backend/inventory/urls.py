from django.urls import path, include
from rest_framework.routers import DefaultRouter

from inventory.views import InwardViewSet, OutwardViewSet

router = DefaultRouter()
router.register(r'inward', InwardViewSet)
router.register(r'outward', OutwardViewSet)
urlpatterns = [
    path('', include(router.urls)),
]