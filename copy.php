<?php
$start = microtime(true);
require_once('db.php'); // подключаем файл с конфигурацией БД
foreach(array_keys($_POST) as $key)
$searchPage = $key; // получаем данные для поиска с клиента
$sql = "SELECT * FROM articles WHERE art_name = '$searchPage'";
$result = $conn->query($sql);
require_once 'simple_html_dom.php'; // подключаем библиотеку для парсинга
$parse_url = "https://ru.wikipedia.org/wiki/" . $searchPage; // url страницы википедии
$html = file_get_html($parse_url); // отображаем страницу в html 
$cases =  $html->find('.vector-body', 0)->plaintext; // получаем голый текст по селектору класса
$cases = preg_replace('~:~' , ' ', $cases);
$title = $html->find('#firstHeading', 0)->plaintext; // получаем заголовок
echo 'Время выполнения скрипта: '.round(microtime(true) - $start, 4).' сек.' . ' Заголовок: ' . $title;
$sql = "INSERT INTO articles (article_text, art_name, link) VALUES (?,?,?)";
$conn->prepare($sql)->execute([$cases, $title, $parse_url]); // Добавляем новую запись 
$sql = "SELECT * FROM articles WHERE art_name = '$title'";
$result = $conn->query($sql);

foreach ($result as $row) {
    if($row['art_name'] == $title){
        $id_article = $row['id_article']; // ищем id текста вики
    }
}
$sql = "INSERT INTO words (word, count, id_article) VALUES (?,?,?)";
$atom_words = explode(" ", $cases); // убираем лишние пробелы
$atom_words = array_count_values($atom_words); // считаем кол-во вхождений
foreach($atom_words as $word => $word_count ) {
    $atom_words[':'.$word] = $word_count; // создаем ассоциативный массив
}

$conn->beginTransaction(); // создаем транзакцию для ускоренного множественного добавления
/* Вставка множества записей по принципу "все или ничего" */
$sth = $conn->prepare($sql);
foreach($atom_words as $word => $word_count ) {
    $word = preg_replace('/\s+/', '', $word); // убираем лишние символы
    if($word != ''){
        $sth->execute(array(
            $word,
            $word_count,
            $id_article,
        ));
    }
}
/* Фиксация изменений */
$conn->commit();
?>