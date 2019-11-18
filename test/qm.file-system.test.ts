import { expect } from 'chai';
import * as https from "https";
import * as qmFileSystem from "../src/helpers/qm.file-system";
import * as url from "url";
const isWin = process.platform === "win32";
describe("s3 uploader", () => {
  it("uploads a file", (done) => {
    qmFileSystem.uploadToS3("ionIcons.js", "tests", function(uploadResponse) {
      const myURL = url.parse(uploadResponse.Location);
      const options = {
        hostname: myURL.hostname,
        port: 443,
        path: myURL.path,
        method: "GET"
      };
      const req = https.request(options, res => {
        console.log(`statusCode: ${res.statusCode}`);
        expect(res.statusCode).to.eq(200);
        let str = '';
        res.on("data", chunk => {
          str += chunk;
        });
        res.on('end', function () {
          console.log(str);
          expect(str).to.contain("iosArrowUp");
          done();
        });
      });
      req.on("error", error => {
        console.error(error);
      });
      req.end();
    });
  });
});