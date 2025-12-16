import { updateCartCount } from "./cartProductsCounter.js"
document.addEventListener('DOMContentLoaded', function () {
    let cartProductsIndexs = []
    if (window.location.href.includes('searchProduct.html')) {
        return
    }



    const productsContainer = document.querySelector('.products-container')
    try {
        productsContainer.innerHTML = 'загрузка...'
    } catch (error) {
        console.log(error.message)
    }

    const inputSearch = document.querySelector('.search-product')

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
            setTimeout(() => {
                if (productData.length === 0) {
                    productsContainer.innerHTML = '<p>Товаров пока нет</p>'
                    return
                }
                productsContainer.innerHTML = ''
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
                        fetch(`http://localhost:3000/cartItems`)
                            .then(response => {
                                if (!response.ok) throw new Error('Ошибка загрузки корзины')
                                return response.json()
                            })
                            .then(cartItems => {
                                const existingItem = cartItems.find(item => item.index === product.index)

                                if (existingItem) {

                                    return fetch(`http://localhost:3000/cartItems/${existingItem.id}`, {
                                        method: 'PATCH',
                                        headers: {
                                            'Content-Type': 'application/json'
                                        },
                                        body: JSON.stringify({
                                            quantity: existingItem.quantity + 1
                                        })
                                    })
                                } else {
                                    const newCartItem = {
                                        index: product.index,
                                        quantity: 1
                                    }
                                    cartProductsIndexs.push(newCartItem)
                                    return fetch(`http://localhost:3000/cartItems`, {
                                        method: 'POST',
                                        headers: {
                                            'Content-Type': 'application/json'
                                        },
                                        body: JSON.stringify(newCartItem)
                                    })
                                }
                            })
                            .then((response) => {
                                console.log('response:', response)
                                if (!response.ok) {
                                    throw new Error('Ошибка добавления в корзину')
                                }
                                return response.json()
                            })
                            .then(() => {
                                updateCartCount()
                            })
                            .catch((error) => {
                                console.log(error.message)
                                cartProductsIndexs = cartProductsIndexs.filter(item => item.index !== product.index)
                            })
                    })
                })
            }, 300)

        })
        .catch((error) => {
            productsContainer.innerHTML = 'что-то пошло не так :('
        })
})

