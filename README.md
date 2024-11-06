# Equipo

| Apellidos | Nombres | Email Uniandes               | Usuario GitHub                                |
| --------- | ------- | ---------------------------- | --------------------------------------------- |
| Peña      | Andrés  | ae.pena@uniandes.edu.co      | [5x5x5-cube](https://github.com/5x5x5-cube)   |
| Orozco    | Gerardo | g.orozcos@uniandes.edu.co    | [gorozcoua](https://github.com/gorozcoua)     |
| Carrascal | Ronald  | r.carrascalc@uniandes.edu.co | [rcarrascalc](https://github.com/rcarrascalc) |

## Requerimientos

-   npm >=7.0.0
-   node >=20.13.1

## Instalación

Desde la raìz del monorepo ejecutar el siguiente comando para instalar dependencias para todos todos los suites de pruebas

```sh
npm install
```

# Kraken

### Configuración

-   Ubicar el archivo de propiedades de Kraken que se encuentra en la ruta `./packages/kraken/properties.json`
-   Modificar las propiedades con los valores de la instancia de Ghost que se desea probar

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

# Cypress

### Ejecución

Desde la raíz del monorepo ejecutar el siguiente comando para correar las pruebas

```sh
npm run test:cypress
```
