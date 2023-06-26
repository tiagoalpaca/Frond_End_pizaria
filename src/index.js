import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // BrowserRouter é o resposanvel por informar que iremos usar o rotamento do browser e gerencia as rotas, tudo que for usar roteamento tem que estar dentro do BrowserRouter
  <React.StrictMode>
    <BrowserRouter>
       <App/>
    </BrowserRouter>
  </React.StrictMode>
);


/* baixamos biblioteca npm install react-router-dom e  npm install -D tailwindcss pstcss autoprefixer, o pstcss estava com erro e nao foi instalado */
/* npx tailwindcss init, cria um tailwind.config.js */
// instalamos a biblioteca de itens npm install react-icons --save
// Axios é um cliente HTTP baseado em promessas,$ npm install axios
// criar uma função automaticamente rafce