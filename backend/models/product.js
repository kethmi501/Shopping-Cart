import mongoose from "mongoose";

const {Schema} = mongoose;

const productSchema = new Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
        },
        price: {
            type: String,
            trim: true,
            required: true,
        },
        category: {
            type: String,
            required: true,
            trim: true,
        },
        stock: {
            type: String,
            required: true,
            trim: true,
        },
        picture: {
            type: JSON,
        },
        sellerId: {
            type: String,
            required: true,
            trim: true,
        },

    },
    {timestamps: true},
);

export default mongoose.model("Product", productSchema);
