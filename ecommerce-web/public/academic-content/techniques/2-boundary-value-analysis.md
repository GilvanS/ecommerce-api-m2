## 🌐 Análise de Valor Limite (Boundary Value Analysis - BVA)

---

### 🔍 Conceito

A Análise de Valor Limite é uma técnica de projeto de casos de teste que foca nos extremos dos intervalos de entrada, onde há maior propensão para falhas.

> "Os defeitos tendem a ocorrer nos extremos dos intervalos de dados válidos e inválidos."  
> — _CTFL 4.0 – ISTQB Syllabus_

---

### 🔮 Fundamento

Complementa a **Partição de Equivalência**, visando os valores:

- Limite inferior inválido (**L-1**)
- Limite inferior (**L**)
- Um acima do limite inferior (**L+1**)
- Um abaixo do limite superior (**U-1**)
- Limite superior (**U**)
- Limite superior inválido (**U+1**)

---

### 💡 Exemplo Prático

**Campo:** Idade permitida entre 18 e 99

- Valor: `17` → Tipo: L-1 (inválido) → Esperado: Rejeitar
- Valor: `18` → Tipo: L (limite inferior válido) → Esperado: Aceitar
- Valor: `19` → Tipo: L+1 → Esperado: Aceitar
- Valor: `98` → Tipo: U-1 → Esperado: Aceitar
- Valor: `99` → Tipo: U (limite superior válido) → Esperado: Aceitar
- Valor: `100` → Tipo: U+1 (inválido) → Esperado: Rejeitar

---

### 🚀 Quando Usar

- Validações numéricas (idade, preço, quantidade)
- Campos com comprimento fixo (senha, nome)
- Intervalos conhecidos (datas, CEP, CPF)

---

### 📊 Benefícios

- Detecta falhas com alto retorno de investimento
- Reduz quantidade de testes com foco em risco
- Simples de aplicar e auditar

---

### 📚 Referências

- _CTFL 4.0_ – Cap. 4.2
- _O Princípio da Caixa-Preta_ – Cap. 6, Matthew S.
- _Code Complete_ – Cap. 11, Steve McConnell
- _Agile Testing_ – Crispin & Gregory
- _Explore It_ – Elisabeth Hendrickson
