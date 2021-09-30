var app = ( function(){
    let privateAuthor = "";
    let mapList = [];
    let totalPoints;

    var mapBlueprints = function (data){
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

    var getBlueprints = function (author) {
        privateAuthor = author;
        apiclient.getBlueprintsByAuthor(author, function (error, data){
            mapBlueprints(data);
            calculatePoints();

        })

    };
    var getBluePrintsMock = function (author) {
        privateAuthor = author;
        apimock.getBlueprintsByAuthor(author, function (error, data){
            mapBlueprints(data);
            calculatePoints();
        })
    };


    return {
        getBlueprints, getBluePrintsMock
    }
})();