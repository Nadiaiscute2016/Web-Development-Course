/* ==========================================
   ACE Progress Tracker™
   PACE Database System
========================================== */


document.addEventListener(
"DOMContentLoaded",
displayPACEs
);





/* ==========================================
   Add PACE
========================================== */


function addPACE(){


const pace = {


id: Date.now(),


subject:

document.getElementById(
"paceSubject"
).value,



paceNumber:

document.getElementById(
"paceNumber"
).value,



score:

Number(

document.getElementById(
"paceScore"
).value

),



status:

document.getElementById(
"paceStatus"
).value,



date:

document.getElementById(
"paceDate"
).value,



notes:

document.getElementById(
"paceNotes"
).value


};






if(!pace.paceNumber || !pace.score){


alert(
"Please enter PACE number and score"
);


return;


}





if(pace.score < 0 || pace.score > 100){


alert(
"Score must be between 0 and 100"
);


return;


}







let database =

getData(
"paceDatabase"
)
||
[];





database.push(pace);





saveData(

"paceDatabase",

database

);





clearPACEForm();

displayPACEs();
checkPACEAchievements();


alert(
"PACE Added Successfully 📚"
);



}









/* ==========================================
   Display PACEs
========================================== */


function displayPACEs(){



const container =

document.getElementById(
"paceList"
);





if(!container)

return;





let database =

getData(
"paceDatabase"
)
||
[];





const search =

document.getElementById(
"searchPACE"
)
?.value
.toLowerCase()
||
"";







database = database.filter(

pace =>


pace.paceNumber
.toLowerCase()
.includes(search)

||

pace.subject
.toLowerCase()
.includes(search)



);







container.innerHTML="";







if(database.length===0){


container.innerHTML =

`

<p>
No PACEs found 📚
</p>

`;

return;

}





database.forEach(

pace => {



container.innerHTML +=


`

<div class="pace-item">


<div>


<h3>

${pace.subject}

</h3>



<p>

${pace.paceNumber}

</p>



<p>

Score: 

<strong>

${pace.score}%

</strong>

</p>



<p>

Status:

${pace.status}

</p>



</div>





<button

onclick="deletePACE(${pace.id})">

Delete

</button>



</div>


`;



}

);



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





database = database.filter(

pace =>

pace.id !== id

);





saveData(

"paceDatabase",

database

);





displayPACEs();



}









/* ==========================================
   Clear Form
========================================== */


function clearPACEForm(){



document.getElementById(
"paceNumber"
).value="";



document.getElementById(
"paceScore"
).value="";



document.getElementById(
"paceNotes"
).value="";



}









/* ==========================================
   Calculate Average
========================================== */


function getPACEAverage(){



const database =

getData(
"paceDatabase"
)
||
[];





if(database.length===0)

return 0;






const total =

database.reduce(

(sum,pace)=>

sum + pace.score,

0

);






return Math.round(

total / database.length

);



}