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
            fillColor: "rgba(151,187,205,0.5)",
            strokeColor: "rgba(151,187,205,0.8)",
            highlightFill: "rgba(151,187,205,0.75)",
            highlightStroke: "rgba(151,187,205,1)",
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
            fillColor: "rgba(151,187,205,0.5)",
            strokeColor: "rgba(151,187,205,0.8)",
            highlightFill: "rgba(151,187,205,0.75)",
            highlightStroke: "rgba(151,187,205,1)",
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
		                  .y(function(d) { return d[1] })
		                  .color(keyColor);

		    chart.xAxis
		        .tickFormat(function(d) { return d3.time.format('%d-%a:%I%p')(new Date(d)) });

		    chart.yAxis
		        .tickFormat(d3.format('.2g'));

		    d3.select('#' + container + ' svg')
		          .datum(data)
		        .transition().duration(500).call(chart);

		    nv.utils.windowResize(chart.update);

		    return chart;
	});
}

function stackedBarConfig(container, data){
	nv.addGraph(function() {
	    var chart = nv.models.multiBarChart();

	    chart.xAxis
	        .tickFormat(d3.format(',f'));

	    chart.yAxis
	        .tickFormat(d3.format(',.1f'));

	    d3.select('#' + container + ' svg')
	        .datum(data)
	        .transition().duration(500)
	        .call(chart)
	        ;

	    nv.utils.windowResize(chart.update);

	    return chart;
	});
}

//formating of data from server for app rate chart and bargraph, and gender bar graph
d3GraphObj =[{"key" : "Male" , "values" : []},{"key" : "Female" , "values" : []}, {"key" : "Non-binary" , "values" : []}]
maleTotal = 0;
femaleTotal = 0;
elseTotal = 0;
d3BarObj = []
$.each(dayCounts, function(index, value) {              //index:day value:hour obj
	$.each(value, function(index2, value2) {			//index2:hour value2: count
		dateTime = index+'T'+index2+':00:00';
		dateUTC = Date.parse(new Date(dateTime));
		d3BarObj.push({'Time': dateUTC, 'Male':value2[1], 'Female':value2[2], 'Non-binary': value2[3]});
		d3GraphObj[0]["values"].push([dateUTC,value2[1]]);
		maleTotal += value2[1];
		d3GraphObj[1]["values"].push([dateUTC,value2[2]]);
		femaleTotal += value2[2];
		d3GraphObj[2]["values"].push([dateUTC,value2[3]]);
		elseTotal += value2[3];
	}); 
}); 

for(i=0;i<d3GraphObj.length;i++){
	d3GraphObj[i]['values'].sort(function(a, b) { 
		return a[0] - b[0];
	})
}

d3BarObj.sort(function(a, b) { 
	return a['Time'] - b['Time'];
})


appRate = total/dayCounts.length;
console.log("Daily Rate of Applicants = " + total/Object.keys(dayCounts).length);

chartConfig("applyChart", d3GraphObj); 
//chartConfig("genderBar", d3BarObj); 

// chartjs bar graph for birth months --------------------------------------
var data = {
    labels: ['Male', 'Female', 'Non-Binary'],
    datasets: [
        {
            label: "Distribution by Gender",
            fillColor: "rgba(151,187,205,0.5)",
            strokeColor: "rgba(151,187,205,0.8)",
            highlightFill: "rgba(151,187,205,0.75)",
            highlightStroke: "rgba(151,187,205,1)",
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
            fillColor: "rgba(151,187,205,0.5)",
            strokeColor: "rgba(151,187,205,0.8)",
            highlightFill: "rgba(151,187,205,0.75)",
            highlightStroke: "rgba(151,187,205,1)",
            data: [tshirt[0],tshirt[1],tshirt[2],tshirt[3]]
        }
    ]
};
var ctx = document.getElementById("tshirt").getContext("2d");
var myBarChart = new Chart(ctx).Bar(data);



$(document).ready(function(){
	sortBy('number');
}); 