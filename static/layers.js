//Layers
var canvasIDCounter = 0;
var layerForm = document.forms["layer-form"];
var newLayer = function() {
    let c = document.createElement("canvas");
    c.className += " helpercanvas";
    c.width = canvas.width;
    c.height = canvas.height;
    canvasIDCounter += 1;
    c.canvasid = canvasIDCounter;
    content.insertBefore(c, cursorCanvas)
    canvases[c.canvasid] = c
    canvasesOrdering.push(c.canvasid);
    let divContainer = document.createElement("div");
    let newDiv = document.createElement("div");
    //Add new layer div
    newDiv.addEventListener("click", function() {
        changeActiveLayer(this);
    });
    newDiv.setAttribute("value",c.canvasid.toString());
    newDiv.innerHTML +=  (c.canvasid + 1).toString() + "<br>";
    let deleteDiv = document.createElement("div");
    deleteDiv.innerHTML = "X";
    deleteDiv.addEventListener("click", function(e) {
        deleteLayer(c.canvasid);
    });
    divContainer.className += " div-container";
    divContainer.appendChild(newDiv);
    divContainer.appendChild(deleteDiv);
    layerForm.insertBefore(divContainer, layerForm.firstChild);

    divs[c.canvasid] = divContainer;

}

var divs = {0: layerForm.children[0]};
divs[0].addEventListener("click", function() {
    changeActiveLayer(this.children[0]);
});

var changeActiveLayer = function(e) {
    canvas = canvases[parseInt(e.attributes.value.value)];
    ctx = canvas.getContext("2d");
}

//Adding Layers
var addLayerButton = document.getElementById("addlayer");
addLayerButton.addEventListener("click", newLayer);


//Deleting Layers
var deleteLayer = function(cid) {
    canvases[cid].remove()
    canvases[cid] = undefined;
    canvasesOrdering.splice(canvasesOrdering.indexOf(cid), 1);
    divs[cid].remove();
    divs[cid] = undefined;
    changeActiveLayer(divs[0].children[0])
}
