document.body.querySelector("button#onoff").addEventListener("click", function(){
    if(document.body.querySelector("button#onoff").innerHTML == "Ligar" && document.body.querySelector("input").value != ""){
        document.body.querySelector("button#onoff").innerHTML = "Desligar"
        message.state = "on"
        getFavs()
        chrome.storage.local.set({isRunning: true})
    }
    else if(document.body.querySelector("button#onoff").innerHTML == "Desligar"){
        document.body.querySelector("button#onoff").innerHTML = "Ligar"
        message.state = "off"
        chrome.runtime.sendMessage(message)
        chrome.storage.local.set({isRunning: false})
    }
})

function listarOptions(){
    chrome.bookmarks.getTree(function(tree){
        for(var i = 0; i < tree[0].children[0].children.length; i++){
            if(tree[0].children[0].children[i].children != null){
                console.log(tree[0].children[0].children[i].children)

                option = document.createElement("option")
                option.value = tree[0].children[0].children[i].title
                option.innerHTML = tree[0].children[0].children[i].title
                document.body.querySelector("select").appendChild(option)

            }
        }
    })
    chrome.storage.local.get("isRunning", function(state){
        if(state.isRunning == true){

            document.querySelector("button#onoff").innerHTML = "Desligar"
        }
        else if(state.isRunning == false){
            document.querySelector("button#onoff").innerHTML = "Ligar"
        }
    })
}



function getFavs(){
    var selected
    for(var i = 0; i < document.body.querySelectorAll("option").length; i++){
        if(document.body.querySelectorAll("option")[i].selected == true){
            selected = document.body.querySelectorAll("option")[i].innerHTML
        }
    }
    chrome.bookmarks.search(selected, function(n){
        chrome.bookmarks.getChildren(n[0].id, function(pasta){
            favs = pasta
            message.fav = pasta
            getTime()
        })
    })
}


function getTime(){
    time = document.body.querySelector("input").value
    message.secs = document.body.querySelector("input").value
    getTab()
}


function getTab(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        tab = tabs[0]
        message.tabId = tabs[0]
        chrome.runtime.sendMessage(message)
    })
}



listarOptions()

var tab         //pega a aba 
var time        //Pega o tempo para o looping
var favs = {}   //array com os favoritos da pagina

var message = {
    state: "",
    tabId: tab,
    secs: time,
    fav: favs
}