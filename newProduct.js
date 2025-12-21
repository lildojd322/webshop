const form = document.querySelector('form')
const inputName = document.querySelector('.input-name')
const inputPrice = document.querySelector('.input-price')
const inputDescription = document.querySelector('.input-description')
const inputIndex = document.querySelector('.input-index')
const createButton = document.querySelector('.add-product-button')
const inputFile = document.querySelector('.input-icon')
const productsContainer = document.querySelector('.products-container')
const selectInput = document.querySelector('select')


const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'];
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
    constructor(name, price, filter, fileInput, description) {
        this.loadAllIndexsFromLocalStorage()
        if (!name) {
            console.log('введите название товара')
            return
        } else if (name.length < 6) {
            console.log('название товара должно содержать больше 6 символов')
            return
        } else if (name.length > 20) {
            console.log('название товара не должен содержать больше 20 символов')
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

        const file = fileInput.files[0];
        const fileName = file.name;
        const fileExtension = fileName.substring(fileName.lastIndexOf('.') + 1).toLowerCase();

        if (!fileInput || !fileInput.files || fileInput.files.length === 0) {
            console.log('выберите обложку товара')
            return
        } else if (!allowedExtensions.includes(fileExtension)) {
            console.log('выберите  корректную обложку товара (JPG, PNG, GIF, BMP, WebP)')
            return
        }
        else {
            this.file = file
        }


        let index = ''
        const generateRandomIndex = () => {
            index += Math.floor(Math.random() * 9) + 1
            for (let i = 0; i < 8; i++) {
                const randomIndex = Math.floor(Math.random() * 10)
                index += randomIndex
            }

        }
        generateRandomIndex()
        const hasIndexInData = indexs.some(e => e === index)

        if (!hasIndexInData && index.length === 9) {
            this.index = index
            indexs.push(this.index)
            this.saveAllIndexsToLocaleStorage()
        } else {
            index = ''
            generateRandomIndex()
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
        const productData = {
            name: this.name,
            description: this.description,
            price: this.price,
            index: this.index,
            fileName: this.file.name,
            filter: this.filter,
            imageBase64: this.imageBase64,
        }


        fetch('http://localhost:3000/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productData)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Ошибка сети: ' + response.status)
                }
                return response.json()
            })

            .catch(error => {
                console.error('Ошибка сохранения:', error)
                alert('Ошибка при сохранении товара: ' + error.message)
            })

        console.log('Товар сохранен')
        inputName.value = ''
        inputDescription.value = ''
        inputPrice.value = ''
        inputFile.value = ''
        selectInput.selectedIndex = 0
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
    form.addEventListener('submit', (event) => {
        event.preventDefault()
        event.stopPropagation()

        const formData = new FormData(form)
        const product = new createProduct(
            formData.get('name'),
            formData.get('price'),
            formData.get('filter'),
            inputFile,
            formData.get('description')
        )

        if (product.name && product.price && product.filter && product.file && product.description) {
            product.createNewProduct()
        }
    })
} catch (error) {
    console.log(error.message)
}



