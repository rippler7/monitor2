var qidPendingPR = "1000443";
var qidAssignedPR = "1000710";
var qidAssignedFBC = "1000231";
var qidInternalRevPR = "1000428";
var qidInternalRevFBC = "1000159";
var qidActivityLogging = "1002201";
var qidHours = "1000164"; //-1019757
var qid2WeeksAgo = "183";
var apptoken = "dxjuywydk6zb2kxn8pz5daj7fcs";
var refreshTimer = 60000;

var allAssignedPR = [];
var allAssignedFBC = [];
var allReviewPR = [];
var allReviewFBC = [];

var overDuePR = [];
var warningPR = [];
var overDueFBC = [];
var warningFBC = [];

var slideIndex = 0;
var delayBase = 4000;
var delay = delayBase;  //in milliseconds between frames;
var timer = "";
var looped = true;

var aTimeLimiter = 5000;
var definedTime = [5000,5000,5000,5000,aTimeLimiter];
var counterAnim = 0;

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
	var td = moment.tz(nowDateDefault, "Asia/Tokyo");
   	var EST_Now = td.tz('America/New_York').format('MMMM DD YYYY, h:mm:ss a');
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
				//console.log("https://sizmek.quickbase.com/db/bhxqi55ba?options=csv&jsa=1&a=API_GenResultsTable&qid="+qid2WeeksAgo+"&apptoken="+apptoken);
				$(document).ready(function () {
				   $(qdb_data).each(function(v,i){
						
					});
				});
			}
	});

	$.ajax({
		url:"https://sizmek.quickbase.com/db/bnqb4ra49",
		data:{
				"a":"API_GenResultsTable",
				"jsa":1,
				"options":"csv",
				"apptoken":apptoken,
				"test":""
			},
		dataType:"script",
		method:"GET",
		success:function(){
			console.log(counterAnim);
			var totalNews = "";
			aTimeLimiter = 5000;
			var items = qdb_data;
			items.forEach(function(i){
				totalNews+="<li>"+i+"</li><br />";
				aTimeLimiter+=5000;
			});
			definedTime[definedTime.length-1] = aTimeLimiter;
			console.log(definedTime[definedTime.length-1]);
			console.log(counterAnim);
			document.getElementById("announcementList").innerHTML = totalNews;
		}
	});
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

function liveTime(){
	var monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    var date = new Date();
    var dd = date.getDate();
    var mm = date.getMonth();
    var yyyy = date.getFullYear();
    var timestamp = date.getTime();

    $("#bigDate").html(dd);
    $("#bigMonth").html(monthNames[mm]);
    $("#bigYear").html(yyyy);
		  
    var tz = moment.tz.guess();
    var timeManila = toTimeZone2(date,tz);
    var timeEST = toTimeZone2(date,"America/New_York");
    var timePST = toTimeZone2(date,"America/Los_Angeles");
    var timeGMT = toTimeZone2(date,"Etc/GMT+0"); 
    var timeAEST = toTimeZone2(date,"Australia/Melbourne");
    $("#manilaTime").html("<span class='greenThemeYellow'>"+timeManila.split(",")[0]+"</span> "+timeManila.split(",")[1]+" <span class='tzone'>MNL</span>");
    $("#estTime").html("<span class='greenThemeYellow'>"+timeEST.split(",")[0]+"</span> "+timeEST.split(",")[1]+" <span class='tzone'>EST</span>");
    $("#pstTime").html("<span class='greenThemeYellow'>"+timePST.split(",")[0]+"</span> "+timePST.split(",")[1]+" <span class='tzone'>PST</span>");
    $("#gmtTime").html("<span class='greenThemeYellow'>"+timeGMT.split(",")[0]+"</span> "+timeGMT.split(",")[1]+" <span class='tzone'>GMT</span>");
    $("#aestTime").html("<span class='greenThemeYellow'>"+timeAEST.split(",")[0]+"</span> "+timeAEST.split(",")[1]+" <span class='tzone'>AEST</span>");
}

function runAll(slideImages,htmlContents,list,items){
	for(var i=0;i<htmlContents.length;i++){
		if(definedTime.length > 0)
			{
				if(definedTime[i] != undefined || definedTime[i] != 0){
					delay = definedTime[i];
				} else {
					delay = delayBase;
				}
			} 
		if(i == htmlContents.length-1){
			delay = aTimeLimiter;
		}
		items += '<li id="slide'+i+'" data-delay="'+delay+'" class="slideItem fader"></li>';
	}
	list.html(items);
	var popItems = $("ul#slideList li.fader");
	for(var j=0;j<htmlContents.length;j++){
		//console.log(popItems[j]);
		if(htmlContents[j]){
			//popItems[j].innerHTML = '<object type="text/html" data="'+htmlContents[j]+'" ></object>';
			$(popItems[j]).load(htmlContents[j]);
		}
		//popItems[j].style.background = "transparent url('img/slide"+(j+1)+".png') center no-repeat";
	}
	//popItems[slideImages.length-1].innerHTML = '<div id="btn">&nbsp;</div>'
	//popItems[slideImages.length-1].addEventListener("click",clickFunc);
	
	slideShow(popItems);
}

function slideShow(items){
	var it;
	if(timer != null){
		clearTimeout(timer);
	}
	if(!looped){
		slideIndex++;
		if(definedTime.length > 0){
			delay = items[slideIndex-1].dataset.delay;
			//console.log(items[slideIndex-1].dataset.delay);
		}
		if(slideIndex > items.length){
			slideIndex = clearTimeout(timer);
			//items[items.length-1].style.display = "block";
			it = $("ul#slideList li").get(items.length-1);
			it.style.display = "block";
		} else {
			//items[slideIndex-1].style.display = "block";
			it = $("ul#slideList li").get(slideIndex-1);
			it.style.display = "block";
			timer = setTimeout(function(){
				slideShow(items);
			},delay);
		}
		if(slideIndex >= items.length){
			clearTimeout(timer);
			delay = items.length - 1;
		}

	} else {
		slideIndex++;
		if(slideIndex > items.length){
			slideIndex = 1;
		}
		$("ul#slideList li.fader").css("display","none");
		it = $("ul#slideList li").get(slideIndex-1);
		it.style.display="block";
		if(definedTime.length > 0){
			delay = items[slideIndex-1].dataset.delay;
		}
		if(slideIndex == items.length){
			delay = aTimeLimiter;
			$(it).attr("data-delay",aTimeLimiter);
			/*
			setTimeout(function(){
				$('#mainDiv').scrollTop(0);
			},aTimeLimiter);
			*/
		}
		//console.log(delay);
		$('#mainDiv').animate({scrollTop: $('#mainDiv').prop("scrollHeight")},{duration:delay,complete:function(){
				$('#mainDiv').scrollTop(0);
			}});
		timer = setTimeout(function(){
			slideShow(items);
		},delay);

	}
}

document.addEventListener('DOMContentLoaded', function () {
	liveTime();
	callData();
	var liveCount = setInterval(function(){
    	callData();
    },refreshTimer); 
    var liveCount = setInterval(function(){
	    	liveTime();
	    },1000);
    var slideImages = ["slide1.png","slide2.png","slide3.png","slide4.png","slide5.png"];
	var htmlContents = ["internalReviewPR.php","internalReviewFBC.php","assignedpr.php","assignedfbc.php","announcements.php"];
	var list = $("#slideList");
	var items= "";
	runAll(slideImages,htmlContents,list,items);
});
