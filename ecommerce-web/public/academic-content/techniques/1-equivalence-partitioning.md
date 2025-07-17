## 🌐 Partição de Equivalência (Equivalence Partitioning)

---

### 🔍 Conceito

A Partição de Equivalência é uma técnica de projeto de testes que consiste em dividir o espaço de entradas de um sistema em conjuntos de dados (partições) que são tratados de forma equivalente pelo sistema.

> "Se um teste passar para um valor de uma partilhão, assume-se que todos os outros valores da mesma partilhão produzirão o mesmo resultado."  
> — _ISTQB CTFL 4.0_

---

### 🔮 Como Utilizar

1. Identifique os domínios de entrada do sistema.
2. Separe os valores de entrada em:
   - Partições Válidas (dados esperados e aceitos pelo sistema)
   - Partições Inválidas (dados fora do esperado, devem ser rejeitados)
3. Escolha pelo menos um valor representativo para cada partilhão.

---

### 💡 Exemplo Prático

**Campo:** Idade permitida entre 18 e 99

- Partição Válida: `18 a 99`  
  Exemplo de valor: `30` → Esperado: Aceitar

- Partição Inválida A: `<18`  
  Exemplo de valor: `15` → Esperado: Rejeitar

- Partição Inválida B: `>99`  
  Exemplo de valor: `120` → Esperado: Rejeitar

- Partição Inválida C: não numérica  
  Exemplo de valor: `"abc"` → Esperado: Rejeitar

---

### 🚀 Quando Aplicar

- Validações numéricas
- Validação de formatos (e-mail, CPF, etc.)
- Campos com domínios fixos (ex: sexo = M/F/O)

---

### 📊 Benefícios

- Redução de redundância de testes
- Cobertura eficiente do comportamento
- Facilidade de aplicação em testes manuais e automatizados

---

### 📚 Referências

- _CTFL 4.0_ – Cap. 4.2.1
- _O Princípio da Caixa-Preta_ – Matthew S.
- _Code Complete_ – Cap. 11, Steve McConnell
- _Agile Testing_ – Crispin & Gregory
