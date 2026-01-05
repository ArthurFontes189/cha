const API_URL = 'http://localhost:3000/api';

const categories = {
    cozinha: { name: 'Cozinha', icon: '🍽️' },
    banheiro: { name: 'Banheiro', icon: '🚿' },
    quarto: { name: 'Quarto', icon: '🛏️' },
    sala: { name: 'Sala', icon: '🛋️' },
    outros: { name: 'Outros', icon: '🎁' }
};

let products = [];
let availability = {};
let activeTab = 'cozinha';

// Carregar produtos do servidor
async function loadProducts() {
    try {
        const response = await fetch(`${API_URL}/products`);
        products = await response.json();
        await loadAvailability();
        renderTabs();
        renderProducts();
    } catch (error) {
        console.error('Erro ao carregar produtos:', error);
        alert('Erro ao conectar com o servidor. Verifique se o servidor está rodando.');
    }
}

// Carregar disponibilidade
async function loadAvailability() {
    try {
        const response = await fetch(`${API_URL}/products/availability`);
        const data = await response.json();
        availability = {};
        data.forEach(item => {
            availability[item.id] = {
                maxQuantity: item.max_quantity,
                selected: item.selected_count,
                available: item.available
            };
        });
    } catch (error) {
        console.error('Erro ao carregar disponibilidade:', error);
    }
}

function renderTabs() {
    const tabsContainer = document.getElementById('tabs');
    tabsContainer.innerHTML = '';
    
    Object.keys(categories).forEach(categoryKey => {
        const tab = document.createElement('button');
        tab.className = `tab ${categoryKey === activeTab ? 'active' : ''}`;
        tab.innerHTML = `
            <span class="tab-icon">${categories[categoryKey].icon}</span>
            <span>${categories[categoryKey].name}</span>
        `;
        tab.onclick = () => switchTab(categoryKey);
        tabsContainer.appendChild(tab);
    });
}

function switchTab(categoryKey) {
    activeTab = categoryKey;
    renderTabs();
    renderProducts();
}

function renderProducts() {
    const contentContainer = document.getElementById('tabContent');
    contentContainer.innerHTML = '';
    
    Object.keys(categories).forEach(categoryKey => {
        const categoryProducts = products.filter(p => p.category === categoryKey);
        
        if (categoryProducts.length === 0) return;

        const panel = document.createElement('div');
        panel.className = `category-panel ${categoryKey === activeTab ? 'active' : ''}`;
        
        const grid = document.createElement('div');
        grid.className = 'products-grid';

        categoryProducts.forEach(product => {
            const avail = availability[product.id] || { available: product.max_quantity, selected: 0 };
            const isUnavailable = avail.available <= 0;

            const card = document.createElement('div');
            card.className = `product-card ${isUnavailable ? 'unavailable' : ''}`;
            
            card.innerHTML = `
                <div class="product-icon-emoji">${product.icon}</div>
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <div class="product-status">
                    <span class="availability ${avail.available <= 1 ? 'limited' : ''}">
                        ${avail.available > 0 ? `Disponível: ${avail.available}` : 'Indisponível'}
                    </span>
                    <button class="btn-select" ${isUnavailable ? 'disabled' : ''}>
                        Presentear
                    </button>
                </div>
            `;

            if (!isUnavailable) {
                card.onclick = () => openModal(product);
            }

            grid.appendChild(card);
        });

        panel.appendChild(grid);
        contentContainer.appendChild(panel);
    });
}

function openModal(product) {
    const modal = document.getElementById('modal');
    document.getElementById('modalTitle').textContent = product.name;
    document.getElementById('modalDescription').textContent = product.description;
    
    const avail = availability[product.id];
    document.getElementById('modalAvailability').textContent = 
        `Disponível: ${avail.available} de ${avail.maxQuantity}`;
    
    document.getElementById('guestName').value = '';
    
    const confirmBtn = document.getElementById('confirmBtn');
    confirmBtn.onclick = () => confirmGift(product);
    
    modal.style.display = 'block';
}

async function confirmGift(product) {
    const guestName = document.getElementById('guestName').value.trim();
    
    if (!guestName) {
        alert('Por favor, informe seu nome!');
        return;
    }

    try {
        const response = await fetch(`${API_URL}/selections`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                product_id: product.id,
                guest_name: guestName
            })
        });

        const data = await response.json();

        if (response.ok) {
            closeModal();
            alert(`Obrigado, ${guestName}! Seu presente foi registrado com sucesso! 🎁`);
            await loadAvailability();
            renderProducts();
        } else {
            alert(data.error || 'Erro ao registrar presente');
        }
    } catch (error) {
        console.error('Erro ao confirmar presente:', error);
        alert('Erro ao conectar com o servidor');
    }
}

function closeModal() {
    document.getElementById('modal').style.display = 'none';
}

document.querySelector('.close').onclick = closeModal;
window.onclick = (event) => {
    const modal = document.getElementById('modal');
    if (event.target === modal) {
        closeModal();
    }
};

// Inicializar
loadProducts();
