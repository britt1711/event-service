/**
 * file connects to database
 */

const sql = require('mssql');
const dbconfig = require('./config')

// mssql database connection
var database = {
    user: dbconfig.sql.user,
    password: dbconfig.sql.password,
    server: dbconfig.sql.server,
    database: dbconfig.sql.database,
    options: {
        trustedConnection: true,
        encryption: true,
        enableArithAbort: true,
        trustServerCertificate: true
    }
};

// connect to database
const dbConn = sql.connect(database, function(err) {
    if (err) {
        console.log(err)
    } else {
        console.log('Connected successfully to the database')
    };
});

module.exports = {
    dbConn
}