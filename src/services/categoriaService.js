import api from'./api';

const findAllCategories = () =>
    api.get('/categoria/findAll')
    .then((response)=>response).catch((err) => console.error('Erro na chamada',err));

export{findAllCategories}