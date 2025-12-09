document.addEventListener("DOMContentLoaded", function(){
    const hamburger = document.getElementById("hamburger");
    const sideMenu = document.getElementById("sideMenu");

    hamburger.addEventListener("click", function(){
        if(sideMenu.style.left === "0px"){sideMenu.style.left="-300px";}
        else{sideMenu.style.left="0px";}
    });

    document.addEventListener("click", function(e){
        if(!sideMenu.contains(e.target) && !hamburger.contains(e.target)){
            if(window.innerWidth < 992){ sideMenu.style.left="-300px"; }
        }
    });
});
