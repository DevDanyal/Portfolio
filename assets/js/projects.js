// Projects JavaScript - Filtering and Modal System

document.addEventListener('DOMContentLoaded', function() {
    const projectsGrid = document.getElementById('projectsGrid');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const modal = document.getElementById('projectModal');
    const modalBody = document.getElementById('modalBody');
    const modalClose = document.getElementById('modalClose');
    const modalOverlay = document.getElementById('modalOverlay');

    let projectsData = [];

    // Load Projects from JSON
    async function loadProjects() {
        try {
            const response = await fetch('projects.json');
            const data = await response.json();
            projectsData = data.projects;
            displayProjects(projectsData);
        } catch (error) {
            console.error('Error loading projects:', error);
            projectsGrid.innerHTML = '<p style="text-align: center; color: var(--text-muted);">Error loading projects. Please try again later.</p>';
        }
    }

    // Display Projects
    function displayProjects(projects) {
        if (projects.length === 0) {
            projectsGrid.innerHTML = '<p style="text-align: center; color: var(--text-muted); grid-column: 1 / -1;">No projects found in this category.</p>';
            return;
        }

        // Define gradient colors for different categories
        const categoryGradients = {
            'web-apps': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            'games': 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            'utilities': 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
            'business-tools': 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
        };

        projectsGrid.innerHTML = projects.map((project, index) => {
            // Use placeholder.com with category colors
            const categoryColors = {
                'web-apps': '667eea/764ba2',
                'games': 'f093fb/f5576c',
                'utilities': '4facfe/00f2fe',
                'business-tools': '43e97b/38f9d7'
            };

            const colors = categoryColors[project.category] || '667eea/764ba2';

            return `
            <div class="project-card fade-in-up" data-category="${project.category}" data-id="${project.id}">
                <div class="project-image">
                    <img src="https://via.placeholder.com/400x300/${colors}/ffffff?text=${encodeURIComponent(project.title)}" alt="${project.title}" loading="lazy">
                </div>
                <div class="project-content">
                    <h3 class="project-title">${project.title}</h3>
                    <div class="project-tech">
                        ${project.technologies.slice(0, 3).map(tech => `
                            <span class="tech-badge">${tech}</span>
                        `).join('')}
                    </div>
                    <p class="project-description">${project.description}</p>
                    <div class="project-links">
                        <a href="#" class="project-link view-details" data-id="${project.id}">View Details</a>
                        <a href="${project.github}" target="_blank" rel="noopener noreferrer" class="project-link">GitHub →</a>
                    </div>
                </div>
            </div>
        `}).join('');

        // Add click event to view details buttons
        document.querySelectorAll('.view-details').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                const projectId = parseInt(this.dataset.id);
                openModal(projectId);
            });
        });

        // Add click event to project cards
        document.querySelectorAll('.project-card').forEach(card => {
            card.addEventListener('click', function(e) {
                if (!e.target.closest('a')) {
                    const projectId = parseInt(this.dataset.id);
                    openModal(projectId);
                }
            });
        });
    }

    // Filter Projects
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            const filter = this.dataset.filter;

            let filteredProjects;
            if (filter === 'all') {
                filteredProjects = projectsData;
            } else {
                filteredProjects = projectsData.filter(p => p.category === filter);
            }

            displayProjects(filteredProjects);
        });
    });

    // Open Modal
    function openModal(projectId) {
        const project = projectsData.find(p => p.id === projectId);
        if (!project) return;

        // Use placeholder.com for modal
        const categoryColors = {
            'web-apps': '667eea/764ba2',
            'games': 'f093fb/f5576c',
            'utilities': '4facfe/00f2fe',
            'business-tools': '43e97b/38f9d7'
        };

        const colors = categoryColors[project.category] || '667eea/764ba2';

        modalBody.innerHTML = `
            <div class="modal-image">
                <img src="https://via.placeholder.com/800x400/${colors}/ffffff?text=${encodeURIComponent(project.title)}" alt="${project.title}">
            </div>
            <h2 class="modal-title">${project.title}</h2>
            <div class="modal-tech">
                ${project.technologies.map(tech => `
                    <span class="tech-badge">${tech}</span>
                `).join('')}
            </div>
            <p class="modal-description">${project.description}</p>
            <div class="modal-features">
                <h4>Key Features</h4>
                <ul>
                    ${project.features.map(feature => `
                        <li>${feature}</li>
                    `).join('')}
                </ul>
            </div>
            <a href="${project.github}" target="_blank" rel="noopener noreferrer" class="btn btn-primary modal-github">
                View on GitHub →
            </a>
        `;

        modal.classList.add('active');
        if (window.preventBodyScroll) {
            window.preventBodyScroll(true);
        }
    }

    // Close Modal
    function closeModal() {
        modal.classList.remove('active');
        if (window.preventBodyScroll) {
            window.preventBodyScroll(false);
        }
    }

    // Modal Close Events
    modalClose.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', closeModal);

    // Close modal on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    // Initialize
    loadProjects();

    // Export closeModal for use in other scripts
    window.closeModal = closeModal;
});
