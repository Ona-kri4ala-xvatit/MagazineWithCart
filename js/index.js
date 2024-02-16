const ROOT_WRAPPER = document.querySelector('.wrapper');
const ROOT_HEADER = document.querySelector('.header');
const ROOT_STORE_CARD = document.querySelector('.store-card-img');
const ROOT_LOADER = document.querySelector('.loader');
const ROOT_PRODUCTS = document.querySelector('.products-items');
const ROOT_ERROR = document.querySelector('.error');

class LoaderPage {
    //После задержки, вызывается  для скрытия индикатора загрузки
    handlerClear() {
        ROOT_LOADER.style.display = 'none';
    }
    //Обновляет интерфейс страницы с учетом загруженных данных
    // render() {
    //     ROOT_HEADER.style.display = 'block';
    //     ROOT_PRODUCTS.style.display = 'block';
    // }
}

class LocalStorageUtil {
    //Строка, представляющая ключ для доступа к данным в локальном хранилище.
    keyName = null;

    constructor() {
        //Устанавливает ключ 'products' для хранения данных в локальном хранилище.
        this.keyName = 'products';
    }

    getProducts() {
        //Получает продукты из локального хранилища по установленному ключу.
        const products = localStorage.getItem(this.keyName);
        if (products !== null) {
            return JSON.parse(products);
        }
        else {
            return [];
        }
    };

    putProducts(id) {
        // Извлекает текущий список продуктов из локального хранилища с помощью метода getProducts().
        const products = this.getProducts();

        // Инициализирует переменную pushProduct значением false (предполагая, что продукт не был добавлен).
        let pushProduct = false;

        // Проверяет индекс продукта в текущем списке.
        // Если продукт с указанным идентификатором отсутствует, то добавляет его в список и устанавливает pushProduct в true.
        // Если продукт уже присутствует в списке, удаляет его с помощью метода splice.
        const index = products.indexOf(id);
        if (index === -1) {
            products.push(id);
            pushProduct = true;
        }
        else {
            products.slice(index, 1);
        }

        // Обновляет локальное хранилище с обновленным списком продуктов в формате JSON.
        // Возвращает объект с двумя свойствами: pushProduct (логическое значение, указывающее, был ли продукт добавлен) и products (обновленный массив продуктов).
        localStorage.setItem(this.keyName, JSON.stringify(products));
        return { pushProduct, products };
    };
}

class StoreCard {
    handlerClear() {
        //Обращается к глобальному элементу ROOT_STORE_CARD и устанавливает его содержимое в пустую строку, тем самым очищая корзину на веб-странице
        ROOT_STORE_CARD.innerHTML = '';
    };

    render() {
        //Получает текущий список продуктов из локального хранилища с помощью localStorageUtil.getProducts().
        const products = localStorageObj.getProducts();

        //Инициализирует переменные htmlCatalog и sumCatalog для хранения HTML-разметки продуктов в корзине и общей стоимости покупок соответственно.
        let htmlCatalog = '';
        let sumCatalog = 0;

        //Итерирует по массиву CATALOG, проверяя, присутствует ли продукт в корзине (поиск по идентификатору). 
        //Если присутствует, формирует HTML-разметку для продукта в корзине и увеличивает сумму.
        //Собирает весь HTML-контейнер для корзины, включая таблицу с продуктами и общей суммой.
        //Обновляет содержимое элемента с идентификатором ROOT_STORE_CARD на веб-странице
        ROOT_STORE_CARD.innerHTML = htmlCatalog;

    };
}

class Header {
    handlerOpenStoreCardPage() {
        //Вызывает метод render у объекта storeCardPage, что приводит к обновлению содержимого корзины на веб-странице
        storeCardObj.render();
    };

    render(count) {
        //Формирует HTML-разметку для верхней части страницы, включая счетчик продуктов и кнопку для открытия корзины. 
        //Обновляет содержимое элемента с идентификатором ROOT_HEADER на веб-странице.
        //ROOT_HEADER.innerHTML = `В корзине ${count} товаров`;
    };
}

class Products {
    classNameActive = null; //Строка, представляющая класс для стилизации продукта, добавленного в корзину
    labelAdd = null; //Строка, представляющая текст кнопки "Добавить в корзину"
    labelRemove = null; //Строка, представляющая текст кнопки "Удалить из корзины" 

    constructor() {
        this.classNameActive = 'active';
        this.labelAdd = 'В корзину';
        this.labelRemove = 'Удалить из корзины';
    }

    // <div class="products-item"></div>
    // <div class="products-item-to-basket-button">В корзину</div>

    handlerSetLocalStorage(element, id) {
        //Вызывает метод putProducts у объекта localStorageUtil для добавления или удаления продукта из корзины.
        const { pushProduct, products } = localStorageObj.putProducts();
        const buttonText = pushProduct ? this.labelRemove : this.labelAdd;
        const btnClass = pushProduct ? this.classNameActive : '';

        element.innerText = buttonText;
        element.classList.toggle(this.classNameActive, pushProduct);

        //Обновляет отображение кнопки на веб-странице и вызывает метод render у объекта headerPage для обновления счетчика продуктов в верхней части страницы.
        headerObj.render(products.length);
    };

    render() {
        //Получает список продуктов из локального хранилища.
        const products = localStorageObj.getProducts();

        //Инициализирует переменную htmlCatalog для хранения HTML-разметки продуктов.
        let htmlCatalog = null;

        //Итерирует по массиву CATALOG, формируя HTML-разметку для каждого продукта в зависимости от того, добавлен ли продукт в корзину или нет.
        CATALOG.forEach(productItem => {
            const { id, title, price, description, image } = productItem;
            const inBasket = products.includes(id);
            const buttonText = inBasket ? this.labelRemove : this.labelAdd;
            const btnClass = inBasket ? this.classNameActive : '';

            htmlCatalog += `
                <div class="product-item">
                    <img class="product-item-img" src="${image}" alt="${title}" />
                    <div class="product-item-title">${title}</div>
                    <div class="product-item-price">Price: ${price}$</div>
                    <div class="product-item-description">${description}</div>
                    <button class="${btnClass}" onclick="productsObj.handlerSetLocalStorage(this, ${id})">${buttonText}</button>
                </div> 
            `;
        });

        //Обновляет содержимое контейнера продуктов на веб-странице с учетом новой HTML-разметки
        ROOT_PRODUCTS.innerHTML = htmlCatalog;
    };
}

const loaderPageObj = new LoaderPage();
const localStorageObj = new LocalStorageUtil();
const storeCardObj = new StoreCard();
const headerObj = new Header();
const productsObj = new Products();
let CATALOG = [];

fetch('https://fakestoreapi.com/products').then(response => response.json()).then(data => {
    CATALOG = data;

    setTimeout(() => {
        loaderPageObj.handlerClear();
        const productsStore = localStorageObj.getProducts();
        headerObj.render(productsStore.length);
        productsObj.render();
    }, 1000)
});