/* ==========================================
   ACE Progress Tracker™
   Student Profile
========================================== */


document.addEventListener(
"DOMContentLoaded",
loadProfile
);



function loadProfile(){


const profile =
getData("studentProfile")
||
{};



if(profile.image){

document.getElementById(
"profileImage"
).src = profile.image;

}



document.getElementById(
"fullName"
).value =
profile.name || "";



document.getElementById(
"grade"
).value =
profile.grade || "";



document.getElementById(
"school"
).value =
profile.school || "";



document.getElementById(
"bio"
).value =
profile.bio || "";

}



document
.getElementById("imageUpload")
.addEventListener(
"change",

function(event){


const file =
event.target.files[0];


const reader =
new FileReader();



reader.onload = function(){


document.getElementById(
"profileImage"
).src =
reader.result;



};



reader.readAsDataURL(file);


}

);





function saveProfile(){


const profile = {


name:
document.getElementById(
"fullName"
).value,


grade:
document.getElementById(
"grade"
).value,


school:
document.getElementById(
"school"
).value,


bio:
document.getElementById(
"bio"
).value,


image:
document.getElementById(
"profileImage"
).src


};



saveData(
"studentProfile",
profile
);



document.getElementById(
"studentName"
).textContent =
profile.name;



alert(
"Profile saved ✅"
);


}