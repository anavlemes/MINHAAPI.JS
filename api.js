const btnCarregar = document.getElementById('btnCarregar');
const container = document.getElementById('container-posts');

// 29. Botão carregar - Aciona as funções ao clicar
btnCarregar.addEventListener('click', () => {
    buscarUsuarios();
    buscarPosts();
});

// 31 e 32. Buscar e Renderizar Usuários
async function buscarUsuarios() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const usuarios = await response.json();

        console.log("--- Lista de Usuários ---");
        usuarios.forEach(user => {
            // Mostrar no console (Ex 31)
            console.log(`Nome: ${user.name} | Email: ${user.email}`);

            // Renderizar na tela (Ex 32)
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

// 11. Buscar Posts (Limitado a 3)
async function buscarPosts() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const posts = await response.json();
        
        // Pega apenas os 3 primeiros
        const primeirosPosts = posts.slice(0, 3);

        primeirosPosts.forEach(post => {
            renderizarCard(post.title, post.body);
        });
    } catch (error) {
        console.error("Erro ao buscar posts:", error);
    }
}

// 2. Criar card de posts (Função de renderização)
function renderizarCard(titulo, texto) {
    const card = document.createElement('div');
    card.className = 'card post-card';
    card.innerHTML = `
        <h3>${titulo}</h3>
        <p>${texto}</p>
    `;
    container.appendChild(card);
}

// Função para o formulário de novos posts
function criarPostLocal() {
    const titulo = document.getElementById('titulo').value;
    const texto = document.getElementById('texto').value;
    
    if(titulo && texto) {
        renderizarCard(titulo, texto);
        // Limpar campos
        document.getElementById('titulo').value = '';
        document.getElementById('texto').value = '';
    } else {
        alert("Preencha título e texto!");
    }
}