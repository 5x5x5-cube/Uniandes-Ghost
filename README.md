# Equipo

| Apellidos | Nombres | Email Uniandes               | Usuario GitHub                                |
| --------- | ------- | ---------------------------- | --------------------------------------------- |
| Peña      | Andrés  | ae.pena@uniandes.edu.co      | [5x5x5-cube](https://github.com/5x5x5-cube)   |
| Orozco    | Gerardo | g.orozcos@uniandes.edu.co    | [gorozcoua](https://github.com/gorozcoua)     |
| Carrascal | Ronald  | r.carrascalc@uniandes.edu.co | [rcarrascalc](https://github.com/rcarrascalc) |

## Requerimientos

-   npm >=7.0.0
-   node >=20.13.1
-   adb (Check [platform-tools](https://developer.android.com/tools/releases/platform-tools))

## Instalación

Desde la raìz del monorepo ejecutar el siguiente comando para instalar dependencias para todos todos los suites de pruebas

```sh
npm install
```

# Kraken

### Configuración

-   Ubicar el archivo de propiedades de Kraken que se encuentra en la ruta `./packages/kraken/properties.json`
-   Modificar las propiedades con los valores de la instancia de Ghost que se desea probar
-   **Asegúrate de que la URL de Ghost no contenga un path ni un slash final, solo debe incluir el host, dominio y puerto. Por ejemplo: http://localhost:2368**

```json
{
    "GHOST_URL": "GHOST_URL",
    "ADMIN_USERNAME": "MY_ADMIN_EMAIL",
    "ADMIN_PASSWORD": "MY_ADMIN_PASS"
}
```

### Ejecución

Desde la raíz del monorepo ejecutar el siguiente comando para correar las pruebas

```sh
npm run test:kraken
```
#### Ejecutar Kraken con la version 4.5

-   Debemos estar en la raiz del proyecto y hacer los siguientes pasos
-   Borrar el contenido de la carpeta ./package/kraken/feature/**.* 
-   Copiar el contenido completo de la carpeta ./package/kraken/ghost4.5/feature/**.* y copiarlo en ./package/kraken/feature/**.* 
-   Ejecutar con el comando npm run test:kraken
-   El resultado estara en la carpeta screeshots dividido por escenario de prueba

#### Ejecutar Kraken con la version 5.96

-   Debemos estar en la raiz del proyecto y hacer los siguientes pasos
-   Borrar el contenido de la carpeta ./package/kraken/feature/**.* 
-   Copiar el contenido completo de la carpeta ./package/kraken/ghost5.96/feature/**.* y copiarlo en ./package/kraken/feature/**.* 
-   Ejecutar con el comando npm run test:kraken
-   El resultado estara en la carpeta screeshots dividido por escenario de prueba
- 
# Cypress

### Configuración

-   Ubicar el archivo de variables de entorno de Cypress que se encuentra en la ruta `./packages/cypress/cypress.env.json`
-   Modificar las propiedades con los valores de la instancia de Ghost que se desea probar

```json
{
    "ADMIN_USERNAME": "MY_ADMIN_EMAIL",
    "ADMIN_PASSWORD": "MY_ADMIN_PASS"
}
```

-   Ubicar el archivo de configuración de Cypres que se encuentra en la ruta `./packages/cypress/cypress.config.js`
-   Modificar la propiedad `baseUrl` por la de la instancia de Ghost que se desea probar. **Asegúrate de que la URL de Ghost no contenga un path ni un slash final, solo debe incluir el host, dominio y puerto. Por ejemplo: http://localhost:2368**

```javascript
module.exports = defineConfig({
    projectId: "ghost-cypress",
    e2e: {
        baseUrl: "<YOUR_GHOST_URL>",
        ...
    },
});
```

### Ejecución

Desde la raíz del monorepo ejecutar el siguiente comando para correar las pruebas

```sh
npm run test:cypress
```
# Resemble

### Configuración

-   Agregar los casos generados en las herramientas anteriores en las carpetas respectivas de sus versiones 
-   Version anterior: ./results/kraken/GHOST4.5
-   Nueva version: ./results/kraken/GHOST5.9
-   El resultado se puede ver en el archivo de la carpeta raiz: /report/index.html
  
### Ejecución
Desde la raíz del monorepo ejecutar el siguiente comando
```sh
npm run test:resemble
```
El resultado se puede ver en el archivo de la carpeta raiz: /report/index.html
