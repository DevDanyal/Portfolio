// Black & White Mode Toggle
document.addEventListener('DOMContentLoaded', function() {
    const bwToggle = document.getElementById('bwToggle');
    const body = document.body;

    // Check if B&W mode was previously enabled
    if (localStorage.getItem('bwMode') === 'enabled') {
        body.classList.add('bw-mode');
        bwToggle.textContent = 'Color';
    }

    bwToggle.addEventListener('click', function() {
        body.classList.toggle('bw-mode');

        if (body.classList.contains('bw-mode')) {
            localStorage.setItem('bwMode', 'enabled');
            bwToggle.textContent = 'Color';
        } else {
            localStorage.setItem('bwMode', 'disabled');
            bwToggle.textContent = 'B&W';
        }
    });
});
