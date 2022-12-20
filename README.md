# BaseDiscord.js
Base para crear Bots para discord (Versión 14)

La idea de este proyecto es tener a mano una plantilla para generar un bot de Discord de forma rapida y organizada siguiendo la siguiente estructura:

>├── src
>
>│   ├── commands
>
>│   │   ├── **.command.js
>
>│   ├── events
>
>│   │   ├── **.event.js
>
>│   ├── utils
>
>│   ├── app.js

- **src/commands:** Directorio donde se almacenan los slashCommands.
- **src/events:** Directorio donde se almacenan los eventos.
- **src/utils:** Directorio donde se almacenan las funciones adicionales (Ej. express, mongo, sql, etc...).

## Instalación

Es necesario tener instalado [**Node.js**](https://nodejs.org/en/) **>= v16.9.0**
```
npm install
```

Una vez instalado, se ejecuta con
```
node src/app.js
```
