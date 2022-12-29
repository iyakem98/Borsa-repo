import mongoose from 'mongoose';
import destinationSchema from './sharedSchemas/destinationSchema';

const itemSchema = mongoose.Schema({ 
    //this is a separate schema for each item a buyer wants 
    itemType: {
        type: String,
        required: true
    },
    itemWeight: {
        type: String,
        required: true
    },
    orderDate: {
        type: Date,
        default: Date.now
    }
});

const itemsSchema = mongoose.Schema({
    itemList: [itemSchema],  //this is supposed to handle a list of items that a buyer wants 
    totalItemWeight: { //this handles the added total weight of all the items that a buyer wants
        type: String,
        required: true,
    },
    destination: destinationSchema
});

const consumerSchema = mongoose.Schema({ 
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            unique: true
        },
        itemsList: [itemsSchema], // List of types of items user wants
        showBuyerCard: { //this is a boolean on whether or not a buyer wants to be visible to others 
            type: Boolean,
            required: true,
            default: true,
        }
    }, 
    {
        timestamps: true
    }
);

const Consumer = mongoose.model('Consumer', consumerSchema);

export default Consumer

