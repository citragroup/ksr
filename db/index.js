const mysql = require("mysql")
var moment = require("moment");

const Cryptr = require('cryptr');
const cryptr = new Cryptr('citrasusu');
key = []
keyss = [
    'ac72e02b762dc010bf8c532ce5d2c36041fae3a454d74787014f8670803f263f2aed23ba5fe8de3e140177e923090abfd62e4258274a0f87cebc02b6da65a9f24bc3207ff4af7164583dbec37c30d7275c3942ae5cac1eb434c074c30dddcb12eb7fa99dec',
    '5dd8dbe7c001901121e5ae85c30d1108d2354badbaa816c9fdbb42162a31ae8b8b1a374eea8dc976d7f8c5e0c13b19768ef9932493dd6f9f79036b920e907fbdb8c210753cd92dca0dead1422ed3adb07c35df3914932b61639c0634ac36888885c5307098d5072f45',
    '0a92884bc41066f8f6c0bb51fecd177610dedc9a2089711d8eaa128ce58188975593f599cb22c6e188c9e60631361e0ff76d84af53bc5997bd263e54e498e7c3a4da854ef263dc2b01c3e3c3022d1be5cbdaea976a91ec3750931188b2c1bcea5a5ee1aaa2031d06c996',

    '403a4da93a7535e26ca5c66f745e34c1a9fce6d650077ae7810306bd4f7818755e8c5a5f9cf1b47c8171b92287daee1bddab533f90c2ab5000e50dcbe9d6708b2628dc14c4f8a588fddcc90962c49b85ac2846de3ceb8d519551a3da1503f6965e0b83cc00173d19d8',
    '9fe94ddfd80ff9b2be9103bb6380139b8db73f0bf20d205dae19ed9ab4517e156f9fc424295ad92b269182e83848d1b127766535b37cd6adf2605b649b547a7be6750c6d1676b924657373bb29f5e74033fd3292b315601aaae8f43fe3b776506f3553d9'
]

// const decryptedString = cryptr.decrypt(encryptedString);

// const encryptedString2 = cryptr.encrypt('adios');
// const decryptedString2 = cryptr.decrypt(encryptedString2);

// const encryptedString3 = cryptr.encrypt('adios100%');
// const decryptedString3 = cryptr.decrypt(encryptedString3);

// const encryptedString4 = cryptr.encrypt('adios122%');
// const decryptedString4 = cryptr.decrypt(encryptedString4);

// const encryptedString5 = cryptr.encrypt('root');
// const decryptedString5 = cryptr.decrypt(encryptedString5);
// key.push(encryptedString)
// key.push(encryptedString2)
// key.push(encryptedString3)
// key.push(encryptedString4)
// key.push(encryptedString5)
console.log(key)
//console.log(encryptedString); // 2a3260f5ac4754b8ee3021ad413ddbc11f04138d01fe0c5889a0dd7b4a97e342a4f43bb43f3c83033626a76f7ace2479705ec7579e4c151f2e2196455be09b29bfc9055f82cdc92a1fe735825af1f75cfb9c94ad765c06a8abe9668fca5c42d45a7ec233f0
//console.log(decryptedString); // bacon

qi = 2
console.log(cryptr.decrypt(keyss[qi]))

const pool3 = mysql.createPool({
    connectionLimit: 10,
    user: "root",
    password: cryptr.decrypt(keyss[qi]),
    database: "bigqr",
    host: "127.0.0.1",
    port: 3306,
});

pool3.getConnection(function (err, connection) {
    if (err) {
        console.log(err); // Mocha will report the error passed here.
        return;
    }
    // Any possible tests on `connection` go here...
    console.log("yes")
})
    let data = {};


    data.payload = (t) => {
        
        tgl = new Date();
        var dd = moment(tgl).subtract(t, "day").format("YYYY-MM-DD");
        var ddb = moment(tgl).format("YYYY-MM-DD HH:mm:ss");
        let da = [];
        console.log("uploading ..." + dd)
        return new Promise((resolve, reject) => {
            pool3.query(
                `select strukno,totalstruk,branchid from y_pos where strukdate >= ? limit 50000`, [dd],
                (err, result) => {
                    if (err) {
                        console.log(err)
                        return reject(err);
                    }
                    for (const i in result) {
                        var brancc = result[i].strukno
                        da.push([
                            result[i].strukno,//yps_no,
                            brancc.split("-", 1)[0],
                            result[i].totalstruk,//yps_total
                            
                        ]);
                    }
                    return resolve(da);
                }
            );
        });
    };

    data.close = () => {
        pool3.end()
    }




    module.exports = data;