var app = ( function(){
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



    var drawTable = function (apiNameAuthor) {
        let html = "";

        console.log(privateAuthor);
        mapList.map(function (blueprint) {
            html += "<tr>";
            html += "<td>" + blueprint.name +  "</td>";
            console.log(blueprint.name);
            html += "<td>" +blueprint.points+ "</td>";
            html += "<td> <button type='button' class='btn btn-success' onclick='app.drawBlueprintsPoints(\""+blueprint.name+"\",\""+privateAuthor+"\", \""+apiNameAuthor+"\");'>Open</button></td>"
            html += "</tr>"

        });

        $("author_name_table").html(privateAuthor+"'s blueprints");
        $("Table_Content").html(html);
        $("points").html("Total user points: " + totalPoints);
    }

    var getBlueprints = function (author) {
        privateAuthor = author;
        let apiNameAuthor = apiclient;
        apiclient.getBlueprintsByAuthor(author, function (error, data){
            mapBlueprints(data);
            calculatePoints();
            drawTable(apiNameAuthor);

        })

    };
    var getBluePrintsMock = function (author) {
        privateAuthor = author;
        let apiNameAuthor = apimock;
        apimock.getBlueprintsByAuthor(author, function (error, data){
            mapBlueprints(data);
            calculatePoints();
            drawTable(apiNameAuthor);
        })
    };


    return {
        getBlueprints, getBluePrintsMock,
        drawBlueprintsPoints: function (name, author, apiNameAuthor) {
            apiNameAuthor.getBlueprintsByNameAndAuthor(name, author, function (error, blueprint){
                let canvas = $("#canvas")[0];
                let canvas2d = canvas.getContext("2d");
                for(let i = 1; i < blueprint.points.length; i++){
                    canvas2d.moveTo(blueprint.points[i-1].x,blueprint.points[i-1].y);
                    canvas2d.lineTo(blueprint.points[i].x,blueprint.points[i].y);
                    canvas2d.stroke();
                }
                $("#blueprintname").html("Current blueprint: "+name);
            })
        }
    }
})();