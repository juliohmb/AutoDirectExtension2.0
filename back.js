chrome.runtime.onMessage.addListener(function(mess){
    message = mess
    if(favs.length == 0){
        for(var i = 0; i < message.fav.length; i++){
            favs.push(message.fav[i].url)
        }
    }

    if(message.state == "on"){
        timer = setInterval(redirect, (message.secs * 1000))
    }
    if(message.state == "off"){
        clearInterval(timer)
        favs = []
    }
})


function redirect(){
    var tab = message.tabId.id
    var primeiro = favs[0]
    chrome.tabs.update(tab, {url: primeiro})
    favs.shift()
    favs.push(primeiro)

}

var timer
var message
var favs = []