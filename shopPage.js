document.addEventListener('DOMContentLoaded', function () {
    const productsContainer = document.querySelector('.products-container')
    if (!productsContainer) return

    const products = JSON.parse(localStorage.getItem('products')) || []

    if (products.length === 0) {
        productsContainer.innerHTML = '<p>Товаров пока нет</p>'
        return
    }

    products.forEach(product => {
        const productElement = document.createElement('div')
        productElement.classList.add('product')
        productElement.addEventListener('click', () =>{
            this.location.href ='./innerProduct.html'
        })
        productElement.innerHTML = `
            <img  src="${product.imageBase64}" width="140px" height="150px"
                 class="product-icon" alt="${product.name}">
            <div class="product-all-info">
            <div class="product-price">${product.price} ₽</div>
                <div class="product-name">${product.name}</div>
                <div class="product-index">${product.index}</div>      
            </div>
              <div class="product-filter">${product.filter}</div>  
            <button class="buy-product">в корзину</button>
        `
        productsContainer.appendChild(productElement)
    })


})




// localStorage.removeItem('products')