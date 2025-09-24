document.addEventListener('DOMContentLoaded', function () {
    const productsContainer = document.querySelector('.products-container')
    const products = JSON.parse(localStorage.getItem('products')) || []
    if (products.length === 0) {
        productsContainer.innerHTML = '<p>Товаров пока нет</p>'
        return
    }
    products.forEach(product => {
        const productElement = document.createElement('div')
        productElement.classList.add('product')
        productElement.innerHTML = `
            <img src="./product images/photo_2024-10-12_00-38-17.jpg" width="100px" height="100px" 
                 class="product-icon" alt="${product.name}">
            <div class="product-all-info">
                <div class="product-name">${product.name}</div>
                <div class="product-price">${product.price}$</div>
                <div class="product-index">${product.index}</div>
                <button class="buy-product">buy</button>
            </div>
        `
        productsContainer.appendChild(productElement)
        //     localStorage.removeItem('products')
    })
})