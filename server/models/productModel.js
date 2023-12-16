const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const productSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    name: {
        type: String,
        required: [true, "Please Add a Name"],
        trim: true,
    },
    sku: {
        type: String,
        required: true,
        trim: true,
        default: "sku",
    },
    category: {
        type: String,
        required: [true, "Please add a category"],
        trim: true,
    },
    quantity: {
        type: String,
        required: [true, "Please add quantity"],
        trim: true,
    },
    price: {
        type: String,
        required: [true, "Please add Price"],
        trim: true,
    },
    description: {
        type: String,
        required: [true, "Please add description"],
        trim: true,
    },
    image: {
        type: Object,
        default: {}
    }
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);