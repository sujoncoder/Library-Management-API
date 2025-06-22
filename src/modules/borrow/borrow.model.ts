import { Schema, model } from "mongoose";
import { IBorrow } from "./borrow.interface";



const borrowSchema = new Schema<IBorrow>({
    book: {
        type: Schema.Types.ObjectId,
        ref: "Book",
        required: [true, "Book reference is required"],
    },
    quantity: {
        type: Number,
        required: [true, "Quantity is required"],
        min: [1, "At least one copy must be borrowed"],
    },
    dueDate: {
        type: Date,
        required: [true, "Due date is required"]
    }

}, { timestamps: true });

const Borrow = model<IBorrow>("Borrow", borrowSchema);

export default Borrow;