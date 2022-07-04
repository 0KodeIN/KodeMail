<?php
require_once('db.php'); // подключаем файлы с конфигурацией БД
foreach(array_keys($_POST) as $key)
$searchPage = $key;
$sql = "SELECT articles.id_article, words.word, words.count, articles.art_name 
        FROM words 
        INNER JOIN articles  ON articles.id_article = words.id_article 
        WHERE BINARY word = '$searchPage' 
        ORDER BY words.count DESC"; 
$result = $conn->query($sql);
// ищем в БД слово. Используем запрос с соединением для получения
// данных с 2 связанных таблиц
foreach ($result as $row) {
    $table[] = $row;              
}
echo json_encode($table); // отправляем json

