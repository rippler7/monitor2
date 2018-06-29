var slideIndex = 0;
var delayBase = 4000;
var delay = delayBase;  //in milliseconds between frames;
var timer = "";
var definedTime = [3000,2000,3000,2000,7000];
var looped = true;
document.addEventListener("DOMContentLoaded",function(){
	console.log("document loaded!");
	var slideImages = ["slide1.png","slide2.png","slide3.png","slide4.png","slide5.png"];
	var htmlContents = ["home.html"];
	var list = document.getElementById("slideList");
	var items= "";
	console.log(items);
	for(var i=0;i<slideImages.length;i++){
		if(definedTime.length > 0)
			{
				if(definedTime[i] != undefined || definedTime[i] != 0){
					delay = definedTime[i];
				} else {
					delay = delayBase;
				}
			} 
		items += '<li id="slide'+i+'" data-delay="'+delay+'" class="slideItem fade"></li>';
	}
	list.innerHTML = items;
	var popItems = list.getElementsByTagName("li");
	for(var j=0;j<slideImages.length;j++){
		console.log(popItems[j]);
		if(htmlContents[j]){
			popItems[j].innerHTML = '<object type="text/html" data="'+htmlContents[j]+'" ></object>';
		}
		//popItems[j].style.background = "transparent url('img/slide"+(j+1)+".png') center no-repeat";
	}
	//popItems[slideImages.length-1].innerHTML = '<div id="btn">&nbsp;</div>'
	//popItems[slideImages.length-1].addEventListener("click",clickFunc);
	slideShow(popItems);
});

function slideShow(items){
	if(timer != null){
		clearTimeout(timer);
	}
	if(!looped){
	
		for(var i=0;i<items.length;i++){
			items[i].style.display = "none";
		}
		slideIndex++;
		if(definedTime.length > 0){
			delay = items[slideIndex-1].dataset.delay;
			//console.log(items[slideIndex-1].dataset.delay);
		}
		if(slideIndex > items.length){
			slideIndex = clearTimeout(timer);
			items[items.length-1].style.display = "block";
		} else {
			items[slideIndex-1].style.display = "block";
			timer = setTimeout(function(){
				slideShow(items);
			},delay);
		}
		if(slideIndex >= items.length){
			clearTimeout(timer);
			delay = items.length - 1;
		}

	} else {

		for(var i=0;i<items.length;i++){
			items[i].style.display = "none";
		}
		slideIndex++;
		if(slideIndex > items.length){
			slideIndex = 1;
		}
		items[slideIndex-1].style.display = "block";
		if(definedTime.length > 0){
			delay = items[slideIndex-1].dataset.delay;
			//console.log(items[slideIndex-1].dataset.delay);
		}
		timer = setTimeout(function(){
			slideShow(items);
		},delay);

	}
}

function clickFunc(){
	console.log("button clicked!");
}