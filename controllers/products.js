const express = require('express');
const verifyToken = require('../middleware/verify-token.js');
const Product = require('../models/product.js');
const router = express.Router();

// POST /products
router.post("/", verifyToken, async (req, res) => {
    try {
        req.body.author = req.user._id;
        const product = await Product.create(req.body);
        product._doc.author = req.user;
        res.status(201).json(product);
    } catch (err) {
        res.status(500).json({ err: err.message });
    }
});

// GET /products
router.get("/", verifyToken, async (req, res) => {
    try {
        const products = await Product.find({})
            .populate("author")
            .sort({ createdAt: "desc" });
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ err: err.message });
    }
});

// GET /products/:productId
router.get("/:productId", verifyToken, async (req, res) => {
    try {
        const product = await Product.findById(req.params.productId).populate([
            'author',
            'reviews.author',
        ]);
        res.status(200).json(product);
    } catch (err) {
        res.status(500).json({ err: err.message });
    }
});

// PUT /products/:productId
router.put("/:productId", verifyToken, async (req, res) => {
    try {
        // Find the product:
        const product = await Product.findById(req.params.productId);

        // Check permissions:
        if (!product.author.equals(req.user._id)) {
            return res.status(403).send("You're not allowed to do that!");
        }

        // Update product:
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.productId,
            req.body,
            { new: true }
        );

        // Append req.user to the author property:
        updatedProduct._doc.author = req.user;

        // Issue JSON response:
        res.status(200).json(updatedProduct);
    } catch (err) {
        res.status(500).json({ err: err.message });
    }
});

// DELETE /products/:productId
router.delete("/:productId", verifyToken, async (req, res) => {
    try {
        const product = await Product.findById(req.params.productId);

        if (!product.author.equals(req.user._id)) {
            return res.status(403).send("You're not allowed to do that!");
        }

        const deletedProduct = await Product.findByIdAndDelete(req.params.productId);
        res.status(200).json(deletedProduct);
    } catch (err) {
        res.status(500).json({ err: err.message });
    }
});

// POST /products/:productId/reviews
router.post("/:productId/reviews", verifyToken, async (req, res) => {
    try {
        req.body.author = req.user._id;
        const product = await Product.findById(req.params.productId);
        product.reviews.push(req.body);
        await product.save();

        // Find the newly created review:
        const newReview = product.reviews[product.reviews.length - 1];

        newReview._doc.author = req.user;

        // Respond with the newReview:
        res.status(201).json(newReview);
    } catch (err) {
        res.status(500).json({ err: err.message });
    }
});

// PUT /products/:productId/reviews/:reviewId
router.put("/:productId/reviews/:reviewId", verifyToken, async (req, res) => {
    try {
        const product = await Product.findById(req.params.productId);
        const review = product.reviews.id(req.params.reviewId);

        // ensures the current user is the author of the review
        if (review.author.toString() !== req.user._id) {
            return res
                .status(403)
                .json({ message: "You are not authorized to edit this review" });
        }

        review.text = req.body.text;
        await product.save();
        res.status(200).json({ message: "Review updated successfully" });
    } catch (err) {
        res.status(500).json({ err: err.message });
    }
});

// DELETE /products/:productId/reviews/:reviewId
router.delete("/:productId/reviews/:reviewId", verifyToken, async (req, res) => {
    try {
        const product = await Product.findById(req.params.productId);
        const review = product.reviewss.id(req.params.reviewId);

        // ensures the current user is the author of the review
        if (review.author.toString() !== req.user._id) {
            return res
                .status(403)
                .json({ message: "You are not authorized to edit this review" });
        }

        product.reviews.remove({ _id: req.params.reviewId });
        await product.save();
        res.status(200).json({ message: "Review deleted successfully" });
    } catch (err) {
        res.status(500).json({ err: err.message });
    }
});

module.export = router;