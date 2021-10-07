var app = ( function(){
    let apiNameAuthor;
    let privateAuthor = "";
    let mapList = [];
    let totalPoints;
    let pointsBlueprint = [];
    let actualBlueprint;

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
            html += "<td> <button type='button' class='btn btn-success' onclick='app.drawBlueprintsPoints(\""+blueprint.name+"\",\""+privateAuthor+"\");'>Open</button></td>"
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


    return {
        getBlueprints, getBluePrintsMock,
        drawBlueprintsPoints: function (name, author) {
            console.log("nombre Blueprint: ");
            console.log(name);
            console.log("Nombre autor: ");
            console.log(author);
            console.log(apiNameAuthor);
            apiNameAuthor.getBlueprintsByNameAndAuthor(name, author, function (error, blueprint){
                pointsBlueprint = blueprint.points;
                actualBlueprint = blueprint.name;
                let canvas = document.getElementById("mycanvas");
                let canvas2d = canvas.getContext("2d");
                canvas2d.clearRect(0,0,canvas.width,canvas.height);
                canvas2d.beginPath();
                canvas2d.moveTo(blueprint.points[0].x,blueprint.points[0].y);
                for(let i = 1; i < blueprint.points.length; i++){
                    //canvas2d.moveTo(blueprint.points[i-1].x,blueprint.points[i-1].y);
                    canvas2d.lineTo(blueprint.points[i].x,blueprint.points[i].y);
                    canvas2d.stroke();
                }
                let finalPoint = blueprint.points.length - 1;
                app.init(canvas2d, blueprint.points[finalPoint].x, blueprint.points[finalPoint].y);
                $("#blueprintname").html("Current blueprint: "+name);
            })
        },

        init: function (canvas2d, pointx, pointy){
            var canvas = document.getElementById("mycanvas"),
                context = canvas.getContext("2d");
            console.log("Inicio evento");

            if(window.PointerEvent){
                canvas.addEventListener("pointerdown", function (event){
                    let newPointX = event.pageX;
                    let newPointY = event.pageY - 378;
                    pointsBlueprint.push({x:newPointX,y:newPointY});
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

        }

    }
})();