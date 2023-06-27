import React, { useEffect, useState} from 'react'
import { findAllCategories } from '../../services/categoriaService';
import { MultiSelect } from 'react-multi-select-component';
import {AddProductAPI} from '../../services/productService'
import { useNavigate,useParams } from 'react-router-dom'
import { findProductById,updateProductById } from '../../services/productService';

const EditProduct = () => {
    
    const[productForm,setProductForm] = useState({
        nome: "",
        descricao: "",
        precoUnitario: 0,
        imagem: "",
    })

    const [categories,setCategories] = useState([]);
    const [selected,setSelected] = useState([]);
    const{id} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getCategories();
        getProductById();
    },[])

    const getProductById = async () =>{
        const response = await findProductById(id);
        setProductForm(response.data);
    }

    const getCategories = async () => {
        const response = await findAllCategories();
        const categoriesSelect = response.data.map((categoria) =>{
            return {
                value: categoria._id,
                label: categoria.nome
            }
        })
        console.log(response.data);
        console.log(categoriesSelect);
        setCategories(categoriesSelect);
    }

    const handleChangeValues = (evento) =>{
        // faz uma copia do estado anterior e soma o estado novo, o estado novo é oq o usuario digita,email e senha
        setProductForm({
            ...productForm,
            [evento.target.name]: evento.target.value
        })
        console.log(productForm)
    }

    const handleSubmit = async (event) =>{
        // handleSubmit atualiza a pagina por padrao
        event.preventDefault();
        
        const response = await updateProductById(id, productForm);
        if(response){
            alert("produto editado com sucesso")
            navigate('/admin')
        }
    }

    return (
        <section className='my-12 max-w-screen-xl mx-auto px-6'>
        <div className='flex flex-col space-y-2'>
            <h1 className='text-2xl text-gray-600'>Edição de Produtos</h1>
        </div>
        <form onSubmit={handleSubmit} className='grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-10 mt-6'>
            <div className='flex flex-col space-y-2'>
                <label htmlFor="nome" className='text-gray-500 poppins'>Nome</label>
                <input type="text" id='nome' name='nome' value={productForm.nome} required
                onChange={handleChangeValues}
                className='w-full px-4 py-3 rounded-lg ring-red-200 border border-gray-300 focus:ring-4 focus:outline-none transition duration-300 focus: shadow-xl' >
                </input>
                <label htmlFor="descricao" className='text-gray-500 poppins'>Descricao</label>
                <textarea name="descricao" id="descricao" cols="30" rows="5" value={productForm.descricao} required
                onChange={handleChangeValues}
                className='border border-gray-200 rounded-lg py-3 px-4 w-full focus:outline-none'>
                </textarea>
            </div>
            <div className='flex flex-col space-y-2'>
                <label htmlFor="preco" className='text-gray-500 poppins'>Preco</label>
                <input type="text" id='preco' name='precoUnitario' value={productForm.precoUnitario} required
                onChange={handleChangeValues}
                className='w-full px-4 py-3 rounded-lg ring-red-200 border border-gray-300 focus:ring-4 focus:outline-none transition duration-300 focus: shadow-xl' >
                </input>
                <label htmlFor="imagem" className='text-gray-500 poppins'>Imagem</label>
                <input type="text" id='imagem' name='imagem' value={productForm.imagem} required
                onChange={handleChangeValues}
                className='w-full px-4 py-3 rounded-lg ring-red-200 border border-gray-300 focus:ring-4 focus:outline-none transition duration-300 focus: shadow-xl' >
                </input>
                <label htmlFor="title" className='text-gray-500 poppins'>Categoria:</label>
               <MultiSelect>
                    options={categories}
                    value={selected}
                    onChange={setSelected}
                    LabelleBy="Select"
               </MultiSelect>
                <select type="Pizza Doce" id='Pizza Doce' name='Pizza Doce' required
                className='w-full px-4 py-3 rounded-lg ring-red-200 border border-gray-300 focus:ring-4 focus:outline-none transition duration-300 focus: shadow-xl' >
                </select>  
                {/* <select>
                    <option>Pizza Salgada</option>
                    <option>Pizza Doce</option>
                </select> */}
                <div>
                    <button type='submit' className="w-full px-2 py-3 bg-primary text-white  ring-red-200 border border-gray-300 focus:ring-4 focus:outline-none transition duration-300 focus: shadow-xl">
                        Editar
                    </button>
                </div>
            </div>
        </form>
    </section>
  )
}

export default EditProduct
