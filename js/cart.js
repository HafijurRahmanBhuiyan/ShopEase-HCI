// ShopEase - Cart Management

// Get cart from localStorage
function getCart() {
    return JSON.parse(localStorage.getItem('shopease_cart')) || [];
}

// Save cart to localStorage
function saveCart(cart) {
    localStorage.setItem('shopease_cart', JSON.stringify(cart));
    updateCartCount();
}

// Update cart item quantity
function updateQuantity(productId, change) {
    let cart = getCart();
    const item = cart.find(i => i.id === productId);
    
    if (item) {
        const newQuantity = item.quantity + change;
        
        if (newQuantity <= 0) {
            removeFromCart(productId);
            return;
        }
        
        if (newQuantity > item.maxStock) {
            showToast('Maximum stock reached', 'warning');
            return;
        }
        
        item.quantity = newQuantity;
        saveCart(cart);
        
        if (typeof renderCart === 'function') {
            renderCart();
        }
    }
}

// Remove item from cart
function removeFromCart(productId) {
    let cart = getCart();
    cart = cart.filter(item => item.id !== productId);
    saveCart(cart);
    showToast('Item removed from cart', 'warning');
    
    if (typeof renderCart === 'function') {
        renderCart();
    }
}

// Clear entire cart
function clearCart() {
    if (confirm('Are you sure you want to clear your cart?')) {
        localStorage.removeItem('shopease_cart');
        updateCartCount();
        
        if (typeof renderCart === 'function') {
            renderCart();
        }
        
        showToast('Cart cleared', 'success');
    }
}

// Calculate cart total
function getCartTotal() {
    const cart = getCart();
    return cart.reduce((total, item) => {
        const discountedPrice = item.price - (item.price * item.discount / 100);
        return total + (discountedPrice * item.quantity);
    }, 0);
}

// Calculate original total (without discount)
function getOriginalTotal() {
    const cart = getCart();
    return cart.reduce((total, item) => {
        return total + (item.price * item.quantity);
    }, 0);
}

// Calculate total savings
function getTotalSavings() {
    return getOriginalTotal() - getCartTotal();
}

// Calculate shipping cost
function getShippingCost(total) {
    if (total >= 2000) {
        return 0; // Free shipping for orders over 2000 BDT
    }
    return 120; // Standard shipping
}

// Calculate grand total
function getGrandTotal() {
    const subtotal = getCartTotal();
    const shipping = getShippingCost(subtotal);
    return subtotal + shipping;
}

// Render cart items
function renderCart() {
    const cartContainer = document.getElementById('cart-items');
    const emptyCartContainer = document.getElementById('empty-cart');
    const cartContentContainer = document.getElementById('cart-content');
    
    if (!cartContainer) return;
    
    const cart = getCart();
    
    if (cart.length === 0) {
        if (emptyCartContainer) emptyCartContainer.style.display = 'block';
        if (cartContentContainer) cartContentContainer.style.display = 'none';
        return;
    }
    
    if (emptyCartContainer) emptyCartContainer.style.display = 'none';
    if (cartContentContainer) cartContentContainer.style.display = 'grid';
    
    cartContainer.innerHTML = cart.map(item => {
        const discountedPrice = item.price - (item.price * item.discount / 100);
        const itemTotal = discountedPrice * item.quantity;
        
        return `
            <div class="cart-item">
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="cart-item-info">
                    <h3>${item.name}</h3>
                    <p>${item.discount > 0 ? `<span style="color: var(--success);">${item.discount}% off</span>` : ''}</p>
                    <div class="cart-item-actions">
                        <div class="cart-item-quantity">
                            <button onclick="updateQuantity(${item.id}, -1)">−</button>
                            <span>${item.quantity}</span>
                            <button onclick="updateQuantity(${item.id}, 1)">+</button>
                        </div>
                        <button class="remove-item-btn" onclick="removeFromCart(${item.id})">
                            🗑️ Remove
                        </button>
                    </div>
                </div>
                <div class="cart-item-price">
                    <span class="price">${formatPrice(Math.round(itemTotal))}</span>
                    ${item.discount > 0 ? `<span class="old-price">${formatPrice(item.price * item.quantity)}</span>` : ''}
                </div>
            </div>
        `;
    }).join('');
    
    // Update summary
    updateCartSummary();
}

function updateCartSummary() {
    const subtotalEl = document.getElementById('cart-subtotal');
    const discountEl = document.getElementById('cart-discount');
    const shippingEl = document.getElementById('cart-shipping');
    const totalEl = document.getElementById('cart-total');
    
    const subtotal = getCartTotal();
    const discount = getTotalSavings();
    const shipping = getShippingCost(subtotal);
    const total = subtotal + shipping;
    
    if (subtotalEl) subtotalEl.textContent = formatPrice(Math.round(subtotal));
    if (discountEl) discountEl.textContent = `-${formatPrice(Math.round(discount))}`;
    if (shippingEl) shippingEl.textContent = shipping === 0 ? 'FREE' : formatPrice(shipping);
    if (totalEl) totalEl.textContent = formatPrice(Math.round(total));
}

// Initialize cart page
document.addEventListener('DOMContentLoaded', () => {
    renderCart();
});
