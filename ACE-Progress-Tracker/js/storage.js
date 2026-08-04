/* ==========================================
   ACE Progress Tracker™
   Storage Manager
========================================== */


const STORAGE_KEYS = {

    USERS: "ACEAccounts",

    CURRENT_USER: "aceCurrentUser",

    SETTINGS: "aceSettings",

    PROGRESS: "aceProgress",

    GOALS: "aceGoals",

    ACHIEVEMENTS: "aceAchievements"

};





/* ==========================================
   Save Data
========================================== */


function saveData(key, data) {


    localStorage.setItem(

        key,

        JSON.stringify(data)

    );


}





/* ==========================================
   Get Data
========================================== */


function getData(key) {


    const data =

        localStorage.getItem(key);



    return data

        ? JSON.parse(data)

        : null;


}





/* ==========================================
   Current User
========================================== */


function getCurrentUser(){


    return getData(

        STORAGE_KEYS.CURRENT_USER

    );


}



function updateCurrentUser(data){


    saveData(

        STORAGE_KEYS.CURRENT_USER,

        data

    );


}





/* ==========================================
   ACE Progress
========================================== */


function saveProgress(progress){


    saveData(

        STORAGE_KEYS.PROGRESS,

        progress

    );


}



function getProgress(){


    return (

        getData(
            STORAGE_KEYS.PROGRESS
        )

        ||

        {

            pacesCompleted:0,

            averageScore:0,

            streak:0,

            xp:0

        }

    );


}





/* ==========================================
   Goals
========================================== */


function saveGoals(goals){


    saveData(

        STORAGE_KEYS.GOALS,

        goals

    );


}



function getGoals(){


    return (

        getData(
            STORAGE_KEYS.GOALS
        )

        ||

        []

    );


}





/* ==========================================
   Achievements
========================================== */


function saveAchievements(list){


    saveData(

        STORAGE_KEYS.ACHIEVEMENTS,

        list

    );


}



function getAchievements(){


    return (

        getData(
            STORAGE_KEYS.ACHIEVEMENTS
        )

        ||

        []

    );


}





/* ==========================================
   Settings
========================================== */


function saveSettings(settings){


    saveData(

        STORAGE_KEYS.SETTINGS,

        settings

    );


}



function getSettings(){


    return (

        getData(
            STORAGE_KEYS.SETTINGS
        )

        ||

        {

            theme:"light",

            notifications:true

        }

    );


}





console.log(
    "Storage System Ready 💾"
);