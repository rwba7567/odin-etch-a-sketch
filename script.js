function grid(size){
    //empty table
    const table = document.querySelector("table");

    while (table.hasChildNodes()) {
        table.removeChild(table.firstChild);
    }


    let down = 0;

    document.addEventListener("mousedown", function(){
        down = 1;
    })
    document.addEventListener("mouseup", function(){
        down = 0;
    })


    

    //create rows
    const row = document.createElement("tr");
    table.appendChild(row);
    
    for (let i =0; i <size; i++)
    {
        
        const tableData = document.createElement("td");
        row.appendChild(tableData);
    }
  
    for (let i =0; i < (size-1); i++)
    {
        const tableRow = document.querySelector("tr")
        const clone = tableRow.cloneNode(true);
        table.appendChild(clone);
    }

    //configure cell size
    height = 650/size;
    cells = document.querySelectorAll("td")

    cells.forEach(cell => {
        cell.style.width = height +"px";
        cell.style.height = height +"px";
        cell.addEventListener("mouseenter",function(e){
            if (down == 1){
                if (rainbowStatus == true)
                {
                    selectedColor = "#"+Math.floor(Math.random()*16777215).toString(16);
                }

                e.target.style.backgroundColor=selectedColor;
            }
        })
    });
}

function defaultColor(selector){
    let others = document.querySelectorAll("#controls > div")

    others.forEach(other => {
        other.style.backgroundColor = "#ff6e40";
    })  

    document.querySelector(selector).style.backgroundColor = "#ffc12b"
}

function defaultmode(){
    selectedColor = document.getElementById("color").value;
    defaultColor("#colorMode");
    rainbowStatus = false;
}

function resetMode(){
    defaultmode();
    rainbowStatus = false;

    cells.forEach(cell => {
        cell.style.backgroundColor = "white";
    });
}

let size = document.querySelector("#size").value;
grid(size);

let rainbowStatus = false;
defaultmode();

//color mode configuration
document.querySelector("#colorMode").addEventListener("click",defaultmode)

document.getElementById("color").addEventListener("input",function(){
    selectedColor = document.getElementById("color").value;
})

//rainbow mode configuration
document.querySelector("#rainbow").addEventListener("click",function(){
    defaultColor("#rainbow")
    rainbowStatus = true;
})

//eraser button configuration
document.querySelector("#eraser").addEventListener("click",function(){
    defaultColor("#eraser");
    rainbowStatus = false;

    selectedColor = "white";
})

//reset button configuration
document.querySelector("#reset").addEventListener("click",resetMode)

//slider configuration
document.querySelector("#size").addEventListener("input",function(){
    size = document.querySelector("#size").value;
    grid(size);
    document.querySelector("#range > div").innerText = size + "x" + size;
    resetMode();
})