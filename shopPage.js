document.addEventListener('DOMContentLoaded', function () {
    const cartSquareElement = document.querySelector('.square-cart')
    let numberProductsInCart
    const saveNumberProductInLocalStorage = () => {
        numberProductsInCart = +(cartSquareElement.textContent)
        localStorage.setItem('indexProducts', numberProductsInCart)
    }
    let thisLocation
    const loadNumberProductFromLocalStorage = () => {
        numberProductsInCart = +(localStorage.getItem('indexProducts'))
    }
    loadNumberProductFromLocalStorage()
    const checkNumber = () => {
        if (numberProductsInCart > 0 && numberProductsInCart < 100) {
            cartSquareElement.style.cssText = 'display: flex;'
            cartSquareElement.textContent = numberProductsInCart
        } else if (numberProductsInCart >= 100) {
            cartSquareElement.style.cssText = 'display: flex;'
            cartSquareElement.textContent = `+99`
        }
    }
    checkNumber()
    const productsContainer = document.querySelector('.products-container')

    if (!productsContainer) return

    const products = JSON.parse(localStorage.getItem('products')) || []

    if (products.length === 0) {
        productsContainer.innerHTML = '<p>Товаров пока нет</p>'
        return
    }
    let cartProductsIndexs = JSON.parse(localStorage.getItem('cartProductsIndexs')) || []


    products.forEach(product => {
        const productElement = document.createElement('div')
        productElement.classList.add('product')
        productElement.addEventListener('click', (event) => {
            if (!event.target.classList.contains('buy-product')) {
                localStorage.setItem('selectedProduct', JSON.stringify(product))
                window.location.href = './innerProduct.html'
            } else if (event.target.classList.contains('buy-product')) {
                event.stopPropagation()
                cartProductsIndexs.push(product.index)
                localStorage.setItem('cartProductsIndexs', JSON.stringify(cartProductsIndexs))
                numberProductsInCart++
                cartSquareElement.textContent = numberProductsInCart
                saveNumberProductInLocalStorage()
                checkNumber()
            }
        })
        if (window.location.href.includes('innerProduct.html')) {
            const titleProductPage = document.querySelector('title')
            titleProductPage.textContent = product.name
        }
        productElement.innerHTML = `
                <img  src="${product.imageBase64}" width="140px" height="170px"
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

const remove = () => {
     localStorage.removeItem('cartProductsIndexs')
    localStorage.removeItem('indexProducts')
}
// remove()
// localStorage.removeItem('products')