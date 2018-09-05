var slideIndex = 0;
var delayBase = 4000;
var delay = delayBase;  //in milliseconds between frames;
var timer = "";
var definedTime = [7000,5000,3000,2000,4000];
var looped = true;
document.addEventListener("DOMContentLoaded",function(){
	console.log("document loaded!");
	var slideImages = ["slide1.png","slide2.png","slide3.png","slide4.png","slide5.png"];
	var htmlContents = ["assignedpr.php","assignedfbc.php","announcements.php"];
	var list = $("#slideList");
	var items= "";
	console.log(items);
	for(var i=0;i<htmlContents.length;i++){
		if(definedTime.length > 0)
			{
				if(definedTime[i] != undefined || definedTime[i] != 0){
					delay = definedTime[i];
				} else {
					delay = delayBase;
				}
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

});

function slideShow(items){
	var it;
	if(timer != null){
		clearTimeout(timer);
	}
	if(!looped){
		slideIndex++;
		if(definedTime.length > 0){
			delay = items[slideIndex-1].dataset.delay;
			console.log(items[slideIndex-1].dataset.delay);
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
		console.log(delay);
		timer = setTimeout(function(){
			slideShow(items);
		},delay);

	}
}

function clickFunc(){
	console.log("button clicked!");
}