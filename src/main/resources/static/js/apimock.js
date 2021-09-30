var apimock = (function () {

    var mockdata = [];

    mockdata["JhonConnor"] = [
        {
            author: "JhonConnor",
            name: "house",
            points: [
                {
                    x: 10,
                    y: 20
                },
                {
                    x: 15,
                    y: 25
                },
                {
                    x: 45,
                    y: 25
                }
            ]
        },
        {
            author: "JhonConnor",
            name: "bike",
            points: [
                {
                    x: 30,
                    y: 35
                },
                {
                    x: 40,
                    y: 45
                }
            ]
        }
    ]

    mockdata['LexLuthor'] = [
        {
            author: 'LexLuthor',
            name: 'kryptonite',
            points: [
                {
                    x: 60,
                    y: 65
                },
                {
                    x: 70,
                    y: 75
                }
            ]
        }
	]
	

	mockdata['Jacinto'] = [
        {
            author: 'Jacinto',
            name: 'houseLitle',
            points: [
                {
                    x: 81,
                    y: 23
                },
                {
                    x: 45,
                    y: 46
                }
            ]
        }
	]
	
	mockdata["Elena"] = [
        {
            author: "Elena",
            name: "car",
            points: [
                {
                    x: 14,
                    y: 5
                },
                {
                    x: 50,
                    y: 69
                },

            ]
        },
        {
            author: "Elena",
            name: "motor",
            points: [
                {
                    x: 35,
                    y: 56
                },
                {
                    x: 2,
                    y: 5
                }
            ]
        }
    ]


    return {
        getBlueprintsByAuthor: function(author, callback) {
            callback(null, mockdata[author]);
        },

        getBlueprintsByNameAndAuthor: function(name, author, callback) {
            blueprint = mockdata[author].find(function(blueprint) {
                return blueprint.name === name
            });
            callback(null, blueprint)
        }
    }

})();