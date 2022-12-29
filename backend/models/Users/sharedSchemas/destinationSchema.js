import mongoose from 'mongoose';

const destinationSchema = mongoose.Schema({ 
    //this is a separate schema for each destination that a traveler has
    city: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true,
    },
    flightDate: {
        type: Date,
    }
});

export default destinationSchema;
