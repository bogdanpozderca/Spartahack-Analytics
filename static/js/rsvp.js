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

$(document).ready(function(){
	sortBy('number');
}); 
