//Выбираем элементы

let btnOpen = document.getElementById('open-btn'),//Кнопка открытия магазина

//Элементы куда передаются данные	
	nameValue = document.querySelector('.name-value'),//Поле отображения названия магазина
	budgetValue = document.querySelector('.budget-value'),//Поле отображения бюджета
	goodsValue = document.querySelector('.goods-value'),//Поле отображения категорий товаров
	itemsValue = document.querySelector('.items-value'),//Поле отображения названий товаров
	employersValue = document.querySelector('.employers-value'),//Поле отображения имен сотрудников
	discountValue = document.querySelector('.discount-value'),//Поле отображения скидки
	isopenValue = document.querySelector('.isopen-value'),//Поле отображения открытия / закрытия магазина
	countBudgetItem = document.querySelector('.count-budget-value'),//Поле отображения суточного бюджета

//Элементы для ввода данных	
	promocodeValue = document.querySelector('.promocode-value'),//Поле ввода промокода	
	goodsItem = document.querySelectorAll('.goods-item'),//Поля ввода категорий товаров
	chooseItem = document.querySelector('.choose-item'),//Поле ввода названий товаров
	timeValue = document.querySelector('.time-value'),//Поле ввода времени
	hireEmployersItem = document.querySelectorAll('.hire-employers-item'),//Поля ввода имен сотрудников
	promoTitle = document.querySelector('.promo_title-black'),

//Кнопки
	btnApprove = document.querySelector('.goods-item-btn'),//Кнопка утверждения категорий товаров
	btnCalc = document.querySelector('.count-budget-btn'),//Кнопка расчета бюджета
	btnHire = document.querySelector('.hire-employers-btn'),//Кнопка найма сотрудников

//Прочее
	promo = document.querySelector('.promo');//Содержит данные промокода

//Переменные	
let budget,  
	price,
	newEmployer;

//Задаем объект для хранения основных данных
let mainList = {
		budget: budget,
		shopName: nameValue,
		shopGoods: [],
		employers: {},
		open: false,
		discount: false,
		shopItems: []
}
//Устанавливаем неактивные элементы по умолчанию
function shopOpenCheck() {
	countBudgetItem.disabled = true;
	promocodeValue.disabled = true;

	btnApprove.disabled = true;
	btnCalc.disabled = true;
	btnHire.disabled = true;
};
shopOpenCheck();

//Функция контроля заполнения инпутов
function goodsCheck(selector, btn) {
//Перебор псевдомассива инпутов и проверка их на изменение содержания при нажатии и отпускании кнопки   
	for (let i = 0; i < selector.length; i++) {
		selector[i].addEventListener('keyup', () => {
			let count = 0;

			for (let j = 0; j < selector.length; j++) {
				if (selector[j].value !== '') {//Если инпут не пустой count увеличивается на 1
					count++;
				}
			}
//При наличии хотя бы 1 непустого инпута и октрытого магазина кнопка утверждения категорий товаров активна			
			if (count >= 1 && mainList.open === true) {
				btn.disabled = false;
//Если все инпуты пустые или магазин закрыт кнопка неактивна
			} else if (count === 0 || mainList.open === false) {
				btn.disabled = true;
			}
		});
	}		
};			
goodsCheck(goodsItem, btnApprove);//Запуск функции для инпутов в категории товаров
goodsCheck(hireEmployersItem, btnHire);//Запуск функции для инпутов в категории найма сотрудников

//Функция обнуления всех инпутов и полей при закрытии магазина
function inputToZero(selector) {
	
	for (let i = 0; i < selector.length; i++) {
		selector[i].value = '';
	}

	discountValue.textContent  = '';
	promocodeValue.value = '';
	promo.textContent = '';
	discountValue.style.background = 'red';
};

//Открытие магазина по клику и получение данных от пользователя
btnOpen.addEventListener('click', () =>  {
	//Задаем начальные переменные и записываем в них данные пользователя через функцию
	budget = +prompt('Ваш бюджет на месяц?', '');//Переводим данные в числовой формат (+)

	while(isNaN(budget) || budget == '' || budget == null) {
		budget = +prompt('Ваш бюджет на месяц?', '');//Предотвращаем возможность ввода неверных данных
	}
//Вписываем данные по бюджету в соответствующее поле
	budgetValue.textContent = budget;
	btnCalc.disabled = false;

//Записываем название магазина заглавными буквами в соответствующее поле
	nameValue.textContent = prompt('Название вашего магазина?', '').toUpperCase();
});

//Внесение категорий товаров по нажатию на кнопку
btnApprove.addEventListener('click', () => {
	for (let i = 0; i < goodsItem.length; i++) {
				let newGoods = goodsItem[i].value
				//Проверка данных на тип и размер
				if( (typeof(newGoods) ) === 'string' && ( typeof(newGoods) ) != null && 
					newGoods.length < 50) {
						mainList.shopGoods[i] = newGoods;//Внесение товаров в массив
						//Запись товаров в поле "категоирии товаров"
						goodsValue.textContent += mainList.shopGoods[i] + ', ';
				} else {
						alert('Введите верные данные!');
						i--;//Сброс i на единицу для повторной попытки ввода данных
				}
	}
//Обнуление инпутов после нажатия на кнопку
	for (let j = 0; j < goodsItem.length; j++) {
			goodsItem[j].value = '';
	}
	btnApprove.disabled = true;//Отключение кнопки после ввода данных
});

//Ввод названий товаров
chooseItem.addEventListener('change', () => {
	let items = chooseItem.value;
			//Проверка на тип данных
				if(isNaN(items) && items != '') {
					mainList.shopItems = items.split(',');//Разбиение строки на массив по ' '
					mainList.shopItems.sort();//Сортировка массива в алфавитном порядке
					// Внесение данных поле "наименования товаров"
					for (let i = 0; i < mainList.shopItems.length; i++) {
						itemsValue.textContent += mainList.shopItems[i] + ', ';
					}
					// itemsValue.textContent = mainList.shopItems.join(', ');
					chooseItem.value = '';//Очистка инпута после переноса данных
				}
});

//Открытие / закрытие магазина в зависимости от времени
timeValue.addEventListener('change', () => {
	let time = timeValue.value;

		if (time < 0) {
			console.log('Такого не может быть');
			mainList.open = false;
			inputToZero(goodsItem);//Обнуление инпутов категории товаров при закрытии магазина
			inputToZero(hireEmployersItem);//Обнуление инпутов найма сотрудников при закрытии магазина
			} else if (time > 8 && time < 20) {
				console.log('Время работать');
				mainList.open = true;//Открываем магазин, если время рабочее
			} else if (time < 24) {
				console.log('Уже слишком поздно');
				mainList.open = false;
				inputToZero(goodsItem);//Обнуление инпутов категории товаров при закрытии магазина
				inputToZero(hireEmployersItem);//Обнуление инпутов найма сотрудников при закрытии магазина
			} else {
				console.log('В сутках только 24 часа!');
				mainList.open = false;
				inputToZero(goodsItem);//Обнуление инпутов категории товаров при закрытии магазина
				inputToZero(hireEmployersItem);//Обнуление инпутов найма сотрудников при закрытии магазина
			}
//Смена фона при октрытии / закрытии магазина, активация кнопок и поля для ввода купона на скидку
		if (mainList.open === true) {
			isopenValue.style.backgroundColor = 'green';
			promocodeValue.disabled = false;//Активация поля ввода промокода при открытии магазина
		} else {
			isopenValue.style.backgroundColor = 'red';
			//Отключение всех кнопок и поля ввода промокода
			btnApprove.disabled = true;
			btnCalc.disabled = true;
			btnHire.disabled = true;
			promocodeValue.disabled = true;
		}
});

//Расчет суточного бюджета по нажатию на кнопку
btnCalc.addEventListener('click', () => {
	countBudgetItem.value = budget / 30;
});

//Найм сотрудников по нажатию на кнопку
btnHire.addEventListener('click', () => {
	employersValue.textContent = '';//Обнуление инпутов при нажатии на кнопку найма сотрудников

	for (let i = 0; i < hireEmployersItem.length; i++) {
//Проверка на наличие введенных данных
			if (hireEmployersItem[i].value.length >= 1) {
				mainList.employers[i] = hireEmployersItem[i].value;//Ввод данных в объект
			} else if (hireEmployersItem[i].value.length < 1) {
				continue;
			}
			//Отключение запятой после третьего имени сотрудника
			if (i === (hireEmployersItem.length - 1)) {
				employersValue.textContent += mainList.employers[i];
			} else {
			//Установка запятых после каждого имени сотрудника, кроме последнего	
				employersValue.textContent += mainList.employers[i] + ', ';
			}
	}
	//Очистка инпутов при нажатии на кнопку найма сотрудников
	for (let j = 0; j < hireEmployersItem.length; j++) {
			hireEmployersItem[j].value = '';
	}
	btnHire.disabled = true;//Отключение кнопки после ввода данных
});

//Функция расчета оставшегося времени
function getTimeRemaining(endtime) {
//Установка текущей даты и даты окончания акции	
  let 	t = Date.parse(endtime) - Date.parse(new Date()),
		seconds = Math.floor((t / 1000) % 60),
		minutes = Math.floor((t / 1000 / 60) % 60),
		hours = Math.floor((t / (1000 * 60 * 60)) % 24),
		days = Math.floor(t / (1000 * 60 * 60 * 24));
  	//Возврат объекта данных времени
  	return {
	    'total': t,
	    'days': days,
	    'hours': hours,
	    'minutes': minutes,
	    'seconds': seconds
  	};
};

//Функция запуска таймера 
function initializeClock(id, endtime) {
//Задание элементов для вывода данных
  let 	clock = document.getElementById(id),
		daysSpan = clock.querySelector('.days'),
		hoursSpan = clock.querySelector('.hours'),
		minutesSpan = clock.querySelector('.minutes'),
		secondsSpan = clock.querySelector('.seconds'),
		timer;

//Функция таймера обратного отсчета		
  function updateClock() {
    let t = getTimeRemaining(endtime);

//Вывод оставшегося времени 
    daysSpan.innerHTML = t.days;
    hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
    minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
    secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

//Действия, выполняющиеся после завершения отсчета таймера
    if (t.total <= 0) {
	    clearInterval(timeinterval);
	    promoTitle.textContent = 'Акция завершилась:';
	    daysSpan.innerHTML = '0';
	    hoursSpan.innerHTML = '00';
	    minutesSpan.innerHTML = '00';
	    secondsSpan.innerHTML = '00';

	    timer = 0;//Переменная для контроля действия акции и доступности скидки
    } else {
		timer = 1;
    }
};

//Активация промокода и проверки наличия скидки
promocodeValue.addEventListener('change', () => {

	if (timer === 0) {//Действия после завершения срока акции
		discountValue.textContent = 'Акция завершилась!';
		discountValue.style.background = 'red';
		discountValue.style.color = 'white';
	} else if (promocodeValue.value !== promo.textContent) {//Действия при неправильном промокоде
		discountValue.textContent = 'Неверный промокод!';
		discountValue.style.background = 'red';
		discountValue.style.color = 'white';
	} else {//Действия при правильном промокоде
		discountValue.textContent = 'Вам полагается скидка 20%';
		discountValue.style.background = 'green';
		discountValue.style.color = 'white';
	}
});

updateClock();
var  timeinterval = setInterval(updateClock, 1000);//Установка интервала работы таймера в 1 секунду
};
 
var deadline = '2018-08-31 23:59:59 GMT+0300';//Установка времени завершения срока акции
initializeClock('clockdiv', deadline);//Запуск таймера по id

