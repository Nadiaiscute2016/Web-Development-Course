// =====================================
// ACE STUDENT PROGRESS TRACKER
// SCRIPT.JS PART 1
// FIREBASE LOGIN SYSTEM
// =====================================


console.log("ACE Tracker Loaded");



// =====================================
// FIREBASE IMPORT
// =====================================


import {

auth,
db

} from "./firebase.js";



import {

createUserWithEmailAndPassword,
signInWithEmailAndPassword,
signOut,
onAuthStateChanged

} from 
"https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";



import {

doc,
setDoc

} from
"https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";







// =====================================
// SWITCH TO SIGNUP
// =====================================


window.showSignup = function(){


document.getElementById("loginForm").style.display="none";


document.getElementById("signupForm").style.display="block";


};







// =====================================
// SWITCH TO LOGIN
// =====================================


window.showLogin = function(){


document.getElementById("signupForm").style.display="none";


document.getElementById("loginForm").style.display="block";


};








// =====================================
// CREATE ACCOUNT
// =====================================


window.signup = async function(){



const name =
document.getElementById("signupName").value;



const email =
document.getElementById("signupEmail").value;



const password =
document.getElementById("signupPassword").value;



const confirm =
document.getElementById("confirmPassword").value;



const message =
document.getElementById("signupMessage");





if(password !== confirm){


message.innerHTML =
"❌ Passwords do not match";


return;


}





try{


const userCredential =

await createUserWithEmailAndPassword(

auth,

email,

password

);



const user = userCredential.user;





await setDoc(

doc(

db,

"students",

user.uid

),

{


name:name,

email:email,

points:0,

badges:[],

goals:[],

paces:[]

}


);





message.innerHTML =
"✅ Account created!";



showLogin();



}



catch(error){



console.log(error);


message.innerHTML =
"❌ " + error.message;



}



};









// =====================================
// LOGIN
// =====================================


window.login = async function(){



const email =

document.getElementById("loginEmail").value;



const password =

document.getElementById("loginPassword").value;



const message =

document.getElementById("loginMessage");





try{


await signInWithEmailAndPassword(

auth,

email,

password

);



message.innerHTML =
"✅ Login successful!";



}



catch(error){



console.log(error);



message.innerHTML =
"❌ " + error.message;



}



};









// =====================================
// LOGOUT
// =====================================


window.logout = async function(){


await signOut(auth);


};









// =====================================
// CHECK LOGIN
// =====================================


onAuthStateChanged(

auth,

(user)=>{


if(user){


console.log(

"Logged in:",
user.email

);



const authSection =
document.getElementById("authSection");


const dashboard =
document.getElementById("dashboard");



if(authSection){

authSection.style.display="none";

}



if(dashboard){

dashboard.style.display="block";

}



}



else{


console.log(
"No user logged in"
);



const authSection =
document.getElementById("authSection");


const dashboard =
document.getElementById("dashboard");



if(authSection){

authSection.style.display="flex";

}



if(dashboard){

dashboard.style.display="none";

}



}



}

);
// =====================================
// ACE STUDENT PROGRESS TRACKER
// SCRIPT.JS PART 2
// FIRESTORE PROFILE LOADING
// =====================================



import {

getDoc

} from
"https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";






// =====================================
// LOAD STUDENT PROFILE
// =====================================


async function loadStudentProfile(uid){



try{



const studentRef = doc(

db,

"students",

uid

);





const snapshot = await getDoc(studentRef);





if(snapshot.exists()){



const student = snapshot.data();




console.log(
"Student Data:",
student
);







// NAME


const nameBox =

document.getElementById(
"studentName"
);



if(nameBox){

nameBox.innerHTML =
student.name;

}







// PROFILE NAME


const profileName =

document.getElementById(
"profileName"
);



if(profileName){

profileName.innerHTML =
student.name;

}








// POINTS


const pointsBox =

document.getElementById(
"points"
);



if(pointsBox){

pointsBox.innerHTML =
(student.points || 0) + " ⭐";

}







const profilePoints =

document.getElementById(
"profilePoints"
);



if(profilePoints){

profilePoints.innerHTML =
student.points || 0;

}








// BADGE


const badgeBox =

document.getElementById(
"profileBadge"
);



if(badgeBox){

badgeBox.innerHTML =
student.badge || "🌱 Beginner";

}








// STREAK


const streakBox =

document.getElementById(
"profileStreak"
);



if(streakBox){

streakBox.innerHTML =

(student.streak || 0)
+
" Days";

}





}

else{


console.log(
"No student document found"
);


}



}



catch(error){



console.log(

"Profile loading error:",

error

);



}



}









// =====================================
// CONNECT PROFILE TO LOGIN
// =====================================


onAuthStateChanged(

auth,

(user)=>{



if(user){


loadStudentProfile(
user.uid
);



}



});
// =====================================
// ACE STUDENT PROGRESS TRACKER
// SCRIPT.JS PART 3
// PROFILE IMAGE + THEME SYSTEM
// =====================================




// =====================================
// FIREBASE STORAGE IMPORT
// =====================================


import {

ref,
uploadBytes,
getDownloadURL

} from
"https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";



import {

updateDoc

} from
"https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";









// =====================================
// PROFILE PICTURE UPLOAD
// =====================================



const profileUpload =

document.getElementById(
"profileUpload"
);



const profilePreview =

document.getElementById(
"profilePreview"
);







if(profileUpload){



profileUpload.addEventListener(

"change",

async function(){



const file = this.files[0];



if(!file){

return;

}





const user = auth.currentUser;




if(!user){


alert(
"Please login first"
);


return;


}





try{





// Create storage location


const imageRef = ref(

storage,

"profiles/" + user.uid

);







// Upload image


await uploadBytes(

imageRef,

file

);







// Get image URL


const imageURL =

await getDownloadURL(

imageRef

);








// Save URL in Firestore


await updateDoc(

doc(

db,

"students",

user.uid

),

{


profileImage:imageURL


}

);







// Update screen


profilePreview.src = imageURL;



const largeProfile =

document.getElementById(
"largeProfile"
);



if(largeProfile){

largeProfile.src =
imageURL;

}







alert(
"📸 Profile picture updated!"
);






}



catch(error){



console.log(
error
);



alert(
"❌ Upload failed"
);



}



}

);


}









// =====================================
// DARK / LIGHT MODE
// =====================================



const themeBtn =

document.getElementById(
"themeBtn"
);







if(themeBtn){



themeBtn.onclick = function(){



document.body.classList.toggle(
"dark-mode"
);





localStorage.setItem(

"theme",

document.body.classList.contains(
"dark-mode"
)

?

"dark"

:

"light"

);



};



}









// =====================================
// LOAD SAVED THEME
// =====================================



if(

localStorage.getItem("theme")
===
"dark"

){


document.body.classList.add(
"dark-mode"
);


}
// =====================================
// ACE STUDENT PROGRESS TRACKER
// SCRIPT.JS PART 4
// CHART SYSTEM
// =====================================



// =====================================
// WEEKLY PROGRESS LINE CHART
// =====================================



function createWeeklyChart(){



const canvas =

document.getElementById(
"weeklyProgressChart"
);




if(!canvas){

return;

}







new Chart(

canvas,

{


type:"line",



data:{


labels:[

"Week 1",

"Week 2",

"Week 3",

"Week 4"

],



datasets:[

{

label:"Progress %",


data:[

25,

50,

72,

90

],



borderWidth:3,


tension:.4


}


]


},




options:{


responsive:true,


plugins:{


legend:{


display:true


}


}



}


}

);



}











// =====================================
// SUBJECT PIE CHART
// =====================================



function createSubjectPieChart(){



const canvas =

document.getElementById(
"subjectPieChart"
);




if(!canvas){

return;

}








new Chart(

canvas,

{


type:"pie",




data:{



labels:[


"Math",

"English",

"Science",

"Reading"


],



datasets:[


{


label:"Completed Work",



data:[


40,

30,

20,

10


],



borderWidth:2



}


]




},




options:{


responsive:true


}



}

);



}











// =====================================
// LOAD CHARTS
// =====================================



createWeeklyChart();


createSubjectPieChart();
// =====================================
// ACE STUDENT PROGRESS TRACKER
// SCRIPT.JS PART 5
// GOALS + POINT SYSTEM
// =====================================



// =====================================
// LOAD GOALS
// =====================================


let studentGoals =

JSON.parse(

localStorage.getItem("studentGoals")

) || [];






let studentPoints =

Number(

localStorage.getItem("studentPoints")

) || 0;









// =====================================
// ADD GOAL
// =====================================


window.addGoal = function(){



const input =

document.getElementById(
"goalInput"
);



if(!input){

return;

}




const text =

input.value.trim();





if(text === ""){


alert(
"Please enter a goal"
);


return;


}







const goal = {


id:Date.now(),


text:text,


completed:false,


points:10



};







studentGoals.push(goal);





saveGoals();


displayGoals();





input.value="";



};









// =====================================
// DISPLAY GOALS
// =====================================



function displayGoals(){



const list =

document.getElementById(
"goalList"
);




if(!list){

return;

}





list.innerHTML="";






studentGoals.forEach(goal=>{





const card =

document.createElement(
"div"
);





card.className =
"goal-item";







card.innerHTML = `


<p>

${goal.completed ? "✅" : "⬜"}

${goal.text}

</p>



<button onclick="completeGoal(${goal.id})">

${goal.completed ? "Completed" : "Finish"}

</button>


`;






list.appendChild(card);





});



}









// =====================================
// COMPLETE GOAL
// =====================================



window.completeGoal = function(id){



const goal =

studentGoals.find(

g => g.id === id

);





if(!goal || goal.completed){

return;

}






goal.completed=true;






addPoints(

goal.points

);






saveGoals();


displayGoals();





};









// =====================================
// ADD POINTS
// =====================================



window.addPoints = function(amount){



studentPoints += amount;





localStorage.setItem(

"studentPoints",

studentPoints

);





updatePoints();



};









// =====================================
// UPDATE POINT DISPLAY
// =====================================



function updatePoints(){



const pointsBox =

document.getElementById(
"points"
);



if(pointsBox){


pointsBox.innerHTML =

studentPoints + " ⭐";


}





const profilePoints =

document.getElementById(
"profilePoints"
);



if(profilePoints){


profilePoints.innerHTML =

studentPoints;


}



}









// =====================================
// SAVE GOALS
// =====================================



function saveGoals(){



localStorage.setItem(

"studentGoals",

JSON.stringify(studentGoals)

);



}









// =====================================
// LOAD SYSTEM
// =====================================



displayGoals();


updatePoints();
// =====================================
// ACE STUDENT PROGRESS TRACKER
// SCRIPT.JS PART 6
// BADGE UNLOCKING SYSTEM
// =====================================





// =====================================
// AVAILABLE BADGES
// =====================================


const badges = [


{

id:"beginner",

name:"🌱 Beginner",

description:"Complete your first goal",

requirement:1,

type:"goals"

},



{

id:"goalMaster",

name:"⭐ Goal Master",

description:"Complete 5 goals",

requirement:5,

type:"goals"

},



{

id:"risingStar",

name:"💎 Rising Star",

description:"Earn 100 points",

requirement:100,

type:"points"

},



{

id:"diamondScholar",

name:"🏆 Diamond Scholar",

description:"Earn 500 points",

requirement:500,

type:"points"

}



];









// =====================================
// LOAD BADGES
// =====================================


let unlockedBadges =

JSON.parse(

localStorage.getItem("unlockedBadges")

) || [];









// =====================================
// CHECK BADGES
// =====================================


function checkBadges(){



const completedGoals =

studentGoals.filter(

goal=>goal.completed

).length;







badges.forEach(badge=>{



let earned = false;







if(badge.type==="goals"){


earned =

completedGoals >= badge.requirement;


}







if(badge.type==="points"){


earned =

studentPoints >= badge.requirement;


}







if(

earned &&

!unlockedBadges.includes(
badge.id
)

){



unlockedBadges.push(

badge.id

);





saveBadges();




alert(

"🎉 Badge Unlocked!\n\n"

+

badge.name

);




displayBadges();



}



});



}









// =====================================
// SAVE BADGES
// =====================================


function saveBadges(){



localStorage.setItem(

"unlockedBadges",

JSON.stringify(unlockedBadges)

);



}









// =====================================
// DISPLAY BADGES
// =====================================


function displayBadges(){



const box =

document.getElementById(
"badgeCollection"
);





if(!box){

return;

}





box.innerHTML="";







badges.forEach(badge=>{





const unlocked =

unlockedBadges.includes(

badge.id

);







const card =

document.createElement(
"div"
);





card.className =
"badge-card";







card.innerHTML = `


<h3>

${unlocked ? badge.name : "🔒 Locked"}

</h3>


<p>

${

unlocked

?

"Unlocked! 🎉"

:

badge.description

}

</p>


`;






box.appendChild(card);



});



}









// =====================================
// CONNECT TO POINT SYSTEM
// =====================================


const oldAddPoints = window.addPoints;




window.addPoints = function(amount){



oldAddPoints(amount);



checkBadges();



};









// =====================================
// LOAD BADGES
// =====================================


checkBadges();


displayBadges();
// =====================================
// ACE STUDENT PROGRESS TRACKER
// SCRIPT.JS PART 7
// REWARD STORE SYSTEM
// =====================================





// =====================================
// AVAILABLE REWARDS
// =====================================


const rewards = [


{

id:"avatar",

name:"🎨 New Avatar",

cost:150,

description:"Unlock a custom profile avatar"

},



{

id:"galaxy",

name:"🌌 Galaxy Theme",

cost:300,

description:"Unlock a special dashboard theme"

},



{

id:"trophy",

name:"🏆 Digital Trophy",

cost:500,

description:"Earn a special achievement trophy"

},



{

id:"crown",

name:"👑 Golden Crown",

cost:1000,

description:"Ultimate student reward"

}



];









// =====================================
// LOAD OWNED REWARDS
// =====================================


let unlockedRewards =

JSON.parse(

localStorage.getItem("unlockedRewards")

) || [];









// =====================================
// BUY REWARD
// =====================================


window.buyReward = function(id){



const reward =

rewards.find(

item=>item.id===id

);





if(!reward){

return;

}








if(

unlockedRewards.includes(id)

){



alert(

"✅ You already own this reward!"

);



return;


}









if(studentPoints < reward.cost){



alert(

"❌ Not enough points!"

);



return;


}









// Remove points


studentPoints -= reward.cost;






localStorage.setItem(

"studentPoints",

studentPoints

);






// Save reward


unlockedRewards.push(id);






localStorage.setItem(

"unlockedRewards",

JSON.stringify(unlockedRewards)

);







updatePoints();





displayRewards();







alert(

"🎁 Unlocked: "

+

reward.name

);



};









// =====================================
// DISPLAY REWARDS
// =====================================


function displayRewards(){



const box =

document.getElementById(
"rewardList"
);





if(!box){

return;

}






box.innerHTML="";






rewards.forEach(reward=>{





const owned =

unlockedRewards.includes(

reward.id

);






const card =

document.createElement(
"div"
);






card.className =
"reward-card";






card.innerHTML = `


<h3>

${reward.name}

</h3>


<p>

${reward.description}

</p>



<strong>

${reward.cost} ⭐

</strong>



<br><br>


<button onclick="buyReward('${reward.id}')">

${

owned

?

"Owned ✅"

:

"Unlock 🎁"

}

</button>


`;






box.appendChild(card);





});



}









// =====================================
// LOAD REWARDS
// =====================================


displayRewards();
// =====================================
// ACE STUDENT PROGRESS TRACKER
// SCRIPT.JS PART 8
// PACE PROGRESS TRACKER
// =====================================





// =====================================
// LOAD PACE RECORDS
// =====================================


let paceRecords =

JSON.parse(

localStorage.getItem("paceRecords")

) || [];









// =====================================
// ADD PACE
// =====================================


window.addPACE = function(){



const subject =

document.getElementById(
"paceSubject"
).value;



const paceNumber =

document.getElementById(
"paceNumber"
).value;



const score =

Number(

document.getElementById(
"paceScore"
).value

);






if(

subject === "" ||

paceNumber === "" ||

!score

){


alert(
"⚠️ Please fill in all PACE details"
);


return;


}







const pace = {


id:Date.now(),


subject:subject,


number:paceNumber,


score:score,


date:new Date().toLocaleDateString()


};







paceRecords.push(pace);






savePACEs();



updatePACEStats();



displayPACEs();





// Clear inputs


document.getElementById(
"paceSubject"
).value="";



document.getElementById(
"paceNumber"
).value="";



document.getElementById(
"paceScore"
).value="";





};









// =====================================
// SAVE PACES
// =====================================


function savePACEs(){



localStorage.setItem(

"paceRecords",

JSON.stringify(paceRecords)

);



}









// =====================================
// UPDATE STATISTICS
// =====================================


function updatePACEStats(){



const completed =

paceRecords.length;





let totalScore = 0;





paceRecords.forEach(pace=>{


totalScore += pace.score;


});






let average = 0;





if(completed > 0){


average = Math.round(

totalScore / completed

);


}









const completedBox =

document.getElementById(
"pacesCompleted"
);



if(completedBox){


completedBox.innerHTML =
completed;


}









const averageBox =

document.getElementById(
"averageScore"
);



if(averageBox){


averageBox.innerHTML =
average + "%";


}







}









// =====================================
// DISPLAY PACE HISTORY
// =====================================


function displayPACEs(){



const list =

document.getElementById(
"paceList"
);





if(!list){

return;

}







list.innerHTML="";







paceRecords.forEach(pace=>{





const card =

document.createElement(
"div"
);






card.className =
"pace-card";






card.innerHTML = `


<h3>

📚 ${pace.subject}

</h3>


<p>

PACE Number:
${pace.number}

</p>


<p>

Score:
${pace.score}%

</p>


<p>

Completed:
${pace.date}

</p>


`;






list.appendChild(card);





});





}









// =====================================
// LOAD PACE SYSTEM
// =====================================


updatePACEStats();


displayPACEs();
// =====================================
// ACE STUDENT PROGRESS TRACKER
// SCRIPT.JS PART 10
// TEACHER DASHBOARD SYSTEM
// =====================================





// =====================================
// LOAD TEACHER STUDENTS
// =====================================


let teacherStudents =

JSON.parse(

localStorage.getItem("teacherStudents")

) || [];









// =====================================
// ADD STUDENT
// =====================================


window.addStudent = function(){



const input =

document.getElementById(
"studentInput"
);





if(!input){

return;

}







const name =

input.value.trim();






if(name === ""){



alert(
"Please enter a student name"
);



return;


}









const student = {


id:Date.now(),


name:name,


points:0,


goals:0,


badges:0,


paces:0



};







teacherStudents.push(student);






saveTeacherStudents();



displayTeacherStudents();






input.value="";





};









// =====================================
// SAVE STUDENTS
// =====================================


function saveTeacherStudents(){



localStorage.setItem(

"teacherStudents",

JSON.stringify(teacherStudents)

);



}









// =====================================
// DISPLAY STUDENTS
// =====================================


function displayTeacherStudents(){



const list =

document.getElementById(
"classStudentList"
);






if(!list){

return;

}







list.innerHTML="";







teacherStudents.forEach(student=>{






const card =

document.createElement(
"div"
);






card.className =
"student-card";








card.innerHTML = `


<h3>

👤 ${student.name}

</h3>



<p>

⭐ Points:

${student.points}

</p>



<p>

🎯 Goals:

${student.goals}

</p>



<p>

🏆 Badges:

${student.badges}

</p>



<p>

📚 PACEs:

${student.paces}

</p>



`;








list.appendChild(card);





});



}









// =====================================
// CLASS STATISTICS
// =====================================


function updateClassStats(){



const totalStudents =

teacherStudents.length;






let totalPoints = 0;






teacherStudents.forEach(student=>{


totalPoints += student.points;


});







const studentsBox =

document.getElementById(
"totalStudents"
);




const pointsBox =

document.getElementById(
"classPoints"
);






if(studentsBox){


studentsBox.innerHTML =
totalStudents;


}







if(pointsBox){


pointsBox.innerHTML =
totalPoints;


}



}









// =====================================
// OPEN TEACHER DASHBOARD
// =====================================


window.openTeacherDashboard = function(){





const studentDash =

document.getElementById(
"dashboard"
);





const parentDash =

document.getElementById(
"parentDashboard"
);





const teacherDash =

document.getElementById(
"teacherDashboard"
);







if(studentDash){

studentDash.style.display="none";

}





if(parentDash){

parentDash.style.display="none";

}





if(teacherDash){

teacherDash.style.display="block";

}







displayTeacherStudents();


updateClassStats();



};









// =====================================
// LOAD TEACHER DATA
// =====================================


displayTeacherStudents();


updateClassStats();
// =====================================
// ACE STUDENT PROGRESS TRACKER
// SCRIPT.JS PART 11
// CERTIFICATE SYSTEM
// =====================================





// =====================================
// LOAD CERTIFICATES
// =====================================


let certificates =

JSON.parse(

localStorage.getItem("certificates")

) || [];









// =====================================
// CREATE CERTIFICATE
// =====================================


window.createCertificate = function(title){



const studentName =

document.getElementById(
"studentName"
)?.innerHTML

||

"Student";








const certificate = {



id:Date.now(),



student:studentName,



title:title,



date:new Date().toLocaleDateString()



};








certificates.push(certificate);






saveCertificates();



displayCertificates();








alert(

"🎉 Certificate Earned!\n\n"

+

title

);



};









// =====================================
// SAVE CERTIFICATES
// =====================================


function saveCertificates(){



localStorage.setItem(

"certificates",

JSON.stringify(certificates)

);



}









// =====================================
// DISPLAY CERTIFICATES
// =====================================


function displayCertificates(){



const box =

document.getElementById(
"certificateList"
);






if(!box){

return;

}








box.innerHTML="";







certificates.forEach(cert=>{






const card =

document.createElement(
"div"
);






card.className =
"certificate-card";








card.innerHTML = `


<h2>

🏅 Certificate

</h2>



<h3>

${cert.title}

</h3>



<p>

Awarded to:

<strong>

${cert.student}

</strong>

</p>



<p>

📅 ${cert.date}

</p>



<button onclick="printCertificate('${cert.title}')">

🖨 Print Certificate

</button>


`;







box.appendChild(card);





});





}









// =====================================
// PRINT CERTIFICATE
// =====================================


window.printCertificate = function(title){





const printWindow =

window.open(

"",

"",

"width=900,height=700"

);








printWindow.document.write(`



<html>


<head>


<title>

Certificate

</title>



<style>


body{


font-family:Arial;

text-align:center;

padding:50px;


}



.certificate{


border:8px solid #d4af37;

padding:50px;

border-radius:20px;


}



h1{


font-size:40px;


}



</style>



</head>



<body>


<div class="certificate">


<h1>

🎓 ACE Student Progress Tracker

</h1>



<h2>

Certificate of Achievement

</h2>



<h3>

${title}

</h3>



<p>

Awarded for excellent progress and dedication.

</p>



</div>


</body>


</html>



`);







printWindow.document.close();




printWindow.print();





};









// =====================================
// LOAD CERTIFICATES
// =====================================


displayCertificates();
// =====================================
// ACE STUDENT PROGRESS TRACKER
// SCRIPT.JS PART 12
// FIREBASE CLOUD SYNC
// ======================================



import {

    getDoc,
    setDoc

} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";





import {

    doc

} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";








// =====================================
// SAVE DATA TO FIRESTORE
// =====================================


async function saveStudentCloud(){



const user = auth.currentUser;




if(!user){

console.log(
"No user logged in"
);

return;

}







const studentData = {


points: studentPoints,


goals: studentGoals,


badges: unlockedBadges,


paces: paceRecords,


certificates: certificates,


lastUpdated:
new Date()



};







try{



await setDoc(



doc(

db,

"students",

user.uid

),



studentData,



{

merge:true

}



);





console.log(

"☁️ Progress synced!"

);



}



catch(error){



console.log(

"Cloud sync error:",

error

);



}



}









// =====================================
// LOAD DATA FROM FIRESTORE
// =====================================


async function loadStudentCloud(){



const user = auth.currentUser;




if(!user){

return;

}







try{



const studentRef =

doc(

db,

"students",

user.uid

);







const snapshot =

await getDoc(studentRef);








if(snapshot.exists()){



const data = snapshot.data();






studentPoints =

data.points || 0;





studentGoals =

data.goals || [];





unlockedBadges =

data.badges || [];





paceRecords =

data.paces || [];





certificates =

data.certificates || [];







// Refresh screen



updatePoints();



displayGoals();



displayBadges();



displayPACEs();



displayCertificates();






console.log(

"☁️ Cloud data loaded!"

);



}





}



catch(error){



console.log(

"Load error:",

error

);



}



}









// =====================================
// AUTO LOAD AFTER LOGIN
// =====================================


onAuthStateChanged(

auth,

async(user)=>{



if(user){



await loadStudentCloud();



}



});









// =====================================
// SYNC BUTTON
// =====================================


window.syncCloud = async function(){



await saveStudentCloud();





alert(

"☁️ Your progress is synced!"

);



};









// =====================================
// AUTO SAVE HELPERS
// =====================================


window.saveProgress = function(){



saveStudentCloud();



};
// =====================================
// ACE STUDENT PROGRESS TRACKER
// SCRIPT.JS PART 13
// FIREBASE PROFILE SYSTEM
// ======================================





// =====================================
// FIREBASE PROFILE IMPORTS
// =====================================


import {

    updateProfile

} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";





import {

    updateDoc

} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";









// =====================================
// UPDATE STUDENT PROFILE
// =====================================


window.updateStudentProfile = async function(){



const user = auth.currentUser;




if(!user){



alert(

"Please login first"

);



return;



}








const nameInput =

document.getElementById(
"profileNameInput"
);





const gradeInput =

document.getElementById(
"profileGradeInput"
);






const newName =

nameInput.value.trim();






const newGrade =

gradeInput.value.trim();








try{



// Update Firebase Authentication profile



await updateProfile(

user,

{


displayName:newName


}

);








// Update Firestore profile



await updateDoc(



doc(

db,

"students",

user.uid

),



{


name:newName,


grade:newGrade



}



);








// Update page instantly



const nameBox =

document.getElementById(
"studentName"
);




const gradeBox =

document.getElementById(
"grade"
);








if(nameBox){


nameBox.innerHTML =
newName;


}





if(gradeBox){


gradeBox.innerHTML =
newGrade;


}








alert(

"✅ Profile updated!"

);





}

catch(error){



console.log(error);



alert(

"❌ Profile update failed"

);



}



};









// =====================================
// LOAD PROFILE DATA
// =====================================


async function loadProfile(){



const user = auth.currentUser;




if(!user){

return;

}







const studentRef =

doc(

db,

"students",

user.uid

);







const snapshot =

await getDoc(studentRef);







if(snapshot.exists()){



const data = snapshot.data();








const nameBox =

document.getElementById(
"profileName"
);




const gradeBox =

document.getElementById(
"grade"
);







if(nameBox){


nameBox.innerHTML =
data.name || "Student";


}







if(gradeBox){


gradeBox.innerHTML =
data.grade || "-";


}






}



}









// =====================================
// LOAD WHEN LOGGED IN
// =====================================


onAuthStateChanged(

auth,

(user)=>{



if(user){


loadProfile();


}



});
// =====================================
// ACE STUDENT PROGRESS TRACKER
// SCRIPT.JS PART 14
// FIREBASE PROFILE IMAGE SYSTEM
// ======================================





// =====================================
// PROFILE IMAGE UPLOAD
// =====================================


const profileUpload =

document.getElementById(
"profileUpload"
);




const profilePreview =

document.getElementById(
"profilePreview"
);









if(profileUpload){



profileUpload.addEventListener(

"change",

async function(){



const file =

this.files[0];







if(!file){

return;

}







const user =

auth.currentUser;







if(!user){



alert(

"Please login first"

);



return;



}







try{



// Create storage location



const imageRef =

ref(

storage,

"profiles/" + user.uid

);







// Upload image



await uploadBytes(

imageRef,

file

);







// Get image URL



const imageURL =

await getDownloadURL(

imageRef

);







// Save URL to Firestore



await updateDoc(



doc(

db,

"students",

user.uid

),



{


profileImage:imageURL


}



);








// Update image on screen



if(profilePreview){


profilePreview.src =
imageURL;


}








const largeProfile =

document.getElementById(

"largeProfile"

);







if(largeProfile){


largeProfile.src =
imageURL;


}








alert(

"📸 Profile picture updated!"

);



}

catch(error){



console.log(error);



alert(

"❌ Image upload failed"

);



}



});



}









// =====================================
// LOAD PROFILE IMAGE
// =====================================


async function loadProfileImage(){



const user =

auth.currentUser;






if(!user){

return;

}







const snapshot =

await getDoc(



doc(

db,

"students",

user.uid

)



);








if(snapshot.exists()){



const data =

snapshot.data();







if(data.profileImage){





const preview =

document.getElementById(

"profilePreview"

);






const large =

document.getElementById(

"largeProfile"

);








if(preview){


preview.src =
data.profileImage;


}







if(large){


large.src =
data.profileImage;


}



}



}



}









// =====================================
// LOAD IMAGE AFTER LOGIN
// =====================================


onAuthStateChanged(

auth,

(user)=>{



if(user){



loadProfileImage();



}



});
// =====================================
// ACE STUDENT PROGRESS TRACKER
// SCRIPT.JS PART 15
// FIREBASE SECURITY FOUNDATION
// ======================================





// =====================================
// CHECK USER AUTHENTICATION
// =====================================


function checkUserLogin(){



const user = auth.currentUser;





if(!user){


console.log(
"🔒 No authenticated user"
);


return false;


}





return true;



}









// =====================================
// SAFE CLOUD SAVE
// =====================================


async function secureCloudSave(data){



const user = auth.currentUser;





if(!user){



alert(
"Please login first"
);



return;



}







try{



await setDoc(



doc(

db,

"students",

user.uid

),



data,



{

merge:true

}



);






console.log(

"🔐 Secure cloud save complete"

);



}



catch(error){



console.log(

"Security error:",

error

);



}



}









// =====================================
// SESSION STATUS
// =====================================


onAuthStateChanged(

auth,

(user)=>{



if(user){



console.log(

"✅ Secure session:",

user.email

);



}

else{



console.log(

"🔒 Logged out"

);



}



});
// =====================================
// ACE STUDENT PROGRESS TRACKER
// SCRIPT.JS PART 16
// LIVE ACHIEVEMENT ENGINE
// ======================================





// =====================================
// ACHIEVEMENT LIST
// =====================================


const achievements = [


{

id:"first_goal",

title:"🌱 First Step",

description:"Complete your first goal",

type:"goals",

amount:1

},



{

id:"goal_master",

title:"⭐ Goal Master",

description:"Complete 10 goals",

type:"goals",

amount:10

},



{

id:"point_collector",

title:"💎 Star Collector",

description:"Earn 100 points",

type:"points",

amount:100

},



{

id:"pace_star",

title:"📚 PACE Champion",

description:"Complete 20 PACEs",

type:"paces",

amount:20

},



{

id:"study_streak",

title:"🔥 Study Streak",

description:"Study for 7 days",

type:"streak",

amount:7

}



];









// =====================================
// LOAD UNLOCKED ACHIEVEMENTS
// =====================================


let unlockedAchievements =

JSON.parse(

localStorage.getItem(

"unlockedAchievements"

)

) || [];









// =====================================
// CHECK ACHIEVEMENTS
// =====================================


function checkAchievements(){



let completedGoals =

studentGoals.filter(

goal=>goal.completed

).length;







let points =

studentPoints;







let completedPACEs =

paceRecords.length;







let streak =

Number(

localStorage.getItem(

"studyStreak"

)

) || 0;









achievements.forEach(achievement=>{



let unlocked = false;







if(achievement.type === "goals"){


unlocked =

completedGoals >= achievement.amount;


}







if(achievement.type === "points"){


unlocked =

points >= achievement.amount;


}







if(achievement.type === "paces"){


unlocked =

completedPACEs >= achievement.amount;


}







if(achievement.type === "streak"){


unlocked =

streak >= achievement.amount;


}









if(

unlocked &&

!unlockedAchievements.includes(

achievement.id

)

){



unlockedAchievements.push(

achievement.id

);






showAchievement(

achievement

);






saveAchievements();



}







});



}









// =====================================
// SAVE ACHIEVEMENTS
// =====================================


function saveAchievements(){



localStorage.setItem(

"unlockedAchievements",

JSON.stringify(

unlockedAchievements

)

);



}









// =====================================
// ACHIEVEMENT POPUP
// =====================================


function showAchievement(achievement){



alert(

"🎉 Achievement Unlocked!\n\n"

+

achievement.title

+

"\n"

+

achievement.description

);



}









// =====================================
// DISPLAY ACHIEVEMENTS
// =====================================


function displayAchievements(){



const box =

document.getElementById(

"achievementList"

);







if(!box){

return;

}







box.innerHTML="";







achievements.forEach(item=>{



const unlocked =

unlockedAchievements.includes(

item.id

);







const card =

document.createElement(

"div"

);







card.className =

unlocked

?

"achievement unlocked"

:

"achievement locked";








card.innerHTML = `


<h3>

${unlocked ? item.title : "🔒 Locked"}

</h3>


<p>

${item.description}

</p>


`;







box.appendChild(card);





});



}









// =====================================
// AUTO CHECK
// =====================================


checkAchievements();


displayAchievements();
// =====================================
// ACE STUDENT PROGRESS TRACKER
// SCRIPT.JS PART 17
// DASHBOARD ANALYTICS ENGINE
// ======================================





// =====================================
// ANALYTICS DATA
// =====================================


let analyticsData = {


math:0,

english:0,

science:0,

reading:0,



weeklyProgress:[

20,

40,

60,

80

]


};









// =====================================
// UPDATE COMPLETION PERCENTAGE
// =====================================


function updateCompletion(){



const totalGoals =

studentGoals.length;





const completedGoals =

studentGoals.filter(

goal=>goal.completed

).length;







let percentage = 0;







if(totalGoals > 0){



percentage = Math.round(

(completedGoals / totalGoals) * 100

);



}







const completionBox =

document.getElementById(

"completion"

);







if(completionBox){


completionBox.innerHTML =

percentage + "%";


}






}









// =====================================
// WEEKLY PROGRESS CHART
// =====================================


function createWeeklyChart(){



const chart =

document.getElementById(

"weeklyProgressChart"

);







if(!chart){

return;

}








new Chart(

chart,

{


type:"line",



data:{


labels:[

"Week 1",

"Week 2",

"Week 3",

"Week 4"

],



datasets:[

{


label:

"Progress",



data:

analyticsData.weeklyProgress,



borderWidth:3



}


]



},



options:{



responsive:true



}



}



);



}









// =====================================
// SUBJECT PIE CHART
// =====================================


function createSubjectPieChart(){



const chart =

document.getElementById(

"subjectPieChart"

);







if(!chart){

return;

}







new Chart(

chart,

{


type:"pie",



data:{


labels:[

"Math",

"English",

"Science",

"Reading"

],



datasets:[

{


data:[


analyticsData.math,

analyticsData.english,

analyticsData.science,

analyticsData.reading


],



}



]


},



options:{



responsive:true



}



}



);



}









// =====================================
// UPDATE DASHBOARD STATS
// =====================================


function updateAnalytics(){



const pointsBox =

document.getElementById(

"profilePoints"

);






const badgeBox =

document.getElementById(

"badgeNumber"

);







if(pointsBox){



pointsBox.innerHTML =

studentPoints;



}







if(badgeBox){



badgeBox.innerHTML =

unlockedAchievements.length;



}






updateCompletion();



}









// =====================================
// FIREBASE ANALYTICS SAVE
// =====================================


async function saveAnalyticsCloud(){



const user =

auth.currentUser;







if(!user){

return;

}







await setDoc(



doc(

db,

"students",

user.uid

),



{


analytics:analyticsData



},



{


merge:true



}



);







console.log(

"📊 Analytics saved"

);



}









// =====================================
// LOAD ANALYTICS
// =====================================


async function loadAnalyticsCloud(){



const user =

auth.currentUser;







if(!user){

return;

}







const snapshot =

await getDoc(



doc(

db,

"students",

user.uid

)



);







if(snapshot.exists()){



const data = snapshot.data();






if(data.analytics){



analyticsData = data.analytics;



}





}



}









// =====================================
// START ANALYTICS
// =====================================


updateAnalytics();


createWeeklyChart();


createSubjectPieChart();
// =====================================
// ACE STUDENT PROGRESS TRACKER
// SCRIPT.JS PART 18
// AI STUDY INSIGHTS ENGINE
// ======================================





// =====================================
// GENERATE AI INSIGHT
// =====================================


window.generateInsight = function(){



const insightBox =

document.getElementById(

"aiInsight"

);







if(!insightBox){

return;

}







let message = "";








const completedGoals =

studentGoals.filter(

goal=>goal.completed

).length;







const totalGoals =

studentGoals.length;







let completion = 0;







if(totalGoals > 0){



completion = Math.round(

(completedGoals / totalGoals) * 100

);



}









// Progress analysis



if(completion >= 80){



message =

"🌟 Excellent work! You are keeping a strong learning rhythm. Try challenging yourself with a new goal.";



}



else if(completion >= 50){



message =

"📚 Good progress! Keep building your habits and focus on finishing your remaining goals.";



}



else{



message =

"🚀 Time to boost your progress! Start with a small goal and build momentum.";

}



 








// Points analysis



if(studentPoints >= 500){



message +=

"\n\n💎 Your reward points show great dedication!";



}



else if(studentPoints >= 100){



message +=

"\n\n⭐ You are building excellent progress.";





}









insightBox.innerHTML = message;



};









// =====================================
// SUBJECT ANALYSIS
// =====================================


function analyzeSubjects(){



let highest = "";

let lowest = "";






const subjects = {



Math: analyticsData.math,


English: analyticsData.english,


Science: analyticsData.science,


Reading: analyticsData.reading



};







let values =

Object.values(subjects);







if(values.every(value=>value===0)){



return {


strongest:"Not enough data",

needsWork:"Add more progress"



};



}







highest =

Object.keys(subjects)

.find(

key=>

subjects[key] === Math.max(...values)

);







lowest =

Object.keys(subjects)

.find(

key=>

subjects[key] === Math.min(...values)

);








return {


strongest:highest,


needsWork:lowest



};



}









// =====================================
// DISPLAY SUBJECT INSIGHTS
// =====================================


function displaySubjectInsights(){



const strongestBox =

document.getElementById(

"strongestSubject"

);






const improvementBox =

document.getElementById(

"improvementSubject"

);







const result =

analyzeSubjects();







if(strongestBox){



strongestBox.innerHTML =

"📚 Strongest Subject: "

+

result.strongest;



}







if(improvementBox){



improvementBox.innerHTML =

"💡 Needs Improvement: "

+

result.needsWork;



}



}









// =====================================
// SAVE INSIGHTS TO FIREBASE
// =====================================


async function saveInsightsCloud(){



const user =

auth.currentUser;







if(!user){

return;

}







const insight =

document.getElementById(

"aiInsight"

)?.innerHTML

|| "";







await setDoc(



doc(

db,

"students",

user.uid

),



{


latestInsight: insight



},



{


merge:true



}



);







console.log(

"🤖 AI insight saved"

);



}









// =====================================
// AI BUTTON
// =====================================


const aiButton =

document.querySelector(

".ai-section button"

);







if(aiButton){



aiButton.onclick = function(){



generateInsight();


displaySubjectInsights();


saveInsightsCloud();



};



}









// =====================================
// LOAD AI SYSTEM
// =====================================


displaySubjectInsights();

generateInsight();
// =====================================
// ACE STUDENT PROGRESS TRACKER
// SCRIPT.JS PART 19
// PARENT ACCOUNT SYSTEM
// ======================================





// =====================================
// USER ROLE
// =====================================


let currentRole =

localStorage.getItem(

"userRole"

)

|| 

"student";









// =====================================
// SWITCH ROLE
// =====================================


window.switchRole = function(role){



currentRole = role;



localStorage.setItem(

"userRole",

role

);





loadRoleDashboard();



};









// =====================================
// LOAD DASHBOARD BY ROLE
// =====================================


function loadRoleDashboard(){



const studentDashboard =

document.getElementById(

"dashboard"

);




const parentDashboard =

document.getElementById(

"parentDashboard"

);







if(currentRole === "parent"){



if(studentDashboard){



studentDashboard.style.display =

"none";



}






if(parentDashboard){



parentDashboard.style.display =

"block";



}



loadParentData();



}

else{



if(studentDashboard){



studentDashboard.style.display =

"block";



}







if(parentDashboard){



parentDashboard.style.display =

"none";



}



}



}









// =====================================
// LOAD CHILD DATA FOR PARENT
// =====================================


async function loadParentData(){



const user =

auth.currentUser;







if(!user){

return;

}








const childId =

localStorage.getItem(

"linkedStudent"

);







if(!childId){



console.log(

"No student linked"

);



return;



}








const studentRef =

doc(

db,

"students",

childId

);







const snapshot =

await getDoc(studentRef);







if(snapshot.exists()){



const data =

snapshot.data();







const points =

document.getElementById(

"parentPoints"

);







const goals =

document.getElementById(

"parentGoals"

);







const badges =

document.getElementById(

"parentBadges"

);







const paces =

document.getElementById(

"parentPaces"

);








if(points){



points.innerHTML =

data.points || 0;



}







if(goals){



goals.innerHTML =

(data.goals || []).length;



}







if(badges){



badges.innerHTML =

(data.badges || []).length;



}







if(paces){



paces.innerHTML =

(data.paces || []).length;



}







}



}









// =====================================
// LINK STUDENT ACCOUNT
// =====================================


window.linkStudent = function(){



const studentId =

document.getElementById(

"studentIdInput"

).value.trim();








if(studentId === ""){



alert(

"Enter student ID"

);



return;



}








localStorage.setItem(

"linkedStudent",

studentId

);







alert(

"✅ Student account linked!"

);







loadParentData();



};









// =====================================
// PARENT REPORT SUMMARY
// =====================================


function generateParentReport(){



const completedGoals =

studentGoals.filter(

goal=>goal.completed

).length;







return {



goals:completedGoals,


points:studentPoints,


badges:unlockedAchievements.length,


paces:paceRecords.length



};



}









// =====================================
// START PARENT SYSTEM
// =====================================


loadRoleDashboard();
// =====================================
// ACE STUDENT PROGRESS TRACKER
// SCRIPT.JS PART 20
// TEACHER DASHBOARD SYSTEM
// ======================================





// =====================================
// TEACHER DATA
// =====================================


let teacherClass =

JSON.parse(

localStorage.getItem(

"teacherClass"

)

)

|| [];









// =====================================
// ADD STUDENT TO CLASS
// =====================================


window.addClassStudent = function(){



const nameInput =

document.getElementById(

"teacherStudentName"

);






if(!nameInput){

return;

}







const studentName =

nameInput.value.trim();







if(studentName === ""){



alert(

"Enter student name"

);



return;



}









const student = {



id:Date.now(),



name:studentName,



points:0,



goals:0,



badges:0,



paces:0



};








teacherClass.push(student);





saveTeacherClass();





displayTeacherClass();





nameInput.value="";



};









// =====================================
// SAVE CLASS DATA
// =====================================


function saveTeacherClass(){



localStorage.setItem(

"teacherClass",

JSON.stringify(

teacherClass

)

);



}









// =====================================
// DISPLAY CLASS
// =====================================


function displayTeacherClass(){



const list =

document.getElementById(

"teacherStudentList"

);







if(!list){

return;

}







list.innerHTML="";







teacherClass.forEach(student=>{



const card =

document.createElement(

"div"

);






card.className =

"teacher-student-card";







card.innerHTML = `


<h3>

👤 ${student.name}

</h3>


<p>

⭐ Points:

${student.points}

</p>


<p>

🎯 Goals:

${student.goals}

</p>


<p>

🏆 Badges:

${student.badges}

</p>


<p>

📚 PACEs:

${student.paces}

</p>


<button onclick="viewStudentReport(${student.id})">

View Report

</button>


`;








list.appendChild(card);



});



}









// =====================================
// VIEW STUDENT REPORT
// =====================================


window.viewStudentReport = function(id){



const student =

teacherClass.find(

item=>item.id===id

);







if(!student){

return;

}








alert(



"📊 Student Report\n\n"

+

"Student: "

+

student.name

+

"\n⭐ Points: "

+

student.points

+

"\n🎯 Goals: "

+

student.goals

+

"\n🏆 Badges: "

+

student.badges

+

"\n📚 PACEs: "

+

student.paces



);



};









// =====================================
// CLASS ANALYTICS
// =====================================


function updateClassAnalytics(){



const totalStudents =

teacherClass.length;







let totalPoints = 0;







teacherClass.forEach(student=>{



totalPoints += student.points;



});







let averagePoints = 0;







if(totalStudents > 0){



averagePoints = Math.round(

totalPoints / totalStudents

);



}







const studentCount =

document.getElementById(

"classStudents"

);







const average =

document.getElementById(

"classAveragePoints"

);







if(studentCount){



studentCount.innerHTML =

totalStudents;



}







if(average){



average.innerHTML =

averagePoints;



}



}









// =====================================
// FIREBASE TEACHER SAVE
// =====================================


async function saveTeacherCloud(){



const user =

auth.currentUser;







if(!user){

return;

}







await setDoc(



doc(

db,

"teachers",

user.uid

),



{


students:teacherClass,


updated:new Date()



},



{


merge:true



}



);







console.log(

"👩‍🏫 Teacher data synced"

);



}









// =====================================
// LOAD TEACHER MODE
// =====================================


window.openTeacherDashboard = function(){



document.getElementById(

"dashboard"

).style.display="none";





const teacher =

document.getElementById(

"teacherDashboard"

);







if(teacher){



teacher.style.display="block";



}






displayTeacherClass();


updateClassAnalytics();



};









// =====================================
// START TEACHER SYSTEM
// =====================================


displayTeacherClass();

updateClassAnalytics();
// =====================================
// ACE STUDENT PROGRESS TRACKER
// SCRIPT.JS PART 21
// CERTIFICATE GENERATOR 2.0
// ======================================





// =====================================
// CERTIFICATE STORAGE
// =====================================


let earnedCertificates =

JSON.parse(

localStorage.getItem(

"earnedCertificates"

)

)

|| [];









// =====================================
// CERTIFICATE TYPES
// =====================================


const certificateTemplates = [


{

id:"goals",

title:"🎯 Goal Achievement Award",

description:
"For outstanding completion of learning goals."

},



{

id:"paces",

title:"📚 PACE Excellence Award",

description:
"For excellent academic progress."

},



{

id:"streak",

title:"🔥 Consistency Champion",

description:
"For maintaining a strong study habit."

},



{

id:"scholar",

title:"💎 Diamond Scholar Award",

description:
"For exceptional achievement and dedication."

}



];









// =====================================
// CREATE CERTIFICATE
// =====================================


window.createCertificate = async function(type){



const user =

auth.currentUser;







let studentName =

"Student";








// Get name from Firebase


if(user){



const snapshot =

await getDoc(



doc(

db,

"students",

user.uid

)



);







if(snapshot.exists()){



studentName =

snapshot.data().name;



}



}









const template =

certificateTemplates.find(

item=>item.id===type

);







if(!template){

return;

}








const certificate = {



id:Date.now(),



student:studentName,



title:template.title,



description:template.description,



date:new Date().toLocaleDateString()



};








earnedCertificates.push(

certificate

);







localStorage.setItem(

"earnedCertificates",

JSON.stringify(

earnedCertificates

)

);








displayCertificates();








alert(

"🎉 Certificate Earned!\n"

+

template.title

);



};









// =====================================
// DISPLAY CERTIFICATES
// =====================================


function displayCertificates(){



const box =

document.getElementById(

"certificateList"

);







if(!box){

return;

}







box.innerHTML="";







earnedCertificates.forEach(cert=>{



const card =

document.createElement(

"div"

);






card.className =

"certificate-card";







card.innerHTML = `


<h2>

🏅 Certificate of Achievement

</h2>


<h3>

${cert.title}

</h3>


<p>

Awarded to:

<strong>

${cert.student}

</strong>

</p>


<p>

${cert.description}

</p>


<p>

📅 ${cert.date}

</p>


<button onclick="printCertificate(${cert.id})">

🖨 Print Certificate

</button>


`;







box.appendChild(card);



});



}









// =====================================
// PRINT CERTIFICATE
// =====================================


window.printCertificate = function(id){



const certificate =

earnedCertificates.find(

item=>item.id===id

);







if(!certificate){

return;

}








const printWindow =

window.open(

"",

"",

"width=900,height=700"

);








printWindow.document.write(`



<html>

<head>

<title>

Certificate

</title>


<style>


body{

font-family:Arial;

text-align:center;

padding:50px;

background:#f5f5f5;

}


.certificate{


border:12px solid #d4af37;

padding:50px;

background:white;

}



h1{

font-size:40px;

}



h2{

color:#333;

}



.student{

font-size:30px;

font-weight:bold;

}


</style>


</head>



<body>



<div class="certificate">


<h1>

🎓 ACE Student Progress Tracker

</h1>


<h2>

Certificate of Achievement

</h2>


<p>

This certificate is proudly presented to

</p>


<div class="student">

${certificate.student}

</div>


<h2>

${certificate.title}

</h2>


<p>

${certificate.description}

</p>


<p>

Awarded:

${certificate.date}

</p>


</div>



</body>


</html>



`);







printWindow.document.close();


printWindow.print();



};









// =====================================
// FIREBASE CERTIFICATE SYNC
// =====================================


async function saveCertificatesCloud(){



const user =

auth.currentUser;







if(!user){

return;

}







await setDoc(



doc(

db,

"students",

user.uid

),



{


certificates:earnedCertificates



},



{


merge:true



}



);







console.log(

"🏅 Certificates synced"

);



}









// =====================================
// LOAD CERTIFICATES
// =====================================


displayCertificates();
// =====================================
// ACE STUDENT PROGRESS TRACKER
// SCRIPT.JS PART 22
// ACHIEVEMENT NOTIFICATION SYSTEM
// ======================================





// =====================================
// NOTIFICATION STORAGE
// =====================================


let achievementNotifications =

JSON.parse(

localStorage.getItem(

"achievementNotifications"

)

)

|| [];









// =====================================
// CREATE NOTIFICATION
// =====================================


function createNotification(title, message, icon){



const notification = {



id:Date.now(),



title:title,



message:message,



icon:icon,



date:new Date().toLocaleDateString()



};








achievementNotifications.unshift(

notification

);







localStorage.setItem(

"achievementNotifications",

JSON.stringify(

achievementNotifications

)

);







showAchievementPopup(

notification

);



}









// =====================================
// ACHIEVEMENT POPUP
// =====================================


function showAchievementPopup(notification){



const popup =

document.createElement(

"div"

);







popup.className =

"achievement-popup";







popup.innerHTML = `


<div class="popup-icon">

${notification.icon}

</div>


<div>


<h3>

${notification.title}

</h3>


<p>

${notification.message}

</p>


</div>


`;








document.body.appendChild(

popup

);








setTimeout(()=>{



popup.classList.add(

"show"

);



},100);








setTimeout(()=>{



popup.classList.remove(

"show"

);



setTimeout(()=>{



popup.remove();



},500);



},4000);



}









// =====================================
// LEVEL SYSTEM
// =====================================


let studentLevel =

Number(

localStorage.getItem(

"studentLevel"

)

)

|| 1;









function checkLevelUp(){



const newLevel =

Math.floor(

studentPoints / 100

)

+ 1;








if(newLevel > studentLevel){



studentLevel = newLevel;







localStorage.setItem(

"studentLevel",

studentLevel

);







createNotification(



"🎉 Level Up!",



"You reached Level " + studentLevel,



"⭐"



);



}



}









// =====================================
// POINT MILESTONES
// =====================================


const milestones = [



100,



500,



1000,



2500,



5000



];







let reachedMilestones =

JSON.parse(

localStorage.getItem(

"reachedMilestones"

)

)

|| [];









function checkMilestones(){



milestones.forEach(amount=>{



if(

studentPoints >= amount &&

!reachedMilestones.includes(amount)

){



reachedMilestones.push(amount);







localStorage.setItem(

"reachedMilestones",

JSON.stringify(

reachedMilestones

)

);







createNotification(



"🏆 Achievement Unlocked!",



"You earned " + amount + " points!",



"💎"



);



}



});



}









// =====================================
// BADGE NOTIFICATION
// =====================================


function notifyBadge(badgeName){



createNotification(



"🏅 New Badge!",



"You unlocked " + badgeName,



"🎖️"



);



}









// =====================================
// REWARD NOTIFICATION
// =====================================


function notifyReward(rewardName){



createNotification(



"🎁 Reward Unlocked!",



"You unlocked " + rewardName,



"✨"



);



}









// =====================================
// DISPLAY HISTORY
// =====================================


function displayNotifications(){



const box =

document.getElementById(

"notificationList"

);







if(!box){

return;

}







box.innerHTML="";







achievementNotifications.forEach(item=>{



const card =

document.createElement(

"div"

);







card.className =

"notification-card";







card.innerHTML = `


<h3>

${item.icon}

${item.title}

</h3>


<p>

${item.message}

</p>


<small>

${item.date}

</small>


`;







box.appendChild(card);



});



}









// =====================================
// CONNECT TO POINT SYSTEM
// =====================================


const oldAddPoints =

window.addPoints;








window.addPoints = function(amount){



oldAddPoints(amount);







checkLevelUp();



checkMilestones();



};









// =====================================
// LOAD NOTIFICATIONS
// =====================================


displayNotifications();
// =====================================
// ACE STUDENT PROGRESS TRACKER
// SCRIPT.JS PART 23
// ADVANCED REPORTS SYSTEM
// ======================================





// =====================================
// REPORT STORAGE
// =====================================


let reports =

JSON.parse(

localStorage.getItem(

"studentReports"

)

)

|| [];









// =====================================
// CREATE REPORT
// =====================================


function createReport(type){



const completedGoals =

studentGoals.filter(

goal => goal.completed

).length;







const totalGoals =

studentGoals.length;







let completion = 0;







if(totalGoals > 0){



completion = Math.round(

(completedGoals / totalGoals) * 100

);



}









const report = {



id:Date.now(),



type:type,



date:new Date().toLocaleDateString(),



points:studentPoints,



goals:completedGoals,



paces:paceRecords.length,



badges:unlockedBadges.length,



completion:completion



};







reports.unshift(report);








localStorage.setItem(

"studentReports",

JSON.stringify(

reports

)

);








displayReports();



}









// =====================================
// WEEKLY REPORT
// =====================================


window.createWeeklyReport = function(){



createReport(

"Weekly Report"

);







alert(

"📈 Weekly report created!"

);



};









// =====================================
// MONTHLY REPORT
// =====================================


window.createMonthlyReport = function(){



createReport(

"Monthly Report"

);







alert(

"📅 Monthly report created!"

);



};









// =====================================
// DISPLAY REPORTS
// =====================================


function displayReports(){



const box =

document.getElementById(

"reportList"

);







if(!box){

return;

}







box.innerHTML="";







reports.forEach(report=>{



const card =

document.createElement(

"div"

);







card.className =

"report-card";








card.innerHTML = `


<h3>

📊 ${report.type}

</h3>


<p>

📅 ${report.date}

</p>


<p>

⭐ Points: ${report.points}

</p>


<p>

🎯 Goals Completed: ${report.goals}

</p>


<p>

📚 PACEs Finished: ${report.paces}

</p>


<p>

🏅 Badges: ${report.badges}

</p>


<p>

📈 Completion: ${report.completion}%

</p>


<button onclick="printReport(${report.id})">

🖨 Print Report

</button>


`;







box.appendChild(card);



});



}









// =====================================
// PRINT REPORT
// =====================================


window.printReport = function(id){



const report =

reports.find(

item=>item.id===id

);







if(!report){

return;

}







const windowPrint =

window.open(

"",

"",

"width=800,height=700"

);







windowPrint.document.write(`



<html>

<head>


<title>

ACE Progress Report

</title>



<style>


body{

font-family:Arial;

padding:40px;

text-align:center;

}


.report{

border:3px solid #333;

padding:30px;

}


h1{

color:#4a148c;

}


</style>


</head>



<body>


<div class="report">


<h1>

🎓 ACE Student Progress Tracker

</h1>


<h2>

${report.type}

</h2>


<p>

Date: ${report.date}

</p>


<hr>


<h3>

⭐ Points Earned

</h3>


<p>

${report.points}

</p>


<h3>

🎯 Goals Completed

</h3>


<p>

${report.goals}

</p>


<h3>

📚 PACEs Completed

</h3>


<p>

${report.paces}

</p>


<h3>

🏅 Badges Earned

</h3>


<p>

${report.badges}

</p>


<h3>

📈 Completion Rate

</h3>


<p>

${report.completion}%

</p>



</div>


</body>


</html>



`);








windowPrint.document.close();


windowPrint.print();



};









// =====================================
// SUBJECT ANALYTICS
// =====================================


function generateSubjectAnalytics(){



const subjects = {



Math:95,



English:88,



Science:76,



Reading:91



};







return subjects;



}









// =====================================
// DISPLAY SUBJECT ANALYTICS
// =====================================


function displaySubjectAnalytics(){



const box =

document.getElementById(

"subjectAnalytics"

);







if(!box){

return;

}







box.innerHTML="";







const subjects =

generateSubjectAnalytics();







Object.keys(subjects).forEach(subject=>{



box.innerHTML += `


<div class="subject-report">


<h3>

📚 ${subject}

</h3>


<p>

Performance:

${subjects[subject]}%

</p>


</div>


`;



});



}









// =====================================
// FIREBASE REPORT SYNC
// =====================================


async function saveReportsCloud(){



const user =

auth.currentUser;







if(!user){

return;

}







await setDoc(



doc(

db,

"students",

user.uid

),



{


reports:reports



},



{


merge:true



}



);







console.log(

"📊 Reports synced"

);



}









// =====================================
// LOAD REPORT SYSTEM
// =====================================


displayReports();

displaySubjectAnalytics();
// =====================================
// ACE STUDENT PROGRESS TRACKER
// SCRIPT.JS PART 24
// FULL FIREBASE CLOUD SYNC
// ======================================





import {

    onSnapshot

} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";









// =====================================
// SAVE ALL STUDENT DATA TO FIREBASE
// =====================================


async function syncStudentData(){



const user =

auth.currentUser;







if(!user){

console.log(

"No user logged in"

);

return;

}







const studentData = {



name:

document.getElementById("studentName")?.innerHTML || "Student",



points:studentPoints || 0,



goals:studentGoals || [],



badges:unlockedBadges || [],



paces:paceRecords || [],



certificates:earnedCertificates || [],



reports:reports || [],



level:studentLevel || 1,



updatedAt:

new Date()



};








await setDoc(



doc(

db,

"students",

user.uid

),



studentData,



{

merge:true

}



);







console.log(

"☁️ Student data synced"

);



}









// =====================================
// LOAD CLOUD DATA
// =====================================


async function loadCloudStudentData(){



const user =

auth.currentUser;







if(!user){

return;

}







const studentRef =

doc(

db,

"students",

user.uid

);







const snapshot =

await getDoc(

studentRef

);







if(snapshot.exists()){



const data =

snapshot.data();







studentPoints =

data.points || 0;







studentGoals =

data.goals || [];







unlockedBadges =

data.badges || [];







paceRecords =

data.paces || [];







earnedCertificates =

data.certificates || [];







reports =

data.reports || [];







studentLevel =

data.level || 1;







updatePointsDisplay();

displayGoals();

updateBadgeDisplay();

updatePACEStats();

displayCertificates();

displayReports();







console.log(

"☁️ Cloud data loaded"

);



}



}









// =====================================
// REAL TIME SYNC
// =====================================


function startRealtimeSync(){



const user =

auth.currentUser;







if(!user){

return;

}







const studentRef =

doc(

db,

"students",

user.uid

);







onSnapshot(

studentRef,

(snapshot)=>{



if(snapshot.exists()){



console.log(

"🔄 Live update received"

);



}



}



);



}









// =====================================
// AUTO SYNC WHEN USER LOGS IN
// =====================================


onAuthStateChanged(

auth,

async(user)=>{



if(user){



await loadCloudStudentData();



startRealtimeSync();



}






});









// =====================================
// AUTO SAVE EVENTS
// =====================================


window.addEventListener(

"beforeunload",

()=>{



syncStudentData();



}

);









// =====================================
// MANUAL CLOUD BUTTON
// =====================================


window.cloudSave = async function(){



await syncStudentData();







alert(

"☁️ Progress saved successfully!"

);



};









// =====================================
// CLOUD STATUS
// =====================================


function updateCloudStatus(){



const status =

document.getElementById(

"cloudStatus"

);







if(status){



status.innerHTML =

"☁️ Cloud Connected";



}



}







updateCloudStatus();
// =====================================
// ACE STUDENT PROGRESS TRACKER
// SCRIPT.JS PART 25
// PARENT ACCOUNT SYSTEM
// ======================================



import {

getDoc

} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";





// =====================================
// PARENT DATA
// =====================================


let parentStudentID =

localStorage.getItem(

"parentStudentID"

)

|| null;








// =====================================
// LINK STUDENT ACCOUNT
// =====================================


window.linkStudentAccount = async function(){



const studentID =

document.getElementById(

"studentIDInput"

).value.trim();







if(studentID===""){



alert(

"Enter student ID"

);



return;



}







const studentRef =

doc(

db,

"students",

studentID

);







const studentSnapshot =

await getDoc(

studentRef

);







if(!studentSnapshot.exists()){



alert(

"❌ Student account not found"

);



return;



}







parentStudentID = studentID;







localStorage.setItem(

"parentStudentID",

studentID

);







alert(

"✅ Student account linked!"

);







loadParentDashboard();



};









// =====================================
// LOAD PARENT DASHBOARD
// =====================================


async function loadParentDashboard(){



if(!parentStudentID){

return;

}







const studentRef =

doc(

db,

"students",

parentStudentID

);







const snapshot =

await getDoc(

studentRef

);







if(snapshot.exists()){



const student =

snapshot.data();







const name =

document.getElementById(

"parentStudentName"

);







const points =

document.getElementById(

"parentStudentPoints"

);







const goals =

document.getElementById(

"parentStudentGoals"

);







const badges =

document.getElementById(

"parentStudentBadges"

);







const paces =

document.getElementById(

"parentStudentPACEs"

);








if(name){

name.innerHTML =

student.name;

}







if(points){

points.innerHTML =

(student.points || 0) + " ⭐";

}







if(goals){

goals.innerHTML =

(student.goals || []).length;

}







if(badges){

badges.innerHTML =

(student.badges || []).length;

}







if(paces){

paces.innerHTML =

(student.paces || []).length;

}






}







}









// =====================================
// PARENT ACHIEVEMENT ALERTS
// =====================================


function parentAchievementAlert(){



if(!parentStudentID){

return;

}







const alertBox =

document.getElementById(

"parentAlerts"

);







if(!alertBox){

return;

}







alertBox.innerHTML = `



<div class="parent-alert">


<h3>

🏆 Recent Progress

</h3>


<p>

Your student is building great learning habits!

</p>


</div>


`;



}









// =====================================
// PARENT REAL TIME WATCH
// =====================================


function watchStudentProgress(){



if(!parentStudentID){

return;

}







const studentRef =

doc(

db,

"students",

parentStudentID

);







onSnapshot(

studentRef,

(snapshot)=>{



if(snapshot.exists()){



console.log(

"👨‍👩‍👧 Parent received update"

);



loadParentDashboard();



parentAchievementAlert();



}



}



);



}









// =====================================
// OPEN PARENT MODE
// =====================================


window.openParentDashboard = function(){



document.getElementById(

"dashboard"

).style.display="none";







document.getElementById(

"parentDashboard"

).style.display="block";







loadParentDashboard();



watchStudentProgress();



};









// =====================================
// LOAD SAVED PARENT
// =====================================


if(parentStudentID){



loadParentDashboard();



watchStudentProgress();



}
// =====================================
// ACE STUDENT PROGRESS TRACKER
// SCRIPT.JS PART 26
// TEACHER DASHBOARD SYSTEM
// ======================================



// =====================================
// TEACHER DATA
// =====================================


let teacherClass =

JSON.parse(

localStorage.getItem(

"teacherClass"

)

)

|| [];







// =====================================
// ADD STUDENT TO CLASS
// =====================================


window.addClassStudent = async function(){



const studentEmail =

document.getElementById(

"teacherStudentEmail"

).value.trim();







if(studentEmail===""){



alert(

"Enter student email"

);



return;



}







const student = {



id:Date.now(),



email:studentEmail,



name:"Student",



points:0,



goals:0,



paces:0,



badges:0



};







teacherClass.push(student);







saveTeacherClass();







displayTeacherClass();







document.getElementById(

"teacherStudentEmail"

).value="";



};









// =====================================
// SAVE TEACHER CLASS
// =====================================


function saveTeacherClass(){



localStorage.setItem(

"teacherClass",

JSON.stringify(

teacherClass

)

);



}









// =====================================
// DISPLAY CLASS
// =====================================


function displayTeacherClass(){



const box =

document.getElementById(

"teacherClassList"

);







if(!box){

return;

}







box.innerHTML="";







teacherClass.forEach(student=>{



const card =

document.createElement(

"div"

);







card.className =

"teacher-student-card";







card.innerHTML = `


<h3>

👤 ${student.name}

</h3>


<p>

📧 ${student.email}

</p>


<p>

⭐ Points: ${student.points}

</p>


<p>

🎯 Goals: ${student.goals}

</p>


<p>

📚 PACEs: ${student.paces}

</p>


<p>

🏅 Badges: ${student.badges}

</p>


`;







box.appendChild(card);



});



}









// =====================================
// LOAD STUDENT FROM FIREBASE
// =====================================


window.teacherViewStudent = async function(uid){



const studentRef =

doc(

db,

"students",

uid

);







const snapshot =

await getDoc(

studentRef

);







if(snapshot.exists()){



const student =

snapshot.data();







alert(

"📚 "

+

student.name

+

"\n⭐ Points: "

+

student.points

+

"\n🏅 Badges: "

+

student.badges.length

);



}



};









// =====================================
// CLASS RANKINGS
// =====================================


function generateClassRanking(){



const rankingBox =

document.getElementById(

"classRanking"

);







if(!rankingBox){

return;

}







const ranking =

[...teacherClass].sort(

(a,b)=>

b.points-a.points

);







rankingBox.innerHTML="";







ranking.forEach(

(student,index)=>{



rankingBox.innerHTML += `


<div class="ranking-card">


<h3>

${index+1}. 🏆 ${student.name}

</h3>


<p>

⭐ ${student.points} Points

</p>


</div>


`;



}



);



}









// =====================================
// TEACHER REPORT
// =====================================


function createTeacherReport(){



const totalStudents =

teacherClass.length;







let totalPoints = 0;







teacherClass.forEach(student=>{



totalPoints += student.points;



});







const average =

totalStudents > 0

?

Math.round(

totalPoints / totalStudents

)

:

0;







const reportBox =

document.getElementById(

"teacherReport"

);







if(reportBox){



reportBox.innerHTML = `


<h3>

📊 Class Report

</h3>


<p>

👩‍🎓 Students: ${totalStudents}

</p>


<p>

⭐ Average Points: ${average}

</p>


`;



}



}









// =====================================
// OPEN TEACHER DASHBOARD
// =====================================


window.openTeacherDashboard = function(){



document.getElementById(

"dashboard"

).style.display="none";







document.getElementById(

"parentDashboard"

).style.display="none";







document.getElementById(

"teacherDashboard"

).style.display="block";







displayTeacherClass();

generateClassRanking();

createTeacherReport();



};









// =====================================
// INITIAL LOAD
// =====================================


displayTeacherClass();
// =====================================
// ACE STUDENT PROGRESS TRACKER
// SCRIPT.JS PART 27
// CERTIFICATE GENERATOR UPGRADE
// ======================================



// =====================================
// CERTIFICATE STORAGE
// =====================================


let certificates =

JSON.parse(

localStorage.getItem(

"aceCertificates"

)

)

|| [];









// =====================================
// CERTIFICATE TYPES
// =====================================


const certificateTemplates = [



{

id:"goal",

title:"🎯 Goal Achievement Award",

description:

"For completing learning goals successfully."

},



{

id:"pace",

title:"📚 PACE Excellence Award",

description:

"For outstanding PACE progress."

},



{

id:"streak",

title:"🔥 Consistency Champion Award",

description:

"For maintaining excellent study habits."

},



{

id:"scholar",

title:"🏆 Academic Excellence Award",

description:

"For exceptional overall progress."

}



];









// =====================================
// CREATE CERTIFICATE
// =====================================


window.createCertificate = async function(type){



const user =

auth.currentUser;







let studentName =

"Student";







if(user){



const studentRef =

doc(

db,

"students",

user.uid

);







const snapshot =

await getDoc(

studentRef

);







if(snapshot.exists()){



studentName =

snapshot.data().name;



}



}








const template =

certificateTemplates.find(

item => item.id === type

);







if(!template){

return;

}









const certificate = {



id:Date.now(),



student:studentName,



title:template.title,



description:template.description,



date:new Date().toLocaleDateString()



};







certificates.push(

certificate

);







localStorage.setItem(

"aceCertificates",

JSON.stringify(

certificates

)

);







await saveCertificatesCloud();







displayCertificates();







alert(

"🎉 Certificate Earned!\n"

+

template.title

);



};









// =====================================
// DISPLAY CERTIFICATES
// =====================================


function displayCertificates(){



const box =

document.getElementById(

"certificateList"

);







if(!box){

return;

}







box.innerHTML="";







certificates.forEach(cert=>{



const card =

document.createElement(

"div"

);







card.className=

"certificate-card";







card.innerHTML = `



<h2>

🎓 ACE Achievement Certificate

</h2>


<h3>

${cert.title}

</h3>


<p>

Awarded to:

<strong>

${cert.student}

</strong>

</p>


<p>

${cert.description}

</p>


<p>

📅 ${cert.date}

</p>


<button onclick="printCertificate(${cert.id})">

🖨 Print

</button>



`;







box.appendChild(card);



});



}









// =====================================
// PRINT CERTIFICATE
// =====================================


window.printCertificate = function(id){



const cert =

certificates.find(

item=>item.id===id

);







if(!cert){

return;

}







const printWindow =

window.open(

"",

"",

"width=900,height=700"

);







printWindow.document.write(`


<html>

<head>


<title>

ACE Certificate

</title>



<style>


body{

font-family:Georgia,serif;

text-align:center;

padding:60px;

}


.certificate{

border:12px solid #d4af37;

padding:50px;

}


h1{

font-size:40px;

}


.name{

font-size:32px;

font-weight:bold;

}



</style>


</head>


<body>


<div class="certificate">


<h1>

🎓 ACE Student Progress Tracker

</h1>


<h2>

Certificate of Achievement

</h2>


<p>

This certificate is proudly presented to

</p>


<div class="name">

${cert.student}

</div>


<h2>

${cert.title}

</h2>


<p>

${cert.description}

</p>


<p>

Date: ${cert.date}

</p>


</div>


</body>


</html>



`);







printWindow.document.close();


printWindow.print();



};









// =====================================
// FIREBASE CERTIFICATE SYNC
// =====================================


async function saveCertificatesCloud(){



const user =

auth.currentUser;







if(!user){

return;

}







await setDoc(



doc(

db,

"students",

user.uid

),



{


certificates:certificates



},



{


merge:true



}



);







console.log(

"📜 Certificates synced"

);



}









// =====================================
// AUTO LOAD
// =====================================


displayCertificates();
// =====================================
// ACE STUDENT PROGRESS TRACKER
// SCRIPT.JS PART 28
// ACCOUNT ROLES + PERMISSIONS
// ======================================



// =====================================
// CURRENT ROLE
// =====================================


let currentRole =

localStorage.getItem(

"userRole"

)

|| "student";









// =====================================
// SAVE USER ROLE
// =====================================


async function saveUserRole(role){



const user =

auth.currentUser;







if(!user){

return;

}







await setDoc(



doc(

db,

"users",

user.uid

),



{


role:role,


email:user.email,


updatedAt:new Date()



},



{


merge:true



}



);







localStorage.setItem(

"userRole",

role

);



}









// =====================================
// SET ROLE
// =====================================


window.setRole = async function(role){



const allowedRoles = [



"student",


"parent",


"teacher",


"admin"



];







if(!allowedRoles.includes(role)){



alert(

"Invalid role"

);



return;

}







await saveUserRole(role);







alert(

"✅ Account type saved: "

+

role

);



};









// =====================================
// GET USER ROLE
// =====================================


async function getUserRole(){



const user =

auth.currentUser;







if(!user){

return "student";

}







const userRef =

doc(

db,

"users",

user.uid

);







const snapshot =

await getDoc(

userRef

);







if(snapshot.exists()){



return snapshot.data().role || "student";



}







return "student";



}









// =====================================
// LOAD CORRECT DASHBOARD
// =====================================


async function loadUserDashboard(){



const role =

await getUserRole();







currentRole = role;







localStorage.setItem(

"userRole",

role

);







// Hide everything first


const studentDashboard =

document.getElementById(

"dashboard"

);





const parentDashboard =

document.getElementById(

"parentDashboard"

);





const teacherDashboard =

document.getElementById(

"teacherDashboard"

);





const adminDashboard =

document.getElementById(

"adminDashboard"

);








if(studentDashboard)

studentDashboard.style.display="none";







if(parentDashboard)

parentDashboard.style.display="none";







if(teacherDashboard)

teacherDashboard.style.display="none";







if(adminDashboard)

adminDashboard.style.display="none";










// Open correct area


if(role==="student"){



if(studentDashboard)

studentDashboard.style.display="block";



}







else if(role==="parent"){



if(parentDashboard)

parentDashboard.style.display="block";



loadParentDashboard();



}







else if(role==="teacher"){



if(teacherDashboard)

teacherDashboard.style.display="block";



displayTeacherClass();



}







else if(role==="admin"){



if(adminDashboard)

adminDashboard.style.display="block";



}



}









// =====================================
// LOGIN ROLE CHECK
// =====================================


onAuthStateChanged(

auth,

async(user)=>{



if(user){



await loadUserDashboard();



}



});









// =====================================
// ROLE BADGE DISPLAY
// =====================================


function displayRoleBadge(){



const badge =

document.getElementById(

"userRoleBadge"

);







if(badge){



badge.innerHTML =



currentRole.toUpperCase();



}



}

displayRoleBadge();
// =====================================
// AUTH PROTECTION
// =====================================


function requireLogin(){


const user = auth.currentUser;


if(!user){


document.getElementById(
"dashboard"
).style.display="none";


document.getElementById(
"authSection"
).style.display="flex";


return false;


}


return true;


}