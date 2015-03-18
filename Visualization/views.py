from django.shortcuts import render
from django.http import HttpResponse, Http404, JsonResponse
from urllib import urlopen
import json

# Create your views here.
typeFormURL = "https://api.typeform.com/v0/form/Zh7TEH?key=1b508a88a1331cf2c182cb136f6da1ebd880a299&completed=true"
typeFormRSVP_URL = "https://api.typeform.com/v0/form/SN2HyF?key=1b508a88a1331cf2c182cb136f6da1ebd880a299&completed=true"
jsonResults = ""
jsonRSVP_Results = ""

for i in urlopen(typeFormURL):
	jsonResults += str(i)
jsonResults = json.loads(jsonResults)

for i in urlopen(typeFormRSVP_URL):
	jsonRSVP_Results += str(i)
jsonRSVP_Results = json.loads(jsonRSVP_Results)

keys = {
	"Name": "textfield_4613064",
	"Email": "email_4613164",
	"Phone Number": "textfield_4613168",
	"Gender identity": "list_4613175_choice",
	"Month" : "number_4613245",
	"Day": "number_4613259",
	"Year": "number_4613260", 
	"T-Shirt size": "list_4613276_choice",
	"Where are you traveling from?": "textfield_4613285", 
	"What university do you currently attend?": "textfield_4613313", 
	"What is your major of study?": "textfield_4613318", 
	"Year in school": "list_4613345_choice", 
	"GitHub": "website_4613414",
	"LinkedIn": "website_4613464",
	"Personal Website": "website_4613469", 
	"Another cool link?": "website_4613471", 
	"Will this be your first hackathon?": "yesno_4613474", 
	"If no what other hackathons have you attended?": "textarea_4613558", 
	"Are you willing to mentor?": "yesno_4613478", 
	"Technologies you're comfortable with": "list_4613658_choice_5343749",
	"Technologies you're comfortable with 1": "list_4613658_choice_5343750", 
	"Technologies you're comfortable with 2": "list_4613658_choice_5343751", 
	"Technologies you're comfortable with 3": "list_4613658_choice_5343752", 
	"Technologies you're comfortable with 4": "list_4613658_choice_5343753", 
	"Technologies you're comfortable with 5": "list_4613658_choice_5343754", 
	"Technologies you're comfortable with 6": "list_4613658_choice_5343755", 
	"Technologies you're comfortable with 7": "list_4613658_choice_5343756", 
	"Technologies you're comfortable with 8": "list_4613658_choice_5343757", 
	"Technologies you're comfortable with 9": "list_4613658_choice_5343758", 
	"Technologies you're comfortable with 10": "list_4613658_choice_5343759", 
	"Technologies you're comfortable with 11": "list_4613658_choice_5343760", 
	"Technologies you're comfortable with 12": "list_4613658_choice_5343761", 
	"Technologies you're comfortable with 13": "list_4613658_choice_5343762", 
	"Technologies you're comfortable with 14": "list_4613658_choice_5343763", 
	"Technologies you're comfortable with 15": "list_4613658_choice_5343764",
	"Technologies you're comfortable with 16": "list_4613658_choice_5343765", 
	"Technologies you're comfortable with 17": "list_4613658_choice_5343766", 
	"Technologies you're comfortable with 18": "list_4613658_choice_5343767", 
	"Technologies you're comfortable with 19": "list_4613658_choice_5343768", 
	"Technologies you're comfortable with 20": "list_4613658_choice_5343769", 
	"Technologies you're comfortable with 21": "list_4613658_choice_5343770", 
	"Technologies you're comfortable with 22": "list_4613658_choice_5343771", 
	"Technologies you're comfortable with 23": "list_4613658_choice_5343772", 
	"Technologies you're comfortable with 24": "list_4613658_choice_5343773", 
	"Technologies you're comfortable with 25": "list_4613658_choice_5343774", 
	"Is there any hardware you'd like to hack on?": "list_4613747_choice_5343880",
	"Is there any hardware you'd like to hack on? 1": "list_4613747_choice_5343881", 
	"Is there any hardware you'd like to hack on? 2": "list_4613747_choice_5343882",
	"Is there any hardware you'd like to hack on? 3": "list_4613747_choice_5343883", 
	"Is there any hardware you'd like to hack on? 4": "list_4613747_choice_5343884", 
	"Is there any hardware you'd like to hack on? 5": "list_4613747_choice_5343885", 
	"Is there any hardware you'd like to hack on? 6": "list_4613747_choice_5343886", 
	"Is there any hardware you'd like to hack on? 7": "list_4613747_choice_5343887", 
	"Is there any hardware you'd like to hack on? 8": "list_4613747_choice_5343888", 
	"Is there any other hardware you'd like to see at SpartaHack": "textarea_4613781", 
	"Link and/or description of your favorite project": "textarea_4613788", 
	"Do you need travel reimbursement to attend?": "yesno_4613836", 
	"Do you have an dietary restrictions we should be prepared to accommodate?": "textarea_4613853", 
	"Will you require any special accommodations?": "textarea_4613879", 
	"Please list the emails of any teammates you are applying with": "textarea_4613955"
}

keys2 = {
	"First Name": "textfield_5368846",
	"Last Name": "textfield_5368849",
	"Email": "email_5369105",
	"Transportation?": "list_5368858_choice",
	"Month" : "number_4613245",
	"Where are you traveling from?": "textfield_5368898",
	"Hacker Code of Conduct": "terms_5369089"
}

def index(request):

	sites = [0,0,0,0];
	sitesYear = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]]

	def getSites(i,r):
		#for links given
		github = i["answers"][keys["GitHub"]]
		github = github.replace('https://','http://')
		github = github.replace('http://','')
		github = github.replace('github.com','www.github.com')
		github = github.replace('www.github.com/','')
		if len(github):
			sites[0] +=1
			sitesYear[r][0] +=1

		linkedIn = i["answers"][keys["LinkedIn"]]
		linkedIn = linkedIn.replace('https://','http://')
		linkedIn = linkedIn.replace('http://','')
		linkedIn = linkedIn.replace('linkedin.com','www.linkedin.com')
		linkedIn = linkedIn.replace('www.linkedin.com/in','')
		linkedIn = linkedIn.replace('www.linkedin.com/ln','')
		linkedIn = linkedIn.replace('www.linkedin.com/','')
		
		if len(linkedIn):
			sites[1] +=1
			sitesYear[r][1] +=1

		personal = i["answers"][keys["Personal Website"]]
		personal = personal.replace('https://','http://')
		personal = personal.replace('http://','')
		if len(personal):
			sites[2] +=1
			sitesYear[r][2] +=1

		other = i["answers"][keys["Another cool link?"]]
		other = other.replace('https://','http://')
		other = other.replace('http://','')
		if len(other):
			sites[3] +=1
			sitesYear[r][3] +=1
		return



	# college totals
	colleges = {}

	#birth month
	months = {'1':0,'2':0,'3':0,'4':0,'5':0,'6':0,'7':0,'8':0,'9':0,'10':0,'11':0,'12':0}
	
	#distribution by age
	years = []

	youngest = [0,0,0]
	oldest = [12,31,9999]

	#rate of applications
	dayCounts = {}

	tshirt = [0,0,0,0]
	yearSchool = [0,0,0,0,0]
	firstHack = [0,0,0,0,0,0]
	mentorTotals = [0,0,0,0,0]
	firstHackMentor = [0,0,0,0,0]


	sampleArray=[];

	total = 0
	for i in jsonResults["responses"]:
		total += 1

		#for year in school
		if i["answers"][keys["Year in school"]] == 'First Year':
			yearSchool[0] +=1
			getSites(i,0)
			if i["answers"][keys["Are you willing to mentor?"]] == '1':
				mentorTotals[0] +=1
			if i["answers"][keys["Will this be your first hackathon?"]] == '1':
				firstHack[0] +=1
				firstHack[5] +=1
				if i["answers"][keys["Are you willing to mentor?"]] == '1':
					firstHackMentor[0] +=1
		elif i["answers"][keys["Year in school"]] == 'Second Year':
			yearSchool[1] +=1
			getSites(i,1)
			if i["answers"][keys["Are you willing to mentor?"]] == '1':
				mentorTotals[1] +=1
			if i["answers"][keys["Will this be your first hackathon?"]] == '1':
				firstHack[1] +=1
				firstHack[5] +=1
				if i["answers"][keys["Are you willing to mentor?"]] == '1':
					firstHackMentor[1] +=1
		elif i["answers"][keys["Year in school"]] == 'Third Year':
			yearSchool[2] +=1
			getSites(i,2)
			if i["answers"][keys["Are you willing to mentor?"]] == '1':
				mentorTotals[2] +=1
			if i["answers"][keys["Will this be your first hackathon?"]] == '1':
				firstHack[2] +=1
				firstHack[5] +=1
				if i["answers"][keys["Are you willing to mentor?"]] == '1':
					firstHackMentor[2] +=1
		elif i["answers"][keys["Year in school"]] == 'Fourth Year':
			yearSchool[3] +=1
			getSites(i,3)
			if i["answers"][keys["Are you willing to mentor?"]] == '1':
				mentorTotals[3] +=1
			if i["answers"][keys["Will this be your first hackathon?"]] == '1':
				firstHack[3] +=1
				firstHack[5] +=1
				if i["answers"][keys["Are you willing to mentor?"]] == '1':
					firstHackMentor[3] +=1
		elif i["answers"][keys["Year in school"]] == 'Fifth+ Year':
			yearSchool[4] +=1
			getSites(i,4)
			if i["answers"][keys["Are you willing to mentor?"]] == '1':
				mentorTotals[4] +=1
			if i["answers"][keys["Will this be your first hackathon?"]] == '1':
				firstHack[4] +=1
				firstHack[5] +=1
				if i["answers"][keys["Are you willing to mentor?"]] == '1':
					firstHackMentor[4] +=1

		#for tshirt sizes
		if i["answers"][keys["T-Shirt size"]] == 'S':
			tshirt[0] +=1
		elif i["answers"][keys["T-Shirt size"]] == 'M':
			tshirt[1] +=1
		elif i["answers"][keys["T-Shirt size"]] == 'L':
			tshirt[2] +=1
		elif i["answers"][keys["T-Shirt size"]] == 'XL':
			tshirt[3] +=1

		#for distribution by birth month
		months[i["answers"][keys["Month"]]] += 1;


		#find oldest and youngest
		if int(i["answers"][keys["Year"]]) < 100:
			i["answers"][keys["Year"]] = '19' + i["answers"][keys["Year"]];

		years.append(int(i["answers"][keys["Year"]]))

		if int(i["answers"][keys["Year"]]) <= oldest[2]:
			oldest[2] = int(i["answers"][keys["Year"]])
			if int(i["answers"][keys["Month"]]) <= oldest[1]:
				oldest[1] = int(i["answers"][keys["Month"]])
				if int(i["answers"][keys["Day"]]) <= oldest[0]:
					oldest[0] = int(i["answers"][keys["Day"]])
		
		if int(i["answers"][keys["Year"]]) >= youngest[2]:
			youngest[2] = int(i["answers"][keys["Year"]])
			if int(i["answers"][keys["Month"]]) >= youngest[1]:
				youngest[1] = int(i["answers"][keys["Month"]])
				if int(i["answers"][keys["Day"]]) >= youngest[0]:
					youngest[0] = int(i["answers"][keys["Day"]])

		college = i["answers"][keys["What university do you currently attend?"]].lower()
		college = college.replace(', ',' ')
		college = college.replace(' - ',' ')
		college = college.replace('-',' ')
		college = college.replace(' at ',' ')
		college = college.replace(' in ',' ')
		college = college.replace('  ',' ')

		college = college.replace('highschool','high school')
		college = college.replace('high schooler','high school')
		college = college.replace('highschooler','high school')
		college = college.replace('international academy east (hs)','high school') 
		college = college.replace('north hills','high school') 
		college = college.replace('still in hs','high school')
		college = college.replace('still hs','high school')
		if 'high school' in college:
			college = 'high school'
		if 'vincent massey' in college:
			college = 'high school'
		if college == 'na':
			college = 'high school'
		college = college.replace('na\n','Not Applicable')
		college = college.replace('rutgers new brunswick','rutgers university')
		if college == 'michigan tech':
			college = 'michigan technological university'
		college = college.replace('michigan technological institute','michigan technological university')    #one off fix
		college = college.replace('depaul university chicago','depaul university') #one off fix
		college = college.replace('havard','harvard university')		#one off fix
		college = college.replace('technolog','technology')				#one off fix
		college = college.replace('technologyy','technology')			#one off fix
		college = college.replace('technologyical','technological')		#one off fix
		college = college.replace('the ohio','ohio')					#fuck that
		college = college.replace('the ','')							#additional fuck that
		college = college.replace('purdue','purdue university')
		college = college.replace('u of','university of')
		college = college.replace('michigan state','michigan state university')
		college = college.replace('msu','michigan state university')
		college = college.replace('um\n','university of michigan')
		college = college.replace('umich','university of michigan')
		if college == 'michigan':
			college = 'university of michigan'
		college = college.replace('university of michigan ann arbor','university of michigan')
		college = college.replace('university university','university')
		college = college.replace(' ann arbor','')
		college = college.rstrip().strip()
		try:
			colleges[college] += 1
		except KeyError:
			colleges[college] = 1

		dateTime = i['metadata']['date_submit'].split()
		date = dateTime[0]
		timeList = dateTime[1].split(':')
		hour = timeList[0]
		gender = i["answers"][keys["Gender identity"]];

		if date in dayCounts.keys():
			dayCounts[date][hour][0] +=1
			if gender == 'Male':
				dayCounts[date][hour][1] +=1
			elif gender == 'Female':
				dayCounts[date][hour][2] +=1
			else:
				dayCounts[date][hour][3] +=1
		else: 
			dayCounts[date]={'00':[0,0,0,0], '01':[0,0,0,0], '02':[0,0,0,0], '03':[0,0,0,0], '04':[0,0,0,0], 
							'05':[0,0,0,0], '06':[0,0,0,0], '07':[0,0,0,0], '08':[0,0,0,0], '09':[0,0,0,0], 
							'10':[0,0,0,0], '11':[0,0,0,0], '12':[0,0,0,0], '13':[0,0,0,0], '14':[0,0,0,0],
							'15':[0,0,0,0], '16':[0,0,0,0], '17':[0,0,0,0], '18':[0,0,0,0], '19':[0,0,0,0], 
							'20':[0,0,0,0], '21':[0,0,0,0], '22':[0,0,0,0], '23':[0,0,0,0]}
			dayCounts[date][hour][0] += 1
			if gender == 'Male':
				dayCounts[date][hour][1] +=1
			elif gender == 'Female':
				dayCounts[date][hour][2] +=1
			else:
				dayCounts[date][hour][3] +=1

	oldest = json.dumps(oldest)
	youngest = json.dumps(youngest)
	years = json.dumps(years)
	context = {"colleges":colleges, "total": total, "months": months, 'years':years, 'oldest':oldest, 
		'youngest': youngest, 'dayCounts': json.dumps(dayCounts), 'tshirt': json.dumps(tshirt), 
		'yearSchool': json.dumps(yearSchool),'firstHack': json.dumps(firstHack),'sites': json.dumps(sites),
		'sitesYear': json.dumps(sitesYear), 'mentorTotals': json.dumps(mentorTotals),'fHackMentor': json.dumps(firstHackMentor)}
	return render(request, 'Visualization/index.html', context)

def table(request):
	tableResults= []

	for i in jsonResults["responses"]:
		row = {}
		for question in keys.keys():
			row[question] = i["answers"][keys[question]]

		tableResults.append(row);




	context = {'tableResults': json.dumps(tableResults)}
	return render(request, 'Visualization/table.html', context)

def rsvp(request):
	# college totals
	colleges = {}

	total = 0

	#find fake rsvps
	everyone = []
	matched= []

	#for gender distribution
	male =0
	female =0
	other =0

	tshirt = [0,0,0,0]

	for h in jsonRSVP_Results["responses"]:
		name = h["answers"][keys2["First Name"]] + " " + h["answers"][keys2["Last Name"]]
		name = name.replace('  ', ' ')
		email = h["answers"][keys2["Email"]]
		everyone.append({'name':name,'email':email})
		for i in jsonResults["responses"]:
			if name == i["answers"][keys["Name"]] or email == i["answers"][keys["Email"]]:
				total +=1

				#for tshirt sizes
				if i["answers"][keys["T-Shirt size"]] == 'S':
					tshirt[0] +=1
				elif i["answers"][keys["T-Shirt size"]] == 'M':
					tshirt[1] +=1
				elif i["answers"][keys["T-Shirt size"]] == 'L':
					tshirt[2] +=1
				elif i["answers"][keys["T-Shirt size"]] == 'XL':
					tshirt[3] +=1




				college = i["answers"][keys["What university do you currently attend?"]].lower()
				college = college.replace(', ',' ')
				college = college.replace(' - ',' ')
				college = college.replace('-',' ')
				college = college.replace(' at ',' ')
				college = college.replace(' in ',' ')
				college = college.replace('  ',' ')

				college = college.replace('highschool','high school')
				college = college.replace('high schooler','high school')
				college = college.replace('highschooler','high school')
				college = college.replace('international academy east (hs)','high school') 
				college = college.replace('north hills','high school') 
				college = college.replace('still in hs','high school')
				college = college.replace('still hs','high school')
				if 'high school' in college:
					college = 'high school'
				if 'vincent massey' in college:
					college = 'high school'
				if college == 'na':
					college = 'high school'
				college = college.replace('na\n','Not Applicable')
				college = college.replace('rutgers new brunswick','rutgers university')
				if college == 'michigan tech':
					college = 'michigan technological university'
				college = college.replace('michigan technological institute','michigan technological university')    #one off fix
				college = college.replace('depaul university chicago','depaul university') #one off fix
				college = college.replace('havard','harvard university')		#one off fix
				college = college.replace('technolog','technology')				#one off fix
				college = college.replace('technologyy','technology')			#one off fix
				college = college.replace('technologyical','technological')		#one off fix
				college = college.replace('the ohio','ohio')					#fuck that
				college = college.replace('the ','')							#additional fuck that
				college = college.replace('purdue','purdue university')
				college = college.replace('u of','university of')
				college = college.replace('michigan state','michigan state university')
				college = college.replace('msu','michigan state university')
				college = college.replace('um\n','university of michigan')
				college = college.replace('umich','university of michigan')
				if college == 'michigan':
					college = 'university of michigan'
				college = college.replace('university of michigan ann arbor','university of michigan')
				college = college.replace('university university','university')
				college = college.replace(' ann arbor','')
				college = college.rstrip().strip()
				try:
					colleges[college] += 1
				except KeyError:
					colleges[college] = 1

				matched.append({'name':name,'email':email})

				gender = i["answers"][keys["Gender identity"]];
				if gender == 'Male':
					male +=1
				elif gender == 'Female':
					female +=1
				else:
					other +=1

	for x in matched:
		for y in everyone:
			if x['name'] == y['name'] or x['email'] == y['email']:
				everyone.remove(y)

	
	
	
	
	
	
	context = {"colleges":colleges, "total": total, "unmatched": json.dumps(everyone), 'male':male,'female':female,"other":other, 'tshirt': json.dumps(tshirt)}
	return render(request, 'Visualization/rsvp.html', context)




