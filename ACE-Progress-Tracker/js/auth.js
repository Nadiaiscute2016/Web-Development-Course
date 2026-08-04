/* ==========================================
   ACE Progress Tracker™
   Authentication System
========================================== */


const USERS_KEY = "ACEAccounts";
const CURRENT_USER_KEY = "aceCurrentUser";



/* ==========================================
   SIGNUP
========================================== */


function signupUser() {


    const name =
        document.getElementById("signupName").value;


    const email =
        document.getElementById("signupEmail").value;


    const password =
        document.getElementById("signupPassword").value;



    if(!name || !email || !password){

        alert("Please fill in all fields.");

        return;

    }



    let users =
        JSON.parse(
            localStorage.getItem(USERS_KEY)
        ) || [];



    const existingUser =
        users.find(
            user => user.email === email
        );



    if(existingUser){

        alert("Account already exists.");

        return;

    }



    const newUser = {

        fullName:name,

        email:email,

        password:password,


        // ACE Tracker default data

        average:0,

        pacesCompleted:0,

        weeklyGoal:5,

        streak:0,

        xp:0,

        level:1

    };



    users.push(newUser);



    localStorage.setItem(
        USERS_KEY,
        JSON.stringify(users)
    );



    alert("Account created successfully!");

    window.location.href="login.html";


}





/* ==========================================
   LOGIN
========================================== */


function loginUser(){


    const email =
        document.getElementById("loginEmail").value;


    const password =
        document.getElementById("loginPassword").value;



    let users =
        JSON.parse(
            localStorage.getItem(USERS_KEY)
        ) || [];



    const user =
        users.find(

            account =>
            account.email === email &&
            account.password === password

        );



    if(!user){

        alert("Incorrect email or password.");

        return;

    }



    localStorage.setItem(

        CURRENT_USER_KEY,

        JSON.stringify(user)

    );



    window.location.href="dashboard.html";


}





/* ==========================================
   LOGOUT
========================================== */


function performLogout(){


    localStorage.removeItem(
        CURRENT_USER_KEY
    );


    window.location.href="login.html";


}





/* ==========================================
   PROTECT DASHBOARD
========================================== */


function checkLogin(){


    const user =
        localStorage.getItem(
            CURRENT_USER_KEY
        );



    if(!user){

        window.location.href="login.html";

    }


}