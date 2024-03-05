<div style="display: flex; justify-content: center; margin-top: 3rem "> 
<img src="https://seeklogo.com/images/N/ngk-insulators-logo-4AED23FB89-seeklogo.com.png"  alt="NGKLogo">
</div>
  
<div style="display: flex; margin-top:3rem; margin-left: 4rem; gap:2rem; place-content: center; align-items: center">
  <img src="https://seeklogo.com/images/V/vite-logo-BFD4283991-seeklogo.com.png" style=" height: 3.5rem;" alt="viteLogo">
  <img src="https://seeklogo.com/images/V/vuejs-logo-17D586B587-seeklogo.com.png" style=" height: 3rem;" alt="vueLogo">
  <img src="https://seeklogo.com/images/T/tailwind-css-logo-5AD4175897-seeklogo.com.png" style=" height: 3rem;" alt="tailwindLogo">
</div>


# Projecto Base para desarrollos con **Vue JS**

En este archivo se encuentran un detalle de las configuraciones del este proyecto el cual servirá como base para el desarrollo de aplicaciones con Vue.js
s### Configuración del proyecto

Este proyecto fue creado con [Vite](https://vitejs.dev/), el cual es un bundler que permite crear aplicaciones con Vue.js de forma rápida y sencilla. Se utilizo una template de Vite para Vue Js que utiliza Typescript como lenguaje para el desarrollo de la logica del funcionamiento de la aplicación.

### Dependencias y librerias utilizadas

- [Vue Router 4.2.5](https://router.vuejs.org/)
- [Heroicons 2.1.1](https://heroicons.com/)
- [**Tailwindcss 3.4.1** ](https://tailwindcss.com/)
- [Axios 1.6.5](https://axios-http.com/)
- [SweetAlert2 11.10.2](https://sweetalert2.github.io/)
- [Devextreme 23.2.3](https://js.devexpress.com/Vue/Documentation/Guide/Vue_Components/DevExtreme_Vue_Components/)
- [Prettier 3.1.1](https://prettier.io/)
- [ESLint 8.56.0](https://eslint.org/)
- [Eslint Plugin Vue 9.12.2](https://eslint.vuejs.org/)

### Comenzando 🚀

Para poder ejecutar el proyecto es necesario tener instalado lo siguiente:

* [Node Js](https://nodejs.org/es/) - Entorno de ejecución para JavaScript
* [Visual Studio Code](https://code.visualstudio.com/) - Editor de código fuente
* [Git](https://git-scm.com/) - Sistema de control de versiones

### Instalación 🔧

Para poder ejecutar el proyecto es necesario seguir los siguientes pasos:

1. Clonar el repositorio en la carpeta deseada

```bash
git clone http://acmsv018/Bonobo.Git.Server/Layout_VueJs.git
```

2. Instalar las dependencias del proyecto

```bash
npm install
```

3. Ejecutar el proyecto

```bash
npm run dev
```

### Estructura de carpetas 📁

La estructura de carpetas del proyecto es la siguiente:

```bash
├── public
├── src
│   ├── assets
│   ├── components
│   ├── entities│ 
│   ├── layouts
│   ├── pages
│   ├── router
│   ├── services
│   ├── store│
│   ├── utils
│   ├── App.vue
│   ├── style.css
│   └── main.ts│
├── index.html
└── package.json
```

### Configuración de Tailwindcss 🎨

Para la configuración de Tailwindcss se creo un archivo llamado **tailwind.config.js** en la raíz del proyecto en el cual se exporta un objeto con la configuración de Tailwindcss:

```javascript
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts}'],
  theme: {
    extend: {},
  },
  plugins: [],
}; 
```
Dentro del mismo se pueden agregar mas plugins y configuraciones de Tailwindcss.
para mas información puede consultar la documentación de Tailwindcss [Tailwindcss](https://tailwindcss.com/docs)

### Integracion de [_ACMWebAPI_ 🌐](http://acm.net/WebApi/)

Para la integración de la API de ACM se utilizo la libreria de axios, la cual permite realizar peticiones HTTP de forma sencilla. Para ello se creo un archivo llamado **axiosInstance.ts** en la carpeta **services** en el cual se exporta una instancia de axios con la configuración basica necesaria para realizar al peticion a la API de ACM.

```typescript
const instance = axios.create({
  baseURL: 'http://acm.net/WebApi/api',
  timeout: 10000,
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
  },
})
```

Adicional a la configuración basica de la instancia de axios para poder realizar una peticion es
necesario agregar el JSON request en el body de la peticion, para ello se creo un archivo
llamado **requestFunction.ts** en la carpeta **services** en el cual se exporta una funcion que recibe como
parametro un objecto con  : el proceso , el Stored Procedure (opcional) , los Parametros que espera recibir el SP,  y la conexion encriptada y
para el caso del proceso _Login_ el User y el Pass; y retorna la data de la respuesta de la API.
El objeto que recibe la funcion debe tener la siguiente estructura:

➡️ Estructura del objeto que recibe la funcion

```typescript
 JsonRequestOptions {
  process?: string;
  encryptedSP?: string;
  paramValues?: never;
  User?: string;
  Pass?: string;
  encryptedConnection?: string;
}
```

🔣 Estructura 

```typescript
    
    import instance from './axiosInstance'; // Importar la instancia de axios
    import JsonRequestOptions from '../entities/JSONRequest'; // Importar la interface de la peticion
    
    async function getDinamicData(requestOptions: JsonRequestOptions) {
      const {
        process = 'WebAPI_GetDinamicData',
        encryptedSP,
        paramValues,
        User,
        Pass,
        encryptedConnection = '', // --En caso que solo se vaya a trabajar una sola conexion se puede modificar esta linea y colocar la conexion como una constante
      } = requestOptions; // Desestructurar el objeto que recibe la funcion
    
      const response = await instance.post('DinamicData/GetDinamicData', { // Realizar la peticion a la API de ACM
        process, // Proceso que se desea ejecutar en la API de ACM
        dataString: '', 
        encryptedSP, // Stored Procedure que se desea ejecutar en la API de ACM
        encryptedConnection, // Conexion encriptada que se desea utilizar para la peticion a la API de ACM
        paramValues, // Parametros que espera recibir el Stored Procedure que se desea ejecutar en la API de ACM
        User, // Usuario para el proceso de login
        Pass, // Contraseña para el proceso de login
      });
    
      return JSON.parse(response.data); // Retornar la data de la respuesta de la API de ACM
}

export default getDinamicData; // Exportar la funcion
```


### Encriptado 🔒

Para el encriptado se utilza un encriptador propio de la API de ACM el cual se encuentra en la pagina de la API :  [Encriptador](http://acm.net/WebAPI/Home/Help)

---

#### 🔸 Process

Nombre del proceso que se desea ejecutar en la API de ACM. Tener en cuenta que el nombre del proceso debe ser el mismo que se encuentra en la configuración de la API de ACM.

Procesos disponibles:

- ✔️*Bases de datos SQL*
  - **_WebAPI_GetDinamicData_** : Proceso para obtener datos dinamicos de la API de ACM
  - **_WebAPI_GetDinamicData_QRY_** : Proceso para obtener datos dinamicos de la API de ACM ( Este proceso en lugar de recibir el Stored Procedure recibe una consulta SQL directamente la consulta debe estar _Encriptada_)
- ✔️*Bases de datos Oracle*
  - **_WebAPI_GetDinamicData_O_** : Proceso para obtener datos dinamicos de la API de ACM
  - **_WebAPI_GetDinamicData_QRY_O_** : Proceso para obtener datos dinamicos de la API de ACM ( Este proceso en lugar de recibir el Stored Procedure recibe una consulta SQL directamente la consulta debe estar _Encriptada_)
- ✔️*Login*
  - **_Login_** : Proceso para realizar el login en la API de ACM ( Este proceso utiliza el parametro encryptedSP para revisar si el usuario y contraseña son correctos en una tabla de la Base de datos)
  - **_LoginVM_** : Proceso para realizar el login en la API DE ACM este proceso solo utiliza el la authentication de Windows para validar los accesos del usuario.

---

#### 🔸 EncryptedSP

Nombre del Stored Procedure que se desea ejecutar en la API de ACM. Tener en cuenta que el nombre del Stored Procedure debe existir en la base de datos y al mandarlo a la API este debe ir encriptado.

---

#### 🔸 ParamValues

Parametros que espera recibir el Stored Procedure que se desea ejecutar en la API de ACM. Tener en cuenta que los parametros deben ser enviados en el orden que los espera recibir el Stored Procedure.

---



###  Prettier ✨

Prettier es una herramienta que permite formatear el código de forma automática, para ello existe un archivo llamado **.prettierrc** en la raíz del proyecto que contine la configuración de Prettier:

```json
{
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "printWidth": 100,
  "arrowParens": "always",
  "bracketSpacing": true,
  "endOfLine": "auto",
  "vueIndentScriptAndStyle": true
}
```

### Eslint 🟪

Eslint es una herramienta que permite identificar y reportar patrones encontrados en el código, para ello existe un archivo llamado **.eslintrc.cjs** en la raíz del proyecto que contine la configuración de Eslint:

```javascript
  module.exports = {
  'env': {
    'browser': true,
    'es2021': true,
    'node': true
  },
  'extends': [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:vue/vue3-essential'
  ],
  'overrides': [
    {
      'env': {
        'node': true
      },
      'files': [
        '.eslintrc.{js,cjs}'
      ],
      'parserOptions': {
        'sourceType': 'script'
      }
    }
  ],
  'parserOptions': {
    'ecmaVersion': 'latest',
    'parser': '@typescript-eslint/parser',
    'sourceType': 'module'
  },
  'plugins': [
    '@typescript-eslint',
    'vue'
  ],
  'rules': {
    'no-irregular-whitespace': [
      "error",
      { "skipComments": true }
    ],
    'camelcase': 'error',
    'linebreak-style': [
      'error',
      'windows'
    ],
    'quotes': [
      'error',
      'single'
    ],
    'semi': [
      'error',
      'always'
    ]
  }
};
```
