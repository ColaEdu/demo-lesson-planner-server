const fs = require('fs');
const markdownpdf = require("markdown-pdf");
const path = require('path')


async function convertMarkdownToPdf(markdownString) {
  return new Promise((resolve, reject) => {
      markdownpdf().from.string(markdownString).to.buffer({}, function (err, buffer) {
          if (err) {
              reject(err);
          } else {
              fs.writeFile("./pdfs/output.pdf", buffer, function(err) {
                  if(err) {
                      reject(err);
                  } else {
                      resolve("PDF created successfully");
                  }
              });
          }
      });
  });
}

const genPdf = async (req, res) => {
  // Replace this with he actual markdown string or fetch it from a database
    const markdownString = req.body.markdownString;

    try {
        await convertMarkdownToPdf(markdownString);
        res.download(path.join(__dirname, '/pdfs/output.pdf'), 'output.pdf', (err) => {
            if (err) {
                res.status(500).send({
                    message: "Could not download the file. " + err,
                });
            }
        });
    } catch (err) {
        res.status(500).send({
            message: "Could not convert markdown to PDF. " + err,
        });
    }
}

module.exports = genPdf ;