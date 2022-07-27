/*
this controller deals with the methods required to login
*/

module.exports = {
    // GET user information
    details: function(req, res) {
        const dbConn = new sql.Connection(dbConfig, function(err) {
            const request = new sql.Request(dbConn);
            
            if(req.accepts('html')) {
                for(var i = 0; i < recordset.length; i++){
                    recordset[i].descriptionAsHTML = markdown.toHTML(recordset[i].description, 'Maruku');
                }

                res.render('recipes/details', {title: 'Recipes', model: recordset[0]});
            }
            else {
                res.json(recordset[0]);
            }
        });
    },
}
