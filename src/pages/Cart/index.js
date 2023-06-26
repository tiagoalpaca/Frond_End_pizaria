import React, { useEffect, useState } from 'react'
import {AiOutlineDelete} from 'react-icons/ai'
import axios from 'axios';
import {sendCart,addOrder} from '../../services/orderService'
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const[productsCart,setProductsCart] = useState([]);
    const [totalValue,setTotalValue] = useState(0);
    const navigate = useNavigate();

    const[address,setAddress] = useState({
        rua: '',
        numero:'',
        complemento: '',
        cep: ''
    })

    useEffect(() => {
        const storageCart = JSON.parse(localStorage.getItem('productCart'));
        setProductsCart(storageCart);
        const total = storageCart.reduce((valor,product) => {
            return valor + product.precoUnitario;
        },0)
        setTotalValue(total);
    },[])

    const remove = (id) =>{
        const storageCart = JSON.parse(localStorage.getItem('productCart'));
        const filterCart = storageCart.filter((product) => product._id !== id);
        localStorage.setItem('productCart',JSON.stringify(filterCart));
        setProductsCart(filterCart);
    }

    const findAddress = async () => {
        const response = await axios.get(`https://viacep.com.br/ws/${address.cep}/json`)
        setAddress({
            ...address,
            rua:`${response.data.logradouro}, ${response.data.bairro},${response.data.localidade}`
        })
    }

    const sendOrder = async () =>{
        const productsOrder  = productsCart.map((product) =>{
            return{
                _id: product._id,
                quantidade: product.quantity
            }
        })
        const cartInfo = {
            produtos: productsOrder,
            precoTotal: totalValue,
            frete: 5
        }

        const response = await sendCart(cartInfo)
        if(response.data){
            const order = {
                produtos: response.data.produtos,
                precoTotal: response.data.precoTotal,
                frete: response.data.frete,
                concluido:true,
            }
           const responseOrder = await addOrder(order)
           if(responseOrder.data){
                localStorage.removeItem('productCart');
                navigate('/complete')
           }
        }
    }

    const handleChangeValues = (evento) =>{
        // faz uma copia do estado anterior e soma o estado novo, o estado novo é oq o usuario digita,email e senha
        setAddress({
            ...address,
            [evento.target.name]: evento.target.value
        })
    }

    return(
        <main className ="h-screen banner">
            <div className='max-w-screen-xl py-20 mx-auto px-6'>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10'>
                {/* informções endereço */}
                <div className='flex flex-col mt-20'>
                    <h2 className="text-2xl poppins pb-4 border-b border-gray-500 text-gray-700">
                        Adicione seu endereco
                    </h2>
                    <form className="my-4">
                        <div className='flex flex-col space-y-3'>
                            <input type="text" name="cep" placeholder='cep' id="cep"
                             value={address.cep}
                             onChange={handleChangeValues}
                            className='w-full px-4 py-3 rounded-lg ring-red-200 border border-gray-300 focus:ring-4 focus:outline-none transition duration-300 focus: shadow-xl'
                            ></input>
                            <input type="text" name="rua" placeholder='rua' id="rua"
                            value={address.rua}
                            // so aqui para disparar a função que preenche os outros campos
                            onFocus={findAddress}
                            onChange={handleChangeValues}
                            className='w-full px-4 py-3 rounded-lg ring-red-200 border border-gray-300 focus:ring-4 focus:outline-none transition duration-300 focus: shadow-xl'
                            ></input>
                            <input type="text" name="numero" placeholder='numero' id="numero"
                            value={address.numero}
                            onChange={handleChangeValues}
                            className='w-full px-4 py-3 rounded-lg ring-red-200 border border-gray-300 focus:ring-4 focus:outline-none transition duration-300 focus: shadow-xl'
                            ></input>
                            <input type="text" name="complemento" placeholder='complemento' id="complemento"
                            value={address.complemento}
                            onChange={handleChangeValues}
                            className='w-full px-4 py-3 rounded-lg ring-red-200 border border-gray-300 focus:ring-4 focus:outline-none transition duration-300 focus: shadow-xl'
                            ></input>
                        </div>
                    </form>    
                </div>
                </div>
                <div className='col-span-1'>
                    <div className='glass p-6 box-border rounded-lg'>
                        <div className='flex flex-col space-y-3'>
                            {/* informações do pedido */}
                            {productsCart.map((product) => (
                                <div key={product._id} className='rounded-lg p-4 flex space-x-3'>
                                    <img className="w-24 object-contain" src={product.imagem} alt={product.nome} ></img>

                                    <div className='flex flex-col space-y-3 flex-grow'>
                                    <h5 className='text-base poppins text-gray-700'>{product.nome}</h5>
                                    <h3 className='font-semibold text-lg text-primary poppins text-gray-700'>R${product.precoUnitario}</h3>
                                    </div>
                                    <div className="flex items-center px-4 py-2">
                                        <span className='text-lg text-gray-500 select-none'>
                                            {product.quantity} un
                                        </span>
                                    </div>    
                                    <div className="flex flex-col items-center justify-center">
                                        <AiOutlineDelete onClick={() => remove(product._id)} className='w-6 h-6 text-gray-600 transform transition hover:scale-105 duration-500 cursor-pointer'>

                                        </AiOutlineDelete>
                                    </div>   
                                </div> 
                            ))}
                            {/* Preço */}
                        </div>
                        <div className= "flex flex-col space-y-3 my-4">
                            <div className='flex items-center'>
                                <span className='flex-grow poppins text-gray-700'>
                                    Total
                                </span>
                                <span className='poppins font-semibold text-black'>
                                    R${totalValue}
                                </span>
                            </div>
                            {/* Taxa de entrega */}
                            <div className='flex items-center'>
                                <span className='flex-grow poppins text-gray-700'>
                                    Taxa de entrega
                                </span>
                                <span className='poppins font-semibold text-black'>
                                    10
                                </span>
                            </div>
                            <div className='flex items-center'>
                                <span className='flex-grow poppins text-gray-700'>
                                    Total + Taxa de entrega
                                </span>
                                <span className='poppins font-semibold text-black'>
                                    R${totalValue+10}
                                </span>
                            </div>
                            <div className='flex flex-col space-y-4 mb-3'>
                                <p className='poppins text-gray-700'>
                                    Endereço de entrega:
                                </p>
                                <span className='font-semibold text-black'>
                                    Rua: {address.rua}
                                </span>
                                <span className='font-semibold text-black'>
                                    Numero: {address.numero} - complemento:{address.complemento}
                                </span>
                            </div>
                            <button onClick={sendOrder} type='submit' className="w-full px-2 py-3 bg-primary text-white  ring-red-200 border border-gray-300 focus:ring-4 focus:outline-none transition duration-300 focus: shadow-xl">
                                Enviar Pedido
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Cart