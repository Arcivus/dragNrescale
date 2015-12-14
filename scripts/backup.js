var target;
getTarget();

function setBindings(target){
	target.onmousedown = function(e){
		var coords = getCoords(target);
		var shiftX = e.pageX - coords.left;
		var shiftY = e.pageY - coords.top;

		target.style.position = "absolute";
		document.body.appendChild(target);

		moveAt(e);

		target.style.zIndex = 1000;

		function moveAt(e){
			target.style.left = e.pageX - shiftX + "px";
			target.style.top = e.pageY - shiftY + "px";
		}

		document.onmousemove = function(e){
			moveAt(e);
		};

		target.onmouseup = function(e){
			document.onmousemove = null;
			target.onmouseup = null;
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

function getTarget(){
	var temp = document.getElementsByTagName("img");
	for(var i = 0; i < temp.length; i++){

		(function(index){
			temp[i].onclick = function(){
				console.log(index);
				target = document.getElementsByTagName("img")[index];
				setBindings(target);
			}
		})(i);
	}
}