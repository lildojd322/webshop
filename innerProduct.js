document.addEventListener('DOMContentLoaded', () => {
    const product = JSON.parse(localStorage.getItem('selectedProduct'))
    if (!product) {
        const errorMessage = 'Ошибка! Товара не найден или его не существует'
        document.body.innerHTML = '<p>Товар не найден!</p>'
        throw new Error(errorMessage)
    }
    if (product.description === undefined) {
        product.description = 'описание отсутствует'
    }
    document.title = product.name
    const productElement = document.createElement('div')
    productElement.classList.add('product-inner')
    productElement.innerHTML = `
            <img  src="${product.imageBase64}" width="440px" height="500px"
                 class="product-inner-icon" alt="${product.name}">
            <div class="product-inner-all-info">
            <div class="text-info">
                <div class="product-inner-name">${product.name}</div>
                 <div class="product-inner-price">${product.price} ₽</div>
                 <div class="product-inner-description">${product.description}</div>
                <div class="product-inner-index">${product.index}</div>      

                    <div class="product-inner-filter">${product.filter}</div> 
                     </div> 
              <div class="inner-buttons">
    
               <button class="buy-inner-product">купить сейчас</button>
            <button class="buy-product">в корзину</button> 
              </div>
            
            </div>
        `
    document.body.appendChild(productElement)
    let cartProductsIndexs = []
    const buyButton = productElement.querySelector('.buy-product')
    const cartSquareElement = document.querySelector('.square-cart')
    let numberProductsInCart = localStorage.getItem('indexProducts')
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
    buyButton.addEventListener('click', (event) => {
        event.preventDefault()
        event.stopPropagation()
        numberProductsInCart++
        cartSquareElement.textContent = numberProductsInCart
        saveNumberProductInLocalStorage()
        checkNumber()
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
            .catch((error) => {
                console.log(error.message)
                cartProductsIndexs = cartProductsIndexs.filter(item => item.index !== product.index)
            })
    })
})





