from django.shortcuts import render
from django.http import HttpResponse, Http404, JsonResponse

# Create your views here.

def index(request):
	context = {}
	return render(request, 'Visualization/index.html', context)