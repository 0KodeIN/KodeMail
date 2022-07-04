copy.onclick = function(){
    let promise = new Promise((resolve, reject) => { // создаем promise

        const text = document.getElementById('search_import').value; // получаем значение
        const request = new XMLHttpRequest();
        request.onreadystatechange = function(){
            if(this.readyState == 4){ // если нет ошибок, получаем ответ
                requestFunction(this.responseText);
                resolve("result");
            }
        }
        request.open("POST", "copy.php", true); // подготовка к отправке
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'); // устанавливаеи заголовок
        request.send(text); // отправляем данные на сервер
      
    });
    promise
        .then( // выполняем после завершения скрипта
            result => {
                getTable(); // обновляем таблицу
            },
            error => {
      
            alert("Rejected: " + error); // выводим ошибку
            }
    );
    
}
search.onclick = function(){
    const text = document.getElementById('search_name').value;
    const request = new XMLHttpRequest();
    request.onreadystatechange = function(){
        if(this.readyState == 4){
            var data = this.responseText;
            try { // проверяем полученный json
                data = JSON.parse(data);
                searchWord(data);
            } catch (error) {
                alert("Элемент не найден");
            }

        }
    }

    request.open("POST", "search.php", true);
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    request.send(text);
}

function requestFunction(data){ // добавляем ответ на страницу
    let Div = document.getElementById('content-text');
    if(document.getElementById('copy-wiki') != null){
        let deleteDiv = document.getElementById('copy-wiki');
        deleteDiv.remove();
    }
    let div = document.createElement('div');
    div.className = "copy-wiki";
    div.innerHTML = "<p>" + data + "</p>";
    div.id = "copy-wiki";
    Div.append(div);
}
function getSearch(data){
    console.log(JSON.parse(data));
}

function getTable(){ // получение таблицы с сервера
    if(document.getElementById('content-table') != null){
        let Div = document.getElementById('content-table');
        while (Div.firstChild) {
            Div.removeChild(Div.firstChild); //удаление таблицы
        }
    }
    const request = new XMLHttpRequest();
    request.onreadystatechange = function(){
        if(this.readyState == 4){
            var table = this.responseText;
            table = JSON.parse(table);
            setTable(table);
        }
    }
    request.open("GET", "table.php", true);
    request.send();
    
}
function setTable(table){ // вывод таблицы
    let Div = document.getElementById('content-table');
    table.forEach(row => { //новая таблица
        var div =  document.createElement('div');
        div.className = "table-flex";
        Div.append(div);
        var p = document.createElement('p');
        p.innerHTML = row.art_name + " ";
        var a = document.createElement('a');
        a.innerHTML = row.link;
        a.href = row.link;
        div.append(p);
        div.append(a);
    });
 
}
function searchWord(table){ // поиск слова
    let Div = document.getElementById('search-links');
    while (Div.firstChild) {
        Div.removeChild(Div.firstChild); //удаление таблицы
    }
    table.forEach(row => { //новая таблица
        var div =  document.createElement('div');
        div.className = "table-flex";
        div.innerHTML = "<p onclick = getText(" + row.id_article + ")>"
         + row.art_name + " количество вхождений(" + row.count + ") </p>";
        Div.append(div);
    });
 
}
function getText(id){ // получение текста с сервера
    const request = new XMLHttpRequest();
    request.onreadystatechange = function(){
        if(this.readyState == 4){
            var text = this.responseText;
            text = JSON.parse(text);
            setText(text);
        }
    }
    request.open("POST", "text.php", true);
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    request.send(id); 
}

function setText(text){ // вывод текста
    let Div = document.getElementById('search-text');
    while (Div.firstChild) {
        Div.removeChild(Div.firstChild); //удаление таблицы
    }
    Div = document.getElementById('search-text');
    var div =  document.createElement('div');
    div.className = "search_text";
    div.innerHTML = "<p>" + text[0].article_text + "</p>";
    div.id = 'text_id';
    Div.append(div);
}
window.onload = getTable(); // вывод таблицы при загрузке страницы 




