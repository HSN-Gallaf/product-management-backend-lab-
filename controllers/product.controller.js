const mongoose = require("mongoose");
const Product = require("../models/Product");
const createProduct = async (req, res) => {
  try {
    const { title, description, category, price, quantity } = req.body;

    const newProduct = await Product.create({
      title: title,
      description: description,
      category: category,
      price: price,
      quantity: quantity,
    });

    res.status(201).json(newProduct);
  } catch (err) {
    if (err.name === "ValidationError")
      return res.status(400).json({ message: err.message });

    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getProducts = async (req, res) => {
  try {
    const allProducts = await Product.find();

    res.status(200).json(allProducts);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getOneProduct = async (req, res) => {
  try {
    const foundProduct = await Product.findById(req.params.id);

    if (!foundProduct)
      return res.status(404).json({ message: "Product not Found" });

    res.status(200).json(foundProduct);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { title, description, category, price, quantity } = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        title: title,
        description: description,
        category: category,
        price: price,
        quantity: quantity,
      },
      { returnDocument: "after", runValidator: true },
    );

    if (!updateProduct)
      return res.status(404).json({ message: "Product not Found" });

    res.status(200).json(updatedProduct);
  } catch (err) {
    if (err.name === "ValidationError")
      return res.status(400).json({ message: err.message });

    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);

    if (!deleteProduct)
      return res.status(404).json({ message: "Product not Found" });

    res.sendStatus(204);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getLowStockProducts = async (req, res) => {
  const lowStockProducts = await Product.find({ quantity: { $lt: 3 } });
  res.status(200).json(lowStockProducts);
};

// const getProductsStatistics = async (req, res) => {
//   const productsSum = await Product.countDocuments();
//   const productValueSum = await Product.aggregate({
//     $group: { _id: null, totalPrice: { $sum: price } },
//   });
//   console.log(productValueSum);

//   //   const lowStockProducts = await Product.find({ quantity: { $lt: 3 } });
// };
module.exports = {
  createProduct,
  getProducts,
  getOneProduct,
  updateProduct,
  deleteProduct,
  getLowStockProducts,
  //   getProductsStatistics,
};
