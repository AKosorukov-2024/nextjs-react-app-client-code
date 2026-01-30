"use client"

import { useEffect, useState } from 'react';
import styles from '../../page.module.css';

import {
    getProducts,
} from '../../services/FetchService';

function Cafeteria() {

    const [loading, setLoading] = useState(true);
    useEffect(() => {
        // This code will run only once after the initial render
        setLoading(false);

        // Optional cleanup function that will run when component unmounts
        return () => {
            console.log('Component ' + department + ' unmounted');
        };
    }, []);

    const url = window.location.href;
    let typeId = 0;
    let tab = '';
    let department = '';

    if (url.includes("cafeteria")) {
        typeId = 1;
        tab = 'cafetab';
        department = 'Cafeteria';
    } else if (url.includes("computers")) {
        typeId = 2;
        tab = 'comptab';
        department = 'Computers';
    } else if (url.includes("cars")) {
        typeId = 3;
        tab = 'cartab';
        department = 'Cars';
    } else {
        return;
    }

    if (!loading) {
        getProducts(typeId, tab);
    }


    return (
        <div>
            <table className={styles.table}>
                <tbody>
                    <tr>
                        <td colSpan={3} ><button className={styles.button} onClick={() => getProducts(typeId, tab)}>Get Products</button></td>
                    </tr>
                    <tr>
                        <td colSpan={3} className={styles.title}>
                            <label>
                                {department}
                            </label>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={3}>
                            <label className={styles.status} htmlFor="title">
                                Query Status:
                                <textarea className={styles.area} id="txtArea" ></textarea>
                            </label>
                        </td>
                    </tr>
                </tbody>
            </table>
            <br />
            <div id="dataSource"></div>
            <div id={ tab }>
                <table id="tbl"></table>
            </div>
        </div>
    );
}

export default Cafeteria;