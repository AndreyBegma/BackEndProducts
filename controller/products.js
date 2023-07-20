const productsModel = require('../models/ProductsModel')
const randomstring = require('randomstring')
module.exports.create = async (req,res) => { 
    const newProduct = new productsModel({ 
        id: randomstring.generate(8), 
        name: req.body.name,
        description: req.body.description,
        quantity: req.body.quantity,
        price: req.body.price
    })
    await newProduct.save()
        .then(() => { 
            res.status(201).json("New product created")
        })
        .catch((err) => { 
            res.status(500).json(err)
        })
}

module.exports.delete = async (req,res) => {
    await productsModel.findOneAndDelete({id:req.query.id})
        .then(()=> res.status(200).json("Product deleted"))
        .catch((err) => res.status(500).json(err))
}

module.exports.getList = async (req,res) => { 
    const listProducts = await productsModel.find()
    if (listProducts) { 
        res.status(200).json(listProducts)
    } else { 
        res.status(404).json("Not found")
    }
}

module.exports.getPage = async (req,res) => {
    let firstItem = (req.query.page * req.query.limit) - req.query.limit - 1
    firstItem = (firstItem < 0)? 0 : firstItem
    let products = await productsModel.find()
        .skip(firstItem)
        .limit(req.query.limit)
    if (products) {
        res.status(200).json(products)
    } else { 
        res.status(500).json("Not found")
    }
}

module.exports.getItem = async (req,res) => {
    let productItem = await productsModel.findOne({id: req.query.id})
    if (productItem) {
        res.status(200).json(productItem)
    } else { 
        res.status(404).json("Not found")
    }
}

module.exports.changePrice = async (req,res) => { 
    // localhost:4000/?id=14
    await productsModel.findAndUpdate({id:req.query.id}, {price: req.query.price})
        .then(() => res.status(200).json("Success updated"))
        .catch(err => res.status(500).json(err))
}

module.exports.getCount = async(req,res) => { 
    let listProducts = await productsModel.find()
    res.status(200).json({
        count: listProducts.length
    })
}

module.exports.changeName = async(req,res) => { 
    await productsModel.findOneAndUpdate({id: req.query.id}, {name: req.query.name})
    res.status(200).json("Product name has been changed")
}