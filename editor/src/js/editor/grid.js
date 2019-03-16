//#region Objetos
var WorldJSON = '{"size":{"x":"10","y":"10"},"unit":{"type": "block","size": "100"}}';
var World = JSON.parse(WorldJSON);

var SelectedUnit = [];
//#endregion

//#region Iniciar
function init(){
	World.size.x = 25;
	World.size.y = 10;
	World.unit.type = "block";
	createGrid();
	rightClickContext();
}
document.addEventListener('onload',function(event){
	init();
});
//#endregion

//#region Criar Grid/Unit
function createGrid(){
	var grid = document.getElementById("grid");
	grid.innerHTML = "";
	grid.style.width = (World.size.x * World.unit.size) + "px";
	grid.style.height = (World.size.y * World.unit.size) + "px";
	for(var x = 0; x < World.size.x; x++){
		for(var y = 0; y < World.size.y; y++){
			if(World.unit.type == "block")
				createBlock(x,y);
			else if(World.unit.type == "triangle")
				createTriangle(x,y);
			else if(World.unit.type == "polygon")
				createPolygon(x,y);
		}
	}
}

function createBlock(x,y)
{
	grid.innerHTML += "<polygon points='"+x*World.unit.size+","+y*World.unit.size+" "+((1+x)*World.unit.size - 3)+","+y*World.unit.size+" "+((1+x)*World.unit.size -3)+","+((1+y)*World.unit.size - 3)+" "+x*World.unit.size+","+((1+y)*World.unit.size - 3)+"' class='unit' id='block:"+x+"x"+y+"'/>";
}

function createTriangle(x,y)
{
	grid.innerHTML += "<polygon points='"+x*World.unit.size+","+y*World.unit.size+" "+((1+x)*World.unit.size)+","+y*World.unit.size+" "+x*World.unit.size+","+((1+y)*World.unit.size)+"' class='unit' id='triangle:"+x+"x"+y+"-1'/>";
	grid.innerHTML += "<polygon points='"+(1+x)*World.unit.size+","+y*World.unit.size+" "+((1+x)*World.unit.size)+","+((1+y)*World.unit.size)+" "+x*World.unit.size+","+((1+y)*World.unit.size)+"' class='unit' id='triangle:"+x+"x"+y+"-2'/>";
}

function createPolygon(x,y)
{
	grid.innerHTML += "<polygon points='"+x*World.unit.size+","+y*World.unit.size+" "+((1+x)*World.unit.size)+","+y*World.unit.size+" "+(x + 0.5)*World.unit.size+","+((y + 0.5)*World.unit.size)+"' class='unit' id='polygon:"+x+"x"+y+"-1'/>";
	grid.innerHTML += "<polygon points='"+((1+x)*World.unit.size)+","+y*World.unit.size+" "+((1+x)*World.unit.size)+","+((1+y)*World.unit.size)+" "+(0.5+x)*World.unit.size+","+((0.5+y)*World.unit.size)+"' class='unit' id='polygon:"+x+"x"+y+"-2'/>";
	grid.innerHTML += "<polygon points='"+((0.5+x)*World.unit.size)+","+(((0.5+y)*World.unit.size))+" "+((1+x)*World.unit.size)+","+((1+y)*World.unit.size)+" "+x*World.unit.size+","+((1+y)*World.unit.size)+"' class='unit' id='polygon:"+x+"x"+y+"-3'/>";
	grid.innerHTML += "<polygon points='"+x*World.unit.size+","+y*World.unit.size+" "+((0.5+x)*World.unit.size)+","+(0.5+y)*World.unit.size+" "+x*World.unit.size+","+((1+y)*World.unit.size)+"' class='unit' id='polygon:"+x+"x"+y+"-4'/>";
}
//#endregion

//#region Selecionar Unit
var bottonsPressed = [];

document.addEventListener('keydown',function(event)
{
	bottonsPressed.push(event.key);
});
document.addEventListener('keyup',function(event)
{
	bottonsPressed = [];
});
document.addEventListener('mousedown',function(event)
{
	if(event.buttons == 1){
		selectUnit(event.target.id);
	}
});

function selectUnit(id)
{
	if(bottonsPressed.includes("Control")){
		SelectedUnit.push(id);
	}else{
		for(var i = 0; i < SelectedUnit.length; i++){
			selectUnitDesign(false,SelectedUnit[i]);
		}
		SelectedUnit = [];
		SelectedUnit.push(id);
	}
	selectUnitDesign(true,id);
}

function selectUnitDesign(bool,id)
{
	var design = document.getElementById(id);
	if(bool){
		design.style.strokeOpacity = 1;
		design.style.borderColor = "white";
		design.style.stroke = "white";
	}else{
		design.style.strokeOpacity = 0.5;
		design.style.borderColor = "gray";
		design.style.stroke = "gray";
	}
}
//#endregion