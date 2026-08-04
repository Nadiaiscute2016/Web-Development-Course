/* ==========================================
   ACE Progress Tracker™
   Goal System
========================================== */


document.addEventListener(
"DOMContentLoaded",
displayGoals
);





function addGoal(){


const goal = {


id:Date.now(),


title:

document.getElementById(
"goalTitle"
).value,



type:

document.getElementById(
"goalType"
).value,



target:

Number(
document.getElementById(
"goalTarget"
).value
),



progress:0,


completed:false,


date:
new Date()
.toLocaleDateString()


};




let goals =

getData(
"goals"
)
||
[];




goals.push(goal);



saveData(
"goals",
goals
);



displayGoals();


}







function displayGoals(){


const list =

document.getElementById(
"goalList"
);



if(!list)
return;



let goals =

getData(
"goals"
)
||
[];




list.innerHTML="";




goals.forEach(

goal => {


list.innerHTML +=


`

<div class="goal-card">


<h3>

${goal.title}

</h3>


<p>

${goal.type}

</p>


<div class="progress-bar">


<div style="width:${goal.progress}%">

</div>


</div>


<p>

${goal.progress}% Complete

</p>


<button onclick="completeGoal(${goal.id})">

Complete

</button>


</div>

`;



}

);



}







function completeGoal(id){


let goals =

getData(
"goals"
)
||
[];




goals = goals.map(

goal => {


if(goal.id===id){


goal.progress=100;

goal.completed=true;


}


return goal;


}

);




saveData(
"goals",
goals
);



displayGoals();


}