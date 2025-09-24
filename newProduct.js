const form = document.querySelector('.form')
const inputName = document.querySelector('.input-name')
const inputPrice = document.querySelector('.input-price')
const inputIndex = document.querySelector('.input-index')
const createButton = document.querySelector('.add-product-button')
const inputFile = document.querySelector('.input-icon')
const productsContainer = document.querySelector('.products-container')


let indexs = []

try {
    inputIndex.addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/\D/g, '')
        if (e.target.value.length > 9) {
            e.target.value = e.target.value.slice(0, 9)
        }
    })
} catch (error) {
    console.log(error.message)
}


/** 
const saveImageToLocalStorage = () => {
    const path = userAvatar.src
    localStorage.setItem('pathImage', path)
}*/



class createProduct {
    constructor(name, price, index, fileInput) {
        this.loadAllIndexsFromLocalStorage()
        if (!name) {
            console.log('введите название товара')
            return
        } else if (name.length < 6) {
            console.log('название товара должно содержать больше 6 символов')
            return
        } else {
            this.name = name
        }
        if (!price) {
            console.log('введите цену товара')
            return
        } else if (price <= 0) {
            console.log('цена товара не может быть такой')
            return
        } else {
            this.price = price
        }
        if (!index) {
            console.log('введите артикул товара')
            return
        } else if (index.length !== 9) {
            console.log('артикул товара должен быть длинной в 9 символов')
            return
        } else {
            const hasIndexInData = indexs.some(e => e === index)
            if (hasIndexInData) {
                console.log('такой артикул уже существует, создайте новый')
                return
            } else {
                this.index = index
                indexs.push(this.index)
                this.saveAllIndexsToLocaleStorage()
            }
        }
        if (!fileInput || !fileInput.files || fileInput.files.length === 0) {
            console.log('выберите файл для товара')
            return
        } else {
            this.file = fileInput.files[0]
        }

    }
    createNewProduct() {
        if (this.name && this.price && this.index && this.file) {
            const newProduct = document.createElement('div')
            newProduct.classList.add('product')
            newProduct.innerHTML = ` <img src="./product images/photo_2024-10-12_00-38-17.jpg" width="100px" height="100px"
                        class="product-icon" alt="product image">
                    <div class="product-all-info">
                        <div class="product-name"> ${this.name}</div>
                        <div class="product-price">${this.price}$</div>
                        <div class="product-index">${this.index} </div>
                        <button class="buy-product">buy</button>
                    </div>`
            this.saveProductToLocalStorage()
        } else {
            console.log('что-то пошло не так... ')
        }

    }
    saveProductToLocalStorage() {
        const existingProducts = JSON.parse(localStorage.getItem('products')) || []
        const productData = {
            name: this.name,
            price: this.price,
            index: this.index,
            fileName: this.file.name,
            created: new Date().toISOString()
        }
        existingProducts.push(productData)

        localStorage.setItem('products', JSON.stringify(existingProducts))

        console.log('Товар сохранен!')
        inputName.value = ''
        inputPrice.value = ''
        inputIndex.value = ''
        inputFile.value = ''

    }

    saveAllIndexsToLocaleStorage() {
        const allIndexs = JSON.stringify(indexs)
        localStorage.setItem('indexs', allIndexs)

    }
    loadAllIndexsFromLocalStorage() {
        const allIndexs = JSON.parse(localStorage.getItem('indexs'))
        indexs = allIndexs || []
    }
}

try {
    document.addEventListener('keyup', (event) => {
        if (event.key === 'Enter') {
            const newProductObj = new createProduct(inputName.value, inputPrice.value, inputIndex.value, inputFile)
            newProductObj.createNewProduct()
        }
    })

    createButton.addEventListener('click', () => {
        const newProductObj = new createProduct(inputName.value, inputPrice.value, inputIndex.value, inputFile)
        newProductObj.createNewProduct()

    })
} catch (error) {
    console.log(error.message)
}

