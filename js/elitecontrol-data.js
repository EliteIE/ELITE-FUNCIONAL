// elitecontrol-data-firebase.js - Versão Offline
// Este arquivo contém funções simuladas para operações de dados

// Simulação de dados para ambiente offline
const eliteControlData = {
    // Dados de produtos
    products: [
        { id: 'prod1', name: 'Produto A', price: 199.99, stock: 45, category: 'Eletrônicos' },
        { id: 'prod2', name: 'Produto B', price: 299.99, stock: 32, category: 'Informática' },
        { id: 'prod3', name: 'Produto C', price: 99.99, stock: 78, category: 'Acessórios' },
        { id: 'prod4', name: 'Produto D', price: 149.99, stock: 12, category: 'Eletrônicos' },
        { id: 'prod5', name: 'Produto E', price: 79.99, stock: 23, category: 'Acessórios' }
    ],
    
    // Dados de vendas
    sales: [
        { id: 'sale1', date: '2025-01-15', products: ['prod1', 'prod3'], total: 299.98, seller: 'user1' },
        { id: 'sale2', date: '2025-02-03', products: ['prod2', 'prod4'], total: 449.98, seller: 'user1' },
        { id: 'sale3', date: '2025-02-18', products: ['prod1', 'prod2', 'prod5'], total: 579.97, seller: 'user2' },
        { id: 'sale4', date: '2025-03-05', products: ['prod3'], total: 99.99, seller: 'user1' },
        { id: 'sale5', date: '2025-04-12', products: ['prod4', 'prod5'], total: 229.98, seller: 'user2' },
        { id: 'sale6', date: '2025-05-01', products: ['prod1'], total: 199.99, seller: 'user1' },
        { id: 'sale7', date: '2025-05-20', products: ['prod2'], total: 299.99, seller: 'user2' }
    ],
    
    // Dados de usuários
    users: [
        { id: 'user1', name: 'João Silva', email: 'joao@elitecontrol.com', role: 'Vendedor' },
        { id: 'user2', name: 'Maria Oliveira', email: 'maria@elitecontrol.com', role: 'Vendedor' },
        { id: 'user3', name: 'Carlos Santos', email: 'carlos@elitecontrol.com', role: 'Controlador de Estoque' },
        { id: 'user4', name: 'Ana Pereira', email: 'ana@elitecontrol.com', role: 'Dono/Gerente' }
    ]
};

// Funções de acesso aos dados (simuladas)
const DataService = {
    // Produtos
    getProducts: function() {
        return Promise.resolve(eliteControlData.products);
    },
    
    getProductById: function(id) {
        const product = eliteControlData.products.find(p => p.id === id);
        return Promise.resolve(product || null);
    },
    
    addProduct: function(product) {
        const newProduct = { ...product, id: `prod${Date.now()}` };
        eliteControlData.products.push(newProduct);
        return Promise.resolve(newProduct);
    },
    
    updateProduct: function(id, data) {
        const index = eliteControlData.products.findIndex(p => p.id === id);
        if (index === -1) return Promise.reject(new Error('Produto não encontrado'));
        
        eliteControlData.products[index] = { ...eliteControlData.products[index], ...data };
        return Promise.resolve(eliteControlData.products[index]);
    },
    
    deleteProduct: function(id) {
        const index = eliteControlData.products.findIndex(p => p.id === id);
        if (index === -1) return Promise.reject(new Error('Produto não encontrado'));
        
        eliteControlData.products.splice(index, 1);
        return Promise.resolve(true);
    },
    
    // Vendas
    getSales: function() {
        return Promise.resolve(eliteControlData.sales);
    },
    
    getSaleById: function(id) {
        const sale = eliteControlData.sales.find(s => s.id === id);
        return Promise.resolve(sale || null);
    },
    
    getSalesByUser: function(userId) {
        const sales = eliteControlData.sales.filter(s => s.seller === userId);
        return Promise.resolve(sales);
    },
    
    addSale: function(sale) {
        const newSale = { ...sale, id: `sale${Date.now()}` };
        eliteControlData.sales.push(newSale);
        return Promise.resolve(newSale);
    },
    
    // Usuários
    getUsers: function() {
        return Promise.resolve(eliteControlData.users);
    },
    
    getUserById: function(id) {
        const user = eliteControlData.users.find(u => u.id === id);
        return Promise.resolve(user || null);
    },
    
    getUserByEmail: function(email) {
        const user = eliteControlData.users.find(u => u.email === email);
        return Promise.resolve(user || null);
    },
    
    // Estatísticas
    getProductStats: function() {
        // Simulação de estatísticas de produtos
        return Promise.resolve({
            totalProducts: eliteControlData.products.length,
            lowStock: eliteControlData.products.filter(p => p.stock < 20).length,
            categories: {
                'Eletrônicos': eliteControlData.products.filter(p => p.category === 'Eletrônicos').length,
                'Informática': eliteControlData.products.filter(p => p.category === 'Informática').length,
                'Acessórios': eliteControlData.products.filter(p => p.category === 'Acessórios').length
            }
        });
    },
    
    getSalesStats: function() {
        // Simulação de estatísticas de vendas
        const today = new Date().toISOString().split('T')[0];
        const todaySales = eliteControlData.sales.filter(s => s.date === today);
        
        return Promise.resolve({
            totalSales: eliteControlData.sales.length,
            todaySales: todaySales.length,
            totalRevenue: eliteControlData.sales.reduce((sum, sale) => sum + sale.total, 0),
            todayRevenue: todaySales.reduce((sum, sale) => sum + sale.total, 0)
        });
    },
    
    getTopProducts: function() {
        // Simulação de produtos mais vendidos
        const productCounts = {};
        
        eliteControlData.sales.forEach(sale => {
            sale.products.forEach(productId => {
                productCounts[productId] = (productCounts[productId] || 0) + 1;
            });
        });
        
        const topProducts = Object.keys(productCounts)
            .map(productId => {
                const product = eliteControlData.products.find(p => p.id === productId);
                return {
                    id: productId,
                    name: product ? product.name : 'Produto Desconhecido',
                    count: productCounts[productId]
                };
            })
            .sort((a, b) => b.count - a.count);
        
        return Promise.resolve(topProducts);
    }
};

// Exportar para uso global
window.DataService = DataService;
