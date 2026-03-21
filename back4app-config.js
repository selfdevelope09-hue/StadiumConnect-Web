// Back4App Configuration
const APP_ID = "03ARQPIC6zbXUCCD5oEszq76YEtKsq9WmfZgO4xQ";
const CLIENT_KEY = "eC2bK2cMy3ELisYtnEIYXsO3qeyEH1m3X6vEh0ng";

// Initialize Parse
Parse.initialize(APP_ID, CLIENT_KEY);
Parse.serverURL = 'https://parseapi.back4app.com/';

// ========= VENDOR FUNCTIONS =========

// Save vendor to cloud
async function saveVendorToCloud(vendor) {
    const Vendor = Parse.Object.extend("Vendor");
    const newVendor = new Vendor();
    newVendor.set("name", vendor.name);
    newVendor.set("category", vendor.category);
    newVendor.set("city", vendor.city);
    newVendor.set("location", vendor.location);
    newVendor.set("experience", vendor.experience);
    newVendor.set("priceRange", vendor.priceRange);
    newVendor.set("phone", vendor.phone);
    newVendor.set("rating", vendor.rating);
    newVendor.set("description", vendor.description);
    newVendor.set("photos", vendor.photos || []);
    
    try {
        await newVendor.save();
        console.log("Vendor saved to cloud!");
        return true;
    } catch (error) {
        console.error("Error saving vendor:", error);
        return false;
    }
}

// Load all vendors from cloud
async function loadVendorsFromCloud() {
    const Vendor = Parse.Object.extend("Vendor");
    const query = new Parse.Query(Vendor);
    
    try {
        const results = await query.find();
        const vendors = {};
        
        results.forEach(result => {
            const category = result.get("category");
            const city = result.get("city");
            
            if (!vendors[category]) vendors[category] = {};
            if (!vendors[category][city]) vendors[category][city] = [];
            
            vendors[category][city].push({
                id: result.id,
                name: result.get("name"),
                category: category,
                city: city,
                location: result.get("location"),
                experience: result.get("experience"),
                priceRange: result.get("priceRange"),
                phone: result.get("phone"),
                rating: result.get("rating"),
                description: result.get("description"),
                photos: result.get("photos") || []
            });
        });
        
        return vendors;
    } catch (error) {
        console.error("Error loading vendors:", error);
        return {};
    }
}

// ========= BOOKING FUNCTIONS =========

// Save booking to cloud
async function saveBookingToCloud(booking) {
    const Booking = Parse.Object.extend("Booking");
    const newBooking = new Booking();
    newBooking.set("userId", booking.userId);
    newBooking.set("userName", booking.userName);
    newBooking.set("userPhone", booking.userPhone);
    newBooking.set("vendorId", booking.vendorId);
    newBooking.set("vendorName", booking.vendorName);
    newBooking.set("eventDate", booking.eventDate);
    newBooking.set("eventType", booking.eventType);
    newBooking.set("status", booking.status);
    newBooking.set("bookedAt", booking.bookedAt);
    
    try {
        await newBooking.save();
        return true;
    } catch (error) {
        console.error("Error saving booking:", error);
        return false;
    }
}

// Load bookings from cloud
async function loadBookingsFromCloud(userId) {
    const Booking = Parse.Object.extend("Booking");
    const query = new Parse.Query(Booking);
    if (userId) query.equalTo("userId", userId);
    
    try {
        const results = await query.find();
        return results.map(result => ({
            id: result.id,
            userId: result.get("userId"),
            userName: result.get("userName"),
            userPhone: result.get("userPhone"),
            vendorId: result.get("vendorId"),
            vendorName: result.get("vendorName"),
            eventDate: result.get("eventDate"),
            eventType: result.get("eventType"),
            status: result.get("status"),
            bookedAt: result.get("bookedAt")
        }));
    } catch (error) {
        console.error("Error loading bookings:", error);
        return [];
    }
}
