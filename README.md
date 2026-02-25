# Portfolio Website

A professional portfolio website showcasing 50+ Flask projects built with Python. This single-page application features a clean, modern design optimized for recruiters and hiring managers.

## Features

- **Responsive Design**: Works seamlessly on mobile, tablet, and desktop devices
- **Project Showcase**: Filterable grid displaying featured projects with detailed modals
- **Interactive UI**: Smooth scrolling, animations, and transitions
- **Contact Form**: Integrated with FormSpree for easy communication
- **Fast Loading**: Vanilla JavaScript with no framework dependencies
- **Accessible**: WCAG AA compliant with keyboard navigation support

## Technology Stack

- HTML5
- CSS3 (with CSS Grid and Flexbox)
- Vanilla JavaScript (ES6+)
- FormSpree (contact form backend)
- GitHub Pages (hosting)

## Project Structure

```
├── index.html              # Main HTML file
├── projects.json           # Project data
├── assets/
│   ├── css/
│   │   ├── main.css       # Primary styles
│   │   ├── responsive.css # Media queries
│   │   └── animations.css # Animations and transitions
│   ├── js/
│   │   ├── main.js        # Navigation and scroll
│   │   ├── projects.js    # Project filtering and modals
│   │   └── contact.js     # Form validation
│   ├── images/
│   │   ├── profile.jpg    # Profile photo
│   │   └── projects/      # Project screenshots
│   └── documents/
│       └── resume.pdf     # Downloadable resume
└── README.md
```

## Setup Instructions

### 1. Add Your Information

Edit `index.html` and replace:
- `Your Name` with your actual name
- `your.email@example.com` with your email
- `yourusername` with your GitHub username
- Social media links (GitHub, LinkedIn)

### 2. Add Profile Photo

Add your professional headshot:
- Place image at `assets/images/profile.jpg`
- Recommended size: 400x400px
- Format: JPG or PNG

### 3. Configure FormSpree

1. Go to [FormSpree.io](https://formspree.io/) and create a free account
2. Create a new form and get your form ID
3. In `index.html`, replace `YOUR_FORM_ID` in the form action:
   ```html
   <form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```

### 4. Add Resume

Place your resume PDF at `assets/documents/resume.pdf`

### 5. Customize Projects

Edit `projects.json` to add/modify your projects. Update:
- Project titles and descriptions
- Technologies used
- GitHub repository links
- Categories (web-apps, games, utilities, business-tools)

## Deployment to GitHub Pages

### Option 1: Username Site (Recommended)

1. Create a repository named: `yourusername.github.io`
2. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/yourusername.github.io.git
   ```
3. Copy all portfolio files to the repository
4. Commit and push:
   ```bash
   git add .
   git commit -m "Initial portfolio commit"
   git push origin main
   ```
5. Your site will be live at: `https://yourusername.github.io`

### Option 2: Project Site

1. Create a repository (e.g., `portfolio`)
2. Push your files to the `main` branch
3. Go to Settings → Pages
4. Select `main` branch as source
5. Your site will be live at: `https://yourusername.github.io/portfolio`

## Local Development

To test locally, you need a local server (due to CORS restrictions with `projects.json`):

### Using Python:
```bash
python -m http.server 8000
```

### Using Node.js:
```bash
npx http-server
```

Then open `http://localhost:8000` in your browser.

## Customization

### Colors

Edit CSS variables in `assets/css/main.css`:
```css
:root {
    --primary-color: #2563eb;
    --secondary-color: #1e293b;
    --accent-color: #0ea5e9;
}
```

### Fonts

Change Google Fonts in `index.html`:
```html
<link href="https://fonts.googleapis.com/css2?family=Your+Font&display=swap" rel="stylesheet">
```

### Sections

Add/remove sections by editing `index.html` and updating navigation links.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- Lighthouse Score: 90+
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3s

## License

This project is open source and available under the MIT License.

## Contact

For questions or feedback, please reach out via the contact form on the website or email directly.

---

Built with ❤️ using HTML, CSS, and JavaScript
