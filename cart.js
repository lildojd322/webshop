document.addEventListener('DOMContentLoaded', () => {
    
    fetch(`http://localhost:3000/cartIndexs`)
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
                                if (!event.target.classList.contains('delete-product')) {
                                    localStorage.setItem('selectedProduct', JSON.stringify(product))
                                    window.location.href = './innerProduct.html'
                                }
                            })

                            productElement.innerHTML = `
                                <img src="${product.imageBase64}" width="140px" height="170px"
                                    class="product-icon" alt="${product.name}">
                                <div class="product-all-info">
                                    <div class="product-price">${product.price} ₽</div>
                                    <div class="product-name">${product.name}</div>
                                    <div class="product-index">${product.index}</div>      
                                </div>
                                <div class="product-filter">${product.filter}</div>  
                                <button class="delete-product">удалить</button>
                            `

                            const deleteButton = productElement.querySelector('.delete-product')
                            deleteButton.addEventListener('click', (event) => {
                                event.stopPropagation()

                                fetch(`http://localhost:3000/cartIndexs/${cartItem.id}`, {
                                    method: 'DELETE'
                                }).then(() => {

                                    productElement.remove()

                                    numberProductsInCart--
                                    localStorage.setItem('indexProducts', numberProductsInCart)

                                    calculateTheTotalAmount()

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

                    calculateTheTotalAmount()
                })
        })
        .catch(error => {
            console.log(error.message)
            cartProductsContainer.innerHTML = `<p>Ошибка: ${error.message}</p>`
        })



    const cartProductsContainer = document.querySelector('.all-cart-products')
    let numberProductsInCart = +(localStorage.getItem('indexProducts'))


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
        animateNumber(totalElement, sumAllOf, 1000)
    }

    calculateTheTotalAmount()

})

