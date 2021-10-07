var app = ( function(){
    let apiNameAuthor;
    let privateAuthor = "";
    let mapList = [];
    let totalPoints;
    let pointsBlueprint = [];
    let actualBlueprint;
    let canvas;
    let canvas2d;
    let saveFirst = false;

    var mapBlueprints = function (data){
        console.log("map");
        console.log(data);
        mapList = data.map(function (blueprint){
            let name = blueprint.name;
            let points = blueprint.points.length;
            return {
                name,
                points
            };
        });
    }

    var calculatePoints = function () {
        if (mapList.length > 1) {
            totalPoints = mapList.reduce(function (before, actual) {
                return before.points + actual.points;
            });
        }else {
            totalPoints = mapList[0].points;
        }
    };



    var drawTable = function () {
        let html = "";

        console.log(privateAuthor);
        mapList.map(function (blueprint) {
            html += "<tr>";
            html += "<td>" + blueprint.name +  "</td>";
            console.log(blueprint.name);
            html += "<td>" +blueprint.points+ "</td>";
            html += "<td> <button type='button' class='btn btn-success' onclick='app.drawSaveBlueprint(\""+blueprint.name+"\",\""+privateAuthor+"\");'>Open</button></td>"
            html += "</tr>"

        });

        $("#author_name_table").html(privateAuthor+"'s blueprints");
        $("#Table_Content").html(html);
        $("#points").html("Total user points: " + totalPoints);
    }

    var getBlueprints = function (author) {
        privateAuthor = author;
        apiNameAuthor = apiclient;
        apiclient.getBlueprintsByAuthor(author, function (error, data){
            mapBlueprints(data);
            calculatePoints();
            drawTable();

        })

    };
    var getBluePrintsMock = function (author) {
        privateAuthor = author;
        apiNameAuthor = apimock;
        apimock.getBlueprintsByAuthor(author, function (error, data){
            mapBlueprints(data);
            calculatePoints();
            drawTable();
        })
    };
    var getIndividualBlueprint = function (name, author) {
        console.log("Se obtienen blueprint");
        apiNameAuthor.getBlueprintsByNameAndAuthor(name, author, function (error, blueprint){
            console.log("Asignacion");
            pointsBlueprint = blueprint.points;
            actualBlueprint = blueprint.name;
            console.log("Funcion get");
            console.log(pointsBlueprint);
        })
    };





    return {
        getBlueprints, getBluePrintsMock,


        init: function (pointx, pointy){

            console.log("Inicio evento");

            if(window.PointerEvent){
                canvas.addEventListener("pointerdown", function (event){
                    let newPointX = event.pageX;
                    let newPointY = event.pageY - 378;
                    if(pointsBlueprint.length > 0){
                        console.log("Control Longitud");
                        pointx = 0;
                        pointy = 0;
                    }
                    pointsBlueprint.push({x:newPointX,y:newPointY});

                    console.log("Se agrega punto");
                    console.log(pointsBlueprint);
                    appdraw.drawNewPoint(canvas2d, pointx, pointy, newPointX, newPointY);
                })
            }
            else {
                canvas.addEventListener("mousedown", function (event){
                    alert('mousedown at' + event.clientX+','+event.clientY);
                });
            }
        },

        updateBlueprint: function (){
            console.log("Funciona boton Update");
            apiclient.updateBlueprintByNameAndAuthor(actualBlueprint, privateAuthor, pointsBlueprint);
            getBlueprints(privateAuthor);

        },
        saveBlueprint: function (){
            console.log("Funciona Primera vez update");
            apiclient.postNewBlueprint(actualBlueprint, privateAuthor, pointsBlueprint);
            getBlueprints(privateAuthor);
        },

        createBlueprint: function (newBlueprint){
            saveFirst = true;
            $("#blueprintname").html("Current blueprint: ");
            actualBlueprint = newBlueprint;
            pointsBlueprint = [];
            $("#blueprintname").html("Current blueprint: " + actualBlueprint);
            app.drawNewBlueprintsPoints();
        },
        drawSaveBlueprint: function (name, author) {
            apiNameAuthor.getBlueprintsByNameAndAuthor(name, author, function (error, blueprint){
                console.log("Asignacion");
                pointsBlueprint = blueprint.points;
                actualBlueprint = blueprint.name;
                console.log("Funcion get");
                console.log(pointsBlueprint);
                canvas = document.getElementById("mycanvas");
                canvas2d = canvas.getContext("2d");
                canvas2d.clearRect(0,0,canvas.width,canvas.height);
                canvas2d.beginPath();
                console.log(pointsBlueprint);
                canvas2d.moveTo(pointsBlueprint[0].x,pointsBlueprint[0].y);
                for(let i = 1; i < pointsBlueprint.length; i++){
                    //canvas2d.moveTo(blueprint.points[i-1].x,blueprint.points[i-1].y);
                    canvas2d.lineTo(pointsBlueprint[i].x,pointsBlueprint[i].y);
                    canvas2d.stroke();
                }
                let finalPoint = pointsBlueprint.length - 1;
                app.init(pointsBlueprint[finalPoint].x, pointsBlueprint[finalPoint].y);
            });
            $("#blueprintname").html("Current blueprint: "+name);

        },
        drawNewBlueprintsPoints: function () {
            console.log("Se dibuja nuevo blueprint");
            canvas = document.getElementById("mycanvas");
            canvas2d = canvas.getContext("2d");
            canvas2d.clearRect(0,0,canvas.width,canvas.height);
            canvas2d.beginPath();
            console.log(pointsBlueprint);
            app.init(-2, -2);


        },
        saveUpdate: function () {
            if(saveFirst) {
                app.saveBlueprint();
                saveFirst = false;
            } else {
                app.updateBlueprint();
            }
        },
        deleteCanvas: function () {
            canvas2d.clearRect(0,0,canvas.width,canvas.height);
            apiclient.deleteBlueprint(privateAuthor, actualBlueprint);

        }

    }
})();