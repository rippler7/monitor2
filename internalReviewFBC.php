<div class="mainContent">
	<div class="jumbotron">
	  <div id="internalReviewFBCTitleBar"></div>
	 <table class="table">
	  <thead>
	    <tr>
	      <th scope="col" style='text-align:center;'>FBC #</th>
	      <th scope="col" style='text-align:center;'>Status</th>
	      <th scope="col" style='text-align:center;'>Due Date</th>
	      <th scope="col" style='text-align:center;'>Due Time (EST)</th>
	      <th scope="col">Department</th>
	    </tr>
	  </thead>
	  <tbody id="IRFBCtableContent">

	  </tbody>
	</div>
</div>
<script type="text/javascript">
function callInternalReviewFBC(){
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
				console.log("https://sizmek.quickbase.com/db/bhtzcnzkd"+"?a=API_GenResultsTable&jsa="+1+"&options=csv&qid="+qidInternalRevFBC+"&apptoken="+apptoken);
					var anyOnFBCCue = 0;
					//ASSIGNED PR
					var internalReviewFBCTitleBar = '<h2 class="display-5">INTERNAL REVIEW FBC</h2>';
					console.log('Internal Review FBC: ');
					allInternalFBC = qdb_data;
					var totalContent = "";
					document.getElementById('IRFBCtableContent').innerHTML = "";
				   	allInternalFBC.forEach(function(item){
						var team;
				   		var lastName = item[5].split(",")[0];
				   		console.log(lastName);
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
							   			totalContent += "<tr><th scope='row' style='text-align:center;' class='qNumber'>"+item[0]+"</th><td style='text-align:center;' class='highlightOrange'>"+item[2]+"</td><td>"+item[3]+"</td><td>"+item[4]+"</td><td>"+team+"</td></tr>";
							   			anyOnFBCCue++;
							   		}
				   				}
				   			}
					});
					if(anyOnFBCCue == 0){internalReviewFBCTitleBar = '<h2 class="display-3">NO FBCs FOR REVIEW</h2>';}
					document.getElementById('internalReviewFBCTitleBar').innerHTML = internalReviewFBCTitleBar;
					document.getElementById('IRFBCtableContent').innerHTML += totalContent;
					///console.log("This is home.php.");
			}
	});
}
	var liveCount = setInterval(function(){
		//console.log("NO PRs FOR REVIEW");
    	callInternalReviewFBC();
    },refreshTimer); 
	callInternalReviewFBC();
</script>