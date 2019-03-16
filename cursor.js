//Objetos
var CursorJSON = '{"mouse":{"x":"0","y":"0"}}';
var Cursor = JSON.parse(CursorJSON);

//Posição do mouse
document.addEventListener('mousemove', function(event){
	Cursor.x = event.clientX;
	Cursor.y = event.clientY; 
});

//Aparecer context do botão direito
function showRightContext(bool){
	if(bool){
		var rightContext = document.getElementById("rightContent");
		rightContext.style.transform = 'translateY('+(Cursor.y)+'px)';
		rightContext.style.transform += 'translateX('+(Cursor.x)+'px)';

		rightContext.style.opacity = "1";
		rightContext.style.pointerEvents = "all";
		rightContext.focus();
	}else{
		var rightContext = document.getElementById("rightContent");

		rightContext.style.opacity = "0";
		rightContext.style.pointerEvents = "none";
	}
}

function rightClickContext(){
	if (document.addEventListener) { 
        document.addEventListener('contextmenu', function(e) {
			showRightContext(true);
            e.preventDefault();
        }, false);
    }
}