function sortBy(thing){
	if(thing == "number"){
		window.listOfColleges.sort(function(a, b) { 
		    return b.number - a.number;
		})
	}
	if(thing == 'name'){
		window.listOfColleges.sort(function(a, b){
			if(a.school < b.school) return -1;
			if(a.school > b.school) return 1;
		})
	}
	var strToAdd = "";
	var strToAdd2 ="";
	var rowCount = 0;
	var totalUni = window.listOfColleges.length/2;
	$(window.listOfColleges).each(function(i,e,a){
		if(parseInt(e.number) >14){
			if (rowCount > parseInt(totalUni)){
				strToAdd2 += "<tr><td class = 'school' style='padding-right:15px'><strong>"+e.school+"</strong></td><td class = 'number' style='text-align:right;'><strong>"+e.number+"</strong></td></tr>";
			} else {
				strToAdd += "<tr><td class = 'school' style='padding-right:15px'><strong>"+e.school+"</strong></td><td class = 'number' style='text-align:right;'><strong>"+e.number+"</strong></td></tr>";
			}
			rowCount++;
		} else {
			if (rowCount > parseInt(totalUni)){
				strToAdd2 += "<tr><td class = 'school' style='padding-right:15px'>"+e.school+"</td><td class = 'number' style='text-align:right;'>"+e.number+"</td></tr>";
			} else {
				strToAdd += "<tr><td class = 'school' style='padding-right:15px'>"+e.school+"</td><td class = 'number' style='text-align:right;'>"+e.number+"</td></tr>";
			}
			rowCount++;
		}
	});
	strToAdd2 += "<tr><td class = 'school' style='padding-right:15px'><strong>Total</strong></td><td class = 'number' style='text-align:right;'><strong>"+total+"</strong></td></tr>"
	$("#data").html(strToAdd);
	$("#data2").html(strToAdd2);

}

// chartjs bar graph for gender --------------------------------------
var data = {
    labels: ['Male', 'Female', 'Non-Binary'],
    datasets: [
        {
            label: "Distribution by Gender",
            fillColor: "rgba(69,69,74,1)",
            strokeColor: "rgba(151,187,205,0)",
            highlightFill: "rgba(92,92,97,1)",
            highlightStroke: "rgba(151,187,205,0)",
            data: [male,female,nonbinary]
        }
    ]
};
var ctx = document.getElementById("gender").getContext("2d");
var myBarChart = new Chart(ctx).Bar(data);

// chartjs bar graph for tshirts --------------------------------------
var data = {
    labels: ['S', 'M', 'L', 'XL'],
    datasets: [
        {
            label: "Distribution by T-shirt Size",
            fillColor: "rgba(115,169,220,1)",
            strokeColor: "rgba(151,187,205,0)",
            highlightFill: "rgba(166,204,255,1)",
            highlightStroke: "rgba(151,187,205,0)",
            data: [tshirt[0],tshirt[1],tshirt[2],tshirt[3]]
        }
    ]
};
var ctx = document.getElementById("tshirt").getContext("2d");
var myBarChart = new Chart(ctx).Bar(data);

// chartjs bar graph for year in school --------------------------------------
$(function () {
    $('#schoolYear').highcharts({
        chart: {
            type: 'bar'
        },
        title: {
            text: 'Distribution by Year in School'
        },
        xAxis: {
            categories: ['Freshman', 'Sophomore', 'Junior', 'Senior', '+']
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Total Applicants by Year'
            }
        },
        legend: {
            reversed: true
        },
        plotOptions: {
            series: {
                stacking: 'normal'
            }
        },
        series: [{
            name: 'First Hackathon',
            data: [firstHack[0],firstHack[1],firstHack[2],firstHack[3], firstHack[4]]
        }, {
            name: 'Not First',
            data: [yearSchool[0]-firstHack[0],yearSchool[1]-firstHack[1],yearSchool[2]-firstHack[2],yearSchool[3]-firstHack[3],yearSchool[4]-firstHack[4]]
        }]
    });
});

// chartjs bar graph for year in school --------------------------------------
$(function () {
    $('#mentorYear').highcharts({
        chart: {
            type: 'bar'
        },
        title: {
            text: '% Mentors By Year'
        },
        xAxis: {
            categories: ['Freshman', 'Sophomore', 'Junior', 'Senior', '+']
        },
        yAxis: {
            min: 0,
            title: {
                text: '% Willing to Mentors by Year'
            }
        },
        legend: {
            reversed: true
        },
        plotOptions: {
            series: {
                stacking: 'normal'
            }
        },
        series: [{
            name: 'First Hackathon',
            data: [Math.floor(fHackMentor[0]/yearSchool[0]*10000)/100,Math.floor(fHackMentor[1]/yearSchool[1]*10000)/100,
            	Math.floor(fHackMentor[2]/yearSchool[2]*10000)/100,Math.floor(fHackMentor[3]/yearSchool[3]*10000)/100, 
            	Math.floor(fHackMentor[4]/yearSchool[4]*10000)/100]
        },{
            name: 'Not First',
            data: [Math.floor((mentorTotals[0]-fHackMentor[0])/yearSchool[0]*10000)/100,Math.floor((mentorTotals[1]-fHackMentor[1])/yearSchool[1]*10000)/100,
            	Math.floor((mentorTotals[2]-fHackMentor[2])/yearSchool[2]*10000)/100,Math.floor((mentorTotals[3]-fHackMentor[3])/yearSchool[3]*10000)/100, 
            	Math.floor((mentorTotals[4]-fHackMentor[4])/yearSchool[4]*10000)/100]
        }]
    });
});

$(document).ready(function(){
	sortBy('number');
}); 
