/* ==========================================
   ACE Progress Tracker™
   Main App Controller
========================================== */



/* ==========================================
   App Start
========================================== */


document.addEventListener(
    "DOMContentLoaded",
    () => {


        loadTheme();


        registerServiceWorker();


        setupInstallPrompt();


        console.log(
            "ACE Progress Tracker Ready 🚀"
        );


    }
);





/* ==========================================
   Theme System
========================================== */


function loadTheme(){


    const savedTheme =

        localStorage.getItem(
            "aceTheme"
        );



    if(savedTheme === "dark"){


        document.body.classList.add(
            "dark"
        );


    }


}





function toggleTheme(){


    document.body.classList.toggle(
        "dark"
    );



    const darkMode =

        document.body.classList.contains(
            "dark"
        );



    localStorage.setItem(

        "aceTheme",

        darkMode
        ? "dark"
        : "light"

    );


}





/* ==========================================
   PWA Service Worker
========================================== */


function registerServiceWorker(){


    if(
        "serviceWorker" in navigator
    ){


        navigator.serviceWorker.register(

            "service-worker.js"

        )

        .then(

            () => {


                console.log(
                    "Offline mode enabled ⚡"
                );


            }

        )


        .catch(

            error => {


                console.log(
                    "Service Worker Error:",
                    error
                );


            }

        );


    }


}





/* ==========================================
   App Install Prompt
========================================== */


let installPrompt;



window.addEventListener(

    "beforeinstallprompt",

    event => {


        event.preventDefault();


        installPrompt = event;



        console.log(
            "Install available 📱"
        );


    }

);





function installApp(){


    if(!installPrompt){


        alert(
            "App installation is not available yet."
        );


        return;


    }



    installPrompt.prompt();



    installPrompt = null;


}





/* ==========================================
   Global Message
========================================== */


function showMessage(message){


    alert(message);


}