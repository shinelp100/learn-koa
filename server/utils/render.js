const fs = require('fs');
const path = require('path');
/*读取静态页面*/
async function render( name ) {
    return new Promise(( resolve, reject ) => {
        let viewUrl = path.join(__dirname + `../../../dist/app/${name}.html`);
        //encoding不为utf-8时会乱码（之前用的是二进制）
        fs.readFile(viewUrl, "utf-8", ( err, data ) => {
            if ( err ) {
                reject( err )
            } else {
                resolve( data )
            }
        })
    })
}

module.exports = render;