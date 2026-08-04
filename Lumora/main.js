/* ==========================
   LUMORA ACADEMY MAIN JS
   ========================== */



// LOADER

window.addEventListener("load",()=>{

const loader=document.getElementById("loader");


if(loader){

setTimeout(()=>{

loader.style.display="none";

},1000);

}

});







// SCROLL REVEAL


const revealElements=document.querySelectorAll(
".card,.stat,.cta"
);



window.addEventListener("scroll",()=>{


revealElements.forEach(element=>{


const position=
element.getBoundingClientRect().top;



if(position < window.innerHeight - 100){


element.classList.add(
"reveal",
"active"
);


}



});


});









// BACK TO TOP BUTTON


const topButton=document.getElementById(
"topButton"
);



window.addEventListener("scroll",()=>{


if(topButton){


if(window.scrollY > 500){

topButton.style.display="block";

}

else{

topButton.style.display="none";

}


}



});





if(topButton){


topButton.onclick=()=>{


window.scrollTo({

top:0,

behavior:"smooth"

});


};


}









// BUTTON CLICK EFFECT


document.querySelectorAll(".btn")

.forEach(button=>{


button.addEventListener(
"click",
()=>{


button.style.transform=
"scale(.95)";



setTimeout(()=>{


button.style.transform="";


},150);



});


});









// STUDENT LOGIN SYSTEM


function loginStudent(){



let name=document.getElementById(
"studentName"
);



let studentClass=document.getElementById(
"studentClass"
);




if(!name || !studentClass){

return;

}





if(
name.value=="" ||
studentClass.value==""

){


alert(
"Please complete your details"
);


return;


}





localStorage.setItem(
"lumoraStudent",
name.value
);



localStorage.setItem(
"lumoraClass",
studentClass.value
);



showDashboard();


}









function showDashboard(){



const savedName=
localStorage.getItem(
"lumoraStudent"
);



const savedClass=
localStorage.getItem(
"lumoraClass"
);





const displayName=
document.getElementById(
"displayName"
);



const displayClass=
document.getElementById(
"displayClass"
);





if(savedName && displayName){


displayName.innerHTML=
savedName;


}



if(savedClass && displayClass){


displayClass.innerHTML=
savedClass;


}







const loginBox=
document.getElementById(
"loginBox"
);



const dashboard=
document.getElementById(
"dashboard"
);





if(savedName && loginBox && dashboard){


loginBox.style.display="none";


dashboard.style.display="block";


}



}









function logoutStudent(){



localStorage.removeItem(
"lumoraStudent"
);



localStorage.removeItem(
"lumoraClass"
);



location.reload();


}









// AUTO LOGIN CHECK


window.addEventListener(
"load",
()=>{


showDashboard();


});









// DARK / LIGHT THEME


function toggleTheme(){


document.body.classList.toggle(
"light-mode"
);



localStorage.setItem(

"lumoraTheme",

document.body.classList.contains(
"light-mode"
)

);



}







// REMEMBER THEME


if(
localStorage.getItem(
"lumoraTheme"
)==="true"

){


document.body.classList.add(
"light-mode"
);


}









// CONSOLE BRANDING


console.log(
"💜 Lumora Academy loaded | Where Bright Minds Rise"
);
// LUMORA AI STUDY ASSISTANT


function askAI(subject){


let response = "";


if(subject === "Math"){

response =
"📚 Try solving 10 practice questions today. Focus on understanding the steps, not just the answer.";

}



else if(subject === "Science"){

response =
"🔬 Review one science concept and create a mini summary using your own words.";

}



else if(subject === "Coding"){

response =
"💻 Build a small project today. Practice HTML, CSS, or JavaScript for 30 minutes.";

}



else if(subject === "English"){

response =
"📝 Read a chapter and write down five new vocabulary words.";

}



document.getElementById("ai-response").innerHTML=response;


}