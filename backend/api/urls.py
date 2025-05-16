from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    VendorViewSet,
    MaterialViewSet,
    PurchaseOrderViewSet,
    POItemViewSet,
    InwardViewSet,
    OutwardViewSet,
)

router = DefaultRouter()
router.register(r'vendors', VendorViewSet)
router.register(r'materials', MaterialViewSet)
router.register(r'purchase-orders', PurchaseOrderViewSet)
router.register(r'po-items', POItemViewSet)
router.register(r'inwards', InwardViewSet)
router.register(r'outwards', OutwardViewSet)

urlpatterns = [
    path('', include(router.urls)),
]