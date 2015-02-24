from django.shortcuts import render
from django.http import HttpResponse, Http404, JsonResponse
from urllib import urlopen
import json
import sys

# Create your views here.

def index(request):
	typeFormURL = "https://api.typeform.com/v0/form/Zh7TEH?key=1b508a88a1331cf2c182cb136f6da1ebd880a299&completed=true"
	jsonResults = ""
	for i in urlopen(typeFormURL):
		jsonResults += str(i)
	jsonResults = json.loads(jsonResults)
	keys = {"college":"textfield_4613313"}

	colleges = {}
	total = 0
	for i in jsonResults["responses"]:
		college = i["answers"][keys["college"]].lower()
		college = college.replace(', ',' ')
		college = college.replace(' - ',' ')
		college = college.replace('-',' ')
		college = college.replace(' at ',' ')
		college = college.replace('  ',' ')

		college = college.replace('high school','highschool')
		college = college.replace('high schooler','highschool')
		college = college.replace('highschooler','highschool')
		if 'highschool' in college:
			college = 'highschool'
		college = college.replace('havard','harvard university')	#one off fix
		college = college.replace('technolog','technology')			#one off fix
		college = college.replace('technologyy','technology')		#one off fix
		college = college.replace('the ohio','ohio')				#fuck that
		college = college.replace('the ','')						#additional fuck that
		college = college.replace('msu','michigan state university')
		college = college.replace('um\n','university of michigan')
		college = college.replace('umich','university of michigan')
		college = college.replace('university of michigan ann arbor','university of michigan')
		college = college.replace(' ann arbor','')
		college = college.rstrip().strip()
		try:
			colleges[college] += 1
			total += 1
		except KeyError:
			colleges[college] = 1
	context = {"colleges":colleges, "total": total}
	return render(request, 'Visualization/index.html', context)

