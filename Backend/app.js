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
const User = require("./model/user");
const Address = require('./model/Address');
const multer = require('multer');
const { storage } = require('./cloudConfig');
const Contact = require('./model/contact');
const nodemailer = require('nodemailer');
const Review = require('./model/review');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const { isLoggedIn } = require('./middleware');
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
app.use(cookieParser());

// CORS configuration

app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://moodigo-web-app.web.app'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
  exposedHeaders: ['Set-Cookie', 'Cookie']
}));

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

app.post("/addproduct", isLoggedIn, upload.single("imageFile"), async (req, res) => {
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
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }
    const newUser = new User({ Firstname, Lastname, email, phonenumber, username, password });
    await newUser.save();
    // Generate JWT
    const token = jwt.sign({ _id: newUser._id, email: newUser.email, username: newUser.username }, process.env.JWT_SECRET || 'SECRET_KEY', { expiresIn: '1d' });
    res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax', maxAge: 24 * 60 * 60 * 1000 });
    res.status(200).json({ message: "Signup successful", user: { username, email, _id: newUser._id } });
  } catch (err) {
    res.status(400).json({ error: "Signup failed", details: err.message });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: "Invalid credentials" });
    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });
    // Generate JWT
    const token = jwt.sign({ _id: user._id, email: user.email, username: user.username }, process.env.JWT_SECRET || 'SECRET_KEY', { expiresIn: '1d' });
    res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax', maxAge: 24 * 60 * 60 * 1000 });
    res.status(200).json({ message: "Login successful", user: { username: user.username, email: user.email, _id: user._id } });
  } catch (err) {
    res.status(500).json({ error: "Login failed", details: err.message });
  }
});

app.post("/logout", (req, res) => {
  res.clearCookie('token');
  res.status(200).json({ message: "Logout successful" });
});

app.post("/Address", isLoggedIn, async (req, res) => {
  if (!req.user) return res.status(401).json({ error: "Login required" });
  const { name, email, number, address, city, state, pincode } = req.body;
  const newAddress = new Address({ name, email, number, address, city, state, pincode, userId: req.user._id });
  await newAddress.save();
  res.status(200).json({ message: "Address added" });
});

app.get("/Address", isLoggedIn, async (req, res) => {
  if (!req.user) return res.status(401).json({ error: "Login required" });
  const addresses = await Address.find({ userId: req.user._id });
  res.status(200).json(addresses);
});

app.get("/",(req,res)=>{
    res.send("Hello from the backend");
})



app.get('/check-auth', (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.status(200).json({ isAuthenticated: false });
  jwt.verify(token, process.env.JWT_SECRET || 'SECRET_KEY', (err, decoded) => {
    if (err) return res.status(200).json({ isAuthenticated: false });
    res.status(200).json({
      isAuthenticated: true,
      user: {
        _id: decoded._id,
        username: decoded.username,
        email: decoded.email
      }
    });
  });
});

// Address deletion endpoint

app.delete("/Address/delete/:id", isLoggedIn, async (req, res) => {
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

app.post('/review/:id', isLoggedIn, async (req, res) => {
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



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on the port ${PORT}`);
});