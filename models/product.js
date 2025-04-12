const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
    {
        text: {
            type: String,
            required: true
        },
        author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
    },
    { timestamps: true }
);

const productSchema = new mongoose.Schema(
    {
        productName: {
            type: String,
            required: true,
        },
        imageLink: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        price: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
            enum: ['Electronics', 'Movies', 'Appliances', 'Foods'],
        },
        author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        reviews: [reviewSchema],
    },
    { timestamps: true }
);

const Product = mongoose.model('Product', productSchema )

module.export = Product;