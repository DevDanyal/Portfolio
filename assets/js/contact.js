// Contact Form JavaScript - Validation and Submission

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const formStatus = document.getElementById('formStatus');

    // Form field elements
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');

    // Error message elements
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const subjectError = document.getElementById('subjectError');
    const messageError = document.getElementById('messageError');

    // Validation Functions
    function validateName() {
        const name = nameInput.value.trim();
        if (name === '') {
            nameError.textContent = 'Name is required';
            return false;
        }
        if (name.length < 2) {
            nameError.textContent = 'Name must be at least 2 characters';
            return false;
        }
        nameError.textContent = '';
        return true;
    }

    function validateEmail() {
        const email = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (email === '') {
            emailError.textContent = 'Email is required';
            return false;
        }
        if (!emailRegex.test(email)) {
            emailError.textContent = 'Please enter a valid email address';
            return false;
        }
        emailError.textContent = '';
        return true;
    }

    function validateSubject() {
        const subject = subjectInput.value.trim();
        if (subject === '') {
            subjectError.textContent = 'Subject is required';
            return false;
        }
        if (subject.length < 3) {
            subjectError.textContent = 'Subject must be at least 3 characters';
            return false;
        }
        subjectError.textContent = '';
        return true;
    }

    function validateMessage() {
        const message = messageInput.value.trim();
        if (message === '') {
            messageError.textContent = 'Message is required';
            return false;
        }
        if (message.length < 10) {
            messageError.textContent = 'Message must be at least 10 characters';
            return false;
        }
        messageError.textContent = '';
        return true;
    }

    // Real-time Validation
    nameInput.addEventListener('blur', validateName);
    emailInput.addEventListener('blur', validateEmail);
    subjectInput.addEventListener('blur', validateSubject);
    messageInput.addEventListener('blur', validateMessage);

    // Clear error on input
    nameInput.addEventListener('input', function() {
        if (nameError.textContent) nameError.textContent = '';
    });
    emailInput.addEventListener('input', function() {
        if (emailError.textContent) emailError.textContent = '';
    });
    subjectInput.addEventListener('input', function() {
        if (subjectError.textContent) subjectError.textContent = '';
    });
    messageInput.addEventListener('input', function() {
        if (messageError.textContent) messageError.textContent = '';
    });

    // Form Submission
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        // Validate all fields
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isSubjectValid = validateSubject();
        const isMessageValid = validateMessage();

        if (!isNameValid || !isEmailValid || !isSubjectValid || !isMessageValid) {
            return;
        }

        // Show loading state
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoading = submitBtn.querySelector('.btn-loading');
        btnText.style.display = 'none';
        btnLoading.style.display = 'inline';
        submitBtn.disabled = true;
        formStatus.style.display = 'none';
        formStatus.classList.remove('success', 'error');

        // Prepare form data
        const formData = new FormData(contactForm);

        try {
            // Submit to FormSpree
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                // Success
                formStatus.textContent = 'Thank you! Your message has been sent successfully.';
                formStatus.classList.add('success');
                formStatus.style.display = 'block';
                contactForm.reset();
            } else {
                // Error from server
                formStatus.textContent = 'Oops! There was a problem sending your message. Please try again.';
                formStatus.classList.add('error');
                formStatus.style.display = 'block';
            }
        } catch (error) {
            // Network error
            formStatus.textContent = 'Network error. Please check your connection and try again.';
            formStatus.classList.add('error');
            formStatus.style.display = 'block';
        } finally {
            // Reset button state
            btnText.style.display = 'inline';
            btnLoading.style.display = 'none';
            submitBtn.disabled = false;
        }
    });

    // Character counter for message (optional enhancement)
    messageInput.addEventListener('input', function() {
        const length = this.value.length;
        const minLength = 10;

        if (length > 0 && length < minLength) {
            messageError.textContent = `${minLength - length} more characters needed`;
            messageError.style.color = '#64748b';
        } else if (length >= minLength) {
            messageError.textContent = '';
        }
    });
});
