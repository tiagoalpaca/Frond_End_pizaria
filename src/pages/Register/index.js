import React,{useState} from 'react'
import logo from '../../assets/logo.pizza.png'
import { registerUser } from '../../services/authService'
import { useNavigate } from 'react-router-dom'

const Register = () => {

   const[inputValues,setInputValues] = useState({
        nome:'',
        email:'',
        senha:'',
        imagem:''
    })
    const navigate = useNavigate();

    const handleChangeValues = (evento) =>{
        // faz uma copia do estado anterior e soma o estado novo, o estado novo é oq o usuario digita,email e senha
        setInputValues({
            ...inputValues,
            [evento.target.name]: evento.target.value
        })
        console.log(inputValues)
    }

    const handleSubmit = async (event) =>{
        // handleSubmit atualiza a pagina por padrao
        event.preventDefault();
        const response = await registerUser(inputValues);
        if(response.data){
            alert('Usuario cadastrado com sucesso')
            navigate('/admin')
        }
    }

  return (
    <main className='h-screen w-full banner'> 
        <div className='flex pt-20 flex-col items-center h-screen'>
            <img src={logo} alt="Logotipo do Pizzaapp" className='w-52'></img>
            <h1 className='text-2xl text-black'>Cadastro de Usuario</h1>
            <form onSubmit={handleSubmit} className="bg-white w-96 mt-6 p-4 rounded-lg shadow-lg">
                <div className='flex flex-col space-y-6'>
                    <input type="text" name='nome' placeholder='Digite seu Nome:'
                    class="w-full px-4 py-3 rounded-lg ring-red-400 focus:ring-4 focus:outline-none transition duration-300 border border-gray-300 focus:shadow-xl"
                    onChange={handleChangeValues}
                    ></input>
                    <input type="email" email='' placeholder='Digite seu email:'
                    class="w-full px-4 py-3 rounded-lg ring-red-400 focus:ring-4 focus:outline-none transition duration-300 border border-gray-300 focus:shadow-xl"
                    onChange={handleChangeValues}
                    ></input>
                    <input type="password" name='senha' placeholder='Digite seu senha:'
                    class="w-full px-4 py-3 rounded-lg ring-red-400 focus:ring-4 focus:outline-none transition duration-300 border border-gray-300 focus:shadow-xl"
                    onChange={handleChangeValues}
                    ></input>
                    <input type="text" name='imagem' placeholder='Insira a URL da imagem:'
                    class="w-full px-4 py-3 rounded-lg ring-red-400 focus:ring-4 focus:outline-none transition duration-300 border border-gray-300 focus:shadow-xl"
                    onChange={handleChangeValues}
                    ></input>
                    <button type="submit" className='w-full py-3 bg-primary text-white focus: outline-none focus:ring-4 mt-6 rounded-lg transition duration-300'>Cadastrar</button>
                </div>
            </form>
        </div>
    </main>
  )
}

export default Register
