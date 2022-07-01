<?php
$start = microtime(true);
require_once('db.php');
// $endPoint = "https://ru.wikipedia.org/w/api.php";
foreach(array_keys($_POST) as $key)
$searchPage = $key;
$sql = "SELECT * FROM articles WHERE art_name = '$searchPage'";
$result = $conn->query($sql);
foreach ($result as $row) {
    if($row['art_name'] == $searchPage){
        echo "Страница уже существует";
        exit(0);
    }
}
$params = [
    "action" => "query",
    "list" => "search",
    "srsearch" => $searchPage,
    "format" => "json",
    "prop"  =>  "info",
    "sroffset" => 0
];
require 'simple_html_dom.php';
$url = $endPoint . "?" . http_build_query( $params );
$ch = curl_init( $url );
curl_setopt( $ch, CURLOPT_RETURNTRANSFER, true );
$output = curl_exec( $ch );
curl_close( $ch );
$result = json_decode( $output, true );
print_r($result);
$parse_url = "https://ru.wikipedia.org/wiki/" . $searchPage;
//$parse_url = "https://ru.wikipedia.org/?curid=" . $result['query']['search'][0]['pageid'];
// $text = strip_tags(file_get_contents($parse_url));
// $array = ["document","Element","?",".", ""];
//$text = str_replace($array , "", $text);
//$text = file_get_contents($parse_url);
//echo htmlspecialchars($file);
// $text=preg_replace('#(\<iframe.*?\/iframe>)#u',"",$text);
// $text=preg_replace('#(\<script.*?\/script>)#u',"",$text);
// $text=preg_replace('#(\<(\/?[^>]+)>)#u',"",$text);
// $text=preg_replace('#((\n\r)+)#u',"",$text);
// $text=preg_replace('[",\t"," \t,"]',"",$text);
// $format=strstr($text,'});});});',tru);
// $text = substr($text,'});});});' , 'mw-parser-output');
// echo $text;
$html = file_get_html($parse_url);
$cases =  $html->find('.vector-body', 0)->plaintext;
$title = $html->find('#firstHeading', 0)->plaintext;
echo 'Время выполнения скрипта: '.round(microtime(true) - $start, 4).' сек.' . ' Заголовок: ' . $title;
// $atom_words = explode(" ", $cases);
// for($i=0; $i<count($atom_words); $i++){
//     echo $atom_words[$i] . " [" . $i . "] ";
// }
// echo $result['query']['search'][0]['snippet'];
$sql = "INSERT INTO articles (article_text, art_name, link) VALUES (?,?,?)";
$conn->prepare($sql)->execute([$cases, $title, $parse_url]);
// $title = $result['query']['search'][0]['title'];
// $str = "Импорт завершен. Название статьи: " . $title;
// echo $str;
// clearstatcache();
?>