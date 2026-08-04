/* ==========================================
   ACE Progress Tracker™
   Dashboard V2 Controller
========================================== */



document.addEventListener(

    "DOMContentLoaded",

    () => {


        setupSidebar();


        setupDarkMode();


        setupNotifications();


        setupCounters();


    }

);





/* ==========================================
   Mobile Sidebar
========================================== */


function setupSidebar(){


    const menuButton =

        document.querySelector(
            ".menu-btn"
        );



    const sidebar =

        document.querySelector(
            ".sidebar"
        );



    if(menuButton && sidebar){


        menuButton.addEventListener(

            "click",

            () => {


                sidebar.classList.toggle(
                    "active"
                );


            }

        );


    }


}





/* ==========================================
   Dark Mode
========================================== */


function setupDarkMode(){


    const darkButton =

        document.querySelector(
            ".dark-toggle"
        );



    if(darkButton){


        darkButton.addEventListener(

            "click",

            () => {


                toggleTheme();


            }

        );


    }


}





/* ==========================================
   Notifications
========================================== */


function setupNotifications(){


    const notificationButton =

        document.querySelector(
            ".notification-btn"
        );



    if(notificationButton){


        notificationButton.addEventListener(

            "click",

            () => {


                showMessage(
                    "🔔 No new notifications"
                );


            }

        );


    }


}





/* ==========================================
   Animated Numbers
========================================== */


function setupCounters(){


    const counters =

        document.querySelectorAll(
            ".counter"
        );



    counters.forEach(

        counter => {


            const target =

                Number(
                    counter.dataset.value
                );



            let current = 0;



            const speed =

                Math.max(
                    target / 80,
                    1
                );



            function update(){


                current += speed;



                if(current < target){


                    counter.textContent =

                        Math.floor(
                            current
                        );


                    requestAnimationFrame(
                        update
                    );


                }

                else {


                    counter.textContent =
                        target;


                }


            }



            update();


        }

    );


}





/* ==========================================
   Quick Actions
========================================== */


function openPACE(){


    window.location.href =
        "paces.html";


}





function openReports(){


    window.location.href =
        "reports.html";


}





console.log(
    "Dashboard V2 Loaded ✨"
);
/* ==========================================
   Dashboard V2
   Achievement Integration
========================================== */


document.addEventListener(

"DOMContentLoaded",

loadDashboardRewards

);





function loadDashboardRewards(){


const xp =

getData(
"xp"
)
||
0;




const achievements =

getData(
"achievements"
)
||
[];





const xpBox =

document.getElementById(
"dashboardXP"
);




const levelBox =

document.getElementById(
"dashboardLevel"
);





if(xpBox){


xpBox.textContent =

"XP: "
+
xp
+
" ⭐";


}





if(levelBox){


levelBox.textContent =

"Level "
+
(
Math.floor(
xp / 500
)
+
1
);


}







displayRecentBadges(
achievements
);


}







function displayRecentBadges(list){


const container =

document.getElementById(
"recentAchievements"
);




if(!container)

return;





if(list.length===0){

container.innerHTML=

`

<p>
Complete PACEs to unlock badges 🏆
</p>

`;

return;

}





container.innerHTML =

`


<p>
🏅 ${list.length} Achievements Unlocked
</p>


<div class="badge-row">


${

list.slice(-3)

.map(

badge =>

`

<span class="badge">

🏆

</span>

`

)

.join("")

}


</div>


`;



}