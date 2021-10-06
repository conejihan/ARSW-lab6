var app = ( function(){
    let apiNameAuthor;
    let privateAuthor = "";
    let mapList = [];
    let totalPoints;

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
                let canvas = $("#mycanvas")[0];
                let canvas2d = canvas.getContext("2d");
                for(let i = 1; i < blueprint.points.length; i++){
                    canvas2d.moveTo(blueprint.points[i-1].x,blueprint.points[i-1].y);
                    canvas2d.lineTo(blueprint.points[i].x,blueprint.points[i].y);
                    canvas2d.stroke();
                }
                $("#blueprintname").html("Current blueprint: "+name);
            })
        },

        init: function (){
            var canvas = document.getElementById("mycanvas"),
                context = canvas.getContext("2d");
            console.log("Inicio evento");

            if(window.PointerEvent){
                canvas.addEventListener("pointerdown", function (event){
                    alert('pointerdown at' + event.pageX + ',' + event.pageY);
                })
            }
            else {
                canvas.addEventListener("mousedown", function (event){
                    alert('mousedown at' + event.clientX+','+event.clientY);
                });
            }
        }

    }
})();