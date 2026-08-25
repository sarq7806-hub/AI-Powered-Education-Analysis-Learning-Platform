// Tab navigation
function openSection(sectionId) {
    document.querySelectorAll('.section').forEach(sec => {
        sec.style.display = 'none';
    });
    document.getElementById(sectionId).style.display = 'block';
}

// Initialize first section
document.querySelectorAll('.section')[0].style.display = 'block';

// Dark Mode toggle
const darkModeBtn = document.getElementById('darkModeBtn');
darkModeBtn.onclick = () => {
    document.body.classList.toggle('dark-mode');
    darkModeBtn.textContent = document.body.classList.contains('dark-mode') ? '☀️ Light Mode' : '🌙 Dark Mode';
};

// Profile management
function saveProfile() {
    const name = document.getElementById('profileName').value.trim();
    if (name !== '') {
        localStorage.setItem('studentName', name);
        alert('Profile saved!');
    }
}
window.onload = () => {
    const name = localStorage.getItem('studentName');
    if (name) {
        document.getElementById('profileName').value = name;
    }
    loadSubjects();
    loadGoals();
    loadTasks();
    loadRevisions();
    initProgressChart();
};

// Subject Management
let subjects = [];

function addSubject() {
    const subject = document.getElementById('subjectInput').value.trim();
    if (subject !== '' && !subjects.includes(subject)) {
        subjects.push(subject);
        localStorage.setItem('subjects', JSON.stringify(subjects));
        renderSubjects();
        document.getElementById('subjectInput').value = '';
        updateProfileSubjects();
    }
}

function loadSubjects() {
    const stored = localStorage.getItem('subjects');
    if (stored) {
        subjects = JSON.parse(stored);
    }
    renderSubjects();
    updateProfileSubjects();
}

function renderSubjects() {
    const list = document.getElementById('subjectList');
    list.innerHTML = '';
    subjects.forEach(sub => {
        const li = document.createElement('li');
        li.textContent = sub;
        const delBtn = document.createElement('button');
        delBtn.innerHTML = '🗑️';
        delBtn.onclick = () => {
            subjects = subjects.filter(s => s !== sub);
            localStorage.setItem('subjects', JSON.stringify(subjects));
            renderSubjects();
            updateProfileSubjects();
        };
        li.appendChild(delBtn);
        list.appendChild(li);
    });
}

function updateProfileSubjects() {
    document.getElementById('profileSubjects').textContent = subjects.length > 0 ? subjects.join(', ') : 'None added';
}

// Timetable
const timetable = [];

function addTimetableEntry() {
    const time = document.getElementById('timetableTime').value.trim();
    const activity = document.getElementById('timetableActivity').value.trim();
    if (time !== '' && activity !== '') {
        timetable.push({ time, activity });
        renderTimetable();
        document.getElementById('timetableTime').value = '';
        document.getElementById('timetableActivity').value = '';
    }
}

function renderTimetable() {
    const tbody = document.getElementById('timetableBody');
    tbody.innerHTML = '';
    timetable.forEach(entry => {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td>${entry.time}</td><td>${entry.activity}</td>`;
        tbody.appendChild(tr);
    });
}

// Goals
let goals = [];

function addGoal() {
    const goalText = document.getElementById('goalInput').value.trim();
    if (goalText !== '') {
        goals.push({ text: goalText, completed: false });
        saveGoals();
        renderGoals();
        document.getElementById('goalInput').value = '';
    }
}

function saveGoals() {
    localStorage.setItem('goals', JSON.stringify(goals));
}

function loadGoals() {
    const stored = localStorage.getItem('goals');
    if (stored) {
        goals = JSON.parse(stored);
    }
    renderGoals();
}

function renderGoals() {
    const list = document.getElementById('goalList');
    list.innerHTML = '';
    goals.forEach((goal, index) => {
        const li = document.createElement('li');
        li.textContent = goal.text;
        if (goal.completed) li.style.textDecoration = 'line-through';
        const completeBtn = document.createElement('button');
        completeBtn.innerHTML = goal.completed ? '↺' : '✔️';
        completeBtn.title = 'Toggle complete';
        completeBtn.onclick = () => {
            goals[index].completed = !goals[index].completed;
            saveGoals();
            renderGoals();
        };
        li.appendChild(completeBtn);
        list.appendChild(li);
    });
}

// Tasks
let tasks = [];

function addTask() {
    const taskText = document.getElementById('taskInput').value.trim();
    if (taskText !== '') {
        tasks.push({ text: taskText, completed: false });
        saveTasks();
        renderTasks();
        document.getElementById('taskInput').value = '';
    }
}

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const stored = localStorage.getItem('tasks');
    if (stored) {
        tasks = JSON.parse(stored);
    }
    renderTasks();
}

function renderTasks() {
    const list = document.getElementById('taskList');
    list.innerHTML = '';
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.textContent = task.text;
        if (task.completed) li.style.textDecoration = 'line-through';
        const completeBtn = document.createElement('button');
        completeBtn.innerHTML = task.completed ? '↺' : '✔️';
        completeBtn.title = 'Toggle complete';
        completeBtn.onclick = () => {
            tasks[index].completed = !tasks[index].completed;
            saveTasks();
            renderTasks();
        };
        li.appendChild(completeBtn);
        list.appendChild(li);
    });
}

// Progress & Stats (using Chart.js)
let progressChart;
function initProgressChart() {
    const ctx = document.getElementById('progressChart').getContext('2d');
    progressChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Completed', 'Pending'],
            datasets: [{
                data: [0, 100],
                backgroundColor: ['#4CAF50', '#ccc']
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}

function updateProgress() {
    const totalGoals = goals.length;
    const completedGoals = goals.filter(g => g.completed).length;
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(t => t.completed).length;

    const total = totalGoals + totalTasks;
    const completed = completedGoals + completedTasks;
    const pending = total - completed;

    if (progressChart) {
        progressChart.data.datasets[0].data = [completed, pending];
        progressChart.update();
    }
}

// Revision Scheduler
let revisions = [];

function scheduleRevision() {
    const topic = document.getElementById('revisionTopic').value.trim();
    const date = document.getElementById('revisionDate').value;
    if (topic !== '' && date !== '') {
        revisions.push({ topic, date });
        saveRevisions();
        renderRevisions();
        document.getElementById('revisionTopic').value = '';
        document.getElementById('revisionDate').value = '';
    }
}

function saveRevisions() {
    localStorage.setItem('revisions', JSON.stringify(revisions));
}

function loadRevisions() {
    const stored = localStorage.getItem('revisions');
    if (stored) {
        revisions = JSON.parse(stored);
    }
    renderRevisions();
}

function renderRevisions() {
    const list = document.getElementById('revisionList');
    list.innerHTML = '';
    revisions.forEach((rev, index) => {
        const li = document.createElement('li');
        li.textContent = `${rev.topic} - ${rev.date}`;
        const delBtn = document.createElement('button');
        delBtn.innerHTML = '🗑️';
        delBtn.onclick = () => {
            revisions.splice(index, 1);
            saveRevisions();
            renderRevisions();
        };
        li.appendChild(delBtn);
        list.appendChild(li);
    });
}

// Initialize on load
window.onload = () => {
    loadSubjects();
    loadGoals();
    loadTasks();
    loadRevisions();
    initProgressChart();
};