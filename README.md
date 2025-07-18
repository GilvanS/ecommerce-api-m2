<div align="center">
  <img src="https://i.imgur.com/your-logo-image-url.png" alt="Merqado Logo" width="150"/>
  <h1>Projeto Merqado - API & Web</h1>
  <p>
    <strong>Bem-vindo ao ecossistema Merqado!</strong> Este repositório contém a API robusta e a interface web moderna que compõem a nossa plataforma de e-commerce.
  </p>
  <p>
    <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js"/>
    <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React"/>
    <img src="https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white" alt="MySQL"/>
    <img src="https://img.shields.io/badge/GraphQL-E10098?style=for-the-badge&logo=graphql&logoColor=white" alt="GraphQL"/>
    <img src="https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=black" alt="Swagger"/>
  </p>
</div>

## 🚀 Jornada de Configuração: Do Clone à Execução

Este guia irá orientá-lo em todos os passos necessários para configurar e executar o ambiente de desenvolvimento completo do Merqado na sua máquina local.

### Índice

- [🚀 Jornada de Configuração: Do Clone à Execução](#-jornada-de-configuração-do-clone-à-execução)
  - [Índice](#índice)
  - [1. 🌍 Clonando o Universo Merqado](#1--clonando-o-universo-merqado)
  - [2. 🧩 Instalando as Peças (Dependências)](#2--instalando-as-peças-dependências)
  - [3. 🏛️ Construindo a Fundação (Banco de Dados)](#3-️-construindo-a-fundação-banco-de-dados)
  - [4. 🔑 Configurando os Segredos (.env)](#4--configurando-os-segredos-env)
  - [5. 💡 Dando Vida ao Projeto (Iniciando)](#5--dando-vida-ao-projeto-iniciando)
  - [6. 🧭 Navegando pelo Ecossistema](#6--navegando-pelo-ecossistema)
  - [7. 👤 Acesso de Administrador](#7--acesso-de-administrador)

---

### 1. 🌍 Clonando o Universo Merqado

Para começar a sua jornada, clone este repositório para a sua máquina local utilizando o seu terminal.

```bash
git clone [https://github.com/chriscsantosqa/ecommerce-api-m2.git](https://github.com/chriscsantosqa/ecommerce-api-m2.git)
cd ecommerce-api-m2
```

### 2. 🧩 Instalando as Peças (Dependências)

O projeto é dividido em duas partes principais: a API e a Interface Web. Ambas precisam ter as suas dependências instaladas.

**Instalando as dependências da API:**

```bash
cd ecommerce-api
npm install
```

**Instalando as dependências da Interface Web:**

```bash
# A partir da pasta raiz (ecommerce-api-m2)
cd ecommerce-web
npm install
```

### 3. 🏛️ Construindo a Fundação (Banco de Dados)

A nossa API precisa de um banco de dados MySQL para funcionar. O script fornecido irá criar toda a estrutura de tabelas e inserir os dados iniciais necessários.

**Pré-requisito:** Certifique-se de que tem um servidor MySQL a correr na sua máquina.

**Executando o script:**
Este comando irá apagar e recriar o banco de dados `ecommerce_cart_db`. Execute-o a partir da pasta `ecommerce-api`.

```bash
# Certifique-se de que está na pasta `ecommerce-api`
mysql --host=localhost --user=userdb --password=senhadb ecommerce_cart_db < src/scripts/ecommerce-db.sql
```

> **Nota:** Os dados de utilizador (`userdb`) e senha (`senhadb`) devem corresponder aos que você irá configurar no passo seguinte.

### 4. 🔑 Configurando os Segredos (.env)

As chaves de API, credenciais de banco de dados e outras configurações sensíveis são geridas através de variáveis de ambiente.

**1. Crie o ficheiro de configuração:**
Na raiz da pasta `ecommerce-api`, crie um ficheiro chamado `.env`.

**2. Copie e cole o conteúdo abaixo** para dentro do seu novo ficheiro `.env` e substitua os valores conforme necessário.

```ini
# Configuração do Servidor
PORT=3005

# Credenciais do Banco de Dados
DB_HOST=localhost
DB_USER=userdb
DB_PASSWORD=senhadb
DB_NAME=ecommerce_cart_db

# Segredo para Tokens JWT (use um gerador de chaves seguras)
JWT_SECRET="seu_segredo_super_secreto_para_jwt"

# Configuração de E-mail (exemplo com Gmail)
MAIL_HOST=smtp.gmail.com
MAIL_PORT=465
MAIL_SECURE=true
MAIL_USER=seu-email@gmail.com
MAIL_PASS=sua_senha_de_app_de_16_digitos

# Chave de API para o serviço interno de testes (use um gerador de chaves seguras)
INTERNAL_API_KEY="sua_chave_secreta_para_o_servico_de_testes"
```

**Para o projeto Web (`ecommerce-web`):**
Crie um ficheiro `.env` na raiz da pasta `ecommerce-web` para especificar a URL da API.

```ini
# ecommerce-web/.env
REACT_APP_API_URL=http://localhost:3005
```

### 5. 💡 Dando Vida ao Projeto (Iniciando)

Com tudo configurado, é hora de iniciar os dois serviços. Lembre-se de executar cada comando num terminal separado.

**Iniciando a API (a partir da pasta `ecommerce-api`):**

```bash
npm start
```

O `nodemon` irá iniciar o servidor e vigiará as alterações nos ficheiros.

**Iniciando a Interface Web (a partir da pasta `ecommerce-web`):**

```bash
npm start
```

A aplicação React será iniciada e abrirá automaticamente no seu navegador.

### 6. 🧭 Navegando pelo Ecossistema

Após iniciar os projetos, aqui estão os seus pontos de acesso:

- **Interface Web (Loja):**

  - [http://localhost:3000](http://localhost:3000)

- **Documentação da API (Swagger):**

  - [http://localhost:3005/api-docs](http://localhost:3005/api-docs)

- **Playground do GraphQL:**
  - Aceda a [http://localhost:3005/graphql](http://localhost:3005/graphql) no seu navegador ou use um cliente de API como o Insomnia/Postman.

### 7. 👤 Acesso de Administrador

Para aceder à área administrativa do site e testar todas as funcionalidades, utilize as credenciais de administrador padrão que foram inseridas pelo script do banco de dados:

- **Utilizador:** `admin`
- **Senha:** `Admin@123`

---

<div align="center">
  <strong>Feito! Agora você está pronto para explorar e desenvolver no universo Merqado. Boas codificações!</strong>
</div>
