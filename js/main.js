// js/main.js - Versão Consolidada e Aprimorada

// Configurações e Inicialização
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar componentes da UI
    initializeUI();
    
    // Configurar listeners de eventos
    setupEventListeners();
    
    // Verificar se há usuário logado
    checkLoggedInUser();
});

// Funções de Inicialização da UI
function initializeUI() {
    // Inicializar notificações
    initializeNotifications();
    
    // Inicializar menu lateral
    initializeSidebar();
    
    // Inicializar gráficos se estiver na página de dashboard
    if (document.getElementById('salesChart')) {
        renderDashboardMainCharts();
    }
    
    // Mostrar alerta de boas-vindas se estiver na página de dashboard
    if (document.getElementById('temporaryAlertsContainer')) {
        showTemporaryAlert('Bem-vindo ao novo EliteControl! Sistema atualizado com design moderno.', 'success', 5000);
    }
}

// Verificação de Usuário Logado
function checkLoggedInUser() {
    const currentUser = localStorage.getItem('elitecontrol_user');
    
    // Se estiver na página de login e já tiver usuário logado, redirecionar para dashboard
    if (window.location.href.includes('index.html') && currentUser) {
        window.location.href = 'dashboard.html';
        return;
    }
    
    // Se estiver na página de dashboard e não tiver usuário logado, redirecionar para login
    if (window.location.href.includes('dashboard.html') && !currentUser) {
        window.location.href = 'index.html';
        return;
    }
    
    // Se estiver na página de dashboard e tiver usuário logado, atualizar informações do usuário
    if (window.location.href.includes('dashboard.html') && currentUser) {
        updateUserInfo(JSON.parse(currentUser));
    }
}

// Atualizar Informações do Usuário na UI
function updateUserInfo(user) {
    // Atualizar avatar e iniciais
    const userInitials = document.getElementById('userInitials');
    const userDropdownInitials = document.getElementById('userDropdownInitials');
    
    if (userInitials && user.name) {
        const initials = user.name.split(' ').map(n => n[0]).join('').toUpperCase();
        userInitials.textContent = initials;
        if (userDropdownInitials) {
            userDropdownInitials.textContent = initials;
        }
    }
    
    // Atualizar nome e cargo
    const usernameDisplay = document.getElementById('usernameDisplay');
    const userRoleDisplay = document.getElementById('userRoleDisplay');
    const userDropdownName = document.getElementById('userDropdownName');
    const userDropdownEmail = document.getElementById('userDropdownEmail');
    const sidebarProfileName = document.getElementById('sidebarProfileName');
    
    if (usernameDisplay && user.name) {
        usernameDisplay.textContent = user.name;
    }
    
    if (userRoleDisplay && user.role) {
        userRoleDisplay.textContent = user.role;
    }
    
    if (userDropdownName && user.name) {
        userDropdownName.textContent = user.name;
    }
    
    if (userDropdownEmail && user.email) {
        userDropdownEmail.textContent = user.email;
    }
    
    if (sidebarProfileName) {
        if (user.role === 'Dono/Gerente') {
            sidebarProfileName.textContent = 'Painel Dono/Gerente';
            document.getElementById('pageTitle').textContent = 'Painel Dono/Gerente';
        } else if (user.role === 'Controlador de Estoque') {
            sidebarProfileName.textContent = 'Painel Controlador de Estoque';
            document.getElementById('pageTitle').textContent = 'Painel Controlador de Estoque';
        } else if (user.role === 'Vendedor') {
            sidebarProfileName.textContent = 'Painel Vendedor';
            document.getElementById('pageTitle').textContent = 'Painel Vendedor';
        }
    }
}

// Configurar Event Listeners
function setupEventListeners() {
    // Formulário de Login
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    // Botão de Logout
    const logoutButton = document.getElementById('logoutButton');
    if (logoutButton) {
        logoutButton.addEventListener('click', handleLogout);
    }
    
    // Botão de Notificações
    const notificationBellButton = document.getElementById('notificationBellButton');
    const notificationDropdown = document.getElementById('notificationDropdown');
    
    if (notificationBellButton && notificationDropdown) {
        notificationBellButton.addEventListener('click', function(e) {
            e.stopPropagation();
            notificationDropdown.classList.toggle('hidden');
        });
        
        document.addEventListener('click', function(e) {
            if (!notificationBellButton.contains(e.target) && !notificationDropdown.contains(e.target)) {
                notificationDropdown.classList.add('hidden');
            }
        });
    }
    
    // Marcar todas notificações como lidas
    const markAllAsReadButton = document.getElementById('markAllAsReadButton');
    if (markAllAsReadButton) {
        markAllAsReadButton.addEventListener('click', function() {
            markAllNotificationsAsRead();
        });
    }
    
    // Botão de Menu do Usuário
    const userMenuButton = document.getElementById('userMenuButton');
    const userDropdown = document.getElementById('userDropdown');
    
    if (userMenuButton && userDropdown) {
        userMenuButton.addEventListener('click', function(e) {
            e.stopPropagation();
            userDropdown.classList.toggle('hidden');
        });
        
        document.addEventListener('click', function(e) {
            if (!userMenuButton.contains(e.target) && !userDropdown.contains(e.target)) {
                userDropdown.classList.add('hidden');
            }
        });
    }
    
    // Botões de Ação no Dashboard
    if (window.location.href.includes('dashboard.html')) {
        // Botão Nova Venda
        const newSaleButton = document.getElementById('newSaleButton');
        if (newSaleButton) {
            newSaleButton.addEventListener('click', function() {
                showTemporaryAlert('Iniciando registro de nova venda...', 'info');
                // Aqui seria aberto um modal ou redirecionamento para página de registro
            });
        }
        
        // Botões de opções dos gráficos
        const salesChartOptionsButton = document.getElementById('salesChartOptionsButton');
        if (salesChartOptionsButton) {
            salesChartOptionsButton.addEventListener('click', function() {
                showTemporaryAlert('Opções do gráfico de vendas', 'info');
            });
        }
        
        const productsChartOptionsButton = document.getElementById('productsChartOptionsButton');
        if (productsChartOptionsButton) {
            productsChartOptionsButton.addEventListener('click', function() {
                showTemporaryAlert('Opções do gráfico de produtos', 'info');
            });
        }
        
        // Links do menu lateral
        const navLinks = document.querySelectorAll('#navLinks a');
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Remover classe ativa de todos os links
                navLinks.forEach(l => l.classList.remove('active'));
                
                // Adicionar classe ativa ao link clicado
                this.classList.add('active');
                
                // Mostrar alerta com o nome da seção
                const sectionName = this.querySelector('span').textContent;
                showTemporaryAlert(`Navegando para: ${sectionName}`, 'info');
            });
        });
    }
}

// Manipulador de Login
function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const perfil = document.getElementById('perfil').value;
    
    // Validação básica
    if (!email || !password || !perfil) {
        showLoginError('Por favor, preencha todos os campos.');
        return;
    }
    
    // Validação de credenciais por perfil
    let isValid = false;
    let roleName = '';
    
    // Credenciais válidas para cada perfil
    const validCredentials = {
        'gerente': [
            { email: 'admin@elitecontrol.com', password: 'admin123' },
            { email: 'gerente@elitecontrol.com', password: 'gerente123' }
        ],
        'inventario': [
            { email: 'estoque@elitecontrol.com', password: 'estoque123' },
            { email: 'inventario@elitecontrol.com', password: 'inventario123' }
        ],
        'vendas': [
            { email: 'vendas@elitecontrol.com', password: 'vendas123' },
            { email: 'vendedor@elitecontrol.com', password: 'vendedor123' }
        ]
    };
    
    // Verificar se as credenciais são válidas para o perfil selecionado
    if (validCredentials[perfil]) {
        isValid = validCredentials[perfil].some(cred => 
            cred.email === email && cred.password === password
        );
    }
    
    // Se as credenciais não forem válidas para o perfil selecionado
    if (!isValid) {
        showLoginError('Credenciais inválidas para o perfil selecionado.');
        return;
    }
    
    // Definir nome do cargo com base no perfil
    if (perfil === 'gerente') {
        roleName = 'Dono/Gerente';
    } else if (perfil === 'inventario') {
        roleName = 'Controlador de Estoque';
    } else if (perfil === 'vendas') {
        roleName = 'Vendedor';
    }
    
    // Criar objeto de usuário
    const user = {
        email: email,
        name: email.split('@')[0].replace(/[^a-zA-Z]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
        role: roleName,
        id: Date.now().toString()
    };
    
    // Salvar no localStorage
    localStorage.setItem('elitecontrol_user', JSON.stringify(user));
    
    // Redirecionar para dashboard
    window.location.href = 'dashboard.html';
}

// Mostrar Erro de Login
function showLoginError(message) {
    const errorElement = document.getElementById('loginErrorMessage');
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.classList.remove('hidden');
        
        // Esconder após 5 segundos
        setTimeout(() => {
            errorElement.classList.add('hidden');
        }, 5000);
    }
}

// Manipulador de Logout
function handleLogout() {
    // Remover dados do usuário
    localStorage.removeItem('elitecontrol_user');
    
    // Redirecionar para login
    window.location.href = 'index.html';
}

// Inicializar Notificações
function initializeNotifications() {
    // Verificar se estamos na página de dashboard
    if (!document.getElementById('notificationCountBadge')) return;
    
    // Simular algumas notificações
    const notifications = [
        {
            id: 'notif1',
            title: 'Atualização do Sistema',
            message: 'O EliteControl foi atualizado para a versão mais recente.',
            time: 'Agora',
            read: false,
            type: 'info'
        },
        {
            id: 'notif2',
            title: 'Estoque Baixo',
            message: 'Alguns produtos estão com estoque abaixo do mínimo.',
            time: '2h atrás',
            read: false,
            type: 'warning'
        }
    ];
    
    // Salvar no localStorage se não existir
    if (!localStorage.getItem('elitecontrol_notifications')) {
        localStorage.setItem('elitecontrol_notifications', JSON.stringify(notifications));
    }
    
    // Atualizar UI de notificações
    updateNotificationsUI();
}

// Atualizar UI de Notificações
function updateNotificationsUI() {
    const notificationList = document.getElementById('notificationList');
    const notificationCountBadge = document.getElementById('notificationCountBadge');
    
    if (!notificationList || !notificationCountBadge) return;
    
    // Obter notificações do localStorage
    const notifications = JSON.parse(localStorage.getItem('elitecontrol_notifications') || '[]');
    
    // Contar não lidas
    const unreadCount = notifications.filter(n => !n.read).length;
    
    // Atualizar badge
    if (unreadCount > 0) {
        notificationCountBadge.textContent = unreadCount;
        notificationCountBadge.classList.remove('hidden');
    } else {
        notificationCountBadge.classList.add('hidden');
    }
    
    // Limpar lista
    notificationList.innerHTML = '';
    
    // Adicionar notificações à lista
    if (notifications.length === 0) {
        notificationList.innerHTML = '<div class="p-4 text-center text-slate-400">Nenhuma notificação.</div>';
    } else {
        notifications.forEach(notification => {
            const notificationItem = document.createElement('div');
            notificationItem.className = `notification-item ${notification.read ? '' : 'unread'}`;
            notificationItem.dataset.id = notification.id;
            
            notificationItem.innerHTML = `
                <div class="notification-item-header">
                    <div class="notification-item-title">${notification.title}</div>
                    <div class="notification-item-badge">${notification.type === 'info' ? 'Info' : notification.type === 'warning' ? 'Alerta' : 'Erro'}</div>
                </div>
                <div class="notification-item-message">${notification.message}</div>
                <div class="notification-item-footer">
                    <div class="notification-item-time">${notification.time}</div>
                    <div class="notification-item-action">${notification.read ? '' : 'Marcar como lida'}</div>
                </div>
            `;
            
            // Adicionar evento de clique para marcar como lida
            notificationItem.addEventListener('click', function() {
                markNotificationAsRead(notification.id);
            });
            
            notificationList.appendChild(notificationItem);
        });
    }
}

// Marcar Notificação como Lida
function markNotificationAsRead(id) {
    // Obter notificações do localStorage
    const notifications = JSON.parse(localStorage.getItem('elitecontrol_notifications') || '[]');
    
    // Encontrar e marcar como lida
    const updatedNotifications = notifications.map(n => {
        if (n.id === id) {
            return { ...n, read: true };
        }
        return n;
    });
    
    // Salvar no localStorage
    localStorage.setItem('elitecontrol_notifications', JSON.stringify(updatedNotifications));
    
    // Atualizar UI
    updateNotificationsUI();
}

// Marcar Todas Notificações como Lidas
function markAllNotificationsAsRead() {
    // Obter notificações do localStorage
    const notifications = JSON.parse(localStorage.getItem('elitecontrol_notifications') || '[]');
    
    // Marcar todas como lidas
    const updatedNotifications = notifications.map(n => ({ ...n, read: true }));
    
    // Salvar no localStorage
    localStorage.setItem('elitecontrol_notifications', JSON.stringify(updatedNotifications));
    
    // Atualizar UI
    updateNotificationsUI();
    
    // Fechar dropdown
    document.getElementById('notificationDropdown').classList.add('hidden');
}

// Inicializar Sidebar
function initializeSidebar() {
    // Verificar se estamos na página de dashboard
    if (!document.getElementById('navLinks')) return;
    
    // Obter usuário logado
    const currentUser = JSON.parse(localStorage.getItem('elitecontrol_user') || '{}');
    const role = currentUser.role || '';
    
    // Definir links com base no perfil
    let links = [];
    
    if (role === 'Dono/Gerente') {
        links = [
            { icon: 'fa-chart-line', text: 'Painel Geral', active: true },
            { icon: 'fa-box', text: 'Produtos' },
            { icon: 'fa-cash-register', text: 'Registrar Venda' },
            { icon: 'fa-history', text: 'Vendas (Hist/Rel)' },
            { icon: 'fa-file-alt', text: 'Rel. Gerenciais' },
            { icon: 'fa-robot', text: 'Inteligência IA' },
            { icon: 'fa-cog', text: 'Configurações' }
        ];
    } else if (role === 'Controlador de Estoque') {
        links = [
            { icon: 'fa-chart-line', text: 'Painel Estoque', active: true },
            { icon: 'fa-box', text: 'Produtos' },
            { icon: 'fa-truck', text: 'Fornecedores' },
            { icon: 'fa-dolly', text: 'Movimentações' },
            { icon: 'fa-file-alt', text: 'Relatórios' },
            { icon: 'fa-cog', text: 'Configurações' }
        ];
    } else if (role === 'Vendedor') {
        links = [
            { icon: 'fa-chart-line', text: 'Painel Vendas', active: true },
            { icon: 'fa-box', text: 'Produtos' },
            { icon: 'fa-cash-register', text: 'Registrar Venda' },
            { icon: 'fa-history', text: 'Minhas Vendas' },
            { icon: 'fa-user', text: 'Clientes' },
            { icon: 'fa-cog', text: 'Configurações' }
        ];
    }
    
    // Renderizar links
    const navLinks = document.getElementById('navLinks');
    navLinks.innerHTML = '';
    
    links.forEach(link => {
        const linkElement = document.createElement('a');
        linkElement.href = '#';
        linkElement.className = `nav-link ${link.active ? 'active' : ''}`;
        
        linkElement.innerHTML = `
            <i class="fas ${link.icon} nav-link-icon"></i>
            <span>${link.text}</span>
        `;
        
        navLinks.appendChild(linkElement);
    });
}

// Função para renderizar gráficos do dashboard
function renderDashboardMainCharts() {
    // Verificar se estamos na página de dashboard e se Chart.js está disponível
    if (!document.getElementById('salesChart') || typeof Chart === 'undefined') return;
    
    // Gráfico de Vendas
    const salesCtx = document.getElementById('salesChart').getContext('2d');
    const salesChart = new Chart(salesCtx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
            datasets: [{
                label: 'Vendas',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: 'rgba(56, 189, 248, 0.2)',
                borderColor: 'rgba(56, 189, 248, 1)',
                borderWidth: 2,
                tension: 0.4,
                pointBackgroundColor: 'rgba(56, 189, 248, 1)',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointRadius: 4,
                pointHoverRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                    labels: {
                        color: 'rgba(241, 245, 249, 0.8)'
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(51, 65, 85, 0.3)'
                    },
                    ticks: {
                        color: 'rgba(241, 245, 249, 0.8)'
                    }
                },
                x: {
                    grid: {
                        color: 'rgba(51, 65, 85, 0.3)'
                    },
                    ticks: {
                        color: 'rgba(241, 245, 249, 0.8)'
                    }
                }
            }
        }
    });
    
    // Gráfico de Produtos
    const productsCtx = document.getElementById('productsChart').getContext('2d');
    const productsChart = new Chart(productsCtx, {
        type: 'doughnut',
        data: {
            labels: ['Produto A', 'Produto B', 'Produto C', 'Produto D', 'Produto E'],
            datasets: [{
                data: [12, 19, 3, 5, 2],
                backgroundColor: [
                    'rgba(56, 189, 248, 0.8)',
                    'rgba(99, 102, 241, 0.8)',
                    'rgba(16, 185, 129, 0.8)',
                    'rgba(245, 158, 11, 0.8)',
                    'rgba(239, 68, 68, 0.8)'
                ],
                borderColor: [
                    'rgba(56, 189, 248, 1)',
                    'rgba(99, 102, 241, 1)',
                    'rgba(16, 185, 129, 1)',
                    'rgba(245, 158, 11, 1)',
                    'rgba(239, 68, 68, 1)'
                ],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'right',
                    labels: {
                        color: 'rgba(241, 245, 249, 0.8)',
                        padding: 20,
                        font: {
                            size: 12
                        }
                    }
                }
            },
            cutout: '65%'
        }
    });
}

// Mostrar Alerta Temporário
function showTemporaryAlert(message, type = 'info', duration = 4000) {
    const alertsContainer = document.getElementById('temporaryAlertsContainer');
    if (!alertsContainer) return;
    
    const alertId = `alert-${Date.now()}`;
    const alertDiv = document.createElement('div');
    alertDiv.id = alertId;
    alertDiv.className = `temporary-alert temporary-alert-${type}`;
    
    alertDiv.innerHTML = `
        <div class="temporary-alert-content">
            <i class="fas ${type === 'info' ? 'fa-info-circle' : type === 'success' ? 'fa-check-circle' : type === 'warning' ? 'fa-exclamation-triangle' : 'fa-times-circle'} temporary-alert-icon"></i>
            <span class="temporary-alert-message">${message}</span>
        </div>
        <button class="temporary-alert-close" onclick="this.parentElement.remove()">&times;</button>
    `;
    
    alertsContainer.appendChild(alertDiv);
    setTimeout(() => alertDiv.classList.add('show'), 10);
    
    setTimeout(() => {
        alertDiv.classList.remove('show');
        setTimeout(() => alertDiv.remove(), 500);
    }, duration);
}

// Funções de Utilidade
function formatCurrency(value) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(value);
}

function formatDate(date) {
    return new Intl.DateTimeFormat('pt-BR').format(new Date(date));
}

function formatDateTime(date) {
    return new Intl.DateTimeFormat('pt-BR', {
        dateStyle: 'short',
        timeStyle: 'short'
    }).format(new Date(date));
}
