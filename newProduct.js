const form = document.querySelector('.form')
const inputName = document.querySelector('.input-name')
const inputPrice = document.querySelector('.input-price')
const inputDescription = document.querySelector('.input-description')
const inputIndex = document.querySelector('.input-index')
const createButton = document.querySelector('.add-product-button')
const inputFile = document.querySelector('.input-icon')
const productsContainer = document.querySelector('.products-container')
const selectInput = document.querySelector('select')



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


class createProduct {
    constructor(name, price, index, filter, fileInput, description) {
        this.loadAllIndexsFromLocalStorage()
        if (!name) {
            console.log('введите название товара')
            return
        } else if (name.length < 6) {
            console.log('название товара должно содержать больше 6 символов')
            return
        } else if (name.length > 45) {
            console.log('название товара не должен содержать больше 35 символов')
            return
        }
        else {
            this.name = name
        }
        if (!description) {
            console.log('введите описание товара')
            return
        } else if (description.length < 6) {
            console.log('описание товара должно содержать больше 6 символов')
            return
        } else {
            this.description = description
        }

        if (!price) {
            console.log('введите цену товара')
            return
        } else if (price <= 0 || price.length > 8) {
            console.log('цена товара не может быть такой')
            return
        } else {
            this.price = price
        }
        if (!filter || filter === '-- Выберите фильтр --') {
            console.log('выберите фильтр товара')
            return
        } else {
            this.filter = filter
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
        if (this.name && this.price && this.index && this.file && this.filter && this.description) {
            const reader = new FileReader()
            reader.onload = (e) => {
                this.imageBase64 = e.target.result
                this.saveProductToLocalStorage()
            }
            reader.readAsDataURL(this.file)
        } else {
            console.log('что-то пошло не так... ')
        }

    }

    saveProductToLocalStorage() {
        const existingProducts = JSON.parse(localStorage.getItem('products')) || []
        const productData = {
            name: this.name,
            description: this.description,
            price: this.price,
            index: this.index,
            fileName: this.file.name,
            filter: this.filter,
            imageBase64: this.imageBase64,
        }
        existingProducts.push(productData)

        localStorage.setItem('products', JSON.stringify(existingProducts))

        console.log('Товар сохранен!')
        inputName.value = ''
        inputDescription.value = ''
        inputPrice.value = ''
        inputIndex.value = ''
        inputFile.value = ''

    }

    saveAllIndexsToLocaleStorage() {
        const allIndexs = JSON.stringify(indexs || [])
        localStorage.setItem('indexs', allIndexs)

    }

    loadAllIndexsFromLocalStorage() {
        const allIndexs = JSON.parse(localStorage.getItem('indexs'))
        indexs = allIndexs || []
    }
}

try {
    document.addEventListener('keyup', (event) => {
        try {
            if (event.key === 'Enter') {
                const newProductObj = new createProduct(inputName.value, inputPrice.value, inputIndex.value, selectInput.value, inputFile, inputDescription.value)
                if (newProductObj.name) {
                    newProductObj.createNewProduct()
                }
            }
        } catch (error) {
            console.log(error.message)
        }

    })

    createButton.addEventListener('click', () => {
        const newProductObj = new createProduct(inputName.value, inputPrice.value, inputIndex.value, selectInput.value, inputFile, inputDescription.value)
        if (newProductObj.name) {
            newProductObj.createNewProduct()
        }
    })
} catch (error) {
    console.log(error.message)
}

