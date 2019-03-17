//#region Objetos
var CursorJSON = '{"mouse":{"x":"0","y":"0"}}';
var Cursor = JSON.parse(CursorJSON);
//#endregion

//#region Posição do Mouse
document.addEventListener('mousemove', function(event){
	Cursor.x = event.clientX;
	Cursor.y = event.clientY; 
});
//#endregion

//#region Botão Direito Personalizado
function initRightContext(){
	var rightContext = document.getElementById("rightContent");
	rightContext.innerHTML += "Forma da Unidade<br>";
	rightContext.innerHTML += "<a id='split' onclick='splitUnit()' class='disable'>Separar</a>";
	rightContext.innerHTML += "<a id='uniform' onclick='uniformUnit()' class='disable'>Unificar</a>";
	rightContext.innerHTML += "<hr>";
}

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
	initRightContext();
}
//#endregion