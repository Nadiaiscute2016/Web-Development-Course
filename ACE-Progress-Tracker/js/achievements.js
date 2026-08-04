/* ==========================================
   ACE Progress Tracker™
   Achievement Engine
========================================== */


document.addEventListener(
"DOMContentLoaded",
loadAchievements
);



const achievements = [


{
id:"first_pace",

title:"🌱 First Step",

description:
"Complete your first PACE",

requirement:
1

},



{
id:"pace_master",

title:"📚 PACE Master",

description:
"Complete 10 PACEs",

requirement:
10

},



{
id:"ace_champion",

title:"🏆 ACE Champion",

description:
"Complete 50 PACEs",

requirement:
50

},



{
id:"honor_roll",

title:"⭐ Honor Roll",

description:
"Maintain 90% average",

requirement:
"honor"

},



{
id:"streak",

title:"🔥 Study Streak",

description:
"Study for 7 days",

requirement:
"streak"

}


];








function loadAchievements(){


const database =

getData(
"paceDatabase"
)
||
[];




const unlocked =

getData(
"achievements"
)
||
[];





let xp =

getData(
"xp"
)
||
0;





const completed =

database.filter(

pace =>

pace.finalTest
&&
pace.score >=80

).length;





achievements.forEach(

achievement => {


let earned = false;



if(
typeof achievement.requirement === "number"
&&
completed >= achievement.requirement
){

earned=true;

}





if(
achievement.requirement==="honor"
){

let average =
calculateAverage(database);


if(average >=90)

earned=true;

}




if(
achievement.requirement==="streak"
){

earned=true;

}






if(
earned
&&
!unlocked.includes(
achievement.id
)
){


unlocked.push(
achievement.id
);


xp +=100;


}



}

);





saveData(
"achievements",
unlocked
);



saveData(
"xp",
xp
);





displayAchievements(
unlocked,
xp
);


}








function displayAchievements(
unlocked,
xp
){



document.getElementById(
"xp"
).textContent =

"XP: "
+
xp
+
" ⭐";





document.getElementById(
"level"
).textContent =

"Level "
+
(
Math.floor(xp/500)+1
);





const container =

document.getElementById(
"achievementList"
);





container.innerHTML="";





achievements.forEach(

item => {



const unlockedBadge =

unlocked.includes(
item.id
);




container.innerHTML += `


<div class="achievement-card 
${unlockedBadge ? "unlocked":""}">


<h2>

${item.title}

</h2>


<p>

${item.description}

</p>


<strong>

${
unlockedBadge
?
"✅ Unlocked"
:
"🔒 Locked"
}

</strong>


</div>


`;



}

);


}








function calculateAverage(database){


if(!database.length)

return 0;



let total=0;


database.forEach(

pace => {

total += pace.score;

}

);



return Math.round(
total/database.length
);


}
function checkPACEAchievements(){



const paces =

getData(
"paceDatabase"
)
||
[];




let achievements =

getData(
"achievements"
)
||
[];







function unlock(name,icon){


if(!achievements.some(a=>a.name===name)){


achievements.push({

name:name,

icon:icon,

date:new Date().toLocaleDateString()

});


}


}






if(paces.length >= 1)

unlock(

"First PACE Completed",

"🥇"

);



if(paces.length >= 10)

unlock(

"PACE Explorer",



);



if(paces.length >= 25)

unlock(

"PACE Champion",



);






if(paces.length >= 50)

unlock(

"ACE Master",



);






saveData(

"achievements",

achievements

);


}