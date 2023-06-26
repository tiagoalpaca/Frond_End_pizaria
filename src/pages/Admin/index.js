import React, { useEffect,useState } from 'react';
import {FaEdit} from 'react-icons/fa';
import {MdDelete} from 'react-icons/md';
import {useNavigate,Link} from 'react-router-dom';
import { findAllProducts, deleteProduct} from '../../services/productService';

const Admin = () => {

    const navigate = useNavigate();
    const[products, setProducts] = useState([])

    useEffect(() =>{
        getAllProducts();
    },[])

    const getAllProducts = async () =>{
        const response = await findAllProducts();
        setProducts(response.data);
    }

    const removeProduct = async (id) =>{
        const answer = window.confirm('Deseja excluir o produto?')
        if(answer){
            await deleteProduct(id);
            getAllProducts();
        }
    }

    return (

    
    <section className='my-12 max-w-screen-x1 mx-auto px-6'>
        <div className='flex justify-end space-y-2'>
            <button onClick={()=> navigate('/add-product')} className="w-44 px-2 py-3 bg-primary text-white  ring-red-200 border border-gray-300 focus:ring-4 focus:outline-none transition duration-300 focus: shadow-xl">
                Adiciona Produto
            </button>
        </div>
        <div className="flex flex-col my-8">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className='py-2 inline-block min-w-full sm:px-6 lg:px-8'>
                <div className="overflow-hidden sm:rounded-lg shadow-md">
                    <table className='min-w-full'>
                        <thead className="bg-primary">
                            <tr>
                                <th scope="col" class="text-xs font-medium text-white px-6 py-3 text-left upeercase tracking-wider">
                                    Imagem
                                </th>
                                <th scope="col" class="text-xs font-medium text-white px-6 py-3 text-left upeercase tracking-wider">
                                    Nome
                                </th>
                                <th scope="col" class="text-xs font-medium text-white px-6 py-3 text-left upeercase tracking-wider">
                                    Preco
                                </th>
                                <th scope='col' className='relative px-6 py-3'>
                                    <span className="text-xs font-medium text-white px-6 py-3 text-left upeercase tracking-wider">Acoes</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <img src="" alt="img" />
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    Produto 1
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    50
                                 </td>
                        <td className='flex items-center justify-center space-x-3'>
                                   <div className='px-6 py-4 whitespace-nowrap flex flex-col h-24 items-center'>
                                       <Link to={`/edit-product/1`}>
                                            <FaEdit className='cursor-pointer text-2xl text-green-600'></FaEdit>
                                        </Link>
                                        <MdDelete onClick={() => removeProduct(1)}className='cursor-pointer text-2xl text-red-600'></MdDelete>
                                    </div>
                                </td>
                            {products.map(product => (
                                <tr key = {product._id} className="bg-white border-b">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <img className='w-16' src={product.imagem} alt={product.nome} />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                         {product.nome}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        {product.precoUnitario}
                                    </td> 
                                
                                {/* <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <img src="" alt="img" />
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    Produto 1
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    50
                                 </td> */}
                                 
                                <td className='flex items-center justify-center space-x-3'>
                                    <div className='px-6 py-4 whitespace-nowrap flex flex-col h-24 items-center'>
                                        <Link to={`/edit-product/${product._id}`}>
                                            <FaEdit className='cursor-pointer text-2xl text-green-600'></FaEdit>
                                        </Link>
                                        <MdDelete onClick={() => removeProduct(product._id)}className='cursor-pointer text-2xl text-red-600'></MdDelete>
                                    </div>
                                </td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </div> 
            </div>
        </div>
    </section>
  )
}

export default Admin
