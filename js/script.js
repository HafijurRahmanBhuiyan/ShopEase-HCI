// ShopEase - Main JavaScript

// Toast Notification System
function showToast(message, type = 'success') {
    const container = document.getElementById('toast-container') || createToastContainer();
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    const icons = {
        success: '✓',
        error: '✕',
        warning: '⚠'
    };
    
    toast.innerHTML = `
        <span class="toast-icon">${icons[type]}</span>
        <span class="toast-message">${message}</span>
    `;
    
    container.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideOut 0.3s ease forwards';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

function createToastContainer() {
    const container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
    return container;
}

// Add slideOut animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideOut {
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Loading Spinner
function showLoading() {
    document.getElementById('loading-overlay')?.classList.add('active');
}

function hideLoading() {
    document.getElementById('loading-overlay')?.classList.remove('active');
}

// Header Functions
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('shopease_cart')) || [];
    const countElements = document.querySelectorAll('.cart-count');
    countElements.forEach(el => {
        el.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
    });
}

function updateWishlistCount() {
    const wishlist = JSON.parse(localStorage.getItem('shopease_wishlist')) || [];
    const countElements = document.querySelectorAll('.wishlist-count');
    countElements.forEach(el => {
        el.textContent = wishlist.length;
    });
}

// Product Card Rendering
function renderProductCard(product) {
    const discountedPrice = calculateDiscountedPrice(product.price, product.discount);
    
    return `
        <div class="product-card" onclick="window.location.href='product-details.html?id=${product.id}'">
            <div class="product-image">
                <img src="${product.images[0]}" alt="${product.name}" loading="lazy">
                ${product.discount > 0 ? `<span class="product-badge">-${product.discount}%</span>` : ''}
                <button class="product-wishlist" onclick="event.stopPropagation(); toggleWishlist(${product.id})">
                    ${isInWishlist(product.id) ? '❤️' : '🤍'}
                </button>
            </div>
            <div class="product-info">
                <span class="product-category">${getCategoryName(product.category)}</span>
                <h3 class="product-name">${product.name}</h3>
                <div class="product-rating">
                    <div class="stars">${renderStars(product.rating)}</div>
                    <span class="rating-text">${product.rating} (${product.reviewCount})</span>
                </div>
                <div class="product-price">
                    <span class="price-current">${formatPrice(Math.round(discountedPrice))}</span>
                    ${product.discount > 0 ? `<span class="price-old">${formatPrice(product.price)}</span>` : ''}
                </div>
                <div class="product-actions" onclick="event.stopPropagation()">
                    <button class="btn btn-primary btn-sm" onclick="addToCart(${product.id})">
                        🛒 Add to Cart
                    </button>
                    <button class="btn btn-secondary btn-sm" onclick="buyNow(${product.id})">
                        Buy Now
                    </button>
                </div>
            </div>
        </div>
    `;
}

function renderStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalf = rating % 1 >= 0.5;
    let stars = '';
    
    for (let i = 0; i < 5; i++) {
        if (i < fullStars) {
            stars += '★';
        } else if (i === fullStars && hasHalf) {
            stars += '★';
        } else {
            stars += '☆';
        }
    }
    
    return stars;
}

// Wishlist Functions
function isInWishlist(productId) {
    const wishlist = JSON.parse(localStorage.getItem('shopease_wishlist')) || [];
    return wishlist.includes(productId);
}

function toggleWishlist(productId) {
    let wishlist = JSON.parse(localStorage.getItem('shopease_wishlist')) || [];
    
    if (wishlist.includes(productId)) {
        wishlist = wishlist.filter(id => id !== productId);
        showToast('Removed from wishlist', 'warning');
    } else {
        wishlist.push(productId);
        showToast('Added to wishlist!', 'success');
    }
    
    localStorage.setItem('shopease_wishlist', JSON.stringify(wishlist));
    updateWishlistCount();
    
    if (typeof renderProducts === 'function') {
        renderProducts();
    }
    if (typeof renderWishlist === 'function') {
        renderWishlist();
    }
}

// Cart Functions
function addToCart(productId, quantity = 1) {
    const product = getProductById(productId);
    if (!product) return;
    
    let cart = JSON.parse(localStorage.getItem('shopease_cart')) || [];
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            discount: product.discount,
            image: product.images[0],
            quantity: quantity,
            maxStock: product.stock
        });
    }
    
    localStorage.setItem('shopease_cart', JSON.stringify(cart));
    updateCartCount();
    showToast(`${product.name} added to cart!`, 'success');
}

function buyNow(productId, quantity = 1) {
    addToCart(productId, quantity);
    window.location.href = 'checkout.html';
}

// Search Functions
function handleSearch(event) {
    event.preventDefault();
    const query = document.getElementById('search-input').value.trim();
    if (query) {
        window.location.href = `products.html?search=${encodeURIComponent(query)}`;
    }
}

// Scroll to Top
function initScrollToTop() {
    const scrollBtn = document.querySelector('.scroll-top');
    if (!scrollBtn) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollBtn.classList.add('visible');
        } else {
            scrollBtn.classList.remove('visible');
        }
    });
    
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Mobile Menu Toggle
function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    if (navMenu) {
        navMenu.classList.toggle('active');
    }
}

// Modal Functions
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Close modal on backdrop click
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        e.target.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Chat Widget
function toggleChat() {
    const chatBox = document.querySelector('.chat-box');
    if (chatBox) {
        chatBox.classList.toggle('active');
    }
}

function sendChatMessage() {
    const input = document.querySelector('.chat-input input');
    const message = input.value.trim();
    
    if (!message) return;
    
    const chatBody = document.querySelector('.chat-body');
    
    const userMsg = document.createElement('div');
    userMsg.className = 'chat-message user';
    userMsg.innerHTML = `<span class="message">${message}</span>`;
    chatBody.appendChild(userMsg);
    
    input.value = '';
    
    setTimeout(() => {
        const botMsg = document.createElement('div');
        botMsg.className = 'chat-message bot';
        botMsg.innerHTML = `<span class="message">Thanks for your message! Our support team will get back to you shortly. For urgent queries, call: 01612345678</span>`;
        chatBody.appendChild(botMsg);
        chatBody.scrollTop = chatBody.scrollHeight;
    }, 1000);
    
    chatBody.scrollTop = chatBody.scrollHeight;
}

// FAQ Accordion
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}

// Page Initialization
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    updateWishlistCount();
    initScrollToTop();
    initFAQ();
    
    // Initialize search form
    const searchForm = document.getElementById('search-form');
    if (searchForm) {
        searchForm.addEventListener('submit', handleSearch);
    }
    
    // Initialize chat input
    const chatSendBtn = document.querySelector('.chat-send-btn');
    if (chatSendBtn) {
        chatSendBtn.addEventListener('click', sendChatMessage);
    }
    
    const chatInput = document.querySelector('.chat-input input');
    if (chatInput) {
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendChatMessage();
            }
        });
    }
});

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function getUrlParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

function formatDate(date) {
    return new Date(date).toLocaleDateString('en-BD', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}
