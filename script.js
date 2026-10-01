/* =========================================================
   LEAFSALE MAIN INTERACTIVE
========================================================= */


const defaultProducts = [

    {
        id: 1,
        name: "Malunggay Pandesal",
        category: "Snacks",
        price: 85,
        stock: 24,
        expiry: "2026-12-20",
        image: "https://cdn.phototourl.com/member/2026-09-29-843c7255-9022-48a2-8066-b36a7db6fedd.jpg"
    },

    {
        id: 2,
        name: "Pumpkin Bread",
        category: "Snacks",
        price: 95,
        stock: 14,
        expiry: "2026-11-20",
        image: "https://user38113.na.imgto.link/public/20260929/pumpkin-bread.avif"
    },

    {
        id: 3,
        name: "Banana Bread",
        category: "Snacks",
        price: 90,
        stock: 5,
        expiry: "2026-10-15",
        image: "https://user38113.na.imgto.link/public/20260929/banana-bread.avif"
    },

    {
        id: 4,
        name: "Avocado Bread",
        category: "Snacks",
        price: 100,
        stock: 18,
        expiry: "2026-12-01",
        image: "https://user38113.na.imgto.link/public/20260929/avocado-bread.avif"
    },

    {
        id: 5,
        name: "Cassava Cake",
        category: "Snacks",
        price: 120,
        stock: 3,
        expiry: "2026-10-05",
        image: "https://user38113.na.imgto.link/public/20260929/cassava-cake.avif"
    },

    {
        id: 6,
        name: "Cucumber Lemonade",
        category: "Drinks",
        price: 75,
        stock: 20,
        expiry: "2026-11-30",
        image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=600"
    },

    {
        id: 7,
        name: "Buko Pandan Drink",
        category: "Drinks",
        price: 80,
        stock: 8,
        expiry: "2026-10-20",
        image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=600"
    },

    {
        id: 8,
        name: "Pineapple Juice",
        category: "Drinks",
        price: 70,
        stock: 2,
        expiry: "2026-10-01",
        image: "https://images.unsplash.com/photo-1546173159-315724a31696?w=600"
    },

    {
        id: 9,
        name: "Papaya Smoothie",
        category: "Drinks",
        price: 90,
        stock: 15,
        expiry: "2026-10-28",
        image: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=600"
    },

    {
        id: 10,
        name: "Calamansi Juice",
        category: "Drinks",
        price: 65,
        stock: 25,
        expiry: "2026-12-10",
        image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=600"
    },

    {
        id: 11,
        name: "Banana Chips",
        category: "Chips",
        price: 55,
        stock: 30,
        expiry: "2027-01-10",
        image: "https://images.unsplash.com/photo-1621447504864-d8686e12698c?w=600"
    },

    {
        id: 12,
        name: "Kangkong Chips",
        category: "Chips",
        price: 60,
        stock: 4,
        expiry: "2026-10-18",
        image: "https://images.unsplash.com/photo-1621939514649-280e2aa1f926?w=600"
    },

    {
        id: 13,
        name: "Okra Chips",
        category: "Chips",
        price: 60,
        stock: 12,
        expiry: "2026-12-12",
        image: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=600"
    },

    {
        id: 14,
        name: "Coconut Chips",
        category: "Chips",
        price: 65,
        stock: 7,
        expiry: "2026-11-25",
        image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=600"
    },

    {
        id: 15,
        name: "Pumpkin Chips",
        category: "Chips",
        price: 60,
        stock: 0,
        expiry: "2026-10-02",
        image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600"
    }

];


let products =
    JSON.parse(localStorage.getItem("leafsale_products"))
    || defaultProducts;


let cart =
    JSON.parse(localStorage.getItem("leafsale_cart"))
    || [];


let sales =
    JSON.parse(localStorage.getItem("leafsale_sales"))
    || [];


let customers =
    JSON.parse(localStorage.getItem("leafsale_customers"))
    || [

        {
            id: 1,
            name: "Ana Garcia",
            phone: "09171234567",
            email: "ana@email.com",
            purchases: 15,
            spent: 4850,
            status: "VIP"
        },

        {
            id: 2,
            name: "Mark Santos",
            phone: "09281234567",
            email: "mark@email.com",
            purchases: 8,
            spent: 2200,
            status: "Active"
        },

        {
            id: 3,
            name: "Sofia Reyes",
            phone: "09391234567",
            email: "sofia@email.com",
            purchases: 21,
            spent: 7200,
            status: "VIP"
        }

    ];


let currentCategory = "All";


/* INITIALIZATION */

document.addEventListener("DOMContentLoaded", () => {

    lucide.createIcons();

    setupNavigation();

    setupLogin();

    renderPage("dashboard");

    updateCartStorage();

});


/* INTERACTIVE LOG-IN */

function setupLogin() {

    const loginForm =
        document.getElementById("loginForm");

    loginForm.addEventListener("submit", function(e) {

        e.preventDefault();

        const username =
            document.getElementById("loginUsername").value;

        const password =
            document.getElementById("loginPassword").value;

        if (!username || !password) {

            showToast("Please enter your login information.");

            return;
        }

        localStorage.setItem(
            "leafsale_logged_in",
            "true"
        );

        document
            .getElementById("loginPage")
            .classList.add("hidden");

        document
            .getElementById("app")
            .classList.remove("hidden");

        showToast("Welcome to LeafSALE!");

    });

}


let selectedProvider = "";


/* OPEN LOGIN */

function openLogin(provider) {

    selectedProvider = provider;

    const popup = document.getElementById("loginPopup");

    const title = document.getElementById("providerTitle");

    const text = document.getElementById("providerText");

    const icon = document.getElementById("providerIcon");

    const button = document.getElementById("loginButton");

    document.getElementById("loginEmail").value = "";
    document.getElementById("loginPassword").value = "";

    document.getElementById("errorMessage").textContent = "";


    /* GOOGLE */

    if (provider === "google") {

        title.textContent = "Sign in with Google";

        text.textContent =
            "Use your Google Account to continue.";

        button.style.background = "#17633f";

        icon.innerHTML = `
            <svg width="40" height="40" viewBox="0 0 24 24">

                <path fill="#4285F4"
                d="M21.35 12.23c0-.79-.07-1.55-.22-2.27H12v4.3h5.24a4.48 4.48 0 0 1-1.94 2.94v2.45h3.14c1.84-1.69 2.91-4.18 2.91-7.42z"/>

                <path fill="#34A853"
                d="M12 21.96c2.63 0 4.84-.87 6.45-2.35l-3.14-2.45c-.87.58-1.98.92-3.31.92-2.54 0-4.69-1.72-5.46-4.03H3.3v2.53A9.74 9.74 0 0 0 12 21.96z"/>

                <path fill="#FBBC05"
                d="M6.54 14.05A5.86 5.86 0 0 1 6.23 12c0-.71.12-1.4.31-2.05V7.42H3.3A9.96 9.96 0 0 0 2.25 12c0 1.61.39 3.14 1.05 4.58l3.24-2.53z"/>

                <path fill="#EA4335"
                d="M12 5.92c1.43 0 2.71.49 3.72 1.46l2.79-2.79C16.84 2.99 14.63 2.04 12 2.04a9.74 9.74 0 0 0-8.7 5.38l3.24 2.53C7.31 7.64 9.46 5.92 12 5.92z"/>

            </svg>
        `;
    }


    /* FACEBOOK */

    if (provider === "facebook") {

        title.textContent = "Log in with Facebook";

        text.textContent =
            "Use your Facebook Account to continue.";

        button.style.background = "#17633f";

        icon.innerHTML = `
            <svg width="40" height="40" viewBox="0 0 24 24">

                <path
                fill="#1877F2"
                d="M24 12.07C24 5.41 18.63 0 12 0S0 5.41 0 12.07C0 18.09 4.39 23.07 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.05 1.79-4.74 4.59-4.74 1.33 0 2.72.24 2.72.24v3.01h-1.53c-1.51 0-1.98.94-1.98 1.9v2.28h3.37l-.54 3.49h-2.83V24C19.61 23.07 24 18.09 24 12.07z"/>

            </svg>
        `;
    }


    popup.style.display = "flex";
}


/* LOGIN */

function loginAccount() {

    const email =
        document.getElementById("loginEmail").value.trim();

    const password =
        document.getElementById("loginPassword").value.trim();

    const error =
        document.getElementById("errorMessage");


    /* CHECK INPUT */

    if (email === "" || password === "") {

        error.textContent =
            "Please enter your email and password.";

        return;
    }


    /* CLOSE LOGIN */

    document.getElementById("loginPopup").style.display = "none";


    /* SHOW SUCCESS */

    const success =
        document.getElementById("successPopup");

    const successText =
        document.getElementById("successText");


    if (selectedProvider === "google") {

        successText.textContent =
            "You successfully logged in with Google.";

    }

    else if (selectedProvider === "facebook") {

        successText.textContent =
            "You successfully logged in with Facebook.";

    }


    success.style.display = "flex";
}


/* CLOSE LOGIN */

function closeLogin() {

    document.getElementById("loginPopup").style.display = "none";

}


/* CLOSE SUCCESS */

function closeSuccess() {

    document.getElementById("successPopup").style.display = "none";

}


/* CLICK OUTSIDE */

window.onclick = function(event) {

    const loginPopup =
        document.getElementById("loginPopup");

    const successPopup =
        document.getElementById("successPopup");


    if (event.target === loginPopup) {

        closeLogin();

    }


    if (event.target === successPopup) {

        closeSuccess();

    }

};

/* FOR NAVIGATION */

function setupNavigation() {

    document
        .querySelectorAll(".nav-item")
        .forEach(button => {

            button.addEventListener("click", () => {

                document
                    .querySelectorAll(".nav-item")
                    .forEach(item =>
                        item.classList.remove("active")
                    );

                button.classList.add("active");

                renderPage(
                    button.dataset.page
                );

            });

        });

}


function renderPage(page) {

    const content =
        document.getElementById("pageContent");

    switch(page) {

        case "dashboard":
            renderDashboard(content);
            break;

        case "products":
            renderProducts(content);
            break;

        case "inventory":
            renderInventory(content);
            break;

        case "pos":
            renderPOS(content);
            break;

        case "checkout":
            renderCheckout(content);
            break;

        case "history":
            renderHistory(content);
            break;

        case "customers":
            renderCustomers(content);
            break;

        case "reports":
            renderReports(content);
            break;

        case "settings":
            renderSettings(content);
            break;

        default:
            renderDashboard(content);

    }

    lucide.createIcons();

}


/* DASHBOARD */

function renderDashboard(content) {

    const totalSales =
        sales.reduce(
            (sum, sale) => sum + sale.total,
            0
        );

    content.innerHTML = `

        <div class="page-header">

            <div>
                <h1>Good morning, Admin 👋</h1>
                <p>Here's what's happening with your store today.</p>
            </div>

            <button class="primary-btn"
                onclick="goToPage('pos')">

                <i data-lucide="plus"></i>

                New Sale

            </button>

        </div>


        <div class="kpi-grid">

            ${kpi(
                "Total Sales",
                "₱" + totalSales.toLocaleString(),
                "trending-up",
                "+12.5%"
            )}

            ${kpi(
                "Total Products",
                products.length,
                "package",
                "Active products"
            )}

            ${kpi(
                "Total Customers",
                customers.length,
                "users",
                "Registered customers"
            )}

            ${kpi(
                "Transactions",
                sales.length,
                "receipt",
                "Completed sales"
            )}

        </div>


        <div class="dashboard-grid">

            <div class="card chart-box">

                <div class="card-title">

                    <div>
                        <h3>Sales Overview</h3>
                        <small>Weekly sales performance</small>
                    </div>

                    <span class="status success">
                        This Week
                    </span>

                </div>

                <canvas id="salesChart"></canvas>

            </div>


            <div class="card">

                <div class="card-title">

                    <div>
                        <h3>Top Selling Products</h3>
                        <small>Based on quantity sold</small>
                    </div>

                </div>

                ${products
                    .slice(0, 5)
                    .map((product, index) => `

                    <div class="cart-item">

                        <img
                            src="${product.image}"
                            class="product-img"
                        >

                        <div class="cart-item-info">

                            <strong>
                                ${product.name}
                            </strong>

                            <small>
                                ${20 - index * 2} sold
                            </small>

                        </div>

                        <strong>
                            ₱${product.price}
                        </strong>

                    </div>

                `)
                .join("")}

            </div>

        </div>


        <div class="table-card">

            <div class="table-toolbar">

                <div>
                    <strong style="font-size:13px">
                        Recent Transactions
                    </strong>
                </div>

                <button
                    class="secondary-btn"
                    onclick="goToPage('history')"
                >
                    View All
                </button>

            </div>

            <table>

                <thead>
                    <tr>
                        <th>Invoice</th>
                        <th>Date / Time</th>
                        <th>Customer</th>
                        <th>Items</th>
                        <th>Total</th>
                        <th>Status</th>
                    </tr>
                </thead>

                <tbody>

                    ${sales.length === 0
                        ? `
                        <tr>
                            <td colspan="6"
                                style="text-align:center;color:#74857d">
                                No transactions yet.
                            </td>
                        </tr>
                        `
                        : sales.slice(-5).reverse()
                            .map(sale => `

                            <tr>

                                <td>
                                    #${sale.invoice}
                                </td>

                                <td>
                                    ${sale.date}
                                </td>

                                <td>
                                    ${sale.customer}
                                </td>

                                <td>
                                    ${sale.items}
                                </td>

                                <td>
                                    ₱${sale.total.toFixed(2)}
                                </td>

                                <td>
                                    <span class="status success">
                                        Completed
                                    </span>
                                </td>

                            </tr>

                        `).join("")
                    }

                </tbody>

            </table>

        </div>

    `;

    lucide.createIcons();

    createSalesChart();

}


function kpi(title, value, icon, change) {

    return `

        <div class="kpi-card">

            <div class="kpi-top">

                <small>${title}</small>

                <div class="kpi-icon">
                    <i data-lucide="${icon}"></i>
                </div>

            </div>

            <h2>${value}</h2>

            <div class="kpi-change">
                ${change}
            </div>

        </div>

    `;

}


function createSalesChart() {

    const canvas =
        document.getElementById("salesChart");

    if (!canvas) return;

    new Chart(canvas, {

        type: "line",

        data: {

            labels: [
                "Mon",
                "Tue",
                "Wed",
                "Thu",
                "Fri",
                "Sat",
                "Sun"
            ],

            datasets: [

                {
                    label: "Sales",

                    data: [
                        3200,
                        4500,
                        3800,
                        5900,
                        5200,
                        7100,
                        6400
                    ],

                    borderColor: "#17633f",

                    backgroundColor:
                        "rgba(23,99,63,.08)",

                    fill: true,

                    tension: .4
                }

            ]

        },

        options: {

            responsive: true,

            maintainAspectRatio: false,

            plugins: {
                legend: {
                    display: false
                }
            },

            scales: {

                y: {
                    beginAtZero: true,

                    grid: {
                        color: "#edf2ef"
                    }
                },

                x: {
                    grid: {
                        display: false
                    }
                }

            }

        }

    });

}


/* PRODUCT MANAGEMENT */

function renderProducts(content) {

    content.innerHTML = `

        <div class="page-header">

            <div>
                <h1>Product Management</h1>
                <p>Add, edit and manage your products.</p>
            </div>

            <button
                class="primary-btn"
                onclick="openProductModal()"
            >
                <i data-lucide="plus"></i>
                Add Product
            </button>

        </div>


        <div class="table-card">

            <div class="table-toolbar">

                <div class="table-search">

                    <i data-lucide="search"></i>

                    <input
                        id="productSearch"
                        placeholder="Search products..."
                        oninput="filterProducts()"
                    >

                </div>

                <select
                    class="form-control"
                    style="width:150px"
                    onchange="filterProducts()"
                    id="productCategoryFilter"
                >

                    <option value="All">All Categories</option>

                    <option value="Snacks">Snacks</option>

                    <option value="Drinks">Drinks</option>

                    <option value="Chips">Chips</option>

                    <option value="Others">Others</option>

                </select>

            </div>


            <div id="productsTable"></div>

        </div>

    `;

    drawProductsTable(products);

}


function drawProductsTable(list) {

    const container =
        document.getElementById("productsTable");

    if (!container) return;

    container.innerHTML = `

        <table>

            <thead>

                <tr>

                    <th>Product</th>
                    <th>SKU</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Expiry</th>
                    <th>Status</th>
                    <th>Actions</th>

                </tr>

            </thead>

            <tbody>

                ${list.map(product => `

                    <tr>

                        <td>

                            <div class="product-cell">

                                <img
                                    src="${product.image}"
                                    class="product-img"
                                >

                                <strong>
                                    ${product.name}
                                </strong>

                            </div>

                        </td>

                        <td>
                            LS-${String(product.id).padStart(4,"0")}
                        </td>

                        <td>
                            ${product.category}
                        </td>

                        <td>
                            ₱${product.price.toFixed(2)}
                        </td>

                        <td>
                            ${product.stock}
                        </td>

                        <td>
                            ${product.expiry}
                        </td>

                        <td>
                            ${stockStatus(product.stock)}
                        </td>

                        <td>

                            <button
                                class="icon-btn"
                                onclick="editProduct(${product.id})"
                            >
                                <i data-lucide="edit-2"></i>
                            </button>

                            <button
                                class="icon-btn"
                                onclick="deleteProduct(${product.id})"
                            >
                                <i data-lucide="trash-2"></i>
                            </button>

                        </td>

                    </tr>

                `).join("")}

            </tbody>

        </table>

    `;

    lucide.createIcons();

}


function stockStatus(stock) {

    if (stock <= 0) {

        return `
            <span class="status danger">
                Out of Stock
            </span>
        `;

    }

    if (stock <= 5) {

        return `
            <span class="status warning">
                Low Stock
            </span>
        `;

    }

    return `
        <span class="status success">
            In Stock
        </span>
    `;

}


function filterProducts() {

    const search =
        document
            .getElementById("productSearch")
            ?.value
            .toLowerCase() || "";

    const category =
        document
            .getElementById("productCategoryFilter")
            ?.value || "All";

    const filtered =
        products.filter(product =>

            product.name
                .toLowerCase()
                .includes(search)

            &&

            (
                category === "All"
                ||
                product.category === category
            )

        );

    drawProductsTable(filtered);

}


function openProductModal(product = null) {

    const isEdit = !!product;

    showModal(`

        <div class="modal-header">

            <h2>
                ${isEdit ? "Edit Product" : "Add Product"}
            </h2>

            <button
                class="close-modal"
                onclick="closeModal()"
            >
                ×
            </button>

        </div>


        <form id="productForm">

            <div class="form-grid">

                <div class="form-group">

                    <label>Product Name</label>

                    <input
                        class="form-control"
                        id="productName"
                        value="${product?.name || ""}"
                        required
                    >

                </div>


                <div class="form-group">

                    <label>Category</label>

                    <select
                        class="form-control"
                        id="productCategory"
                    >

                        <option
                            ${product?.category === "Snacks" ? "selected" : ""}
                        >
                            Snacks
                        </option>

                        <option
                            ${product?.category === "Drinks" ? "selected" : ""}
                        >
                            Drinks
                        </option>

                        <option
                            ${product?.category === "Chips" ? "selected" : ""}
                        >
                            Chips
                        </option>

                        <option
                            ${product?.category === "Others" ? "selected" : ""}
                        >
                            Others
                        </option>

                    </select>

                </div>


                <div class="form-group">

                    <label>Selling Price</label>

                    <input
                        type="number"
                        class="form-control"
                        id="productPrice"
                        value="${product?.price || ""}"
                        required
                    >

                </div>


                <div class="form-group">

                    <label>Initial Stock</label>

                    <input
                        type="number"
                        class="form-control"
                        id="productStock"
                        value="${product?.stock || 0}"
                        required
                    >

                </div>


                <div class="form-group">

                    <label>Expiration Date</label>

                    <input
                        type="date"
                        class="form-control"
                        id="productExpiry"
                        value="${product?.expiry || ""}"
                    >

                </div>


                <div class="form-group">

                    <label>Product Image URL</label>

                    <input
                        type="url"
                        class="form-control"
                        id="productImage"
                        value="${product?.image || ""}"
                        placeholder="https://..."
                    >

                </div>

            </div>


            <div style="margin-top:18px;display:flex;justify-content:flex-end;gap:8px">

                <button
                    type="button"
                    class="secondary-btn"
                    onclick="closeModal()"
                >
                    Cancel
                </button>

                <button
                    type="submit"
                    class="primary-btn"
                >
                    Save Product
                </button>

            </div>

        </form>

    `);


    document
        .getElementById("productForm")
        .addEventListener("submit", e => {

            e.preventDefault();

            const newProduct = {

                id:
                    product?.id
                    ||
                    Date.now(),

                name:
                    document
                        .getElementById("productName")
                        .value,

                category:
                    document
                        .getElementById("productCategory")
                        .value,

                price:
                    Number(
                        document
                            .getElementById("productPrice")
                            .value
                    ),

                stock:
                    Number(
                        document
                            .getElementById("productStock")
                            .value
                    ),

                expiry:
                    document
                        .getElementById("productExpiry")
                        .value,

                image:
                    document
                        .getElementById("productImage")
                        .value
                    ||
                    "https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?w=600"

            };


            if (isEdit) {

                products =
                    products.map(p =>
                        p.id === product.id
                            ? newProduct
                            : p
                    );

                showToast("Product updated.");

            } else {

                products.push(newProduct);

                showToast("Product added.");

            }


            saveProducts();

            closeModal();

            renderProducts(
                document.getElementById("pageContent")
            );

        });

}


function editProduct(id) {

    const product =
        products.find(p => p.id === id);

    if (product) {

        openProductModal(product);

    }

}


function deleteProduct(id) {

    const product =
        products.find(p => p.id === id);

    if (!product) return;

    if (
        confirm(
            `Delete ${product.name}?`
        )
    ) {

        products =
            products.filter(
                p => p.id !== id
            );

        saveProducts();

        renderProducts(
            document.getElementById("pageContent")
        );

        showToast("Product deleted.");

    }

}


function saveProducts() {

    localStorage.setItem(
        "leafsale_products",
        JSON.stringify(products)
    );

}


/* INVENTORY */

function renderInventory(content) {

    const lowStock =
        products.filter(p => p.stock > 0 && p.stock <= 5);

    const outStock =
        products.filter(p => p.stock <= 0);

    const nearExpiry =
        products.filter(p => isNearExpiry(p.expiry));

    content.innerHTML = `

        <div class="page-header">

            <div>

                <h1>Inventory</h1>

                <p>
                    Monitor stock levels and product expiration.
                </p>

            </div>

            <button
                class="primary-btn"
                onclick="openStockModal()"
            >
                <i data-lucide="plus"></i>
                Add Stock
            </button>

        </div>


        <div class="alert-grid">

            <div class="alert-card success">

                <div class="alert-icon">
                    <i data-lucide="package-check"></i>
                </div>

                <div>
                    <h3>
                        ${products.length}
                    </h3>

                    <p>Total Products</p>
                </div>

            </div>


            <div class="alert-card warning">

                <div class="alert-icon">
                    <i data-lucide="alert-triangle"></i>
                </div>

                <div>
                    <h3>
                        ${lowStock.length}
                    </h3>

                    <p>Low Stock Items</p>
                </div>

            </div>


            <div class="alert-card danger">

                <div class="alert-icon">
                    <i data-lucide="package-x"></i>
                </div>

                <div>
                    <h3>
                        ${outStock.length}
                    </h3>

                    <p>Out of Stock</p>
                </div>

            </div>

        </div>


        ${nearExpiry.length > 0 ? `

            <div class="card"
                style="margin-bottom:18px;border-left:4px solid #e5a83d">

                <div class="card-title">

                    <div>
                        <h3>Expiration Warning</h3>

                        <small>
                            Products approaching expiration
                        </small>
                    </div>

                    <i
                        data-lucide="calendar-clock"
                        style="color:#e5a83d"
                    ></i>

                </div>

                ${nearExpiry.map(p => `

                    <div class="cart-item">

                        <img
                            src="${p.image}"
                            class="product-img"
                        >

                        <div class="cart-item-info">

                            <strong>${p.name}</strong>

                            <small>
                                Expiration: ${p.expiry}
                            </small>

                        </div>

                        <span class="status warning">
                            Near Expiry
                        </span>

                    </div>

                `).join("")}

            </div>

        ` : ""}


        <div class="table-card">

            <div class="table-toolbar">

                <strong style="font-size:13px">
                    Stock Monitoring
                </strong>

            </div>

            <table>

                <thead>

                    <tr>
                        <th>Product</th>
                        <th>Category</th>
                        <th>Current Stock</th>
                        <th>Expiry</th>
                        <th>Status</th>
                    </tr>

                </thead>

                <tbody>

                    ${products.map(p => `

                        <tr>

                            <td>

                                <div class="product-cell">

                                    <img
                                        src="${p.image}"
                                        class="product-img"
                                    >

                                    <strong>
                                        ${p.name}
                                    </strong>

                                </div>

                            </td>

                            <td>${p.category}</td>

                            <td>${p.stock}</td>

                            <td>${p.expiry}</td>

                            <td>
                                ${stockStatus(p.stock)}
                            </td>

                        </tr>

                    `).join("")}

                </tbody>

            </table>

        </div>

    `;

    lucide.createIcons();

}


function isNearExpiry(dateString) {

    if (!dateString) return false;

    const expiry =
        new Date(dateString);

    const today =
        new Date();

    const difference =
        (expiry - today)
        /
        (1000 * 60 * 60 * 24);

    return difference <= 30;

}


function openStockModal() {

    showModal(`

        <div class="modal-header">

            <h2>Add Stock</h2>

            <button
                class="close-modal"
                onclick="closeModal()"
            >
                ×
            </button>

        </div>


        <div class="form-group">

            <label>Product</label>

            <select
                class="form-control"
                id="stockProduct"
            >

                ${products.map(p => `

                    <option value="${p.id}">
                        ${p.name}
                    </option>

                `).join("")}

            </select>

        </div>


        <div class="form-group" style="margin-top:12px">

            <label>Quantity</label>

            <input
                class="form-control"
                type="number"
                id="stockQuantity"
                min="1"
                value="1"
            >

        </div>


        <button
            class="primary-btn"
            style="margin-top:18px"
            onclick="addStock()"
        >
            Add Stock
        </button>

    `);

}


function addStock() {

    const id =
        Number(
            document
                .getElementById("stockProduct")
                .value
        );

    const quantity =
        Number(
            document
                .getElementById("stockQuantity")
                .value
        );

    const product =
        products.find(p => p.id === id);

    if (!product || quantity <= 0) return;

    product.stock += quantity;

    saveProducts();

    closeModal();

    renderInventory(
        document.getElementById("pageContent")
    );

    showToast(
        `${product.name}: +${quantity} stock`
    );

}


/* SALE/POS */

function renderPOS(content) {

    content.innerHTML = `

        <div class="page-header">

            <div>
                <h1>Sales / POS</h1>
                <p>Create a new customer order.</p>
            </div>

        </div>


        <div class="pos-layout">

            <div>

                <div class="category-tabs">

                    ${[
                        "All",
                        "Chips",
                        "Drinks",
                        "Snacks",
                        "Others"
                    ].map(category => `

                        <button
                            class="category-tab
                            ${currentCategory === category ? "active" : ""}"
                            onclick="setCategory('${category}')"
                        >
                            ${category}
                        </button>

                    `).join("")}

                </div>


                <div class="product-grid">

                    ${products
                        .filter(p =>
                            currentCategory === "All"
                            ||
                            p.category === currentCategory
                        )
                        .map(product => `

                            <div
                                class="product-card"
                                onclick="addToCart(${product.id})"
                            >

                                <img
                                    src="${product.image}"
                                    class="product-card-image"
                                >

                                <div class="product-card-body">

                                    <h3>
                                        ${product.name}
                                    </h3>

                                    <div class="product-price">
                                        ₱${product.price.toFixed(2)}
                                    </div>

                                    <div class="product-stock">

                                        ${
                                            product.stock <= 0
                                            ? "Out of stock"
                                            : `${product.stock} in stock`
                                        }

                                    </div>

                                </div>

                            </div>

                        `)
                        .join("")}

                </div>

            </div>


            <div class="card cart-panel">

                <div class="card-title">

                    <div>

                        <h3>Current Order</h3>

                        <small>
                            ${cart.length} item types
                        </small>

                    </div>

                    <button
                        class="secondary-btn"
                        onclick="clearCart()"
                    >
                        Clear
                    </button>

                </div>


                <div id="cartItems">

                    ${renderCartItems()}

                </div>

            </div>

        </div>

    `;

    lucide.createIcons();

}


function setCategory(category) {

    currentCategory = category;

    renderPOS(
        document.getElementById("pageContent")
    );

}


function addToCart(productId) {

    const product =
        products.find(p => p.id === productId);

    if (!product) return;

    if (product.stock <= 0) {

        showToast(
            `${product.name} is out of stock!`
        );

        return;

    }


    const existing =
        cart.find(
            item => item.id === productId
        );


    if (existing) {

        if (existing.quantity >= product.stock) {

            showToast(
                `Only ${product.stock} available.`
            );

            return;

        }

        existing.quantity++;

    } else {

        cart.push({

            id: product.id,

            quantity: 1

        });

    }


    updateCartStorage();

    renderPOS(
        document.getElementById("pageContent")
    );

}


function changeQuantity(id, amount) {

    const item =
        cart.find(i => i.id === id);

    if (!item) return;

    const product =
        products.find(p => p.id === id);

    item.quantity += amount;

    if (item.quantity <= 0) {

        cart =
            cart.filter(
                i => i.id !== id
            );

    }

    if (
        product
        &&
        item.quantity > product.stock
    ) {

        item.quantity = product.stock;

        showToast(
            "Cannot exceed available stock."
        );

    }

    updateCartStorage();

    renderPOS(
        document.getElementById("pageContent")
    );

}


function removeFromCart(id) {

    cart =
        cart.filter(
            item => item.id !== id
        );

    updateCartStorage();

    renderPOS(
        document.getElementById("pageContent")
    );

}


function clearCart() {

    cart = [];

    updateCartStorage();

    renderPOS(
        document.getElementById("pageContent")
    );

}


function renderCartItems() {

    if (cart.length === 0) {

        return `

            <div
                style="
                    text-align:center;
                    padding:40px 10px;
                    color:#74857d
                "
            >

                <i
                    data-lucide="shopping-cart"
                    style="width:30px"
                ></i>

                <p style="font-size:10px;margin-top:10px">
                    Your cart is empty.
                </p>

            </div>

        `;

    }


    const subtotal =
        getCartTotal();


    return `

        ${cart.map(item => {

            const product =
                products.find(
                    p => p.id === item.id
                );

            return `

                <div class="cart-item">

                    <img
                        src="${product.image}"
                    >

                    <div class="cart-item-info">

                        <strong>
                            ${product.name}
                        </strong>

                        <small>
                            ₱${product.price.toFixed(2)}
                        </small>

                    </div>

                    <div>

                        <div class="quantity-control">

                            <button
                                onclick="changeQuantity(
                                    ${product.id},
                                    -1
                                )"
                            >
                                -
                            </button>

                            <span>
                                ${item.quantity}
                            </span>

                            <button
                                onclick="changeQuantity(
                                    ${product.id},
                                    1
                                )"
                            >
                                +
                            </button>

                        </div>

                    </div>

                    <button
                        class="icon-btn"
                        onclick="removeFromCart(${product.id})"
                    >
                        <i data-lucide="trash-2"></i>
                    </button>

                </div>

            `;

        }).join("")}


        <div class="cart-total">

            <div class="total-row">

                <span>Subtotal</span>

                <strong>
                    ₱${subtotal.toFixed(2)}
                </strong>

            </div>

            <div class="total-row">

                <span>Tax (12%)</span>

                <strong>
                    ₱${(subtotal * .12).toFixed(2)}
                </strong>

            </div>

            <div class="total-row final">

                <span>Total</span>

                <strong>
                    ₱${(subtotal * 1.12).toFixed(2)}
                </strong>

            </div>

            <button
                class="checkout-btn"
                onclick="goToCheckout()"
            >
                Proceed to Checkout
            </button>

        </div>

    `;

}


function getCartTotal() {

    return cart.reduce(
        (total, item) => {

            const product =
                products.find(
                    p => p.id === item.id
                );

            return total +
                product.price *
                item.quantity;

        },
        0
    );

}


function updateCartStorage() {

    localStorage.setItem(
        "leafsale_cart",
        JSON.stringify(cart)
    );

}


/* CHECKOUT */

function renderCheckout(content) {

    const subtotal =
        getCartTotal();

    const tax =
        subtotal * .12;

    const total =
        subtotal + tax;


    content.innerHTML = `

        <div class="page-header">

            <div>

                <h1>Checkout</h1>

                <p>
                    Complete the customer's payment.
                </p>

            </div>

        </div>


        <div class="dashboard-grid">

            <div class="card">

                <div class="card-title">

                    <h3>Order Summary</h3>

                </div>

                ${cart.map(item => {

                    const product =
                        products.find(
                            p => p.id === item.id
                        );

                    return `

                        <div class="cart-item">

                            <img
                                src="${product.image}"
                                class="product-img"
                            >

                            <div class="cart-item-info">

                                <strong>
                                    ${product.name}
                                </strong>

                                <small>
                                    ${item.quantity} ×
                                    ₱${product.price}
                                </small>

                            </div>

                            <strong>
                                ₱${(
                                    product.price *
                                    item.quantity
                                ).toFixed(2)}
                            </strong>

                        </div>

                    `;

                }).join("")}


                <div class="cart-total">

                    <div class="total-row">

                        <span>Subtotal</span>

                        <strong>
                            ₱${subtotal.toFixed(2)}
                        </strong>

                    </div>

                    <div class="total-row">

                        <span>Tax 12%</span>

                        <strong>
                            ₱${tax.toFixed(2)}
                        </strong>

                    </div>

                    <div class="total-row final">

                        <span>Total</span>

                        <strong>
                            ₱${total.toFixed(2)}
                        </strong>

                    </div>

                </div>

            </div>


            <div class="card">

                <div class="card-title">

                    <h3>Payment</h3>

                </div>


                <div class="form-group">

                    <label>Customer</label>

                    <select
                        class="form-control"
                        id="checkoutCustomer"
                    >

                        <option value="Walk-in Customer">
                            Walk-in Customer
                        </option>

                        ${customers.map(c => `

                            <option value="${c.name}">
                                ${c.name}
                            </option>

                        `).join("")}

                    </select>

                </div>


                <div class="form-group"
                    style="margin-top:15px">

                    <label>Payment Method</label>

                    <select
                        class="form-control"
                        id="paymentMethod"
                    >

                        <option>Cash</option>
                        <option>Card</option>
                        <option>E-Wallet</option>

                    </select>

                </div>


                <div class="form-group"
                    style="margin-top:15px">

                    <label>Amount Received</label>

                    <input
                        type="number"
                        class="form-control"
                        id="amountReceived"
                        placeholder="₱0.00"
                        oninput="calculateChange(${total})"
                    >

                </div>


                <div
                    class="card"
                    style="
                        margin-top:15px;
                        background:#f3faf5;
                        box-shadow:none;
                    "
                >

                    <div class="total-row">

                        <span>Total</span>

                        <strong>
                            ₱${total.toFixed(2)}
                        </strong>

                    </div>

                    <div class="total-row">

                        <span>Amount Received</span>

                        <strong id="receivedDisplay">
                            ₱0.00
                        </strong>

                    </div>

                    <div class="total-row final">

                        <span>Change / Difference</span>

                        <strong id="changeDisplay">
                            ₱0.00
                        </strong>

                    </div>

                </div>


                <button
                    class="checkout-btn"
                    onclick="completeSale(${total})"
                >
                    Complete Sale
                </button>

            </div>

        </div>

    `;

    lucide.createIcons();

}


function calculateChange(total) {

    const amount =
        Number(
            document
                .getElementById("amountReceived")
                .value
        ) || 0;

    const change =
        amount - total;

    document
        .getElementById("receivedDisplay")
        .textContent =
            "₱" + amount.toFixed(2);

    document
        .getElementById("changeDisplay")
        .textContent =
            "₱" + Math.max(change, 0).toFixed(2);

}


function completeSale(total) {

    const received =
        Number(
            document
                .getElementById("amountReceived")
                .value
        ) || 0;

    if (cart.length === 0) {

        showToast(
            "Your cart is empty."
        );

        return;

    }


    if (received < total) {

        showToast(
            "Insufficient payment."
        );

        return;

    }


    const customer =
        document
            .getElementById("checkoutCustomer")
            .value;

    const method =
        document
            .getElementById("paymentMethod")
            .value;


    cart.forEach(item => {

        const product =
            products.find(
                p => p.id === item.id
            );

        if (product) {

            product.stock -= item.quantity;

        }

    });


    const sale = {

        invoice:
            Date.now()
                .toString()
                .slice(-6),

        date:
            new Date()
                .toLocaleString(),

        customer,

        items:
            cart.reduce(
                (sum, item) =>
                    sum + item.quantity,
                0
            ),

        total,

        payment:
            method,

        received,

        change:
            received - total

    };


    sales.push(sale);

    localStorage.setItem(
        "leafsale_sales",
        JSON.stringify(sales)
    );


    saveProducts();


    cart = [];

    updateCartStorage();


    showToast(
        `Sale completed! Change: ₱${sale.change.toFixed(2)}`
    );


    renderDashboard(
        document.getElementById("pageContent")
    );

}


/* SALES HISTORY */

function renderHistory(content) {

    content.innerHTML = `

        <div class="page-header">

            <div>

                <h1>Sales History</h1>

                <p>
                    View all completed transactions.
                </p>

            </div>

            <button
                class="secondary-btn"
                onclick="exportSales()"
            >
                <i data-lucide="download"></i>
                Export
            </button>

        </div>


        <div class="table-card">

            <div class="table-toolbar">

                <div class="table-search">

                    <i data-lucide="search"></i>

                    <input
                        id="historySearch"
                        placeholder="Search invoice or customer..."
                        oninput="filterHistory()"
                    >

                </div>

                <select
                    class="form-control"
                    style="width:150px"
                    id="historyPayment"
                    onchange="filterHistory()"
                >

                    <option value="All">
                        All Payments
                    </option>

                    <option>Cash</option>
                    <option>Card</option>
                    <option>E-Wallet</option>

                </select>

            </div>


            <div id="historyTable"></div>

        </div>

    `;

    drawHistory(sales);

}


function drawHistory(list) {

    document
        .getElementById("historyTable")
        .innerHTML = `

        <table>

            <thead>

                <tr>
                    <th>Invoice</th>
                    <th>Date</th>
                    <th>Customer</th>
                    <th>Items</th>
                    <th>Payment</th>
                    <th>Total</th>
                    <th>Action</th>
                </tr>

            </thead>

            <tbody>

                ${list.length === 0

                    ? `

                    <tr>

                        <td
                            colspan="7"
                            style="text-align:center"
                        >
                            No sales found.
                        </td>

                    </tr>

                    `

                    : list
                        .slice()
                        .reverse()
                        .map(sale => `

                        <tr>

                            <td>
                                #${sale.invoice}
                            </td>

                            <td>
                                ${sale.date}
                            </td>

                            <td>
                                ${sale.customer}
                            </td>

                            <td>
                                ${sale.items}
                            </td>

                            <td>
                                ${sale.payment}
                            </td>

                            <td>
                                ₱${sale.total.toFixed(2)}
                            </td>

                            <td>

                                <button
                                    class="secondary-btn"
                                    onclick="printReceipt('${sale.invoice}')"
                                >
                                    Receipt
                                </button>

                            </td>

                        </tr>

                    `).join("")
                }

            </tbody>

        </table>

    `;

}


function filterHistory() {

    const search =
        document
            .getElementById("historySearch")
            .value
            .toLowerCase();

    const payment =
        document
            .getElementById("historyPayment")
            .value;


    const filtered =
        sales.filter(sale =>

            (
                sale.invoice
                    .toLowerCase()
                    .includes(search)
                ||
                sale.customer
                    .toLowerCase()
                    .includes(search)
            )

            &&

            (
                payment === "All"
                ||
                sale.payment === payment
            )

        );


    drawHistory(filtered);

}


function printReceipt(invoice) {

    showToast(
        `Receipt #${invoice} ready to print.`
    );

    window.print();

}


function exportSales() {

    if (sales.length === 0) {

        showToast("No sales to export.");

        return;

    }


    const header =
        "Invoice,Date,Customer,Items,Payment,Total\n";


    const rows =
        sales.map(sale =>
            `${sale.invoice},"${sale.date}","${sale.customer}",${sale.items},${sale.payment},${sale.total}`
        ).join("\n");


    const blob =
        new Blob(
            [header + rows],
            {
                type: "text/csv"
            }
        );


    const url =
        URL.createObjectURL(blob);


    const a =
        document.createElement("a");

    a.href = url;

    a.download =
        "leafsale-sales.csv";

    a.click();

    URL.revokeObjectURL(url);

}


/* CUSTOMERS */

function renderCustomers(content) {

    content.innerHTML = `

        <div class="page-header">

            <div>

                <h1>Customers</h1>

                <p>
                    Manage your customer relationships.
                </p>

            </div>

            <button
                class="primary-btn"
                onclick="openCustomerModal()"
            >
                <i data-lucide="user-plus"></i>
                Add Customer
            </button>

        </div>


        <div class="kpi-grid">

            ${kpi(
                "Customers",
                customers.length,
                "users",
                "Registered"
            )}

            ${kpi(
                "VIP Customers",
                customers.filter(
                    c => c.status === "VIP"
                ).length,
                "star",
                "Loyal customers"
            )}

            ${kpi(
                "Total Purchases",
                customers.reduce(
                    (s,c) => s+c.purchases,
                    0
                ),
                "shopping-bag",
                "All customers"
            )}

            ${kpi(
                "Total Spent",
                "₱" +
                customers.reduce(
                    (s,c) => s+c.spent,
                    0
                ).toLocaleString(),
                "wallet",
                "Customer value"
            )}

        </div>


        <div class="table-card">

            <table>

                <thead>

                    <tr>
                        <th>Customer</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>Purchases</th>
                        <th>Total Spent</th>
                        <th>Status</th>
                    </tr>

                </thead>

                <tbody>

                    ${customers.map(c => `

                        <tr>

                            <td>
                                <strong>${c.name}</strong>
                            </td>

                            <td>${c.phone}</td>

                            <td>${c.email}</td>

                            <td>${c.purchases}</td>

                            <td>
                                ₱${c.spent.toLocaleString()}
                            </td>

                            <td>

                                <span
                                    class="status ${
                                        c.status === "VIP"
                                        ? "warning"
                                        : "success"
                                    }"
                                >
                                    ${c.status}
                                </span>

                            </td>

                        </tr>

                    `).join("")}

                </tbody>

            </table>

        </div>

    `;

    lucide.createIcons();

}


function openCustomerModal() {

    showModal(`

        <div class="modal-header">

            <h2>Add Customer</h2>

            <button
                class="close-modal"
                onclick="closeModal()"
            >
                ×
            </button>

        </div>


        <div class="form-group">

            <label>Customer Name</label>

            <input
                class="form-control"
                id="customerName"
            >

        </div>


        <div class="form-group"
            style="margin-top:12px">

            <label>Phone</label>

            <input
                class="form-control"
                id="customerPhone"
            >

        </div>


        <div class="form-group"
            style="margin-top:12px">

            <label>Email</label>

            <input
                class="form-control"
                id="customerEmail"
            >

        </div>


        <button
            class="primary-btn"
            style="margin-top:18px"
            onclick="addCustomer()"
        >
            Save Customer
        </button>

    `);

}


function addCustomer() {

    const name =
        document
            .getElementById("customerName")
            .value;

    const phone =
        document
            .getElementById("customerPhone")
            .value;

    const email =
        document
            .getElementById("customerEmail")
            .value;


    if (!name) {

        showToast(
            "Customer name is required."
        );

        return;

    }


    customers.push({

        id: Date.now(),

        name,

        phone,

        email,

        purchases: 0,

        spent: 0,

        status: "Active"

    });


    localStorage.setItem(
        "leafsale_customers",
        JSON.stringify(customers)
    );


    closeModal();

    renderCustomers(
        document.getElementById("pageContent")
    );

    showToast(
        "Customer added successfully."
    );

}


/* REPORTS */

function renderReports(content) {

    content.innerHTML = `

        <div class="page-header">

            <div>

                <h1>Reports & Analytics</h1>

                <p>
                    Understand your business performance.
                </p>

            </div>

            <button
                class="primary-btn"
                onclick="showToast('Report exported successfully.')"
            >
                <i data-lucide="download"></i>
                Export Report
            </button>

        </div>


        <div class="dashboard-grid">

            <div class="card chart-box">

                <div class="card-title">

                    <h3>Sales Trend</h3>

                    <select class="form-control"
                        style="width:110px">
                        <option>Weekly</option>
                        <option>Monthly</option>
                        <option>Yearly</option>
                    </select>

                </div>

                <canvas id="reportSalesChart"></canvas>

            </div>


            <div class="card">

                <div class="card-title">
                    <h3>Sales by Category</h3>
                </div>

                <canvas
                    id="categoryChart"
                    style="height:230px"
                ></canvas>

            </div>

        </div>


        <div class="dashboard-grid">

            <div class="card">

                <div class="card-title">
                    <h3>Payment Methods</h3>
                </div>

                <canvas
                    id="paymentChart"
                    style="height:230px"
                ></canvas>

            </div>


            <div class="card">

                <div class="card-title">
                    <h3>Top Products</h3>
                </div>

                ${products
                    .slice(0,5)
                    .map((p,i) => `

                    <div class="cart-item">

                        <div class="cart-item-info">

                            <strong>
                                ${i+1}. ${p.name}
                            </strong>

                            <small>
                                ${20-i*2} units sold
                            </small>

                        </div>

                        <strong>
                            ₱${p.price}
                        </strong>

                    </div>

                `).join("")}

            </div>

        </div>

    `;

    lucide.createIcons();

    createReportCharts();

}


function createReportCharts() {

    new Chart(
        document.getElementById(
            "reportSalesChart"
        ),
        {

            type: "line",

            data: {

                labels: [
                    "Mon",
                    "Tue",
                    "Wed",
                    "Thu",
                    "Fri",
                    "Sat",
                    "Sun"
                ],

                datasets: [{

                    data: [
                        3000,
                        4200,
                        3600,
                        6000,
                        5000,
                        7200,
                        6800
                    ],

                    borderColor: "#17633f",

                    tension: .4,

                    fill: false

                }]

            },

            options: {

                plugins: {
                    legend: {
                        display: false
                    }
                }

            }

        }

    );


    new Chart(
        document.getElementById(
            "categoryChart"
        ),
        {

            type: "bar",

            data: {

                labels: [
                    "Chips",
                    "Drinks",
                    "Snacks",
                    "Others"
                ],

                datasets: [{

                    data: [
                        120,
                        95,
                        150,
                        40
                    ],

                    backgroundColor: [
                        "#17633f",
                        "#35a866",
                        "#72c98d",
                        "#a7dfb9"
                    ]

                }]

            },

            options: {

                plugins: {
                    legend: {
                        display: false
                    }
                }

            }

        }

    );


    new Chart(
        document.getElementById(
            "paymentChart"
        ),
        {

            type: "doughnut",

            data: {

                labels: [
                    "Cash",
                    "Card",
                    "E-Wallet"
                ],

                datasets: [{

                    data: [
                        55,
                        20,
                        25
                    ],

                    backgroundColor: [
                        "#17633f",
                        "#35a866",
                        "#a7dfb9"
                    ]

                }]

            }

        }

    );

}


/* SETTINGS */

function renderSettings(content) {

    content.innerHTML = `

        <div class="page-header">

            <div>

                <h1>Settings</h1>

                <p>
                    Customize LeafSALE for your store.
                </p>

            </div>

        </div>


        <div class="settings-layout">


            <div class="settings-nav">

                <button
                    class="active"
                    onclick="settingsTab(this,'store')"
                >
                    Store Profile
                </button>

                <button
                    onclick="settingsTab(this,'regional')"
                >
                    Regional Settings
                </button>

                <button
                    onclick="settingsTab(this,'system')"
                >
                    System Preferences
                </button>

                <button
                    onclick="settingsTab(this,'backup')"
                >
                    Backup & Restore
                </button>

            </div>


            <div id="settingsContent">

                ${storeSettings()}

            </div>

        </div>

    `;

    lucide.createIcons();

}


function settingsTab(button, tab) {

    document
        .querySelectorAll(".settings-nav button")
        .forEach(b =>
            b.classList.remove("active")
        );

    button.classList.add("active");


    const container =
        document.getElementById(
            "settingsContent"
        );


    if (tab === "store") {

        container.innerHTML =
            storeSettings();

    }

    if (tab === "regional") {

        container.innerHTML =
            regionalSettings();

    }

    if (tab === "system") {

        container.innerHTML =
            systemSettings();

    }

    if (tab === "backup") {

        container.innerHTML =
            backupSettings();

    }


    lucide.createIcons();

}


function storeSettings() {

    return `

        <div class="card setting-section">

            <h3>Store Profile</h3>

            <p>
                Information displayed throughout your POS.
            </p>


            <div class="form-grid">

                <div class="form-group">

                    <label>Store Name</label>

                    <input
                        class="form-control"
                        value="LeafSALE"
                    >

                </div>


                <div class="form-group">

                    <label>Tagline</label>

                    <input
                        class="form-control"
                        value="Simple Sales. Fresh Growth."
                    >

                </div>


                <div class="form-group">

                    <label>Phone</label>

                    <input
                        class="form-control"
                        value="+63 900 000 0000"
                    >

                </div>


                <div class="form-group">

                    <label>Email</label>

                    <input
                        class="form-control"
                        value="hello@leafsale.com"
                    >

                </div>

            </div>


            <div class="form-group"
                style="margin-top:15px">

                <label>Store Address</label>

                <textarea class="form-control">
Philippines
                </textarea>

            </div>


            <button
                class="primary-btn"
                style="margin-top:15px"
                onclick="showToast('Store settings saved.')"
            >
                Save Changes
            </button>

        </div>

    `;

}


function regionalSettings() {

    return `

        <div class="card setting-section">

            <h3>Regional Settings</h3>

            <p>
                Configure currency, language and date formats.
            </p>


            <div class="form-grid">

                <div class="form-group">

                    <label>Currency</label>

                    <select class="form-control">

                        <option selected>
                            PHP - Philippine Peso ₱
                        </option>

                        <option>USD - US Dollar $</option>

                    </select>

                </div>


                <div class="form-group">

                    <label>Language</label>

                    <select class="form-control">

                        <option selected>
                            English
                        </option>

                        <option>
                            Filipino
                        </option>

                    </select>

                </div>


                <div class="form-group">

                    <label>Date Format</label>

                    <select class="form-control">

                        <option>
                            MM/DD/YYYY
                        </option>

                        <option selected>
                            YYYY-MM-DD
                        </option>

                    </select>

                </div>


                <div class="form-group">

                    <label>Time Format</label>

                    <select class="form-control">

                        <option selected>
                            12 Hour
                        </option>

                        <option>
                            24 Hour
                        </option>

                    </select>

                </div>

            </div>

            <button
                class="primary-btn"
                style="margin-top:15px"
                onclick="showToast('Regional settings saved.')"
            >
                Save Settings
            </button>

        </div>

    `;

}


function systemSettings() {

    return `

        <div class="card setting-section">

            <h3>System Preferences</h3>

            <p>
                Control notifications and interface behavior.
            </p>


            ${toggleSetting(
                "Low Stock Notifications",
                "Notify when products reach low stock.",
                true,
                "lowStock"
            )}


            ${toggleSetting(
                "Expiration Alerts",
                "Warn when products are near expiration.",
                true,
                "expiry"
            )}


            ${toggleSetting(
                "Sound Effects",
                "Play sounds for POS actions.",
                false,
                "sound"
            )}


            ${toggleSetting(
                "Dark Mode",
                "Use the dark green interface.",
                document.body.classList.contains("dark-mode"),
                "dark"
            )}

        </div>

    `;

}


function toggleSetting(
    title,
    description,
    active,
    id
) {

    return `

        <div class="toggle-row">

            <div>

                <strong>
                    ${title}
                </strong>

                <small>
                    ${description}
                </small>

            </div>

            <button
                class="toggle ${active ? "active" : ""}"
                onclick="handleSetting('${id}', this)"
            ></button>

        </div>

    `;

}


function handleSetting(id, button) {

    button.classList.toggle("active");


    if (id === "dark") {

        document
            .body
            .classList.toggle(
                "dark-mode"
            );

    }


    showToast(
        `${id} setting updated.`
    );

}


function backupSettings() {

    return `

        <div class="card setting-section">

            <h3>Data Backup & Restore</h3>

            <p>
                Protect your LeafSALE browser data.
            </p>


            <button
                class="primary-btn"
                onclick="backupData()"
            >
                <i data-lucide="download"></i>
                Download Backup
            </button>


            <button
                class="secondary-btn"
                style="margin-left:8px"
                onclick="document.getElementById('restoreFile').click()"
            >
                <i data-lucide="upload"></i>
                Restore Data
            </button>


            <input
                type="file"
                id="restoreFile"
                accept=".json"
                style="display:none"
                onchange="restoreData(event)"
            >

        </div>

    `;

}


function backupData() {

    const data = {

        products,

        customers,

        sales,

        cart,

        date:
            new Date().toISOString()

    };


    const blob =
        new Blob(
            [
                JSON.stringify(
                    data,
                    null,
                    2
                )
            ],
            {
                type: "application/json"
            }
        );


    const url =
        URL.createObjectURL(blob);


    const a =
        document.createElement("a");

    a.href = url;

    a.download =
        "leafsale-backup.json";

    a.click();


    URL.revokeObjectURL(url);


    showToast(
        "Backup downloaded."
    );

}


function restoreData(event) {

    const file =
        event.target.files[0];

    if (!file) return;


    const reader =
        new FileReader();


    reader.onload =
        function(e) {

            try {

                const data =
                    JSON.parse(
                        e.target.result
                    );


                products =
                    data.products || products;

                customers =
                    data.customers || customers;

                sales =
                    data.sales || sales;

                cart =
                    data.cart || [];


                saveProducts();

                localStorage.setItem(
                    "leafsale_customers",
                    JSON.stringify(customers)
                );

                localStorage.setItem(
                    "leafsale_sales",
                    JSON.stringify(sales)
                );

                updateCartStorage();


                showToast(
                    "Data restored successfully."
                );


                renderDashboard(
                    document.getElementById(
                        "pageContent"
                    )
                );

            }

            catch {

                showToast(
                    "Invalid backup file."
                );

            }

        };


    reader.readAsText(file);

}


/* GENERAL HEPERS */

function goToPage(page) {

    document
        .querySelectorAll(".nav-item")
        .forEach(item => {

            item.classList.toggle(
                "active",
                item.dataset.page === page
            );

        });

    renderPage(page);

}


function goToCheckout() {

    goToPage("checkout");

}


function showModal(html) {

    document
        .getElementById("modalContent")
        .innerHTML = html;

    document
        .getElementById("modalOverlay")
        .classList.remove("hidden");

    lucide.createIcons();

}


function closeModal() {

    document
        .getElementById("modalOverlay")
        .classList.add("hidden");

}


function showToast(message) {

    const container =
        document.getElementById(
            "toastContainer"
        );


    const toast =
        document.createElement("div");

    toast.className = "toast";

    toast.textContent = message;


    container.appendChild(toast);


    setTimeout(() => {

        toast.remove();

    }, 3000);

}


function toggleDarkMode() {

    document
        .body
        .classList
        .toggle("dark-mode");

}


function toggleSidebar() {

    document
        .querySelector(".sidebar")
        .classList
        .toggle("open");

}


function showNotifications() {

    const lowStock =
        products.filter(
            p => p.stock <= 5
        );


    if (lowStock.length) {

        showToast(
            `${lowStock.length} product(s) need attention.`
        );

    } else {

        showToast(
            "No urgent inventory alerts."
        );

    }

}


function logout() {

    localStorage.removeItem(
        "leafsale_logged_in"
    );

    document
        .getElementById("app")
        .classList.add("hidden");

    document
        .getElementById("loginPage")
        .classList
        .remove("hidden");

}


/* GLOABAL SEARCH */

document
    .getElementById("globalSearch")
    ?.addEventListener(
        "keydown",
        function(e) {

            if (e.key !== "Enter") return;

            const search =
                this.value.toLowerCase();

            const product =
                products.find(
                    p =>
                        p.name
                            .toLowerCase()
                            .includes(search)
                );


            if (product) {

                goToPage("products");

                showToast(
                    `Found: ${product.name}`
                );

            } else {

                showToast(
                    "No matching product found."
                );

            }

        }
    );

