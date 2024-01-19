const express = require('express')
const app = express()
const mongoose = require('mongoose')
const Product = require('./models/productModel')

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.get('/', (req, res) => {
    res.send('Hello World')
})

app.get('/blog', (req, res) => {
    res.send('Hello BLOG')
})

app.get('/products', async(req, res) => {
    try{
        const products = await Product.find({});
        res.status(200).json(products)
    }catch(error){
        res.status(500).json({message: error.message})
    }
})

app.get('/products/:id', async(req, res) => {
    try{
        const {id} = req.params;
        const product = await Product.findById(id)
        res.status(200).json(product);
    }catch(error) {
        res.status(500).json({message: error.message})
    }
})

app.post('/products', async (req, res) => {
    try{
        const product = await Product.create(req.body)
        res.status(200).json(product)
    } catch(error){
        res.status(500).json({message: error.message})
    }
})


app.put('/products/:id', async(req, res) => {
    try{
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body)
        if(!product) {
            return res.status(404).json({message: `cannot find any product with id ${id}`})
        }
        const updatedProduct = await Product.findById(id)
        res.status(200).json(updatedProduct);
    }catch(error) {
        res.status(500).json({message: error.message})
    }
})

app.delete('/products/:id', async(req, res) => {
    try{
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id);
        if(!product){
            return res.status(404).json({message: `Cannot find any product with id ${id}`})
        }
        res.status(200).json(product)
    }catch(error) {
        res.status(500).json({message: error.message})
    }
})


mongoose.set('strictQuery', false)
mongoose.connect('mongodb+srv://admin:Trntdyrl4@productmanager.etyjnyo.mongodb.net/product-manager?retryWrites=true&w=majority')
.then(() => {
    app.listen(3000, () => {
    console.log('Node API app is running on port 3000')
    })
    console.log('connected to mongo db')
}).catch((error) => {
    console.log(error)
})