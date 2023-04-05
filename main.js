img = "";
objetos = [];
status = "";
som = "";

function preload()
{
    som = loadSound("music.mp3")
}
function setup()
{
    canvas = createCanvas(400,400);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(400,400);
    video.hide();
}

function start()
{
    objectDetector = ml5.objectDetector("cocossd", modelLoaded)
    document.getElementById("status").innerHTML = "status detectando objeto";
}
function draw()
{
    image(video,0,0,400,400);
    if(status != "")
    {
        objectDetector.detect(video, gotResults);
        for(i=0; i<objetos.length; i++)
        {
            document.getElementById("status").innerHTML = "status detectando objeto";  
            document.getElementById("objects").innerHTML = "quantidade de objetos detectados" + objetos.length;
            fill("#25500");
            percent = floor(objetos[i].confidence * 100); 
            text(objetos[i].label + " " + percent + "%", objetos[i].x + 15, objetos[i].y + 15); 
            noFill(); stroke(r,g,b); 
            rect(objetos[i].x, objetos[i].y, objetos[i].width, objetos[i].height);
                if(objetos [i].label=="person")
                {
                    document.getElementById("status").innerHTML = "Bebê Encontrado"
                    som.stop();
                }
                else
                {
                    document.getElementById("status").innerHTML = "Bebê Não Encontrado"
                    som.play();
                }
        }
    }
    
}

function modelLoaded()
{
    console.log("modelo carregado");
    status = "true";
}
function gotResults(error, results)
{
    if(error)
    {
        console.log("erro");
    }
    else
    {
        console.log(results);
        objetos = results;
    }
    
}