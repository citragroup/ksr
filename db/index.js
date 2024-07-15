const mysql = require("mysql")
var moment = require("moment");

const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotallySecretKey');

const encryptedString = cryptr.encrypt('Jancok1994');
const decryptedString = cryptr.decrypt(encryptedString);

console.log(encryptedString); // 2a3260f5ac4754b8ee3021ad413ddbc11f04138d01fe0c5889a0dd7b4a97e342a4f43bb43f3c83033626a76f7ace2479705ec7579e4c151f2e2196455be09b29bfc9055f82cdc92a1fe735825af1f75cfb9c94ad765c06a8abe9668fca5c42d45a7ec233f0
console.log(decryptedString); // bacon
const pool3 = mysql.createPool({
  connectionLimit: 10,
  user: "root",
  password: decryptedString,
  database: "divipro_citra_susu",
  host: "127.0.0.1",
  port: 3306,
});

let data = {};


data.payload = () => {
    tgl = new Date();
    var dd = moment(tgl).subtract(200, "day").format("YYYY-MM-DD");
    var ddb =  moment(tgl).format("YYYY-MM-DD HH:mm:ss");
    let da = [];
    console.log("uploading ..."  +dd)
    return new Promise((resolve, reject) => {
      pool3.query(
        `select strukno,branchid,totalstruk from y_pos where create_date >= ? limit 50000`,[dd],
        (err, result) => {
          if (err) {
            return reject(err);
          }
          for (const i in result) {
            da.push([
              result[i].strukno,//yps_no,
              result[i].totalstruk,//yps_total
              result[i].branchid
              ]);
          }
          return resolve(da);
        }
      );
    });
  };
  



module.exports = data;