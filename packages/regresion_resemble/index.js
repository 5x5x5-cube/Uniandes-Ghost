const compareImages = require("resemblejs/compareImages");
const config = require("./config.json");
const fs = require("fs");
const path = require("path");

const { options } = config;
const Ghost4 = config.urlIni;
const Ghost5 = config.urlCom;

async function executeTest() {
  const response = {};
  const results = await getFolder(Ghost5);

  for (let f = 0; f < countSubfolders(Ghost5); f++) {
    try {
      const namefolder = results[f];
      const steps = await getFolder(`${Ghost5}/${namefolder}`);
      let resultInfo = {};
      for (step of steps) {
        const data = await compareImages(
          `${Ghost4}/${namefolder}/${step}`,
          `${Ghost5}/${namefolder}/${step}`,
          options
        );

        resultInfo[step] = {
          isSameDimensions: data.isSameDimensions,
          dimensionDifference: data.dimensionDifference,
          rawMisMatchPercentage: data.rawMisMatchPercentage,
          misMatchPercentage: data.misMatchPercentage,
          diffBounds: data.diffBounds,
          analysisTime: data.analysisTime,
        };

        const folder = `./results/compare/${namefolder}`;
        if (!fs.existsSync(folder)) {
          fs.mkdir(folder, { recursive: true }, (err) => {
            if (err) throw err;
          });
        }
        fs.writeFileSync(`${folder}/${step}`, data.getBuffer());
      }
      response[namefolder] = resultInfo;
    } catch (error) {
      console.error("Error al procesar las comparaciones:", error);
    }
  } 

  return response;
}

function countSubfolders(directoryPath) {
  try {
    const files = fs.readdirSync(directoryPath, { withFileTypes: true });
    const folders = files.filter(file => file.isDirectory());
    return folders.length;
  } catch (error) {
    console.error('Error reading directory:', error);
    return 0;
  }
}

function getFolder(dir) {
  return new Promise((resolve, reject) => {
    fs.readdir(dir, (error, archivos) => {
      if (error) reject(error);
      else resolve(archivos);
    });
  });
}

function screenshot(namefolder, imagen) {
  return `
  <div class="browser" id="test0">
    <div class=" btitle">
        <h3>Browser: ${imagen}</h3>
    </div>
    <div class="imgline">
      <div class="imgcontainer">
        <span class="imgname">Referencia ${Ghost4}</span>
        <img class="img2" src="${Ghost4}/${namefolder}/${imagen}" id="refImage" label="Reference">
      </div>
      <div class="imgcontainer">
        <span class="imgname">Test ${Ghost5}</span>
        <img class="img2" src="${Ghost5}/${namefolder}/${imagen}" id="testImage" label="Test">
      </div>
    </div>
    <div class="imgline">
      <div class="imgcontainer">
        <span class="imgname">Diff</span>
        <img class="imgfull" src="./results/compare/${namefolder}/${imagen}" id="diffImage" label="Diff">
      </div>
    </div>
  </div>
  `;
}

function directorio(namefolder, response) {
  return `
  <h2>${namefolder}</h2>
  ${Object.keys(response[namefolder]).map((imagen) => {
    return screenshot(namefolder, imagen);
  })}
  `;
}

function createReport(datetime, response) {
  return `
  <html>
    <head>
      <title> Reporte UNIANDES </title>
      <link href="index.css" type="text/css" rel="stylesheet">
    </head>
    <body>
      <h1>Reporte para 
        <a href="${Ghost4}"> ${Ghost4}</a>
        <a href="${Ghost5}"> ${Ghost5}</a>
      </h1>
      <p>Executado: ${datetime}</p>
      <div id="visualizer">
        ${Object.keys(response).map((namefolder) => {
          return directorio(namefolder, response);
        })}
      </div>
    </body>
  </html>
  `;
}

async function main() {
  const response = await executeTest();

  const datetime = new Date().toISOString().replace(/:/g, "");
  const report = createReport(datetime, response);
  fs.writeFileSync(`../../report/index.html`, report);
  fs.copyFileSync("./index.css", `../../report/index.css`);
  fs.cpSync("./results", `../../report/results`, { recursive: true });

  console.log("-------------------------------------------------------------");
  console.log("Execution finished. Check the report under the results folder");
}
main();