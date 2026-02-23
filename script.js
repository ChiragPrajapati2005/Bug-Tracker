
document.addEventListener('DOMContentLoaded', () => {
    const bugForm = document.getElementById('bugForm');
    const bugList = document.getElementById('bugList');

    let bugs = JSON.parse(localStorage.getItem('bugs')) || [];

    const saveBugs = () => {
        localStorage.setItem('bugs', JSON.stringify(bugs));
    };

    const renderBugs = () => {
        bugList.innerHTML = '';
        bugs.forEach((bug, index) => {
            const bugDiv = document.createElement('div');
            bugDiv.className = 'bug' + (bug.status === 'Closed' ? ' closed' : '');
            bugDiv.innerHTML = `
                <strong>${bug.title}</strong><br>
                <small>${bug.description}</small><br>
                <strong>Status:</strong> ${bug.status}<br>
                <button onclick="toggleStatus(${index})">Toggle Status</button>
                <button onclick="deleteBug(${index})">Delete</button>
            `;
            bugList.appendChild(bugDiv);
        });
    };

    window.toggleStatus = (index) => {
        bugs[index].status = bugs[index].status === 'Open' ? 'Closed' : 'Open';
        saveBugs();
        renderBugs();
    };

    window.deleteBug = (index) => {
        bugs.splice(index, 1);
        saveBugs();
        renderBugs();
    };

    bugForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = document.getElementById('title').value.trim();
        const description = document.getElementById('description').value.trim();

        if (title && description) {
            bugs.push({ title, description, status: 'Open' });
            saveBugs();
            renderBugs();
            bugForm.reset();
        }
    });

    renderBugs();
});

