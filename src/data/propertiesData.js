// Complete property data for all Mumbai locations - Owner: Vishnu
// This file contains 200+ properties across 8 Mumbai locations

export const mumbaiLocations = [
  "Sion", "Matunga", "Ghatkopar", "Dharavi", "GTB Nagar", 
  "King Circle", "Kurla", "Andheri"
];

// Helper function to generate property data
const generateProperties = () => {
  const properties = [];
  let id = 1;
  
  const locations = mumbaiLocations;
  // const propertyTypes = ["Flat", "Independent Home", "Villa"];
  // const categories = ["Rent", "Sale"];
  
  // Different Indian property owners
  const ownerNames = [
    "Rajesh Kumar", "Priya Sharma", "Amit Patel", "Sneha Desai", "Vikram Singh",
    "Deepak Mehta", "Kavita Joshi", "Rahul Verma", "Anjali Nair", "Suresh Reddy",
    "Pooja Gupta", "Manish Tiwari", "Neha Kapoor", "Arun Kumar", "Ritu Singh",
    "Sanjay Patil", "Meera Iyer", "Karan Malhotra", "Divya Rao", "Prakash Jain",
    "Rohan Shah", "Simran Kaur", "Arjun Reddy", "Priyanka Das", "Varun Khanna"
  ];
  
  const reviewNames = [
    "Rajesh Kumar", "Priya Sharma", "Amit Patel", "Sneha Desai", "Vikram Singh",
    "Deepak Mehta", "Kavita Joshi", "Rahul Verma", "Anjali Nair", "Suresh Reddy",
    "Pooja Gupta", "Manish Tiwari", "Neha Kapoor", "Arun Kumar", "Ritu Singh",
    "Sanjay Patil", "Meera Iyer", "Karan Malhotra", "Divya Rao", "Prakash Jain"
  ];
  
  const reviewComments = [
    "Excellent property! Very well maintained and great location.",
    "Good flat, owner is very cooperative. Highly recommended.",
    "Nice place to live, peaceful neighborhood.",
    "Great amenities and connectivity. Worth the price.",
    "Loved the spacious rooms and natural lighting.",
    "Outstanding property! Worth every penny.",
    "Beautiful interiors and excellent build quality.",
    "Great investment opportunity in prime location.",
    "Spacious and well-designed. Highly satisfied.",
    "Premium amenities and great connectivity."
  ];
  
  const flatImages = [
    "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800",
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800",
    "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800",
    "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800",
    "https://images.unsplash.com/photo-1556912173-46c336c7fd55?w=800",
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800"
  ];
  
  const houseImages = [
    "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800",
    "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800",
    "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
    "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=800",
    "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800"
  ];
  
  locations.forEach(location => {
    // 10 Flats per location (5 Rent + 5 Sale)
    for (let i = 0; i < 10; i++) {
      const category = i < 5 ? "Rent" : "Sale";
      const bedrooms = [1, 2, 2, 3, 3][i % 5];
      const area = bedrooms === 1 ? 450 + Math.random() * 200 : 
                   bedrooms === 2 ? 750 + Math.random() * 300 : 
                   1100 + Math.random() * 400;
      const price = category === "Rent" ? 
                    (bedrooms * 12000 + Math.random() * 10000) :
                    (bedrooms * 4000000 + Math.random() * 5000000);
      
      const reviews = [];
      for (let j = 0; j < 5; j++) {
        reviews.push({
          name: reviewNames[Math.floor(Math.random() * reviewNames.length)],
          comment: reviewComments[Math.floor(Math.random() * reviewComments.length)],
          rating: 4 + Math.random()
        });
      }
      
      properties.push({
        id: id++,
        title: `${["Cozy", "Spacious", "Modern", "Luxury", "Premium"][i % 5]} ${bedrooms}BHK Flat in ${location}`,
        type: "Flat",
        category,
        price: Math.round(price),
        location,
        area: Math.round(area),
        bedrooms,
        bathrooms: bedrooms,
        owner: ownerNames[Math.floor(Math.random() * ownerNames.length)],
        description: `Beautiful ${bedrooms}BHK flat with modern amenities in ${location}. ${category === "Rent" ? "Perfect for families and professionals." : "Great investment opportunity in prime location."}`,
        rating: 4 + Math.random() * 0.9,
        reviews,
        images: flatImages.slice(0, 5 + Math.floor(Math.random() * 3))
      });
    }
    
    // 10 Independent Homes per location (5 Rent + 5 Sale)
    for (let i = 0; i < 10; i++) {
      const category = i < 5 ? "Rent" : "Sale";
      const bedrooms = [2, 3, 3, 4, 4][i % 5];
      const area = bedrooms === 2 ? 1000 + Math.random() * 300 : 
                   bedrooms === 3 ? 1400 + Math.random() * 400 : 
                   2000 + Math.random() * 800;
      const price = category === "Rent" ? 
                    (bedrooms * 15000 + Math.random() * 15000) :
                    (bedrooms * 7000000 + Math.random() * 8000000);
      
      const reviews = [];
      for (let j = 0; j < 5; j++) {
        reviews.push({
          name: reviewNames[Math.floor(Math.random() * reviewNames.length)],
          comment: reviewComments[Math.floor(Math.random() * reviewComments.length)],
          rating: 4 + Math.random()
        });
      }
      
      properties.push({
        id: id++,
        title: `${["Beautiful", "Spacious", "Modern", "Traditional", "Elegant"][i % 5]} ${bedrooms}BHK Independent House in ${location}`,
        type: "Independent Home",
        category,
        price: Math.round(price),
        location,
        area: Math.round(area),
        bedrooms,
        bathrooms: bedrooms,
        owner: ownerNames[Math.floor(Math.random() * ownerNames.length)],
        description: `Charming ${bedrooms}BHK independent house with private garden and parking in ${location}. ${category === "Rent" ? "Ideal for families seeking privacy." : "Excellent property for investment."}`,
        rating: 4 + Math.random() * 0.9,
        reviews,
        images: houseImages.slice(0, 5 + Math.floor(Math.random() * 2))
      });
    }
    
    // 5 Villas per location (2 Rent + 3 Sale)
    for (let i = 0; i < 5; i++) {
      const category = i < 2 ? "Rent" : "Sale";
      const bedrooms = [3, 4, 4, 5, 5][i];
      const area = 2500 + Math.random() * 1000;
      const price = category === "Rent" ? 
                    (60000 + Math.random() * 40000) :
                    (25000000 + Math.random() * 20000000);
      
      const reviews = [];
      for (let j = 0; j < 5; j++) {
        reviews.push({
          name: reviewNames[Math.floor(Math.random() * reviewNames.length)],
          comment: reviewComments[Math.floor(Math.random() * reviewComments.length)],
          rating: 4.5 + Math.random() * 0.5
        });
      }
      
      properties.push({
        id: id++,
        title: `${["Luxury", "Premium", "Grand", "Elegant", "Stunning"][i]} ${bedrooms}BHK Villa in ${location}`,
        type: "Villa",
        category,
        price: Math.round(price),
        location,
        area: Math.round(area),
        bedrooms,
        bathrooms: bedrooms + 1,
        owner: ownerNames[Math.floor(Math.random() * ownerNames.length)],
        description: `Luxurious ${bedrooms}BHK villa with swimming pool, gym, and premium amenities in ${location}. ${category === "Rent" ? "Ultimate luxury living experience." : "Premium investment in exclusive location."}`,
        rating: 4.5 + Math.random() * 0.5,
        reviews,
        images: houseImages
      });
    }
  });
  
  return properties;
};

export const properties = generateProperties();

// Export location-specific properties
export const getPropertiesByLocation = (location) => {
  return properties.filter(p => p.location === location);
};

export const getPropertyById = (id) => {
  return properties.find(p => p.id === parseInt(id));
};

export const searchProperties = (filters) => {
  let filtered = properties;
  
  if (filters.location && filters.location !== "All") {
    filtered = filtered.filter(p => p.location === filters.location);
  }
  
  if (filters.category && filters.category !== "All") {
    filtered = filtered.filter(p => p.category === filters.category);
  }
  
  if (filters.type && filters.type !== "All") {
    filtered = filtered.filter(p => p.type === filters.type);
  }
  
  if (filters.minPrice) {
    filtered = filtered.filter(p => p.price >= parseInt(filters.minPrice));
  }
  
  if (filters.maxPrice) {
    filtered = filtered.filter(p => p.price <= parseInt(filters.maxPrice));
  }
  
  if (filters.bedrooms && filters.bedrooms !== "All") {
    filtered = filtered.filter(p => p.bedrooms === parseInt(filters.bedrooms));
  }
  
  return filtered;
};
