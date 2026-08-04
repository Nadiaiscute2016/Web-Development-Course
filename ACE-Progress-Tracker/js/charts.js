/* ==========================================
   ACE Progress Tracker™
   Analytics Charts
========================================== */


/* Wait until dashboard loads */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        createProgressChart();

        createSubjectChart();

        createStudyChart();

    }
);





/* ==========================================
   PACE Progress Chart
========================================== */


function createProgressChart(){


    const canvas =
        document.getElementById(
            "progressChart"
        );



    if(!canvas) return;



    new Chart(
        canvas,
        {

            type:"line",


            data:{

                labels:[

                    "Week 1",
                    "Week 2",
                    "Week 3",
                    "Week 4",
                    "Week 5",
                    "Week 6"

                ],


                datasets:[{

                    label:
                    "PACE Completion %",


                    data:[

                        10,
                        25,
                        40,
                        55,
                        75,
                        90

                    ],


                    tension:0.4,

                    fill:true

                }]

            },


            options:{

                responsive:true,


                scales:{

                    y:{

                        beginAtZero:true,

                        max:100

                    }

                }

            }

        }

    );

}





/* ==========================================
   Subject Radar Chart
========================================== */


function createSubjectChart(){


    const canvas =
        document.getElementById(
            "subjectChart"
        );



    if(!canvas) return;



    new Chart(

        canvas,

        {

            type:"radar",


            data:{


                labels:[

                    "Math",
                    "English",
                    "Science",
                    "Social Studies",
                    "Word Building"

                ],


                datasets:[{


                    label:
                    "Performance",


                    data:[

                        90,
                        85,
                        95,
                        80,
                        88

                    ]


                }]

            },


            options:{

                responsive:true

            }


        }

    );

}





/* ==========================================
   Weekly Study Chart
========================================== */


function createStudyChart(){


    const canvas =
        document.getElementById(
            "studyChart"
        );



    if(!canvas) return;



    new Chart(

        canvas,

        {


            type:"bar",


            data:{


                labels:[

                    "Mon",
                    "Tue",
                    "Wed",
                    "Thu",
                    "Fri",
                    "Sat",
                    "Sun"

                ],


                datasets:[{


                    label:
                    "Study Minutes",


                    data:[

                        45,
                        60,
                        35,
                        70,
                        50,
                        90,
                        40

                    ]


                }]


            },


            options:{


                responsive:true,


                scales:{


                    y:{

                        beginAtZero:true

                    }


                }


            }


        }

    );

}





console.log(
    "Charts Loaded 📊"
);