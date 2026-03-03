// Color Theme Switcher
document.addEventListener('DOMContentLoaded', function() {
    const colorThemeToggle = document.getElementById('colorThemeToggle');

    // Available color themes
    const themes = ['orange', 'blue', 'green', 'purple', 'red'];
    let currentThemeIndex = 0;

    // Load saved theme from localStorage
    const savedTheme = localStorage.getItem('colorTheme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-color-theme', savedTheme);
        currentThemeIndex = themes.indexOf(savedTheme);
    } else {
        document.documentElement.setAttribute('data-color-theme', 'orange');
    }

    // Toggle color theme
    colorThemeToggle.addEventListener('click', function() {
        // Move to next theme
        currentThemeIndex = (currentThemeIndex + 1) % themes.length;
        const newTheme = themes[currentThemeIndex];

        // Apply theme
        document.documentElement.setAttribute('data-color-theme', newTheme);

        // Save to localStorage
        localStorage.setItem('colorTheme', newTheme);

        // Add glow animation to entire website
        document.body.classList.add('theme-glow-animation');

        // Add animation effect to button
        colorThemeToggle.style.transform = 'scale(1.3) rotate(360deg)';

        setTimeout(() => {
            colorThemeToggle.style.transform = '';
            document.body.classList.remove('theme-glow-animation');
        }, 800);
    });
});
