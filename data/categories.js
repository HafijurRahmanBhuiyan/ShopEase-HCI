// ShopEase - Categories Data
const categories = [
    {
        id: 1,
        name: "Electronics",
        icon: "📱",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
        productCount: 24
    },
    {
        id: 2,
        name: "Fashion",
        icon: "👕",
        image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=400",
        productCount: 45
    },
    {
        id: 3,
        name: "Groceries",
        icon: "🍚",
        image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400",
        productCount: 62
    },
    {
        id: 4,
        name: "Home & Living",
        icon: "🏠",
        image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400",
        productCount: 38
    },
    {
        id: 5,
        name: "Beauty",
        icon: "💄",
        image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400",
        productCount: 29
    },
    {
        id: 6,
        name: "Sports",
        icon: "⚽",
        image: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=400",
        productCount: 18
    }
];

const categoryFilters = [
    { id: 'all', name: 'All Products' },
    { id: 1, name: 'Electronics' },
    { id: 2, name: 'Fashion' },
    { id: 3, name: 'Groceries' },
    { id: 4, name: 'Home & Living' },
    { id: 5, name: 'Beauty' },
    { id: 6, name: 'Sports' }
];

function getCategoryById(id) {
    return categories.find(cat => cat.id === id);
}

function getCategoryName(id) {
    const category = getCategoryById(id);
    return category ? category.name : 'Uncategorized';
}
