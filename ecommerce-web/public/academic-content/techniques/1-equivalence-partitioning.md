### Técnica: Partição de Equivalência

A Partição de Equivalência é uma técnica de teste de "caixa-preta" que envolve dividir os dados de entrada de uma aplicação em "partições" ou grupos de dados que se espera que sejam processados da mesma forma. Em vez de testar cada valor de entrada possível, você testa apenas um valor representativo de cada partição.

**Exemplo Prático no Nosso E-commerce:**

Imagine um campo de "Idade" no formulário de registo que só aceita utilizadores entre 18 e 99 anos.

- **Partição Válida:** Qualquer número entre 18 e 99 (ex: 25, 50, 80).
- **Partição Inválida (menor):** Qualquer número menor que 18 (ex: 17, 0, -5).
- **Partição Inválida (maior):** Qualquer número maior que 99 (ex: 100, 150).

Em vez de testar todas as idades de 0 a 200, você testaria apenas um valor de cada partição (por exemplo, 25, 17 e 100) para verificar se o sistema se comporta como esperado para cada grupo.
