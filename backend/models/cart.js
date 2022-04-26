import mongoose from "mongoose";

const {Schema} = mongoose;

const cartSchema = new Schema(
    {
        userId: {
            type: String,
            required: true,
            trim: true,
        },
        productArray: {
            type: [String],
            required: true,
            default: [],
        },

    },
    {timestamps: true},
);

export default mongoose.model("Cart", cartSchema);
