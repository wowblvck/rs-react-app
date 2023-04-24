<h1 align="center">Rolling Scopes School React Course Task</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-brightgreen.svg?cacheSeconds=2592000" />
  <img alt="Node" src="https://img.shields.io/badge/node-%3E%3D%2018.16-brightgreen" />
  <a href="https://github.com/wowblvck/rs-react-app/actions/workflows/tests.yml">
    <img alt="Tests" src="https://github.com/wowblvck/rs-react-app/actions/workflows/tests.yml/badge.svg" />
  </a>
</p>


> EN: This application was developed as part of the training at the RS School, the purpose of which was to learn how to work with the React JS library, from the very basics (components) to rendering the page on the server side. The application is divided into separate branches according to the order of studying the modules of the school. The latest react-ssr branch contains completed changes. The design of the application was developed from scratch according to the requirements of the school assignment. The server part (API) was also developed independently using JSON-server and is located in a hidden repository. In addition to the basic requirements of the school, adaptive layout was implemented, sending the form to the server.

> RU: Данное приложение разработано в рамках обучения в школе RS School, целью которого было научиться работать с библиотекой React JS, начиная с самый азов (компоненты) и заканчивая рендерингом страницы на стороне сервера. Приложение разбито на отдельные ветки согласно порядку изучения модулей школы. Последняя ветка react-ssr содержит законченные изменения. Дизайн приложения разрабатывался с нуля согласно требованиям задания школы. Серверная часть (API) также разрабатывалась самостоятельно с использованием JSON-server и находится в скрытом репозитории. Помимо основных требований школы была реализована адаптивная верстка, отправка формы на сервер.

---
The application is based on the *JavaScript* stack.

The client part is written using:
- [React](https://reactjs.org/) 
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [RTK Query](https://redux-toolkit.js.org/rtk-query/overview)
- [React Router](https://github.com/remix-run/react-router#readme)
- [React Hook Form](https://react-hook-form.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [moment.js](https://momentjs.com/)

The server part is written using:
- [Express](https://expressjs.com/)
- [json-server](https://github.com/typicode/json-server)

The test part is written using:
- [Vitest](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Cypress](https://www.cypress.io/)
- [msw](https://mswjs.io/)

#### To work with the application, you will need to create an .env file in the root folder of the application:
```
VITE_API_KEY=[PASTE API KEY from https://freeimage.host/page/api]
PORT=5173 (default)
```

#### To start the demo server, use the command ```npm run dev```. To build a project in production, use ```npm run build``` and ```npm run start``` for start server.

#### To run tests and coverage use the command ```npm run coverage```.

---

### ✨ [Demo](https://rs-react-app-production.up.railway.app/)

## Authors

👤 Design and developer **Indar Basto** ([@wowblvck](https://github.com/wowblvck))