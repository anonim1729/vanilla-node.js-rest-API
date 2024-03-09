let products = require('../data/products.json');
const { v4: uuidv4 } = require('uuid');
const { writeDataToFile } = require('../utils.js')

const findAll = () => {
    return new Promise((resolve, reject) => {
        resolve(products);
    })
}
const findById = (id) => {
    return new Promise((resolve, reject) => {
        const product = products.find(prod => prod.id === id);
        resolve(product);
    })
}
const addProduct = (product) => {
    return new Promise((resolve, reject) => {
        const newProduct = { id: uuidv4(), ...product };
        products.push(newProduct);

        writeDataToFile('./data/products.json', products);
        resolve(products);
    })
}

const update = (id, product) => {
    return new Promise((resolve, reject) => {
        const index = products.findIndex((p) => p.id == id);
        products[index] = { id, ...product };
        writeDataToFile('./data/products.json', products);
        resolve(products);
    })
}

const Delete = (id) => {
    return new Promise((resolve, reject) => {
        products = products.filter((p) => p.id != id);
        writeDataToFile('./data/products.json', products);
        resolve(products);
    })
}

module.exports = { findAll, findById, addProduct, update, Delete }