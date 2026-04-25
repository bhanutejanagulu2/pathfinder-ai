function analyze() {

    let input = document.getElementById("skills").value;

    // ✅ Validation
    if (!input) {
        document.getElementById("output").innerHTML = "Please enter at least one skill.";
        return;
    }

    let userSkills = input
        .toLowerCase()
        .split(",")
        .map(skill => skill.trim());

    let role = document.getElementById("role").value;

    // 🎯 Role-wise required skills
    let roleSkills = {

    "Data Analyst": ["sql", "python", "excel", "power bi", "statistics", "data cleaning", "communication"],
    "Web Developer": ["html", "css", "javascript", "react", "node.js", "api", "git"],
    "DevOps Engineer": ["linux", "docker", "kubernetes", "aws", "ci/cd", "shell scripting"],
    "Java Developer": ["java", "spring boot", "sql", "api", "hibernate", "git"],
    "Python Developer": ["python", "django", "api", "sql", "git", "debugging"],
    "ServiceNow Developer": ["servicenow", "javascript", "itil", "workflows", "integration"],
    "Banking/Non-IT": ["communication", "excel","finance", "customer handling"]
};

    // 🔗 Learning resources
    let learningLinks = {

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
    // 💡 Skill → Role suggestion mapping
    let skillToRoleMap = {
        "java": "Java Developer",
        "python": "Python Developer",
        "html": "Web Developer",
        "css": "Web Developer",
        "javascript": "Web Developer",
        "sql": "Data Analyst",
        "docker": "DevOps Engineer",
        "kubernetes": "DevOps Engineer",
        "servicenow": "ServiceNow Developer"
    };

    let required = roleSkills[role];
    let missing = [];

    // 🔍 Skill gap analysis
    required.forEach(skill => {
        if (!userSkills.includes(skill)) {
            missing.push(skill);
        }
    });

   let output = `<h3 style="color:#667eea;">${role}</h3>`;

    // ✅ Case 1: All skills present
    if (missing.length === 0) {
        output += `
            <b style="color:green;">You already have required skills!</b><br><br>
            You can apply on:<br>
            - LinkedIn<br>
            - Naukri<br>
            - Indeed<br><br>
            Keep practicing and improving 🚀
        `;
    }

    // ❌ Case 2: Missing skills
    else {

       output += `<br><b>Industry Required Skills:</b> ${required.join(", ")}<br>`;

        // 📚 Learning resources
        output += `<b>Learning Resources:</b><br>`;
        missing.forEach(skill => {
            if (learningLinks[skill]) {
                output += `- <a href="${learningLinks[skill]}" target="_blank">${skill}</a><br>`;
            } else {
                output += `- ${skill} (search online)<br>`;
            }
        });

        // ⏱️ Dynamic time calculation
        let totalTime = missing.length;

        output += `
            <br><b>Learning Path:</b> Beginner -> Intermediate -> Advanced<br>
            <b>Estimated Time:</b> ${totalTime} month(s)<br>
        `;

        // 🎯 Alternative role suggestions
        let suggestedRoles = [];

        userSkills.forEach(skill => {
            if (skillToRoleMap[skill] && skillToRoleMap[skill] !== role) {
                suggestedRoles.push(skillToRoleMap[skill]);
            }
        });

        suggestedRoles = [...new Set(suggestedRoles)];

        if (suggestedRoles.length > 0) {
            output += `<br><b>Suggestion:</b><br>`;
            output += `Based on your current skills, you can also explore roles like: ${suggestedRoles.join(", ")}<br>`;
        }
    }

    // 🚀 Final motivational line
    output += `<br>Stay consistent and keep learning to achieve your dream job! `;

    document.getElementById("output").innerHTML = output;
}

function toggleFeedback() {
    let form = document.getElementById("feedbackForm");

    if (form.style.display === "none") {
        form.style.display = "block";
    } else {
        form.style.display = "none";
    }
}

let certificationLinks = {

    "sql": "https://www.freecodecamp.org/learn/",
    "python": "https://www.freecodecamp.org/learn/",
    "html": "https://www.freecodecamp.org/learn/",
    "css": "https://www.freecodecamp.org/learn/",
    "javascript": "https://www.freecodecamp.org/learn/",    
    "excel": "https://www.greatlearning.in/academy",
    "power bi": "https://learn.microsoft.com/en-us/training/",    
    "java": "https://www.udemy.com/topic/java/free/",
    "spring boot": "https://www.youtube.com/results?search_query=spring+boot+course",    
    "aws": "https://aws.amazon.com/training/digital/",
    "docker": "https://www.udemy.com/topic/docker/free/",    
    "servicenow": "https://developer.servicenow.com/dev.do",    
    "git": "https://www.freecodecamp.org/learn/"
};
