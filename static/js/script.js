function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
}

async function init() {
    const container = document.getElementById('circles-container');

    const typeMapping = {
        'brand': 'brand',
        'creator': 'creator',
        'event_partner': 'event partner'
    };
    const response = await fetch('https://opc-backend-828246651523.europe-west1.run.app/auth/all_user_types', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + getCookie('accessToken')
        }
    })
    const data = await response.json();
    try {
        if (data.status_code == 200) {
            console.log(data);
            // Clear loading text
            container.innerHTML = '';

            const types = data.user_types;

            if (!types || types.length === 0) {
                container.innerHTML = '<div class="loading">No access types found.</div>';
                return;
            }

            types.forEach(type => {
                // Ensure the type is valid
                if (typeMapping[type]) {
                    const circle = document.createElement('div');
                    circle.classList.add('circle');
                    circle.setAttribute('data-type', type);

                    const span = document.createElement('span');
                    span.textContent = typeMapping[type];

                    circle.appendChild(span);
                    container.appendChild(circle);

                    // Optional: Add click handler
                    circle.addEventListener('click', () => {
                        window.location.href = `/dashboard`;
                    });
                }
            });
        }
    }
    catch (error) {
        console.error('Error fetching user types:', error);
        container.innerHTML = '<div class="loading" style="color:red">Error loading options.</div>';
    };
};

init();
