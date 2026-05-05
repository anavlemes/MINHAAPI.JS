const btnCarregar = document.getElementById('btnCarregar');
const container = document.getElementById('container-posts');


btnCarregar.addEventListener('click', () => {
    buscarUsuarios();
    buscarPosts();
});


async function buscarUsuarios() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const usuarios = await response.json();

        console.log("--- Lista de Usuários ---");
        usuarios.forEach(user => {
            
            console.log(`Nome: ${user.name} | Email: ${user.email}`);

            
            const card = document.createElement('div');
            card.className = 'card user-card';
            card.innerHTML = `
                <h3>${user.name}</h3>
                <p>${user.email}</p>
                <span>Usuário</span>
            `;
            container.appendChild(card);
        });
    } catch (error) {
        console.error("Erro ao buscar usuários:", error);
    }
}


async function buscarPosts() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const posts = await response.json();
        
        
        const primeirosPosts = posts.slice(0, 3);

        primeirosPosts.forEach(post => {
            renderizarCard(post.title, post.body);
        });
    } catch (error) {
        console.error("Erro ao buscar posts:", error);
    }
}


function renderizarCard(titulo, texto) {
    const card = document.createElement('div');
    card.className = 'card post-card';
    card.innerHTML = `
        <h3>${titulo}</h3>
        <p>${texto}</p>
    `;
    container.appendChild(card);
}


function criarPostLocal() {
    const titulo = document.getElementById('titulo').value;
    const texto = document.getElementById('texto').value;
    
    if(titulo && texto) {
        renderizarCard(titulo, texto);
        
        document.getElementById('titulo').value = '';
        document.getElementById('texto').value = '';
    } else {
        alert("Preencha título e texto!");
    }
}