function changeWorldUnit(unit)
{
    document.getElementById("sceneview").contentWindow.World.unit.size = unit;
    createUnitInScene();
}