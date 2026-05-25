// Daftar produk dengan gambar
const products= [
    { id: 1, name: 'CHOPIE', price: 2000, img: 'chopie.jpg' },
    { id: 2, name: 'COCA-COLA', price: 1000, img: 'cocacola.jpg' },
    { id: 3, name: 'NABATI', price: 2000, img: 'nabati.jpg' },
    { id: 4, name: 'OREO MINI', price: 2000, img: 'oreo mini.jpg' },
    { id: 5, name: 'TICTAC', price: 2000, img: 'tictac.jpg' },
    { id: 6, name: 'TEH PUCUK', price: 2000, img: 'teh pucuk.jpg' },


];

// keranjang belanja
let cart = [];

// Fungsi untuk menampilkan daftar produk
function displayproducts() {
    const productsContainer = document.getElementById('products');
    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');
        productDiv.innerHTML = `
        <img src="${product.img}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>Rp ${product.price}</p>
        <button onclick="addToCart(${product.id})">Tambah Ke Keranjang</button>
        `;
        productsContainer.appendChild(productDiv);
    });
}

// fungsi untuk menambah produk ke keranjang belanja
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const cartItems = cart.find(item => item.id === productId);

    if (cartItems) {
        cartItems.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1});
    }

    updateCart();
}

//Fungsi untuk menampilkan isi keranjang belanja
function updateCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML ='';

    let totalprice = 0;
    cart.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = `${item.name} x ${item.quantity} - Rp ${item.price * item.quantity}`;
        cartItemsContainer.appendChild(listItem);

        totalprice += item.price * item.quantity;
    });

    document.getElementById('total-price').textContent = totalprice;
}

//Fungsi untuk melakukan checkout
function checkout() {
    if (cart.length === 0) {
        alert('Keranjang Anda Kosong.');
        return;
    }

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const payemnt = prompt(`Total belanja Anda Rp ${total}. Masukkan jumlah pembayaran:`);

    if (payemnt >= total) {
        alert(`pembayaran berhasil kembalian anda: Rp ${payemnt - total}`);
        cart = [];
        updateCart();
    } else {
        alert('uang Anda tidak mencukupi.');
    }
}

//Event listener untuk tombol checkout
document.getElementById('checkout-btn').addEventListener('click', checkout);

//Tampilkan produk halaman di muat
displayproducts();
