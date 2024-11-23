const { defineConfig } = require("cypress");
require("dotenv").config({ path: "../../.env" });

module.exports = defineConfig({
    projectId: "ghost-cypress",
    env: {
        ADMIN_USERNAME: process.env.ADMIN_USERNAME,
        ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
    },
    e2e: {
        baseUrl: process.env.GHOST_URL,
        setupNodeEvents(on, config) {
            // implement node event listeners here
        },
    },
});
