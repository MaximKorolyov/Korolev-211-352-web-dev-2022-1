/* eslint-disable max-len */
const UUID = "?api_key=789dd599-7f99-4044-8d80-118794851582";
const TOUR_API = "https://edu.std-900.ist.mospolytech.ru/api/routes?api_key=789dd599-7f99-4044-8d80-118794851582";
const GUIDE_API = "https://edu.std-900.ist.mospolytech.ru/api/routes/";
const ORDERS_API = "https://edu.std-900.ist.mospolytech.ru/api/orders/";

function massage() {
    let elem = document.getElementById("divmassage");
    let mass = document.createElement("p");
    let balv = document.getElementById("balv");
    try {
        balv.remove();
        mass.setAttribute("id", "mass");
        balv.innerHTML = "Сообщений пока нет";
        mass.innerHTML = "Спасибо, что выбрали нас)";

        elem.appendChild(mass);

        setTimeout(function () {
            elem.appendChild(balv);
            mass.remove();
            close.remove();
        }, 10000);
    } catch (err) {
        alert("Ошибка сообщения");
    }

}

//Пагинация
function pagination(querySet, page, rows) {
    var trimStart = (page - 1) * rows;
    var trimEnd = trimStart + rows;
    var trimmedData = querySet.slice(trimStart, trimEnd);
    var pages = Math.round(querySet.length / rows);
    return {
        querySet: trimmedData,
        pages: pages,
    };
}

//Тур
function get_tour() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", TOUR_API, false); 
    xhr.send();
    if (xhr.status != 200) {
        alert(xhr.status + ": " + xhr.statusText);
    } else {
        return JSON.parse(xhr.responseText);
    }
}

//Гид
function get_guides(id) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", (GUIDE_API + id + "/guides" + UUID), false); 
    xhr.send();
    if (xhr.status != 200) {
        alert(xhr.status + ": " + xhr.statusText);
    } else {
        return JSON.parse(xhr.responseText);
    }
}

//Кнопочки пагинации
function pageButtons(stateWrapper, pages, state) {
    var wrapper = document.getElementById(stateWrapper);
    wrapper.innerHTML = ``;
    console.log("Pages:", pages);
    var maxLeft = state.page - Math.floor(state.window / 2);
    var maxRight = state.page + Math.floor(state.window / 2);
    try {
        if (maxLeft < 1) {
            maxLeft = 1;
            maxRight = state.window;
        }
        if (maxRight > pages) {
            maxLeft = pages - (state.window - 1);
            if (maxLeft < 1) {
                maxLeft = 1;
            }
            maxRight = pages;
        }
        for (var page = maxLeft; page <= maxRight; page++) {
            wrapper.innerHTML += 
            `<button value=${page} class="page btn
            btn-sm btn-light">${page}</button>`;
        }
        if (state.page != 1) {
            wrapper.innerHTML =
                `<button value=${1} class="page btn
                btn-sm btn-light">&#171; First</button>` +
                wrapper.innerHTML;
        }
        if (state.page != pages) {
            wrapper.innerHTML += 
            `<button value=${pages} class="page btn btn-sm
            btn-light">Last &#187;</button>`;
        }
        //Очистка страницы
        $(".page").on("click", function () {
            $(state.table).empty();
            state.page = Number($(this).val());
            state.get_API();
        });
    } catch (err) {
        alert("Ошибка пагинации");
    }
}

//Поиск по списку маршрутов
var state1 = {
    querySet: get_tour(),
    page: 1,
    rows: 10,
    window: 5,
    table: ".route_choose_fill",
    stateWrapper: "pge",
    selected: 0,
    get_API:
		function get_tour_API() {
            
		    var data = pagination(state1.querySet, state1.page, state1.rows);
		    var myList = data.querySet;
		    console.log(myList);
		    let list = document.querySelector(state1.table);
		    var key = 1;
		    try {
		        for (key in myList) {
		            list.innerHTML += `<tr>
                                    <th scope="row">${myList[key].id - 1}</th>
                                    <td>${myList[key].name}</td>
                                    <td>${myList[key].description}</td>
                                    <td>${myList[key].mainObject}</td>
                                    <td>
                                    <button type="button"
                                    class="btn btn-light btn-tour"
                                    onclick="select_draw(this, ${myList[key].id})" >
                                    Выбрать</button>
                                    </td>
                                </tr>`;
		        }
		        pageButtons(state1.stateWrapper, data.pages, state1);
		    } catch (err) {
		        alert("Ошибка поиска");
		    }
		}
};

//Поиск гидов
var state2 = {
    querySet: null,
    page: 1,
    rows: 10,
    window: 5,
    table: ".guide_choose_fill",
    stateWrapper: "pge-guides",
    selected: 0,
    
    get_API: 
		function get_guide_API() {
		    var data = pagination(state2.querySet, state2.page, state2.rows);
		    var myList = data.querySet;
		    console.log(myList);
		    let list = document.querySelector(state2.table);
		    var key = 1;
		    try {
		        for (key in myList) {
		            list.innerHTML += `<tr>
                                    <th scope="row">${myList[key].id}</th>
                                    <td>${myList[key].name}</td>
                                    <td>${myList[key].language}</td>
                                    <td>${myList[key].workExperience} лет</td>
                                    <td>${myList[key].pricePerHour} рублей</td>
                                    <td>
                                    <button type="button" class="btn btn-light
                                    btn-guides"onclick = "selectGuide
                                    (this, ${myList[key].id})" selected = "false">
                                    Выбрать</button>
                                    </td>
                                </tr>`;
		        }
		        pageButtons(state2.stateWrapper, data.pages, state2);
		    } catch (err) {
		        alert("Ошибка поиска");
		    }
		}
};

let tour = get_tour();

//Кнопочки, когда выбираем маршрут,тур
function select_draw(el, id) {
    let all = document.querySelectorAll(".btn-tour");
    try {
        for (let i = 0; i < all.length; i++) {
            all[i].innerHTML = "Выбрать";
        }
        el.innerHTML = "Выбрано!";
        let tourName = document.querySelector("#tour-name");
        for (var i = 0; i < tour.length; i++) {
            if (tour[i]["id"] == id) {
                tourName.innerHTML = " " + tour[i].name;
                state2.querySet = get_guides(id);
                state1.selected = id;
                state2.get_API();
                break;
            }
        }
    } catch (err) {
        alert("Ошибка при выборе!");
    }
}

//Кнопочки, когда выбираем гида
function selectGuide(el, id) {
    let all = document.querySelectorAll(".btn-guides");
    
    for (let i = 0; i < all.length; i++) {
        all[i].innerHTML = "Выбрать";
    }
    el.innerHTML = "Выбрано!";
    state2.selected = id;
}
window.onload = function () {
    state1.get_API();
};

guideName = document.querySelector("#guideName");
routeName = document.querySelector("#routeName");
SC = document.querySelector(".checkboxSC");
TS = document.querySelector(".checkboxTS");
dataInput = document.querySelector(".dataInput");
timeInput = document.querySelector(".timeInput");
total = document.querySelector(".total-summary").innerHTML;
console.log(total);
duration = document.querySelector("#duration");
peopleAmount = document.querySelector("#peopleAmount");

//Создание заявки
function makeRequest() {
    isItMorning = false;
    isItEvening = false;
    console.log(routeName);
    try {
        for (var i = 0; i < state2.querySet.length; i++) {
            if (state2.querySet[i]["id"] == state2.selected) {
                console.log(state2.querySet[i]["id"]);
                console.log(state2.selected);
                guideName.innerHTML = state2.querySet[i].name;
                total = state2.querySet[i].pricePerHour;
                console.log(total);
                break;
            }
        }
        for (var i = 0; i < state1.querySet.length; i++) {
            if (state1.querySet[i]["id"] == state1.selected) {
                console.log(state1.querySet[i]["id"]);
                console.log(state1.selected);
                routeName.innerHTML = state1.querySet[i].name;
                break;
            }
        }
    } catch (err) {
        alert("Ошибка! Не удалось создать заявку");
    }

}

//Сохранение запроса
function saveRequest() {
    var data = new FormData();
    try {
        data.append('date', dataInput.value);
        data.append('duration', duration.selectedIndex + 1);
        data.append('guide_id', 'place');
        data.append('id', 'key');
        data.append('optionFirst', 'person');
        data.append('optionSecond', 'password');
        data.append('persons', 'place');
        data.append('price', 'key');
        data.append('route_id', 'person');
        data.append('student_id', 'password');
        data.append('time', 'place');
        var xhr = new XMLHttpRequest();
        xhr.open("GET", TOUR_API, false); 
        xhr.send();
        if (xhr.status != 200) {
            alert(xhr.status + ": " + xhr.statusText);
        } else {
            return JSON.parse(xhr.responseText);
        }
    } catch (err) {
        alert("Ошибка сохранения");
    }
}