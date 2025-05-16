from django.shortcuts import render
from rest_framework import viewsets
from inventory.models import Inward, Outward
from inventory.serializers import InwardSerializer, OutwardSerializer
# Create your views here.



class InwardViewSet(viewsets.ModelViewSet):
    queryset = Inward.objects.all()
    serializer_class = InwardSerializer

class OutwardViewSet(viewsets.ModelViewSet):
    queryset = Outward.objects.all()
    serializer_class = OutwardSerializer