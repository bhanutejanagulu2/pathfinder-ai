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
        "Data Analyst": ["sql", "python", "excel", "power bi"],
        "Web Developer": ["html", "css", "javascript"],
        "DevOps Engineer": ["linux", "docker", "kubernetes"],
        "Java Developer": ["java", "spring", "sql"],
        "Python Developer": ["python", "django", "api"],
        "ServiceNow Developer": ["servicenow", "javascript", "itil"],
        "Banking/Non-IT": ["communication", "excel", "finance"]
    };

    // 🔗 Learning resources
    let learningLinks = {
        "html": "https://www.w3schools.com/html/",
        "css": "https://www.w3schools.com/css/",
        "javascript": "https://www.w3schools.com/js/",
        "python": "https://www.youtube.com/results?search_query=python+course",
        "java": "https://www.youtube.com/results?search_query=java+course",
        "sql": "https://www.youtube.com/results?search_query=sql+course",
        "docker": "https://www.youtube.com/results?search_query=docker+tutorial",
        "kubernetes": "https://www.youtube.com/results?search_query=kubernetes+tutorial",
        "power bi": "https://www.youtube.com/results?search_query=power+bi+course",
        "spring": "https://www.youtube.com/results?search_query=spring+boot+tutorial",
        "django": "https://www.youtube.com/results?search_query=django+tutorial",
        "servicenow": "https://www.youtube.com/results?search_query=servicenow+tutorial"
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

    let output = `<b>Target Role:</b> ${role}<br>`;

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

        output += `<b>Missing Skills:</b> ${missing.join(", ")}<br><br>`;

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
