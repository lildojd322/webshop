document.addEventListener('DOMContentLoaded', () => {
    const cartProducts = JSON.parse(localStorage.getItem('cartProducts')) || []
    console.log(cartProducts)
})