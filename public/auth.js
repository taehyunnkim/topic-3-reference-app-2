async function login(event) {
    event.preventDefault();  // Prevent the default form submission
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    try {
        const response = await fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(data)
        });

        if (response.ok) {
        window.location = '/'; // Redirect or show success message
        } else {
        const result = await response.json();
        document.getElementById('message').textContent = result.message;
        }
    } catch (error) {
        document.getElementById('message').textContent = 'An error occurred.';
    }
}
