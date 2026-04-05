// ShopEase - Products Data (Bangladesh Market)
const products = [
    // Electronics
    {
        id: 1,
        name: "Samsung Galaxy S24 Ultra",
        category: 1,
        price: 159999,
        originalPrice: 174999,
        discount: 9,
        rating: 4.8,
        reviewCount: 234,
        stock: 15,
        featured: true,
        description: "Samsung Galaxy S24 Ultra with 200MP camera, S Pen included, 6.8 inch Dynamic AMOLED display, and Galaxy AI features. Experience the ultimate smartphone with titanium frame and built-in S Pen.",
        images: [
            "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=600",
            "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600",
            "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600",
            "https://images.unsplash.com/photo-1605236453806-6ff36851218e?w=600"
        ],
        specs: {
            "Display": "6.8 inch Dynamic AMOLED 2X",
            "Processor": "Snapdragon 8 Gen 3",
            "RAM": "12GB",
            "Storage": "256GB",
            "Camera": "200MP + 50MP + 12MP + 10MP",
            "Battery": "5000mAh"
        }
    },
    {
        id: 2,
        name: "Xiaomi Redmi Note 13 Pro",
        category: 1,
        price: 32999,
        originalPrice: 35999,
        discount: 8,
        rating: 4.5,
        reviewCount: 567,
        stock: 45,
        featured: true,
        description: "Xiaomi Redmi Note 13 Pro with 200MP camera, 6.67 inch AMOLED display, 5100mAh battery with 67W turbo charging. Perfect balance of performance and value.",
        images: [
            "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600",
            "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600",
            "https://images.unsplash.com/photo-1605236453806-6ff36851218e?w=600",
            "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=600"
        ],
        specs: {
            "Display": "6.67 inch AMOLED",
            "Processor": "Snapdragon 7s Gen 2",
            "RAM": "8GB",
            "Storage": "256GB",
            "Camera": "200MP + 8MP + 2MP",
            "Battery": "5100mAh"
        }
    },
    {
        id: 3,
        name: "Sony WH-1000XM5 Headphones",
        category: 1,
        price: 34999,
        originalPrice: 39999,
        discount: 13,
        rating: 4.9,
        reviewCount: 892,
        stock: 22,
        featured: true,
        description: "Industry-leading noise cancellation with Auto NC Optimizer. Crystal clear hands-free calling and 30-hour battery life. Premium sound quality with Hi-Res Audio.",
        images: [
            "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600",
            "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600",
            "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600",
            "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=600"
        ],
        specs: {
            "Type": "Over-ear Wireless",
            "Driver": "30mm",
            "Frequency": "4Hz-40kHz",
            "Battery": "30 hours",
            "Weight": "250g",
            "Features": "ANC, Multipoint"
        }
    },
    {
        id: 4,
        name: " Walton LED Smart TV 43 inch",
        category: 1,
        price: 38999,
        originalPrice: 42999,
        discount: 9,
        rating: 4.3,
        reviewCount: 156,
        stock: 18,
        featured: false,
        description: "Walton 43 inch Full HD Smart TV with Android OS, WiFi connectivity, and pre-installed streaming apps. Made in Bangladesh with 3-year warranty.",
        images: [
            "https://images.unsplash.com/photo-1461151304267-38535e780c79?w=600",
            "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=600",
            "https://images.unsplash.com/photo-1578643463396-0997cb5328c1?w=600",
            "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=600"
        ],
        specs: {
            "Display": "43 inch Full HD LED",
            "Resolution": "1920x1080",
            "OS": "Android 11",
            "HDMI": "3 Ports",
            "USB": "2 Ports",
            "Warranty": "3 Years"
        }
    },

    // Fashion
    {
        id: 5,
        name: "Premium Cotton Polo T-Shirt",
        category: 2,
        price: 1299,
        originalPrice: 1599,
        discount: 19,
        rating: 4.4,
        reviewCount: 324,
        stock: 120,
        featured: true,
        description: "100% premium cotton polo t-shirt with comfortable fit. Perfect for both casual and semi-formal occasions. Available in multiple colors.",
        images: [
            "https://images.unsplash.com/photo-1625910513413-5fc4e5e40687?w=600",
            "https://images.unsplash.com/photo-1625910513413-5fc4e5e40687?w=600",
            "https://images.unsplash.com/photo-1625910513413-5fc4e5e40687?w=600",
            "https://images.unsplash.com/photo-1625910513413-5fc4e5e40687?w=600"
        ],
        specs: {
            "Material": "100% Cotton Pique",
            "Fit": "Regular",
            "Neck": "Polo Collar",
            "Sleeve": "Short Sleeve",
            "Care": "Machine Washable",
            "Origin": "Bangladesh"
        }
    },
    {
        id: 6,
        name: "Designer Winter Hoodie",
        category: 2,
        price: 2499,
        originalPrice: 3299,
        discount: 24,
        rating: 4.6,
        reviewCount: 189,
        stock: 65,
        featured: true,
        description: "Warm and stylish winter hoodie with soft fleece inner lining. Features kangaroo pocket and adjustable hood. Perfect for cold weather.",
        images: [
            "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600",
            "https://images.unsplash.com/photo-1578768079052-aa76e52ff62e?w=600",
            "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600",
            "https://images.unsplash.com/photo-1509942774463-acf339cf87d5?w=600"
        ],
        specs: {
            "Material": "80% Cotton, 20% Polyester",
            "Inner": "Fleece Lining",
            "Fit": "Relaxed",
            "Pockets": "Kangaroo",
            "Hood": "Adjustable",
            "Care": "Machine Washable"
        }
    },
    {
        id: 7,
        name: "Men's Formal Shirt - White",
        category: 2,
        price: 1599,
        originalPrice: 1999,
        discount: 20,
        rating: 4.5,
        reviewCount: 445,
        stock: 85,
        featured: false,
        description: "Classic white formal shirt for men with premium cotton fabric. Wrinkle-free material, perfect for office wear. Tailored fit.",
        images: [
            "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600",
            "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=600",
            "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600",
            "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=600"
        ],
        specs: {
            "Material": "100% Cotton",
            "Fit": "Tailored",
            "Collar": "Classic",
            "Pattern": "Solid White",
            "Cuff": "Button",
            "Care": "Easy Iron"
        }
    },
    {
        id: 8,
        name: "Women's Cotton Salwar Kameez",
        category: 2,
        price: 3299,
        originalPrice: 3999,
        discount: 18,
        rating: 4.7,
        reviewCount: 267,
        stock: 42,
        featured: true,
        description: "Beautiful cotton salwar kameez with embroidered work. Comfortable for all-day wear. Perfect for festive occasions and daily use.",
        images: [
            "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600",
            "https://images.unsplash.com/photo-1590548784585-643d2b9f2925?w=600",
            "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600",
            "https://images.unsplash.com/photo-1590548784585-643d2b9f2925?w=600"
        ],
        specs: {
            "Material": "Premium Cotton",
            "Work": "Embroidery",
            "Dupatta": "Included",
            "Size": "M-XXL",
            "Occasion": "Festive/Daily",
            "Care": "Hand Wash"
        }
    },

    // Groceries
    {
        id: 9,
        name: "BR28 Premium Rice - 25kg",
        category: 3,
        price: 2450,
        originalPrice: 2650,
        discount: 8,
        rating: 4.6,
        reviewCount: 892,
        stock: 150,
        featured: true,
        description: "Premium quality BR28 aromatic rice from Bangladesh. Long grain, non-sticky, perfect for biryani and polao. Clean and husked.",
        images: [
            "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600",
            "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=600",
            "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600",
            "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=600"
        ],
        specs: {
            "Type": "BR28 Aromatic",
            "Weight": "25 kg",
            "Grade": "Premium",
            "Origin": "Bangladesh",
            "Shelf Life": "12 Months",
            "Storage": "Cool Dry Place"
        }
    },
    {
        id: 10,
        name: "Fortune Cooking Oil - 5L",
        category: 3,
        price: 899,
        originalPrice: 999,
        discount: 10,
        rating: 4.5,
        reviewCount: 567,
        stock: 200,
        featured: false,
        description: "Fortune sunflower cooking oil, rich in Vitamin E. Light and healthy for everyday cooking. Trans fat free and cholesterol free.",
        images: [
            "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=600",
            "https://images.unsplash.com/photo-1591456983933-0c126ce7b8df?w=600",
            "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=600",
            "https://images.unsplash.com/photo-1591456983933-0c126ce7b8df?w=600"
        ],
        specs: {
            "Type": "Sunflower Oil",
            "Volume": "5 Liters",
            "Vitamin": "Rich in Vitamin E",
            "Feature": "Trans Fat Free",
            "Shelf Life": "18 Months",
            "Origin": "India"
        }
    },
    {
        id: 11,
        name: "Molla Premium Atta - 10kg",
        category: 3,
        price: 580,
        originalPrice: 620,
        discount: 6,
        rating: 4.4,
        reviewCount: 345,
        stock: 180,
        featured: false,
        description: "Freshly ground whole wheat atta for soft rotis and parathas. Stone ground for authentic taste. Made from select wheat grains.",
        images: [
            "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600",
            "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600",
            "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600",
            "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600"
        ],
        specs: {
            "Type": "Whole Wheat Atta",
            "Weight": "10 kg",
            "Process": "Stone Ground",
            "Use": "Roti, Paratha, Naan",
            "Shelf Life": "6 Months",
            "Origin": "Bangladesh"
        }
    },
    {
        id: 12,
        name: "Pran Masala Tea - 400g",
        category: 3,
        price: 320,
        originalPrice: 350,
        discount: 9,
        rating: 4.7,
        reviewCount: 678,
        stock: 250,
        featured: true,
        description: "Premium blended masala tea with aromatic spices. Perfect for making authentic Bangladeshi chai. Rich flavor and fragrance.",
        images: [
            "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600",
            "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=600",
            "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600",
            "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=600"
        ],
        specs: {
            "Type": "Masala Tea Blend",
            "Weight": "400g",
            "Ingredients": "Tea, Cardamom, Ginger, Cloves",
            "Flavor": "Aromatic Spicy",
            "Cups": "Approx 200 cups",
            "Origin": "Bangladesh"
        }
    },

    // Home & Living
    {
        id: 13,
        name: "Cotton Bed Sheet Set - Double",
        category: 4,
        price: 2499,
        originalPrice: 2999,
        discount: 17,
        rating: 4.6,
        reviewCount: 234,
        stock: 55,
        featured: true,
        description: "Premium quality 100% cotton bed sheet set. Includes 1 fitted sheet, 1 flat sheet, and 2 pillow covers. Soft and comfortable for peaceful sleep.",
        images: [
            "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600",
            "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=600",
            "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600",
            "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=600"
        ],
        specs: {
            "Material": "100% Cotton",
            "Thread Count": "200 TC",
            "Size": "Double (6x7 ft)",
            "Contents": "1 Fitted + 1 Flat + 2 Pillow Covers",
            "Wash": "Machine Washable",
            "Colors": "Multiple"
        }
    },
    {
        id: 14,
        name: "Plastic Storage Cabinet - 4 Layer",
        category: 4,
        price: 3499,
        originalPrice: 3999,
        discount: 13,
        rating: 4.3,
        reviewCount: 145,
        stock: 35,
        featured: false,
        description: "Durable plastic storage cabinet with 4 layers. Perfect for organizing clothes, kitchen items, and other household items. Easy to assemble.",
        images: [
            "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600",
            "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600",
            "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=600",
            "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=600"
        ],
        specs: {
            "Material": "PP Plastic",
            "Layers": "4 Shelves",
            "Height": "120cm",
            "Load": "30kg per shelf",
            "Assembly": "Tool-free",
            "Color": "White/Gray"
        }
    },
    {
        id: 15,
        name: "LED Desk Lamp with USB Port",
        category: 4,
        price: 1299,
        originalPrice: 1699,
        discount: 24,
        rating: 4.5,
        reviewCount: 198,
        stock: 68,
        featured: true,
        description: "Modern LED desk lamp with adjustable brightness and color temperature. Built-in USB charging port. Perfect for study and work.",
        images: [
            "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600",
            "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600",
            "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600",
            "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600"
        ],
        specs: {
            "Type": "LED Desk Lamp",
            "Power": "12W",
            "Brightness": "3 Level Adjustable",
            "Color Temp": "Warm to Cool",
            "USB": "Built-in Charging Port",
            "Material": "Aluminum + ABS"
        }
    },

    // Beauty
    {
        id: 16,
        name: "Garnier Vitamin C Face Serum",
        category: 5,
        price: 899,
        originalPrice: 1099,
        discount: 18,
        rating: 4.6,
        reviewCount: 456,
        stock: 95,
        featured: true,
        description: "Garnier Skin Active Vitamin C serum with 10% pure Vitamin C. Brightens skin and reduces dark spots. Suitable for all skin types.",
        images: [
            "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600",
            "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600",
            "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600",
            "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600"
        ],
        specs: {
            "Product": "Face Serum",
            "Volume": "30ml",
            "Key Ingredient": "10% Pure Vitamin C",
            "Benefits": "Brightening, Anti-dark spots",
            "Skin Type": "All Types",
            "Use": "Daily AM/PM"
        }
    },
    {
        id: 17,
        name: "L'Oreal Paris Shampoo - 340ml",
        category: 5,
        price: 549,
        originalPrice: 649,
        discount: 15,
        rating: 4.4,
        reviewCount: 678,
        stock: 120,
        featured: false,
        description: "L'Oreal Paris Total Repair 5 Shampoo for damaged hair. Repairs 5 signs of hair damage. Strengthens and nourishes hair.",
        images: [
            "https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?w=600",
            "https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?w=600",
            "https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?w=600",
            "https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?w=600"
        ],
        specs: {
            "Product": "Hair Shampoo",
            "Volume": "340ml",
            "Range": "Total Repair 5",
            "Benefits": "Repairs 5 damage signs",
            "Hair Type": "Damaged Hair",
            "Use": "Regular"
        }
    },
    {
        id: 18,
        name: "Maybelline Matte Lipstick - Red",
        category: 5,
        price: 699,
        originalPrice: 799,
        discount: 13,
        rating: 4.7,
        reviewCount: 345,
        stock: 75,
        featured: true,
        description: "Maybelline Super Stay Matte Ink lipstick. Long lasting 16-hour formula. Comfortable matte finish that doesn't dry lips.",
        images: [
            "https://images.unsplash.com/photo-1586495777744-4e6232bf2196?w=600",
            "https://images.unsplash.com/photo-1586495777744-4e6232bf2196?w=600",
            "https://images.unsplash.com/photo-1586495777744-4e6232bf2196?w=600",
            "https://images.unsplash.com/photo-1586495777744-4e6232bf2196?w=600"
        ],
        specs: {
            "Product": "Lipstick",
            "Type": "Matte Ink",
            "Shade": "Red",
            "Finish": "Matte",
            "Duration": "16 Hours",
            "Feature": "Transfer Proof"
        }
    },

    // Sports
    {
        id: 19,
        name: "Adidas Football - Size 5",
        category: 6,
        price: 2499,
        originalPrice: 2999,
        discount: 17,
        rating: 4.8,
        reviewCount: 234,
        stock: 45,
        featured: true,
        description: "Official size 5 training football from Adidas. Durable construction with seamless surface for better ball control. Perfect for practice and matches.",
        images: [
            "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=600",
            "https://images.unsplash.com/photo-1600185389846-f4271f3a1161?w=600",
            "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600",
            "https://images.unsplash.com/photo-1608346128025-1896b97a6fa7?w=600"
        ],
        specs: {
            "Type": "Training Football",
            "Size": "5 (Official)",
            "Material": "PU Leather",
            "Circumference": "68-70cm",
            "Weight": "410-450g",
            "Usage": "Training/Match"
        }
    },
    {
        id: 20,
        name: "Adjustable Dumbbell Set - 20kg",
        category: 6,
        price: 8999,
        originalPrice: 10999,
        discount: 18,
        rating: 4.5,
        reviewCount: 167,
        stock: 25,
        featured: true,
        description: "Space-saving adjustable dumbbell set. Weight range 2.5kg to 20kg. Perfect for home gym workouts. Quick change weight system.",
        images: [
            "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600",
            "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600",
            "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600",
            "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600"
        ],
        specs: {
            "Type": "Adjustable Dumbbells",
            "Total Weight": "20kg (Pair)",
            "Range": "2.5kg - 20kg",
            "Material": "Steel + Plastic",
            "System": "Quick Lock",
            "Usage": "Home Gym"
        }
    },
    {
        id: 21,
        name: "Yoga Mat with Carrying Strap",
        category: 6,
        price: 1299,
        originalPrice: 1599,
        discount: 19,
        rating: 4.4,
        reviewCount: 289,
        stock: 68,
        featured: false,
        description: "Non-slip yoga mat with thick cushioning. Includes carrying strap for easy transport. Perfect for yoga, pilates, and floor exercises.",
        images: [
            "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=600",
            "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=600",
            "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=600",
            "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=600"
        ],
        specs: {
            "Type": "Yoga Mat",
            "Thickness": "6mm",
            "Material": "NBR Foam",
            "Size": "183cm x 61cm",
            "Feature": "Non-slip, Anti-tear",
            "Accessory": "Carrying Strap"
        }
    },

    // Additional Electronics
    {
        id: 22,
        name: "JBL Tune 230NC Earbuds",
        category: 1,
        price: 5999,
        originalPrice: 6999,
        discount: 14,
        rating: 4.5,
        reviewCount: 345,
        stock: 55,
        featured: false,
        description: "JBL Tune 230NC True Wireless earbuds with Active Noise Cancellation. 40 hours total playtime with case. Water resistant design.",
        images: [
            "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600",
            "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600",
            "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600",
            "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600"
        ],
        specs: {
            "Type": "True Wireless Earbuds",
            "Driver": "11mm",
            "Battery": "40 Hours (with case)",
            "ANC": "Yes",
            "Water Resistance": "IPX4",
            "Bluetooth": "5.2"
        }
    },
    {
        id: 23,
        name: "Baseus Power Bank 20000mAh",
        category: 1,
        price: 2499,
        originalPrice: 2999,
        discount: 17,
        rating: 4.6,
        reviewCount: 456,
        stock: 80,
        featured: false,
        description: "Baseus 20000mAh power bank with fast charging support. Dual USB-C and USB-A ports. LED display shows remaining battery.",
        images: [
            "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=600",
            "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=600",
            "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=600",
            "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=600"
        ],
        specs: {
            "Capacity": "20000mAh",
            "Output": "22.5W Fast Charge",
            "Ports": "2x USB-C, 2x USB-A",
            "Input": "18W Fast Charge",
            "Display": "LED Battery Indicator",
            "Safety": "Multi-protection"
        }
    },
    {
        id: 24,
        name: "Logitech Wireless Mouse",
        category: 1,
        price: 1599,
        originalPrice: 1999,
        discount: 20,
        rating: 4.7,
        reviewCount: 678,
        stock: 95,
        featured: false,
        description: "Logitech B330 Silent Plus wireless mouse. Silent clicks, 24-month battery life. Ergonomic design for comfortable use.",
        images: [
            "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600",
            "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600",
            "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600",
            "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600"
        ],
        specs: {
            "Type": "Wireless Mouse",
            "Connectivity": "2.4GHz Wireless",
            "DPI": "1000",
            "Battery": "24 Months (AA)",
            "Silent": "Yes",
            "Ergonomic": "Yes"
        }
    }
];

function getProductById(id) {
    return products.find(p => p.id === parseInt(id));
}

function getProductsByCategory(categoryId) {
    return products.filter(p => p.category === parseInt(categoryId));
}

function getFeaturedProducts() {
    return products.filter(p => p.featured);
}

function searchProducts(query) {
    const searchTerm = query.toLowerCase();
    return products.filter(p => 
        p.name.toLowerCase().includes(searchTerm) ||
        p.description.toLowerCase().includes(searchTerm) ||
        getCategoryName(p.category).toLowerCase().includes(searchTerm)
    );
}

function formatPrice(price) {
    return '৳' + price.toLocaleString('en-BD');
}

function calculateDiscountedPrice(price, discount) {
    return price - (price * discount / 100);
}
