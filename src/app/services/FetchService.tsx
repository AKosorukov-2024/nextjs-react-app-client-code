// JavaScript source code
import axios from 'axios';

import {
    displayProductList,
    cleanUpTextArea,
    showStatus
} from '../fetchhelper/FetchHelper';

import { Product } from '../types/product';
import {
    httpGetProducts
} from './FetchServiceServer';

const baseUrl = 'https://localhost:7009/api/Products';

const _tabs = ['ptab', 'comptab', 'cartab', 'cafetab'];

export const getProducts = async (typeId: number, tab: string) => {
    console.log("FetchService started!");
    cleanUpTextArea();
    let productList: Product[] | undefined = undefined;
    const result = await checkConnection();
    if (!result) {
        return "Server is down";
    }

    productList = await httpGetProducts(baseUrl + '/ProductList', typeId);

    if (productList) {
        displayProductList(tab, productList);
    }
}

export const httpGetProduct = async (productId: number) => {

    let response = null;
    try {
        response = await axios.get(baseUrl, {
            params: {
                productId: productId
            }
        })

        if (response.status !== 200) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
    } catch (error) {
        return { ErrorMessage: 'No data Found' };
    }

    let result = await response.data;
    //var pname = document.getElementById('name');
    result = JSON.parse(result);
    return result;
}

export const httpAddProduct = async (product: Product) => {

    const newProduct = JSON.stringify(product);
    let response = null;
    try {
        response = await axios.post(baseUrl, '', {
            headers: {
                'Content-Type': 'application/json',
                'product': newProduct
            }
        })

        if (response.status !== 200) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }

    const result = await response!.data;
    return result;
}

export const httpUpdateProduct = async (product: Product) => {

    const updatedProduct = JSON.stringify(product);
    let response = null;
    try {
        response = await axios.post(baseUrl + '/UpdateProduct', '',{
            headers: {
                'Content-Type': 'application/json',
                'product': updatedProduct
            }
        })

        if (response.status !== 200) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }

    const result = await response!.data;
    return result;
}

export const httpDeleteProduct = async (productId: number) => {

    let response = null;
    try {
        response = await axios.delete(baseUrl, {
            params: {
                productId: productId
            }
        })

        if (response.status !== 200) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }

    const result = await response!.data;
    return result;
}

export const checkConnection = async () => {
    let result = false;
    await fetch(baseUrl, { method: 'GET' })
        .then(response => response)
        .then(() => {
            result = true;
        })
        .catch((error) => {
            console.log(error.message);
            const dataSourceLabel = document.getElementById('dataSource');
            dataSourceLabel!.textContent = '';
            _tabs.forEach((tab) => {
                const ptab = document.getElementById(tab);
                if (ptab) {
                    ptab.replaceChildren();
                }
            });
            result = false;
            const elem = document.getElementById('txtArea');
            if (elem) {
                elem.innerText = '';
            }
        });

    if (!result) {
        showStatus('Server is down!');
    }
    return result;
}
