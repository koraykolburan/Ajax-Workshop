//----------------- NAVBAR --------------------------
$(function(){  // (FIRST) All of our code to be run only when the DOM has been completely loaded.
    
    let container = $('#main-menu'); 

    function handleMenu(){    // (1)   ----------- This is for HOVERING MOUSE ITEM (with submenu) ----------
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
            infoPanel; // >> this is for images and titles on the sub menu
        el = $('<li class="menu-item">' +     // Main Menu Items
                    '<a href="#" id="home">' + 
                        data.mainTitle + 
                    '</a>' + 
                    '<div class="sub-home">' +
                        '<ul>' + 
                        '</ul>' +
                    '</div>' +
                '</li>');

        if(data.infoPanel && data.infoPanel.length) { // Adding img and titles to sub menu from JSON
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

        return el;// And then it will give us back the jQuery WRAPPER for that HTML ELEMENT which is Reviews
    }

    $.get('api/menu.json', function(dataJson){ // (2) We asked a server to give us the content of the menu that JSON
        //data has been loaded.
        //console.log(data);

        //Clean inside of the <ul></ul>(#main-menu') element first
        container.empty(); 

        dataJson.forEach(function(menuItem){ //And then forEach element of that we built the menu item with MenuItem function
            container.append(buildMenuItem(menuItem)); // Adding the submenu inside of the "<ul></ul>"
        }) // after that we run forEach to get JSON data, we made a function to create menu which is buildMenuItem and then we will create buildMenuItem separately(above ^)

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

// -------------------------------------------- Main Content --------------------------------------------------

$(function(){

    function mainContentItems(data2){   // 2
        let el2,
            showCase;

        el2 = $('<li>' +
                    '<h2 href="#" id="">' + 
                        data2.mainNews + 
                    '</h2>' + 
                    '<div class="sub-content">' + 
                        '<ul>' + 
                        '</ul>' + 
                    '</div>' +
                '</li>'
                );

        if(data2.showCase && data2.showCase.length) {  // 3
            showCase = $('div.sub-content>ul', el2); 
            data2.showCase.forEach(function(entry2){ 
                showCase.append("<li>" + 
                                    '<a href="#">' + 
                                        '<span id="span-content1">' + 
                                            entry2.title +
                                        '</span>' +
                                        "<img class='sub-content-image' src='" + 
                                            entry2.image + 
                                        "'>" +
                                        '<span id="span-content2">' +
                                            entry2.news +
                                        '</span>' +  
                                    "</a>" + 
                                "</li>"); 
            });
        }


        return el2;
    }


    let container2 = $('#main-content');
        
    

    $.get('api/main-content.json', function(dataJson2){ // 1
        //console.log(dataJson2);
        //container2.empty();

        dataJson2.forEach(function(mainContent){
            container2.append(mainContentItems(mainContent));
        });


    })

})  
