
import mongoose from 'mongoose';
import destinationSchema from './sharedSchemas/destinationSchema';


const travelerSchema = mongoose.Schema(
    { 
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            unique: true
        },
        
        destinations: [destinationSchema],  //this is supposed to handle a list of all destinations a traveler is traveling to

        totalSpace: {  //this is supposed to handle the total space that a traveler has 
            type: String,
            required: true
        }, 

        showTravelerCard: {  //this is a boolean on whether or not a traveler wants to be visible to others 
            type: Boolean,
            required: true,
            default: true,
        }
    }, 
    {
        timestamps: true
    }
);

const Traveler = mongoose.model('Traveler', travelerSchema);

export default Traveler