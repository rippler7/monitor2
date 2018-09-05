var qidPendingPR = "1000443";
var qidAssignedPR = "1000710";
var qidAssignedFBC = "1000231";
var qidInternalRevPR = "1000428";
var qidInternalRevFBC = "1000159";
var qidActivityLogging = "1002201";
var qidHours = "1000164"; //-1019757
var qid2WeeksAgo = "183";
var apptoken = "dxjuywydk6zb2kxn8pz5daj7fcs";

var allAssignedPR = [];
var allAssignedFBC = [];
var allReviewPR = [];
var allReviewFBC = [];

var overDuePR = [];
var warningPR = [];
var overDueFBC = [];
var warningFBC = [];

var APAC = {
	id:"APAC",
	members:["Quinquilleria, Silbeth -Betty","Basadre, Rey -Rey", "DeGuzman, Ediral -Ed", "Hatamosa, Mike -Gab", "Pascual, Christian -Paski"],
	totalHours:0,
	totalHoursB:0,
	totalNonBillable:0
};
var EMEA = {
	id: "EMEA",
	members: ["Guerrero, Ivan -Master Ivan","Africano, Nixon -Nixon", "Cabalida, Stephen -Stephen", "Dramayo, Lorenciano -Ciano", "Calisang, Ebenezer -Boboi", "Rosell, Christian Adam -Christian"],
	totalHours: 0,
	totalHoursB:0,
	totalNonBillable:0
};
var NAM_NonAuto = {
	id:"NAM_NonAuto",
	members:["Pepito, Arniel -Sirs","Baldomero, Abdella -Del", "DeGuzman, Reynaldo -JR", "Laborte, Niko -Niko", "Pagulong, Lauro -Byakuks"],
	totalHours:0,
	totalHoursB:0,
	totalNonBillable:0
};
var NAM_Programmatic = {
	id:"NAM_Programmatic",
	members:["Ancog, Jeremy -Master","Abellana, Peter John -PJ","Del Rosario, Emmanuel -Mikee","Imus, Jollie Mae -Jollie","Loquinario, Mary Rose -Mary","Madduma, John -Erick"],
	totalHours:0,
	totalHoursB:0,
	totalNonBillable:0
};
var Automotive = {
	id:"Automotive",
	members:["Lopez, Ryan -Boss","Mingo, Christian -Sexy Meng","Valdehueza, Joshry Jade -Josh","Villas, John Aldwin"],
	totalHours:0,
	totalHoursB:0,
	totalNonBillable:0	
};
var Interactive_Designer = {
	id:"Interactive",
	members:["Pantoja, Maureen -Mau","Palapar, James -James"],
	totalHours:0,
	totalHoursB:0,
	totalNonBillable:0	
};


var Teams = [APAC,EMEA,NAM_NonAuto,NAM_Programmatic,Automotive,Interactive_Designer];


//getGap() function computes for hours left from given date up until now() based on EST timezone. 
function getGap(dateGiven,timeGiven){
	var nowDateDefault = new Date();
	var EST_Now = (toTimeZone2(nowDateDefault,"America/New_York"));
	var nowDate = new Date(EST_Now);
	var dateSample = Date.parse(dateGiven+", "+timeGiven);
	var testDate = new Date(dateSample);
	var result = (testDate - nowDate)/36e5;

	return result;
}

function isClose(timeRemaining){
	var result = false;
	if(timeRemaining.indexOf("hour") >= 0 && timeRemaining.indexOf("-") < 0){
		result = true;
	}
	return result;
}


function formatAMPM(date) {
	var n = new Date(date);
  var hours = n.getHours();
  var minutes = n.getMinutes();
  var seconds = n.getSeconds();
  var ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '12' should be '0'
  minutes = minutes < 10 ? '0'+minutes : minutes;
  seconds = seconds < 10 ? '0'+seconds : seconds;
  var strTime = hours + ':' + minutes + ':' + seconds +' '+ ampm;
  return strTime;
}

function toTimeZone(time, zone) {
    var format = 'hh:mm A';
    return moment(time, format).tz(zone).format(format);
}

function toTimeZone2(time, zone){
	var format = 'YYYY-MM-DD, hh:mm A';
    return moment(time, format).tz(zone).format(format);
}

function toTimeZone2(time, zone){
	var format = 'YYYY-MM-DD, hh:mm A';
    return moment(time, format).tz(zone).format(format);
}

function callData(){
	$.ajax({
			url:"https://sizmek.quickbase.com/db/bhtzcnzkd",
			data:{
				"a":"API_GenResultsTable",
				"jsa":1,
				"options":"csv",
				"qid":qidAssignedFBC,
				"apptoken":apptoken,
				"test":""
			},
			dataType:"script",
			method:"GET",
			success:function(){
				//console.log(qdb_numcols);
				//console.log(qdb_numrows);
				
				console.log("Assigned FBC: ");
				console.log("https://sizmek.quickbase.com/db/bhtzcnzkd"+"?a=API_GenResultsTable&jsa="+1+"&options=csv&qid="+qidAssignedFBC+"&apptoken="+apptoken);
				//ASSIGNED FBC
				qdb_data.forEach(function(item){
					//console.log(item);
				});
			}
		});

	$.ajax({
			url:"https://sizmek.quickbase.com/db/bhv6kzfnc",
			data:{
				"a":"API_GenResultsTable",
				"jsa":1,
				"options":"csv",
				"qid":qidInternalRevPR,
				"apptoken":apptoken,
				"test":""
			},
			dataType:"script",
			method:"GET",
			success:function(){
				//console.log(qdb_numcols);
				//INTERNAL REVIEW PR
				console.log("Internal Review PR: ");
				console.log("https://sizmek.quickbase.com/db/bhv6kzfnc"+"?a=API_GenResultsTable&jsa="+1+"&options=csv&qid="+qidInternalRevPR+"&apptoken="+apptoken);
				qdb_data.forEach(function(item){
					//console.log(item);
				});
			}
		});


	$.ajax({
			url:"https://sizmek.quickbase.com/db/bhtzcnzkd",
			data:{
				"a":"API_GenResultsTable",
				"jsa":1,
				"options":"csv",
				"qid":qidInternalRevFBC,
				"apptoken":apptoken,
				"test":""
			},
			dataType:"script",
			method:"GET",
			success:function(){
				//INTERNAL REVIEW FBC
				console.log("Internal Review FBC: ");
				console.log("https://sizmek.quickbase.com/db/bhtzcnzkd"+"?a=API_GenResultsTable&jsa="+1+"&options=csv&qid="+qidInternalRevFBC+"&apptoken="+apptoken);
				qdb_data.forEach(function(item){
					//console.log(item);
				});
			}
		});


	$.ajax({
		url:"https://sizmek.quickbase.com/db/bhxqi55ba",
			data:{
				"a":"API_GenResultsTable",
				"jsa":1,
				"options":"csv",
				"qid":qid2WeeksAgo,
				"apptoken":apptoken,
				"test":""
			},
			dataType:"script",
			method:"GET",
			success:function(){
				console.log("https://sizmek.quickbase.com/db/bhxqi55ba?options=csv&jsa=1&a=API_GenResultsTable&qid="+qid2WeeksAgo+"&apptoken="+apptoken);
				$(document).ready(function () {
				   $(qdb_data).each(function(v,i){
						//document.getElementById('testDiv').innerHTML = (item)+"<br />";
						//console.log(i);
						//console.log(item[4]);
					});
				});
			}
	});
	/*
	$.ajax({
		url:"https://sizmek.quickbase.com/db/bh8bygxia",
			data:{
				"a":"API_GenResultsTable",
				"jsa":1,
				"options":"csv",
				"qid":qidActivityLogging,
				"apptoken":apptoken,
				"test":""
			},
			dataType:"script",
			method:"GET",
			success:function(){
				console.log("https://sizmek.quickbase.com/db/bhv6kzfnc?options=csv&jsa=1&a=API_GenResultsTable&qid="+qidActivityLogging+"&apptoken="+apptoken);
				$(qdb_data).each(function(v,i){
					console.log(i);
					//console.log(item[3]);
					//console.log(item[4]);
				});
			}
	});
	*/
	function liveTime(){
		var monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
	    var date = new Date();
	    var dd = date.getDate();
	    var mm = date.getMonth();
	    var yyyy = date.getFullYear();

	    var timestamp = date.getTime();
	    /*
	    $("#bigDate").html(dd);
	    $("#bigMonth").html(monthNames[mm]);
	    $("#bigYear").html(yyyy);
	  	*/
	    var tz = moment.tz.guess();
	    var timeManila = toTimeZone(date,tz);
	    var timeEST = toTimeZone(date,"America/New_York");
	    var timePST = toTimeZone(date,"America/Los_Angeles");
	    var timeGMT = toTimeZone(date,"Etc/GMT+0"); 
	    var timeAEST = toTimeZone(date,"Australia/Melbourne");
	    /*
	    $("#mnlTime").html(timeManila);
	    $("#estTime").html(timeEST);
	    $("#pstTime").html(timePST);
	    $("#gmtTime").html(timeGMT);
	    $("#aestTime").html(timeAEST);
	    */
	}
}


document.addEventListener('DOMContentLoaded', function () {
	callData();
	var liveCount = setInterval(function(){
    	callData();
    },30000); 
	/*
	var dtNow = new Date();
	var h = dtNow.getHours();
	var ampmText = "AM";
	if (h >= 12){
		h = h-12;
		ampmText = "PM";	
	}
	var m = dtNow.getMinutes();
    var liveCount = setInterval(function(){
    	liveTime();
    },1000); 
  	console.log("time difference: "+Number(getGap("07-02-2018","5:47 PM")));
  	*/	   
  	//console.log(allAssignedPR);
});


/*
$(document).ready(function(){
	var dtNow = new Date();
	var h = dtNow.getHours();
	var ampmText = "AM";
	if (h >= 12){
		h = h-12;
		ampmText = "PM";	
	}
	var m = dtNow.getMinutes();
    var liveCount = setInterval(function(){
    	liveTime();
    },1000); 
  	console.log("time difference: "+Number(getGap("07-02-2018","5:47 PM")));
});

*/

