document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    // Sample user data for validation
    const users = [
        { email: 'admin@gmail.com', password: 'admin123' },
        { email: 'adi@gmail.com', password: 'admin123' },
        { email: 'shubha@gmail.com', password: 'admin123' },
        { email: 'vaishnavi@gmail.com', password: 'admin123' },
        { email: 'kinshoe@gmail.com', password: 'admin123' }
    ];

    // Get the input values
    const emailInput = document.querySelector('input[type="text"]');
    const passwordInput = document.querySelector('input[type="password"]');
    const email = emailInput.value;
    const password = passwordInput.value;

    // Check if user exists and validate credentials
    const user = users.find(u => u.email === email);

    if (user) {
        if (user.password === password) {
            window.location.href = 'home.html';
        } else {
            alert('Login failed: Incorrect password.');
        }
    } else {
        alert('Login failed: User not found.');
    }
});