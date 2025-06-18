if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const mongoose = require("mongoose");
const app = express();

const cors = require('cors');

// const port = process.env.PORT || 3000;

const methodoverride = require("method-override");
const Product = require("./model/product");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const User = require("./model/user");
const Address = require('./model/Address');
const multer = require('multer');
const { storage } = require('./cloudConfig');
const Contact = require('./model/contact');
const nodemailer = require('nodemailer');
const Review = require('./model/review');
// Connect to MongoDB
const dburl=process.env.DB_URL || "mongodb://localhost:27017/Ecommerce";
async function main() {
  try {
    await mongoose.connect(dburl);
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Error connecting to MongoDB', err);
    process.exit(1);
  }
}
main();



const store= MongoStore.create({
  mongoUrl: dburl,
  crypto:{
    secret: process.env.SESSION_SECRET || 'your-secret-key'
  },
  touchAfter: 24 * 60 * 60, // 1 day
  collectionName: 'sessions', // Explicitly set collection name
  ttl: 24 * 60 * 60, // 1 day in seconds
});

store.on("error", function(e){
  console.error("Session store error", e);
});

store.on("connect", function() {
  console.log("MongoDB session store connected");
});

// Session configuration
let sessionOptions = {
  store,
  secret: process.env.SESSION_SECRET || 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  name: 'moodigo.sid',
  cookie: {
    httpOnly: true,
    secure: true, // Must be true for cross-origin requests
    sameSite: 'none', // Required for cross-origin requests
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
    domain: process.env.NODE_ENV === 'production' ? '.onrender.com' : undefined // Set domain for production
  }
};

// Add session middleware logging
// app.use((req, res, next) => {
//   console.log(`Session ID: ${req.sessionID}`);
//   next();
// });


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD
  },
});

// Multer configuration

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed!"), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodoverride("_method"));

// CORS configuration - must come before session middleware
const allowedOrigins = [
  'https://moodigo-web-app.web.app',
  'http://localhost:5173',
  'https://localhost:5173', // Add HTTPS localhost for testing
];

app.use(cors({
  origin: function (origin, callback) {
    console.log('CORS check for origin:', origin);
    
    // Allow requests with no origin (like mobile apps or Postman)
    if (!origin) {
      console.log('Allowing request with no origin');
      return callback(null, true);
    }
    
    if (allowedOrigins.includes(origin)) {
      console.log('Origin allowed:', origin);
      callback(null, true);
    } else {
      console.log('Origin blocked:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  exposedHeaders: ['Set-Cookie'],
  preflightContinue: false,
  optionsSuccessStatus: 200
}));

app.use(session(sessionOptions));
app.use(passport.initialize());
app.use(passport.session());

// Handle preflight requests
app.options('*', cors());

// Add session debugging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] Session Debug:`, {
    sessionID: req.sessionID,
    isAuthenticated: req.isAuthenticated(),
    user: req.user ? req.user._id : null,
    cookies: req.headers.cookie ? 'present' : 'missing',
    origin: req.headers.origin,
    method: req.method
  });
  next();
});

passport.use(new localStrategy({ usernameField: "email" }, User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get("/products", async (req, res) => {
  try {
    const products = await Product.find({}).populate("owner", "username email");
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

app.get("/products/:id", async (req, res) => {
  try {
    const details = await Product.findById(req.params.id).populate("owner", "username email");
    if (details) res.json(details);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch product details" });
  }
});

app.get("/products/:id/edit", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });
    if (!req.user || product.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: "No permission" });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch product" });
  }
});

app.put("/products/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });
    if (!req.user || product.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: "No permission" });
    }
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );
    res.json(updatedProduct);
  } catch (err) {
    res.status(500).json({ error: "Failed to update product" });
  }
});

app.delete("/products/:id/delete", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: "Not found" });
    if (!req.user || product.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: "No permission" });
    }
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete product" });
  }
});

app.post("/addproduct", upload.single("imageFile"), async (req, res) => {
  try {
    console.log('--- New Product Request ---');
    console.log('Request Body:', req.body);
    if (req.file) {
      console.log('Request File:', req.file);
    }
    if (!req.user) {
      return res.status(401).json({ error: 'You must be logged in to add a product' });
    }


    const { name, about, price, category, subcategory, image } = req.body;
    if (!name || !about || !price || !category || !subcategory) {
      return res.status(400).json({ error: "All fields required" });
    }

    let imageData;
    if (req.file) {
      imageData = { url: req.file.path, filename: req.file.filename };
    } else if (image) {
      new URL(image);
      imageData = { url: image, filename: "external" };
    } else {
      return res.status(400).json({ error: "Provide image file or URL" });
    }

    const newProduct = new Product({
      name,
      about,
      price: parseFloat(price),
      category,
      subcategory,
      image: imageData,
      owner: req.user._id,
    });
    console.log('Attempting to save new product:', newProduct);

    const savedProduct = await newProduct.save();
    const productResponse = savedProduct.toObject();
    productResponse.image = productResponse.image.url;

    res.status(201).json({ message: "Product added", product: productResponse });
  } catch (err) {
    res.status(500).json({ error: "Failed to add product", details: err.message });
  }
});

app.post("/signup", async (req, res) => {
  const { Firstname, Lastname, email, phonenumber, password } = req.body;
  try {
    const username = email.split("@")[0];
    const newUser = new User({ Firstname, Lastname, email, phonenumber, username });
    await User.register(newUser, password);
    req.login(newUser, (err) => {
      if (err) return res.status(500).json({ error: "Login after signup failed" });
      res.status(200).json({ message: "Signup successful", user: { username, email, _id: newUser._id } });
    });
  } catch (err) {
    res.status(400).json({ error: "Signup failed", details: err.message });
  }
});

app.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);
    if (!user) {
      return res.status(401).json({ 
        error: info.message || "Invalid credentials" 
      });
    }
    req.logIn(user, (err) => {
      if (err) return next(err);
      // Explicitly save session before sending response
      req.session.save((err) => {
        if (err) {
          console.error('Session save error:', err);
          return res.status(500).json({ error: "Session save failed" });
        }
        console.log('Login successful, session saved:', req.sessionID);
        res.status(200).json({ 
          message: "Login successful", 
          user: { 
            username: user.username, 
            email: user.email, 
            _id: user._id 
          } 
        });
      });
    });
  })(req, res, next);
});
app.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) return res.status(500).json({ error: "Logout failed" });
    res.status(200).json({ message: "Logout successful" });
  });
});

app.post("/Address", async (req, res) => {
  if (!req.user) return res.status(401).json({ error: "Login required" });
  const { name, email, number, address, city, state, pincode } = req.body;
  const newAddress = new Address({ name, email, number, address, city, state, pincode, userId: req.user._id });
  await newAddress.save();
  res.status(200).json({ message: "Address added" });
});

app.get("/Address", async (req, res) => {
  if (!req.user) return res.status(401).json({ error: "Login required" });
  const addresses = await Address.find({ userId: req.user._id });
  res.status(200).json(addresses);
});

app.get("/",(req,res)=>{
    res.send("Hello from the backend");
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.get('/check-auth', (req, res) => {
  console.log("Checking auth status:", {
    isAuthenticated: req.isAuthenticated(),
    sessionID: req.sessionID,
    user: req.user ? req.user._id : null
  });
  
  if (req.isAuthenticated()) {
    const { _id, Firstname, Lastname, phonenumber, email, username } = req.user;
    res.status(200).json({ 
      isAuthenticated: true, 
      user: { _id, Firstname, Lastname, phonenumber, email, username } 
    });
  } else {
    res.status(200).json({ isAuthenticated: false });
  }
});

// Address deletion endpoint

app.delete("/Address/delete/:id", async (req, res) => {
  try {
    if (!req.user) return res.status(401).json({ error: "Login required" });
    const address = await Address.findById(req.params.id);
    if (!address) return res.status(404).json({ error: "Address not found" });
    if (address.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: "Unauthorized" });
    }
    await Address.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Address deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete address" });
  }
});
app.post('/contact', async (req, res) => {
  try {
    const { name, description, phone,email } = req.body;

    // Save contact to DB
    const newContact = new Contact({ name, description, phone,email });
    await newContact.save();

    // Email setup
    const mailOptions = {
      from: process.env.EMAIL,
      to: process.env.RECEIVER,
      subject: "New Contact Form Submission",
      text: `Name: ${name}\nDescription: ${description}\nPhone: ${phone}\nEmail: ${email}`
    };

    try {
      console.log("Attempting to send email...");
      await transporter.sendMail(mailOptions);
      console.log("Email sent successfully");
      return res.status(200).json({ message: 'Contact submitted and email sent successfully' });
    } catch (emailError) {
      console.error("Email sending error:", emailError);
      return res.status(500).json({ error: 'Contact saved, but failed to send email' });
    }

  } catch (err) {
    console.error('Error submitting contact:', err);
    return res.status(500).json({ error: 'Failed to submit contact' });
  }
});
  // app.post('/review/:id',async(req,res)=>{
  //   try{
  //     const product=await Product.findById(req.params.id);
  //     const{rating,comment}=req.body;
  //     const newReview=new Review({rating,comment,author:req.user._id});
  //     product.reviews.push(newReview);
  //     await product.save();
  //     await newReview.save();
  //     res.status(200).json({message:'Review submitted successfully'});
  //   }catch(err){
  //     console.error('Error submitting review:', err);
  //     res.status(500).json({error:'Failed to submit review'});
  //   }
  // });

// Add GET route for fetching reviews
app.get('/review/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const reviews = await Review.find({ product: product._id })
      .populate('author', 'Firstname Lastname')
      .sort({ createdAt: -1 });
    
    res.status(200).json(reviews);
  } catch (err) {
    console.error('Error fetching reviews:', err);
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
});

app.post('/review/:id', async (req, res) => {
  try {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ error: 'You must be logged in to submit a review' });
    }

    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const { rating, comment } = req.body;
    if (!rating || !comment) {
      return res.status(400).json({ error: 'Rating and comment are required' });
    }

    const newReview = new Review({
      rating,
      comment,
      author: req.user._id,
      product: product._id
    });

    await newReview.save();
    product.reviews.push(newReview._id);
    await product.save();
    
    res.status(200).json({ message: 'Review submitted successfully' });
  } catch (err) {
    console.error('Error submitting review:', err);
    res.status(500).json({ error: 'Failed to submit review' });
  }
});

app.get("/test-session", (req, res) => {
  console.log('Test session route called');
  console.log('Session ID:', req.sessionID);
  console.log('Session data:', req.session);
  console.log('Is authenticated:', req.isAuthenticated());
  console.log('User:', req.user);
  console.log('Headers:', req.headers);
  
  res.json({
    sessionID: req.sessionID,
    isAuthenticated: req.isAuthenticated(),
    user: req.user,
    sessionData: req.session,
    headers: {
      origin: req.headers.origin,
      cookie: req.headers.cookie ? 'present' : 'missing',
      'user-agent': req.headers['user-agent']
    }
  });
});

app.get("/test-cors", (req, res) => {
  res.json({
    message: "CORS test successful",
    origin: req.headers.origin,
    timestamp: new Date().toISOString()
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Global error handler:', err);
  
  if (err.message === 'Not allowed by CORS') {
    return res.status(403).json({ 
      error: 'CORS error', 
      message: 'Origin not allowed',
      origin: req.headers.origin 
    });
  }
  
  res.status(500).json({ 
    error: 'Internal server error',
    message: err.message 
  });
});
