# YouTube Playlist Player

PWA (Progressive Web App) para reproduzir playlists e vídeos do YouTube com interface mobile-first.

## Recursos

- ✅ Suporte para playlists do YouTube
- ✅ Suporte para vídeos individuais do YouTube
- ✅ Validação de URLs do YouTube
- ✅ Interface responsiva mobile-first
- ✅ Player com controles customizados
- ✅ Biblioteca temporária de vídeos (durante a sessão)
- ✅ PWA instalável
- ✅ Cache offline para thumbnails

## Pré-requisitos

- Node.js 18+ instalado
- Chave de API do YouTube Data API v3

## Configuração

### 1. Obter YouTube API Key

1. Acesse [Google Cloud Console](https://console.cloud.google.com/)
2. Crie um novo projeto ou selecione um existente
3. Ative a "YouTube Data API v3"
4. Vá para "Credenciais" → "Criar credenciais" → "API key"
5. Copie a chave gerada

### 2. Configurar Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```bash
VITE_YOUTUBE_API_KEY=sua_chave_api_aqui
```

### 3. Instalar Dependências

```bash
npm install
```

## Executar o Projeto

### Modo Desenvolvimento

```bash
npm run dev
```

O aplicativo estará disponível em `http://localhost:5173`

### Build de Produção

```bash
npm run build
```

### Preview da Build

```bash
npm run preview
```

## Como Usar

1. **Adicionar Playlist ou Vídeo**
   - Cole a URL de uma playlist ou vídeo do YouTube no campo de entrada
   - Clique em "Carregar"
   - Os vídeos aparecerão como thumbnails na tela

2. **Reproduzir Vídeo**
   - Clique em qualquer thumbnail para reproduzir o vídeo
   - Use os controles para pausar, parar, ou navegar entre vídeos

3. **Navegar entre Vídeos**
   - Use os botões "Anterior" e "Próximo" no player
   - Ou clique em "Parar" para voltar à biblioteca

4. **Adicionar Mais Vídeos**
   - Cole uma nova URL para adicionar mais vídeos à biblioteca
   - Os vídeos são acumulados durante a sessão
   - Duplicatas são automaticamente evitadas

## Tipos de URLs Suportadas

### Playlists
- `https://www.youtube.com/playlist?list=PLxxxxxx`
- `https://youtube.com/playlist?list=PLxxxxxx`

### Vídeos Individuais
- `https://www.youtube.com/watch?v=xxxxxxx`
- `https://youtu.be/xxxxxxx`
- `https://m.youtube.com/watch?v=xxxxxxx`

## Recursos PWA

### Instalação

Em dispositivos móveis ou desktop, você pode instalar o aplicativo:

1. Abra o site em um navegador compatível (Chrome, Edge, Safari)
2. Procure pelo botão "Instalar" ou "Adicionar à tela inicial"
3. Siga as instruções para instalar

### Ícones PWA

Para gerar os ícones necessários, você pode usar:

- [RealFaviconGenerator](https://realfavicongenerator.net/)
- Crie uma imagem 512x512px com o logo do aplicativo
- Gere todos os tamanhos necessários e coloque na pasta `public/icons/`

Tamanhos necessários:
- 72x72, 96x96, 128x128, 144x144, 152x152, 192x192, 384x384, 512x512

## Estrutura do Projeto

```
ensaio29jan/
├── public/
│   └── icons/              # Ícones PWA
├── src/
│   ├── components/
│   │   ├── ErrorMessage/   # Componente de erro
│   │   ├── PlaylistInput/  # Input de URL
│   │   ├── VideoGrid/      # Grid de thumbnails
│   │   └── VideoPlayer/    # Player de vídeo
│   ├── hooks/
│   │   ├── usePlaylist.js  # Hook para carregar playlists
│   │   └── useYouTubePlayer.js # Hook para controlar player
│   ├── services/
│   │   ├── youtubeApi.js   # Integração YouTube Data API
│   │   └── youtubePlayer.js # Integração IFrame Player API
│   ├── styles/
│   │   ├── global.css      # Estilos globais
│   │   └── variables.css   # Variáveis CSS
│   ├── App.jsx             # Componente principal
│   └── main.jsx            # Entrada da aplicação
├── .env                    # Variáveis de ambiente (não commitado)
├── .env.example            # Exemplo de variáveis
├── .gitignore
├── index.html
├── package.json
├── vite.config.js          # Configuração Vite + PWA
└── README.md
```

## Tecnologias Utilizadas

- **React 18** - Biblioteca UI
- **Vite 6** - Build tool e dev server
- **vite-plugin-pwa** - Suporte PWA
- **YouTube Data API v3** - Buscar informações de playlists/vídeos
- **YouTube IFrame Player API** - Reproduzir vídeos
- **CSS Modules** - Estilização com escopo

## Limitações

- **API Quotas**: YouTube Data API tem limite diário de 10.000 unidades
- **Dados Temporários**: Vídeos são armazenados apenas durante a sessão (sem localStorage)
- **HTTPS Necessário**: PWA funciona apenas em HTTPS (localhost ok para desenvolvimento)
- **Apenas YouTube**: Apenas URLs do YouTube são suportadas

## Validação de URLs

O aplicativo valida automaticamente as URLs:
- ✅ URLs do YouTube (youtube.com, youtu.be, m.youtube.com)
- ❌ URLs de outros domínios
- ❌ Links inválidos ou malformados

Mensagens de erro apropriadas são exibidas quando necessário.

## Troubleshooting

### Erro: "API Key do YouTube não configurada"
- Verifique se o arquivo `.env` existe na raiz do projeto
- Confirme que a variável `VITE_YOUTUBE_API_KEY` está definida
- Reinicie o servidor de desenvolvimento após criar o `.env`

### Erro: "URL inválida. Por favor, insira uma URL do YouTube válida"
- Verifique se a URL é do YouTube
- Confirme que a URL está completa e correta

### Erro: "Link do YouTube inválido"
- A URL é do YouTube mas não é uma playlist ou vídeo válido
- Verifique se a URL contém um ID de vídeo ou playlist

### Player não carrega
- Verifique sua conexão com a internet
- Confirme que o vídeo está disponível publicamente
- Alguns vídeos podem ter restrições de incorporação

## Deploy

### Vercel

```bash
npm install -g vercel
vercel
```

### Netlify

```bash
npm install -g netlify-cli
npm run build
netlify deploy --prod --dir=dist
```

Lembre-se de configurar as variáveis de ambiente no painel do serviço de hospedagem.

## Licença

Este projeto é livre para uso pessoal e educacional.

## Suporte

Para problemas ou dúvidas, abra uma issue no repositório do projeto.
