import { faker } from '@faker-js/faker';

function createRandomUser(){
    return {
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            userName: faker.internet.userName(),
            email: faker.internet.email(),
            password: faker.internet.password(),
            city: faker.address.city(),
            country:  faker.address.country(),
            isTraveler: faker.datatype.boolean()
    }
}

function createRandomChat(userOne, userTwo){
    return {
            users: [
            {
                firstName: userOne.firstName,
                email: userOne.email,
            },
            {
                firstName: userTwo.firstName,
                email: userTwo.email,
            },
            ],
            _id: "617a077e18c25468bc7c4dd4",
            chatName: userOne.firstName
    }
}


export default createRandomUser;

