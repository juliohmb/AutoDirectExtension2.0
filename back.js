chrome.runtime.onMessage.addListener(function(mess){
    message = mess
    if(favs.length == 0){
        for(var i = 0; i < message.fav.length; i++){
            favs.push(message.fav[i].url)
        }
    }

    if(message.state == "on"){
        console.log("on")
        timer = setInterval(redirect, (message.secs * 1000))
        countDown = message.secs
        timerCD = setInterval(regressiva, 1000)
    }
    if(message.state == "off"){
        console.log("off")
        clearInterval(timer)
        clearInterval(timerCD)
        favs = []
    }
    function redirect(){
        var tab = message.tabId.id
        var primeiro = favs[0]
        chrome.tabs.update(tab, {url: primeiro})
        favs.shift()
        favs.push(primeiro)
        countDown = message.secs
    }
    function regressiva(){
        console.log(countDown)
        chrome.runtime.sendMessage(countDown)
        countDown--
    }
})


var timer
var timerCD
var countDown = 0
var message
var favs = []