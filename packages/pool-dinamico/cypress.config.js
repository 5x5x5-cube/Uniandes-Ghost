const { defineConfig } = require("cypress");
const fs = require("fs");
const path = require("path");
require("dotenv").config({ path: "../../.env" });

module.exports = defineConfig({
    projectId: "ghost-cypress",
    e2e: {
        baseUrl: process.env.GHOST_URL,
        env: {
            APP_VERSION: process.env.GHOST_VERSION,
            CYPRESS_SCREENSHOTS: process.env.CYPRESS_SCREENSHOTS,
        },
        setupNodeEvents(on, config) {
            on("after:screenshot", (details) => {
                
                if (!details.name || process.env.CYPRESS_SCREENSHOTS != "true")
                    return;

                const basePath = path.resolve(
                    __dirname,
                    this.screenshotsFolder ?? "cypress/screenshots"
                );

                const nameParts = details.name.split("/").slice(0, -1);
                const fileName = details.path.split(path.sep).pop();
                const dirPath = path.join(basePath, ...nameParts);
                
                fs.mkdirSync(dirPath, { recursive: true });

                const newPath = path.join(dirPath, fileName);

                if (details.path === newPath) return;

                return new Promise((resolve, reject) => {
                    fs.rename(details.path, newPath, (err) => {
                        if (err) return reject(err);

                        let currentPath = details.path
                            .split(path.sep)
                            .slice(0, -1)
                            .join(path.sep);
                        while (currentPath !== basePath) {
                            fs.rmdirSync(currentPath, { recursive: true });
                            currentPath = path.dirname(currentPath);
                        }

                        resolve({ path: newPath });
                    });
                });
            });
            // implement node event listeners here
        },
    },
});
