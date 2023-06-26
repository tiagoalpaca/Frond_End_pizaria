import React, { useState,useEffect } from "react";
import Product from "../Product";
import productsMock from "../../mock/products";
import { findAllProducts } from "../../services/productService";

const ProductList = () =>{

    const[categoriaTab,setCategoriaTab] = useState('pizzaSalgada');
    // const[products,setProducts] = useState(productsMock);
    const[products,setProducts] = useState([]);

    const getAllProducts = async () =>{
        const response = await findAllProducts();
        setProducts(response.data);
    }

    useEffect(() =>{
        getAllProducts();
    },[])


    return (
        <section className='my-12 max-2-screen-x1 mx-auto px-3'>
            {/* Menu de categoria */}
            <div className='flex items-center justify-center space-x-6'>
                <p className={categoriaTab === 'pizzaSalgada' ? 'active-menu-tab bg-primary' :'menu-tab'} onClick={() => setCategoriaTab('pizzaSalgada')}>pizzaSalgada</p>
                <p className={categoriaTab === 'pizzaDoce' ? 'active-menu-tab bg-primary' :'menu-tab'} onClick={() => setCategoriaTab('pizzaDoce')}>pizzaDoce</p>
            </div>
            {/* Lista de Produtos */}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-12'>
            {products.map(product => (
                <Product key={product._id} product={product}/>
                ))}
            </div>
        </section>
    )
}
export default ProductList;