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

	expansion = {
		u"msu":u'michigan state university', 
		u'um': u'university of michigan', 
		u"umich":u'university of michigan', 
		u'university of michigan ann arbor': u'university of michigan'
	}

	colleges = {}
	for i in jsonResults["responses"]:
		college = i["answers"][keys["college"]].lower()
		college.replace(',',' ')
		college.replace('-',' ')
		college.replace(' - ',' ')
		college.replace(r'[ ]{2,}', ' ')
		if(college in expansion.keys()):
			college = expansion[college]
		try:
			colleges[college] += 1
		except KeyError:
			colleges[college] = 1
	context = {"colleges":colleges,"warningLim":15, "attentionLim":30}
	return render(request, 'Visualization/index.html', context)