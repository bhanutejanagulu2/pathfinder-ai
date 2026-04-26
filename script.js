/* GLOBAL STATE (Shared Data) */

// Store last analysis result globally
let currentMissingSkills = [];
let currentRole = "";

/**************************************
 * DATA CONFIGURATION
 **************************************/

// Required skills per role
const ROLE_SKILLS = {
    "Data Analyst": ["sql", "python", "excel", "power bi", "statistics", "data cleaning", "communication"],
    "Web Developer": ["html", "css", "javascript", "react", "node.js", "api", "git"],
    "DevOps Engineer": ["linux", "docker", "kubernetes", "aws", "ci/cd", "shell scripting"],
    "Java Developer": ["java", "spring boot", "sql", "api", "hibernate", "git"],
    "Python Developer": ["python", "django", "api", "sql", "git", "debugging"],
    "ServiceNow Developer": ["servicenow", "javascript", "itil", "workflows", "integration"],
    "Banking/Non-IT": ["communication", "excel","finance", "customer handling"]
};

// Learning resources
const LEARNING_LINKS = {
    "sql": "https://www.youtube.com/results?search_query=sql+full+course",
    "python": "https://www.youtube.com/results?search_query=python+full+course",
    "excel": "https://www.youtube.com/results?search_query=excel+full+course",
    "power bi": "https://www.youtube.com/results?search_query=power+bi+course",
    "statistics": "https://www.youtube.com/results?search_query=statistics+for+data+analysis",
    "html": "https://www.w3schools.com/html/",
    "css": "https://www.w3schools.com/css/",
    "javascript": "https://www.w3schools.com/js/",
    "react": "https://www.youtube.com/results?search_query=react+course",
    "node.js": "https://www.youtube.com/results?search_query=nodejs+course",
    "docker": "https://www.youtube.com/results?search_query=docker+tutorial",
    "kubernetes": "https://www.youtube.com/results?search_query=kubernetes+tutorial",
    "aws": "https://www.youtube.com/results?search_query=aws+course",
    "java": "https://www.youtube.com/results?search_query=java+course",
    "spring boot": "https://www.youtube.com/results?search_query=spring+boot+course",
    "servicenow": "https://www.youtube.com/results?search_query=servicenow+tutorial",
    "git": "https://www.youtube.com/results?search_query=git+github+tutorial"
};

// Free certification links
const CERTIFICATION_LINKS = {
    "sql": "https://www.freecodecamp.org/learn/",
    "python": "https://www.freecodecamp.org/learn/",
    "html": "https://www.freecodecamp.org/learn/",
    "css": "https://www.freecodecamp.org/learn/",
    "javascript": "https://www.freecodecamp.org/learn/",
    "excel": "https://www.greatlearning.in/academy",
    "power bi": "https://learn.microsoft.com/en-us/training/",
    "java": "https://www.udemy.com/topic/java/free/",
    "aws": "https://aws.amazon.com/training/digital/",
    "docker": "https://www.udemy.com/topic/docker/free/",
    "servicenow": "https://developer.servicenow.com/dev.do",
    "git": "https://www.freecodecamp.org/learn/"
};

/* MAIN FUNCTION (ENTRY POINT)*/
function analyze() {

    const input = document.getElementById("skills").value;
    const role = document.getElementById("role").value;

    // Validation
    if (!input.trim()) {
        updateOutput("Please enter at least one skill.");
        return;
    }

    const userSkills = formatSkills(input);

    // Save globally
    currentRole = role;

    // Get missing skills
    const missingSkills = getMissingSkills(userSkills, role);

    // Save globally for reuse
    currentMissingSkills = missingSkills;

    // Generate UI
    const resultHTML = buildResultHTML(role, missingSkills, userSkills);

    updateOutput(resultHTML);

    document.getElementById("resourceSection").style.display = "block";
}

/* HELPER FUNCTIONS*/

// Convert input string → array
function formatSkills(input) {
    return input
        .toLowerCase()
        .split(",")
        .map(skill => skill.trim());
}

// Find missing skills
function getMissingSkills(userSkills, role) {
    const required = ROLE_SKILLS[role];
    return required.filter(skill => !userSkills.includes(skill));
}

// Update UI safely
function updateOutput(html) {
    document.getElementById("output").innerHTML = html;
}

/* UI BUILDING FUNCTIONS*/

function buildResultHTML(role, missingSkills, userSkills) {

    let html = `<h3 style="color:#667eea;">${role}</h3>`;

    // Case 1: All skills present
    if (missingSkills.length === 0) {
        html += `
            <b style="color:green;">You already have required skills!</b><br><br>
            Apply on:
            <br>- LinkedIn
            <br>- Naukri
            <br>- Indeed
            <br><br>Keep growing 🚀
        `;
        return html;
    }

    // Case 2: Missing skills
    const required = ROLE_SKILLS[role];

    html += `<b>Required Skills:</b> ${required.join(", ")}<br><br>`;

    html += buildLearningSection(missingSkills);

    html += `
        <br><b>Estimated Time:</b> ${missingSkills.length} month(s)
        <br><b>Path:</b> Beginner → Intermediate → Advanced
    `;

    html += `<br><br>Stay consistent and you'll get there 🚀`;

    return html;
}

// Learning links section
function buildLearningSection(missingSkills) {
    let html = `<b>Learning Resources:</b><br>`;

    missingSkills.forEach(skill => {
        const link = LEARNING_LINKS[skill];

        if (link) {
            html += `- <a href="${link}" target="_blank">${skill}</a><br>`;
        } else {
            html += `- ${skill}<br>`;
        }
    });

    return html;
}

/* RESOURCE TOGGLE (BUTTON CLICK) */
function toggleResources() {

    const container = document.getElementById("resourcesContent");

    if (container.style.display === "none") {

        container.style.display = "block";

        let html = `<b>Learning + Certifications:</b><br><br>`;

        currentMissingSkills.forEach(skill => {

            html += `<b>${skill}</b><br>`;

            if (LEARNING_LINKS[skill]) {
                html += `• Learn: <a href="${LEARNING_LINKS[skill]}" target="_blank">Click</a><br>`;
            }

            if (CERTIFICATION_LINKS[skill]) {
                html += `• Certificate: <a href="${CERTIFICATION_LINKS[skill]}" target="_blank">Click</a><br>`;
            }

            html += `<br>`;
        });

        container.innerHTML = html;

    } else {
        container.style.display = "none";
    }
}

/* FEEDBACK TOGGLE */
function toggleFeedback() {
    const form = document.getElementById("feedbackForm");
    form.style.display = (form.style.display === "none") ? "block" : "none";
}
