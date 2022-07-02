copy.onclick = function(){
    const text = document.getElementById('search').value;
    const request = new XMLHttpRequest();
    request.onreadystatechange = function(){
        if(this.readyState == 4){
            requestFunction(this.responseText);
        }
    }
    request.open("POST", "copy.php", true);
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    request.send(text);
}

function requestFunction(data){
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
function getTable(){
    const request = new XMLHttpRequest();
    request.onreadystatechange = function(){
        if(this.readyState == 4){
            var table = this.responseText;
            table = JSON.parse(table);
            console.log(table[1].art_name);
            setTable(table);
        }
    }
    request.open("GET", "table.php", true);
    request.send();
    
}
function setTable(table){
    let Div = document.getElementById('content-table');
    for(let i = 0; i < 7; i++){
        var p = document.createElement('p');
        p.innerHTML = table[i].art_name + " ";
        var a = document.createElement('a');
        a.innerHTML = table[i].link;
        a.href = table[i].link;
        Div.append(p);
        Div.append(a);
    }
    
}
window.onload = getTable();
// <?foreach ($result as $row) {?>
//     <a target = "blank" href = <? echo $row['link']?>><? echo $row['link']?></a>
//     <p><? echo $row['art_name']?></p>
//     <? } ?>



