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
            <div class="product-inner-price">${product.price} ₽</div>
                <div class="product-inner-name">${product.name}</div>
                 <div class="product-inner-description">${product.description}</div>
                <div class="product-inner-index">${product.index}</div>      
           
              <div class="product-inner-filter">${product.filter}</div>  
            <button class="buy-inner-product">купить сейчас</button>
            <button class="buy-product">в корзину</button> 
            </div>
        `
    document.body.appendChild(productElement)

})





