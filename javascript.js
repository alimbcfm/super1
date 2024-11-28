// بيانات المنتجات
let products = [];

// دالة لإضافة منتج جديد
document.getElementById('add-product-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('product-name').value;
    const price = parseFloat(document.getElementById('product-price').value);
    const quantity = parseInt(document.getElementById('product-quantity').value);

    if (name && price && quantity) {
        const newProduct = { name, price, quantity };
        products.push(newProduct);
        displayProducts();
        displayProductsInSelect();
        e.target.reset();
    }
});

// دالة لعرض المنتجات في الجدول
function displayProducts() {
    const tbody = document.querySelector('#products-table tbody');
    tbody.innerHTML = '';
    products.forEach((product, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${product.name}</td>
            <td>${product.price}</td>
            <td>${product.quantity}</td>
            <td><button onclick="deleteProduct(${index})">حذف</button></td>
        `;
        tbody.appendChild(row);
    });
}

// دالة لحذف منتج
function deleteProduct(index) {
    products.splice(index, 1);
    displayProducts();
    displayProductsInSelect();
}

// دالة لعرض المنتجات في قائمة الفاتورة
function displayProductsInSelect() {
    const select = document.getElementById('product-select');
    select.innerHTML = '';
    products.forEach((product, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = product.name;
        select.appendChild(option);
    });
}

// دالة لحساب الفاتورة
document.getElementById('bill-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const productIndex = document.getElementById('product-select').value;
    const quantity = parseInt(document.getElementById('product-quantity-bill').value);

    if (productIndex >= 0 && quantity > 0) {
        const product = products[productIndex];
        if (product.quantity >= quantity) {
            product.quantity -= quantity;
            const total = product.price * quantity;
            document.getElementById('total-bill').textContent = parseFloat(document.getElementById('total-bill').textContent) + total;
            displayProducts();
        } else {
            alert('الكمية المطلوبة أكثر من المتوفر');
        }
    }
});
