// --- CONFIGURATION & DATA ---
const productsData = [
    // Electronics
    { id: 'e1', name: 'Foco Cámara 360', price: 19.99, image: 'itemelec/foco cam.jpg', category: 'electronics' },
    { id: 'e2', name: 'Cámara Doble Lente', price: 49.99, image: 'itemelec/doble cam.jpg', category: 'electronics' },
    { id: 'e3', name: 'PC Gamer Básica', price: 79.99, image: 'itemelec/pc.jpg', category: 'electronics' },
    // Gaming
    { id: 'g1', name: 'Auriculares Gamer', price: 29.99, image: 'itemgaming/rubia shopp.jpg', category: 'gaming' },
    { id: 'g2', name: 'Soporte Celular Auto', price: 15.99, image: 'itemgaming/carritocel.jpg', category: 'gaming' },
    { id: 'g3', name: 'Mouse Gamer RGB', price: 24.99, image: 'itemgaming/rubia shopp.jpg', category: 'gaming' },
    // Anime
    { id: 'a1', name: 'Figura Coleccionable', price: 34.99, image: 'itemanime/onlineshop.jpg', category: 'anime' },
    { id: 'a2', name: 'Accesorio Cosplay', price: 12.99, image: 'itemanime/pngwing.com (1).png', category: 'anime' },
    { id: 'a3', name: 'Poster Premium', price: 9.99, image: 'itemanime/thank you.jpg', category: 'anime' },
    // Domotica
    { id: 'd1', name: 'Cerradura Inteligente', price: 89.99, image: 'itemdomotica/smart door.jpg', category: 'domotica' },
    { id: 'd2', name: 'Cámara Tripee', price: 39.99, image: 'itemdomotica/tri cam.jpg', category: 'domotica' },
    { id: 'd3', name: 'Timbre Video', price: 45.99, image: 'itemdomotica/smart door.jpg', category: 'domotica' },
    { id: 'd4', name: 'Sensor Movimiento', price: 29.99, image: 'itemdomotica/tri cam.jpg', category: 'domotica' }
];

// Global Cart State
let cart = [];

// --- GLOBAL FUNCTIONS (Required for HTML onclick attributes) ---

function addToCart(productId) {
    const product = productsData.find(p => p.id === productId);
    if (product) {
        cart.push(product);
        updateCartUI();
        showToast(`${product.name} añadido al carrito!`);

        // Auto-open cart for feedback
        const cartSidebar = document.querySelector('aside');
        if (cartSidebar) cartSidebar.classList.add('active');
    }
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartUI();
}

function updateCartUI() {
    // 1. Calculate Total
    const total = cart.reduce((sum, item) => sum + item.price, 0);

    // 2. Update Total Text
    const totalEl = document.getElementById('total');
    if (totalEl) {
        // totalEl might be the div, inside it is p
        const p = totalEl.querySelector('p');
        if (p) p.innerText = `Total: $${total.toFixed(2)}`;
    }

    // 3. Render Items
    const container = document.getElementById('products-container');
    if (container) {
        if (cart.length === 0) {
            container.innerHTML = '<p>No hay productos en el carrito</p>';
        } else {
            container.innerHTML = cart.map((item, index) => `
                <div class="cart-item" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; padding-bottom: 5px; border-bottom: 1px solid #eee;">
                    <div>
                        <div style="font-weight: bold;">${item.name}</div>
                        <div style="font-size: 0.9em; color: #666;">$${item.price.toFixed(2)}</div>
                    </div>
                    <button onclick="removeFromCart(${index})" style="background: #ff4444; color: white; border: none; width: 20px; height: 20px; border-radius: 50%; cursor: pointer;">&times;</button>
                </div>
            `).join('');
        }
    }
}

function showToast(message) {
    let toast = document.querySelector('.toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.className = 'toast';
        document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
}

// --- INITIALIZATION & EVENT LISTENERS ---
document.addEventListener('DOMContentLoaded', () => {

    // 1. Render Products Grid
    renderProductsGrid();

    // 2. Setup Navigation & Animations
    setupInteractions();

    // 3. Setup Commerce (Modal & Checkout)
    setupCommerce();
});

function renderProductsGrid() {
    const categories = {
        'electronics': document.getElementById('grid-electronics'),
        'gaming': document.getElementById('grid-gaming'),
        'anime': document.getElementById('grid-anime'),
        'domotica': document.getElementById('grid-domotica')
    };

    productsData.forEach(product => {
        const container = categories[product.category];
        if (container) {
            const card = document.createElement('div');
            card.className = 'product-card';
            card.innerHTML = `
                <img src="${product.image}" alt="${product.name}" loading="lazy">
                <h3>${product.name}</h3>
                <p>$${product.price.toFixed(2)}</p>
                <button onclick="addToCart('${product.id}')" style="cursor: pointer;">Añadir al carrito</button>
            `;
            container.appendChild(card);
        }
    });
}

function setupInteractions() {
    // Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) target.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Animations with Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    });
    document.querySelectorAll('.product-card, section h2').forEach(el => observer.observe(el));

    // Cart Sidebar Toggle
    const cartIcon = document.getElementById('cart-icon');
    const cartSidebar = document.querySelector('aside');
    const closeCartBtn = document.getElementById('hide-products');

    if (cartIcon && cartSidebar) {
        cartIcon.addEventListener('click', () => cartSidebar.classList.toggle('active'));
    }
    if (closeCartBtn && cartSidebar) {
        closeCartBtn.addEventListener('click', () => cartSidebar.classList.remove('active'));
    }
}

function setupCommerce() {
    const purchaseBtn = document.getElementById('purchase');
    const loginModal = document.getElementById('login-modal');
    const closeModalBtn = document.querySelector('.close-modal');
    const loginForm = document.getElementById('login-form');

    // Helper: Get User
    const getUser = () => {
        try {
            return JSON.parse(localStorage.getItem('shopUser'));
        } catch (e) { return null; }
    };

    // Helper: WhatsApp Redirect
    const goToWhatsApp = (user) => {
        const total = cart.reduce((sum, item) => sum + item.price, 0);
        const itemsList = cart.map(item => `- ${item.name} ($${item.price.toFixed(2)})`).join('\n');
        const message = `*Hola ShopMayta, Nuevo Pedido:* 🛒\n\n${itemsList}\n\n*Total: $${total.toFixed(2)}*\n\n*Cliente:*\n👤 ${user.name}\n📱 ${user.contact}`;

        const url = `https://wa.me/593963106343?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');

        // Optional: clear cart
        // cart = []; updateCartUI();
    };

    // Purchase Click Event
    if (purchaseBtn) {
        purchaseBtn.onclick = (e) => { // Using onclick to override any potential listeners
            e.preventDefault();

            if (cart.length === 0) {
                alert('Tu carrito está vacío. ¡Añade productos primero!');
                return;
            }

            // Save cart to temp storage for checkout page
            localStorage.setItem('cartTemp', JSON.stringify(cart));

            // Redirect to new Checkout Page
            window.location.href = 'checkout.html';
        };
    } else {
        console.error("Purchase button not found");
    }

    // Modal Events
    if (closeModalBtn) {
        closeModalBtn.onclick = () => loginModal.style.display = 'none';
    }
    window.onclick = (e) => {
        if (e.target == loginModal) loginModal.style.display = 'none';
    }

    // Login Form
    if (loginForm) {
        loginForm.onsubmit = (e) => {
            e.preventDefault();
            const name = document.getElementById('username').value;
            const contact = document.getElementById('usercontact').value;

            if (name && contact) {
                const user = { name, contact };
                localStorage.setItem('shopUser', JSON.stringify(user));
                loginModal.style.display = 'none';
                showToast(`¡Hola ${name}!`);
                goToWhatsApp(user);
            }
        };
    }
}
