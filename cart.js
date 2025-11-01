document.addEventListener('DOMContentLoaded', () => {
    const cartProductsContainer = document.querySelector('.all-cart-products')
    const cartProducts = JSON.parse(localStorage.getItem('cartProducts')) || []
    let numberProductsInCart = +(localStorage.getItem('indexProducts'))

    cartProducts.forEach(product => {
        const productElement = document.createElement('div')
        productElement.classList.add('product')
        productElement.addEventListener('click', (event) => {
            if (!event.target.classList.contains('delete-product')) {
                localStorage.setItem('selectedProduct', JSON.stringify(product))
                window.location.href = './innerProduct.html'
            } else if (event.target.classList.contains('delete-product')) {
                event.currentTarget.closest('.product').remove()
                const index = cartProducts.findIndex(p => p.id === product.id)
                if (index !== -1) {
                    cartProducts.splice(index, 1)
                    localStorage.setItem('cartProducts', JSON.stringify(cartProducts))
                    numberProductsInCart--
                    localStorage.setItem('indexProducts', numberProductsInCart)
                }
            }
        })
        productElement.innerHTML = `
                <img  src="${product.imageBase64}" width="140px" height="170px"
                    class="product-icon" alt="${product.name}">
                <div class="product-all-info">
                <div class="product-price">${product.price} ₽</div>
                    <div class="product-name">${product.name}</div>
                    <div class="product-index">${product.index}</div>      
                </div>
                <div class="product-filter">${product.filter}</div>  
                <button class="delete-product">удалить</button>
        `
        cartProductsContainer.appendChild(productElement)
    })

})

