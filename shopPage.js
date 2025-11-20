document.addEventListener('DOMContentLoaded', function () {
    let cartProductsIndexs = []

    const cartSquareElement = document.querySelector('.square-cart')
    let numberProductsInCart
    const saveNumberProductInLocalStorage = () => {
        numberProductsInCart = +(cartSquareElement.textContent)
        localStorage.setItem('indexProducts', numberProductsInCart)
    }
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

    fetch(`http://localhost:3000/products`)
        .then((response) => {
            console.log('response:', response)
            if (!response.ok) {
                const errorMessage = response.status === 404
                'Что-то пошло не так :('
                throw new Error(errorMessage)
            }
            return response.json()
        })
        .then((productData) => {
            if (productData.length === 0) {
                productsContainer.innerHTML = '<p>Товаров пока нет</p>'
                return
            }

            productData.forEach(product => {
                const productElement = document.createElement('div')
                productElement.classList.add('product')
                productElement.addEventListener('click', (event) => {
                    if (!event.target.classList.contains('buy-product')) {
                        localStorage.setItem('selectedProduct', JSON.stringify(product))
                        window.location.href = './innerProduct.html'
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
                <button class="buy-product" type="button">в корзину</button>
        `
                productsContainer.appendChild(productElement)


                const buyButton = productElement.querySelector('.buy-product')

                buyButton.addEventListener('click', (event) => {
                    event.preventDefault()
                    event.stopPropagation()
                    const productIndex = {
                        index: product.index,
                    }
                    cartProductsIndexs.push(productIndex)
                    fetch(`http://localhost:3000/cartIndexs`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(productIndex)
                    }).then((response) => {
                        console.log('response:', response)
                        if (!response.ok) {
                            const errorMessage = response.status === 404
                            productsContainer.innerHTML = '<p>Что-то пошло не так :(</p>'
                            throw new Error(errorMessage)
                        }
                        return response.json()
                    }).then(() => {
                        numberProductsInCart++
                        cartSquareElement.textContent = numberProductsInCart
                        saveNumberProductInLocalStorage()
                        checkNumber()
                    }).catch((error) => {
                        console.log(error.message)
                        cartProductsIndexs = cartProductsIndexs.filter(index => index !== product.index)
                    })
                })
            })
        })
        .catch((error) => {
            productsContainer.innerHTML = error.message
        })
})

const remove = () => {
    localStorage.removeItem('indexProducts')
}
//remove()
