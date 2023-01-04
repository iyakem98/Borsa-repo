import mongoose from 'mongoose';
import destinationSchema from './sharedSchemas/destinationSchema';

const itemSchema = mongoose.Schema({ 
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
    },

    destination: destinationSchema
});


const consumerSchema = mongoose.Schema({ 
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            unique: true
        },
        itemsList: [itemSchema], // List of types of items user wants
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

