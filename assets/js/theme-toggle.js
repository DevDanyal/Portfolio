// Theme Toggle (Dark/Light Mode)
document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;

    // Check if light mode was previously enabled
    if (localStorage.getItem('theme') === 'light') {
        body.classList.add('light-mode');
        themeToggle.innerHTML = '<span class="moon-icon">🌙</span>';
    }

    themeToggle.addEventListener('click', function() {
        body.classList.toggle('light-mode');

        if (body.classList.contains('light-mode')) {
            localStorage.setItem('theme', 'light');
            themeToggle.innerHTML = '<span class="moon-icon">🌙</span>';
        } else {
            localStorage.setItem('theme', 'dark');
            themeToggle.innerHTML = '<span class="sun-icon">☀️</span>';
        }
    });
});
