if(process.env.NODE_ENV!="production"){
    require('dotenv').config()          //This line indicates that when we deploy or upload the file, the .env file is not uploaded or deployed
}

const express = require('express');
const mongoose = require('mongoose');
const dotenv = require("dotenv");
dotenv.config(); 
const app = express();
const port = 3000;
const cors = require('cors');
const methodoverride = require("method-override");
const Product = require('./model/product');
const session = require("express-session");
const MongoStore = require("connect-mongo");
const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const User = require("./model/user");
const Address = require('./model/Address');
const multer = require('multer');
const { storage } = require('./cloudConfig');

// Connect to MongoDB
const dburl=process.env.MONGO_URL;  
async function main() {
  await mongoose.connect(process.env.MONGO_URL );
}
main()
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB', err);
  });


const store= MongoStore.create({
  mongoUrl: dburl,
  crypto:{
    secret: process.env.SESSION_SECRET
  },
  touchAfter: 24 * 60 * 60, // 1 day
});
store.on("error", function(e){
  console.error("Session store error", e);
});
// Session configuration
let sessionOptions = {
  store,
  secret: process.env.SESSION_SECRET || 'your-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    secure: false,
    sameSite: 'lax',
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7
  }
};


// Multer configuration
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB file size limit
  }
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodoverride("_method"));
app.use(cors({
  origin: [
    "http://localhost:5173",           // Local development
    "https://moodigo-web-app.web.app"  // Production frontend
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(session(sessionOptions));
app.use(passport.initialize());
app.use(passport.session());

// Passport configuration
passport.use(new localStrategy({ usernameField: 'email' }, User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Routes
app.get('/products', async (req, res) => {
  try {
    const products = await Product.find({}).populate('owner', 'username email');
    res.json(products);
  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

app.get('/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const details = await Product.findById(id).populate('owner', 'username email');
    if (details) {
      res.json(details);
    }
  } catch (err) {
    console.error('Error fetching product details:', err);
    res.status(500).json({ error: 'Failed to fetch product details' });
  }
});

app.get('/products/:id/edit', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    if (!req.user || product.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: "You don't have permission to edit this product" });
    }
    res.json(product);
  } catch (err) {
    console.error('Error fetching product details:', err);
    res.status(500).json({ error: 'Failed to fetch product details' });
  }
});

app.put('/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    if (!req.user || product.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: "You don't have permission to edit this product" });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true, runValidators: true }
    );
    res.json(updatedProduct);
  } catch (err) {
    console.error('Error updating product:', err);
    res.status(500).json({ error: 'Failed to update product' });
  }
});

app.delete('/products/:id/delete', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    if (!req.user || product.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: "You don't have permission to delete this product" });
    }

    await Product.findByIdAndDelete(id);
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    console.error('Error deleting product:', err);
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

app.post('/addproduct', upload.single('imageFile'), async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'You must be logged in to add a product' });
    }

    const { name, about, price, category, subcategory, image } = req.body;
    
    if (!name || !about || !price || !category || !subcategory) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    let imageData;
    if (req.file) {
      imageData = {
        url: req.file.path,
        filename: req.file.filename
      };
    } else if (image) {
      try {
        new URL(image);
        imageData = {
          url: image,
          filename: "external"
        };
      } catch (err) {
        return res.status(400).json({ error: 'Invalid image URL' });
      }
    } else {
      return res.status(400).json({ error: 'Please provide either an image file or image URL' });
    }

    const newProduct = new Product({
      name,
      about,
      price: parseFloat(price),
      category,
      subcategory,
      image: imageData,
      owner: req.user._id
    });

    // In your /addproduct route
   // Modify the response to flatten the image structure
  const savedProduct = await newProduct.save();
  const productResponse = savedProduct.toObject();
  productResponse.image = productResponse.image.url; // Flatten the image

  res.status(201).json({ 
    message: "Product added successfully",
    product: productResponse
  });

  } catch (err) {
    console.error('Error adding product:', err);
    res.status(500).json({ 
      error: 'Failed to add product',
      details: err.message 
    });
  }
});

app.post('/signup', async (req, res) => {
  const { Firstname, Lastname, email, phonenumber, password } = req.body;

  try {
    // Generate username from email (e.g., part before @)
    const username = email.split('@')[0];

    // Create a new User instance with username
    const newUser = new User({ 
      Firstname,
      Lastname, 
      email,
      phonenumber,
      username, // Add username field
      password 
    });

    // Register the user using passport-local-mongoose's register method
    await User.register(newUser, password);

    // Log the user in automatically after registration
    req.login(newUser, (err) => {
      if (err) {
        console.error('Login failed:', err);
        return res.status(500).json({ error: 'Failed to log in after signup.' });
      }
      
      // Respond with success
      res.status(200).json({ 
        message: 'Signup successful!',
        user: {
          username: newUser.username,
          email: newUser.email,
          _id: newUser._id
        }
      });
    });
  } catch (err) {
    console.error('Signup error:', err);
    res.status(400).json({ error: 'Signup failed. Please try again.', details: err.message });
  }
});
app.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    // console.log('Login request body:', req.body);

    if (err) return next(err);
    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password.' });
    }
    req.logIn(user, (err) => {
      if (err) return next(err);
res.status(200).json({
  message: 'Login successful!',
  user: {
    username: user.username,
    email: user.email,
    _id: user._id
  }
});
    });
  })(req, res, next);
});
app.get('/logout', (req, res) => {
  req.logout((err)=>{
    if(err){
      return res.status(500).json({error:"logout faied"})
    }
   res.status(200).json({ message: "Logout successful" });

  })
})

app.post("/Address", async(req, res) => {
   if (!req.user) {
        return res.status(401).json({ error: 'You must be logged in to add Address' });
      }
  const { name,email, number, address, city, state, pincode } = req.body;
  const newAddress=new Address({
    name,email, number, address, city, state, pincode,userId: req.user._id
  });
  await newAddress.save();
  res.status(200).json({ message: "Address added successfully" });
});

// Add GET route for fetching addresses
app.get("/Address", async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ error: 'You must be logged in to view addresses' });
  }
  try {
    const addresses = await Address.find({ userId: req.user._id });
    res.status(200).json(addresses);
  } catch (err) {
    console.error('Error fetching addresses:', err);
    res.status(500).json({ error: 'Failed to fetch addresses' });
  }
});

app.get("/",(req,res)=>{
    res.send("Hello from the backend");
})
app.listen(port,()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
})
app.get('/check-auth', (req, res) => {
  if (req.isAuthenticated()) {
    // Return user details without sensitive information
    const { _id, Firstname,Lastname,phonenumber, email } = req.user;
    return res.status(200).json({ 
      isAuthenticated: true, 
      user: { _id, Firstname,Lastname,phonenumber,  email } 
    });
  } else {
    // Clear any client-side cookies if not authenticated server-side
    if (req.cookies) {
      Object.keys(req.cookies).forEach(cookie => {
        res.clearCookie(cookie);
      });
    }
    return res.status(200).json({ isAuthenticated: false });
  }
});

// Address deletion endpoint
app.delete("/Address/delete/:id", async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'You must be logged in to delete an address' });
    }

    const { id } = req.params;
    const address = await Address.findById(id);

    if (!address) {
      return res.status(404).json({ error: 'Address not found' });
    }

    // Check if the address belongs to the logged-in user
    if (address.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'You do not have permission to delete this address' });
    }

    await Address.findByIdAndDelete(id);
    res.status(200).json({ message: 'Address deleted successfully' });
  } catch (err) {
    console.error('Error deleting address:', err);
    res.status(500).json({ error: 'Failed to delete address' });
  }
});

// Add profile update endpoint
// app.put('/profile/update', async (req, res) => {
//   try {
//     if (!req.isAuthenticated()) {
//       return res.status(401).json({ error: 'You must be logged in to update your profile' });
//     }

// const { Firstname, Lastname, email } = req.body;

// if (!Firstname || !Lastname || !email) {
//   return res.status(400).json({ error: 'Firstname, Lastname, and email are required' });
// }

// // Check for duplicate email
// const existingUser = await User.findOne({ email, _id: { $ne: req.user._id } });
// if (existingUser) {
//   return res.status(400).json({ error: 'Email is already taken' });
// }

// // Update user
// const updatedUser = await User.findByIdAndUpdate(
//   req.user._id,
//   { Firstname, Lastname, email },
//   { new: true, runValidators: true }
// ).select('-password');

//     if (!updatedUser) {
//       return res.status(404).json({ error: 'User not found' });
//     }

//     res.status(200).json({ 
//       message: 'Profile updated successfully',
//       user: updatedUser
//     });
//   } catch (error) {
//     console.error('Error updating profile:', error);
//     res.status(500).json({ error: 'Failed to update profile' });
//   }
// });
