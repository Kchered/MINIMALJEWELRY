// Sample products data
const products = [
    {
        id: 1,
        name: "Минималистичное колье с жемчугом",
        price: 4500,
        category: "necklace",
        material: "pearl",
        image: "images/305.jpg"
    },
    {
        id: 2,
        name: "Серебряные серьги-кольца",
        price: 3200,
        category: "earrings",
        material: "silver",
        image: "images/aksessuary-dla-nevesty.jpg"
    },
    {
        id: 3,
        name: "Тонкий серебряный браслет",
        price: 2800,
        category: "bracelet",
        material: "silver",
        image: "images/elegantnaa-cvetocnaa-ramka-iz-bumagi.jpg"
    },
    {
        id: 4,
        name: "Кольцо с горным хрусталем",
        price: 3800,
        category: "ring",
        material: "crystal",
        image: "images/tri-korobki-s-obrucal-nymi-kol-cami-stoat-na-bezevom-stole.jpg"
    },
    {
        id: 5,
        name: "Позолоченное ожерелье",
        price: 5200,
        category: "necklace",
        material: "gold",
        image: "images/063e1f11-7861-4fcb-9236-95d0c5147498.jpg"
    },
    {
        id: 6,
        name: "Жемчужные серьги-гвоздики",
        price: 2900,
        category: "earrings",
        material: "pearl",
        image: "images/f27836a9-6b3b-4ce6-8cff-0bc8ed52672a.jpg"
    },
    {
        id: 7,
        name: "Набор браслетов из серебра",
        price: 6500,
        category: "bracelet",
        material: "silver",
        image: "images/11760.jpg"
    },
    {
        id: 8,
        name: "Минималистичное золотое кольцо",
        price: 4100,
        category: "ring",
        material: "gold",
        image: "images/10378806.png"
    }
];

// DOM Elements
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');
const searchBtn = document.querySelector('.search-btn');
const closeSearch = document.querySelector('.close-search');
const searchOverlay = document.getElementById('searchOverlay');
const cartIcon = document.getElementById('cartIcon');
const cartSidebar = document.getElementById('cartSidebar');
const closeCart = document.getElementById('closeCart');
const cartOverlay = document.getElementById('cartOverlay');
const checkoutBtn = document.getElementById('checkoutBtn');
const checkoutModal = document.getElementById('checkoutModal');
const closeCheckout = document.getElementById('closeCheckout');
const filterToggle = document.getElementById('filterToggle');
const filtersSidebar = document.getElementById('filtersSidebar');
const priceSlider = document.getElementById('priceSlider');
const currentPrice = document.getElementById('currentPrice');
const featuredProductsGrid = document.getElementById('featuredProducts');
const catalogProductsGrid = document.getElementById('catalogProducts');

// Mobile Menu Toggle
menuToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    menuToggle.innerHTML = mobileMenu.classList.contains('active') 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>';
});

// Search Functionality
searchBtn.addEventListener('click', () => {
    searchOverlay.classList.add('active');
});

closeSearch.addEventListener('click', () => {
    searchOverlay.classList.remove('active');
});

// Cart Toggle
cartIcon.addEventListener('click', () => {
    cartSidebar.classList.add('active');
    cartOverlay.classList.add('active');
    updateCartDisplay();
});

closeCart.addEventListener('click', () => {
    cartSidebar.classList.remove('active');
    cartOverlay.classList.remove('active');
});

cartOverlay.addEventListener('click', () => {
    cartSidebar.classList.remove('active');
    cartOverlay.classList.remove('active');
});

// Checkout Modal
checkoutBtn.addEventListener('click', () => {
    if (getCartTotal() > 0) {
        cartSidebar.classList.remove('active');
        checkoutModal.classList.add('active');
    }
});

closeCheckout.addEventListener('click', () => {
    checkoutModal.classList.remove('active');
});

checkoutModal.addEventListener('click', (e) => {
    if (e.target === checkoutModal) {
        checkoutModal.classList.remove('active');
    }
});

// Filter Toggle for Mobile
filterToggle.addEventListener('click', () => {
    filtersSidebar.style.display = filtersSidebar.style.display === 'block' ? 'none' : 'block';
});

// Price Slider
priceSlider.addEventListener('input', (e) => {
    currentPrice.textContent = `${e.target.value} ₽`;
});

// Load Featured Products
function loadFeaturedProducts() {
    const featured = products.slice(0, 4);
    featuredProductsGrid.innerHTML = featured.map(product => `
        <div class="product-card" data-id="${product.id}">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-content">
                <h3 class="product-title">${product.name}</h3>
                <div class="product-price">${product.price} ₽</div>
                <button class="add-to-cart" onclick="addToCart(${product.id})">В корзину</button>
            </div>
        </div>
    `).join('');
}

// Load Catalog Products
function loadCatalogProducts() {
    catalogProductsGrid.innerHTML = products.map(product => `
        <div class="product-card" data-id="${product.id}" data-category="${product.category}" data-material="${product.material}" data-price="${product.price}">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-content">
                <h3 class="product-title">${product.name}</h3>
                <div class="product-price">${product.price} ₽</div>
                <button class="add-to-cart" onclick="addToCart(${product.id})">В корзину</button>
            </div>
        </div>
    `).join('');
}

// Filter Products
function filterProducts() {
    const selectedCategories = Array.from(document.querySelectorAll('input[name="category"]:checked')).map(cb => cb.value);
    const selectedMaterials = Array.from(document.querySelectorAll('input[name="material"]:checked')).map(cb => cb.value);
    const maxPrice = parseInt(priceSlider.value);
    
    const productCards = document.querySelectorAll('#catalogProducts .product-card');
    
    productCards.forEach(card => {
        const category = card.dataset.category;
        const material = card.dataset.material;
        const price = parseInt(card.dataset.price);
        
        const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(category);
        const materialMatch = selectedMaterials.length === 0 || selectedMaterials.includes(material);
        const priceMatch = price <= maxPrice;
        
        card.style.display = categoryMatch && materialMatch && priceMatch ? 'block' : 'none';
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadFeaturedProducts();
    loadCatalogProducts();
    
    // Add event listeners for filters
    document.querySelectorAll('input[name="category"], input[name="material"]').forEach(input => {
        input.addEventListener('change', filterProducts);
    });
    
    priceSlider.addEventListener('input', filterProducts);
    document.querySelector('.apply-filters').addEventListener('click', filterProducts);
    
    // Sort functionality
    document.querySelector('.sort-select').addEventListener('change', (e) => {
        sortProducts(e.target.value);
    });
});

// Sort Products
function sortProducts(sortBy) {
    let sortedProducts = [...products];
    
    switch(sortBy) {
        case 'price-low':
            sortedProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            sortedProducts.sort((a, b) => b.price - a.price);
            break;
        case 'new':
            // For demo, just reverse the array
            sortedProducts.reverse();
            break;
        default:
            // Popular - default order
            break;
    }
    
    catalogProductsGrid.innerHTML = sortedProducts.map(product => `
        <div class="product-card" data-id="${product.id}" data-category="${product.category}" data-material="${product.material}" data-price="${product.price}">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-content">
                <h3 class="product-title">${product.name}</h3>
                <div class="product-price">${product.price} ₽</div>
                <button class="add-to-cart" onclick="addToCart(${product.id})">В корзину</button>
            </div>
        </div>
    `).join('');
    
    // Reattach filter functionality
    filterProducts();
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!mobileMenu.contains(e.target) && !menuToggle.contains(e.target) && mobileMenu.classList.contains('active')) {
        mobileMenu.classList.remove('active');
        menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            if (mobileMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
        }
    });
});