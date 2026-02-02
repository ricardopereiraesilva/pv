# Guia Rápido de Início

## Passos para Configurar e Executar

### 1. Obter API Key do YouTube

**Importante**: Você precisa de uma chave de API do YouTube para o aplicativo funcionar.

1. Acesse: https://console.cloud.google.com/
2. Clique em "Criar Projeto" (ou selecione um existente)
3. No menu lateral, vá em "APIs e serviços" → "Biblioteca"
4. Procure por "YouTube Data API v3" e clique em "Ativar"
5. Vá em "Credenciais" → "Criar credenciais" → "API key"
6. Copie a chave gerada

### 2. Configurar o Projeto

```bash
# 1. Criar arquivo .env na raiz do projeto
# No Windows (PowerShell):
New-Item -Path .env -ItemType File

# No Windows (CMD):
type nul > .env

# No Linux/Mac:
touch .env
```

**Edite o arquivo .env e adicione:**
```
VITE_YOUTUBE_API_KEY=SUA_CHAVE_API_AQUI
```

### 3. Instalar Dependências

```bash
npm install
```

### 4. Executar o Projeto

```bash
npm run dev
```

O aplicativo abrirá em: http://localhost:5173

## Testando o Aplicativo

### URLs de Teste

**Playlist:**
```
https://www.youtube.com/playlist?list=PLrAXtmErZgOeiKm4sgNOknGvNjby9efdf
```

**Vídeo Individual:**
```
https://www.youtube.com/watch?v=dQw4w9WgXcQ
```

ou

```
https://youtu.be/dQw4w9WgXcQ
```

### Fluxo de Teste

1. Cole uma URL no campo de entrada
2. Clique em "Carregar"
3. Veja os thumbnails aparecerem
4. Clique em um thumbnail para reproduzir
5. Use os controles para navegar
6. Clique em "Parar" para voltar à biblioteca
7. Adicione mais URLs para acumular vídeos

## Validações Implementadas

- ✅ Apenas URLs do YouTube são aceitas
- ✅ URLs de outros sites geram erro
- ✅ Links malformados geram erro
- ✅ Vídeos e playlists inválidos geram erro
- ✅ Duplicatas são automaticamente evitadas

## Problemas Comuns

### "API Key do YouTube não configurada"
→ Verifique se o arquivo `.env` existe e contém a chave correta

### "URL inválida"
→ Use apenas URLs do YouTube (youtube.com ou youtu.be)

### Vídeos não carregam
→ Verifique sua conexão com internet e se o vídeo é público

## Próximos Passos

1. **Gerar Ícones PWA**
   - Use https://realfavicongenerator.net/
   - Coloque os ícones em `public/icons/`

2. **Build para Produção**
   ```bash
   npm run build
   npm run preview
   ```

3. **Deploy**
   - Vercel, Netlify, ou outro serviço
   - Configure a variável `VITE_YOUTUBE_API_KEY` no painel

## Recursos

- [Documentação React](https://react.dev)
- [Documentação Vite](https://vitejs.dev)
- [YouTube Data API](https://developers.google.com/youtube/v3)
- [YouTube IFrame Player API](https://developers.google.com/youtube/iframe_api_reference)

Divirta-se! 🎵🎥
