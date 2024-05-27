const express = require('express');
const app = express();
const productRoute = express.Router();

// Product model
let Product = require('../models/Product');

// Add Product
productRoute.route('/create').post((request, response, next) => {
  Product.create(request.body).then((data) => {
    response.json(data);
  })
  .catch((error) => {
    response.send(error);
    console.error(`Product create error: ${error}`);
  })
});

// Get All Products
productRoute.route('/user/:user_id').get((request, response) => {
  Product.find({user_id: request.params.user_id }).then((data) => {
    response.json(data);
  })
  .catch((error) => {
    response.send(error);
    console.error(`Get all products error: ${error}`);
  });
});

// Get single product
productRoute.route('/:id').get((request, response) => {
  Product.findById(request.params.id).then((data) => {
    response.json(data);
  })
  .catch((error) => {
    response.send(error);
    console.error(`Get product ${request.params.id} error: ${error}`);
  });
})


// Update product
productRoute.route('/update/:id').put((request, response, next) => {
  Product.findByIdAndUpdate(request.params.id, request.body).then((data) => {
    response.json(data);
  })
  .catch((error) => {
    response.send(error);
    console.error(`Product update error: ${error}`);
  });
})

// Delete product
productRoute.route('/:id').delete((request, response, next) => {
  Product.findByIdAndRemove(request.params.id).then((data) => {
    response.status(200).json({
      msg: data
    });
  })
  .catch((error) => {
    response.send(error);
    console.error(`Product delete error: ${error}`);
  });
})

module.exports = productRoute;