<!DOCTYPE html>
<html>
<head>
	<title></title>
	<link rel="stylesheet" href="css/style.css" />
	<script type="text/javascript" src="node_modules/jquery/dist/jquery.min.js"></script>
	<script type="text/javascript" src="node_modules/bootstrap/dist/js/bootstrap.min.js"></script>
	<!--<script type="text/javascript" src="./js/liScroll.js"></script>-->
	<script src="node_modules/moment/moment.js"></script>
	<script src="node_modules/moment-timezone/builds/moment-timezone-with-data.js"></script>
	<script type="text/javascript" src="scripts/data.js"></script>
	<script type="text/javascript" src="scripts/script.js"></script>
	<link rel="stylesheet" type="text/css" href="node_modules/bootstrap/dist/css/bootstrap.min.css">
	<link rel="stylesheet" href="css/style.css" />
	<style type="text/css">
		/*Sizmek colors:	#003471, #0b3470, #00d1c6, #faf000 */
	</style>
</head>
<body>
	<div id="mainDiv">
		<ul id="slideList">
			&nbsp;
		</ul>
	</div>
	<div id="carouselTimeDisplay" class="carousel slide" data-ride="carousel">
	  <div class="carousel-inner">
	    <div class="carousel-item active">
	      <img class="d-block w-100" src="img/timeManila.png" alt="First slide" />
	      <div id="manilaTime" class="carousel-caption d-none d-md-block">
		    Text 1
		  </div>
	    </div>
	    <div class="carousel-item">
	      <img class="d-block w-100" src="img/timeEST.png" alt="Second slide" />
	      <div id="estTime" class="carousel-caption d-none d-md-block">
		    Text 2
		  </div>
	    </div>
	    <div class="carousel-item">
	      <img class="d-block w-100" src="img/timePST.png" alt="Third slide" />
	      <div id="pstTime" class="carousel-caption d-none d-md-block">
		    Text 3
		  </div>
	    </div>
	    <div class="carousel-item">
	      <img class="d-block w-100" src="img/timeGMT.png" alt="Third slide" />
	      <div id="gmtTime" class="carousel-caption d-none d-md-block">
		    Text 4
		  </div>
	    </div>
	    <div class="carousel-item">
	      <img class="d-block w-100" src="img/timeAEST.png" alt="Third slide" />
	      <div id="aestTime" class="carousel-caption d-none d-md-block">
		    Text 5
		  </div>
	    </div>
	  </div>
	</div>
</body>
</html>