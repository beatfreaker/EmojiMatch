(function () {
    
    var easyOpt = {"time": 10, "moves": 30};
    var mediumOpt = {"time": 5, "moves": 30};
    var hardOpt = {"time": 2, "moves": 10};
    var stageOpt = easyOpt;
    
    switch (Url.queryString("stage")) {
        case "easy":
            stageOpt = easyOpt;
            document.querySelector(".easy").classList.add("selected");
            break;
        case "medium":
            stageOpt = mediumOpt;
            document.querySelector(".medium").classList.add("selected");
            break;
        case "hard":
            stageOpt = hardOpt;
            document.querySelector(".hard").classList.add("selected");
            break;
        default:
            stageOpt = easyOpt;
            document.querySelector(".easy").classList.add("selected");
            break;
    }
    

    var grid = new Match(".grid", {
        templateElm: ".templates > div"
      , autoremove: false
      , size: {
            x: 6
          , y: 3
        }
      , step: {
            x: 100
          , y: 100
        }
    }, EMOJIS);

    grid.on("win", function () {
        
        setTimeout(function () {
            alert('you won');
            location.reload();
        }, 1000);
    });

    grid.on("activate", function (elm) {
        elm.children[1].classList.remove("flipInY");
        elm.children[0].classList.remove("flipOutY");

        elm.children[0].classList.add("flipInY", "animated");
        elm.children[1].classList.add("flipOutY", "animated");
    });

    grid.on("deactivate", function (elm) {
        elm.children[0].classList.remove("flipInY");
        elm.children[1].classList.remove("flipOutY");

        elm.children[1].classList.add("flipInY", "animated");
        elm.children[0].classList.add("flipOutY", "animated");
    });

    grid.on("success", function (elm1, elm2) {
        setTimeout(function() {
            elm1.classList.add("zoomOut", "animated");
            elm2.classList.add("zoomOut", "animated");
            setTimeout(function() {
                elm1.remove();
                elm2.remove();
            }, 500);
        }, 1000);
    });
    
    grid.on("time", function (time) {
        var sec = time / 1000;
        sec = stageOpt.time * 60 - sec;
        var min = Math.floor(sec / 60);
        sec = Math.floor(sec - min * 60);
        sec = (sec < 10 ? "0" : "") + sec;
        min = (min < 10 ? "0" : "") + min;
        
        document.querySelector(".timeleft").innerHTML = min + ":" + sec;
        
        if(min == 0 && sec == 0) {
            alert("You lost.");
            location.reload();
        }
    });

    grid.start();
    
    document.querySelector(".templates").style.display = "none";
    
})();
