const catchAsync = require('./../utils/catchAsync.js')
const db = require('./../conn_db.js')
const Product = require('./../Models/productModel.js')

const getProducts = catchAsync(async (req, res, next) => {
    const products = await Product.findAll()
    res.status(200).json({
        status: 'success',
        results: products.length,
        data: { products }
    })
})

const addProduct = catchAsync(async (req, res, next) => {
    console.log(req.body)
    const { name, description, price, quantity } = req.body
    const newProduct = await Product.create({
        name,
        description,
        price,
        quantity
    })

    res.status(201).json({
        status: 'success',
        data: { product: newProduct }
    })
})


const updateProduct = catchAsync(async (req, res, next) => {
    const { id } = req.params
    const { name, description, price, quantity } = req.body
    const product = await Product.findByPk(id)
    console.log(product)
    if (!product) {
        return res.status(404).json({
            status: 'fail',
            message: 'Product not found'
        })
    }

    await product.update({
        name,
        description,
        price,
        quantity
    })

    res.status(200).json({
        status: 'success',
        data: { product }
    })
})



const deleteProduct = catchAsync(async (req, res, next) => {
    const { id } = req.params

    const product = await Product.findByPk(id)

    if (!product) {
        return res.status(404).json({
            status: 'fail',
            message: 'Product not found'
        });
    }

    await product.destroy()

    res.status(204).json({
        status: 'success',
        data: null
    })
})



module.exports = {
    getProducts,
    addProduct,
    updateProduct,
    deleteProduct

}