import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUserApi,getUserById } from '../services/authService';
import api from '../services/api';

const useAuth = () => {
    const [userLogged,setUserLogged] = useState(true);
    const [loading,setLoading] = useState(true);
    const [userFull,setUserFull] = useState({});
    const navigate = useNavigate();

    // vamos avisar se tem usuario logado, o useEffect serve para controlar os efeitos de um componente
    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));

        if(userInfo){
            api.defaults.headers.common['Authorization'] = `Bearer ${userInfo.token}`
            findUserById(userInfo.id);
            setUserLogged(true);
            alert('usuario logado');
        }
        setLoading(false)
    },[])

    const loginUser = async (inputValues) =>{
        // chamar a API de Backend
        const response = await loginUserApi(inputValues);
            const data = await response.data;
            // const data = await response
              localStorage.setItem('userInfo', JSON.stringify(data))
            api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`
            navigate('/')
            setUserLogged(true);
        }
    
    const logoutUser = () =>{
        setUserLogged(false);
        localStorage.clear();
        navigate('/login')
    }

    const findUserById = async (idUser) =>{
        const response = await getUserById(idUser);
        setUserFull(response.data);
    }


    return {userLogged,userFull,loading,loginUser,logoutUser}
}

export default useAuth;