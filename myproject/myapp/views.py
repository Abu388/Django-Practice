from django.shortcuts import render

# Create your views here.

from django.http import HttpResponse

def index(request):
    return render(request, 'index.html')

def counter(request):
    words = request.GET['words']
    context = {
        'name' : 'BOB',
        'total_words' : len(words.split())
    }
    return render(request, "counter.html",  context )