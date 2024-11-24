import config from "./config.json" assert { type: "json" };
import fs from "fs";
import path from "path";

const baseVersionFolder = config.urlBase;
const rtVersionFolder = config.urlRT;
const comparisonFolder = config.comparisonOutput;
const reportFolder = "./results/report";

function getRelativePath(baseVersionImage, reportFolder) {
    const relativePath = path.relative(reportFolder, baseVersionImage);
    return relativePath;
}

function readDirectoryStructure(dir, relativePath) {
    const result = [];

    const list = fs.readdirSync(dir);
    list.forEach((file) => {
        const filePath = path.resolve(dir, file);
        const stat = fs.statSync(filePath);

        if (stat && stat.isDirectory()) {
            result.push({
                name: file,
                relativePath: getRelativePath(filePath, reportFolder),
                items: readDirectoryStructure(filePath, relativePath),
            });
        } else {
            if (!file.match(/\.(jpe?g|png|gif)$/)) {
                return;
            }

            // Add file to result
            result.push({
                name: file,
                relativePath: getRelativePath(filePath, relativePath),
            });
        }
    });

    return result;
}

function createHeader() {
    return `
    <head>
        <title>Reporte UNIANDES</title>
        <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
            integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"
            crossorigin="anonymous"
        />
    </head>
    `;
}

function createReportInfo() {
    return `
    <div class="card px-0">
        <div class="card-header">
            <strong>Aplicación bajo prueba: GHOST</strong>
        </div>
        <ul class="list-group list-group-flush">
            <li class="list-group-item">
                <strong>Versión base:</strong>
                ${baseVersionFolder}
            </li>
            <li class="list-group-item">
                <strong> Versión RT:</strong>
                ${rtVersionFolder}
            </li>
            <li class="list-group-item">
                <strong>Ejecución:</strong>
                ${new Date().toISOString()}
            </li>
        </ul>
    </div>
    `;
}

function fileExists(filePath) {
    return fs.existsSync(filePath);
}

function createStep(step) {
    const baseImagePath = `${baseVersionFolder}/${step.relativePath}`;
    const rtImagePath = `${rtVersionFolder}/${step.relativePath}`;
    const comparisonImagePath = `${comparisonFolder}/${step.relativePath}`;

    const baseImageHtml = fileExists(baseImagePath)
        ? `<img class="figure-img img-fluid" src="${getRelativePath(
              baseImagePath,
              reportFolder
          )}" />`
        : `<p class="fs-2 text-center text-muted">Imagen no encontrada</p>`;

    const rtImageHtml = fileExists(rtImagePath)
        ? `<img class="figure-img img-fluid" src="${getRelativePath(
              rtImagePath,
              reportFolder
          )}" />`
        : `<p class="fs-2 text-center text-muted">Imagen no encontrada</p>`;

    const comparisonImageHtml = fileExists(comparisonImagePath)
        ? `<img class="figure-img img-fluid" src="${getRelativePath(
              comparisonImagePath,
              reportFolder
          )}" />`
        : `<p class="fs-2 text-center text-muted">Imagen no generada</p>`;

    return `
    <div>
        <h5 class="card-header">
            <strong>${step.name}</strong>
        </h5>
        <div class="row">
            <figure class="figure col-6">
                <figcaption class="figure-caption text-center fs-5 text-success">
                    <strong>Versión base</strong>
                </figcaption>
                ${baseImageHtml}
            </figure>
            <figure class="figure col-6">
                <figcaption class="figure-caption text-center fs-5 text-info">
                    <strong>Versión RT</strong>
                </figcaption>
                ${rtImageHtml}
            </figure>
            <figure class="figure col-12">
                <figcaption class="figure-caption text-center fs-5 text-danger">
                    <strong>Comparación</strong>
                </figcaption>
                ${comparisonImageHtml}
            </figure>
        </div>
        <br />
        <hr />
    </div>
    `;
}

function createScenarioSection(scenarioTitle, steps) {
    const stepsHtml = steps
        .map((step) => {
            step.name = step.name.replace(/\.[^/.]+$/, "");
            step.order = Number(step.name.split("_")[1]);

            return step;
        })
        .sort((a, b) => a.order - b.order)
        .map((step) => createStep(step))
        .join("");

    return `
    <li class="list-group-item">
        <h5>
            <strong>${scenarioTitle}</strong>
        </h5>
        <hr />
        ${stepsHtml}
    </li>
    `;
}

function createFeatureSection(featureTitle, scenarios) {
    const scenariosHtml = scenarios
        .map((scenario) => createScenarioSection(scenario.name, scenario.items))
        .join("");
    return `
    <div class="card px-0">
        <h5 class="card-header">
            <strong>${featureTitle}</strong>
        </h5>
        <ul class="list-group list-group-flush">
            ${scenariosHtml}
        </ul>
    </div>
    `;
}

function createHTMLFile() {
    const absolutePath = path.resolve(baseVersionFolder);
    const folderStructure = readDirectoryStructure(
        absolutePath,
        baseVersionFolder
    );

    return `
    <html>
        ${createHeader()}
        <body>
            <div class="container-fluid d-flex flex-column px-5 row-gap-3">
                <h1>Reporte de Regresión Visual:</h1>
                ${createReportInfo()}
                <div id="report">
                    ${folderStructure.map((feature) =>
                        createFeatureSection(feature.name, feature.items)
                    )}
                </div>
            </div>
            <script
                src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.min.js"
                integrity="sha384-0pUGZvbkm6XF6gxjEnlmuGrJXVbNuzT9qBBavbLwCsOGabYfZo0T0to5eqruptLy"
                crossorigin="anonymous"
            ></script>
        </body>
    </html>
    `;
}

export async function generateReport() {
    const report = createHTMLFile();

    fs.writeFileSync(`./results/report/index.html`, report);
}
