## 📊 Tabela de Decisão (Decision Table)

---

### 🔍 Conceito

Tabela de Decisão é uma representação tabular de regras de negócio que modela combinações lógicas de condições e as ações esperadas. Muito úzil quando há interdependências entre entradas e comportamentos.

> "A Tabela de Decisão revela interações entre condições que são difíceis de perceber em texto narrativo."  
> — _O Princípio da Caixa-Preta_

---

### 🧠 Como Utilizar

1. Liste todas as **condições** envolvidas.
2. Determine as **possíveis combinações** dessas condições.
3. Associe **ações esperadas** para cada combinação.
4. Construa casos de teste baseados nas colunas da tabela.

---

### 💡 Exemplo Prático

**Funcionalidade:** Login

**Condições:**

- C1: Username preenchido?
- C2: Senha preenchida?
- C3: Username existe?
- C4: Senha está correta?

**Tabela de Decisão:**

- Cenário 1: ✅ Username preenchido, ✅ Senha preenchida, ✅ Usuário existe, ✅ Senha correta  
  → Resultado: **Login permitido**

- Cenário 2: ✅ Username preenchido, ✅ Senha preenchida, ✅ Usuário existe, ❌ Senha incorreta  
  → Resultado: **Erro: senha incorreta**

- Cenário 3: ✅ Username preenchido, ✅ Senha preenchida, ❌ Usuário inexistente  
  → Resultado: **Erro: usuário não existe**

- Cenário 4: ❌ Username não preenchido  
  → Resultado: **Erro: campo obrigatório**

- Cenário 5: ✅ Username preenchido, ❌ Senha não preenchida  
  → Resultado: **Erro: campo obrigatório**

---

### 🚀 Quando Utilizar

- Regras de negócio com múltiplas validações
- Formulários com dependências condicionais
- Casos onde há múltiplas combinações de entrada

---

### 📈 Benefícios

- Alta cobertura de lógica com poucos testes
- Visibilidade clara das regras
- Fundamenta automatização de testes baseados em lógica

---

### 📚 Referências

- _CTFL 4.0_ – Cap. 4.2.3
- _O Princípio da Caixa-Preta_ – Cap. 5
- _Agile Testing_ – Cap. 9
- _Explore It_ – Cap. 3
