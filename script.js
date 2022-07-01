copy.onclick = function(){
    const text = document.getElementById('search').value;
    console.log(text);
    const request = new XMLHttpRequest();
    request.onreadystatechange = function(){
        if(this.readyState == 4){
            requestFunction(this.responseText);
        }
    }
    request.open("POST", "copy.php", true);
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    request.send(text);

    // fetch("copy.php", {
    //     method: "POST",
    //     body: text,
    // })
    //     .then(response => {
    //         console.log(response.text());

    //     })
    //     .catch(err => {
    //         console.log(err.text())
    //     })
}

function requestFunction(data){
    console.log(data);
    let Div = document.getElementById('content-1');
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




