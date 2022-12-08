import mongoose from 'mongoose'
import dotenv from 'dotenv'
import colors from 'colors'
import users from './data/users.js'
import User from './models/userModel.js'
import Chat from './models/chatModel.js'
import Message from './models/messageModel.js'
import connectDB from './config/db.js'
import randomUser from './data/faker_data.js'

dotenv.config()

connectDB()

// const importData = async() => {
//     try {
//         await User.deleteMany()
//         await Chat.deleteMany()
//         await Message.deleteMany()
   
//         const createdUsers = await User.insertMany(users)
        
//         const adminUser = createdUsers[0]._id

        
//         console.log(`Data Imported!`.green.inverse)
//         process.exit()
//     } catch (error) {
//         console.log(`${error}`.red.inverse)
//         process.exit(1)
//     }
// }



const importData = async(userData) => {
    try {
        await User.deleteMany()
        await Chat.deleteMany()
        await Message.deleteMany()
   
        const createdUsers = await User.insertMany(userData)
        
        const adminUser = createdUsers[0]._id

        
        console.log(`Data Imported!`.green.inverse)
        process.exit()
    } catch (error) {
        console.log(`${error}`.red.inverse)
        process.exit(1)
    }
}

const destroyData = async() => {
    try {
        await User.deleteMany()
        await Chat.deleteMany()
        await Message.deleteMany()
   
        
        
        console.log(`Data Destroyed!`.yellow.inverse)
        process.exit()
    } catch (error) {
        console.log(`${error}`.red.inverse)
        process.exit(1)
    }
}

if (process.argv[2] === '-d') {
    destroyData()
}
else if (process.argv[2] === '-l'){
    // expect 3rd command line argument, add dafult chats
    // generate default number of chats

    const numUsers = 10;
    let faker_users = [];
    Array.from({ length: numUsers}).forEach(() => {
        //console.log(randomUser());
        faker_users.push(randomUser());
    });
    
    importData(faker_users);
    console.log(faker_users);

}
else {
    importData(users);
    console.log(users);
}


