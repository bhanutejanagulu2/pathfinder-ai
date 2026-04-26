/* =============================================================
   Pathfinder AI – script.js
   Fixed: scope bugs, missing cert links, resource section empty
   Added: score ring, roadmaps, alt roles with %, XP level
   ============================================================= */

/* ─────────────────── DATA ─────────────────── */

const roleSkills = {
  "Data Analyst":          ["sql", "python", "excel", "power bi", "statistics", "data cleaning", "communication"],
  "Web Developer":         ["html", "css", "javascript", "react", "node.js", "api", "git"],
  "DevOps Engineer":       ["linux", "docker", "kubernetes", "aws", "ci/cd", "shell scripting", "git"],
  "Java Developer":        ["java", "spring boot", "sql", "api", "hibernate", "git"],
  "Python Developer":      ["python", "django", "api", "sql", "git", "debugging"],
  "ServiceNow Developer":  ["servicenow", "javascript", "itil", "workflows", "integration"],
  "Cloud Engineer":        ["aws", "azure", "linux", "docker", "networking", "iam", "terraform"],
  "Data Engineer":         ["python", "sql", "spark", "airflow", "kafka", "aws", "data modeling"],
  "QA / Test Engineer":    ["manual testing", "selenium", "api testing", "sql", "git", "jira", "agile"],
  "Banking / Non-IT to IT":["communication", "excel", "finance", "customer handling", "basic computer"]
};

const learningLinks = {
  "sql":             "https://www.youtube.com/results?search_query=sql+full+course",
  "python":          "https://www.youtube.com/results?search_query=python+full+course",
  "excel":           "https://www.youtube.com/results?search_query=excel+full+course",
  "power bi":        "https://learn.microsoft.com/en-us/training/powerplatform/power-bi",
  "statistics":      "https://www.youtube.com/results?search_query=statistics+for+data+analysis",
  "data cleaning":   "https://www.youtube.com/results?search_query=data+cleaning+pandas+python",
  "html":            "https://www.w3schools.com/html/",
  "css":             "https://www.w3schools.com/css/",
  "javascript":      "https://www.w3schools.com/js/",
  "react":           "https://www.youtube.com/results?search_query=react+full+course",
  "node.js":         "https://www.youtube.com/results?search_query=nodejs+course",
  "api":             "https://www.youtube.com/results?search_query=rest+api+tutorial",
  "git":             "https://www.youtube.com/results?search_query=git+github+tutorial",
  "linux":           "https://www.youtube.com/results?search_query=linux+for+beginners",
  "docker":          "https://www.youtube.com/results?search_query=docker+tutorial",
  "kubernetes":      "https://www.youtube.com/results?search_query=kubernetes+tutorial",
  "aws":             "https://aws.amazon.com/training/digital/",
  "azure":           "https://learn.microsoft.com/en-us/training/azure/",
  "ci/cd":           "https://www.youtube.com/results?search_query=ci+cd+pipeline+tutorial",
  "shell scripting": "https://www.youtube.com/results?search_query=bash+shell+scripting+tutorial",
  "java":            "https://www.youtube.com/results?search_query=java+course+beginners",
  "spring boot":     "https://www.youtube.com/results?search_query=spring+boot+course",
  "hibernate":       "https://www.youtube.com/results?search_query=hibernate+java+tutorial",
  "python":          "https://www.youtube.com/results?search_query=python+full+course",
  "django":          "https://www.youtube.com/results?search_query=django+full+course",
  "debugging":       "https://www.youtube.com/results?search_query=debugging+techniques+python",
  "servicenow":      "https://developer.servicenow.com/dev.do",
  "itil":            "https://www.youtube.com/results?search_query=itil+foundation+course",
  "workflows":       "https://www.youtube.com/results?search_query=servicenow+workflows+tutorial",
  "integration":     "https://www.youtube.com/results?search_query=api+integration+tutorial",
  "networking":      "https://www.youtube.com/results?search_query=networking+basics+course",
  "iam":             "https://www.youtube.com/results?search_query=aws+iam+tutorial",
  "terraform":       "https://developer.hashicorp.com/terraform/tutorials",
  "spark":           "https://www.youtube.com/results?search_query=apache+spark+tutorial",
  "airflow":         "https://www.youtube.com/results?search_query=apache+airflow+tutorial",
  "kafka":           "https://www.youtube.com/results?search_query=apache+kafka+tutorial",
  "data modeling":   "https://www.youtube.com/results?search_query=data+modeling+tutorial",
  "manual testing":  "https://www.youtube.com/results?search_query=manual+testing+tutorial",
  "selenium":        "https://www.youtube.com/results?search_query=selenium+webdriver+tutorial",
  "api testing":     "https://www.youtube.com/results?search_query=api+testing+postman",
  "jira":            "https://www.youtube.com/results?search_query=jira+tutorial+beginners",
  "agile":           "https://www.youtube.com/results?search_query=agile+scrum+tutorial",
  "communication":   "https://www.youtube.com/results?search_query=communication+skills+course",
  "finance":         "https://www.youtube.com/results?search_query=finance+basics+course",
  "customer handling":"https://www.youtube.com/results?search_query=customer+service+skills",
  "basic computer":  "https://www.youtube.com/results?search_query=computer+basics+course"
};

/* BUG FIX: certLinks was defined but used outside function scope before.
   Now co-located in the same module scope as learningLinks. */
const certLinks = {
  "sql":            "https://www.freecodecamp.org/learn/relational-database/",
  "python":         "https://www.freecodecamp.org/learn/scientific-computing-with-python/",
  "html":           "https://www.freecodecamp.org/learn/2022/responsive-web-design/",
  "css":            "https://www.freecodecamp.org/learn/2022/responsive-web-design/",
  "javascript":     "https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/",
  "react":          "https://www.freecodecamp.org/learn/front-end-development-libraries/",
  "excel":          "https://www.greatlearning.in/academy/learn-for-free/courses/advanced-excel",
  "power bi":       "https://learn.microsoft.com/en-us/certifications/power-bi-data-analyst-associate/",
  "java":           "https://www.udemy.com/topic/java/free/",
  "spring boot":    "https://www.youtube.com/results?search_query=spring+boot+course",
  "aws":            "https://aws.amazon.com/certification/certified-cloud-practitioner/",
  "azure":          "https://learn.microsoft.com/en-us/certifications/azure-fundamentals/",
  "docker":         "https://www.udemy.com/topic/docker/free/",
  "kubernetes":     "https://www.cncf.io/certification/ckad/",
  "servicenow":     "https://developer.servicenow.com/dev.do",
  "terraform":      "https://developer.hashicorp.com/certifications/infrastructure-automation",
  "git":            "https://www.freecodecamp.org/learn/",
  "linux":          "https://www.lpi.org/our-certifications/lpic-1-overview",
  "manual testing": "https://www.istqb.org/certifications/certified-tester-foundation-level",
  "selenium":       "https://www.istqb.org/certifications/test-automation-engineer",
  "agile":          "https://www.scrum.org/assessments/professional-scrum-master-i-assessment",
  "itil":           "https://www.axelos.com/certifications/itil-service-management/itil-4-foundation",
  "data modeling":  "https://www.coursera.org/learn/database-design"
};

/* Skill → suggested role mapping */
const skillToRole = {
  "java":           "Java Developer",
  "python":         "Python Developer",
  "django":         "Python Developer",
  "html":           "Web Developer",
  "css":            "Web Developer",
  "javascript":     "Web Developer",
  "react":          "Web Developer",
  "sql":            "Data Analyst",
  "power bi":       "Data Analyst",
  "statistics":     "Data Analyst",
  "docker":         "DevOps Engineer",
  "kubernetes":     "DevOps Engineer",
  "linux":          "DevOps Engineer",
  "servicenow":     "ServiceNow Developer",
  "aws":            "Cloud Engineer",
  "azure":          "Cloud Engineer",
  "terraform":      "Cloud Engineer",
  "spark":          "Data Engineer",
  "kafka":          "Data Engineer",
  "selenium":       "QA / Test Engineer",
  "manual testing": "QA / Test Engineer"
};

/* Phase-by-phase roadmaps for each role */
const roleRoadmaps = {
  "Data Analyst": [
    { phase: "Foundation",    time: "Month 1–2", color: "#6c63ff",
      skills: "Learn Excel basics, SQL fundamentals, and basic statistics",
      tip: "Start with free resources on W3Schools and Khan Academy" },
    { phase: "Core Tools",    time: "Month 3–4", color: "#00d4aa",
      skills: "Python for data analysis (pandas, numpy), Power BI dashboards",
      tip: "Build 2–3 mini projects analysing public datasets from Kaggle" },
    { phase: "Advanced",      time: "Month 5–6", color: "#f5a623",
      skills: "Data cleaning pipelines, storytelling with data, advanced SQL",
      tip: "Replicate real business dashboards for your portfolio" },
    { phase: "Job Ready",     time: "Month 7",   color: "#ff5e7e",
      skills: "Build a GitHub portfolio, apply on Naukri, LinkedIn, Indeed",
      tip: "Target analyst roles at startups — easier entry for freshers" }
  ],
  "Web Developer": [
    { phase: "Frontend Basics", time: "Month 1–2", color: "#6c63ff",
      skills: "HTML, CSS, JavaScript fundamentals",
      tip: "Build a personal portfolio website from scratch" },
    { phase: "React & Tooling", time: "Month 3–4", color: "#00d4aa",
      skills: "React.js, Git version control, basic API integration",
      tip: "Clone real apps like a weather app or Netflix UI" },
    { phase: "Backend & DB",    time: "Month 5–6", color: "#f5a623",
      skills: "Node.js, REST APIs, basic SQL",
      tip: "Build a full-stack CRUD project end-to-end" },
    { phase: "Job Ready",       time: "Month 7",   color: "#ff5e7e",
      skills: "Deploy projects on Vercel/Netlify, optimise GitHub profile",
      tip: "Contribute to open source — even documentation counts!" }
  ],
  "DevOps Engineer": [
    { phase: "Foundation",    time: "Month 1–2", color: "#6c63ff",
      skills: "Linux basics, Bash scripting, Git version control",
      tip: "Install Ubuntu on WSL and practise daily commands" },
    { phase: "Containers",    time: "Month 3–4", color: "#00d4aa",
      skills: "Docker, Docker Compose, basic Kubernetes",
      tip: "Containerise a simple web app end-to-end" },
    { phase: "Cloud & CI/CD", time: "Month 5–7", color: "#f5a623",
      skills: "AWS fundamentals, GitHub Actions, Jenkins pipeline",
      tip: "Get AWS Cloud Practitioner — it's entry-level friendly" },
    { phase: "Job Ready",     time: "Month 8",   color: "#ff5e7e",
      skills: "Terraform for IaC, monitoring basics (Grafana, Prometheus)",
      tip: "DevOps roles value hands-on experience more than degrees" }
  ],
  "Java Developer": [
    { phase: "Core Java",      time: "Month 1–2", color: "#6c63ff",
      skills: "OOP, collections, exception handling, Java 8+ features",
      tip: "Solve 30 LeetCode problems in Java to sharpen logic" },
    { phase: "Spring Boot",    time: "Month 3–4", color: "#00d4aa",
      skills: "Spring Boot, REST APIs, JPA/Hibernate, MySQL",
      tip: "Build a REST API for a simple e-commerce app" },
    { phase: "Advanced",       time: "Month 5–6", color: "#f5a623",
      skills: "Microservices, Git, unit testing (JUnit), basic Docker",
      tip: "Read 'Effective Java' by Joshua Bloch — industry standard" },
    { phase: "Job Ready",      time: "Month 7",   color: "#ff5e7e",
      skills: "System design basics, DSA practice, mock interviews",
      tip: "Java roles are abundant — apply to product and service companies both" }
  ],
  "Python Developer": [
    { phase: "Python Basics",  time: "Month 1–2", color: "#6c63ff",
      skills: "Python syntax, OOP, file handling, libraries (requests, json)",
      tip: "Automate one boring task in your daily life using Python" },
    { phase: "Web with Django",time: "Month 3–4", color: "#00d4aa",
      skills: "Django framework, REST APIs with DRF, SQL basics",
      tip: "Build a blog or task manager as your first Django project" },
    { phase: "Advanced",       time: "Month 5–6", color: "#f5a623",
      skills: "API testing, debugging, Git, basic cloud deployment",
      tip: "Deploy your app on Heroku or Railway for free" },
    { phase: "Job Ready",      time: "Month 7",   color: "#ff5e7e",
      skills: "Portfolio with 2–3 projects, contribute to GitHub",
      tip: "Python skills are also valued for data and automation roles" }
  ],
  "Cloud Engineer": [
    { phase: "Cloud Basics",   time: "Month 1–2", color: "#6c63ff",
      skills: "Cloud concepts (IaaS/PaaS/SaaS), AWS or Azure fundamentals",
      tip: "Start with AWS Free Tier — hands-on is everything in cloud" },
    { phase: "Core Services",  time: "Month 3–4", color: "#00d4aa",
      skills: "EC2, S3, VPC, IAM, networking basics",
      tip: "Follow AWS Solutions Architect learning path" },
    { phase: "IaC & DevOps",   time: "Month 5–6", color: "#f5a623",
      skills: "Terraform, Docker, Linux, basic CI/CD pipelines",
      tip: "Automate infrastructure deployment with Terraform scripts" },
    { phase: "Certify & Apply",time: "Month 7",   color: "#ff5e7e",
      skills: "AWS Cloud Practitioner → Solutions Architect Associate",
      tip: "Cloud certs significantly boost fresher hiring chances" }
  ],
  "Data Engineer": [
    { phase: "Programming",    time: "Month 1–2", color: "#6c63ff",
      skills: "Python fundamentals, SQL (advanced), data structures",
      tip: "Practice complex SQL queries daily on LeetCode or HackerRank" },
    { phase: "Big Data Tools", time: "Month 3–4", color: "#00d4aa",
      skills: "Apache Spark, Airflow, Kafka basics",
      tip: "Set up a local Spark environment using Docker" },
    { phase: "Cloud & Storage",time: "Month 5–6", color: "#f5a623",
      skills: "AWS S3/Glue/Redshift, data modeling, data warehousing",
      tip: "Build an ETL pipeline project end-to-end for your portfolio" },
    { phase: "Job Ready",      time: "Month 7",   color: "#ff5e7e",
      skills: "Data pipeline projects on GitHub, system design basics",
      tip: "Data Engineering demand is growing fast — high salary potential" }
  ],
  "QA / Test Engineer": [
    { phase: "Testing Basics", time: "Month 1–2", color: "#6c63ff",
      skills: "Manual testing concepts, test cases, bug lifecycle, SDLC",
      tip: "Practice writing test cases for apps you use daily" },
    { phase: "Tools",          time: "Month 3–4", color: "#00d4aa",
      skills: "Selenium WebDriver, Postman API testing, basic SQL",
      tip: "Automate a login flow with Selenium as your first project" },
    { phase: "Advanced",       time: "Month 5–6", color: "#f5a623",
      skills: "Jira bug tracking, Agile/Scrum, Git basics",
      tip: "Get ISTQB Foundation — widely recognised by Indian companies" },
    { phase: "Job Ready",      time: "Month 7",   color: "#ff5e7e",
      skills: "Test automation portfolio, apply to IT service companies",
      tip: "QA is a great entry point into IT — many career switchers start here" }
  ],
  "ServiceNow Developer": [
    { phase: "Platform Basics",time: "Month 1–2", color: "#6c63ff",
      skills: "ServiceNow instance navigation, ITSM modules, ITIL concepts",
      tip: "Get a free personal developer instance at developer.servicenow.com" },
    { phase: "Development",    time: "Month 3–4", color: "#00d4aa",
      skills: "JavaScript on ServiceNow, Business Rules, Client Scripts, Workflows",
      tip: "Complete the official ServiceNow Fundamentals course (free)" },
    { phase: "Integration",    time: "Month 5–6", color: "#f5a623",
      skills: "REST/SOAP integrations, Flow Designer, Scripted REST APIs",
      tip: "Build a custom app on your dev instance for your portfolio" },
    { phase: "Certify",        time: "Month 7",   color: "#ff5e7e",
      skills: "ServiceNow Certified System Administrator (CSA) exam",
      tip: "CSA certification is the standard requirement for most SNow jobs" }
  ],
  "Banking / Non-IT to IT": [
    { phase: "Digital Basics", time: "Month 1",   color: "#6c63ff",
      skills: "Computer fundamentals, MS Office, email & internet basics",
      tip: "Your banking domain knowledge is already an asset — own it!" },
    { phase: "Business Tools", time: "Month 2–3", color: "#00d4aa",
      skills: "Advanced Excel, basic SQL for reporting, Power BI",
      tip: "Many fintech roles need both finance AND data skills — you're positioned perfectly" },
    { phase: "Upskill",        time: "Month 4–5", color: "#f5a623",
      skills: "Choose a path: Data Analyst / Business Analyst / IT Support",
      tip: "Business Analyst roles are the most common Non-IT to IT bridge" },
    { phase: "Job Ready",      time: "Month 6",   color: "#ff5e7e",
      skills: "BFSI sector IT jobs, fintech startups, ERP consulting",
      tip: "Target BFSI IT companies — your banking background is preferred" }
  ]
};

const motivations = {
  "fresher":       "🎓 Every expert was once a beginner. Your journey starts today — one skill at a time. Companies hire freshers every quarter. Build projects, stay consistent, and your first offer is closer than you think!",
  "experienced":   "💼 Your experience is your superpower. Filling these skill gaps takes you from good to exceptional. Professionals who upskill are 3× more likely to get promoted or secure better offers.",
  "career-change": "🔄 Career switchers bring unique perspectives IT companies desperately need. Your domain knowledge + new tech skills = a rare combination. This journey is absolutely worth every effort!"
};

/* ─────────────────── XP PILL SELECTION ─────────────────── */

let selectedXP = "fresher";

document.querySelectorAll(".xp-pill").forEach(pill => {
  pill.addEventListener("click", () => {
    document.querySelectorAll(".xp-pill").forEach(p => p.classList.remove("active"));
    pill.classList.add("active");
    selectedXP = pill.dataset.xp;
  });
});

/* ─────────────────── MAIN ANALYZE FUNCTION ─────────────────── */
/* BUG FIX: All variables (missing, output, certLinks, learningLinks) are now
   inside this single function scope, so toggleResources and resource rendering
   can access them without any ReferenceError. */

function analyze() {
  const input = document.getElementById("skills").value.trim();
  if (!input) {
    alert("Please enter at least one skill.");
    return;
  }

  const userSkills = input.toLowerCase().split(",").map(s => s.trim()).filter(Boolean);
  const role       = document.getElementById("role").value;
  const required   = roleSkills[role] || [];

  const haveSkills = required.filter(s =>  userSkills.includes(s));
  const missSkills = required.filter(s => !userSkills.includes(s));

  const pct = Math.round((haveSkills.length / required.length) * 100);

  /* ── Score ring animation ── */
  const circumference = 238.76;
  const offset        = circumference - (pct / 100) * circumference;
  const ring          = document.getElementById("ringFill");
  const ringColor     = pct >= 70 ? "#00d4aa" : pct >= 40 ? "#f5a623" : "#ff5e7e";
  ring.style.stroke           = ringColor;
  ring.style.strokeDashoffset = circumference;          // reset first
  setTimeout(() => { ring.style.strokeDashoffset = offset; }, 50);

  const ringPct = document.getElementById("ringPct");
  ringPct.textContent = pct + "%";
  ringPct.style.color = ringColor;

  document.getElementById("roleTitle").textContent = role;
  document.getElementById("scoreDesc").textContent =
    pct === 100 ? "You're fully ready — start applying now!" :
    pct >= 70   ? "Almost there! A few more skills and you're set." :
    pct >= 40   ? "Good foundation. Focused learning will get you there." :
                  "Don't worry — every expert started here. Let's build your roadmap!";

  /* ── Skill chips ── */
  document.getElementById("haveChips").innerHTML =
    haveSkills.length
      ? haveSkills.map(s => `<span class="chip have">${s}</span>`).join("")
      : `<span style="color:var(--muted);font-size:13px;">None of the required skills yet</span>`;

  document.getElementById("missChips").innerHTML =
    missSkills.length
      ? missSkills.map(s => `<span class="chip miss">${s}</span>`).join("")
      : `<span style="color:var(--accent2);font-size:13px;">✅ All skills covered!</span>`;

  /* ── Roadmap ── */
  const steps = roleRoadmaps[role] || [];
  document.getElementById("roadmapList").innerHTML = steps.map((s, i) => `
    <div class="rm-step">
      <div class="rm-left">
        <div class="rm-dot" style="background:${s.color}22;color:${s.color};border:2px solid ${s.color};">${i + 1}</div>
        <div class="rm-line"></div>
      </div>
      <div class="rm-content">
        <span class="rm-badge" style="background:${s.color}20;color:${s.color};">${s.time}</span>
        <h4>${s.phase}</h4>
        <p>${s.skills}</p>
        <p style="margin-top:5px;">💡 <em>${s.tip}</em></p>
      </div>
    </div>
  `).join("");

  /* ── Resources & Certifications ──
     BUG FIX: Previously certLinks was referenced outside any function and
     missing was undefined in toggleResources(). Both are now used directly
     here, in the same scope as missSkills. */
  const resGrid = document.getElementById("resGrid");
  if (missSkills.length === 0) {
    resGrid.innerHTML = `
      <p style="color:var(--accent2);">
        ✅ You already have all required skills! Focus on building projects and applying.
      </p>`;
  } else {
    resGrid.innerHTML = missSkills.map(skill => {
      const learnUrl = learningLinks[skill] || null;
      const certUrl  = certLinks[skill]     || null;
      return `
        <div class="res-row">
          <span class="res-skill">${skill}</span>
          <div class="res-links">
            ${learnUrl ? `<a class="res-link learn" href="${learnUrl}" target="_blank">▶ Learn</a>`    : ""}
            ${certUrl  ? `<a class="res-link cert"  href="${certUrl}"  target="_blank">🏅 Certify</a>` : ""}
            ${!learnUrl && !certUrl
              ? `<span style="color:var(--muted);font-size:13px;">Search on YouTube / Udemy</span>`
              : ""}
          </div>
        </div>`;
    }).join("");
  }

  /* ── Alternative role suggestions ── */
  const sugRoles = [...new Set(
    userSkills
      .map(s => skillToRole[s])
      .filter(r => r && r !== role)
  )];

  const altCard = document.getElementById("altCard");
  if (sugRoles.length > 0) {
    altCard.style.display = "block";
    document.getElementById("altRoles").innerHTML = sugRoles.map(r => {
      const req      = roleSkills[r] || [];
      const match    = req.filter(s => userSkills.includes(s)).length;
      const pctAlt   = Math.round((match / req.length) * 100);
      return `
        <div class="alt-card">
          <h4>${r}</h4>
          <p>You already match <strong>${pctAlt}%</strong> of required skills
             — <strong>${match}</strong> out of ${req.length}.</p>
        </div>`;
    }).join("");
  } else {
    altCard.style.display = "none";
  }

  /* ── Motivational message ── */
  document.getElementById("motiveBox").innerHTML =
    motivations[selectedXP] || "Stay consistent and keep learning to achieve your dream job! 🚀";

  /* ── Show results panel ── */
  const resultsBox = document.getElementById("resultsBox");
  resultsBox.style.display = "block";
  resultsBox.scrollIntoView({ behavior: "smooth", block: "start" });
}

/* ─────────────────── FEEDBACK TOGGLE ─────────────────── */

function toggleFeedback() {
  const form = document.getElementById("feedbackForm");
  form.style.display = (form.style.display === "none" || form.style.display === "")
    ? "block"
    : "none";
}
