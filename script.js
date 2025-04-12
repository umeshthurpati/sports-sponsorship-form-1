// Common validation functions
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePassword(password) {
    return password.length >= 6;
}

function showError(element, message) {
    const errorElement = document.createElement('div');
    errorElement.className = 'error';
    errorElement.textContent = message;
    element.parentNode.appendChild(errorElement);
}

function clearErrors() {
    const errors = document.querySelectorAll('.error');
    errors.forEach(error => error.remove());
}

function showSuccess(form, message) {
    const successElement = document.createElement('div');
    successElement.className = 'success';
    successElement.textContent = message;
    form.appendChild(successElement);
    
    // Clear success message after 3 seconds
    setTimeout(() => {
        successElement.remove();
    }, 3000);
}

function showLoading() {
    const loadingDiv = document.createElement('div');
    loadingDiv.className = 'loading';
    loadingDiv.style.display = 'flex';
    loadingDiv.innerHTML = '<div class="spinner"></div>';
    document.body.appendChild(loadingDiv);
}

function hideLoading() {
    const loadingDiv = document.querySelector('.loading');
    if (loadingDiv) {
        loadingDiv.remove();
    }
}

function checkPasswordStrength(password) {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.match(/[a-z]/)) strength++;
    if (password.match(/[A-Z]/)) strength++;
    if (password.match(/[0-9]/)) strength++;
    if (password.match(/[^a-zA-Z0-9]/)) strength++;
    return strength;
}

function updatePasswordStrength(password) {
    const strengthBar = document.getElementById('passwordStrength');
    const strengthText = document.getElementById('strengthText');
    if (!strengthBar || !strengthText) return;

    const strength = checkPasswordStrength(password);
    strengthBar.className = 'password-strength';
    strengthText.textContent = '';

    if (password.length === 0) {
        strengthBar.style.width = '0%';
        return;
    }

    if (strength <= 2) {
        strengthBar.classList.add('strength-weak');
        strengthText.textContent = 'Weak password';
    } else if (strength <= 4) {
        strengthBar.classList.add('strength-medium');
        strengthText.textContent = 'Medium password';
    } else {
        strengthBar.classList.add('strength-strong');
        strengthText.textContent = 'Strong password';
    }
}

function saveCredentials(email, password) {
    localStorage.setItem('rememberedEmail', email);
    localStorage.setItem('rememberedPassword', password);
}

function loadCredentials() {
    // Clear any existing values in email and password fields
    const emailField = document.getElementById('email');
    const passwordField = document.getElementById('password');
    if (emailField) emailField.value = '';
    if (passwordField) passwordField.value = '';

    // Only check if credentials exist, but don't set any values
    const shouldRemember = localStorage.getItem('shouldRemember') === 'true';
    if (shouldRemember) {
        const email = localStorage.getItem('rememberedEmail');
        const password = localStorage.getItem('rememberedPassword');
        if (email && password) {
            // Only set the remember checkbox
            document.getElementById('remember').checked = true;
        }
    }
}

// Form validation for login
function validateLoginForm() {
    clearErrors();
    let isValid = true;
    const email = document.getElementById('email');
    const password = document.getElementById('password');

    if (!email.value) {
        showError(email, 'Email is required');
        isValid = false;
    } else if (!validateEmail(email.value)) {
        showError(email, 'Please enter a valid email');
        isValid = false;
    }

    if (!password.value) {
        showError(password, 'Password is required');
        isValid = false;
    }

    return isValid;
}

// Form validation for registration
function validateRegistrationForm() {
    clearErrors();
    let isValid = true;
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');

    if (!name.value) {
        showError(name, 'Full name is required');
        isValid = false;
    }

    if (!email.value) {
        showError(email, 'Email is required');
        isValid = false;
    } else if (!validateEmail(email.value)) {
        showError(email, 'Please enter a valid email');
        isValid = false;
    }

    if (!password.value) {
        showError(password, 'Password is required');
        isValid = false;
    } else if (!validatePassword(password.value)) {
        showError(password, 'Password must be at least 6 characters');
        isValid = false;
    }

    if (password.value !== confirmPassword.value) {
        showError(confirmPassword, 'Passwords do not match');
        isValid = false;
    }

    return isValid;
}

// Form validation for sponsorship application
function validateSponsorshipForm() {
    clearErrors();
    let isValid = true;
    const requiredFields = ['name', 'organization', 'sportType', 'sponsorshipType', 'contact', 'email', 'message'];

    requiredFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (!field.value) {
            showError(field, 'This field is required');
            isValid = false;
        }
    });

    const email = document.getElementById('email');
    if (email.value && !validateEmail(email.value)) {
        showError(email, 'Please enter a valid email');
        isValid = false;
    }

    return isValid;
}

// Form validation for event proposal
function validateEventProposalForm() {
    clearErrors();
    let isValid = true;
    const requiredFields = ['eventName', 'location', 'date', 'audience', 'package'];

    requiredFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (!field.value) {
            showError(field, 'This field is required');
            isValid = false;
        }
    });

    const proposal = document.getElementById('proposal');
    if (!proposal.files.length) {
        showError(proposal, 'Please upload a proposal file');
        isValid = false;
    }

    return isValid;
}

function showModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.display = 'flex';
}

function hideModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.display = 'none';
}

function validateResetPasswordForm() {
    clearErrors();
    let isValid = true;
    const email = document.getElementById('resetEmail');

    if (!email.value) {
        showError(email, 'Email is required');
        isValid = false;
    } else if (!validateEmail(email.value)) {
        showError(email, 'Please enter a valid email');
        isValid = false;
    }

    return isValid;
}

function toggleDarkMode() {
    const body = document.body;
    body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', body.classList.contains('dark-mode'));
}

function initializeDarkMode() {
    const darkMode = localStorage.getItem('darkMode') === 'true';
    if (darkMode) {
        document.body.classList.add('dark-mode');
    }
}

// Form submission handlers
document.addEventListener('DOMContentLoaded', function() {
    // Initialize dark mode
    initializeDarkMode();

    // Add dark mode toggle button
    const darkModeToggle = document.createElement('button');
    darkModeToggle.className = 'dark-mode-toggle';
    darkModeToggle.innerHTML = '🌓';
    darkModeToggle.title = 'Toggle Dark Mode';
    darkModeToggle.addEventListener('click', toggleDarkMode);
    document.body.appendChild(darkModeToggle);

    // Load remembered credentials if they exist and user chose to remember
    loadCredentials();

    // Login form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            if (validateLoginForm()) {
                e.preventDefault();
                const email = document.getElementById('email').value;
                const password = document.getElementById('password').value;
                const remember = document.getElementById('remember').checked;

                if (remember) {
                    saveCredentials(email, password);
                    localStorage.setItem('shouldRemember', 'true');
                } else {
                    localStorage.removeItem('rememberedEmail');
                    localStorage.removeItem('rememberedPassword');
                    localStorage.removeItem('shouldRemember');
                }

                showLoading();
                setTimeout(() => {
                    hideLoading();
                    showSuccess(this, 'Login successful! Redirecting...');
                    setTimeout(() => {
                        window.location.href = 'description.html';
                    }, 2000);
                }, 1500);
            }
        });
    }

    // Registration form
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            if (validateRegistrationForm()) {
                e.preventDefault();
                showLoading();
                setTimeout(() => {
                    hideLoading();
                    showSuccess(this, 'Registration successful! Redirecting to login...');
                    setTimeout(() => {
                        window.location.href = 'login.html';
                    }, 2000);
                }, 1500);
            }
        });
    }

    // Sponsorship form
    const sponsorshipForm = document.getElementById('sponsorshipForm');
    if (sponsorshipForm) {
        sponsorshipForm.addEventListener('submit', function(e) {
            if (validateSponsorshipForm()) {
                e.preventDefault();
                showLoading();
                setTimeout(() => {
                    hideLoading();
                    showSuccess(this, 'Application submitted successfully! We will contact you soon.');
                    this.reset();
                }, 1500);
            }
        });
    }

    // Event proposal form
    const eventProposalForm = document.getElementById('eventProposalForm');
    if (eventProposalForm) {
        eventProposalForm.addEventListener('submit', function(e) {
            if (validateEventProposalForm()) {
                e.preventDefault();
                showLoading();
                setTimeout(() => {
                    hideLoading();
                    showSuccess(this, 'Proposal submitted successfully! We will review it and get back to you.');
                    this.reset();
                }, 1500);
            }
        });
    }

    // Password strength indicator
    const passwordInput = document.getElementById('password');
    if (passwordInput) {
        passwordInput.addEventListener('input', function() {
            updatePasswordStrength(this.value);
        });
    }

    // Forgot Password Modal
    const forgotPasswordLink = document.getElementById('forgotPasswordLink');
    const forgotPasswordModal = document.getElementById('forgotPasswordModal');
    const closeModal = document.querySelector('.close-modal');
    const resetPasswordForm = document.getElementById('resetPasswordForm');

    if (forgotPasswordLink) {
        forgotPasswordLink.addEventListener('click', function(e) {
            e.preventDefault();
            showModal('forgotPasswordModal');
        });
    }

    if (closeModal) {
        closeModal.addEventListener('click', function() {
            hideModal('forgotPasswordModal');
        });
    }

    if (resetPasswordForm) {
        resetPasswordForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (validateResetPasswordForm()) {
                showLoading();
                setTimeout(() => {
                    hideLoading();
                    showSuccess(this, 'Password reset link has been sent to your email.');
                    setTimeout(() => {
                        hideModal('forgotPasswordModal');
                        this.reset();
                    }, 2000);
                }, 1500);
            }
        });
    }

    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === forgotPasswordModal) {
            hideModal('forgotPasswordModal');
        }
    });
}); 