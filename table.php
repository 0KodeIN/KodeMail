<?php
require_once('db.php'); // подключаем файлы с конфигурацией БД
$sql = "SELECT `id_article`,`art_name`,`link` FROM `articles` "; 
$result = $conn->query($sql); // ищем в базе данные о тексте вики
foreach ($result as $row) {
    $table[] = $row;   
}
echo json_encode($table); // отправляем json

