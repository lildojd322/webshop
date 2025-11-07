document.addEventListener('DOMContentLoaded', () => {
    const cartProductsContainer = document.querySelector('.all-cart-products')
    const cartProductsIndexs = JSON.parse(localStorage.getItem('cartProductsIndexs'))
    const products = JSON.parse(localStorage.getItem('products'))
    let numberProductsInCart = +(localStorage.getItem('indexProducts'))
    const checkedProucts = () => {
        if (cartProductsIndexs.length < 1) {
            const productElement = document.createElement('div')
            productElement.innerHTML = `
            <p> Корзина пуста </p>
        `
            cartProductsContainer.appendChild(productElement)
        }
    }
    checkedProucts()

    cartProductsIndexs.forEach(index => {
        products.forEach(product => {
            if (index === product.index) {
                const productElement = document.createElement('div')
                productElement.classList.add('product')
                productElement.addEventListener('click', (event) => {
                    if (!event.target.classList.contains('delete-product')) {
                        localStorage.setItem('selectedProduct', JSON.stringify(product))
                        window.location.href = './innerProduct.html'
                    } else if (event.target.classList.contains('delete-product')) {
                        event.currentTarget.closest('.product').remove()
                        const indexDelete = cartProductsIndexs.findIndex(p => p === product.index)
                        if (indexDelete !== -1) {
                            cartProductsIndexs.splice(indexDelete, 1)
                            localStorage.setItem('cartProductsIndexs', JSON.stringify(cartProductsIndexs))
                            numberProductsInCart--
                            localStorage.setItem('indexProducts', numberProductsInCart)
                            calculateTheTotalAmount()
                            checkedProucts()
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
            }
        })

    })

    const calculateTheTotalAmount = () => {
        const allProductsInCart = document.querySelectorAll('.product')
        let sumAllOf = 0
        allProductsInCart.forEach(productElement => {
            sumAllOf += parseFloat(productElement.querySelector('.product-price').textContent)
        })
        document.querySelector('.sum-of-all').textContent = `${sumAllOf}₽`
    }
    calculateTheTotalAmount()

})

