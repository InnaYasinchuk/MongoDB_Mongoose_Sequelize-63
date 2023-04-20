import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const productSchema = new Schema ({
    title: String,
    price: Number,
    rating: Number,
    category: String,
    brand: String,
    })

const Product = mongoose.model('product', productSchema);

export {Product, productSchema};
