"use client"
// JavaScript source code

import styles from '../../page.module.css';
import {
    cleanUpTextArea,
    showStatus
} from '../../fetchhelper/FetchHelper';

import {
    getProducts,
    httpGetProduct,
    httpUpdateProduct,
    httpAddProduct,
    httpDeleteProduct,
    checkConnection
} from '../../services/FetchService';
import Select from 'react-select'
import { useState, useEffect } from 'react';
import type { ChangeEvent } from "react";
import type { SingleValue } from 'react-select'
import { Product } from '../../types/product';


const options = [
    { value: '1', label: 'Cafeteria' },
    { value: '2', label: 'Computers' },
    { value: '3', label: 'Cars' }
]

const tab = 'ptab';
export default function Products() {

    useEffect(() => {
        // This code will run only once after the initial render
        getProducts(0, tab);

        // Optional cleanup function that will run when component unmounts
        return () => {
            console.log('Component Product unmounted');
        };
    }, []);

    const productInit = {
        id: 0,
        name: "",
        price: 0,
        typeId: 0,
        typeName: ""
    }
    const [product, setProduct] = useState(productInit);

    const [selectedValue, setSelectedValue] = useState(options[-1]);

    const handleProductId = (event: ChangeEvent<HTMLInputElement>): void => {
        setProduct({ ...product, id: Number((event.target as HTMLButtonElement).value) });
    };

    const handleProductName = (event: ChangeEvent<HTMLInputElement>) => {
        setProduct({ ...product, name: (event.target as HTMLButtonElement).value });
    };

    const handleProductPrice = (event: ChangeEvent<HTMLInputElement>) => {
        setProduct({ ...product, price: Number((event.target as HTMLButtonElement).value) });
    };

    const handleProductType = (value: unknown): void => {
        const selectedOption = value as SingleValue<{ value: string, label: string }>
        setSelectedValue(options[Number(selectedOption!.value) - 1]);
        setProduct({ ...product, typeId: Number(selectedOption!.value) });
    };

    const emptyForm = () => {
        setProduct(productInit);
        setSelectedValue(options[-1]);
    }

    const getProduct = async (productId: number) => {

        cleanUpTextArea();
        if (!productId) {
            showStatus('The field \'Product Id\' cannot be empty!');
            return;
        }

        const result = await checkConnection();
        if (!result) {
            return;
        }

        httpGetProduct(productId).then((data) => {
            if (Object.hasOwn(data, 'ErrorMessage')) {
                showStatus(data.ErrorMessage);
                return;
            }
            setProduct(data);
            setSelectedValue(options[data.typeId - 1]);
        });
    }

    const addProduct = async (product: Product) => {

        cleanUpTextArea();
        if (product.id === 0
            || product.name.trim().length === 0
            || product.price === 0
            || product.typeId === 0) {
            showStatus('Please fill in all fields!');
            return;
        }

        const result = await checkConnection();
        if (!result) {
            return;
        }

        httpAddProduct(product).then((data) => {
            if (data.name.includes('Error')) {
                showStatus(data.name);
                return;
            }
            getProducts(0, tab);
            showStatus("Product with id=" + product.id + " added to database.");
        });
    }

    const updateProduct = async (product: Product) => {

        cleanUpTextArea();
        if (product.id === 0
            || product.name.trim().length === 0
            || product.price === 0
            || product.typeId === 0) {
            showStatus('Please fill in all fields!');
            return;
        }

        const result = await checkConnection();
        if (!result) {
            return;
        }

        httpUpdateProduct(product).then((message) => {
            getProducts(0, tab);
            showStatus(message);
        });
    }

    const deleteProduct = async (productId: number) => {

        cleanUpTextArea();
        if (!productId) {
            showStatus('The field \'Product Id\' cannot be empty!');
            return;
        }

        const result = await checkConnection();
        if (!result) {
            return;
        }

        httpDeleteProduct(productId).then((data) => {
            getProducts(0, tab);
            showStatus(data);
        });
    }

    return (<div>
        <br />
        <table className={styles.table}>
            <tbody>
                <tr>
                    <td colSpan={3} className={styles.tdcell}>
                        <button className={styles.button} onClick={() => getProducts(0, tab)}>Get Products</button>
                    </td>
                </tr>
                <tr>
                    <td colSpan={3} className={styles.title}>Products</td>
                </tr>
                <tr>
                    <td className={styles.label}>Product Id:</td>
                    <td><input type="number" name="ID" value={product.id} onChange={handleProductId} /></td>
                    <td><button className={styles.button} onClick={() => getProduct(product.id)} >Get Product</button></td>
                </tr>
                <tr>
                    <td className={styles.label}>Name:</td>
                    <td><input type="text" name="Name" value={product.name} onChange={handleProductName} /></td>
                    <td><button className={styles.button} onClick={() => updateProduct(product)}>Update Product</button></td>
                </tr>
                <tr>
                    <td className={styles.label}>Price:</td>
                    <td><input type="number" name="Price" value={product.price} onChange={handleProductPrice} /></td>
                    <td><button className={styles.button} onClick={() => addProduct(product)}>Add Product</button></td>
                </tr>
                <tr>
                    <td className={styles.label}>Product Type:</td>
                    <td>
                        <Select className={styles.select} id="Type" options={options}
                            value={selectedValue}
                            onChange={handleProductType} menuPortalTarget={typeof window !== 'undefined' ? document.body : null} />
                    </td>
                    <td><button className={styles.button} onClick={() => deleteProduct(product.id)}>Delete Product</button></td>
                </tr>
                <tr>
                    <td>
                    </td>
								 
                    <td></td>
						 
						
							
							 
								 
                    <td><button className={styles.button} onClick={emptyForm} >Empty form</button></td>
                </tr>
                <tr>
                    <td colSpan={3}>
                        <br />
                        <label className={styles.status} htmlFor="title">
                            Query Status:
                            <textarea className={styles.area} id="txtArea" readOnly></textarea>
                        </label>
                    </td>
                </tr>
            </tbody>
        </table>

        <br />
        <div id="dataSource"></div>
        <div id="ptab">
            <table id="tbl" ></table>
        </div>
    </div>
    )
}
