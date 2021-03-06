function grid(size){
    //empty table
    const table = document.querySelector("table");

    while (table.hasChildNodes()) {
        table.removeChild(table.firstChild);
    }
    
    //create rows
    const row = document.createElement("tr");
    
    for (let i =0; i <size; i++)
    {
        const tableData = document.createElement("td");
        row.appendChild(tableData);
    }
  
    for (let i =0; i < size; i++)
    {
        const clone = row.cloneNode(true);
        table.appendChild(clone);
    }

    //cell size configuration
    height = 650/size;
    cells = document.querySelectorAll("td")

    cells.forEach(cell => {
        cell.style.width = height +"px";
        cell.style.height = height +"px";

        //Cell configuration
        cell.addEventListener("mouseenter",function(e){
            if (down == true){
                if (rainbowStatus == true)
                {
                    selectedColor = "#"+Math.floor(Math.random()*16777215).toString(16);
                }

                e.target.style.backgroundColor=selectedColor;
            }
        })
        cell.addEventListener("click",function(e){
            if (rainbowStatus == true)
                {
                    selectedColor = "#"+Math.floor(Math.random()*16777215).toString(16);
                }
            e.target.style.backgroundColor=selectedColor;
        })
    });
}

function defaultColor(selector){
    //select all buttons
    let others = document.querySelectorAll("#controls > div")

    //change buttons to default color
    others.forEach(other => {
        other.style.backgroundColor = "#ff6e40";
    })  

    //change active button to active color
    document.querySelector(selector).style.backgroundColor = "#ffc12b"
}

function defaultmode(){
    selectedColor = document.getElementById("color").value;
    defaultColor("#colorMode");
    rainbowStatus = false;
}

function resetMode(){
    defaultmode();

    cells.forEach(cell => {
        cell.style.backgroundColor = "white";
    });
}

let size = document.querySelector("#size").value;
grid(size);

//Default values
let rainbowStatus = false;
defaultmode();

//track mouse button movement
let down = false;

document.addEventListener("mousedown", function(){
    down = true;
})
document.addEventListener("mouseup", function(){
    down = false;
})


//color mode configuration
document.querySelector("#colorMode").addEventListener("click",defaultmode)
let colorSelector = document.getElementById("color")
colorSelector.addEventListener("input",function(){
    selectedColor = colorSelector.value;
})

//rainbow mode configuration
document.querySelector("#rainbow").addEventListener("click",function(e){
    defaultColor("#"+e.target.id);
    rainbowStatus = true;
})

//eraser button configuration
document.querySelector("#eraser").addEventListener("click",function(e){
    defaultColor("#"+e.target.id);
    rainbowStatus = false;
    selectedColor = "white";
})

//reset button configuration
document.querySelector("#reset").addEventListener("click",resetMode)

//slider configuration
let slider = document.querySelector("#size")
slider.addEventListener("input",function(){
    size = slider.value;
    grid(size);
    document.querySelector("#range > div").innerText = size + "x" + size;
    resetMode();
})

//toggle configuration
let toggle = document.querySelector("#toggle")
toggle.addEventListener("input",function(){
    if (toggle.checked == true)
    {
        cells.forEach(cell => {
            cell.style.borderColor = "black";
            cell.style.borderWidth = "1px";
        });

    }
    else
    {
        cells.forEach(cell => {
            cell.style.borderColor = "white";
            cell.style.borderWidth = "0px";
        });
    }
    
})