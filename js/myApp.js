angular.module('myApp', [])
    .controller('app', function ($scope) {

        var scp = $scope;

        scp.cur_year = new Date().getFullYear();

        scp.get_from_to = function (from_date, to_date, note) {
            return to_date ? [from_date, to_date, note] : from_date
        };

        scp.get_duration = function (from_date, to_date, note) {
            [from_date, to_date, note] = scp.get_from_to(from_date, to_date, note);
            var date_display = "";
            var is_carry_over_year = false;
            if (month_diff = (to_date.getMonth() - from_date.getMonth() + 1)) {
                if (month_diff < 0) {
                    month_diff = 12 + month_diff;
                    is_carry_over_year = true;
                }
                date_display += month_diff == 1 ? month_diff + " month " : month_diff + " months "
            }
            if (year_diff = (to_date.getFullYear() - from_date.getFullYear() + (is_carry_over_year ? -1 : 0 )))
                date_display = (year_diff == 1 ? year_diff + " year " : year_diff + " years ") +
                  (date_display ? " & " + date_display : "");
            return date_display.trim() + (note ? note : "");
        };

        scp.get_date_pretty = function (date_inp) {
            var disp = date_inp.toString().split(" ");
            var cur_date = new Date();
            var is_date_same = date_inp.getYear() == cur_date.getYear() &&
                date_inp.getMonth() == cur_date.getMonth() &&
                date_inp.getDay() == cur_date.getDay();
            return is_date_same ? "Present" : disp[1] + " " + disp[3]
        };

        scp.get_interval = function (from_date, to_date) {
            [from_date, to_date] = scp.get_from_to(from_date, to_date);
            return scp.get_date_pretty(from_date) + " - " + scp.get_date_pretty(to_date)
        };

        scp.get_interval_n_duration = function (from_date, to_date, note) {
            [from_date, to_date, note] = scp.get_from_to(from_date, to_date, note);
            return scp.get_interval(from_date, to_date) + ", " + scp.get_duration(from_date, to_date, note)

        };

        scp.get_tag_link = function (tag) {
            return scp.to_link[tag.replace(/ /g, "").toLowerCase()]
        };


        var proportion;

        function drawChart() {
            var data = google.visualization.arrayToDataTable(proportion);

            var options = {
                title: 'Personality Donut',
                pieHole: 0.4,
                chartArea: {'width': '80%', 'height': '80%'},
                colors: ["#E8E4C6", "#B6B190", "#A5C3CA", "#C6DDE2", "#DCE3EB"],
                backgroundColor: { fill:'transparent' },
            };

            var chart = new google.visualization.PieChart(document.getElementById('donut_chart'));
            chart.draw(data, options);
        }

        google.charts.load("current", {packages: ["corechart"]});


        proportion = [
            ['Trait', 'Portion'],
            ['Passion', 27],
            ['Curiosity', 30],
            ['Creativity', 15],
            ['Teamwork', 15],
            ['Patience', 13],
        ];
        google.charts.setOnLoadCallback(drawChart);

        scp.personality_descrition = [
            "Hi, my name is Julian Song who is a third year undergraduate at the University of Toronto specializing in Computer Science and majoring in Statistics. Previously, I worked as Java and Web Software Developer intern (May 2016 - Aug 2017) at IBM Toronto Software Lab. \
            During my internship at IBM, I learnt and practiced Node.js, Angular.js, Dojo Toolkit, Spring framework, IBM cloud - Bluemix and IBM Watson APIs skills. \
            I am an innovative team player and developer who likes to work on both front-end and back-end for software development."

        ];

        scp.experience = [{
            name: "IBM",
            logo: "./imgs/experience/ibm.png",
            interval: [new Date(2016, 4), new Date(2017, 7)],
            positions: [
                {
                    title: "Java and Web Software Developer Intern",
                    interval: [new Date(2016, 4), new Date(2017, 7), " (16 months PEY internship)"],
                    tasks: [
                        {
                            detail: "Implemented new features and fixed defects for IBM software product in both \
                            front-end and back-end development",
                            tags: ["HTML", "CSS", "JS", "Dojo", "RTC", "Java"]
                        },
                        {
                            detail: "Refactored JDBC template and implemented RESTful APIs",
                            tags: ["Java", "Spring", "DB2", "RTC"]
                        },
                        {
                            detail: "Created, tested and optimized numerous Selenium Junit automated test cases",
                            tags: ["Java", "Junit", "Selenium", "HTML", "CSS", "JS", "Dojo", "RTC"]
                        },
                    ],

                },
                {
                    title: "Summer Software Developer and Researcher",
                    interval: [new Date(2015, 4), new Date(2015, 7)],
                    tasks: [
                        {
                            detail: "Developed a web application ConsortiaFlux to compare genome-scale metabolic models of bacterial consortia to \
                             analyze the introduction of synthetic E. coli from the Athabasca river microbiome as a team using HTML, CSS, JavaScript and Biojava.",
                            tags: ["HTML", "JavaScript", "CSS", "Synthetic Biology", "Biojava"]
                        },
                        {
                            detail: "Researched on the biodegradation of the microbiome, Toluene found in Alberta's oil sand tailing ponds and its potential political and environmental risk",
                            tags: ["Matlab"]
                        },
                    ],

                },
            ]
        },]


        scp.skills = {
            "Frontend Web": ["HTML/CSS/JS", "Bootstrap", "Foundation", "jQuery", "Angularjs", "VueJS"],
            "Server-side": ["Nodejs", "Expressjs", "Spring", "Ajax", "RESTful"],
            "Scripting/OOP": ["Java", "Python", "Bash", "Matlab"],
            "Database": ["MySQL", "PostgreSQL", "DB2", "Mongodb"],
        };

        scp.to_link = {
            java: "https://www.java.com/en/",
            python: "https://www.python.org/",
            bash: "https://www.gnu.org/software/bash/",
            matlab: "https://www.mathworks.com/",
            mysql: "https://www.mysql.com/",
            postgresql: "https://www.postgresql.org/",
            db2: "https://www.ibm.com/analytics/us/en/technology/db2/",
            mongodb: "https://www.mongodb.com/",
            nodejs: "https://nodejs.org/en/",
            expressjs: "https://expressjs.com/",
            django: "https://www.djangoproject.com/",
            vuejs: "https://vuejs.org/",
            ajax: "https://en.wikipedia.org/wiki/Ajax_(programming)",
            restful: "https://en.wikipedia.org/wiki/Representational_state_transfer",
            "html/css/js": "https://en.wikipedia.org/wiki/Front-end_web_development",
            bootstrap: "http://getbootstrap.com/",
            foundation: "http://foundation.zurb.com/",
            jquery: "https://jquery.com/",
            terminal: "https://en.wikipedia.org/wiki/Linux",
            html: "https://en.wikipedia.org/wiki/HTML",
            css: "https://en.wikipedia.org/wiki/Cascading_Style_Sheets",
            js: "https://en.wikipedia.org/wiki/JavaScript",
            dojo: "https://dojotoolkit.org",
            junit: "http://junit.org/junit4/",
            rest: "https://en.wikipedia.org/wiki/Representational_state_transfer",
            rtc: "http://www-03.ibm.com/software/products/en/rtc",
            selenium: "http://www.seleniumhq.org",
            angularui: "https://angular-ui.github.io",
            angularjs: "https://angularjs.org",
            django: "https://www.djangoproject.com/",
            mdl: "https://getmdl.io/",
            unity: "https://unity3d.com/",
            "c#": "https://docs.microsoft.com/en-us/dotnet/csharp/",
            azure: "https://azure.microsoft.com/en-ca/services/machine-learning/",
            djangorestframework: "http://www.django-rest-framework.org",
            "git": "https://git-scm.com/",
            "subversion": "https://subversion.apache.org/",
            "c": "https://en.wikipedia.org/wiki/C_(programming_language)",
            "github": "https://github.com/",
            "bluemix": "https://www.ibm.com/cloud-computing/bluemix",
        };

        scp.other_skills = [
            "Algorithms",
            "Data Structures",
            "Design Patterns",
            "UML Diagrams",
            "Regex",
            "IBM Watson APIs",
        ];

        scp.education = [
            {
                unique: "uoft_bach",
                name: "University of Toronto",
                logo: "./imgs/education/UofTlogo.png",
                title: "Honours Bachelor of Science",
                interval: [new Date(2014, 8), new Date()],
                Specialist: "Computer Science (Specialist) and Statistics (Major)",
                CGPA: "3.64/4.0",
                courses_taken: {
                    CSC336: "Numerical Methods",
                    CSC369: "Operating Systems",
                    CSC324: "Principles of Programming Languages",
                    CSC373: "Algorithm Design & Analysis",
                    CSC384: "Introduction to Artificial Intelligence",
                    CSC343: "Introduction to Databases",
                    CSC318: "The Design of Interactive Computational Media",
                    CSC300: "Computers and Society",
                    CSC263: "Design & Analysis of Data Structures",
                    CSC258: "Computer Organization",
                    CSC209: "Software Tools & Systems Programming",
                    CSC207: "Software Design",
                    CSC236: "Introduction to the Theory of Computation",
                    CSC165: "Mathematical Expression & Reasoning",
                    CSC148: "Introduction to Computer Science",
                    CSC108: "Introduction to Computer Programming",
                },
            }
        ];


        scp.code_to_link = {};
        for (code in scp.education[0].courses_taken) {
            scp.code_to_link[code] = "http://calendar.artsci.utoronto.ca/crs_csc.htm#" + code +"H1"
        }

        scp.projects = [
            {
                details: "Currently developing a Java Spring Content Management System application",
                tags: ["Java", "Spring", "React", "Webpack", "MySQL" ],
                info_tags: [],
            },
            {
                details: "Created a simple 2D Unity Block Break game for me to practice using Unity engine",
                tags: ["C#", "Unity"],
                info_tags: [],
            },
            {
                details: "Developed and maintained the Ultimate Scheduling Application using Node.js, IBM Cloudant, Bluemix, MDL and Vue.js as a team. \
                Achieved 1st place during IBM CASCON 2016 Community Hackathon.",
                tags: ["Nodejs", "Bluemix", "IBM Cloudant", "VueJS", "MDL"],
                info_tags: [],
            },
            
            {
                details: "Implemented a simple Python plugin for Sublime Text Editor for syncing the files in folders",
                tags: ["Sublime", "python", "plugin"],
                info_tags: []
            },

            {
                details: "Created Django web application, 'Am I Joking?' which detects whether user makes \
                makes a TWSS joke using Microsoft Azure Machine Learning Studio and Bing Speech to Text APIs for Microsoft Hackathon 2016",
                tags: ["Python", "Django", "Azure"],
                info_tags: [],
            },
            {
                details: "Created a University of Toronto Java Undergraduate/graduate GPA Calculator using Swing GUI and Stack ADT",
                tags: ["Java", "Swing", "Eclipse"],
                info_tags: {},
            }


        ]

    });
