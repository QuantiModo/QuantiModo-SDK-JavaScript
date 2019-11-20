import { expect } from "chai";
import * as https from "https";
import * as url from "url";
import * as fileHelper from "../ts/qm.file-helper";
describe("s3 uploader", () => {
  it("uploads a file", (done) => {
    fileHelper.uploadToS3("ionIcons.js", "tests", function(uploadResponse) {
      const myURL = url.parse(uploadResponse.Location);
      const options = {
        hostname: myURL.hostname,
        method: "GET",
        path: myURL.path,
        port: 443,
      };
      const req = https.request(options, (res) => {
        console.log(`statusCode: ${res.statusCode}`);
        expect(res.statusCode).to.eq(200);
        let str = "";
        res.on("data", (chunk) => {
          str += chunk;
        });
        res.on("end", function() {
          console.log(str);
          expect(str).to.contain("iosArrowUp");
          done();
        });
      });
      req.on("error", (error) => {
        console.error(error);
      });
      req.end();
    });
  });
});
