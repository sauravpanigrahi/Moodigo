const mongoose = require('mongoose');
const Data = require('./data.js');
const Product = require('../model/product');
const User = require('../model/user');

main()
.then(() => {
    console.log('Connected to MongoDB');
})
.catch((err) => {
    console.error('Error connecting to MongoDB', err);
});

async function main() {
    await mongoose.connect("mongodb://localhost:27017/Ecommerce");
}

const initDB = async () => {
    try {
        // Clear existing data
        await Product.deleteMany({});
        await User.deleteMany({});
        console.log('Existing data cleared');
        
        // Create a default user
        const defaultUser = await User.register({ email: 'sauravpanigrahi2004@gmail.com' }, 'saurav123');
        console.log('Default user created');
        
        // Add owner field to all sample products
        const productsWithOwner = Data.data.map(product => ({
            ...product,
            owner: defaultUser._id
        }));
        
        // Insert new data
        await Product.insertMany(productsWithOwner);
        console.log('Data inserted successfully');
    } catch(err) {
        console.error('Error inserting data', err);
    }
}

initDB();