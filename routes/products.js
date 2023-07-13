const express = require('express')
const router = express.Router()
const controller = require('../controller/products')

router.post('/create', controller.create)
// localhost:4000/products/create

router.delete('/delete', controller.delete)
// localhost:4000/products/delete

router.get('/get-all', controller.getList)
// localhost:4000/products/get-all
router.get('/get', controller.getPage)
// localhost:4000/products/get
router.get('/get-item', controller.getItem)
// localhost:4000/products/get-item
 
router.put('/change-price', controller.changePrice)
// localhost:4000/products/change-price


module.exports = router