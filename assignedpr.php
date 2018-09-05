<div class="mainContent">
	<div class="jumbotron">
	  <div id="assignedPRTitleBar"></div>
	 <table class="table">
	  <thead>
	    <tr>
	      <th scope="col" style='text-align:center;'>PR #</th>
	      <th scope="col" style='text-align:center;'>Time Remaining</th>
	      <th scope="col">Department</th>
	    </tr>
	  </thead>
	  <tbody id="AssPRtableContent">

	  </tbody>
	</div>
</div>
<script type="text/javascript">
function callDataAssignedPR(){
	$.ajax({
		url:"https://sizmek.quickbase.com/db/bhv6kzfnc",
			data:{
				"a":"API_GenResultsTable",
				"jsa":1,
				"options":"csv",
				"qid":qidAssignedPR,
				"apptoken":apptoken,
				"test":""
			},
			dataType:"script",
			method:"GET",
			success:function(){
				console.log("https://sizmek.quickbase.com/db/bhv6kzfnc?options=csv&jsa=1&a=API_GenResultsTable&qid="+qidAssignedPR+"&apptoken="+apptoken);
					var anyOnPRCue = 0;
					//ASSIGNED PR
					var assignedPRTitleBar = '<h2 class="display-5">ASSIGNED PRs DUE TODAY</h2>';
					console.log('Assigned PR: ');
					allAssignedPR = qdb_data;
					var totalContent = "";
					document.getElementById('AssPRtableContent').innerHTML = "";
				   	allAssignedPR.forEach(function(item){
				   		if(item[2].indexOf("hours") > -1){
				   			totalContent += "<tr><th scope='row' style='text-align:center;' class='qNumber'>"+item[0]+"</th><td style='text-align:center;' class='highlightOrange'>"+item[2]+"</td><td>"+item[9]+"</td></tr>";
				   			anyOnPRCue++;
				   		}
					});
					if(anyOnPRCue == 0){assignedPRTitleBar = '<h2 class="display-3">NO ASSIGNED PRs DUE TODAY</h2>';}
					document.getElementById('assignedPRTitleBar').innerHTML = assignedPRTitleBar;
					document.getElementById('AssPRtableContent').innerHTML += totalContent;
					console.log("This is home.php.");
			}
	});
}
	var liveCount = setInterval(function(){
		console.log("refreshing Assigned PR data...");
    	callDataAssignedPR();
    },30000); 
	callDataAssignedPR();
</script>