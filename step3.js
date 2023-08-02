const fs = require("fs");
const axios = require("axios");
const process = require("process");

function handleOutput(text, out) {
    if (out) {
        fs.writeFile(out, text, "utf8", function (err) {
            if (err) {
                console.log("output error");
                process.exit(1);
            }
        });
    } else {
        console.log(text);
    }
}

function cat(path, out) {
    fs.readFile(path, "utf8", (err, data) => {
        if (err) {
            console.log("path Error:");
            process.exit(1);
        }
        handleOutput(data, out);
    });
}

async function webCat(url) {
    try {
        let res = await axios.get(url);
        handleOutput(res.data, out);
    } catch (err) {
        console.error("web error");
        process.exit(1);
    }
}

let out;
let path;
// let path = process.argv[2];
if (process.argv[2] === "--out") {
    out = process.argv[3];
    path = process.argv[4];
} else {
    path = process.argv[2];
}

if (path.slice(0, 4) === "http") {
    webCat(path, out);
} else {
    cat(path, out);
}
