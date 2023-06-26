import api from'./api';

const AddProductAPI = (product) =>
    api.post('/produto/create',product)
    .then((response)=>response).catch((err) => console.error('Erro na chamada',err));
    

const findAllProducts = () =>
    api.post('/produto/findAll')
    .then((response)=>response).catch((err) => console.error('Erro na chamada',err));

const findProductById = (id) =>
    api.get(`/produto/find/${id}`)
    .then((response)=>response).catch((err) => console.error('Erro na chamada',err));

const updateProductById = (id,productEdit) =>
    api.put(`/produto/update/${id}`,productEdit)
    .then((response)=>response).catch((err) => console.error('Erro na chamada',err));

const deleteProduct = (id) =>
    api.delete(`/produto/delete/${id}`)
    .then((response)=>response).catch((err) => console.error('Erro na chamada',err));

export {AddProductAPI,findAllProducts,findProductById,updateProductById,deleteProduct};