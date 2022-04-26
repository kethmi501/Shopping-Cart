import mongoose from "mongoose";

const {Schema} = mongoose;

const userSchema = new Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
        },
        email: {
            type: String,
            trim: true,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            min: 6,
            max: 64,
        },
        picture: {
            type: JSON,
            default: {
                id: "",
                url: "https://firebasestorage.googleapis.com/v0/b/enlearn-9b4cf.appspot.com/o/websrc%2Fprofile_default_pic.jpg?alt=media&token=133ea3c5-4df6-446d-a554-989017511f2b",
            },
        },
        role: {
            type: [String],
            default: ["User"],
            enum: ["User", "Seller", "Admin"],
        }
    },
    {timestamps: true},
);

export default mongoose.model("User", userSchema);
