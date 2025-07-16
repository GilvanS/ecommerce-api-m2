### Desafio: Validar o Login com Dados Inválidos

O objetivo deste teste é garantir que o sistema lide de forma segura e informativa com tentativas de login que não deveriam ser bem-sucedidas.

**Técnicas Aplicáveis:**

- Partição de Equivalência
- Análise de Valor Limite

---

#### Cenários de Teste:

1.  **Utilizador Vazio, Senha Válida:**

    - **Passo 1:** Deixe o campo "Usuário" em branco.
    - **Passo 2:** Insira uma senha válida (ex: `Admin@123`).
    - **Resultado Esperado:** O sistema deve exibir uma mensagem de erro indicando que o campo de usuário é obrigatório, e o login não deve ser efetuado.

2.  **Utilizador Válido, Senha Incorreta:**

    - **Passo 1:** Insira um nome de usuário válido (ex: `admin`).
    - **Passo 2:** Insira uma senha que não corresponde à do usuário.
    - **Resultado Esperado:** O sistema deve exibir uma mensagem de "Credenciais inválidas."

3.  **Injeção de SQL Simples:**
    - **Passo 1:** No campo "Usuário", insira: `' OR '1'='1`.
    - **Passo 2:** No campo "Senha", insira: `' OR '1'='1`.
    - **Resultado Esperado:** O sistema deve tratar a entrada como texto normal e retornar "Credenciais inválidas.", sem causar erros no servidor ou conceder acesso não autorizado.
