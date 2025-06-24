const sampleProducts = [
  {
    name: "Men's Polo T-Shirt",
    about: "Breathable cotton polo perfect for casual outings.",
    price: 999,
    image: "https://images.pexels.com/photos/2010877/pexels-photo-2010877.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "Fashion > Men",
    subcategory: "Men"
  },
  {
    name: "Leica Q3",
    about: "60MP full-frame camera with 8K video recording and tilting screen.",
    price: 499999,
    image: "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "Electronics > Cameras",
    subcategory: "Cameras"
  },
  {
    name: "Apple Watch Series 11",
    about: "Features microLED display and advanced health sensors.",
    price: 39999,
    image: "https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "Electronics > SmartWatches",
    subcategory: "SmartWatches"
  },
  {
    name: "HP Spectre x360",
    about: "2-in-1 convertible with OLED touchscreen and Intel Evo platform.",
    price: 149999,
    image: "https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=400",
    category: "Electronics > Laptops",
    subcategory: "Laptops"
  },
  {
    name: "Women's Tube Dress",
    about: "Elegant strapless dress suitable for summer events.",
    price: 3499,
    image: "https://images.pexels.com/photos/985635/pexels-photo-985635.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "Fashion > Women",
    subcategory: "Women"
  },
  {
    name: "Mi 10000mAh Power Bank 3i",
    about: "Compact power bank with dual input and output ports.",
    price: 1499,
    image: "https://images.pexels.com/photos/4498469/pexels-photo-4498469.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "Electronics > PowerBanks",
    subcategory: "PowerBanks"
  },
  {
    name: "Samsung Galaxy S25 Ultra",
    about: "6.9-inch Dynamic AMOLED 2X screen with Snapdragon 8 Elite Gen 2 chip.",
    price: 119999,
    image: "https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "Electronics > Mobiles",
    subcategory: "Mobiles"
  },
  {
    name: "Bose QuietComfort 45",
    about: "Comfortable over-ear headphones with active noise cancellation.",
    price: 27999,
    image: "https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "Electronics > Headphones",
    subcategory: "Headphones"
  },
  {
    name: "Men's Casual Denim Jacket",
    about: "Classic denim jacket with a modern fit.",
    price: 2999,
    image: "https://images.pexels.com/photos/1043143/pexels-photo-1043143.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "Fashion > Men",
    subcategory: "Men"
  },
  {
    name: "Fitbit Versa 5",
    about: "Fitness-focused smartwatch with improved heart rate tracking.",
    price: 19999,
    image: "https://images.pexels.com/photos/267438/pexels-photo-267438.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "Electronics > SmartWatches",
    subcategory: "SmartWatches"
  },
  {
    name: "Canon EOS R5",
    about: "45MP full-frame mirrorless camera with 8K video capability.",
    price: 349999,
    image: "https://images.pexels.com/photos/51383/photo-camera-subject-photographer-51383.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "Electronics > Cameras",
    subcategory: "Cameras"
  },
  {
    name: "Dell XPS 17 (2025 Edition)",
    about: "17-inch 4K OLED display with Intel 15th Gen Core i9 processor.",
    price: 239999,
    image: "https://images.pexels.com/photos/238118/pexels-photo-238118.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "Electronics > Laptops",
    subcategory: "Laptops"
  },
  {
    name: "iPhone 16 Pro Max",
    about: "Titanium build with a 6.9-inch ProMotion XDR OLED screen and A18 Pro chip.",
    price: 129999,
    image: "https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "Electronics > Mobiles",
    subcategory: "Mobiles"
  },
  {
    name: "Anker PowerCore 20000mAh",
    about: "High-capacity power bank with dual USB output and fast charging.",
    price: 2999,
    image: "https://images.pexels.com/photos/1841841/pexels-photo-1841841.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "Electronics > PowerBanks",
    subcategory: "PowerBanks"
  },
  {
    name: "Sony WH-1000XM5",
    about: "Industry-leading noise cancellation with up to 30 hours of battery life.",
    price: 29999,
    image: "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "Electronics > Headphones",
    subcategory: "Headphones"
  },
  {
    name: "Men's Chino Pants",
    about: "Comfortable and versatile chinos for everyday wear.",
    price: 1999,
    image: "https://images.pexels.com/photos/1895943/pexels-photo-1895943.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "Fashion > Men",
    subcategory: "Men"
  },
  {
    name: "Samsung Galaxy Watch 7",
    about: "Titanium frame with new Exynos chip for better battery efficiency.",
    price: 34999,
    image: "https://images.pexels.com/photos/1034646/pexels-photo-1034646.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "Electronics > SmartWatches",
    subcategory: "SmartWatches"
  },
  {
    name: "Google Pixel 9 Pro",
    about: "6.7-inch LTPO OLED display with Tensor G4 chip and triple camera system.",
    price: 99999,
    image: "https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "Electronics > Mobiles",
    subcategory: "Mobiles"
  },
  {
    name: "Realme 20000mAh Power Bank 2",
    about: "High-density lithium-polymer battery with 18W two-way quick charge.",
    price: 2499,
    image: "https://images.pexels.com/photos/1841841/pexels-photo-1841841.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "Electronics > PowerBanks",
    subcategory: "PowerBanks"
  },
  {
    name: "ASUS ROG Zephyrus G14",
    about: "Gaming laptop with AMD Ryzen 9 and NVIDIA RTX 40 series GPUs.",
    price: 159999,
    image: "https://images.pexels.com/photos/2047905/pexels-photo-2047905.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "Electronics > Laptops",
    subcategory: "Laptops"
  },
  {
    name: "Women's Maxi Skirt",
    about: "Flowy skirt perfect for holidays and casual wear.",
    price: 2499,
    image: "https://images.pexels.com/photos/1007018/pexels-photo-1007018.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "Fashion > Women",
    subcategory: "Women"
  },
  {
    name: "Apple AirPods Pro 2",
    about: "In-ear headphones with adaptive transparency and spatial audio.",
    price: 24999,
    image: "https://images.pexels.com/photos/8534088/pexels-photo-8534088.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "Electronics > Headphones",
    subcategory: "Headphones"
  },
  {
    name: "Nikon Z9",
    about: "45.7MP mirrorless camera with 8K video and fast continuous shooting.",
    price: 399999,
    image: "https://images.pexels.com/photos/279906/pexels-photo-279906.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "Electronics > Cameras",
    subcategory: "Cameras"
  },
  {
    name: "OnePlus 13",
    about: "6.8-inch LTPO AMOLED screen with Snapdragon 8 Elite Gen 2 and Hasselblad camera.",
    price: 89999,
    image: "https://images.pexels.com/photos/1275229/pexels-photo-1275229.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "Electronics > Mobiles",
    subcategory: "Mobiles"
  },
  {
    name: "Lenovo ThinkPad X1 Carbon Gen 13",
    about: "Ultra-mobile laptop with OLED screen and over 10 hours of battery life.",
    price: 199999,
    image: "https://images.pexels.com/photos/374074/pexels-photo-374074.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "Electronics > Laptops",
    subcategory: "Laptops"
  },
  {
    name: "Men's Slim Fit Blazer",
    about: "Tailored blazer suitable for formal and semi-formal occasions.",
    price: 4999,
    image: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "Fashion > Men",
    subcategory: "Men"
  },
  {
    name: "Samsung 10000mAh Wireless Power Bank",
    about: "Supports wireless charging and fast charging via USB-C.",
    price: 3499,
    image: "https://images.pexels.com/photos/163117/phone-mobile-smartphone-app-163117.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "Electronics > PowerBanks",
    subcategory: "PowerBanks"
  },
  {
    name: "Garmin Fenix 8",
    about: "Rugged smartwatch with advanced GPS and health tracking features.",
    price: 45999,
    image: "https://images.pexels.com/photos/335992/pexels-photo-335992.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "Electronics > SmartWatches",
    subcategory: "SmartWatches"
  },
  {
    name: "Sony Alpha 7R V",
    about: "61MP mirrorless camera with advanced autofocus and 4K video.",
    price: 299999,
    image: "https://images.pexels.com/photos/225157/pexels-photo-225157.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "Electronics > Cameras",
    subcategory: "Cameras"
  },
  {
    name: "Sennheiser Momentum 4",
    about: "High-fidelity sound with adaptive noise cancellation.",
    price: 31999,
    image: "https://images.pexels.com/photos/3587478/pexels-photo-3587478.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "Electronics > Headphones",
    subcategory: "Headphones"
  },
  
    {
      name: "Modern Wooden Sofa Set",
      about: "Elegant and comfortable wooden sofa set for your living room.",
      price: 25999,
      image: "https://images.pexels.com/photos/271743/pexels-photo-271743.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "Home & Furniture > Furniture",
      subcategory: "Furniture"
    },
    {
      name: "Abstract Wall Painting",
      about: "Canvas abstract painting to elevate your wall decor.",
      price: 1499,
      image: "https://images.pexels.com/photos/3773575/pexels-photo-3773575.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "Home & Furniture > Decor",
      subcategory: "Decor"
    },
    {
      name: "Tripod Floor Lamp",
      about: "Stylish floor lamp with warm LED lighting and wooden legs.",
      price: 3299,
      image: "https://images.pexels.com/photos/271816/pexels-photo-271816.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "Home & Furniture > Lighting",
      subcategory: "Lighting"
    },
    {
      name: "Ceramic Cookware Set",
      about: "Non-stick ceramic cookware set ideal for everyday cooking.",
      price: 2499,
      image: "https://images.pexels.com/photos/6164017/pexels-photo-6164017.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "Home & Furniture > Kitchenware",
      subcategory: "Kitchenware"
    },
    {
      name: "Multipurpose Storage Cabinet",
      about: "Compact and sleek cabinet for organizing household items.",
      price: 3499,
      image: "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "Home & Furniture > Storage",
      subcategory: "Storage"
    },
    
      {
        name: "Sony Bravia 55\" 4K LED TV",
        about: "Smart TV with vibrant 4K display and built-in Android OS.",
        price: 54999,
        image: "https://images.pexels.com/photos/5721906/pexels-photo-5721906.jpeg?auto=compress&cs=tinysrgb&w=400",
        category: "Appliances > TV",
        subcategory: "TV"
      },
      {
        name: "LG Dual Inverter AC 1.5 Ton",
        about: "Energy-efficient AC with fast cooling and silent operation.",
        price: 33999,
        image: "https://images.pexels.com/photos/6062082/pexels-photo-6062082.jpeg?auto=compress&cs=tinysrgb&w=400",
        category: "Appliances > AC",
        subcategory: "AC"
      },
      {
        name: "Samsung Double Door Refrigerator",
        about: "Frost-free refrigerator with digital inverter compressor.",
        price: 28999,
        image: "https://images.pexels.com/photos/3735201/pexels-photo-3735201.jpeg?auto=compress&cs=tinysrgb&w=400",
        category: "Appliances > Refrigerators",
        subcategory: "Refrigerators"
      },
      {
        name: "IFB Front Load Washing Machine",
        about: "Fully automatic washing machine with multiple wash modes.",
        price: 23999,
        image: "https://images.pexels.com/photos/5591465/pexels-photo-5591465.jpeg?auto=compress&cs=tinysrgb&w=400",
        category: "Appliances > WashingMachines",
        subcategory: "WashingMachines"
      },
      {
        name: "Panasonic Microwave Oven",
        about: "Versatile convection microwave with grill and bake options.",
        price: 8499,
        image: "https://images.pexels.com/photos/65175/pexels-photo-65175.jpeg?auto=compress&cs=tinysrgb&w=400",
        category: "Appliances > MicrowaveOvens",
        subcategory: "MicrowaveOvens"
      },
      {
        name: "Kent RO Water Purifier",
        about: "Advanced purifier with RO+UV+UF filtration and TDS controller.",
        price: 12499,
        image: "https://images.pexels.com/photos/4108612/pexels-photo-4108612.jpeg?auto=compress&cs=tinysrgb&w=400",
        category: "Appliances > WaterPurifiers",
        subcategory: "WaterPurifiers"
      },
        {
          name: "Digital Infrared Thermometer",
          about: "Non-contact infrared thermometer for quick and accurate readings.",
          price: 899,
          image: "https://images.pexels.com/photos/3936366/pexels-photo-3936366.jpeg?auto=compress&cs=tinysrgb&w=400",
          category: "Health > Thermometers",
          subcategory: "Thermometers"
        },
        {
          name: "Samsonite Polycarbonate Trolley Bag",
          about: "Lightweight, durable trolley bag perfect for international travel.",
          price: 5799,
          image: "https://images.pexels.com/photos/1243368/pexels-photo-1243368.jpeg?auto=compress&cs=tinysrgb&w=400",
          category: "Travel > TrolleyBags",
          subcategory: "TrolleyBags"
        },
        {
          name: "Organic Ashwagandha Capsules",
          about: "Natural stress relief and energy booster Ayurvedic supplement.",
          price: 699,
          image: "https://images.pexels.com/photos/4058226/pexels-photo-4058226.jpeg?auto=compress&cs=tinysrgb&w=400",
          category: "Health > Ayurvedic",
          subcategory: "Ayurvedic"
        },
        {
          name: "Leather Travel Passport Holder",
          about: "Sleek, secure, and RFID-protected travel passport wallet.",
          price: 799,
          image: "https://images.pexels.com/photos/12825965/pexels-photo-12825965.jpeg?auto=compress&cs=tinysrgb&w=400",
          category: "Travel > PassportHolders",
          subcategory: "PassportHolders"
        },
        {
          name: "Bose Travel Duffel Bag",
          about: "Spacious duffel with padded straps and durable build.",
          price: 2899,
          image: "https://images.pexels.com/photos/245240/pexels-photo-245240.jpeg?auto=compress&cs=tinysrgb&w=400",
          category: "Travel > DuffelBags",
          subcategory: "DuffelBags"
        },
        {
          name: "Omron Blood Pressure Monitor",
          about: "Accurate and easy-to-use digital blood pressure monitor.",
          price: 2199,
          image: "https://images.pexels.com/photos/8442271/pexels-photo-8442271.jpeg?auto=compress&cs=tinysrgb&w=400",
          category: "Health > HealthMonitors",
          subcategory: "HealthMonitors"
        },
        {
          name: "Quechua Waterproof Backpack 30L",
          about: "Lightweight, durable backpack for hiking and daily use.",
          price: 1599,
          image: "https://images.pexels.com/photos/1911850/pexels-photo-1911850.jpeg?auto=compress&cs=tinysrgb&w=400",
          category: "Travel > Backpacks",
          subcategory: "Backpacks"
        },
        {
          name: "First Aid Medical Kit",
          about: "Compact kit including essentials like bandages, antiseptic, and scissors.",
          price: 499,
          image: "https://images.pexels.com/photos/1148483/pexels-photo-1148483.jpeg?auto=compress&cs=tinysrgb&w=400",
          category: "Health > FirstAid",
          subcategory: "FirstAid"
        },
        {
          name: "F Gear Hard Shell Cabin Luggage",
          about: "Sturdy cabin-sized luggage for short business trips.",
          price: 3699,
          image: "https://images.pexels.com/photos/3061006/pexels-photo-3061006.jpeg?auto=compress&cs=tinysrgb&w=400",
          category: "Travel > Luggage",
          subcategory: "Luggage"
        },
        {
          name: "Reusable N95 Face Masks (Pack of 5)",
          about: "Comfortable, breathable masks with 5-layer protection.",
          price: 599,
          image: "https://images.pexels.com/photos/3957985/pexels-photo-3957985.jpeg?auto=compress&cs=tinysrgb&w=400",
          category: "Health > Masks",
          subcategory: "Masks"
        },
        {
          name: "Noise Smart Health Band",
          about: "Fitness band with heart rate, SpO2, and sleep tracking.",
          price: 1899,
          image: "https://images.pexels.com/photos/4047021/pexels-photo-4047021.jpeg?auto=compress&cs=tinysrgb&w=400",
          category: "Health > MedicalDevices",
          subcategory: "MedicalDevices"
        },
        {
          name: "Neck Pillow & Eye Mask Travel Set",
          about: "Comfortable memory foam pillow and eye mask combo for long journeys.",
          price: 799,
          image: "https://images.pexels.com/photos/291224/pexels-photo-291224.jpeg?auto=compress&cs=tinysrgb&w=400",
          category: "Travel > TravelAccessories",
          subcategory: "TravelAccessories"
        },
        {
          name: "MuscleBlaze Whey Protein 1kg",
          about: "High-quality protein supplement for muscle recovery and strength.",
          price: 1999,
          image: "https://images.pexels.com/photos/4669282/pexels-photo-4669282.jpeg?auto=compress&cs=tinysrgb&w=400",
          category: "Health > Supplements",
          subcategory: "Supplements"
        },
          {
            name: "Fresh Red Apples (1kg)",
            about: "Crisp and juicy red apples, directly sourced from organic farms.",
            price: 149,
            image: "https://images.pexels.com/photos/594590/pexels-photo-594590.jpeg?auto=compress&cs=tinysrgb&w=400",
            category: "Grocery > FruitsAndVegetables",
            subcategory: "FruitsAndVegetables"
          },
          {
            name: "Nivia Storm Football",
            about: "Durable rubberized football for everyday training and matches.",
            price: 699,
            image: "https://images.pexels.com/photos/47730/the-ball-the-football-the-pitch-47730.jpeg?auto=compress&cs=tinysrgb&w=400",
            category: "Sports > Football",
            subcategory: "Football"
          },
          {
            name: "Brown Basmati Rice (5kg)",
            about: "Premium quality whole grain basmati rice, rich in fiber.",
            price: 429,
            image: "https://images.pexels.com/photos/4110252/pexels-photo-4110252.jpeg?auto=compress&cs=tinysrgb&w=400",
            category: "Grocery > Staples",
            subcategory: "Staples"
          },
          {
            name: "Protein-Rich Trail Mix",
            about: "Healthy mix of nuts, seeds, and dried fruits for instant energy.",
            price: 299,
            image: "https://images.pexels.com/photos/5946599/pexels-photo-5946599.jpeg?auto=compress&cs=tinysrgb&w=400",
            category: "Grocery > Snacks",
            subcategory: "Snacks"
          },
          {
            name: "Wilson Indoor Table Tennis Set",
            about: "Complete set of 2 paddles, 3 balls, and net for home fun.",
            price: 1049,
            image: "https://images.pexels.com/photos/5583734/pexels-photo-5583734.jpeg?auto=compress&cs=tinysrgb&w=400",
            category: "Sports > IndoorGames",
            subcategory: "IndoorGames"
          },
          {
            name: "Amul Full Cream Milk (1L)",
            about: "Pure and fresh full cream milk, rich in calcium and protein.",
            price: 65,
            image: "https://images.pexels.com/photos/533360/pexels-photo-533360.jpeg?auto=compress&cs=tinysrgb&w=400",
            category: "Grocery > Dairy",
            subcategory: "Dairy"
          },
          {
            name: "Cricket Bat English Willow",
            about: "Grade 1 willow bat for advanced leather-ball matches.",
            price: 4599,
            image: "https://images.pexels.com/photos/167540/pexels-photo-167540.jpeg?auto=compress&cs=tinysrgb&w=400",
            category: "Sports > Cricket",
            subcategory: "Cricket"
          },
          {
            name: "Herbal Green Tea Bags (100)",
            about: "Refreshing and antioxidant-rich herbal green tea.",
            price: 249,
            image: "https://images.pexels.com/photos/1417945/pexels-photo-1417945.jpeg?auto=compress&cs=tinysrgb&w=400",
            category: "Grocery > Beverages",
            subcategory: "Beverages"
          },
          {
            name: "Domyos Adjustable Dumbbells (Pair)",
            about: "Compact fitness gear ideal for strength and endurance training.",
            price: 1899,
            image: "https://images.pexels.com/photos/4167544/pexels-photo-4167544.jpeg?auto=compress&cs=tinysrgb&w=400",
            category: "Sports > FitnessGear",
            subcategory: "FitnessGear"
          },
          {
            name: "Firefox Mountain Bike 21-Speed",
            about: "All-terrain cycle with dual suspension for outdoor adventures.",
            price: 13499,
            image: "https://images.pexels.com/photos/276517/pexels-photo-276517.jpeg?auto=compress&cs=tinysrgb&w=400",
            category: "Sports > Cycling",
            subcategory: "Cycling"
          },
          {
            name: "Organic Tur Dal (1kg)",
            about: "Unpolished organic tur dal rich in protein and fiber.",
            price: 149,
            image: "https://images.pexels.com/photos/1435907/pexels-photo-1435907.jpeg?auto=compress&cs=tinysrgb&w=400",
            category: "Grocery > Staples",
            subcategory: "Staples"
          },
          {
            name: "Whole Wheat Flour (5kg)",
            about: "Stone-ground whole wheat flour for soft chapatis and rotis.",
            price: 259,
            image: "https://images.pexels.com/photos/4194858/pexels-photo-4194858.jpeg?auto=compress&cs=tinysrgb&w=400",
            category: "Grocery > Staples",
            subcategory: "Staples"
          },
          {
            name: "Tropicana Orange Juice (1L)",
            about: "Refreshing 100% orange juice with no added sugar.",
            price: 110,
            image: "https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=400",
            category: "Grocery > Beverages",
            subcategory: "Beverages"
          },
          {
            name: "Cold Brew Coffee Bottle",
            about: "Smooth and bold ready-to-drink cold brew coffee.",
            price: 130,
            image: "https://images.pexels.com/photos/374885/pexels-photo-374885.jpeg?auto=compress&cs=tinysrgb&w=400",
            category: "Grocery > Beverages",
            subcategory: "Beverages"
          },
          {
            name: "Salted Potato Chips",
            about: "Crispy golden potato chips with classic salted flavor.",
            price: 45,
            image: "https://images.pexels.com/photos/4794554/pexels-photo-4794554.jpeg?auto=compress&cs=tinysrgb&w=400",
            category: "Grocery > Snacks",
            subcategory: "Snacks"
          },
          {
            name: "Multigrain Protein Bars",
            about: "Nutritious and tasty snack bars packed with oats and seeds.",
            price: 299,
            image: "https://images.pexels.com/photos/5409025/pexels-photo-5409025.jpeg?auto=compress&cs=tinysrgb&w=400",
            category: "Grocery > Snacks",
            subcategory: "Snacks"
          },
          {
            name: "Greek Yogurt – Mixed Berry",
            about: "Creamy and protein-rich yogurt with natural berry flavor.",
            price: 75,
            image: "https://images.pexels.com/photos/9061435/pexels-photo-9061435.jpeg?auto=compress&cs=tinysrgb&w=400",
            category: "Grocery > Dairy",
            subcategory: "Dairy"
          },
          {
            name: "Processed Cheese Cubes (200g)",
            about: "Soft and creamy cheese cubes perfect for snacking or cooking.",
            price: 95,
            image: "https://images.pexels.com/photos/5202347/pexels-photo-5202347.jpeg?auto=compress&cs=tinysrgb&w=400",
            category: "Grocery > Dairy",
            subcategory: "Dairy"
          },
          {
            name: "Fresh Organic Carrots (500g)",
            about: "Crunchy carrots, organically grown and pesticide-free.",
            price: 59,
            image: "https://images.pexels.com/photos/4198023/pexels-photo-4198023.jpeg?auto=compress&cs=tinysrgb&w=400",
            category: "Grocery > FruitsAndVegetables",
            subcategory: "FruitsAndVegetables"
          },
          {
            name: "Banana (1 dozen)",
            about: "Ripe yellow bananas full of natural energy and potassium.",
            price: 79,
            image: "https://images.pexels.com/photos/41957/bananas-fruits-food-healthy-41957.jpeg?auto=compress&cs=tinysrgb&w=400",
            category: "Grocery > FruitsAndVegetables",
            subcategory: "FruitsAndVegetables"
          },
          {
            name: "Yoga Mat with Carry Strap",
            about: "Non-slip yoga mat with extra cushioning for comfort.",
            price: 899,
            image: "https://images.pexels.com/photos/3823087/pexels-photo-3823087.jpeg?auto=compress&cs=tinysrgb&w=400",
            category: "Sports > FitnessGear",
            subcategory: "FitnessGear"
          },
          {
            name: "Adjustable Resistance Bands Set",
            about: "Full-body workout bands with varying resistance levels.",
            price: 699,
            image: "https://images.pexels.com/photos/6551045/pexels-photo-6551045.jpeg?auto=compress&cs=tinysrgb&w=400",
            category: "Sports > FitnessGear",
            subcategory: "FitnessGear"
          },
          {
            name: "Kookaburra Batting Gloves",
            about: "Lightweight gloves with padded palms for protection.",
            price: 799,
            image: "https://images.pexels.com/photos/5465116/pexels-photo-5465116.jpeg?auto=compress&cs=tinysrgb&w=400",
            category: "Sports > Cricket",
            subcategory: "Cricket"
          },
          {
            name: "Cosco Cricket Ball (Leather)",
            about: "Durable red leather cricket ball for match play.",
            price: 399,
            image: "https://images.pexels.com/photos/160846/cricket-ball-red-sports-160846.jpeg?auto=compress&cs=tinysrgb&w=400",
            category: "Sports > Cricket",
            subcategory: "Cricket"
          },
          {
            name: "Nike Football Jersey",
            about: "Breathable jersey with moisture-wicking fabric for match day.",
            price: 1199,
            image: "https://images.pexels.com/photos/1587929/pexels-photo-1587929.jpeg?auto=compress&cs=tinysrgb&w=400",
            category: "Sports > Football",
            subcategory: "Football"
          },
          {
            name: "Adidas Soccer Shin Guards",
            about: "Protective guards with strap-on fit for all-age players.",
            price: 349,
            image: "https://images.pexels.com/photos/98863/pexels-photo-98863.jpeg?auto=compress&cs=tinysrgb&w=400",
            category: "Sports > Football",
            subcategory: "Football"
          },
          {
            name: "Cycling Helmet with Rear Light",
            about: "Safety-certified helmet with adjustable straps and rear LED.",
            price: 1099,
            image: "https://images.pexels.com/photos/276517/pexels-photo-276517.jpeg?auto=compress&cs=tinysrgb&w=400",
            category: "Sports > Cycling",
            subcategory: "Cycling"
          },
          {
            name: "Bike Repair Tool Kit",
            about: "Compact kit with essential tools for basic cycle maintenance.",
            price: 549,
            image: "https://images.pexels.com/photos/4778626/pexels-photo-4778626.jpeg?auto=compress&cs=tinysrgb&w=400",
            category: "Sports > Cycling",
            subcategory: "Cycling"
          },
          {
            name: "Wooden Chess Board Set",
            about: "Foldable chessboard with polished wooden pieces.",
            price: 999,
            image: "https://images.pexels.com/photos/6947402/pexels-photo-6947402.jpeg?auto=compress&cs=tinysrgb&w=400",
            category: "Sports > IndoorGames",
            subcategory: "IndoorGames"
          },
          {
            name: "Carrom Board Full Set",
            about: "Carrom board with coins, striker, and powder for indoor fun.",
            price: 1499,
            image: "https://images.pexels.com/photos/6177617/pexels-photo-6177617.jpeg?auto=compress&cs=tinysrgb&w=400",
            category: "Sports > IndoorGames",
            subcategory: "IndoorGames"
          }
    

  
];

module.exports = { data: sampleProducts };