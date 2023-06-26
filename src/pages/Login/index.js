import React,{useContext, useState} from "react";
import logo from '../../assets/logo.pizza.png'
// import {useNavigate} from "react-router-dom";
import { AuthContext } from '../../context/AuthContext';

const Login= () =>{

    const[inputValues,setInputValues] = useState({
        email:'',
        senha:''
    })

    const {loginUser} = useContext(AuthContext);

    const handleChangeValues = (evento) =>{
        // faz uma copia do estado anterior e soma o estado novo, o estado novo é oq o usuario digita,email e senha
        setInputValues({
            ...inputValues,
            [evento.target.name]: evento.target.value
        })
    }
    
    // função assincrona(async),ou seja, vai te que esperar algo acontecer
    const handleSubmit = async (event) =>{
        // handleSubmit atualiza a pagina por padrao
        event.preventDefault();
        loginUser(inputValues);
    }

    return(
        <main className='h-screen w-full banner'>
            <div className="flex flex-col items-center pt-20 h-screen">
                <img className='w-52'src={logo} alt='logotipo do Pizza app'></img>
                <form onSubmit={handleSubmit} className="bg-white w-96 mt-6 pt-4 rounded-lg">
                    <div className="flex flex-col pt-20 space-y-6">
                        <input type="mail" placeholder="Digite o seu email:" nome='email'
                             className="w-full px-4 py-3 rounded-lg ring-red-200 border border-gray-300 focus:ring-4 focus:outline-none transition duration-300 focus: shadow-xl"
                             onChange={handleChangeValues}
                         ></input>
                         <input type="password" placeholder="Digite a sua senha:" nome='senha'
                             className="w-full px-4 py-3 rounded-lg ring-red-200 border border-gray-300 focus:ring-4 focus:outline-none transition duration-300 focus: shadow-xl"
                             onChange={handleChangeValues}
                         ></input>
                    </div>
                    <button type="submit" className='w-full py-3 bg-primary text-white focus: outline-none focus:ring-4 mt-6 rounded-lg transition duration-300'>Entrar</button>
                    <p className="text-base text-primary text-center my-6 hover:underline cursos-pointer">Precisa de uma conta ?</p>
                </form>
            </div>
        </main>
    )
}

export default Login;