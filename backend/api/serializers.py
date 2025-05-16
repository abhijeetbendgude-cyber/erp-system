from rest_framework import serializers
from .models import Vendor, Material, PurchaseOrder, POItem, Inward, Outward

class VendorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vendor
        fields = '__all__'

class MaterialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Material
        fields = '__all__'

class PurchaseOrderSerializer(serializers.ModelSerializer):
    # vendor_name is now a read-only field, but it's tied to the Vendor's name
    vendor_name = serializers.CharField(source='Vendor.name', read_only=True)
    vendor_id = serializers.PrimaryKeyRelatedField(queryset=Vendor.objects.all(), source='Vendor', write_only=True)

    class Meta:
        model = PurchaseOrder
        fields = ['id', 'po_number', 'vendor_name', 'vendor_id', 'created_at', 'expected_delivery']

class POItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = POItem
        fields = '__all__'

class InwardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Inward
        fields = '__all__'

class OutwardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Outward
        fields = '__all__'
        