
$(function(){  // (1) All of our code to be run only when the DOM has been completely loaded.
    
    let container = $('#main-menu'); 

    function handleMenu(){         //----------- This is for HOVERING MOUSE ITEM (with submenu) ----------
        let menu1 = $('.menu-item > a');
        let home = $('.sub-home');
        let accnt = $('.account');

        $('#home, .sub-home').hover( // You must use these both in the same selector, list item anchor and sub menu. anchor 
            function(){
                home.stop().fadeIn();
            },
            function(){
                home.stop().fadeOut();
            },
        );
        $('#account, .account').hover(
            function(){
                accnt.stop().slideDown();  // If you want to hover on submenu, you must use stop() in both functions.
            },
            function(){
                accnt.stop().slideUp();
            }
        );
        
        
        //For Responsive Menu

        $('#home, #account').on("touchstart.noPreventDefault", dropDown); 
    
        function dropDown(evt){
            $(this).siblings('.sub-home, .account').toggle('.is-visible');
            return false;
        }; 
        
    }

    function buildMenuItem(data){  // (3) ---------------- This function builds the MENU ITEM --------------------
        let el,
            infoPanel;
        el = $('<li class="menu-item">' +     // Sub Menu Items
                    '<a href="#" id="home">' + 
                        data.mainTitle + 
                    '</a>' + 
                    '<div class="sub-home">' +
                        '<ul>' + 
                        '</ul>' +
                    '</div>' +
                '</li>');

        if(data.infoPanel && data.infoPanel.length) { // Adding images to sub menu
            infoPanel = $('div.sub-home>ul', el);
            data.infoPanel.forEach(function(entry){
                infoPanel.append("<li>" + 
                                    '<a href="#">' + 
                                    entry.title +
                                        "<img class='sub-home-image' src='" + 
                                            entry.image + 
                                        "'>" +
                                        "<span>" +
                                            entry.product +
                                        "</span>" +  
                                    "</a>" + 
                                "</li>");
            });
        }

        return el;      // And then it will give us back the jQuery WRAPPER for that HTML ELEMENT 
    }

    $.get('api/menu.json', function(data){ // (2) We asked a server to give us the content of the menu that JSON
        //data has been loaded.
        //console.log(data);

        //Clean inside of the <ul></ul>(#main-menu') element first
        container.empty(); 

        data.forEach(function(menuItem){ // And then forEach element of that we built the menu item with MenuItem()
            container.append(buildMenuItem(menuItem)); // Adding the submenu inside of the "<ul></ul>"
        })

        // Search Bar
        container.append('<li class="menu-item">' + 
                            '<input type="text" placeholder="Search..." id="plc1"></input>' +
                            '<button type="submit" id="btn1"><i class="fa fa-search"></i></button>' +
                        '</li>'); 
        
        //Sign in/up
        container.append('<li class="menu-item right-corner" id="listAccount" >' +
                            '<a href="#" id="account" >Account</a>' +
                            '<div class="account" id="subAccount" >' +
                                '<ul>' + 
                                    '<li>' + 
                                        '<a href="#">Sign In</a>' +
                                    '</li>' +
                                    '<li>' + 
                                        '<a href="#">Sign Up</a>' +
                                    '</li>' +
                                '</ul>' +
                            '</div>' +
                        '</li>');

        //Favourites
        container.append('<li class="menu-item right-corner" id="favs">' + 
                            '<a href="#" target="_blank" id="favs1">Favourites</a>' +
                        '</li>');

                        
        // ClearFix 
        container.append('<div class="cf"></div>'); 

        handleMenu(); // HOVER & Sub-Menu
    })

    
    
});
