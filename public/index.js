async function fetchLoginStatus() {
    try {
      const response = await fetch('/loginStatus'); // Send a request to the server to check login status
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching login status:', error);
      return false;
    }
}

async function logout() {
    try {
      const response = await fetch('/logout'); // Send a request to the server to logout
      if (response.ok) {
        window.location.reload(); // Reload the page after logout
      } else {
        console.error('Logout failed:', response.statusText);
      }
    } catch (error) {
      console.error('Error logging out:', error);
    }
  }

async function updateUI() {
    const { loggedIn, username } = await fetchLoginStatus();
  
    const loginButton = document.getElementById('loginButton');
    const loginStatus = document.getElementById('loginStatus');
  
    if (loggedIn) {
      loginButton.textContent = 'Logout';
      loginButton.onclick = logout;
      loginStatus.textContent = `You are logged in as ${username}`;
    } else {
      loginButton.textContent = 'Login';
      loginButton.onclick = () => window.location = '/login';
      loginStatus.textContent = 'You are not logged in';
    }
}

window.onload = updateUI;