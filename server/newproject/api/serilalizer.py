from rest_framework import serializers
from .models import Book  # 1. Make sure you import your model

class BookSerilalizer(serializers.ModelSerializer):
    class Meta:
        model = Book      # 2. Tell the serializer which model to use
        fields = '__all__' # 3. Tell it which fields to include