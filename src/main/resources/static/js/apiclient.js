var apiclient = (function () {
    return {
        getBlueprintsByAuthor: function (author, callback) {
            $.get(
                {
                    url: "/blueprints/" + author,
                    contentType: "application/json",
                }

            , function (data){
                console.log(data);
                callback(null, data);
            }).fail(function (error) {
                    alert("No existen los datos")
                }
            );

        },

        getBlueprintsByNameAndAuthor: function(name, author, callback) {
            $.get({
                    url: "/blueprints/" + author + "/" + name,
                    contentType: "application/json",
                },

                function (data){
                callback(null, data)
            }).fail(function (){
                alert("error");
            });
        },
        updateBlueprintByNameAndAuthor: function (name, author, newPoints) {
            return $.ajax({
                url: "/blueprints/" + author + "/" + name,
                type: 'PUT',
                data: JSON.stringify({author:author, name:name, points:newPoints}),
                contentType: "application/json"
            }).fail(function (){
                alert("Fallo al actualizar");
            });
        },
        postNewBlueprint: function (name, author, points) {
            $.post({
                url: "/blueprints/",
                data: JSON.stringify({author:author, name:name, points:points}),
                contentType: "application/json",
            }).fail(function (){
                alert("Fallo al crear");
            });
        },
        deleteBlueprint: function (name, author){
            return $.ajax({
                url: "/blueprints/" + author + "/" + name,
                type: 'Delete',
                contentType: "application/json"
            }).fail(function (){
                alert("Fallo al borrar");
            });
        }

    }
})();