<?php
mb_http_output('UTF-8');
require_once('db.php');
$sql = "SELECT `id_article`,`art_name`,`link` FROM `articles` ";
$result = $conn->query($sql);
foreach ($result as $row) {
    $table[] = $row;   
}
echo json_encode($table);

