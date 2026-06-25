let isLoginMode = true;
const form = document.getElementById('authForm');
const toggleBtn = document.getElementById('toggleMode');
const alertBox = document.getElementById('alertBox');
const submitBtn = document.getElementById('submitBtn');

// Typing effect function
function typeText(element, text, speed = 30) {
    element.innerHTML = '';
    let i = 0;
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

toggleBtn.addEventListener('click', () => {
    isLoginMode = !isLoginMode;
    document.getElementById('sysHeader').innerText = isLoginMode ? "CYBERSHIELD // AUTH_SYS" : "CYBERSHIELD // REGISTRATION";
    submitBtn.innerText = isLoginMode ? "INITIATE_LOGIN" : "REGISTER_USER";
    toggleBtn.innerText = isLoginMode ? ">> Switch to Register_" : ">> Switch to Login_";
    alertBox.innerText = '';
});

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const endpoint = isLoginMode ? '/api/login' : '/api/register';

    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        const result = await response.json();

        if (!response.ok) {
            alertBox.style.color = '#ff003c'; // Red for errors
            typeText(alertBox, result.error);
        } else {
            alertBox.style.color = '#0f0'; // Green for success
            typeText(alertBox, result.success);
            
            if (result.redirect) {
                setTimeout(() => window.location.href = result.redirect, 1500);
            } else {
                setTimeout(() => toggleBtn.click(), 2000); // Switch to login after register
            }
        }
    } catch (err) {
        typeText(alertBox, "CRITICAL ERROR: Server offline.");
    }
});