## 🚩 Estratégias de Automação de Testes

---

Com base nas condições de teste existente nos Desafios Práticos, juntamente das Técnicas de Teste, elabore checagens automatizadas se baseando nas recomendações abaixo.

---

### 👀 O que Automatizar?

#### ✅ Automatizar:

- Funcionalidades estáveis e regressões frequentes
- Testes repetitivos ou com alta demanda manual
- Validações determinísticas (login, cálculo, integrações)
- Smoke tests e testes de integração
- Testes de APIs e contratuais

#### ❌ Não Automatizar:

- Testes exploratórios
- Funcionalidades instáveis ou em constante redesign
- Verificações estéticas e subjetivas (UX/UI)
- Casos com alto custo de manutenção e baixo valor de retorno

---

### 🧐 Estratégias Recomendadas

#### 1. Pirâmide de Testes

- **Base:** Testes Unitários (muitos, rápidos, confiáveis)
- **Meio:** Testes de Integração e API
- **Topo:** Testes E2E na UI (poucos, bem segmentados)

#### 2. Automação Just-in-Time

- Criar os testes no mesmo sprint da funcionalidade
- Incluído na _Definition of Done_

#### 3. Automação Guiada por Risco

- Prioriza testes de maior impacto (matriz risco x freq.)

#### 4. Testes de Contrato

- Validação entre microserviços com ferramentas como Pact

#### 5. Uso de Mocks e Dados Sintéticos

- Simula dependências externas para estabilidade e velocidade

---

### 📊 Como Decidir o Que Automatizar?

- **Executado frequentemente:** deve ser automatizado.
- **Difícil de testar manualmente:** é um forte candidato à automação.
- **Funcionalidade muito instável:** não deve ser automatizada até estabilizar.
- **Testes que envolvem interação humana ou visual subjetiva:** geralmente não devem ser automatizados.
- **Cenários com alto impacto em caso de falha:** devem ser automatizados para garantir cobertura.
- **Casos com baixo valor de retorno:** devem ser evitados na automação.

---

### 📖 Referências

- _Agile Testing_ – Lisa Crispin & Janet Gregory
- _Explore It_ – Elisabeth Hendrickson
- _Lessons Learned in Software Testing_ – Kaner, Bach, Pettichord
- _CTFL 4.0_ – Cap. 2.4.2
- _TMMi_ – Test Maturity Model Integration
