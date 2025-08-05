// Configuração de ambiente para o projeto
// Este arquivo gerencia as variáveis de ambiente de forma segura

class Config {
    constructor() {
        // Token da API do Mantis - será obtido das variáveis de ambiente
        this.MANTIS_API_TOKEN = this.getEnvVar('MANTIS_API_TOKEN', 'GjDoN1uca9IC6GiZUcidMS5aixv6d8lZ');
        
        // URLs da API do Mantis
        this.MANTIS_BASE_URL = this.getEnvVar('MANTIS_BASE_URL', 'https://mantis.xcelis.com.br/mantis');
        
        // Outras configurações que podem ser úteis
        this.DEBUG_MODE = this.getEnvVar('DEBUG_MODE', 'false') === 'true';
    }

    /**
     * Obtém uma variável de ambiente com fallback
     * @param {string} key - Nome da variável de ambiente
     * @param {string} defaultValue - Valor padrão se a variável não existir
     * @returns {string} - Valor da variável
     */
    getEnvVar(key, defaultValue = '') {
        // Em ambiente de produção (Vercel), as variáveis estarão disponíveis
        if (typeof process !== 'undefined' && process.env && process.env[key]) {
            return process.env[key];
        }
        
        // Em desenvolvimento local, pode usar variáveis globais ou localStorage
        if (typeof window !== 'undefined') {
            // Verifica se existe uma variável global definida
            if (window.ENV && window.ENV[key]) {
                return window.ENV[key];
            }
            
            // Como fallback, usa localStorage (apenas para desenvolvimento)
            const localValue = localStorage.getItem(`ENV_${key}`);
            if (localValue) {
                return localValue;
            }
        }
        
        // Retorna o valor padrão
        return defaultValue;
    }

    /**
     * Obtém a URL completa da API do Mantis
     * @param {string} endpoint - Endpoint da API
     * @returns {string} - URL completa
     */
    getMantisApiUrl(endpoint) {
        return `${this.MANTIS_BASE_URL}/api/rest/${endpoint}`;
    }

    /**
     * Obtém a URL de visualização de um ticket
     * @param {string} ticketId - ID do ticket
     * @returns {string} - URL de visualização
     */
    getMantisViewUrl(ticketId) {
        return `${this.MANTIS_BASE_URL}/view.php?id=${ticketId}`;
    }

    /**
     * Verifica se está em modo de desenvolvimento
     * @returns {boolean}
     */
    isDevelopment() {
        return this.DEBUG_MODE || (typeof window !== 'undefined' && window.location.hostname === 'localhost');
    }

    /**
     * Log de debug (apenas em modo de desenvolvimento)
     * @param {...any} args - Argumentos para o log
     */
    debugLog(...args) {
        if (this.isDevelopment()) {
            console.log('[DEBUG]', ...args);
        }
    }
}

// Instância singleton da configuração
const config = new Config();

// Exporta a configuração para uso em outros arquivos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = config;
} else if (typeof window !== 'undefined') {
    window.AppConfig = config;
}
