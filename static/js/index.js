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





// chartjs bar graph for birth months --------------------------------------
var data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    datasets: [
        {
            label: "Distribution by Birth Month",
            fillColor: "rgba(115,169,220,1)",
            strokeColor: "rgba(151,187,205,0)",
            highlightFill: "rgba(166,204,255,1)",
            highlightStroke: "rgba(151,187,205,0)",
            data: [months[0][1], months[1][1], months[2][1], months[3][1], months[4][1], months[5][1], months[6][1], months[7][1], months[8][1], months[9][1], months[10][1], months[11][1]]
        }
    ]
};
var ctx = document.getElementById("myChart").getContext("2d");
var myBarChart = new Chart(ctx).Bar(data);


//format oldest and youngest -----------------------------------------------
$('#old').html('The oldest attendee was born on '+oldest[0]+'/'+oldest[1]+'/'+oldest[2]);
$('#young').html('The youngest attendee was born on '+youngest[0]+'/'+youngest[1]+'/'+youngest[2]);


//#distribution by age -----------------------------------------------------
years.sort(function(a, b) { 
	return b - a;
})

yearsObj = {}
//counts all the years
for(i=0;i<years.length;i++){
	if(!yearsObj[years[i]]){
		yearsObj[years[i]] = 1;
	} else {
		yearsObj[years[i]]++;
	}
}

yearsArray = Object.keys(yearsObj);
CurrentYear = new Date().getFullYear();
ageArray = [];
countArray = [];
for(i=0;i<yearsArray.length;i++){
	ageArray.push(CurrentYear - yearsArray[i]);
	countArray.push(yearsObj[yearsArray[i]]);
}

var data2 = {
    labels: ageArray.reverse(),
    datasets: [
        {
            label: "Distribution by Age",
            fillColor: "rgba(69,69,74,1)",
            strokeColor: "rgba(151,187,205,0)",
            highlightFill: "rgba(92,92,97,1)",
            highlightStroke: "rgba(151,187,205,0)",
            data: countArray.reverse()
        }
    ]
};
var ctx = document.getElementById("ageChart").getContext("2d");
var myBarChart2 = new Chart(ctx).Bar(data2);


//#rate of applications -----------------------------------------------------
var colors = d3.scale.category20();
var keyColor = function(d, i) {return colors(d.key)};

function chartConfig(container, data, useGuideline) {
  	if (useGuideline === undefined) useGuideline = true;
		nv.addGraph(function() {
		    var chart;
		    chart = nv.models.stackedAreaChart()
		                  .useInteractiveGuideline(true)
		                  .x(function(d) { return d[0] })
		                  .y(function(d) { return d[1] });
		 

		    chart.xAxis
		        .tickFormat(function(d) { return d3.time.format('%d-%a:%I%p')(new Date(d)) });

		    chart.yAxis
		        .tickFormat(d3.format('.2g'));

		    d3.select('#' + container + ' svg')
		          .datum(data)
		        .transition().duration(500).call(chart)

		    nv.utils.windowResize(chart.update);

		    return chart;
	});
}

//formating of data from server for app rate chart and bargraph, and gender bar graph
d3GraphObj =[{"key" : "Applicants" , "values" : []}]
maleTotal = 0;
femaleTotal = 0;
elseTotal = 0;
$.each(dayCounts, function(index, value) {              //index:day value:hour obj
	$.each(value, function(index2, value2) {			//index2:hour value2: count
		dateTime = index+'T'+index2+':00:00';
		dateUTC = Date.parse(new Date(dateTime));
		d3GraphObj[0]["values"].push([dateUTC,value2[1]+value2[2]+value2[3]]);
		maleTotal += value2[1];
		femaleTotal += value2[2];
		elseTotal += value2[3];
	}); 
}); 

for(i=0;i<d3GraphObj.length;i++){
	d3GraphObj[i]['values'].sort(function(a, b) { 
		return a[0] - b[0];
	})
}

appRate = total/dayCounts.length;
console.log("Daily Rate of Applicants = " + total/Object.keys(dayCounts).length);

chartConfig("applyChart", d3GraphObj); 

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
            data: [maleTotal,femaleTotal,elseTotal]
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

// chartjs bar graph for sites by year --------------------------------------
var data = {
    labels: ['Freshman', 'Sophomore', 'Junior', 'Senior', '+'],
    datasets: [
        {
            label: "GitHub",
            fillColor: "rgba(115,169,220,1)",
            strokeColor: "rgba(151,187,205,0)",
            highlightFill: "rgba(115,169,220,0.8)",
            highlightStroke: "rgba(151,187,205,0)",
            data: [(sitesYear[0][0]/yearSchool[0]*100).toFixed(2),(sitesYear[1][0]/yearSchool[1]*100).toFixed(2),
            	(sitesYear[2][0]/yearSchool[2]*100).toFixed(2),(sitesYear[3][0]/yearSchool[3]*100).toFixed(2),(sitesYear[4][0]/yearSchool[4]*100).toFixed(2)]
        },
        {
            label: "LinkedIn",
            fillColor: "rgba(116,118,220,1)",
            strokeColor: "rgba(151,187,205,0)",
            highlightFill: "rgba(116,118,220,0.8)",
            highlightStroke: "rgba(151,187,205,0)",
            data: [(sitesYear[0][1]/yearSchool[0]*100).toFixed(2),(sitesYear[1][1]/yearSchool[1]*100).toFixed(2),
            	(sitesYear[2][1]/yearSchool[2]*100).toFixed(2),(sitesYear[3][1]/yearSchool[3]*100).toFixed(2),(sitesYear[4][1]/yearSchool[4]*100).toFixed(2)]
        },
        {
            label: "Personal",
            fillColor: "rgba(219,116,220,1)",
            strokeColor: "rgba(151,187,205,0)",
            highlightFill: "rgba(219,116,220,0.8)",
            highlightStroke: "rgba(151,187,205,0)",
            data: [(sitesYear[0][2]/yearSchool[0]*100).toFixed(2),(sitesYear[1][2]/yearSchool[1]*100).toFixed(2),
            	(sitesYear[2][2]/yearSchool[2]*100).toFixed(2),(sitesYear[3][2]/yearSchool[3]*100).toFixed(2),(sitesYear[4][2]/yearSchool[4]*100).toFixed(2)]
        },
        {
            label: "Cool Link",
            fillColor: "rgba(43,109,171,1)",
            strokeColor: "rgba(151,187,205,0)",
            highlightFill: "rgba(43,109,171,0.8)",
            highlightStroke: "rgba(151,187,205,0)",
            data: [(sitesYear[0][3]/yearSchool[0]*100).toFixed(2),(sitesYear[1][3]/yearSchool[1]*100).toFixed(2),
            	(sitesYear[2][3]/yearSchool[2]*100).toFixed(2),(sitesYear[3][3]/yearSchool[3]*100).toFixed(2),(sitesYear[4][3]/yearSchool[4]*100).toFixed(2)]
        }
    ]
};


var ctx = document.getElementById("sitesYear").getContext("2d");
var myBarChart = new Chart(ctx).Bar(data, {multiTooltipTemplate: "<%= datasetLabel %> - <%= value %>%", barDatasetSpacing : 0,});

// chartjs bar graph for site totals --------------------------------------
var data = {
    labels: ['Github', 'LinkedIn', 'Personal', 'Other'],
    datasets: [
        {
            label: "Totals",
            fillColor: "rgba(69,69,74,1)",
            strokeColor: "rgba(151,187,205,0)",
            highlightFill: "rgba(92,92,97,1)",
            highlightStroke: "rgba(151,187,205,0)",
            data: [sites[0],sites[1],sites[2],sites[3]]
        }
    ]
};
var ctx = document.getElementById("sitesTotal").getContext("2d");
var myBarChart = new Chart(ctx).Bar(data);


$(document).ready(function(){
	sortBy('number');
}); 