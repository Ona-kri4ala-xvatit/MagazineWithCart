// Глобальные переменные
const ROOT_PRODUCTS = document.getElementById('root-products');
const ROOT_HEADER = document.getElementById('root-header');
const ROOT_STORE_CARD = document.getElementById('root-store-card');
const ROOT_LOADER = document.getElementById('root-loader');
const ROOT_ERROR = document.getElementById('root-error');

// Класс LocalStorageUtil
class LocalStorageUtil {
    constructor() {
        this.keyName = 'products';
    }

    getProducts() {
        const products = localStorage.getItem(this.keyName);
        if (products !== null) {
            return JSON.parse(products);
        }
        else {
            return [];
        }
    }

    putProducts(id) {
        const products = this.getProducts();

        let pushProduct = false;
        const index = products.indexOf(id);
        if (index === -1) {
            products.push(id);
            pushProduct = true;
        } else {
            products.splice(index, 1);
        }

        localStorage.setItem(this.keyName, JSON.stringify(products));
        return { pushProduct, products };
    }
}

// Класс StoreCard
class StoreCard {
    constructor() {
        this.modal = new Modal();
    }

    handlerClear() {
        ROOT_STORE_CARD.innerHTML = '';
    }

    render() {
        const products = localStorageUtil.getProducts();
        let htmlCatalog = '';
        let sumCatalog = 0;

        ROOT_STORE_CARD.innerHTML = htmlCatalog;
    }
}

// Класс для модального окна
class Modal {
    constructor() {
        this.modal = document.getElementById('modal');
        this.closeButton = document.getElementById('modal-close-button');
        this.closeButton.addEventListener('click', () => this.hide());
    }

    show() {
        this.modal.style.display = 'block';
    }

    hide() {
        this.modal.style.display = 'none';
    }
}

// Класс Header
class Header {
    constructor() {
        this.modal = new Modal();
    }

    handlerOpenStoreCardPage() {
        storeCardPage.render();
    }

    addModalEventListener() {
        const storeCardImg = document.querySelector('.store-card-img');
        storeCardImg.addEventListener('click', () => {
            this.modal.show()
        });
    }

    render(count) {
        // Формирование HTML для верхней части страницы
        ROOT_HEADER.innerHTML = `<img class="store-card-img" src="img/cart.svg" alt=""> ${count}`;
        this.addModalEventListener();
    }
}

// Класс Products
class Products {
    constructor() {
        this.classNameActive = 'in-basket';
        this.labelAdd = 'Добавить в корзину';
        this.labelRemove = 'Удалить из корзины';
    }

    handlerSetLocalStorage(button, id) {
        const { pushProduct, products } = localStorageUtil.putProducts(id);
        const buttonText = pushProduct ? this.labelRemove : this.labelAdd;
        const buttonClass = pushProduct ? this.classNameActive : 'basket';

        button.innerText = buttonText;
        button.classList.toggle(this.classNameActive, pushProduct);

        // Обновление счетчика в шапке страницы
        headerPage.render(products.length);
    }

    render() {
        const products = localStorageUtil.getProducts();
        let htmlCatalog = '';

        CATALOG.forEach(product => {
            const { id, title, price, description, image } = product;
            const productInStore = products.includes(id);
            const buttonText = productInStore ? this.labelRemove : this.labelAdd;
            const buttonClass = productInStore ? this.classNameActive : 'basket';

            htmlCatalog += `
                <div class="product">
                    <img src="${image}" alt="${title}" />
                    <div class="product-title"><b>${title}</b></div>
                    <div class="product-price">Price: ${price}$</div>
                    <div class="product-description">${description}</div>
                    <div class="product-buttons">
                    <button class="${buttonClass}" onclick="productsPage.handlerSetLocalStorage(this, ${id})">${buttonText}</button>
                    </div>
                </div>
            `;
        });

        ROOT_PRODUCTS.innerHTML = htmlCatalog;
    }
}

class LoaderPage {
    //После задержки, вызывается  для скрытия индикатора загрузки
    handlerClear() {
        ROOT_LOADER.style.display = 'none';
    }
}

class ErrorPage {
    render() {
        ROOT_ERROR.innerHTML = 'Error';
    }
}

// Инициализация данных
const localStorageUtil = new LocalStorageUtil();
const storeCardPage = new StoreCard();
const headerPage = new Header();
const productsPage = new Products();
const loaderPage = new LoaderPage();
const errorPage = new ErrorPage();
let CATALOG = [];

ROOT_LOADER.style.display = 'block';

fetch('https://fakestoreapi.com/products').then(response => response.json()).then(data => {
    CATALOG = data;

    setTimeout(() => {
        loaderPage.handlerClear();
        const productsStore = localStorageUtil.getProducts();
        headerPage.render(productsStore.length);
        productsPage.render();
    }, 5000);
})
    .catch(error => {
        loaderPage.handleClear();
        errorPage.render();
        console.error('Error: ', error);
    });