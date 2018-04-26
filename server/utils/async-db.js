const mysql = require('mysql');
const config = require('../config');

const pool = mysql.createPool({
    host:  config.database.HOST,
    user: config.database.USERNAME,
    password: config.database.PASSWORD,
    database: config.database.DATABASE
    // insecureAuth: true
});

let query = function (sql, values) {
    return new Promise((resolve, reject) => {
        pool.getConnection(function (err, connection) {
            if (err) {
                reject(err);
            } else {
                connection.query(sql, values, (err, rows) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(rows)
                    }
                    connection.release();
                })
            }
        })
    })
};

/*values的数据格式需要注意*/
let insertData = function(values){
    let _sql = `insert into ssr (IPAddress,Port,Password,Method,imgUrl,date) values ? `;
    return query(_sql,values);
};

module.exports = {
    query,
    insertData
};