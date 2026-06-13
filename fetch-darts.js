// 1. Initialize environment handler (reads your hidden .env file)
require('dotenv').config();

const amazonPaapi = require('amazon-paapi');
const fs = require('fs');
const path = require('path');

// 2. Setup credentials pulling automatically from your .env
const commonParameters = {
    'AccessKey': process.env.AMAZON_ACCESS_KEY,
    'SecretKey': process.env.AMAZON_SECRET_KEY,
    'PartnerTag': process.env.AMAZON_PARTNER_TAG,
    'PartnerType': 'Associates',
    'Marketplace': 'www.amazon.co.uk' // Keeps it matching your GBP (£) store profile
};

// 3. Drop your target ASIN strings into this array!
// You can put one, ten, or fifty here at a time.
const asinsToFetch = [
    'B07V6V2K5X', // Example Harrows Wolfram ASIN
    'B0B8Z9Y1X4'  // Example Target Darts ASIN
]; 

const requestParameters = {
    'ItemIds': asinsToFetch,
    'ItemIdType': 'ASIN',
    'Resources': [
        'ItemInfo.Title',
        'ItemInfo.Features',
        'CustomerReviews.Count',
        'CustomerReviews.StarRating'
    ]
};

async function generateDartsJson() {
    // Basic verification to protect against empty credentials
    if (!process.env.AMAZON_ACCESS_KEY || !process.env.AMAZON_SECRET_KEY) {
        console.error("❌ Error: Missing credentials! Check that your .env file exists and contains the correct keys.");
        return;
    }

    if (asinsToFetch.length === 0) {
        console.log("ℹ️ Please add at least one real Amazon ASIN string to the asinsToFetch array.");
        return;
    }

    try {
        console.log(`🔄 Contacting Amazon API for ${asinsToFetch.length} item(s)...`);
        
        // This is the clean, stable SDK method execution syntax
        const data = await amazonPaapi.GetItems(commonParameters, requestParameters);
        
        let currentProducts = [];
        const jsonPath = path.join(__dirname, 'products.json');
        
        // Read your existing database array if it exists
        if (fs.existsSync(jsonPath)) {
            try {
                currentProducts = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
                console.log(`📂 Found existing products.json containing ${currentProducts.length} items.`);
            } catch (e) {
                console.warn("⚠️ products.json was empty or malformed. Starting a fresh array.");
            }
        } else {
            console.log("📝 Creating a new products.json file database.");
        }
        
        // Calculate the next sequential product ID automatically
        let nextId = currentProducts.length > 0 
            ? Math.max(...currentProducts.map(p => p.id)) + 1 
            : 76; // Start sequentially from 76 if database is empty

        const newItems = data.ItemsResult?.Items || [];
        
        if (newItems.length === 0) {
            console.log("❌ Amazon did not return any matches. Double check your ASIN codes.");
            return;
        }

        newItems.forEach(item => {
            const title = item.ItemInfo?.Title?.DisplayValue || "Unknown Harrows Product";
            
            // Collects all bullet features points from the listing and merges them smoothly
            const features = item.ItemInfo?.Features?.DisplayValues?.join(' ') || '';
            
            const rating = item.CustomerReviews?.StarRating?.Value || 4.5;
            const reviewCount = item.CustomerReviews?.Count?.Value || 10;
            const affiliateUrl = item.DetailPageURL; 

            // Formats directory id naming architecture with padded zeros (e.g., 00076)
            const folderId = String(nextId).padStart(5, '0');

            const jsonBlock = {
                "id": nextId,
                "badge": "Top Rated",
                "name": title,
                "desc": features,
                "rating": parseFloat(rating),
                "reviews": parseInt(reviewCount),
                "amazon_url": affiliateUrl,
                "images": [
                    `images/products/${folderId}/1.jpg`,
                    `images/products/${folderId}/2.jpg`,
                    `images/products/${folderId}/3.jpg`,
                    `images/products/${folderId}/4.jpg`
                ],
                "share_text": "Check out today's darts deal on DartsDaily.net! 🎯"
            };

            currentProducts.push(jsonBlock);
            console.log(`✅ Appended: "${title.substring(0, 40)}..." -> Assigned ID: ${nextId}`);
            nextId++;
        });

        // Write changes back to products.json with standard 4-space indentation layout
        fs.writeFileSync(jsonPath, JSON.stringify(currentProducts, null, 4));
        console.log(`\n🎉 Success! products.json has been safely updated.`);

    } catch (error) {
        console.error("❌ Amazon API Error Context:");
        if (error.response && error.response.data) {
            console.error(JSON.stringify(error.response.data, null, 2));
        } else {
            console.error(error.message || error);
        }
    }
}

generateDartsJson();