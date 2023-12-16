const Product = require("../models/productModel")
const { fileSizeFormatter } = require("../utils/fileUpload")
const cloudinary = require("cloudinary").v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const createProduct = async (req, res) => {
    const { name, sku, category, quantity, price, description } = req.body;

    if (!name || !category || !quantity || !price || !description) {
        return res.status(400).json({ msg: "Please fill all the fields" })
    }

    try {
        let fileData = {};
        // Handle File Upload.......
        if (req.file) {
            // Save Image to cloudinary
            let uploadedFile;
            try {
                uploadedFile = await cloudinary.uploader.upload(req.file.path, {
                    folder: "Pinvent",
                    resource_type: "image",
                })
            } catch (error) {
                return res.status(500).json({ msg: "Image could not be uploaded" })
            }

            fileData = {
                fileName: req.file.originalname,
                filePath: uploadedFile.secure_url,
                fileType: req.file.mimetype,
                fileSize: fileSizeFormatter(req.file.size, 2),
            }
        }

        const product = await Product.create({
            user: req.user.id,
            name,
            sku,
            category,
            quantity,
            price,
            description,
            image: fileData,
        });

        await product.save();
        return res.status(201).json({ msg: "Product created Successfully" })
    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
}

const getAllProducts = async (req, res) => {
    const products = await Product.find({ user: req.user.id }).sort("-createdAt");
    if (!products) {
        return res.status(404).json({ msg: "No Product Found" })
    }
    return res.status(200).json(products);
}

const getSingleProduct = async (req, res) => {
    const id = req.params.id;
    let product;
    try {
        product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ msg: "Product not found" })
        }

        if (product.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: "Unauthorized User" })
        }
        return res.status(200).json(product);
    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
}

const deleteProduct = async (req, res) => {
    const id = req.params.id;
    let product;
    try {
        product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({ msg: "Product not found" })
        }

        if (product.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: "Unauthorized User" })
        }
        await product.deleteOne()
        return res.status(200).json({ msg: "Product deleted" })
    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
}

const updateProduct = async (req, res) => {
    const id = req.params.id;
    const { name, category, quantity, price, description } = req.body;

    let product;
    try {
        product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ msg: "Product Not Found" })
        }
        if (product.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: "Unauthorized User" })
        }

        let fileData = {};
        // Handle File Upload.......
        if (req.file) {
            // Save Image to cloudinary
            let uploadedFile;
            try {
                uploadedFile = await cloudinary.uploader.upload(req.file.path, {
                    folder: "Pinvent",
                    resource_type: "image",
                })
            } catch (error) {
                return res.status(500).json({ msg: "Image could not be uploaded" })
            }

            fileData = {
                fileName: req.file.originalname,
                filePath: uploadedFile.secure_url,
                fileType: req.file.mimetype,
                fileSize: fileSizeFormatter(req.file.size, 2),
            }
        }

        let updateProduct = await Product.findByIdAndUpdate(product._id, {
            name: name || product.name,
            category: category || product.category,
            quantity: quantity || product.quality,
            price: price || product.price,
            description: description || product.description,
            image: Object.keys(fileData).length === 0 ? product?.image : fileData,
        }, { new: true, runValidators: true }
        )

        await updateProduct.save();
        return res.status(200).json({ msg: "Product Updated Successfully" });
    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
}

module.exports = { createProduct, getAllProducts, getSingleProduct, deleteProduct, updateProduct };