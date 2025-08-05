# Instruções para Deploy na Vercel

## 📋 Pré-requisitos
- Conta na Vercel (https://vercel.com)
- Token de API do Mantis

## 🚀 Passos para Deploy

### 1. Preparação do Projeto
✅ **Já implementado**: Token da API foi movido para variáveis de ambiente
✅ **Já implementado**: Configuração de ambiente criada (`js/config.js`)

### 2. Upload do Projeto
1. Acesse https://vercel.com e faça login
2. Clique em "New Project"
3. Faça upload da pasta do projeto ou conecte com Git

### 3. Configuração das Variáveis de Ambiente
Na Vercel, vá para **Settings > Environment Variables** e adicione:

```
MANTIS_API_TOKEN = GjDoN1uca9IC6GiZUcidMS5aixv6d8lZ
MANTIS_BASE_URL = https://mantis.xcelis.com.br/mantis
DEBUG_MODE = false
```

### 4. Configuração de Build (se necessário)
A Vercel detectará automaticamente que é um projeto estático. Não são necessárias configurações especiais de build.

### 5. Acesso ao Projeto
Após o deploy, você poderá acessar seu projeto em:
- `https://seu-projeto.vercel.app/gestao-planejamento.html`

## 🔧 Desenvolvimento Local

Para desenvolvimento local, você pode:

1. **Opção 1**: Criar arquivo `.env.local`
```bash
cp .env.example .env.local
# Edite .env.local com seus valores
```

2. **Opção 2**: Usar localStorage (temporário)
```javascript
// No console do navegador:
localStorage.setItem('ENV_MANTIS_API_TOKEN', 'seu_token_aqui');
```

3. **Opção 3**: Definir variáveis globais
```javascript
// Adicione no início do HTML ou em um script separado:
window.ENV = {
    MANTIS_API_TOKEN: 'seu_token_aqui',
    MANTIS_BASE_URL: 'https://mantis.xcelis.com.br/mantis'
};
```

## 🔒 Segurança

### ✅ Implementado:
- Token movido para variáveis de ambiente
- Configuração centralizada em `config.js`
- Fallbacks seguros para desenvolvimento

### ⚠️ Importante:
- Nunca commite tokens em repositórios públicos
- Use as variáveis de ambiente da Vercel para produção
- O token ainda aparece como fallback no código para compatibilidade

## 🧪 Teste de CORS

Após o deploy, teste se as chamadas para a API do Mantis funcionam:

1. Abra o console do navegador
2. Verifique se há erros de CORS
3. Se houver problemas, pode ser necessário:
   - Configurar CORS no servidor Mantis
   - Usar um proxy/middleware (se necessário)

## 📁 Estrutura Final

```
projeto/
├── gestao-planejamento.html (arquivo principal)
├── css/
│   ├── styles.css
│   └── gestao-planejamento.css
├── js/
│   ├── config.js (✨ NOVO - configuração de ambiente)
│   ├── charts.js
│   ├── db.js
│   ├── gestao-planejamento.js (✨ ATUALIZADO - usa config)
│   └── utils.js
├── .env.example (✨ NOVO - exemplo de variáveis)
└── VERCEL_DEPLOY.md (✨ NOVO - este arquivo)
```

## 🎯 Funcionalidades Mantidas

Todas as funcionalidades continuam funcionando:
- ✅ Dashboard e gráficos
- ✅ Importação de CSV
- ✅ IndexedDB para armazenamento local
- ✅ Atualizações via API do Mantis
- ✅ Campo "Última atualização" automático
- ✅ Interface responsiva

## 🔍 Troubleshooting

### Problema: Token não encontrado
**Solução**: Verifique se as variáveis de ambiente estão configuradas corretamente na Vercel.

### Problema: Erro de CORS
**Solução**: 
1. Verifique se o servidor Mantis permite requisições do domínio da Vercel
2. Se necessário, configure CORS no servidor Mantis

### Problema: Funcionalidades não carregam
**Solução**: 
1. Verifique o console do navegador para erros
2. Confirme se todos os arquivos JS estão sendo carregados corretamente
