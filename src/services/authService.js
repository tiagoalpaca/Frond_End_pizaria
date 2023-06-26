import api from './api';

// como a função é direta nao precisa de {}, como não tem {} nao precisa do return
const loginUserApi = (userValues) =>  
    // url pra quem vai fazer a requisão e o segundo os dados
    api.post('/auth/login',userValues)
    .then((response)=>response).catch((err) => console.error('Erro na chamada',err));

const registerUser = (addUserValues) =>
    api.post('/usuario/create',addUserValues)
    .then((response)=>response).catch((err) => console.error('Erro na chamada',err));

const getUserById =(idUser) =>
    api.get('/usuario/findById/',idUser)
    .then((response)=>response).catch((err) => console.error('Erro na chamada',err));

    
export {loginUserApi,registerUser,getUserById}