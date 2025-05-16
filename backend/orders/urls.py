from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import OrderEntryViewSet

router = DefaultRouter()
router.register(r'order-entries', OrderEntryViewSet, basename='orderentry')

urlpatterns = [
    path('', include(router.urls)),
]
