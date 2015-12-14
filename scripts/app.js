var images = document.getElementsByTagName("img");
for(var i = 0; i < images.length; i++){
	var picture = document.getElementsByTagName("img")[i];
	setBindings(picture);
};

var minsize = 100;

var border = document.getElementById("clickedPic");
var container = document.getElementById("picContainer");
var marker = document.getElementById("marker");

document.onclick = function(e){
	console.log(e.pageX + " " + e.pageY);
}


marker.ondragstart = function(e){
	var oldWidth = parseInt(border.style.width);
	var startX = e.pageX;
	var oldHeight = parseInt(border.style.height);
	var startY = e.pageY;

	marker.ondragend = function(e){

		var newWidth = oldWidth - startX + e.pageX;
		var newHeight = oldHeight - startY + e.pageY;

		var diffInWidth = Math.abs(newWidth - oldWidth);
		var diffInHeight = Math.abs(newHeight - oldHeight);
		
		if (diffInWidth > diffInHeight){
			scaleByWidth();
		} else{
			scaleByHeight();
		};

		function scaleByWidth(){
			if (newWidth >= minsize){
				border.style.width = newWidth + "px";
			}else{ 
				newWidth = minsize;
				border.style.width = newWidth + "px";
			};
			var coefficient = newWidth / oldWidth;
			border.style.height = oldHeight * coefficient + "px";
			border.children[1].style.width = border.style.width;

			mendMarker();

		};
		function scaleByHeight(){
			if(newHeight >= minsize){
				border.style.height = newHeight + "px";
				console.log(border.style.height);
			}else{
				newHeight = minsize;
				border.style.height = newHeight + "px";
			};
			var coefficient = newHeight / oldHeight;
			border.style.width = oldWidth * coefficient + "px";
			border.children[1].style.width = border.style.width;

			mendMarker();
		};
	};
};


function setBindings(target){

	target.onmousedown = function(e){
		mendMarker();

		var coords = getCoords(target);
		var shiftX = e.pageX - coords.left;
		var shiftY = e.pageY - coords.top;

		border.style.width = target.width;
		border.style.height = target.height;

		var currentImage = border.children[1]; // Save position  
		var currentTopPosition = border.style.top; // of dragged image
		var currentLeftPosition = border.style.left; // so it wont reset.


		moveAt(e);

		container.appendChild(currentImage);
		border.appendChild(target);

		if(target != currentImage){ // prevent changes if the same image moved twice in a row.
			container.children[container.children.length - 1].style.top = currentTopPosition;
			container.children[container.children.length - 1].style.left = currentLeftPosition;
			container.children[container.children.length - 1].style.zIndex = 0;
			border.children[1].style.top = "0px";
			border.children[1].style.left = "0px";
		};


		target.style.zIndex = 1000;

		function moveAt(e){
			border.style.left = e.pageX - shiftX + "px";
			border.style.top = e.pageY - shiftY + "px";
		}

		document.onmousemove = function(e){
			mendMarker();
			moveAt(e);
		};

		target.onmouseup = function(e){
			document.onmousemove = null;
			target.onmouseup = null;
			border.onmouseup = null;
		}

		target.ondragstart = function() {
  		return false;
		};

	} 
};

function getCoords(elem) {
  var box = elem.getBoundingClientRect();

  return {
    top: box.top + pageYOffset,
    left: box.left + pageXOffset
  };
};

function mendMarker(){
	marker.style.left = border.style.width;
	marker.style.top = border.style.height;
}

