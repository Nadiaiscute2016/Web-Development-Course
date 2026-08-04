/* ==========================================
   ACE Progress Tracker™
   Dashboard V2
========================================== */


document.addEventListener(
"DOMContentLoaded",
loadDashboard
);



function loadDashboard(){


loadStudentProfile();

loadPACEStats();

loadGoalStats();

loadAchievementStats();

}





/* ==========================================
   Student Profile
========================================== */


function loadStudentProfile(){


const profile =

getData("studentProfile")
||
{};



const nameBox =

document.getElementById(
"studentName"
);



const imageBox =

document.getElementById(
"profileImage"
);





if(nameBox){

nameBox.textContent =

profile.name

||

"Student";

}





if(imageBox && profile.picture){

imageBox.src = profile.picture;

}



}









/* ==========================================
   PACE Statistics
========================================== */


function loadPACEStats(){


const paces =

getData("paceDatabase")
||
[];





const completed =

paces.filter(

pace =>

pace.status === "Completed"

).length;






const average =

paces.length

?

Math.round(

paces.reduce(

(total,pace)=>

total + Number(pace.score),

0

)
/
paces.length

)

:

0;







updateElement(

"pacesCompleted",

completed

);



updateElement(

"averageScore",

average + "%"

);



}









/* ==========================================
   Goals
========================================== */


function loadGoalStats(){


const goals =

getData("goals")
||
[];





const completedGoals =

goals.filter(

goal =>

goal.completed === true

).length;





updateElement(

"goalsCompleted",

completedGoals

);



}









/* ==========================================
   Achievements
========================================== */


function loadAchievementStats(){


const achievements =

getData("achievements")
||
[];





updateElement(

"achievementCount",

achievements.length

);



}









/* ==========================================
   Helper
========================================== */


function updateElement(id,value){



const element =

document.getElementById(id);





if(element){

element.textContent = value;

}



}
document.addEventListener(
"DOMContentLoaded",

()=>{

loadPACEStats();

}

);