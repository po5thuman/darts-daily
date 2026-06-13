const amazonPaapi = require('amazon-paapi');
const fs = require('fs');
const path = require('path');

// 1. Drop your fresh Amazon credentials here
const commonParameters = {
    'AccessKey': 'YOUR_ACCESS_KEY_ID',     // Replace with your real Access Key
    'SecretKey': 'YOUR_SECRET_ACCESS_KEY', // Replace with your real Secret Key
    'PartnerTag': 'YOUR_PARTNER_TAG',       // e.g., your-tag-20
    'PartnerType': 'Associates',
    'Marketplace': 'www.amazon.co.uk'       // Keeps it matching your product base
};

// 2. Put a test ASIN here to verify the build runs smoothly.
// Example: 'B07V6V2K5X' (Take the 10-character code straight from any product URL)
const asinsToFetch = ['PASTE_A_TEST_ASIN_HERE']; 

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
    try {
        console.log('🔄 Contacting Amazon API...');
        const data = await amazonPaapi.getItems(commonParameters, requestParameters);
        
        let currentProducts = [];
        const jsonPath = path.join(__dirname, 'products.json');
        
        // This automatically reads your existing products.json file if it's there
        if (fs.existsSync(jsonPath)) {
            currentProducts = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
        }
        
        // Determine your next starting ID sequentially
        let nextId = currentProducts.length > 0 
            ? Math.max(...currentProducts.map(p => p.id)) + 1 
            : 76; 

        const newItems = data.ItemsResult.Items;
        
        newItems.forEach(item => {
            const title = item.ItemInfo.Title.DisplayValue;
            const features = item.ItemInfo.Features?.DisplayValues?.join(' ') || '';
            const rating = item.CustomerReviews?.StarRating?.Value || 4.5;
            const reviewCount = item.CustomerReviews?.Count?.Value || 15;
            const affiliateUrl = item.DetailPageURL; 

            // Formats the directory ID with leading zeros (e.g., 00076)
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
            console.log(`✅ Formatted and added: ${title} (Assigned ID: ${nextId})`);
            nextId++;
        });

        // Overwrites or updates your local products.json file completely with beautiful indents
        fs.writeFileSync(jsonPath, JSON.stringify(currentProducts, null, 4));
        console.log(`\n🎉 Success! products.json has been fully updated.`);

    } catch (error) {
        console.error("❌ Error running API script:", error);
    }
}

generateDartsJson();
