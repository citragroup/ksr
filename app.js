const db = require("./db");
const axios = require("axios");
var moment = require("moment");
tgl = new Date();
var dx = moment(tgl).format("YYYY-MM-DD HH:mm:ss");

async function upload(req, res, next) {
    try {
        const options = {
        headers: {
          "x-access-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6MSwiZHQiOiJBaG1hZFN1YXR1IHNhYXQgbmFudGkgcGFzdGkgcHVueWFiYXlhcXVibWxnQGdtYWlsLmNvbTA4MTkzNzc3MjgxNCIsImlhdCI6MTY1NTQ1Njg1M30.8AFUZyou63DAINusHw49YW-cSo8-GoMw7cUDPc8VzXo",
        },
      };
  
      const body = await db.payload();
      console.log(body)
    //   await axios
    //     .post("https://citrastore.co.id/whatisthis/servs", body, options)
    //     .then((response) => {
    //       console.log(response.data);
          
    //     })
    //     .catch((error) => {
            
    //       console.log(error);
    //     });
    await db.close();
    } catch (e) {
      console.log(e);
      
    }
  }

  upload()
  