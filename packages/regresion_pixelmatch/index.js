import fs from "fs";
import path from "path";
import { PNG } from "pngjs";
import { fileURLToPath } from "url";
import config from "./config.json" assert { type: "json" };
import cliProgress from "cli-progress";
import { generateReport } from "./generate-report.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const baseVersionFolder = config.urlBase;
const rtVersionFolder = config.urlRT;
const comparisonFolder = config.comparisonOutput;

async function generateVRT() {
    const baseVersionContents = await readDirectoryRecursively(
        baseVersionFolder
    );

    const baseVersionImages = baseVersionContents.filter((file) =>
        file.endsWith(".png")
    );

    const baseVersionImagesRelative = baseVersionImages.map((file) =>
        path.relative(baseVersionFolder, file)
    );

    if (baseVersionImagesRelative.length === 0) {
        logToConsole("No images found in the base version folder");
        return;
    }

    logToConsole(
        `Found ${baseVersionImagesRelative.length} images in base version to compare`
    );
    logToConsole(
        "-------------------------------------------------------------"
    );
    logToConsole("Starting comparison...");

    const progressBar = new cliProgress.SingleBar(
        {},
        cliProgress.Presets.shades_classic
    );
    progressBar.start(baseVersionImagesRelative.length, 0);

    await Promise.allSettled(
        baseVersionImagesRelative.map((imageRelativePath) =>
            makeVRTComparison(imageRelativePath, progressBar)
        )
    );

    progressBar.stop();
}

function logToConsole(message) {
    console.log(`\n${message}\n`);
}

async function makeVRTComparison(imageRelativePath, progressBar) {
    const rtVersionImagePath = path.join(rtVersionFolder, imageRelativePath);

    const baseVersionImagePath = path.join(
        baseVersionFolder,
        imageRelativePath
    );

    if (!fs.existsSync(rtVersionImagePath)) {
        logToConsole(
            `\nImage not found in the RT version: ${rtVersionImagePath}`
        );
        progressBar.increment();
        return;
    }

    const diff = await compareImagesWithPixelmatch(
        baseVersionImagePath,
        rtVersionImagePath
    );

    writeCompartisonImage(imageRelativePath, diff);
    progressBar.increment();
}

function readDirectoryRecursively(dir) {
    let results = [];

    const list = fs.readdirSync(dir);
    list.forEach((file) => {
        file = path.resolve(dir, file);
        const stat = fs.statSync(file);

        if (stat && stat.isDirectory()) {
            results = results.concat(readDirectoryRecursively(file));
        } else {
            results.push(file);
        }
    });

    return results;
}

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
        config.options
    );

    return diff;
}

function writeCompartisonImage(filePath, data) {
    const basePath = path.resolve(__dirname, comparisonFolder);

    const directoryPath = filePath.split("/").slice(0, -1);
    const fileName = filePath.split("/").pop();

    const absDicrectoryPath = path.join(basePath, ...directoryPath);
    fs.mkdirSync(absDicrectoryPath, { recursive: true });

    const absFilePath = path.join(absDicrectoryPath, fileName);

    fs.writeFileSync(absFilePath, PNG.sync.write(data));
}

async function main() {
    await generateVRT();
    await generateReport();

    logToConsole(
        "-------------------------------------------------------------"
    );
    logToConsole(
        "Execution finished. Check the report under the results folder"
    );
}
main();
