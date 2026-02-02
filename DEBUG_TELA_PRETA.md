# Debug da Tela Preta

## Passos para Investigar

### 1. Reiniciar o Servidor

**MUITO IMPORTANTE**: Pare e reinicie o servidor:

```bash
# No terminal, pressione:
Ctrl + C

# Depois execute novamente:
npm run dev
```

### 2. Abrir o Console do Navegador

1. Abra o aplicativo no navegador (http://localhost:5173)
2. Pressione **F12** (ou Ctrl+Shift+I)
3. Clique na aba **"Console"**
4. Deixe o console aberto

### 3. Testar um Vídeo

1. Cole esta URL de teste:
   ```
   https://www.youtube.com/watch?v=jNQXAC9IVRw
   ```

2. Clique em "Carregar"

3. Clique no thumbnail para reproduzir

### 4. Verificar os Logs no Console

Você deve ver mensagens como:
```
Iniciando player para vídeo: jNQXAC9IVRw
API do YouTube carregada
Elemento #youtube-player: <div id="youtube-player">
Player criado: [objeto]
Player pronto!
Estado do player mudou: 1
```

### 5. Me informe o que aparece

Por favor, me diga:

1. **Quais mensagens aparecem no console?**
   - Copie e cole todas as mensagens

2. **Aparecem erros em vermelho?**
   - Se sim, copie o texto dos erros

3. **O elemento #youtube-player é encontrado?**
   - Veja se aparece `Elemento #youtube-player: <div id="youtube-player">`

4. **Você vê o iframe sendo criado?**
   - Na aba "Elements" (F12), procure por `<div id="youtube-player">`
   - Veja se dentro dele há um `<iframe>`

### 6. Inspecionar o Elemento

1. Com F12 aberto, vá na aba **"Elements"** (ou "Elementos")
2. Pressione **Ctrl+F** para abrir a busca
3. Digite: `youtube-player`
4. Veja o que encontra

**O que deve aparecer:**
```html
<div id="youtube-player">
  <iframe ... width="100%" height="100%">
</div>
```

### 7. Verificar Estilos CSS

Na aba "Elements", com o `<div id="youtube-player">` selecionado:
1. Olhe o painel direito "Styles"
2. Verifique se há:
   - `width: 100%`
   - `height: 100%`
   - `position: absolute`

### 8. Teste Alternativo - Player com Controles

Vou criar uma versão de teste simplificada. Se você me disser o que aparece no console, posso ajustar melhor.

## Possíveis Problemas

### A) Console mostra erro
→ Me envie o erro exato

### B) Elemento #youtube-player não é encontrado
→ Problema de timing na criação do elemento

### C) iframe não aparece dentro do div
→ YouTube não está criando o player

### D) iframe existe mas está com dimensões 0x0
→ Problema de CSS

### E) Nenhum log aparece
→ Servidor não foi reiniciado corretamente

## Próximo Passo

Depois que você verificar o console e me informar o que vê, posso fazer ajustes mais específicos!
