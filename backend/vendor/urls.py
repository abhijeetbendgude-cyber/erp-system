from django.urls import path, include

from rest_framework.routers import DefaultRouter
from vendor.views import VendorViewSet
router= DefaultRouter()
router.register(r'vendors', VendorViewSet)
urlpatterns = [
    path('', include(router.urls)),
]