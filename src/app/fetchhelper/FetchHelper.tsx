// JavaScript source code
import { Product } from "../types/product";

const _dataSource = 'SQL server database';

export const cleanUpTextArea = () => {
    const elem = document.getElementById('txtArea');
    if (elem) {
        elem.innerText = '';
    }
}

export const showStatus = (text:string) => {
    const elem = document.getElementById('txtArea');
    elem!.innerText = text;
}

export const displayProductList = (tab: string, products: Product[]) => {
    function cleanUpProductList() {

        if (!ptable) {
            return;
        }
        ptable.replaceChildren();
    }


    const ptable = document.getElementById(tab);
    if (!ptable) {
        return;
    }

    if (!products || products.length === 0) {
        return;
    }

    cleanUpProductList();

    const dataSourceLabel = document.getElementById('dataSource');
    dataSourceLabel!.textContent = _dataSource;
    const tbl = document.createElement('table');
    tbl.setAttribute('id', 'listTable');

    const tblBody = document.createElement('tbody');
    // creates a table header
    let row = document.createElement('tr');
    let cell = document.createElement('th');
    let cellText = document.createTextNode('Product Id');
    cell.appendChild(cellText);
    row.appendChild(cell);
    cell = document.createElement('th');
    cellText = document.createTextNode('Name');
    cell.appendChild(cellText);
    row.appendChild(cell);
    cell = document.createElement('th');
    cellText = document.createTextNode('Price');
    cell.appendChild(cellText);
    row.appendChild(cell);
    cell = document.createElement('th');
    cellText = document.createTextNode('Type id');
    cell.appendChild(cellText);
    row.appendChild(cell);
    tblBody.appendChild(row);

    for (const product of products) {
        // creating all cells
        // creates a table row

        row = document.createElement('tr');

        // Create a <td> element and a text node, make the text
        // node the contents of the <td>, and put the <td> at
        // the end of the table row
        cell = document.createElement('td');
        cellText = document.createTextNode(`${product.id}`);
        cell.appendChild(cellText);
        row.appendChild(cell);
        cell = document.createElement('td');
        cellText = document.createTextNode(`${product.name}`);
        cell.appendChild(cellText);
        row.appendChild(cell);
        cell = document.createElement('td');
        cellText = document.createTextNode(`${product.price}`);
        cell.appendChild(cellText);
        row.appendChild(cell);
        cell = document.createElement('td');
        cellText = document.createTextNode(`${product.typeId}`);
        cell.appendChild(cellText);
        row.appendChild(cell);

        // add the row to the end of the table body
        tblBody.appendChild(row);
    }

    // put the <tbody> in the <table>
    tbl.appendChild(tblBody);
    // appends <table> into <body>
    ptable.appendChild(tbl);
    // sets the border attribute of tbl to '2'
    tbl.setAttribute('border', '2');
}
