const { findAll, findById, addProduct, update, Delete } = require("../models/productModel.js")
const { getPostData } = require('../utils.js');

//@desc gets all products
//@route /api/products

const getProducts = async (req, res) => {
    try {

        const products = await findAll();

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(products));
    }
    catch (err) {
        console.log(err);
    }
}

//@desc gets single product
//@route /api/products/:id

const getProduct = async (req, res, id) => {
    try {
        const product = await findById(id);

        if (!product) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'product not found' }));
        }
        else {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(product));
        }
    } catch ({ error }) {
        console.log(error);
    }
}

//@desc creates a product
//@route POST /api/products

const createProduct = async (req, res) => {
    try {
        let body = await getPostData(req);
        const { title, description, price } = JSON.parse(body);


        const product = {
            title,
            description,
            price
        }
        const newProducts = await addProduct(product);
        res.writeHead(201, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify(newProducts));
    } catch (error) {

    }
}

//@dsec updates a product
//@route PUT /api/products
const updateProduct = async (req, res, id) => {
    try {
        const product = await findById(id);
        if (!product) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'product not found' }));
        }
        else {
            let body = await getPostData(req);
            const { title, description, price } = JSON.parse(body);


            const productData = {
                title: title || product.title,
                description: description || product.description,
                price: price || product.title
            }
            const updProducts = await update(id, productData);
            res.writeHead(201, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify(updProducts));
        }

    } catch (error) {
        console.log(error);
    }
}
//@desc deletes a product
//@route DELETE /api/products/:id
const deleteProduct = async (req, res, id) => {
    try {
        const product = await findById(id);
        if (!product) {
            res.writeHead(404, { 'Content-Type': 'application/json' }); // Changed to 404 Not Found
            res.end(JSON.stringify({ message: 'Product not found' }));
        }
        else {
            const products = await Delete(id);
            res.writeHead(200, { 'Content-Type': 'application/json' }); // Changed to 204 No Content
            res.end(JSON.stringify(products));
        }
    } catch (error) {
        console.log(error);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Server Error' }));
    }
}

module.exports = { getProducts, getProduct, createProduct, updateProduct, deleteProduct };