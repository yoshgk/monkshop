// this is to add shoe into the shopping cart
function addToCart() {
    const shoe = JSON.parse(localStorage.getItem('selectedShoe'));
    const selectedSize = document.querySelector('.sizes-filter .selected');
    if (shoe && selectedSize) {
        shoe.size = selectedSize.innerText;
        shoe.quantity = 1;
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const existingItemIndex = cart.findIndex(item => item.name === shoe.name && item.size === shoe.size);
        if (existingItemIndex > -1) {
            cart[existingItemIndex].quantity += 1;
        } else {
            cart.push(shoe);
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartQuantity();
        document.getElementById('shoe-page-select-size-text').innerHTML = 'Select a size';
        document.getElementById('shoe-page-select-size-text').style.color = 'black';
    } else {
        document.getElementById('shoe-page-select-size-text').innerHTML = '* Please select a size';
        document.getElementById('shoe-page-select-size-text').style.color = 'red';

    }
}

function updateCartQuantity() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cart-quantity').innerText = totalQuantity;
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.sizes-filter .size-box').forEach(sizeBox => {
        sizeBox.addEventListener('click', () => {
            document.querySelectorAll('.sizes-filter .size-box').forEach(box => box.classList.remove('selected'));
            sizeBox.classList.add('selected');
        });
    });
    updateCartQuantity();
});

// every item that should appear in the shopping cart on shoppingcart html with the correct total price
document.addEventListener('DOMContentLoaded', () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const productsContainer = document.getElementById('shoppingcart-products');
    const totalPriceElement = document.getElementById('total-price');
    let totalPrice = 0;

    productsContainer.innerHTML = ''; 
    cart.forEach((item, index) => {
        const productSection = document.createElement('section');
        productSection.classList.add('shoppingcart-product-collection');
        
        productSection.innerHTML = `
        <div class="shoppingcart-product-collection">
            <img src="${item.image}" alt="${item.name}">
            <div class="shoppingcart-product-content">
                <div class="shoppingcart-product-text">
                    <p>${item.brand}</p>
                    <p>${item.name}</p>
                    <p>Size: ${item.size}</p>
                </div>
                <div class="shoppingcart-product-price">
                    <h1>€${item.price.toFixed(2)}</h1>
                </div>
                <div class="shoppingcart-product-quantity-button">
                    <div class="shoppingcart-product-remove" onclick="updateQuantity(${index}, -1)"> - </div>
                    <div class="shoppingcart-product-quantity">${item.quantity}</div>
                    <div class="shoppingcart-product-add" onclick="updateQuantity(${index}, 1)"> + </div>
                </div>
            </div>
        </div>
        `;
        
        productsContainer.appendChild(productSection);
        totalPrice += item.price * item.quantity;
    });

    totalPriceElement.innerText = `€${totalPrice.toFixed(2)}`;
});

function EmptyCart() {
    localStorage.removeItem('cart');
    location.reload();
    updateCartQuantity();
}

function updateQuantity(index, change) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart[index]) {
        cart[index].quantity += change;
        if (cart[index].quantity <= 0) {
            cart.splice(index, 1);
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        location.reload();
        updateCartQuantity();
    }
}
