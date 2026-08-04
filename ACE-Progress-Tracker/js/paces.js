/* ==========================================
   ACE Progress Tracker™
   Multi-PACE Database System
========================================== */


document.addEventListener(
    "DOMContentLoaded",
    () => {

        displayPACEs();

        updateMastery();

    }
);





/* ==========================================
   Add PACE
========================================== */


function addPACE(){


    const pace = {


        id: Date.now(),


        subject:
        document.getElementById(
            "subject"
        ).value,


        paceNumber:
        document.getElementById(
            "paceNumber"
        ).value,


        pagesCompleted:
        Number(
            document.getElementById(
                "pagesCompleted"
            ).value
        ),


        totalPages:
        Number(
            document.getElementById(
                "totalPages"
            ).value
        ),


        score:
        Number(
            document.getElementById(
                "finalScore"
            ).value
        ),



        selfTest:
        document.getElementById(
            "selfTest"
        ).checked,



        checkup:
        document.getElementById(
            "checkup"
        ).checked,



        goalCheck:
        document.getElementById(
            "goalCheck"
        ).checked,



        finalTest:
        document.getElementById(
            "finalTest"
        ).checked,



        date:
        new Date()
        .toLocaleDateString()

    };



    pace.progress =
        calculateCompletion(
            pace
        );




    let database =

        getData(
            "paceDatabase"
        )
        ||
        [];



    database.push(
        pace
    );



    saveData(
        "paceDatabase",
        database
    );



    displayPACEs();

    updateMastery();


    alert(
        "PACE Added Successfully 📚"
    );

}





/* ==========================================
   Completion Calculator
========================================== */


function calculateCompletion(pace){


    let completed = 0;


    let total = 5;



    if(
        pace.pagesCompleted >=
        pace.totalPages
    )

        completed++;



    if(pace.selfTest)

        completed++;



    if(pace.checkup)

        completed++;



    if(pace.goalCheck)

        completed++;



    if(
        pace.finalTest &&
        pace.score >= 80
    )

        completed++;




    return Math.round(
        (completed / total) * 100
    );


}







/* ==========================================
   Display PACEs
========================================== */


function displayPACEs(){


    const list =

        document.getElementById(
            "paceList"
        );



    if(!list)
        return;



    let database =

        getData(
            "paceDatabase"
        )
        ||
        [];



    list.innerHTML = "";





    database.forEach(

        pace => {


            const card =
            document.createElement(
                "div"
            );


            card.className =
            "pace-item";



            card.innerHTML = `

            <h3>
            ${pace.subject}
            PACE ${pace.paceNumber}
            </h3>


            <p>
            Pages:
            ${pace.pagesCompleted}/${pace.totalPages}
            </p>


            <p>
            Score:
            ${pace.score}%
            </p>


            <p>
            Progress:
            ${pace.progress}%
            </p>


            <p>
            Status:
            ${getStatus(pace)}
            </p>



            <button onclick="editPACE(${pace.id})">
            ✏️ Edit
            </button>


            <button onclick="deletePACE(${pace.id})">
            🗑 Delete
            </button>


            `;



            list.appendChild(
                card
            );


        }

    );


}







/* ==========================================
   Status
========================================== */


function getStatus(pace){


    if(
        pace.finalTest &&
        pace.score >=80
    ){

        return "✅ Completed";

    }


    return "📖 In Progress";


}







/* ==========================================
   Delete PACE
========================================== */


function deletePACE(id){


    let database =

        getData(
            "paceDatabase"
        )
        ||
        [];



    database =

        database.filter(

            pace =>
            pace.id !== id

        );



    saveData(
        "paceDatabase",
        database
    );



    displayPACEs();

    updateMastery();


}







/* ==========================================
   Edit PACE
========================================== */


function editPACE(id){


    let database =

        getData(
            "paceDatabase"
        )
        ||
        [];



    const pace =

        database.find(

            item =>
            item.id === id

        );



    if(!pace)
        return;



    document.getElementById(
        "subject"
    ).value =
    pace.subject;



    document.getElementById(
        "paceNumber"
    ).value =
    pace.paceNumber;



    document.getElementById(
        "pagesCompleted"
    ).value =
    pace.pagesCompleted;



    document.getElementById(
        "totalPages"
    ).value =
    pace.totalPages;



    document.getElementById(
        "finalScore"
    ).value =
    pace.score;



    deletePACE(id);


}







/* ==========================================
   Subject Mastery
========================================== */


function updateMastery(){


    const database =

        getData(
            "paceDatabase"
        )
        ||
        [];



    const subjects = [

        "Math",

        "English",

        "Science"

    ];




    subjects.forEach(

        subject => {



            const items =

            database.filter(

                pace =>
                pace.subject === subject

            );



            let average = 0;



            if(items.length){


                average = Math.round(

                    items.reduce(

                        (sum,item)=>

                        sum + item.score,

                        0

                    )
                    /
                    items.length

                );


            }



            const element =

            document.getElementById(

                subject.toLowerCase()
                +
                "Mastery"

            );



            if(element){

                element.textContent =
                average + "%";

            }


        }

    );


}