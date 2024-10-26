const productController = require('./../Controllers/productController')
const express = require('express')
const router = express.Router()

router.get('/getproducts',productController.getProducts)
router.post('/addnew',productController.addProduct)
router.put('/update/:id',productController.updateProduct)
router.delete('/deleteproduct/:id',productController.deleteProduct)

module.exports = router