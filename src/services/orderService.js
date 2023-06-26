import api from "./api";

const sendCart = (cartInfo) =>
    api.post('/carrinho/create/', cartInfo)
    .then((response)=>response).catch((err) => console.error('Erro na chamada',err));

const addOrder = (order) =>
    api.post('/pedido/create/',order)
    .then((response)=>response).catch((err) => console.error('Erro na chamada',err));


export{sendCart,addOrder}