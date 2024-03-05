# Vue Js 

### ¿Que es Vue Js?

Vue (pronunciado /vjuː/, como view en inglés) es un framework progresivo para construir interfaces de usuario. 
A diferencia de otros frameworks monolíticos, Vue está diseñado desde cero para ser adoptado incrementalmente. 
La biblioteca principal se enfoca solo en la capa de la vista, y es fácil de usar e integrar con otras bibliotecas o proyectos existentes. Por otro lado, Vue también es perfectamente capaz de impulsar aplicaciones sofisticadas de una sola página cuando se usa en combinación con herramientas modernas y bibliotecas compatibles.

### Vue 3 o Vue 2

Vue 3 es la última versión de Vue, lanzada en septiembre de 2020. Vue 3 es más rápido, más pequeño y más fácil de usar que Vue 2 y tiene una API más limpia. Vue 3 también tiene una nueva función llamada Composition API que permite a los desarrolladores escribir componentes de una manera más flexible y reutilizable que antes. 

*Para este proyecto se utilizo Vue 3 con la composition API* 

Sintaxis basica de la Composition API

```Vue

<script setup>
  import { ref, onMounted } from 'vue'

  // reactive state
  const count = ref(0)

  // functions that mutate state and trigger updates
  function increment() {
  count.value++
}

  // lifecycle hooks
  onMounted(() => {
  console.log(`The initial count is ${count.value}.`)
})
</script>

<template>
  <button @click="increment">Count is: {{ count }}</button>
</template>

```

#### Directivas

Las directivas son atributos especiales que se agregan a los elementos HTML. Las directivas comienzan con el prefijo v- y se evalúan como JavaScript en el contexto actual. Por ejemplo, v-if se usa para mostrar o ocultar un elemento basado en una condición.

Para mas información puede consultar esta Cheat Sheet de Vue 3 [Cheat Sheet](https://www.vuemastery.com/pdf/Vue-3-Cheat-Sheet.pdf)


### Inicialización de un proyecto  🔧


 Para crear un projecto de Vue Js desde cero se puede hacer usando Vue Cli o Usando Vite (Para este proyecto se utilizo Vite) 

Vite es un build tool que permite crear proyectos de Vue Js de forma rapida y sencilla, para mas información puede consultar la documentación de Vite [Vite](https://vitejs.dev/)

Para crear un proyecto con Vite se debe ejecutar el siguiente comando en la terminal:

```bash
npm init vite@latest
```

Luego se debe seleccionar la template de Vue Js que se desea utilizar, en este caso se utilizo la template de Vue Js con Typescript

```bash
Select a framework: (Use arrow keys)
  vanilla 
  vue 
❯ vue-ts 
  react 
  react-ts 
  preact 
  preact-ts 
  lit-element 
  lit-element-ts 
  svelte 
  svelte-ts 
```

Luego se debe seleccionar el package manager que se desea utilizar, en este caso se utilizo npm

```bash
Select a package manager: (Use arrow keys)
❯  npm
   pnpm
   yarn
    
 ```

Luego se debe seleccionar el nombre del proyecto
```bash
Project name: (vue3)
```

 ... entre otras configuraciones que se pueden realizar.

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


