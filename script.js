const btn = document.getElementById('searchBtn');
const input = document.getElementById('userInput');
const display = document.getElementById('display');

async function getUser() {
    const username = input.value;
    if (!username) return;

    display.innerHTML = "<p>Carregando...</p>";

    try {
        const response = await fetch(`https://api.github.com/users/${username}`);
        const user = await response.json();

        if (user.message === "Not Found") {
            display.innerHTML = "<p>Usuário não encontrado.</p>";
        } else {
            display.innerHTML = `
                <div class="profile-card">
                    <img src="${user.avatar_url}">
                    <h2>${user.name || user.login}</h2>
                    <p>${user.bio || 'Sem biografia'}</p>
                    <div class="stats">
                        <span>Repos: ${user.public_repos}</span>
                        <span>Seguidores: ${user.followers}</span>
                    </div>
                    <br>
                    <a href="${user.html_url}" target="_blank" style="color: #58a6ff;">Ver perfil no GitHub</a>
                </div>
            `;
        }
    } catch (err) {
        display.innerHTML = "<p>Erro na conexão.</p>";
    }
}

btn.addEventListener('click', getUser);