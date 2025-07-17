## 🌐 Condições de Teste - Web

---

### 👤 Registro e Login

- Validar que o formulário de registro valida todos os campos e critérios de senha.
- Validar exibição de mensagens de erro por campo inválido.
- Validar que usuário é redirecionado após login com sucesso.
- Validar que login inválido exibe feedback de erro.

---

### 📅 Página de Perfil

- Validar que os dados do perfil são carregados corretamente.
- Validar a formatação da data de "membro desde".
- Validar alteração de senha com critérios válidos.
- Validar mensagens de erro para senhas inválidas ou divergentes.

---

### 🌐 Página Inicial e Produtos

- Validar carregamento da primeira página com produtos recentes.
- Validar funcionamento da paginação.
- Validar carrossel com produtos "novos", "tendência" e "mais avaliados".
- Validar redirecionamento para página de detalhes ao clicar em produto.

---

### 📝 Detalhes do Produto

- Validar exibição correta de nome, descrição, imagem, preço original e com desconto.
- Validar seletor de quantidade respeita limites (mín. 1, máx. estoque).
- Validar adição ao carrinho com quantidade escolhida.

---

### 🛋️ Categorias

- Validar exibição e expansão da sidebar de categorias.
- Validar listagem de produtos por categoria.
- Validar redirecionamento correto entre páginas.

---

### 🛒 Carrinho

- Validar cálculo do subtotal considerando descontos.
- Validar remoção de itens.
- Validar alteração de quantidades.
- Validar mensagens de toast ao alterar o carrinho.

---

### 🌟 Checkout

- Validar que o botão de pagamento só é habilitado com campos válidos.
- Validar formatação e validação de CPF e CEP.
- Validar número e validade do cartão com base no algoritmo de Luhn.
- Validar falha no checkout se estoque mudar no backend.

---

### 🎉 Sucesso e Histórico

- Validar redirecionamento para página de sucesso após compra.
- Validar exibição de todos os pedidos do usuário na tela de histórico.

---

### 📈 Painel Administrativo

- Validar criação, edição e exclusão de produtos, usuários e categorias.
- Validar que usuários comuns não acessam o painel admin.
- Validar que admin não redefine senha de outro admin.
- Validar paginação funcional em todas as abas.
- Validar logs e mensagens em operações críticas.

---

> _Todos os testes devem considerar o comportamento esperado em dispositivos móveis e navegadores modernos._
