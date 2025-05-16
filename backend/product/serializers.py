from rest_framework import serializers
from product.models import ProductModel
from stockMangenment.models import Stock

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductModel
        fields = '__all__'

