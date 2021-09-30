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

        getBlueprintsByNameAndAuthor: function (name, author, callback) {
            $.get({
                url: "/blueprints/" + author + "/" + name,
                contentType: "application/json",
            }, function (data){
                callback(null. data);
            })
            .fail(function (error) {
                    alert("No existen los datos")
                }
            );
        }
    }
})();