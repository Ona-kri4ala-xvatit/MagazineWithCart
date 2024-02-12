const ROOT_WRAPPER = document.querySelector('.wrapper');
const ROOT_HEADER = document.querySelector('.header');
const ROOT_STORE_CARD = document.querySelector('.store-card-img');
const ROOT_LOADER = document.querySelector('.loader');
const ROOT_PRODUCTS = document.querySelector('.products-wrapper');
//const ROOT_ERROR

let CATALOG = []

fetch('https://fakestoreapi.com/products').then(response => response.json()).then(data => {
    CATALOG = data;

    setTimeout(() => {
        spinnerObj = new SpinnerPage;
        spinnerObj.spinner();
        spinnerObj.render();
    }, 1000)
});


document.querySelector('.store-card-img').addEventListener('click', e => {
    alert('sdfdsfsfsdf');
});





class SpinnerPage {
    spinner() {
        ROOT_LOADER.style.display = 'none';
    }

    render() {
        ROOT_HEADER.style.display = 'block';
        ROOT_PRODUCTS.style.display = 'block';
    }
}

class LocalStorageUtil {
    keyName = null;

    constructor(products) {
        Products = products;
    }

    getProducts() {
        //Получает продукты из локального хранилища по установленному ключу.
        //Если данные существуют, парсит их из формата JSON и возвращает массив продуктов.
        //Если данных нет, возвращает пустой массив.
        const lsItem = localStorage.getItem(key);
        if (lsItem === null) {
            return JSON.parse(lsItem);
        }
        else {
            return [];
        }
    };

    putProducts(id) {
        //Получает идентификатор продукта в качестве параметра.
        // Извлекает текущий список продуктов из локального хранилища с помощью метода getProducts().
        // Инициализирует переменную pushProduct значением false (предполагая, что продукт не был добавлен).
        // Проверяет индекс продукта в текущем списке.
        // Если продукт с указанным идентификатором отсутствует, то добавляет его в список и устанавливает pushProduct в true.
        // Если продукт уже присутствует в списке, удаляет его с помощью метода splice.
        // Обновляет локальное хранилище с обновленным списком продуктов в формате JSON.
        // Возвращает объект с двумя свойствами: pushProduct (логическое значение, указывающее, был ли продукт добавлен) и products (обновленный массив продуктов)  
    };
}

class StoreCard {
    handlerClear() {
        ROOT_STORE_CARD.textContent = '';
        //Обращается к глобальному элементу ROOT_STORE_CARD и устанавливает его содержимое в пустую строку, тем самым очищая корзину на веб-странице
    };

    render() {
        localStorageUtil.getProducts();
        //Получает текущий список продуктов из локального хранилища с помощью localStorageUtil.getProducts().
        //Инициализирует переменные htmlCatalog и sumCatalog для хранения HTML-разметки продуктов в корзине и общей стоимости покупок соответственно.
        //Итерирует по массиву CATALOG, проверяя, присутствует ли продукт в корзине (поиск по идентификатору). 
        //Если присутствует, формирует HTML-разметку для продукта в корзине и увеличивает сумму.
        //Собирает весь HTML-контейнер для корзины, включая таблицу с продуктами и общей суммой.
        //Обновляет содержимое элемента с идентификатором ROOT_STORE_CARD на веб-странице
    };
}

class Header {
    handlerOpenStoreCardPage() {
        storeCardPage.render();
        //Вызывает метод render у объекта storeCardPage, что приводит к обновлению содержимого корзины на веб-странице
    };

    render(count) {
        //ROOT_HEADER
        //Формирует HTML-разметку для верхней части страницы, включая счетчик продуктов и кнопку для открытия корзины. 
        //Обновляет содержимое элемента с идентификатором ROOT_HEADER на веб-странице.
    };
}

class Products {
    classNameActive = null; //Строка, представляющая класс для стилизации продукта, добавленного в корзину
    labelAdd = null; //Строка, представляющая текст кнопки "Добавить в корзину"
    labelRemove = null; //Строка, представляющая текст кнопки "Удалить из корзины" 

    constructor(classNameActive, labelAdd, labelRemove) {
        this.classNameActive = classNameActive;
        this.labelAdd = labelAdd;
        this.labelRemove = labelRemove;
    }

    handlerSetLocalStorage(element, id) {
        localStorageUtil.putProducts();
        headerPage.render();

        //Получает элемент и идентификатор продукта в качестве параметров.
        //Вызывает метод putProducts у объекта localStorageUtil для добавления или удаления продукта из корзины.
        //Обновляет отображение кнопки на веб-странице и вызывает метод render у объекта headerPage для обновления счетчика продуктов в верхней части страницы.
    };

    render() {
        //Получает список продуктов из локального хранилища.
        //Инициализирует переменную htmlCatalog для хранения HTML-разметки продуктов.
        //Итерирует по массиву CATALOG, формируя HTML-разметку для каждого продукта в зависимости от того, добавлен ли продукт в корзину или нет.
        //Обновляет содержимое контейнера продуктов на веб-странице с учетом новой HTML-разметки
    };
}

