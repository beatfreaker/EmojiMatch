(function () {

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

    grid.start();
    
    document.querySelector(".templates").style.display = "none";
    
})();
