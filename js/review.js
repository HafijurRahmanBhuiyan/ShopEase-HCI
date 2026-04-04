// ShopEase - Review System

// Get all reviews
function getReviews() {
    return JSON.parse(localStorage.getItem('shopease_reviews')) || [];
}

// Get reviews for a product
function getProductReviews(productId) {
    const reviews = getReviews();
    return reviews.filter(r => r.productId === productId);
}

// Save review
function saveReview(review) {
    const reviews = getReviews();
    reviews.unshift(review);
    localStorage.setItem('shopease_reviews', JSON.stringify(reviews));
}

// Add helpful vote
function markHelpful(reviewId) {
    const reviews = getReviews();
    const review = reviews.find(r => r.id === reviewId);
    
    if (review) {
        review.helpful = (review.helpful || 0) + 1;
        localStorage.setItem('shopease_reviews', JSON.stringify(reviews));
        showToast('Marked as helpful!', 'success');
        
        if (typeof renderProductReviews === 'function') {
            renderProductReviews();
        }
    }
}

// Star rating input
let selectedRating = 0;

function initStarRating() {
    const stars = document.querySelectorAll('.star-rating-input span');
    
    stars.forEach((star, index) => {
        star.addEventListener('click', () => {
            selectedRating = index + 1;
            updateStarDisplay(stars);
        });
        
        star.addEventListener('mouseenter', () => {
            highlightStars(stars, index + 1);
        });
        
        star.addEventListener('mouseleave', () => {
            updateStarDisplay(stars);
        });
    });
}

function highlightStars(stars, count) {
    stars.forEach((star, index) => {
        if (index < count) {
            star.classList.add('active');
        } else {
            star.classList.remove('active');
        }
    });
}

function updateStarDisplay(stars) {
    stars.forEach((star, index) => {
        if (index < selectedRating) {
            star.classList.add('active');
        } else {
            star.classList.remove('active');
        }
    });
}

// Submit review
function submitReview(event) {
    event.preventDefault();
    
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    
    if (!productId) {
        showToast('Product not found', 'error');
        return;
    }
    
    const comment = document.getElementById('review-comment').value.trim();
    
    if (selectedRating === 0) {
        showToast('Please select a rating', 'error');
        return;
    }
    
    if (!comment) {
        showToast('Please write a review', 'error');
        return;
    }
    
    const currentUser = getCurrentUser();
    const product = getProductById(productId);
    
    if (!currentUser) {
        showToast('Please login to submit a review', 'warning');
        window.location.href = 'login.html?redirect=' + encodeURIComponent(window.location.href);
        return;
    }
    
    const review = {
        id: 'REV' + Date.now(),
        productId: parseInt(productId),
        productName: product?.name || 'Unknown Product',
        reviewerName: currentUser.name,
        reviewerEmail: currentUser.email,
        rating: selectedRating,
        comment: comment,
        helpful: 0,
        createdAt: new Date().toISOString()
    };
    
    saveReview(review);
    
    // Update product rating
    updateProductRating(productId);
    
    // Reset form
    selectedRating = 0;
    const stars = document.querySelectorAll('.star-rating-input span');
    updateStarDisplay(stars);
    document.getElementById('review-comment').value = '';
    
    showToast('Review submitted! Thank you.', 'success');
    
    // Re-render reviews
    if (typeof renderProductReviews === 'function') {
        renderProductReviews();
    }
}

function updateProductRating(productId) {
    const reviews = getProductReviews(productId);
    
    if (reviews.length === 0) return;
    
    const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
    
    // Note: In a real app, this would update the database
    // For demo, we'll update localStorage
    const productRatings = JSON.parse(localStorage.getItem('shopease_product_ratings')) || {};
    productRatings[productId] = {
        rating: Math.round(avgRating * 10) / 10,
        count: reviews.length
    };
    localStorage.setItem('shopease_product_ratings', JSON.stringify(productRatings));
}

// Render product reviews
function renderProductReviews() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    
    const container = document.getElementById('reviews-list');
    const summaryContainer = document.getElementById('rating-summary');
    
    if (!container) return;
    
    const reviews = productId ? getProductReviews(parseInt(productId)) : getReviews();
    
    // Render summary
    if (summaryContainer && reviews.length > 0) {
        const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
        const ratingCounts = [0, 0, 0, 0, 0];
        
        reviews.forEach(r => {
            ratingCounts[r.rating - 1]++;
        });
        
        summaryContainer.innerHTML = `
            <div class="rating-overview">
                <span class="rating-number">${avgRating.toFixed(1)}</span>
                <div class="rating-stars">${renderStars(avgRating)}</div>
                <span class="rating-count">${reviews.length} reviews</span>
            </div>
            <div class="rating-bars">
                ${[5, 4, 3, 2, 1].map(star => `
                    <div class="rating-bar">
                        <span class="rating-bar-label">${star} ★</span>
                        <div class="rating-bar-track">
                            <div class="rating-bar-fill" style="width: ${(ratingCounts[star - 1] / reviews.length) * 100}%"></div>
                        </div>
                        <span class="rating-bar-label">${ratingCounts[star - 1]}</span>
                    </div>
                `).join('')}
            </div>
        `;
    }
    
    // Render reviews list
    if (reviews.length === 0) {
        container.innerHTML = `
            <div style="text-align: center; padding: 60px 20px;">
                <p style="font-size: 48px; margin-bottom: 16px;">📝</p>
                <h3>No reviews yet</h3>
                <p style="color: var(--text-light);">Be the first to review this product!</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = reviews.map(review => `
        <div class="review-card">
            <div class="review-header">
                <div class="reviewer-info">
                    <div class="reviewer-avatar">
                        ${review.reviewerName.charAt(0).toUpperCase()}
                    </div>
                    <div>
                        <span class="reviewer-name">${review.reviewerName}</span>
                        <div class="review-stars">${renderStars(review.rating)}</div>
                    </div>
                </div>
                <span class="review-date">${formatDate(review.createdAt)}</span>
            </div>
            <p class="review-content">${review.comment}</p>
            <div class="review-actions">
                <button class="helpful-btn" onclick="markHelpful('${review.id}')">
                    👍 Helpful (${review.helpful || 0})
                </button>
            </div>
        </div>
    `).join('');
}

// Render reviews on product detail page
function initProductReviews() {
    const reviewsSection = document.getElementById('reviews-section');
    if (!reviewsSection) return;
    
    initStarRating();
    renderProductReviews();
    
    const reviewForm = document.getElementById('review-form');
    if (reviewForm) {
        reviewForm.addEventListener('submit', submitReview);
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initProductReviews();
});
