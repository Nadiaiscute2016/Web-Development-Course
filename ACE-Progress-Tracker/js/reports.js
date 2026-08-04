/* ==========================================
   ACE Progress Tracker™
   Reports System
========================================== */


document.addEventListener(
"DOMContentLoaded",
loadReports
);






function loadReports(){


    loadSummary();

    loadSubjects();

    loadGoals();

    createLearningSummary();


}







/* ==========================================
   Summary Cards
========================================== */


function loadSummary(){



const paces =

getData(
"paceDatabase"
)
||
[];




const achievements =

getData(
"achievements"
)
||
[];






const completed =

paces.filter(

pace =>

pace.finalTest
&&
pace.score >=80

).length;






const average =

calculateAverage(
paces
);







const averageBox =

document.getElementById(
"reportAverage"
);




const paceBox =

document.getElementById(
"reportPACEs"
);




const achievementBox =

document.getElementById(
"reportAchievements"
);






if(averageBox)

averageBox.textContent =

average + "%";






if(paceBox)

paceBox.textContent =

completed;






if(achievementBox)

achievementBox.textContent =

achievements.length;



}









/* ==========================================
   Subject Reports
========================================== */


function loadSubjects(){



const container =

document.getElementById(
"subjectReport"
);



if(!container)

return;





const paces =

getData(
"paceDatabase"
)
||
[];





let subjects = {};





paces.forEach(

pace => {


if(!subjects[pace.subject])

subjects[pace.subject]=[];



subjects[pace.subject].push(
pace.score
);



}

);





container.innerHTML="";






Object.keys(subjects).forEach(

subject => {



const average =

Math.round(

subjects[subject]
.reduce(
(a,b)=>a+b,
0
)
/
subjects[subject].length

);





container.innerHTML +=


`

<div class="subject-row">


<h3>

${subject}

</h3>


<p>

Average Score:

<strong>
${average}%

</strong>

</p>


<div class="progress-bar">


<div style="width:${average}%">

</div>


</div>


</div>


`;



}

);



}








/* ==========================================
   Goals Report
========================================== */


function loadGoals(){



const container =

document.getElementById(
"goalReport"
);



if(!container)

return;





const goals =

getData(
"goals"
)
||
[];






if(goals.length===0){


container.innerHTML =

`

<p>
No goals created yet 🎯
</p>

`;

return;

}




container.innerHTML="";





goals.forEach(

goal => {



container.innerHTML +=


`

<div class="goal-report">


<h3>

${goal.title}

</h3>


<p>

${goal.progress}% Complete

</p>


</div>


`;



}

);



}









/* ==========================================
   Learning Summary
========================================== */


function createLearningSummary(){



const box =

document.getElementById(
"learningSummary"
);



if(!box)

return;






const paces =

getData(
"paceDatabase"
)
||
[];




const goals =

getData(
"goals"
)
||
[];





const average =

calculateAverage(
paces
);





box.textContent =



`

You have completed ${paces.length} PACEs.

Your current average score is ${average}%.

You have ${goals.length} learning goals.

Keep improving one step at a time!

`;



}









/* ==========================================
   Average Calculator
========================================== */


function calculateAverage(data){



if(data.length===0)

return 0;





let total = 0;




data.forEach(

pace => {


total += Number(
pace.score
);


}

);





return Math.round(

total / data.length

);



}