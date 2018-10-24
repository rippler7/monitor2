<div class="mainContent">
	<div class="jumbotron">
	  <div id="internalReviewPRTitleBar"></div>
	 <table class="table">
	  <thead>
	    <tr>
	      <th scope="col" style='text-align:center;'>PR #</th>
	      <th scope="col" style='text-align:center;'>Status</th>
	      <th scope="col" style='text-align:center;'>Requested Due Date</th>
	      <th scope="col" style='text-align:center;'>Requested Time (EST)</th>
	      <th scope="col">Department</th>
	    </tr>
	  </thead>
	  <tbody id="IRPRtableContent">

	  </tbody>
	</div>
</div>
<script type="text/javascript">
function callInternalReviewPR(){
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
				//console.log("https://sizmek.quickbase.com/db/bhv6kzfnc"+"?a=API_GenResultsTable&jsa="+1+"&options=csv&qid="+qidInternalRevPR+"&apptoken="+apptoken);
					var anyOnPRCue = 0;
					//ASSIGNED PR
					var internalReviewPRTitleBar = '<h2 class="display-5">INTERNAL REVIEW PR</h2>';
					//console.log('Internal Review PR: ');
					allInternalPR = qdb_data;
					var totalContent = "";
					document.getElementById('IRPRtableContent').innerHTML = "";
				   	allInternalPR.forEach(function(item){
						var team;
				   		var lastName = item[6].split(",")[0];
				   		//console.log(lastName);
				   		for(var i=0;i<Teams.length;i++){
				   				//console.log(Teams[i].members.length);
				   				var currTeam = Teams[i].members;
				   				for(var j=0;j<currTeam.length;j++){
				   					//console.log(currTeam[j]);
				   					var lName = currTeam[j].split(",")[0];
				   					//console.log(lName);
				   					//console.log(lName+"=="+lastName+" = "+(lName==lastName));
				   					/*
				   					for(var k=0;k<Teams[i][j].members.length;k++){
				   						console.log(lastName);
				   					}
				   					*/
				   					if(lName==lastName){
				   						team = Teams[i].id;
							   			totalContent += "<tr><th scope='row' style='text-align:center;' class='qNumber'>"+item[0]+"</th><td style='text-align:center;' class='highlightOrange'>"+item[1]+"</td><td>"+item[2]+"</td><td>"+item[3]+"</td><td>"+team+"</td></tr>";
							   			anyOnPRCue++;
							   		}
				   				}
				   			}
					});
					if(anyOnPRCue == 0){internalReviewPRTitleBar = '<h2 class="display-3">NO PRs FOR REVIEW</h2>';}
					document.getElementById('internalReviewPRTitleBar').innerHTML = internalReviewPRTitleBar;
					document.getElementById('IRPRtableContent').innerHTML += totalContent;
					///console.log("This is home.php.");
			}
	});
}
	var liveCount = setInterval(function(){
		//console.log("NO PRs FOR REVIEW");
    	callInternalReviewPR();
    },refreshTimer); 
	callInternalReviewPR();
</script>