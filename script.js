      




//Function to submit user input from the home template
function submitUserGoal() {
    const userGoal = document.getElementById("userGoal").value;
    sessionStorage.setItem("userGoal", userGoal);
  };

//
function submitSearch() {
    const userSubject = document.getElementById("userSubject").value;
    const userType = document.getElementById("userType").value;
    sessionStorage.setItem("userSubject", userSubject);
    sessionStorage.setItem("userType", userType);
    // Navigate to the contact route after submitting the user input
    window.location.hash = "#search";
};

//shows sidebar at full width
function displaySidebar() {
    document.querySelector('.sidebar').classList.add('show');
};
  

//Fetch the template text and check for errors
function loadTemplate(templateUrl) {
    return fetch(templateUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Template not found');
            };
            return response.text();
        });
};

//Render the templates into app element
function renderTemplate(templateContent) {
    const appContainer = document.getElementById('app');
    const hash = window.location.hash;
    appContainer.classList.add("transition-enter");
    setTimeout(() => {
        appContainer.innerHTML = templateContent;
        appContainer.classList.add("transition-enter-active");
        
        //Template specific logic
        switch (hash) {
            case "#phase2":
                const submitBtn = document.getElementById("toPhase3");
                submitBtn.addEventListener("click", submitUserGoal);
                break;
           
            case "#phase3":
                const printGoal = document.getElementById("printGoal");
                const savedUserGoal = sessionStorage.getItem("userGoal");
                const submitSearchBtn = document.getElementById("submitSearchbtn");
                submitSearchBtn.addEventListener("click", submitSearch);
                if (savedUserGoal) {
                    printGoal.textContent = `${savedUserGoal}`;
                }
                break;
            
            case "#search": 
                const conceptMapSubjects = [ "All", "English", "Liberal Arts", "Humanities",  "Science"];
                const conceptMapTypes = ["All", "Test Prep", "Review", "Reading", "Homework Problems", "Lecture"];
                const cornellNotesSubjects = ["All", "English", "Humanities", "Math", "Science", "Social Studies"];
                const cornellNotesTypes = ["All", "Reading", "Test Prep", "Review", "Lecture", "Homework Problems"];
                const tChartsSubjects = ["All", "Math", "Science"];
                const tChartsTypes = ["All", "Homework Problems", "Lecture", "Test Prep", "Review"];
                const annotationSubjects = ["All", "English", "Humanities", "Science", "Social Studies"];
                const annotationTypes = ["All", "Reading", "Test Prep", "Review", "Homework Problems"];
                const homeworkAsTestSubjects = ["All", "Math", "Science", "Social Studies"];
                const homeworkAsTestTypes = ["All", "Test Prep", "Review", "Homework Problems"];
                const subject = sessionStorage.getItem("userSubject");
                const type = sessionStorage.getItem("userType");
                if (conceptMapSubjects.includes(subject) && conceptMapTypes.includes(type)) {
                    document.getElementById("cMap").classList.add("show");
                    handleButtonClick('showsidebarbutton', 'strategies/conceptmaps.html');
                    document.getElementById("showsidebarbutton").addEventListener('click', displaySidebar);
                    
                };
                if (cornellNotesSubjects.includes(subject) && cornellNotesTypes.includes(type)) {
                    document.getElementById("cNote").classList.add("show");
                }
                if (tChartsSubjects.includes(subject) && tChartsTypes.includes(type)) {
                    document.getElementById("tChart").classList.add("show");
                }
                if (annotationSubjects.includes(subject) && annotationTypes.includes(type)) {
                    document.getElementById("ann").classList.add("show");
                }
                if (homeworkAsTestSubjects.includes(subject) && homeworkAsTestTypes.includes(type)) {
                    document.getElementById("hwt").classList.add("show");
                }
        };
        
        setTimeout(() => {
            appContainer.classList.remove("transition-enter", "transition-enter-active");
        }, 400);
   }, 300);   
}

function handleHashChange() {
    const hash = window.location.hash;
    const templateId = hash.slice(1) + '.html';
    const templateUrl = `templates/${templateId}`;

    loadTemplate(templateUrl)
        .then(renderTemplate)
        .catch(error => {
            // Redirect to the home template on error
            window.location.hash = 'home';
        });
}

// Attach hash change event listener
window.addEventListener('hashchange', handleHashChange);

// Initial load based on current hash or set to home-template.html
window.addEventListener('load', () => {
    if (!window.location.hash) {
        window.location.hash = 'home';
    } else {
        handleHashChange();
    }
});


//**********Sidebar logic

//fetch Strategy templates
//uses same load template function above
function renderStrategy(templateContent) {
    const theSidebar = document.getElementById('stratContainer');
    theSidebar.innerHTML = templateContent;
}
function handleButtonClick(buttonId, templateUrl) {
    const button = document.getElementById(buttonId);
    button.addEventListener('click', async () => {
        const templateContent = await loadTemplate(templateUrl);
        renderStrategy(templateContent);
    });
}








