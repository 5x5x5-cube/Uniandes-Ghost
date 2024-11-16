const fs = require("fs");
const { PNG } = require("pngjs");
const { options } = require("./config.json");
const path = require("path");

async function readFile(filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, (err, data) => {
            if (err) {
                reject(err);
            }
            resolve(data);
        });
    });
}

async function compareImagesWithPixelmatch(beforePath, afterPath) {
    const beforeImage = await readFile(beforePath);
    const afterImage = await readFile(afterPath);

    const beforePNG = PNG.sync.read(beforeImage);
    const afterPNG = PNG.sync.read(afterImage);

    const { width, height } = beforePNG;
    const diff = new PNG({ width, height });
    const pixelmatch = (await import("pixelmatch")).default;

    pixelmatch(
        beforePNG.data,
        afterPNG.data,
        diff.data,
        width,
        height,
        options
    );

    return diff;
}

function writeFileToPath(filePath, data) {
    const basePath = path.resolve(__dirname, "results/compare");

    const directoryPath = filePath.split("/").slice(0, -1);
    const fileName = filePath.split("/").pop();

    const absDicrectoryPath = path.join(basePath, ...directoryPath);
    fs.mkdirSync(absDicrectoryPath, { recursive: true });

    const absFilePath = path.join(absDicrectoryPath, fileName);

    fs.writeFileSync(absFilePath, PNG.sync.write(data));
}

async function main() {
    const diff = await compareImagesWithPixelmatch(
        `./results/cypress/Ghost-4.5.0/F001 - Modificar titulo del sitio/E00101 - Modificación titulo de sitio web/Paso_7.png`,
        `./results/cypress/Ghost-5.96.0/F001 - Modificar titulo del sitio/E00101 - Modificación titulo de sitio web/Paso_7.png`
    );

    writeFileToPath(
        `./results/compare/F001 - Modificar titulo del sitio/E00101 - Modificación titulo de sitio web/Paso_7.png`,
        diff
    );

    console.log(
        "-------------------------------------------------------------"
    );
    console.log(
        "Execution finished. Check the report under the results folder"
    );
}
main();
