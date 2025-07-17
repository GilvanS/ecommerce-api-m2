## ✨ Condições de Teste - API

---

### 🔐 Autenticação e Usuários

🔗 [Swagger REST API Docs](http://localhost:3005/api-docs/)

- Validar que o registro falha se algum campo obrigatório estiver ausente.
- Validar que senhas fracas são rejeitadas conforme critérios (mín. 8 caracteres, 1 maiúscula, 1 número, 1 especial).
- Validar que o username duplicado retorna status 409.
- Validar que o login com usuário e senha corretos retorna token JWT válido.
- Validar que o login falha para credenciais incorretas ou ausentes.
- Validar que é possível recuperar o perfil com JWT válido.
- Validar que usuário admin não pode excluir a própria conta.
- Validar que não é possível excluir usuário com pedidos associados.
- Validar que a redefinição de senha por admin só é permitida para usuários comuns.
- Validar que a alteração de senha falha se a senha antiga estiver incorreta.

---

### 💼 Produtos e Categorias

- Validar que a criação de produto falha se campos obrigatórios estiverem ausentes.
- Validar que produtos com desconto inválido não gravam o campo `discount_price`.
- Validar que a atualização de produtos exige campos obrigatórios válidos.
- Validar que a exclusão de produto remove também dos favoritos e pedidos.
- Validar que é possível listar todos os produtos existentes.
- Validar que categorias podem ser criadas, listadas, editadas e excluídas.

---

### 🛒 Carrinho e Favoritos

- Validar que adicionar produto ao carrinho exige token e dados válidos.
- Validar que favoritos não duplicam produtos para o mesmo usuário.
- Validar que é possível listar e excluir favoritos de forma isolada.

---

### 📦 Pedidos

- Validar que pedidos com campos incompletos retornam erro `400 Bad Request`.
- Validar que pedido é rejeitado se qualquer produto do carrinho estiver sem estoque.
- Validar que o total do pedido considera o desconto do produto (se houver).
- Validar que o estoque é reduzido após finalização bem-sucedida.
- Validar que o histórico de pedidos traz todos os itens associados.

---

### ⚡ Validações Especiais

- Validar resposta 405 para métodos HTTP não permitidos.
- Validar mensagens de erro estruturadas em formato JSON padronizado.
- Validar consistência de tipos e estrutura de payloads (ex: campos nulos, strings vazias).
- Validar que todas as rotas protegidas falham sem token JWT válido.
- Validar status `401 Unauthorized` ao acessar endpoints sem autenticação.

---

### ⚖️ Cobertura de Segurança

- Testar roles admin vs. customer para acessos sensíveis.
- Validar logs de auditoria para exclusão e alteração de dados.
- Validar consistência no controle de permissão via middleware.
- Validar que dados sensíveis (ex: senha) nunca são retornados na resposta JSON.

---

> _Recomendado executar com suporte a ferramentas de teste automatizado (Postman/Newman, Jest, Supertest)._
