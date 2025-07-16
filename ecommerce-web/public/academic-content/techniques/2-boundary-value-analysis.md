### Técnica: Análise de Valor Limite

A Análise de Valor Limite é uma técnica de teste que se foca em testar os "limites" ou "fronteiras" das partições de equivalência. A experiência mostra que muitos erros ocorrem nos limites dos dados de entrada.

**Exemplo Prático no Nosso E-commerce:**

Usando o mesmo campo de "Idade" (que aceita valores entre 18 e 99), os valores limite a serem testados seriam:

- **No limite inferior:**

  - `17` (inválido, logo abaixo do limite)
  - `18` (válido, exatamente no limite)
  - `19` (válido, logo acima do limite)

- **No limite superior:**
  - `98` (válido, logo abaixo do limite)
  - `99` (válido, exatamente no limite)
  - `100` (inválido, logo acima do limite)

Testar estes valores específicos tem uma probabilidade muito maior de encontrar bugs do que testar valores aleatórios no meio do intervalo, como 45 ou 60.
