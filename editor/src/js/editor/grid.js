//#region Objetos
var WorldJSON = '{"size":{"x":"10","y":"10"},"unit":{"type": "block","size": "100"}}';
var World = JSON.parse(WorldJSON);

var InputJSON = '{"shift":false,"ctrl":false}';
var Input = JSON.parse(InputJSON);

var gridUnits = [];
//#endregion

//#region Iniciar
function init(){
	World.size.x = 20;
	World.size.y = 20;
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
	for(var x = 0; x < World.size.x; x++){
		for(var y = 0; y < World.size.y; y++){ 
			if(World.unit.type == "block")
				insertGridUnits(x,y,"block");
			else if(World.unit.type == "triangle")
				insertGridUnits(x,y,"triangle");
			else if(World.unit.type == "polygon")
				insertGridUnits(x,y,"polygon");
		}
	}
	createUnitInScene();
}

function insertGridUnits(x,y,tipo){
	gridUnits.push({x:x,y:y,type:tipo,flip:false});
}

function createUnitInScene(){
	var grid = document.getElementById("grid");
	grid.innerHTML = "";
	grid.style.width = (World.size.x * World.unit.size) + "px";
	grid.style.height = (World.size.y * World.unit.size) + "px";
	for(var i = 0; i < gridUnits.length; i++){
		if(gridUnits[i].type == "block")
			createBlock(gridUnits[i].x,gridUnits[i].y);
		else if(gridUnits[i].type == "triangle" && gridUnits[i].flip == true)	
			createRTriangle(gridUnits[i].x,gridUnits[i].y);
		else if(gridUnits[i].type == "triangle")
			createTriangle(gridUnits[i].x,gridUnits[i].y);
		else if(gridUnits[i].type == "polygon")
			createPolygon(gridUnits[i].x,gridUnits[i].y);
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

function createRTriangle(x,y)
{
	grid.innerHTML += "<polygon points='"+x*World.unit.size+","+y*World.unit.size+" "+((1+x)*World.unit.size)+","+y*World.unit.size+" "+(1+x)*World.unit.size+","+((1+y)*World.unit.size)+"' class='unit' id='triangle:"+x+"x"+y+"-1'/>";
	grid.innerHTML += "<polygon points='"+x*World.unit.size+","+y*World.unit.size+" "+((1+x)*World.unit.size)+","+((1+y)*World.unit.size)+" "+x*World.unit.size+","+((1+y)*World.unit.size)+"' class='unit' id='triangle:"+x+"x"+y+"-2'/>";
}

function createPolygon(x,y)
{
	grid.innerHTML += "<polygon points='"+x*World.unit.size+","+y*World.unit.size+" "+((1+x)*World.unit.size)+","+y*World.unit.size+" "+(x + 0.5)*World.unit.size+","+((y + 0.5)*World.unit.size)+"' class='unit' id='polygon:"+x+"x"+y+"-1'/>";
	grid.innerHTML += "<polygon points='"+((1+x)*World.unit.size)+","+y*World.unit.size+" "+((1+x)*World.unit.size)+","+((1+y)*World.unit.size)+" "+(0.5+x)*World.unit.size+","+((0.5+y)*World.unit.size)+"' class='unit' id='polygon:"+x+"x"+y+"-2'/>";
	grid.innerHTML += "<polygon points='"+((0.5+x)*World.unit.size)+","+(((0.5+y)*World.unit.size))+" "+((1+x)*World.unit.size)+","+((1+y)*World.unit.size)+" "+x*World.unit.size+","+((1+y)*World.unit.size)+"' class='unit' id='polygon:"+x+"x"+y+"-3'/>";
	grid.innerHTML += "<polygon points='"+x*World.unit.size+","+y*World.unit.size+" "+((0.5+x)*World.unit.size)+","+(0.5+y)*World.unit.size+" "+x*World.unit.size+","+((1+y)*World.unit.size)+"' class='unit' id='polygon:"+x+"x"+y+"-4'/>";
}
//#endregion

//#region Transformar Unit
function splitUnit(){
	for(var d = 0; d < SelectedUnit.length; d++){
		var id = SelectedUnit[d];
		var tipo = id.split(':')[0];
		var x = id.split(':')[1].split('x')[0];
		var y = id.split(':')[1].split('x')[1].split('-')[0];
		x = parseInt(x);
		y = parseInt(y);

		for(var i = 0; i < gridUnits.length; i++){
			if(tipo == "block"){
				if(gridUnits[i].x == x && gridUnits[i].y == y){
					gridUnits[i] = {x:x,y:y,type:"triangle",flip:gridUnits[i].flip};
					break;
				}
			}else if(tipo == "triangle"){
				if(gridUnits[i].x == x && gridUnits[i].y == y){
					gridUnits[i] = {x:x,y:y,type:"polygon",flip:gridUnits[i].flip};
					break;
				}
			}
		}
	}

	createUnitInScene();
	showRightContext(false);
	unselectUnit();
}

function uniformUnit(){
	for(var d = 0; d < SelectedUnit.length; d++){
		var id = SelectedUnit[d];
		var tipo = id.split(':')[0];
		var x = id.split(':')[1].split('x')[0];
		var y = id.split(':')[1].split('x')[1].split('-')[0];
		x = parseInt(x);
		y = parseInt(y);

		for(var i = 0; i < gridUnits.length; i++){
			if(tipo == "triangle"){
				if(gridUnits[i].x == x && gridUnits[i].y == y){
					gridUnits[i] = {x:x,y:y,type:"block",flip:gridUnits[i].flip};
					break;
				}
			}else if(tipo == "polygon"){
				if(gridUnits[i].x == x && gridUnits[i].y == y){
					gridUnits[i] = {x:x,y:y,type:"triangle",flip:gridUnits[i].flip};
					break;
				}
			}
		}
	}

	createUnitInScene();
	showRightContext(false);
	unselectUnit();
}

function flipUnit(){
	for(var d = 0; d < SelectedUnit.length; d++){
		var id = SelectedUnit[d];
		var tipo = id.split(':')[0];
		var x = id.split(':')[1].split('x')[0];
		var y = id.split(':')[1].split('x')[1].split('-')[0];
		x = parseInt(x);
		y = parseInt(y);

		for(var i = 0; i < gridUnits.length; i++){
			if(gridUnits[i].x == x && gridUnits[i].y == y){
				gridUnits[i] = {x:x,y:y,type:gridUnits[i].type,flip:!gridUnits[i].flip};
				break;
			}
		}
	}

	createUnitInScene();
	showRightContext(false);
	unselectUnit();
}

//#endregion

//#region Selecionar Unit
var SelectedUnit = [];

document.addEventListener('keydown',function(event)
{
	if(event.key == "Control") Input.ctrl = true;
	else if(event.key == "Shift") Input.shift = true;
});
document.addEventListener('keyup',function(event)
{
	if(event.key == "Control") Input.ctrl = false;
	else if(event.key == "Shift") Input.shift = false;
});
document.addEventListener('mousedown',function(event)
{
	if(event.buttons == 1 && event.target.className.baseVal == "unit"){
		selectUnit(event.target.id);
	}else if(SelectedUnit.length < 2 && event.target.className.baseVal == "unit" && event.buttons == 2){
		selectUnit(event.target.id);
	}
});

document.addEventListener('mousemove', function(event){
	if(Input.shift){
		if(Input.ctrl){
			if(SelectedUnit.includes(event.target.id)&& event.target.className.baseVal == "unit"){
				selectUnit(event.target.id);
			}
		}else{
			if(!SelectedUnit.includes(event.target.id)&& event.target.className.baseVal == "unit"){
				selectUnit(event.target.id);
			}
		}
	}	
});

function unselectUnit(){
	SelectedUnit = [];
}

function selectUnit(id)
	{if(Input.shift && Input.ctrl){
		for(var i = 0; i < SelectedUnit.length; i++){
			if(SelectedUnit[i] == id){
				SelectedUnit.splice(i,1);
				selectUnitDesign(false,id);
				break;
			}
		}
	}else if(Input.shift){
		SelectedUnit.push(id);
		selectUnitDesign(true,id);
	}else if(Input.ctrl){
		if(SelectedUnit.includes(id)){
			for(var i = 0; i < SelectedUnit.length; i++){
				if(SelectedUnit[i] == id){
					SelectedUnit.splice(i,1);
					selectUnitDesign(false,id);
					break;
				}
			}
		}else{
			SelectedUnit.push(id);
			selectUnitDesign(true,id);
		}
	}else{
		for(var i = 0; i < SelectedUnit.length; i++){
			selectUnitDesign(false,SelectedUnit[i]);
		}
		SelectedUnit = [];
		SelectedUnit.push(id);
		selectUnitDesign(true,id);
	}

	if(SelectedUnit.length > 0){
		document.getElementById("split").className = "";
		document.getElementById("uniform").className = "";
	}else{
		document.getElementById("split").className = "disable";
		document.getElementById("uniform").className = "disable";
	}
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

//#region Movimentação da Camera do Editor

var PressedKey = [];

document.addEventListener('keydown',function(event)
{
	if(!PressedKey.includes(event.key)){
		PressedKey.push(event.key);
	}
});

document.addEventListener('keyup',function(event)
{
	if(PressedKey.includes(event.key)){
		for(var i = 0; i < PressedKey.length; i++){
			if(PressedKey[i] == event.key){
				PressedKey.splice(i,1);
				break;
			}
		}
	}
});

var velocidade = 2;

setInterval(() => {
	if(PressedKey.includes("w"))
		scrollTo(scrollX,scrollY - velocidade);
	if(PressedKey.includes("a"))
		document.body.scrollTo(document.body.scrollLeft - velocidade,document.body.scrollTop);
	if(PressedKey.includes("s"))
		scrollTo(scrollX,scrollY + velocidade);
	if(PressedKey.includes("d"))
		document.body.scrollTo(document.body.scrollLeft + velocidade,document.body.scrollTop);
	
}, 10);

//#endregion