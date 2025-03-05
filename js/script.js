async function checkStreamStatus() {
    const liveNotification = document.getElementById('live-notification');
    const liveNotificationText = liveNotification.querySelector('div');

    try {
        const response = await fetch(`https://api.twitch.tv/helix/streams?user_login=raazgrizz`, {
            headers: {
                'Client-ID': 'hs9hfmb7oaq5qnh2m37nq6vyml7i05',
                'Authorization': 'Bearer 5b8fpyt3izyhhq9cdgcxyp7m2oamqb'
            }
        });

        const data = await response.json();

        if (data.data && data.data.length > 0) {
            // Stream is live
            liveNotification.classList.remove('offline');
            liveNotificationText.innerHTML = `
                <span class="live-dot"></span>
                Raazgrizz está ao vivo agora!
            `;
            liveNotification.style.display = 'block';
        } else {
            // Stream is offline
            liveNotification.classList.add('offline');
            liveNotificationText.innerHTML = `
                <span class="live-dot"></span>
                Raazgrizz está offline no momento
            `;
            liveNotification.style.display = 'block';
        }
    } catch (error) {
        console.error('Erro ao verificar status:', error);
        liveNotification.classList.add('offline');
        liveNotificationText.innerHTML = `
            <span class="live-dot"></span>
            Não foi possível verificar o status do stream
        `;
        liveNotification.style.display = 'block';
    }
}

// Check stream status when page loads
window.onload = checkStreamStatus;