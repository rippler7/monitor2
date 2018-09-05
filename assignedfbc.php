<div class="mainContent">
	<div class="jumbotron">
	  <div id="assignedFBCTitleBar"></div>
	 <table class="table">
	  <thead>
	    <tr>
	      <th scope="col">FBC #</th>
	      <th scope="col">Due Time (EST)</th>
	      <th scope="col">Due Date</th>
	      <th scope="col">Department</th>
	    </tr>
	  </thead>
	  <tbody id="AssFBCtableContent">

	  </tbody>
	</div>
</div>
<script type="text/javascript">
function callDataAssignedFBC(){
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
					//ASSIGNED FBC
					//console.log('Assigned FBC: ');
					var anyOnCue = 0;
					allAssignedFBC = qdb_data;
					var titleBar = '<h2 class="display-5">ASSIGNED FBCs</h2>';
					var totalContent = "";
					document.getElementById('AssFBCtableContent').innerHTML = "";
					var team = "";
				   	allAssignedFBC.forEach(function(item){
				   		var gapTime = Number(getGap(item[2],item[1]));
				   		//console.log("time difference ("+item[2]+" "+item[1]+"): "+gapTime);
				   		//console.log("time difference: "+Number(getGap("02-28-2018","12:30 AM")));

				   		var dateTemp = new Date(gapTime*1000);
				   		var hours = dateTemp.getHours();
						// Minutes part from the timestamp
						var minutes = "0" + dateTemp.getMinutes();
						// Seconds part from the timestamp
						var seconds = "0" + dateTemp.getSeconds();
						var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
						if(gapTime < 0){
							formattedTime = "-"+formattedTime;
						}
						//console.log(formattedTime);

				   		var lastName = item[4].split(",")[0];
				   		//console.log(lastName);
				   		if(item[6].indexOf("Sizmek Internal") < 0){
				   			for(var i=0;i<Teams.length;i++){
				   				//console.log(Teams[i].members.length);
				   				var currTeam = Teams[i].members;
				   				for(var j=0;j<currTeam.length;j++){
				   					//console.log(currTeam[j]);
				   					var lName = currTeam[j].split(",")[0];
				   					//console.log(lName+"=="+lastName+" = "+(lName==lastName));
				   					/*
				   					for(var k=0;k<Teams[i][j].members.length;k++){
				   						console.log(lastName);
				   					}
				   					*/
				   					if(lName==lastName){
				   						anyOnCue++;
				   						team = Teams[i].id;
				   						totalContent += "<tr><th scope='row' style='text-align:center;' class='qNumber'>"+item[0]+"</th><td style='text-align:center;' class='highlightOrange'>"+item[1]+"</td><td style='text-align:center;'>"+item[2]+"</td><td>"+team+"</td></tr>";
				   					}
				   				}
				   			}
				   		}				   		
					});
					if(anyOnCue == 0){titleBar = '<h2 class="display-2">NO ASSIGNED FBCs YET</h2>';}
					document.getElementById('assignedFBCTitleBar').innerHTML = titleBar;
					document.getElementById('AssFBCtableContent').innerHTML += totalContent;
			}
	});
}
	var liveCount = setInterval(function(){
		console.log("refreshing Assigned FBC data...");
    	callDataAssignedFBC();
    },30000); 
	callDataAssignedFBC();
</script>