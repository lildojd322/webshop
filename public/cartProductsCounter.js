let numberProductsInCart
const cartSquareElement = document.querySelector('.square-cart')

const checkNumber = () => {
    if (numberProductsInCart > 0 && numberProductsInCart < 100) {
        cartSquareElement.style.cssText = 'display: flex;'
        cartSquareElement.textContent = numberProductsInCart
    } else if (numberProductsInCart >= 100) {
        cartSquareElement.style.cssText = 'display: flex;'
        cartSquareElement.textContent = `+99`
    }
}
const updateCartCount = () => {
    numberProductsInCart = 0
    fetch(`http://localhost:3000/cartItems`)
        .then(response => {
            if (!response.ok) throw new Error('Ошибка загрузки')
            return response.json()
        })
        .then(cartIndexs => {
            if (cartIndexs.length === 0) {
                try {
                    cartSquareElement.cssText = 'display: none;'
                }
                catch (error) {
                    console.log(error.message)
                }
                return
            }
            cartIndexs.forEach(product => {
                numberProductsInCart += product.quantity
                try {
                    cartSquareElement.style.cssText = 'display: flex;'
                    cartSquareElement.textContent = numberProductsInCart
                } catch (error) {
                    console.log(error.message)
                }
            })
            try {
                checkNumber()
            } catch (error) {
                console.log(error.message)
            }

            return numberProductsInCart
        }).catch(error => {
            console.error('Ошибка:', error)
            try {
                cartSquareElement.style.cssText = 'display: none;'
            }
            catch (error) {
                console.log(error.message)
            }
            return 0
        })

}
try {
    updateCartCount()
} catch (error) {
    console.log(error.message)
}




export { updateCartCount }