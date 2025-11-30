import { updateCartCount } from "./cartProductsCounter.js"

document.addEventListener('DOMContentLoaded', () => {

    fetch(`http://localhost:3000/cartItems`)
        .then(response => {
            if (!response.ok) throw new Error('Ошибка загрузки корзины')
            return response.json()
        })
        .then(cartIndexs => {
            if (cartIndexs.length === 0) {
                cartProductsContainer.innerHTML = '<p>Корзина пуста</p>'
                return
            }

            return fetch(`http://localhost:3000/products`)
                .then(response => {
                    if (!response.ok) throw new Error('Ошибка загрузки товаров')
                    return response.json()
                })
                .then(products => {
                    cartIndexs.forEach(cartItem => {
                        const product = products.find(p => p.index === cartItem.index)
                        if (product) {
                            const productElement = document.createElement('div')
                            productElement.classList.add('product')

                            productElement.addEventListener('click', (event) => {
                                if (!event.target.classList.contains('delete-product') && !event.target.closest('.add-more-product') && !event.target.closest('.button-order-product')) {
                                    localStorage.setItem('selectedProduct', JSON.stringify(product))
                                    window.location.href = './innerProduct.html'
                                }
                            })
                            const originalPrice = product.price
                            productElement.innerHTML = `
                                <img src="${product.imageBase64}" width="140px" height="170px"
                                    class="product-icon" alt="${product.name}">
                                <div class="product-all-info">
                                    <div class="product-name">${product.name}</div>
                                    <div class="product-index">${product.index}</div>
                                     <div class="product-filter">${product.filter}</div>
                                         <button class="delete-product">удалить</button>    
                                </div>
                                
                             <div class="product-other"> 
                              <div class="add-more-product">
                               <div class="price-func">
                                   <div class="minus more-button">
                                           -
                                 </div>
                                     <div class="number-products">
                                            ${cartItem.quantity}
                                           </div>
                                      <div class="plus more-button">
                                                  +
                                           </div>
                                      </div>    
                                <div class="product-price">${product.price} ₽</div>
                                </div>
                                    <button class="button-order-product">Заказать</button>
                             </div>
                            `

                            const plusButton = productElement.querySelector('.plus')
                            const minusButton = productElement.querySelector('.minus')
                            const quantityElement = productElement.querySelector('.number-products')
                            const priceElement = productElement.querySelector('.product-price')

                            plusButton.addEventListener('click', () => {
                                cartItem.quantity++
                                quantityElement.textContent = cartItem.quantity
                                product.price = originalPrice * cartItem.quantity
                                updateCartCount()
                                animateNumber(priceElement, product.price, 400)
                                setTimeout(() => {
                                    calculateTheTotalAmount()
                                }, 410)

                                fetch(`http://localhost:3000/cartItems/${cartItem.id}`, {
                                    method: 'PATCH',
                                    headers: {
                                        'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify({
                                        quantity: cartItem.quantity
                                    })
                                }).then(() => {


                                }).catch(error => {
                                    console.log('Ошибка', error)
                                })
                            })

                            minusButton.addEventListener('click', () => {
                                if (cartItem.quantity > 1) {
                                    cartItem.quantity--
                                    quantityElement.textContent = cartItem.quantity
                                    product.price = originalPrice * cartItem.quantity
                                    updateCartCount()
                                    animateNumber(priceElement, product.price, 400)
                                    setTimeout(() => {
                                        calculateTheTotalAmount()
                                    }, 410)
                                } else {
                                    return
                                }

                                fetch(`http://localhost:3000/cartItems/${cartItem.id}`, {
                                    method: 'PATCH',
                                    headers: {
                                        'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify({
                                        quantity: cartItem.quantity
                                    })
                                }).then(() => {
                                    updateCartCount()

                                }).catch(error => {
                                    console.log('Ошибка', error)
                                })
                            })
                            product.price = originalPrice * cartItem.quantity
                            priceElement.textContent = `${product.price} ₽`

                            const deleteButton = productElement.querySelector('.delete-product')
                            deleteButton.addEventListener('click', (event) => {
                                event.stopPropagation()

                                fetch(`http://localhost:3000/cartItems/${cartItem.id}`, {
                                    method: 'DELETE'
                                }).then(() => {
                                    cartIndexs.quantity = 0
                                    updateCartCount()
                                    productElement.remove()
                                    setTimeout(() => {
                                        calculateTheTotalAmount()
                                    }, 100)
                                    if (document.querySelectorAll('.product').length === 0) {
                                        cartProductsContainer.innerHTML = '<p>Корзина пуста</p>'
                                    }
                                }).catch(error => {
                                    console.log('Ошибка удаления:', error)
                                })
                            })

                            cartProductsContainer.appendChild(productElement)
                        }
                    })
                    setTimeout(() => {
                        calculateTheTotalAmount()
                    }, 100)
                })
        })
        .catch(error => {
            console.log(error.message)
            cartProductsContainer.innerHTML = `<p>Ошибка: ${error.message}</p>`
        })



    const cartProductsContainer = document.querySelector('.all-cart-products')


    const animateNumber = (element, targetValue, duration) => {
        const currentValue = parseFloat(element.textContent) || 0
        let startTime = null
        function step(timestamp) {
            if (!startTime) {
                startTime = timestamp
            }
            const progress = Math.min((timestamp - startTime) / duration, 1)
            const currentNumber = Math.floor(currentValue + (targetValue - currentValue) * progress)
            element.textContent = currentNumber + '₽'
            if (progress < 1) {
                requestAnimationFrame(step)
            } else {
                element.textContent = targetValue + '₽'
            }
        }
        requestAnimationFrame(step)
    }
    const calculateTheTotalAmount = () => {
        const allProductsInCart = document.querySelectorAll('.product')
        let sumAllOf = 0
        allProductsInCart.forEach(productElement => {
            sumAllOf += parseFloat(productElement.querySelector('.product-price').textContent)
        })
        const totalElement = document.querySelector('.sum-of-all')
        animateNumber(totalElement, sumAllOf, 400)
    }
    calculateTheTotalAmount()
})

