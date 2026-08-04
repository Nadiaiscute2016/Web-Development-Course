/* ==========================================
   ACE Progress Tracker™
   PACE Calendar System
========================================== */


document.addEventListener(

"DOMContentLoaded",

loadCalendar

);








function loadCalendar(){


loadWeeklyTarget();

loadSchedule();

loadCompletedDays();

updateStreak();


}









/* ==========================================
   Weekly PACE Target
========================================== */


function loadWeeklyTarget(){



const paces =

getData(
"paceDatabase"
)
||
[];





const target =

getData(
"weeklyPACEGoal"
)
||
5;





const completed =

paces.filter(

pace =>

pace.finalTest
&&
pace.score >=80

).length;





const box =

document.getElementById(
"weeklyTarget"
);





if(box)

box.textContent =

completed
+
"/"
+
target
+
" PACEs";



}









/* ==========================================
   Add Study Schedule
========================================== */


function addStudyTask(){



const task = {


id:Date.now(),



title:

document.getElementById(
"studyTask"
).value,



date:

document.getElementById(
"studyDate"
).value,


completed:false



};






if(!task.title || !task.date){

alert(
"Please enter a task and date"
);

return;

}






let schedule =

getData(
"studySchedule"
)
||
[];





schedule.push(task);





saveData(

"studySchedule",

schedule

);





loadSchedule();



}









/* ==========================================
   Display Schedule
========================================== */


function loadSchedule(){



const box =

document.getElementById(
"scheduleList"
);



if(!box)

return;





let schedule =

getData(
"studySchedule"
)
||
[];





box.innerHTML="";





if(schedule.length===0){


box.innerHTML=

`

<p>
No upcoming study tasks 📚
</p>

`;

return;


}







schedule.forEach(

task => {



box.innerHTML +=


`

<div class="schedule-item">


<h3>

${task.title}

</h3>


<p>

📅 ${task.date}

</p>



<button onclick="completeTask(${task.id})">

${task.completed ? "✅ Done" : "Complete"}

</button>


</div>


`;



}

);



}









/* ==========================================
   Complete Task
========================================== */


function completeTask(id){



let schedule =

getData(
"studySchedule"
)
||
[];





schedule = schedule.map(

task => {


if(task.id===id)

task.completed=true;



return task;


}

);





saveData(

"studySchedule",

schedule

);





loadSchedule();



}









/* ==========================================
   Completed Study Days
========================================== */


function completeStudyDay(){



let days =

getData(
"completedStudyDays"
)
||
[];





const today =

new Date()
.toLocaleDateString();






if(!days.includes(today)){


days.push(today);


}






saveData(

"completedStudyDays",

days

);





loadCompletedDays();

updateStreak();



}









function loadCompletedDays(){



const box =

document.getElementById(
"completedList"
);



const count =

document.getElementById(
"completedDays"
);





let days =

getData(
"completedStudyDays"
)
||
[];





if(count)

count.textContent =

days.length;





if(!box)

return;





box.innerHTML="";





days.slice(-7).forEach(

day=>{


box.innerHTML +=


`

<p>
✅ ${day}
</p>

`;


}

);



}









/* ==========================================
   Streak Calculator
========================================== */


function updateStreak(){



const days =

getData(
"completedStudyDays"
)
||
[];





const streakBox =

document.getElementById(
"calendarStreak"
);





if(!streakBox)

return;





let streak=0;



let current =

new Date();






while(true){


const date =

current.toLocaleDateString();




if(days.includes(date)){


streak++;


current.setDate(
current.getDate()-1
);


}

else{


break;


}


}






streakBox.textContent =

"🔥 "
+
streak;



}