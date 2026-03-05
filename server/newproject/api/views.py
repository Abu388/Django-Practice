from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status  
from .models import Book
from .serilalizer import BookSerilalizer

@api_view(['GET'])
def get_books(request):
    book = Book.objects.all()
    serializedData = BookSerilalizer(book , many = True).data
    return Response(serializedData)


@api_view(['POST'])
def create_books(request):
    data = request.data
    serializedData = BookSerilalizer(data=data)
    if  serializedData.is_valid():
        serializedData.save()
        return Response(serializedData.data , status=status.HTTP_201_CREATED)
    return Response(serializedData.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT', 'DELETE'])
def book_detail(request, pk):
    try:
        book = Book.objects.get(pk = pk)
    except Book.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == 'DELETE':
        book.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    elif request.method == 'PUT':
        data = request.data
        serializedData = BookSerilalizer(book,data=data)
        if  serializedData.is_valid():
            serializedData.save()
        return Response( serializedData.data )
    return Response(serializedData.data, status=status.HTTP_400_BAD_REQUEST)
    

