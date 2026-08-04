/* ==========================================
   ACE Progress Tracker™
   Settings Controller
========================================== */



document.addEventListener(
    "DOMContentLoaded",
    () => {

        loadSettingsPage();

        setupDarkToggle();

    }
);





/* ==========================================
   Load Settings
========================================== */


function loadSettingsPage(){


    const settings =

        getSettings();




    // Dark mode

    document.getElementById(
        "darkModeToggle"
    ).checked =

        settings.theme === "dark";





    // Notifications

    document.getElementById(
        "studyNotifications"
    ).checked =

        settings.studyNotifications !== false;




    document.getElementById(
        "achievementNotifications"
    ).checked =

        settings.achievementNotifications !== false;





    // Account

    const profile =

        getData(
            "studentProfile"
        )
        ||
        {};



    document.getElementById(
        "accountName"
    ).value =

        profile.name || "";



    document.getElementById(
        "accountEmail"
    ).value =

        profile.email || "";





    // Customization

    document.getElementById(
        "themeColor"
    ).value =

        settings.color || "blue";



    document.getElementById(
        "fontSize"
    ).value =

        settings.fontSize || "normal";



}





/* ==========================================
   Dark Mode Switch
========================================== */


function setupDarkToggle(){


    const toggle =

        document.getElementById(
            "darkModeToggle"
        );



    if(toggle){


        toggle.addEventListener(

            "change",

            () => {


                toggleTheme();


                saveSettingsPage();


            }

        );


    }


}





/* ==========================================
   Save Settings
========================================== */


function saveSettingsPage(){



    const settings = {


        theme:

        document.getElementById(
            "darkModeToggle"
        ).checked

        ? "dark"

        : "light",





        studyNotifications:

        document.getElementById(
            "studyNotifications"
        ).checked,





        achievementNotifications:

        document.getElementById(
            "achievementNotifications"
        ).checked,





        color:

        document.getElementById(
            "themeColor"
        ).value,





        fontSize:

        document.getElementById(
            "fontSize"
        ).value



    };





    saveSettings(
        settings
    );



    applyCustomization(
        settings
    );



    alert(
        "Settings saved ✅"
    );



}





/* ==========================================
   Customization
========================================== */


function applyCustomization(settings){



    // Font size

    document.body.classList.remove(
        "large-font",
        "extra-font"
    );



    if(settings.fontSize === "large"){


        document.body.classList.add(
            "large-font"
        );


    }



    if(settings.fontSize === "extra"){


        document.body.classList.add(
            "extra-font"
        );


    }






    // Theme color

    document.documentElement.style
    .setProperty(

        "--primary-color",

        getColor(
            settings.color
        )

    );


}





function getColor(color){


    const colors = {


        blue:"#2563eb",

        purple:"#9333ea",

        pink:"#ec4899",

        green:"#16a34a"


    };



    return colors[color]
    ||
    colors.blue;


}





console.log(
    "Settings System Ready ⚙️"
);