//if you provide dollar function with a function as an argument, jQuery will know that you want to register this function on the ready event.
$(function(){  

    let container = $('#main-menu');

    function handleMenu(){
        let menu1 = $('.menu-item > a');
        let home = $('.sub-home');
        let accnt = $('.account');

        $('#home, .sub-home').hover( // you must use these both in the same selector, list item anchor and sub menu anchor 
            function(){
                home.stop().fadeIn();
            },
            function(){
                home.stop().fadeOut();
            }
        )
        $('#account, .account').hover(
            function(){
                accnt.stop().slideDown();  // If you want to hover on submenu, you must use stop() in both functions.
            },
            function(){
                accnt.stop().slideUp();
            }
        )
    }

    function buildMenuItem(data){
        let el,
            infoPanel;
        el = $('<li class="menu-item">' + 
                    '<a href="#" id="home">' + data.title + '</a>' + 
                    '<div class="sub-home"></div>' + 
                '</li>');

        return el;
    }

    $.get('api/menu.json', function(data){ // this is normally a live URL
        //data has been loaded.
        //console.log(data);

        //Clean the <ul></ul> element first
        container.empty(); 

        data.forEach(function(menuItem){
            container.append(buildMenuItem(menuItem));
        })
    })

});