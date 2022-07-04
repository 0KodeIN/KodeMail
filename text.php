<?php
require_once('db.php'); // подключаем файлы с конфигурацией БД
foreach(array_keys($_POST) as $key)
$id = $key;   //получаем значение id с клиента
$sql = "SELECT article_text FROM articles WHERE id_article = '$id'"; 
$result = $conn->query($sql); // ищем в базе текст по id
foreach ($result as $row) {
    $table[] = $row;   
}
echo json_encode($table); // отправляем json