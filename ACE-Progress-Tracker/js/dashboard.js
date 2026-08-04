/* ==========================================
   ACE Progress Tracker™
   Dashboard Data Controller
========================================== */



document.addEventListener(

    "DOMContentLoaded",

    () => {

        loadStudentDashboard();

    }

);





/* ==========================================
   Load Dashboard
========================================== */


function loadStudentDashboard(){


    const profile =

        getData(
            "studentProfile"
        )
        ||
        {};



    const paceData =

        getData(
            "paceData"
        )
        ||
        [];



    updateProfile(
        profile
    );


    updateStats(
        paceData
    );


}





/* ==========================================
   Profile Display
========================================== */


function updateProfile(profile){



    const name =

        document.getElementById(
            "dashboardName"
        );



    const image =

        document.getElementById(
            "dashboardProfile"
        );





    if(name){


        name.textContent =

            profile.name
            ||
            "Student";


    }






    if(image && profile.image){


        image.src =

            profile.image;


    }



}





/* ==========================================
   Statistics
========================================== */


function updateStats(paces){



    let completed = 0;

    let totalScore = 0;

    let scoreCount = 0;





    paces.forEach(

        pace => {



            if(
                pace.finalTest
            ){

                completed++;

            }




            if(
                pace.finalScore
            ){

                totalScore +=

                Number(
                    pace.finalScore
                );


                scoreCount++;


            }


        }

    );







    const average =

        scoreCount > 0

        ?

        Math.round(
            totalScore / scoreCount
        )

        :

        0;







    const counters =

        document.querySelectorAll(
            ".counter"
        );





    if(counters.length >= 2){


        counters[0]
        .dataset.value = average;



        counters[0]
        .textContent = average;



        counters[1]
        .dataset.value = completed;



        counters[1]
        .textContent = completed;


    }





    updateXP(
        completed
    );


}







/* ==========================================
   XP System
========================================== */


function updateXP(completed){



    const levelElement =

        document.querySelector(
            ".stat-card:nth-child(4) h2"
        );



    let level = 1;



    if(completed >= 10)

        level = 2;



    if(completed >= 25)

        level = 3;



    if(completed >= 50)

        level = 5;





    if(levelElement){


        levelElement.textContent =

        "Level " + level;


    }



}







/* ==========================================
   Save Example PACE Data
========================================== */


function addPACE(pace){



    let paces =

        getData(
            "paceData"
        )
        ||
        [];



    paces.push(
        pace
    );



    saveData(
        "paceData",
        paces
    );


}