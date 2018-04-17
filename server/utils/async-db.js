const mysql = require('mysql');

const pool = mysql.createPool({
    host: '47.104.226.230',
    user: 'shinelp100',
    password: 'shinelp100',
    database: 'ssr'
    // insecureAuth: true
});

let query = function (sql, values) {
    return new Promise((resolve, reject) => {
        pool.getConnection(function (err, connection) {
            if (err) {
                reject(err)
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

let insertData = function(values){
    let _sql = `insert into ssr (IPAddress,Port,Password,Method,imgUrl,moment) values ? `;
    return query(_sql,values);
};

module.exports = {
    query,
    insertData
};