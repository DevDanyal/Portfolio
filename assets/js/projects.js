// Projects JavaScript - Filtering and Modal System

document.addEventListener('DOMContentLoaded', function() {
    const projectsGrid = document.getElementById('projectsGrid');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const modal = document.getElementById('projectModal');
    const modalBody = document.getElementById('modalBody');
    const modalClose = document.getElementById('modalClose');
    const modalOverlay = document.getElementById('modalOverlay');

    let projectsData = [];
    let currentFilter = 'all';
    let showingAll = false;
    const initialProjectCount = 3;

    // Load Projects from JSON
    async function loadProjects() {
        try {
            const response = await fetch('projects.json?v=' + Date.now());
            const data = await response.json();
            projectsData = data.projects;
            displayProjects(projectsData, false);
        } catch (error) {
            console.error('Error loading projects:', error);
            projectsGrid.innerHTML = '<p style="text-align: center; color: var(--text-muted);">Error loading projects. Please try again later.</p>';
        }
    }

    // Display Projects
    function displayProjects(projects, showAll = false) {
        if (projects.length === 0) {
            projectsGrid.innerHTML = '<p style="text-align: center; color: var(--text-muted); grid-column: 1 / -1;">No projects found in this category.</p>';
            return;
        }

        // Determine how many projects to show
        const projectsToShow = showAll ? projects : projects.slice(0, initialProjectCount);
        const hasMore = projects.length > initialProjectCount;

        projectsGrid.innerHTML = projectsToShow.map((project, index) => {
            // Check if project has an image, otherwise use icon
            console.log('Project:', project.title, 'Has image:', !!project.image, 'Image path:', project.image);

            const imageContent = project.image
                ? `<img src="${project.image}?v=${Date.now()}" alt="${project.title}" onerror="console.error('Image failed to load:', '${project.image}'); this.style.display='none'; this.nextElementSibling.style.display='flex';">
                   <i class="fa-solid ${project.icon || 'fa-box'} project-icon" style="display:none;"></i>`
                : `<i class="fa-solid ${project.icon || 'fa-box'} project-icon"></i>`;

            // Project-specific emojis based on category and title
            let emojis = [];
            if (project.title.includes('Weather')) {
                emojis = ['☁️', '🌤️', '🌧️', '⛈️'];
            } else if (project.title.includes('Chat')) {
                emojis = ['💬', '📱', '✉️', '💭'];
            } else if (project.title.includes('Todo') || project.title.includes('Task')) {
                emojis = ['✅', '📝', '📋', '✔️'];
            } else if (project.title.includes('Calculator')) {
                emojis = ['🔢', '➕', '➖', '✖️'];
            } else if (project.title.includes('Expense') || project.title.includes('Finance')) {
                emojis = ['💰', '💵', '💳', '📊'];
            } else if (project.title.includes('Quiz') || project.title.includes('Game')) {
                emojis = ['🎮', '🎯', '🏆', '⭐'];
            } else if (project.title.includes('Resume')) {
                emojis = ['📄', '📝', '🎓', '💼'];
            } else if (project.title.includes('Attendance')) {
                emojis = ['📅', '⏰', '✅', '📊'];
            } else if (project.title.includes('BMI') || project.title.includes('Health')) {
                emojis = ['⚖️', '💪', '🏃', '❤️'];
            } else if (project.title.includes('Currency')) {
                emojis = ['💱', '💵', '💶', '💷'];
            } else if (project.title.includes('Contact')) {
                emojis = ['📞', '📧', '👤', '📇'];
            } else if (project.title.includes('Dictionary')) {
                emojis = ['📖', '📚', '🔤', '📝'];
            } else if (project.title.includes('Password')) {
                emojis = ['🔐', '🔑', '🛡️', '🔒'];
            } else if (project.title.includes('Stopwatch') || project.title.includes('Timer') || project.title.includes('Clock')) {
                emojis = ['⏱️', '⏰', '⏲️', '🕐'];
            } else if (project.title.includes('Tic Tac Toe')) {
                emojis = ['❌', '⭕', '🎮', '🏁'];
            } else if (project.title.includes('Rock Paper Scissors')) {
                emojis = ['✊', '✋', '✌️', '🎲'];
            } else if (project.title.includes('Number') || project.title.includes('Guessing')) {
                emojis = ['🎲', '🔢', '🎯', '❓'];
            } else if (project.title.includes('Notepad') || project.title.includes('Note')) {
                emojis = ['📝', '📄', '✏️', '📋'];
            } else if (project.title.includes('Unit') || project.title.includes('Converter')) {
                emojis = ['📏', '⚖️', '🔄', '📐'];
            } else if (project.title.includes('Student') || project.title.includes('Management')) {
                emojis = ['🎓', '📚', '👨‍🎓', '📊'];
            } else if (project.title.includes('Login') || project.title.includes('Auth')) {
                emojis = ['🔐', '👤', '🔑', '✅'];
            } else if (project.title.includes('Typing')) {
                emojis = ['⌨️', '✍️', '⚡', '🎯'];
            } else {
                // Default tech emojis
                emojis = ['⚙️', '🐍', '🚀', '🔧'];
            }

            return `
            <div class="project-card fade-in-up" data-category="${project.category}" data-id="${project.id}">
                <div class="project-emoji-bg">
                    <span style="top: 5%; left: 10%; transform: rotate(-15deg);">${emojis[0]}</span>
                    <span style="top: 5%; right: 10%; transform: rotate(20deg);">${emojis[1]}</span>
                    <span style="bottom: 5%; left: 10%; transform: rotate(10deg);">${emojis[2]}</span>
                    <span style="bottom: 5%; right: 10%; transform: rotate(-10deg);">${emojis[3]}</span>
                </div>
                <div class="project-image">
                    ${imageContent}
                </div>
                <div class="project-content">
                    <h3 class="project-title">${project.title}</h3>
                    <div class="project-tech">
                        ${project.technologies.slice(0, 3).map(tech => `
                            <span class="tech-badge">${tech}</span>
                        `).join('')}
                    </div>
                    <p class="project-description">${project.description}</p>
                    <div class="project-stats">
                        <span class="project-stat"><i class="fa-solid fa-star"></i> Featured</span>
                        <span class="project-stat"><i class="fa-solid fa-code"></i> ${project.technologies.length} Tech</span>
                    </div>
                    <div class="project-links">
                        <a href="#" class="project-link view-details" data-id="${project.id}">View Details</a>
                        <a href="${project.github}" target="_blank" rel="noopener noreferrer" class="project-link">GitHub →</a>
                    </div>
                </div>
            </div>
        `}).join('');

        // Add "Show More" button if not showing all and there are more projects
        if (!showAll && hasMore) {
            const showMoreBtn = document.createElement('div');
            showMoreBtn.className = 'show-more-container';
            showMoreBtn.innerHTML = `
                <button class="btn btn-primary show-more-btn" id="showMoreBtn">
                    Show More Projects (${projects.length - initialProjectCount} more)
                </button>
            `;
            projectsGrid.appendChild(showMoreBtn);

            // Add click event to show more button
            document.getElementById('showMoreBtn').addEventListener('click', function() {
                showingAll = true;
                displayProjects(projects, true);
            });
        }

        // Add "Show Less" button if showing all projects
        if (showAll && hasMore) {
            const showLessBtn = document.createElement('div');
            showLessBtn.className = 'show-more-container';
            showLessBtn.innerHTML = `
                <button class="btn btn-secondary show-less-btn" id="showLessBtn">
                    Show Less
                </button>
            `;
            projectsGrid.appendChild(showLessBtn);

            // Add click event to show less button
            document.getElementById('showLessBtn').addEventListener('click', function() {
                showingAll = false;
                displayProjects(projects, false);
                // Scroll to projects section
                document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
            });
        }

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
            currentFilter = filter;
            showingAll = false;

            let filteredProjects;
            if (filter === 'all') {
                filteredProjects = projectsData;
            } else {
                filteredProjects = projectsData.filter(p => p.category === filter);
            }

            displayProjects(filteredProjects, false);
        });
    });

    // Open Modal
    function openModal(projectId) {
        const project = projectsData.find(p => p.id === projectId);
        if (!project) return;

        // Use project image if available, otherwise use placeholder
        let modalImageHtml;
        if (project.image) {
            modalImageHtml = `<img src="${project.image}?v=${Date.now()}" alt="${project.title}">`;
        } else {
            // Use placeholder.com for modal
            const categoryColors = {
                'web-apps': '667eea/764ba2',
                'games': 'f093fb/f5576c',
                'utilities': '4facfe/00f2fe',
                'business-tools': '43e97b/38f9d7'
            };
            const colors = categoryColors[project.category] || '667eea/764ba2';
            modalImageHtml = `<img src="https://via.placeholder.com/800x400/${colors}/ffffff?text=${encodeURIComponent(project.title)}" alt="${project.title}">`;
        }

        // Get project-specific emojis
        let emojis = [];
        if (project.title.includes('Weather')) {
            emojis = ['☁️', '🌤️', '🌧️', '⛈️'];
        } else if (project.title.includes('Chat')) {
            emojis = ['💬', '📱', '✉️', '💭'];
        } else if (project.title.includes('Todo') || project.title.includes('Task')) {
            emojis = ['✅', '📝', '📋', '✔️'];
        } else if (project.title.includes('Calculator')) {
            emojis = ['🔢', '➕', '➖', '✖️'];
        } else if (project.title.includes('Expense') || project.title.includes('Finance')) {
            emojis = ['💰', '💵', '💳', '📊'];
        } else if (project.title.includes('Quiz') || project.title.includes('Game')) {
            emojis = ['🎮', '🎯', '🏆', '⭐'];
        } else if (project.title.includes('Resume')) {
            emojis = ['📄', '📝', '🎓', '💼'];
        } else if (project.title.includes('Attendance')) {
            emojis = ['📅', '⏰', '✅', '📊'];
        } else if (project.title.includes('BMI') || project.title.includes('Health')) {
            emojis = ['⚖️', '💪', '🏃', '❤️'];
        } else if (project.title.includes('Currency')) {
            emojis = ['💱', '💵', '💶', '💷'];
        } else if (project.title.includes('Contact')) {
            emojis = ['📞', '📧', '👤', '📇'];
        } else if (project.title.includes('Dictionary')) {
            emojis = ['📖', '📚', '🔤', '📝'];
        } else if (project.title.includes('Password')) {
            emojis = ['🔐', '🔑', '🛡️', '🔒'];
        } else if (project.title.includes('Stopwatch') || project.title.includes('Timer') || project.title.includes('Clock')) {
            emojis = ['⏱️', '⏰', '⏲️', '🕐'];
        } else if (project.title.includes('Tic Tac Toe')) {
            emojis = ['❌', '⭕', '🎮', '🏁'];
        } else if (project.title.includes('Rock Paper Scissors')) {
            emojis = ['✊', '✋', '✌️', '🎲'];
        } else if (project.title.includes('Number') || project.title.includes('Guessing')) {
            emojis = ['🎲', '🔢', '🎯', '❓'];
        } else if (project.title.includes('Notepad') || project.title.includes('Note')) {
            emojis = ['📝', '📄', '✏️', '📋'];
        } else if (project.title.includes('Unit') || project.title.includes('Converter')) {
            emojis = ['📏', '⚖️', '🔄', '📐'];
        } else if (project.title.includes('Student') || project.title.includes('Management')) {
            emojis = ['🎓', '📚', '👨‍🎓', '📊'];
        } else if (project.title.includes('Login') || project.title.includes('Auth')) {
            emojis = ['🔐', '👤', '🔑', '✅'];
        } else if (project.title.includes('Typing')) {
            emojis = ['⌨️', '✍️', '⚡', '🎯'];
        } else {
            emojis = ['⚙️', '🐍', '🚀', '🔧'];
        }

        modalBody.innerHTML = `
            <div class="modal-emoji-bg">
                <span style="top: 5%; left: 5%; transform: rotate(-15deg);">${emojis[0]}</span>
                <span style="top: 5%; right: 5%; transform: rotate(20deg);">${emojis[1]}</span>
                <span style="bottom: 10%; left: 5%; transform: rotate(10deg);">${emojis[2]}</span>
                <span style="bottom: 10%; right: 5%; transform: rotate(-10deg);">${emojis[3]}</span>
            </div>
            <div class="modal-image">
                ${modalImageHtml}
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
