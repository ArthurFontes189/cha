const ADMIN_PASSWORD = 'casamento2025';
const API_URL = '/api';

const products = [
    // Cozinha
    { id: 1, name: 'Jogo de Panelas', icon: '🍳', description: 'Kit com 5 panelas antiaderentes', maxQuantity: 2, category: 'cozinha' },
    { id: 2, name: 'Panela de Pressão', icon: '⚗️', description: 'Panela de pressão 4,5L', maxQuantity: 1, category: 'cozinha' },
    { id: 3, name: 'Jogo de Talheres', icon: '🍴', description: 'Kit com 24 peças', maxQuantity: 2, category: 'cozinha' },
    { id: 4, name: 'Jogo de Copos', icon: '🥛', description: 'Kit com 6 copos', maxQuantity: 3, category: 'cozinha' },
    { id: 5, name: 'Jogo de Taças', icon: '🍷', description: 'Kit com 6 taças', maxQuantity: 2, category: 'cozinha' },
    { id: 6, name: 'Jogo de Xícaras', icon: '☕', description: 'Kit com 6 xícaras com pires', maxQuantity: 2, category: 'cozinha' },
    { id: 7, name: 'Jogo de Louça', icon: '🍽️', description: 'Kit com 20 peças', maxQuantity: 2, category: 'cozinha' },
    { id: 8, name: 'Jogo de Facas', icon: '🔪', description: 'Kit completo para pão, carne, peixe e legumes', maxQuantity: 1, category: 'cozinha' },
    { id: 9, name: 'Jogo de Formas', icon: '🥧', description: 'Kit com formas diversas', maxQuantity: 2, category: 'cozinha' },
    { id: 10, name: 'Descanso de Panela', icon: '🟫', description: 'Descanso térmico', maxQuantity: 3, category: 'cozinha' },
    { id: 11, name: 'Pano de Prato', icon: '🧻', description: 'Kit com 6 unidades', maxQuantity: 3, category: 'cozinha' },
    { id: 12, name: 'Escorredor de Massa', icon: '🍝', description: 'Escorredor grande', maxQuantity: 1, category: 'cozinha' },
    { id: 13, name: 'Forma de Gelo', icon: '🧊', description: 'Kit com 3 formas', maxQuantity: 2, category: 'cozinha' },
    { id: 14, name: 'Potes para Mantimentos', icon: '🫙', description: 'Kit para café, açúcar, farinha e sal', maxQuantity: 2, category: 'cozinha' },
    { id: 15, name: 'Lixeira', icon: '🗑️', description: 'Lixeira com pedal', maxQuantity: 1, category: 'cozinha' },
    { id: 16, name: 'Medidor de Alimentos', icon: '⚖️', description: 'Balança digital', maxQuantity: 1, category: 'cozinha' },
    { id: 17, name: 'Ralador', icon: '🔻', description: 'Ralador 4 faces', maxQuantity: 2, category: 'cozinha' },
    { id: 18, name: 'Amassador de Alho', icon: '🧄', description: 'Espremedor de alho', maxQuantity: 2, category: 'cozinha' },
    { id: 19, name: 'Amassador de Batata', icon: '🥔', description: 'Amassador manual', maxQuantity: 2, category: 'cozinha' },
    { id: 20, name: 'Colheres de Silicone', icon: '🥄', description: 'Kit com 5 colheres', maxQuantity: 2, category: 'cozinha' },
    { id: 21, name: 'Tigelas', icon: '🥣', description: 'Kit com 3 tigelas', maxQuantity: 2, category: 'cozinha' },
    { id: 22, name: 'Saladeira', icon: '🥗', description: 'Saladeira grande', maxQuantity: 1, category: 'cozinha' },
    { id: 23, name: 'Centrífuga de Salada', icon: '🌀', description: 'Secadora de salada', maxQuantity: 1, category: 'cozinha' },
    { id: 24, name: 'Canecas', icon: '☕', description: 'Kit com 6 canecas', maxQuantity: 2, category: 'cozinha' },
    { id: 25, name: 'Cumbucas', icon: '🍜', description: 'Kit com 6 cumbucas', maxQuantity: 2, category: 'cozinha' },
    { id: 26, name: 'Jarros', icon: '🏺', description: 'Jarro para água/suco', maxQuantity: 2, category: 'cozinha' },
    { id: 27, name: 'Escorredor de Louça', icon: '🧼', description: 'Escorredor com bandeja', maxQuantity: 1, category: 'cozinha' },
    { id: 31, name: 'Toalhas de Banho', icon: '🛁', description: 'Kit com 4 toalhas', maxQuantity: 3, category: 'banheiro' },
    { id: 32, name: 'Toalhas de Rosto', icon: '🧺', description: 'Kit com 6 toalhas', maxQuantity: 3, category: 'banheiro' },
    { id: 33, name: 'Tapetes', icon: '🚿', description: 'Tapete antiderrapante', maxQuantity: 2, category: 'banheiro' },
    { id: 34, name: 'Lixeira para Banheiro', icon: '🗑️', description: 'Lixeira com tampa', maxQuantity: 2, category: 'banheiro' },
    { id: 35, name: 'Saboneteiras', icon: '🧼', description: 'Saboneteira de parede', maxQuantity: 2, category: 'banheiro' },
    { id: 36, name: 'Kit Porta Coisas', icon: '🧴', description: 'Porta escova, pasta e sabonete', maxQuantity: 2, category: 'banheiro' },
    { id: 41, name: 'Lençóis King Size', icon: '🛏️', description: 'Jogo de lençol king size', maxQuantity: 3, category: 'quarto' },
    { id: 42, name: 'Edredom King Size', icon: '🛌', description: 'Edredom king size', maxQuantity: 2, category: 'quarto' },
    { id: 43, name: 'Cobre Leito King Size', icon: '🏠', description: 'Cobre leito king size', maxQuantity: 2, category: 'quarto' },
    { id: 44, name: 'Colcha King Size', icon: '🎨', description: 'Colcha king size', maxQuantity: 2, category: 'quarto' },
    { id: 45, name: 'Travesseiros', icon: '😴', description: 'Par de travesseiros', maxQuantity: 3, category: 'quarto' },
    { id: 46, name: 'Fronhas', icon: '🧵', description: 'Kit com 4 fronhas', maxQuantity: 3, category: 'quarto' },
    { id: 47, name: 'Protetor de Colchão King', icon: '🛡️', description: 'Protetor impermeável king size', maxQuantity: 2, category: 'quarto' },
    { id: 51, name: 'Aspirador', icon: '🧹', description: 'Aspirador de pó vertical', maxQuantity: 1, category: 'sala' },
    { id: 52, name: 'Ferro de Passar', icon: '👔', description: 'Ferro a vapor', maxQuantity: 1, category: 'sala' },
    { id: 53, name: 'Ventilador', icon: '🌀', description: 'Ventilador de coluna', maxQuantity: 2, category: 'sala' },
    { id: 54, name: 'Tapete', icon: '🧶', description: 'Tapete para sala', maxQuantity: 2, category: 'sala' }
];

function checkPassword() {
    const password = document.getElementById('adminPassword').value;
    if (password === ADMIN_PASSWORD) {
        document.getElementById('loginSection').style.display = 'none';
        document.getElementById('adminSection').style.display = 'block';
        sessionStorage.setItem('adminLoggedIn', 'true');
        loadAdminData();
    } else {
        alert('Senha incorreta!');
    }
}

function logout() {
    sessionStorage.removeItem('adminLoggedIn');
    document.getElementById('loginSection').style.display = 'flex';
    document.getElementById('adminSection').style.display = 'none';
    document.getElementById('adminPassword').value = '';
}

async function loadAdminData() {
    try {
        const [statsRes, selectionsRes] = await Promise.all([
            fetch(`${API_URL}/stats`),
            fetch(`${API_URL}/selections`)
        ]);

        const stats = await statsRes.json();
        const selections = await selectionsRes.json();

        document.getElementById('totalItems').textContent = stats.totalProducts || 0;
        document.getElementById('selectedItems').textContent = stats.totalSelections || 0;
        document.getElementById('availableItems').textContent = stats.availableItems || 0;

        renderGiftsList(selections);
    } catch (error) {
        console.error('Erro ao carregar dados:', error);
        alert('Erro ao conectar com o servidor');
    }
}

function renderGiftsList(selections) {
    const listContainer = document.getElementById('giftsList');
    listContainer.innerHTML = '';

    if (selections.length === 0) {
        listContainer.innerHTML = `
            <div class="empty-state">
                <h2>🎁 Nenhum presente escolhido ainda</h2>
                <p>Quando os convidados escolherem presentes, eles aparecerão aqui.</p>
            </div>
        `;
        return;
    }

    // Agrupar por produto
    const grouped = {};
    selections.forEach(sel => {
        if (!grouped[sel.product_id]) {
            grouped[sel.product_id] = {
                name: sel.product_name,
                icon: sel.product_icon,
                selections: []
            };
        }
        grouped[sel.product_id].selections.push(sel);
    });

    Object.keys(grouped).forEach(productId => {
        const product = grouped[productId];
        const giftItem = document.createElement('div');
        giftItem.className = 'gift-item';

        const guestsHTML = product.selections.map(sel => `
            <div class="guest-item">
                <div>
                    <div class="guest-name">👤 ${sel.guest_name}</div>
                    <div class="guest-date">${new Date(sel.selected_date).toLocaleString('pt-BR')}</div>
                </div>
                <button class="btn-remove" onclick="removeGuest(${sel.id})">
                    Remover
                </button>
            </div>
        `).join('');

        giftItem.innerHTML = `
            <div class="gift-header">
                <div class="gift-title">
                    <img src="${product.icon}" alt="${product.name}" class="gift-icon" onerror="this.src='https://via.placeholder.com/50?text=?'">
                    <h3>${product.name}</h3>
                </div>
                <span class="gift-count">${product.selections.length} escolhido(s)</span>
            </div>
            <div class="guests-list">
                ${guestsHTML}
            </div>
        `;

        listContainer.appendChild(giftItem);
    });
}

async function removeGuest(selectionId) {
    if (!confirm('Tem certeza que deseja remover esta seleção?')) return;

    try {
        const response = await fetch(`${API_URL}/selections/${selectionId}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            alert('Seleção removida com sucesso!');
            loadAdminData();
        } else {
            const data = await response.json();
            alert(data.error || 'Erro ao remover seleção');
        }
    } catch (error) {
        console.error('Erro ao remover:', error);
        alert('Erro ao conectar com o servidor');
    }
}

async function exportData() {
    try {
        const response = await fetch(`${API_URL}/selections`);
        const data = await response.json();
        const dataStr = JSON.stringify(data, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `cha-panela-${new Date().toISOString().split('T')[0]}.json`;
        link.click();
    } catch (error) {
        console.error('Erro ao exportar:', error);
        alert('Erro ao exportar dados');
    }
}

async function clearAllData() {
    if (!confirm('ATENÇÃO: Isso irá limpar TODOS os dados! Tem certeza?')) return;
    if (!confirm('Esta ação não pode ser desfeita. Confirma?')) return;

    try {
        const response = await fetch(`${API_URL}/selections`, {
            method: 'DELETE'
        });

        if (response.ok) {
            alert('Todos os dados foram limpos!');
            loadAdminData();
        } else {
            alert('Erro ao limpar dados');
        }
    } catch (error) {
        console.error('Erro ao limpar:', error);
        alert('Erro ao conectar com o servidor');
    }
}

// Mostrar formulário de adicionar produto
function showAddProductForm() {
    document.getElementById('addProductSection').style.display = 'block';
    document.getElementById('addProductSection').scrollIntoView({ behavior: 'smooth' });
}

// Esconder formulário de adicionar produto
function hideAddProductForm() {
    document.getElementById('addProductSection').style.display = 'none';
    document.getElementById('addProductForm').reset();
}

// Adicionar novo produto
document.getElementById('addProductForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const productData = {
        name: document.getElementById('productName').value,
        icon: document.getElementById('productIcon').value,
        description: document.getElementById('productDescription').value,
        maxQuantity: parseInt(document.getElementById('productQuantity').value),
        category: document.getElementById('productCategory').value
    };

    try {
        const response = await fetch(`${API_URL}/products`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productData)
        });

        const data = await response.json();

        if (response.ok) {
            alert('✅ Produto adicionado com sucesso!');
            hideAddProductForm();
            loadAdminData();
        } else {
            alert('❌ Erro ao adicionar produto: ' + (data.error || 'Erro desconhecido'));
        }
    } catch (error) {
        console.error('Erro ao adicionar produto:', error);
        alert('❌ Erro ao conectar com o servidor');
    }
});

if (sessionStorage.getItem('adminLoggedIn') === 'true') {
    document.getElementById('loginSection').style.display = 'none';
    document.getElementById('adminSection').style.display = 'block';
    loadAdminData();
}
