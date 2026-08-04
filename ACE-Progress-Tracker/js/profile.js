/* ==========================================
   ACE Progress Tracker™
   Student Profile System
========================================== */


document.addEventListener(
"DOMContentLoaded",
loadProfile
);





/* ==========================================
   Profile Picture Upload
========================================== */


const upload =

document.getElementById(
"profileUpload"
);



if(upload){


upload.addEventListener(

"change",

function(event){


const file =

event.target.files[0];



if(!file)

return;





const reader =

new FileReader();





reader.onload =

function(){



const imageData =

reader.result;





const preview =

document.getElementById(
"profilePreview"
);




if(preview)

preview.src = imageData;





let profile =

getData(
"studentProfile"
)
||
{};




profile.image =

imageData;



saveData(

"studentProfile",

profile

);



};





reader.readAsDataURL(
file
);



}

);



}








/* ==========================================
   Save Profile
========================================== */


function saveProfile(){



let profile =

getData(
"studentProfile"
)
||
{};






profile.name =

document.getElementById(
"studentName"
).value;





profile.studentID =

document.getElementById(
"studentID"
).value;





profile.classLevel =

document.getElementById(
"studentClass"
).value;





profile.learningPreference =

document.getElementById(
"learningPreference"
).value;





profile.theme =

document.getElementById(
"themePreference"
).value;







saveData(

"studentProfile",

profile

);





applyTheme(
profile.theme
);





alert(
"Profile Saved Successfully 👤"
);



}









/* ==========================================
   Load Profile
========================================== */


function loadProfile(){



const profile =

getData(
"studentProfile"
)
||
{};






if(
document.getElementById(
"studentName"
)
)

document.getElementById(
"studentName"
).value =

profile.name
||
"";







if(
document.getElementById(
"studentID"
)
)

document.getElementById(
"studentID"
).value =

profile.studentID
||
"";







if(
document.getElementById(
"studentClass"
)
)

document.getElementById(
"studentClass"
).value =

profile.classLevel
||
"";







if(
document.getElementById(
"learningPreference"
)
)

document.getElementById(
"learningPreference"
).value =

profile.learningPreference
||
"Visual Learning";







if(
document.getElementById(
"themePreference"
)
)

document.getElementById(
"themePreference"
).value =

profile.theme
||
"light";








const preview =

document.getElementById(
"profilePreview"
);





if(
preview &&
profile.image
){


preview.src =

profile.image;


}



}









/* ==========================================
   Theme Switch
========================================== */


function applyTheme(theme){



if(theme==="dark"){


document.body.classList.add(
"dark"
);


}

else{


document.body.classList.remove(
"dark"
);


}


}