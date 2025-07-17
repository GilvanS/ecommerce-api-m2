## 🔧 Técnicas de Teste (CTFL 4.0)

---

### 🔄 Teste de Transição de Estado

**Objetivo:** Validar o comportamento de um sistema em diferentes estados e transições provocadas por eventos.

**Exemplo:** Sistema de login com 3 tentativas:

- Estado inicial: "Aguardando Login"
- Evento: Tentativa incorreta → Transição para "Tentativa 1"
- Após 3 falhas → Transição para "Conta Bloqueada"

**Testes:**

- Login bem-sucedido na 1ª tentativa
- 3 tentativas falhas levam ao bloqueio
- Tentativa após bloqueio gera erro "Usuário Bloqueado"

---

### 📑 Teste Baseado em Requisitos

**Objetivo:** Derivar testes diretamente de requisitos documentados.

**Exemplo:** Requisito: "Senha deve conter ao menos 8 caracteres, 1 maiúscula e 1 número"

**Testes:**

- Senha "abc123" → Rejeitada (sem maiúscula)
- Senha "Abcdefgh" → Rejeitada (sem número)
- Senha "Abc12345" → Aceita

---

### ✅ Teste por Checklist / Intuição

**Objetivo:** Utilizar listas de verificação e conhecimento prévio para descobrir falhas comuns.

**Exemplo:**

- Links quebrados
- Campos obrigatórios sem validação
- Mensagens genéricas em falhas de API

---

### 📚 Referências

- _CTFL 4.0_ – Cap. 4.2, 4.3, 4.4
- _O Princípio da Caixa-Preta_ – Cap. 4 e 5
- _Explore It_ – Elisabeth Hendrickson
- _Agile Testing_ – Lisa Crispin e Janet Gregory
