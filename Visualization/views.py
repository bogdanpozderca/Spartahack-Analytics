from django.shortcuts import render
from django.http import HttpResponse, Http404, JsonResponse
from urllib import urlopen
import json

# Create your views here.

def index(request):
	typeFormURL = "https://api.typeform.com/v0/form/Zh7TEH?key=1b508a88a1331cf2c182cb136f6da1ebd880a299&completed=true"
	jsonResults = ""
	for i in urlopen(typeFormURL):
		jsonResults += str(i)
	jsonResults = json.loads(jsonResults)
	keys = {"college":"textfield_4613313"}
	colleges = {}
	for i in jsonResults["responses"]:
		try:
			colleges[i["answers"][keys["college"]]] += 1
		except KeyError:
			colleges[i["answers"][keys["college"]]] = 1
	context = {"colleges":colleges,"warningLim":15, "attentionLim":30}
	return render(request, 'Visualization/index.html', context)