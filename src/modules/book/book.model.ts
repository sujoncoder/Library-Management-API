import { Schema, model } from "mongoose";
import { IBook } from "./book.interface";


const bookSchema = new Schema<IBook>({
    title: {
        type: String,
        required: [true, "Title must be required"],
        trim: true,
    },
    author: {
        type: String,
        required: [true, "Author name must be required"],
        trim: true,
    },
    genre: {
        type: String,
        required: [true, "Genre is required"],
        enum: {
            values: ["FICTION", "NON_FICTION", "SCIENCE", "HISTORY", "BIOGRAPHY", "FANTASY",],
            message: 'Genre {VALUE} is not supported'
        }
    },
    isbn: {
        type: String,
        required: [true, "ISBN number must be required"],
        unique: true,
        trim: true,
        lowercase: true
    },
    description: {
        type: String,
        maxlength: [500, "Description too long, Description must be in 500 characters"]
    },
    copies: {
        type: Number,
        required: [true, "Copies number must be required"],
        min: [0, "Copies number must be positive"],
    },
    available: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });


// INSTANCE METHOD
bookSchema.methods.updateAvailabilityAfterBorrow = function (quantity: number) {
    this.copies -= quantity;

    if (this.copies <= 0) {
        this.available = false;
    }
};

const Book = model("Book", bookSchema);

export default Book;