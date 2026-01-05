const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname));

// Criar/conectar banco de dados
const db = new sqlite3.Database('./cha-panela.db', (err) => {
    if (err) {
        console.error('Erro ao conectar ao banco:', err);
    } else {
        console.log('Conectado ao banco de dados SQLite');
        initDatabase();
    }
});

// Inicializar tabelas
function initDatabase() {
    db.run(`
        CREATE TABLE IF NOT EXISTS products (
            id INTEGER PRIMARY KEY,
            name TEXT NOT NULL,
            icon TEXT,
            description TEXT,
            max_quantity INTEGER,
            category TEXT
        )
    `, (err) => {
        if (err) {
            console.error('Erro ao criar tabela products:', err);
            return;
        }
        
        db.run(`
            CREATE TABLE IF NOT EXISTS selections (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                product_id INTEGER,
                guest_name TEXT NOT NULL,
                selected_date DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (product_id) REFERENCES products(id)
            )
        `, (err) => {
            if (err) {
                console.error('Erro ao criar tabela selections:', err);
                return;
            }
            
            // Verificar se produtos já foram inseridos
            db.get('SELECT COUNT(*) as count FROM products', (err, row) => {
                if (err) {
                    console.error('Erro ao verificar produtos:', err);
                    return;
                }
                if (row && row.count === 0) {
                    insertInitialProducts();
                }
            });
        });
    });
}

// Inserir produtos iniciais
function insertInitialProducts() {
    const products = [
        // Cozinha - Essenciais (mais unidades)
        { id: 1, name: 'Fogão', icon: '🔥', description: 'Fogão 4 bocas', maxQuantity: 1, category: 'cozinha' },
        { id: 2, name: 'Geladeira', icon: '🧊', description: 'Geladeira', maxQuantity: 1, category: 'cozinha' },
        { id: 3, name: 'Microondas', icon: '📟', description: 'Microondas', maxQuantity: 1, category: 'cozinha' },
        { id: 4, name: 'Air Fryer', icon: '🍟', description: 'Air fryer', maxQuantity: 1, category: 'cozinha' },
        { id: 5, name: 'Liquidificador', icon: '🥤', description: 'Liquidificador potente', maxQuantity: 1, category: 'cozinha' },
        { id: 6, name: 'Batedeira', icon: '🎂', description: 'Batedeira elétrica', maxQuantity: 1, category: 'cozinha' },
        { id: 7, name: 'Jogo de Panelas', icon: '🍳', description: 'Kit panelas antiaderentes', maxQuantity: 2, category: 'cozinha' },
        { id: 8, name: 'Panela de Pressão', icon: '🫕', description: 'Panela de pressão', maxQuantity: 2, category: 'cozinha' },
        { id: 9, name: 'Jogo de Talheres', icon: '🍴', description: 'Kit', maxQuantity: 2, category: 'cozinha' },
        { id: 10, name: 'Jogo de Copos', icon: '🥤', description: 'Kit ', maxQuantity: 3, category: 'cozinha' },
        { id: 11, name: 'Jogo de Taças', icon: '🍷', description: 'Kit ', maxQuantity: 2, category: 'cozinha' },
        { id: 12, name: 'Jogo de Xícaras', icon: '☕', description: 'Kit ', maxQuantity: 2, category: 'cozinha' },
        { id: 13, name: 'Jogo de Louça', icon: '🍽️', description: 'Kit', maxQuantity: 3, category: 'cozinha' },
        { id: 14, name: 'Jogo de Facas', icon: '🔪', description: 'Kit completo para pão, carne, peixe e legumes', maxQuantity: 1, category: 'cozinha' },
        { id: 15, name: 'Jogo de Formas', icon: '🧁', description: 'formas diversas', maxQuantity:2, category: 'cozinha' },
        { id: 16, name: 'Descanso de Panela', icon: '🟤', description: 'Descanso térmico', maxQuantity: 6, category: 'cozinha' },
        { id: 17, name: 'Pano de Prato', icon: '🧻', description: 'Kit', maxQuantity: 2, category: 'cozinha' },
        { id: 18, name: 'Escorredor de Massa', icon: '🍝', description: 'Escorredor grande', maxQuantity: 1, category: 'cozinha' },
        { id: 19, name: 'Forma de Gelo', icon: '🧊', description: 'Kit com 3 formas', maxQuantity: 1, category: 'cozinha' },
        { id: 20, name: 'Potes para Mantimentos', icon: '🫙', description: 'Kit para café, açúcar, farinha e sal', maxQuantity: 3, category: 'cozinha' },
        { id: 21, name: 'Lixeira', icon: '🗑️', description: 'Lixeira com pedal', maxQuantity: 2, category: 'cozinha' },
        { id: 22, name: 'Ralador', icon: '🧀', description: 'Ralador 4 faces', maxQuantity: 1, category: 'cozinha' },
        { id: 23, name: 'pilão de Alho', icon: '🧄', description: 'para pilar alho', maxQuantity: 1, category: 'cozinha' },
        { id: 24, name: 'Amassador de Batata', icon: '🥔', description: 'Amassador manual', maxQuantity: 1, category: 'cozinha' },
        { id: 25, name: 'Colheres de Silicone', icon: '🥄', description: 'Kit com 5 colheres', maxQuantity: 2, category: 'cozinha' },
        { id: 26, name: 'Tigelas', icon: '🥣', description: 'Kit com tigelas', maxQuantity: 3, category: 'cozinha' },
        { id: 27, name: 'Canecas', icon: '🍵', description: 'Kit canecas', maxQuantity: 1, category: 'cozinha' },
        { id: 28, name: 'Jarros', icon: '🧃', description: 'Jarro para água/suco', maxQuantity: 2, category: 'cozinha' },
        { id: 29, name: 'Escorredor de Louça', icon: '🧽', description: 'Escorredor com bandeja', maxQuantity: 1, category: 'cozinha' },
        { id: 30, name: 'Tábua de Corte', icon: '🟫', description: 'Tábua de corte em madeira ou plástico', maxQuantity: 3, category: 'cozinha' },

        // Banheiro
        { id: 31, name: 'Toalhas de Banho', icon: '🛁', description: 'Kit com 4 toalhas', maxQuantity: 4, category: 'banheiro' },
        { id: 32, name: 'Toalhas de Rosto', icon: '🧖', description: 'Kit com 6 toalhas', maxQuantity: 4, category: 'banheiro' },
        { id: 33, name: 'Tapetes', icon: '🪤', description: 'Tapete antiderrapante', maxQuantity: 3, category: 'banheiro' },
        { id: 34, name: 'Lixeira para Banheiro', icon: '🗑️', description: 'Lixeira com tampa', maxQuantity: 2, category: 'banheiro' },
        { id: 35, name: 'Saboneteiras', icon: '🧼', description: 'Saboneteira de parede', maxQuantity: 3, category: 'banheiro' },
        { id: 36, name: 'Kit Porta Coisas', icon: '🪥', description: 'Porta escova, pasta e sabonete', maxQuantity: 3, category: 'banheiro' },
        
        // Quarto
        { id: 41, name: 'Lençóis King Size', icon: '🛏️', description: 'Jogo de lençol king size', maxQuantity: 4, category: 'quarto' },
        { id: 42, name: 'Edredom King Size', icon: '🛌', description: 'Edredom king size', maxQuantity: 1, category: 'quarto' },
        { id: 43, name: 'Cobre Leito King Size', icon: '🪢', description: 'Cobre leito king size', maxQuantity: 1, category: 'quarto' },
        { id: 44, name: 'Colcha King Size', icon: '🧶', description: 'Colcha king size', maxQuantity: 1, category: 'quarto' },
        { id: 45, name: 'Travesseiros', icon: '🛋️', description: 'Par de travesseiros', maxQuantity: 4, category: 'quarto' },
        { id: 46, name: 'Fronhas', icon: '🧵', description: 'Kit com 4 fronhas', maxQuantity: 4, category: 'quarto' },
        { id: 47, name: 'Protetor de Colchão King', icon: '🪡', description: 'Protetor impermeável king size', maxQuantity: 1, category: 'quarto' },
        { id: 68, name: 'Almofadas', icon: '🛋️', description: 'Kit com almofadas decorativas', maxQuantity: 3, category: 'outros' },
        
        
        // Sala
        { id: 51, name: 'Televisão', icon: '📺', description: 'TV', maxQuantity: 1, category: 'sala' },
        { id: 52, name: 'Aspirador', icon: '🧹', description: 'Aspirador de pó vertical', maxQuantity: 1, category: 'sala' },
        { id: 53, name: 'Ventilador', icon: '💨', description: 'Ventilador de coluna', maxQuantity: 3, category: 'sala' },
        { id: 69, name: 'Cortinas', icon: '🪟', description: 'Cortinas para sala ou quarto', maxQuantity: 3, category: 'outros' },

        // Outros
        { id: 61, name: 'Cabideiro', icon: '🪝', description: 'Cabideiro de parede ou chão', maxQuantity: 1, category: 'outros' },
        { id: 62, name: 'Espelho', icon: '🪞', description: 'Espelho decorativo', maxQuantity: 1, category: 'outros' },
        { id: 70, name: 'PIX - Contribuição', icon: '💰', description: 'Prefiro contribuir com PIX', maxQuantity: 999, category: 'outros' },
    ];

    const stmt = db.prepare('INSERT INTO products VALUES (?, ?, ?, ?, ?, ?)');
    products.forEach(p => {
        stmt.run(p.id, p.name, p.icon, p.description, p.maxQuantity, p.category);
    });
    stmt.finalize();
    console.log('Produtos inseridos no banco de dados');
}

// API ROUTES

// Listar todos os produtos
app.get('/api/products', (req, res) => {
    db.all('SELECT * FROM products ORDER BY category, id', (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(rows);
        }
    });
});

// Obter disponibilidade dos produtos
app.get('/api/products/availability', (req, res) => {
    const query = `
        SELECT 
            p.id,
            p.max_quantity,
            COUNT(s.id) as selected_count,
            (p.max_quantity - COUNT(s.id)) as available
        FROM products p
        LEFT JOIN selections s ON p.id = s.product_id
        GROUP BY p.id
    `;
    
    db.all(query, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(rows);
        }
    });
});

// Registrar seleção de presente
app.post('/api/selections', (req, res) => {
    const { product_id, guest_name } = req.body;

    if (!product_id || !guest_name) {
        return res.status(400).json({ error: 'Dados incompletos' });
    }

    // Verificar disponibilidade
    const checkQuery = `
        SELECT 
            p.max_quantity,
            COUNT(s.id) as selected_count
        FROM products p
        LEFT JOIN selections s ON p.id = s.product_id
        WHERE p.id = ?
        GROUP BY p.id
    `;

    db.get(checkQuery, [product_id], (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        if (!row) {
            return res.status(404).json({ error: 'Produto não encontrado' });
        }

        if (row.selected_count >= row.max_quantity) {
            return res.status(400).json({ error: 'Produto esgotado' });
        }

        // Inserir seleção
        db.run(
            'INSERT INTO selections (product_id, guest_name) VALUES (?, ?)',
            [product_id, guest_name],
            function(err) {
                if (err) {
                    res.status(500).json({ error: err.message });
                } else {
                    res.json({ 
                        id: this.lastID, 
                        message: 'Presente registrado com sucesso!',
                        product_id,
                        guest_name
                    });
                }
            }
        );
    });
});

// Listar todas as seleções (para admin)
app.get('/api/selections', (req, res) => {
    const query = `
        SELECT 
            s.id,
            s.product_id,
            s.guest_name,
            s.selected_date,
            p.name as product_name,
            p.icon as product_icon
        FROM selections s
        JOIN products p ON s.product_id = p.id
        ORDER BY s.selected_date DESC
    `;

    db.all(query, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(rows);
        }
    });
});

// Remover seleção (para admin)
app.delete('/api/selections/:id', (req, res) => {
    const { id } = req.params;

    db.run('DELETE FROM selections WHERE id = ?', [id], function(err) {
        if (err) {
            res.status(500).json({ error: err.message });
        } else if (this.changes === 0) {
            res.status(404).json({ error: 'Seleção não encontrada' });
        } else {
            res.json({ message: 'Seleção removida com sucesso' });
        }
    });
});

// Limpar todas as seleções (para admin)
app.delete('/api/selections', (req, res) => {
    db.run('DELETE FROM selections', function(err) {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json({ message: 'Todas as seleções foram removidas', deleted: this.changes });
        }
    });
});

// Estatísticas (para admin)
app.get('/api/stats', (req, res) => {
    const queries = {
        totalProducts: 'SELECT COUNT(*) as count FROM products',
        totalSelections: 'SELECT COUNT(*) as count FROM selections',
        availableItems: `
            SELECT SUM(p.max_quantity - COALESCE(s.count, 0)) as available
            FROM products p
            LEFT JOIN (
                SELECT product_id, COUNT(*) as count
                FROM selections
                GROUP BY product_id
            ) s ON p.id = s.product_id
        `
    };

    const stats = {};
    let completed = 0;

    Object.keys(queries).forEach(key => {
        db.get(queries[key], (err, row) => {
            if (!err) {
                stats[key] = row.count || row.available || 0;
            }
            completed++;
            if (completed === Object.keys(queries).length) {
                res.json(stats);
            }
        });
    });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
    console.log('Banco de dados: cha-panela.db');
});
