require("dotenv").config({ path: "../../../../.env" });

export class PageObjectClass {
    constructor() {
        return new Proxy(this, {
            get: this.proxyHandler.bind(this),
        });
    }

    proxyHandler(target, propKey) {
        const originalProperty = target[propKey];
        if (typeof originalProperty === "function") {
            return function (...args) {
                const result = originalProperty.apply(this, args);

                const shouldTakeScreenshot =
                    Cypress.env("CYPRESS_SCREENSHOTS") === "true" ||
                    Cypress.env("CYPRESS_SCREENSHOTS") === true;

                if (shouldTakeScreenshot) {
                    const appVersion =
                        Cypress.env("APP_VERSION") || "unknown-version";
                    const featureTitle = cy.state("runnable").parent.title;
                    const scenarioTitle = cy.state("runnable").title;
                    if (!cy.stepCounter) {
                        cy.stepCounter = 1;
                    }

                    const stepTitle = `Ghost-${appVersion}/${featureTitle}/${scenarioTitle}/Paso_${cy.stepCounter}`;

                    cy.screenshot(stepTitle);
                    cy.stepCounter += 1;
                }

                return result;
            };
        } else {
            return originalProperty;
        }
    }
}
