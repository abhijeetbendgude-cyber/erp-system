from rest_framework import serializers
from inventory.models import Inward,Outward

class InwardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Inward
        fields = '__all__'

class OutwardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Outward
        fields = '__all__'