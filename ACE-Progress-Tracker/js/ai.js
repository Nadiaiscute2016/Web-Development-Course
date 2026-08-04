/* ==========================================
   ACE Progress Tracker™
   AI Study Coach
========================================== */


document.addEventListener(

"DOMContentLoaded",

generateAdvice

);







function generateAdvice(){



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




const message =

document.getElementById(
"aiMessage"
);





if(!message)

return;






let advice = [];







/* SCORE ANALYSIS */


if(paces.length===0){


advice.push(

"📚 Start adding PACEs so I can analyze your progress."

);


}





else {



let average =

calculateAverage(
paces
);





if(average >=90){


advice.push(

"🏆 Excellent work! You are on Honor Roll level."

);


}


else if(average >=80){


advice.push(

"⭐ Good progress! A little more practice can push you higher."

);


}


else{


advice.push(

"💪 Focus on reviewing difficult topics before moving ahead."

);


}



}







/* SUBJECT ANALYSIS */


const weak =

findWeakSubject(
paces
);



if(weak){


advice.push(

"📖 Consider spending extra study time on "
+
weak
+
" PACEs."

);


}







/* GOALS */


if(goals.length){


const active =

goals.filter(

goal =>
!goal.completed

).length;



advice.push(

"🎯 You have "
+
active
+
" active goals to complete."

);


}







/* MOTIVATION */


const messages=[


"🌱 Small steps create big achievements.",


"🚀 Keep building your learning streak.",


"⭐ Every completed PACE moves you closer to your goals."


];



advice.push(

messages[
Math.floor(
Math.random()
*
messages.length
)

]

);







message.innerHTML =


advice.map(

item =>

`<p>${item}</p>`

)

.join("");



}









function calculateAverage(data){


let total=0;


data.forEach(

pace=>{

total += pace.score;

}

);



return Math.round(

total /
data.length

);


}








function findWeakSubject(data){


let subjects={};




data.forEach(

pace=>{


if(!subjects[pace.subject])

subjects[pace.subject]=[];



subjects[pace.subject]
.push(
pace.score
);


}

);






let lowest=null;

let lowestScore=101;




for(let subject in subjects){



let avg =

subjects[subject]
.reduce(
(a,b)=>a+b,
0
)
/
subjects[subject].length;



if(avg < lowestScore){


lowestScore=avg;

lowest=subject;


}


}




return lowest;


}
function analyzePACEProgress(){



const paces =

getData(
"paceDatabase"
)
||
[];





const box =

document.getElementById(
"aiMessage"
);



if(!box)

return;






if(paces.length===0){


box.innerHTML=

`
<p>
Start adding PACEs so I can analyze your progress! 📚
</p>
`;

return;

}






const average =

Math.round(

paces.reduce(

(total,pace)=>

total + Number(pace.score),

0

)

/
paces.length

);






let advice="";






if(average >=90){


advice=

"Excellent work! Keep challenging yourself. 🌟";


}

else if(average >=75){


advice=

"Great progress! Focus on improving weaker areas. 📈";


}

else{


advice=

"Keep practicing. Every completed PACE helps you improve. 💪";


}






box.innerHTML=

`

<p>
You have completed ${paces.length} PACEs.
</p>

<p>
Your average score is ${average}%.
</p>

<p>
${advice}
</p>

`;



}

document.addEventListener(

"DOMContentLoaded",

analyzePACEProgress

);