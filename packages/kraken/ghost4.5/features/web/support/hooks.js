const { LoginPageObject } = require("../page_objects/login.page-object");
const { AdminPageObject } = require("../page_objects/admin.page-object");



const {
    ProfileStaffPageObject,
} = require("../page_objects/profile-staff.page-object");


const properties = require("../../../properties.json");
const {
    TagEditorPageObject,
} = require("../page_objects/tag-editor.page-object");
const { TagListPageObject } = require("../page_objects/tag-list.page-object");

const { SettingsPageObject } = require("../page_objects/settings.page-object");


const { After, Before, AfterStep, BeforeStep, BeforeAll } = require('@cucumber/cucumber');
const { WebClient } = require('kraken-node');

Before(async function () {
    this.deviceClient = new WebClient("chrome", {}, this.userId);
    this.driver = await this.deviceClient.startKrakenForUserId(this.userId);
    this.driver.baseUrl = properties.GHOST_URL;
    this.loginPageObject = new LoginPageObject(this.driver);
    this.adminPageObject = new AdminPageObject(this.driver);
    this.profileStaffPageObject = new ProfileStaffPageObject(this.driver);
    this.settingsPageObject = new SettingsPageObject(this.driver);
    this.tagEditorPageObject = new TagEditorPageObject(this.driver);
    this.tagListPageObject = new TagListPageObject(this.driver);
});


After(async function() {
  await this.deviceClient.stopKrakenForUserId(this.userId);
});

AfterStep(async function(Scenario){
  const fs = require('fs');
  const folderPath = "./reports/screenshot/"+Scenario.pickle.name.replace(/\s/g,'');
  
  if (!fs.existsSync(folderPath)){
    fs.mkdir(folderPath, { recursive: true }, (error) => {
      if (error) {
        console.error('Error al crear el directorio:', error);
      } else {
        console.log('Directorio creado exitosamente');
      }
    });  
  }  
  await this.driver.saveScreenshot("./reports/screenshot/"+Scenario.pickle.name.replace(/\s/g,'')+ "/Paso_"+ counter + ".png");

});

BeforeStep(async function(Scenario){
  counter++;
});

BeforeAll(async function(){
  counter=0;
});