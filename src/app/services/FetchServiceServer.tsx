"use server"

import axios from 'axios';
import { Product } from '../types/product';

export const httpGetProducts = async (url: string, typeId: number) => {
    console.log("FetchServiceServer started!");
    let response = null;
    let productList: Product[] = [];    

    try {
        response = await axios.get(url);
        if (response.status !== 200) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }

    productList = JSON.parse(response!.data);
    if (typeId > 0) {
        productList = productList.filter((el: Product) => el.typeId === typeId);
    }

    return Promise.resolve(productList);
}