/* ==========================================
   ACE Progress Tracker™
   Service Worker
========================================== */


const CACHE_NAME = "ace-tracker-v1";


const FILES_TO_CACHE = [

    "/",
    "/index.html",
    "/login.html",
    "/signup.html",
    "/dashboard.html",
    "/paces.html",

    "/css/style.css",
    "/css/sidebar.css",
    "/css/dashboard-v2.css",
    "/css/cards.css",
    "/css/charts.css",
    "/css/paces.css",
    "/css/animations.css",
    "/css/darkmode.css",

    "/js/app.js",
    "/js/storage.js",
    "/js/auth.js",
    "/js/dashboard.js",
    "/js/dashboard-v2.js",
    "/js/charts.js",
    "/js/paces.js"

];





/* INSTALL */

self.addEventListener(
    "install",
    event => {


        event.waitUntil(

            caches.open(
                CACHE_NAME
            )

            .then(
                cache => {

                    return cache.addAll(
                        FILES_TO_CACHE
                    );

                }

            )

        );


    }

);





/* ACTIVATE */

self.addEventListener(
    "activate",
    event => {


        event.waitUntil(

            caches.keys()

            .then(
                keys => {


                    return Promise.all(

                        keys.map(

                            key => {


                                if(
                                    key !== CACHE_NAME
                                ){

                                    return caches.delete(
                                        key
                                    );

                                }


                            }

                        )

                    );


                }

            )

        );


    }

);





/* FETCH */

self.addEventListener(
    "fetch",
    event => {


        event.respondWith(

            caches.match(
                event.request
            )

            .then(

                response => {


                    return response ||

                    fetch(
                        event.request
                    );


                }

            )

        );


    }

);