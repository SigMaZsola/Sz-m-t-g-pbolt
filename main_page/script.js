let SEARCH_TYPE = "ALL";
let userCurrency = "USD"; // Default currency
let exchangeRates = { USD: 1 }; // Initial exchange rate with USD as the base

fetch("src/src.txt")
    .then((res) => res.text())
    .then((text) => {
        createItems(text);
        extractAndPopulateTypes(text);
    })
    .catch((e) => console.error(e));

// Get user's location and currency
fetch("https://ipapi.co/json/")
    .then((res) => res.json())
    .then((data) => {
        const countryCode = data.country_code;
        const currencyCode = getCurrencyByCountry(countryCode);
        userCurrency = currencyCode || "USD"; // Use the country's currency or default to USD
        fetchExchangeRates(currencyCode);
    })
    .catch((err) => console.error("Failed to fetch location/currency:", err));

/**
 * Returns the currency code based on the country code.
 * @param {string} countryCode - ISO country code (e.g., "US", "UK").
 * @returns {string} Currency code (e.g., "USD", "EUR").
 */
function getCurrencyByCountry(countryCode) {
    const countryToCurrency = {
        US: "USD",
        CA: "CAD",
        GB: "GBP",
        EU: "EUR",
        AU: "AUD",
        JP: "JPY",
        IN: "INR",
        HU: "HUF"
        // Add more countries and their currencies as needed
    };

    return countryToCurrency[countryCode];
}

/**
 * Fetches exchange rates relative to USD for currency conversion.
 * @param {string} currency - The target currency code (e.g., "EUR").
 */
function fetchExchangeRates(currency) {
    if (!currency || currency === "USD") return; // No need to fetch if USD

    fetch(`https://api.exchangerate-api.com/v4/latest/USD`)
        .then((res) => res.json())
        .then((data) => {
            exchangeRates = data.rates; // Update global exchange rates
            updatePricesToUserCurrency();
        })
        .catch((err) => console.error("Failed to fetch exchange rates:", err));
}

/**
 * Updates item prices to the user's currency using exchange rates.
 */
function updatePricesToUserCurrency() {
    const items = document.querySelectorAll(".item");

    items.forEach((item) => {
        const basePrice = parseFloat(item.dataset.price); // Original price in USD
        const convertedPrice = (basePrice * (exchangeRates[userCurrency] || 1)).toFixed(2);

        const priceDisplay = item.querySelector(".item-description .price");
        priceDisplay.innerText = `Price: ${convertedPrice} ${userCurrency}`;
    });
}

const item_container = document.getElementById("items");
const types_container = document.querySelector(".types");

// Get references to the search bar and button
const searchInput = document.querySelector(".search-container input[type='text']");
const searchButton = document.querySelector(".search-container input[type='button']");

// Attach event to the search button
searchButton.addEventListener("click", () => {
    const searchText = searchInput.value.toLowerCase().trim();
    filterItemsBySearch(searchText);
});

// Create items from the dataset
function createItems(text) {
    let rows = text.split("\n");
    rows.forEach((line) => {
        if (line.trim()) {
            createItem(line);
        }
    });
}

function createItem(line) {
    let split_txt = line.toString().split(";");

    let parts = {
        id: split_txt[0],
        type: split_txt[1],
        brand: split_txt[2],
        model: split_txt[3],
        price: parseFloat(split_txt[4]) || 0, // Original price in USD
    };

    let item = document.createElement("div");
    item.classList.add("item", "element", parts["type"]);
    item.setAttribute("data-type", parts["type"]); // Adds a type attribute for easier filtering
    item.setAttribute("data-brand", parts["brand"].toLowerCase()); // For searching by brand
    item.setAttribute("data-model", parts["model"].toLowerCase()); // For searching by model
    item.setAttribute("data-price", parts["price"]); // For dynamic currency conversion
    item_container.appendChild(item);

    let item_img = document.createElement("div");
    item_img.classList.add("item-img");

    const img = new Image();
    try{
        img.src = "item_images/" + parts["id"] + ".jpg";
        img.onload = function () {
            item_img.style.backgroundImage =
                'url("' + "item_images/" + parts["id"] + '.jpg' + '")';
        };
    } catch (e){
        console.log(`image cannot be loaded: ${parts["id"] + '.jpg'}`)
    }



    item.appendChild(item_img);

    let item_description = document.createElement("div");
    item_description.classList.add("item-description");

    let descriptionContent = `
        Type: ${parts["type"]}<br>
        Brand: ${parts["brand"]}<br>
        Model: ${parts["model"]}<br>
        <span class="price">Price: ${parts["price"].toFixed(2)} USD</span>\n
    `;

    item_description.innerHTML = descriptionContent;
    item.appendChild(item_description);

    let plus = document.createElement("div");
    plus.classList.add("plus");
    plus.innerText = "+";
    item.appendChild(plus);
}

/**
 * Extracts unique types from the "type:" parts of the items and populates the sidebar.
 */
function extractAndPopulateTypes(text) {
    let rows = text.split("\n");
    let uniqueTypes = new Set();

    // Extract unique types
    rows.forEach((line) => {
        if (line.trim()) {
            let type = line.split(";")[1]; // Get the "type" value
            if (type) uniqueTypes.add(type);
        }
    });

    // Populate the sidebar with types
    uniqueTypes.forEach((type) => {
        let typeLink = document.createElement("a");
        typeLink.innerText = type;
        typeLink.href = "#"; // Adds navigation functionality
        typeLink.classList.add("type-link");

        // Add filtering functionality when clicked
        typeLink.onclick = () => filterItemsByType(type);

        types_container.appendChild(typeLink);
    });
}

/**
 * Filters items displayed in the "items" container based on a selected type.
 * The "ALL" type shows all items.
 */
function filterItemsByType(type) {
    SEARCH_TYPE = type; // Save the currently selected type filter
    const items = document.querySelectorAll(".item");

    if (type === "ALL") {
        // Reset visibility for all items
        items.forEach((item) => {
            item.style.visibility = "visible";
            item.style.position = "relative";
        });

        // Clear search input if it exists
        const searchInput = document.querySelector(".search-container input[type='text']");
        if (searchInput) {
            searchInput.value = ""; // Clear search field
        }

        console.log(`Showing all items.`);
    } else {
        // Hide items not matching the selected type
        items.forEach((item) => {
            const itemType = item.getAttribute("data-type");
            if (itemType === type) {
                item.style.visibility = "visible";
                item.style.position = "relative";
            } else {
                item.style.visibility = "hidden";
                item.style.position = "absolute";
            }
        });

        console.log(`Filtered items by type: ${type}`);
    }
}

/**
 * Filters items by search input (brand and model match).
 * Respects the current SEARCH_TYPE filter if set.
 * @param {string} searchText - The user-entered search text
 */
function filterItemsBySearch(searchText) {
    const items = document.querySelectorAll(".item");

    items.forEach((item) => {
        const itemBrand = item.getAttribute("data-brand");
        const itemModel = item.getAttribute("data-model");
        const itemType = item.getAttribute("data-type");

        // Check if searchText matches brand or model
        const matchesSearch =
            itemBrand.includes(searchText) || itemModel.includes(searchText);

        // Respect type filter in combination with search filter
        if (
            (SEARCH_TYPE === "ALL" || itemType === SEARCH_TYPE) &&
            matchesSearch
        ) {
            item.style.visibility = "visible";
            item.style.position = "relative";
        } else {
            item.style.visibility = "hidden";
            item.style.position = "absolute";
        }
    });

    console.log(`Filtered items by search: ${searchText}`);
}
