const isProduction = window.location.hostname.includes("theowncollab.com");
const domainAttribute = isProduction ? "domain=.theowncollab.com;" : "";
const deleteOptions = `${domainAttribute} path=/; max-age=0; Secure; SameSite=Lax`;

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
}

const logoutBtn = document.getElementById('logout-btn');

logoutBtn.addEventListener('click', async () => {
    const response = await fetch('https://opc-backend-828246651523.europe-west1.run.app/auth/logout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + getCookie('accessToken')
        }
    })
    const data = await response.json();
    try {
        if (data.status_code == 200) {
            document.cookie = `accessToken=; ${deleteOptions}`;
            document.cookie = `refreshToken=; ${deleteOptions}`;
            document.cookie = `token_type=; ${deleteOptions}`;
            window.location.href = 'https://www.theowncollab.com/index.html';
        }
        if (data.status_code == 401) {
            document.cookie = `accessToken=; ${deleteOptions}`;
            document.cookie = `refreshToken=; ${deleteOptions}`;
            document.cookie = `token_type=; ${deleteOptions}`;
            window.location.href = 'https://www.theowncollab.com/index.html';
        }
    }
    catch (error) {
        console.error('Error logging out:', error);
    }
});