<p align="center">

  ![Sollarium banner.](/banner_sollarium.jpg "Sollarium banner")

</p>

<h1 align="center">
Sollarium ERP - Community Edition
</h1>



<h3 align="center">
Seu sistema ERP, open-core, para crescimento empresarial.
</h3>


<div align="center">

![License](https://img.shields.io/badge/license-AGPL%203.0-blue.svg)
![Node](https://img.shields.io/badge/Node.js-v24-43853d)
![React](https://img.shields.io/badge/React-19-61dafb)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-17-336791)
![Redis](https://img.shields.io/badge/Redis-Cache-red)
![Docker](https://img.shields.io/badge/Docker-Ready-2496ED)

</div>

<hr style="height: 1px;">
<br>

## Sollarium ERP
<span>A versão community do sistema de ERP Sollarium é 100% gratuita e idicada para pequenas empresas focadas em um controle empresarial intuitivo, adaptado para os padrões e tecnologias atualmente presentes no mercado e com sua propria infraestrutura montada, fazendo com que acompanhem a sua tão desejada evolução empresarial.</span>

## Motivação e descrição do sistema
<span>Um sistema de ERP é uma ferramenta que pode escalar o controle empresarial, o que acaba sendo essencial para o bom ecosistema de uma emrpesade qualquer porte.</span><br>
<span>Pensando nisso, cheguei a conclusão de que a construção de um sistema ERP acessivel apra pequenas empresas poderia ajudar até mesmo empreendedores a começar seu próprio negócio, sem a necessidade de uma contratação de um sistema ERP, o que incialmente, é um investimento relativamente pesado, deixando toda a carga das decisões financeiras para a carreira empresarial e é ai que nossa versão community do Sollarium entra em ação.</span><br>
<span>Para a versão community do sistema, disponibilizamos uma forma para que desenvolvedores internos da sua empresa possam desenvolver modulos compativeis com o sistema, trazendo um dinamismo melhor e mais adequado para a sua empresa, necessitando apenas que os colaboradores envolvidos tenham noções de programação e setup de servidores pois é altamente indicado um load balancer para o uso deste sistema.</span>

## Módulos
<span>O sistema é baseado em modularização de funções e departamentos para sua emrpesa, contemplando alguns modulos necessários para o inicio de um sistema ERP, como os listados abaixo.</span><br>
<span>Vale notar que, muitos destes módulos ainda estão em desenvolvimento, marcados com a tag <span style="color: blue; font-weight: 600;">[WIP]</span> para os módulos em desenvolvimento e <span style="color: red; font-weight: 600;">[New]</span> para os módulos recém desenvolvidos e liberados para o uso.</span><br><br>
<ul>
  <li><b><span style="color: blue; font-weight: 600;">[WIP]</span> Compras:</b> Um módulo desenhado para realização de compras destinadas a empresa, com geração de documentação completa desde o pedido até o processamento da NF enviada pelo fornecedor.</li>
  <li><b><span style="color: blue; font-weight: 600;">[WIP]</span> Financeiro:</b> Um módulo desenhado para o controle financeiro completo da sua empresa, contemplando o contas a pagar, contas a receber, um módulo d efaturamento imbutido em todos os módulos com calculos de impostos emissão de documentos e geração de guias, um crm para demonstrativos financeiros e análises, fluxo de caixa e conciliação bancária para integração com bancos da sua empresa.</li>
  <li><b><span style="color: blue; font-weight: 600;">[WIP]</span> Inventário:</b> Um módulo desenhado para o controle completo de estoque com criação de armazéns com diferentes localizações e configurações para cada um deles, com um controle de estoque detalhando por onde, quando e da onde as mercadorias estão vindo, como foram transitadas, uma auditoria de mudanças e muitas outras informações de controle de ativos.</li>
  <li><b><span style="color: blue; font-weight: 600;">[WIP]</span> CRM:</b> Um módulo desenhado para o acompanhamento detalhado do ERP, com funil de vendas para controle e anaçise de vendas em andamento, reuniões comerciais a serem feitas seus calendários, conversas com clientes e históricos de informações, automações e visualização de tarefas, sistema de pós venda e sistema de suporte para os clientes estabelecidos.</li>
  <li><b><span style="color: blue; font-weight: 600;">[WIP]</span> Recursos Humanos:</b> Um módulo focado em todo o ciclo de vida do colaborador, como cadastros de colaboradores, departamentos, funções, controle de folhas de pagamento e gestão de talentos.</li>
</ul>

<br>

<div style="font-size: 20px; font-weight: 600; margin-bottom: 7px;">
  Tecnologías
</div>
<hr style="height: 1px; margin-top: 0px; margin-bottom: 7px;">
<ul>
  <li><b>React:</b> A famosa biblioteca da META esta sendo utilizada para realização deste projeto, trazendo uma facilidade de desenvolvimento para a versão community do Sollarium, e uma compatibilidade enorme com outros navegadores e dispositivos.</li>
  <li><b>Node.js:</b> Para uma melhor facilidade de desenvolvimento para a versão community, estamos usando a versao 24 do node para o desenvolvimento do sistema de API privada do sistema.</li>
  <li><b>Fastify:</b> Uma das melhores frameworks para a criação de APIs restful indicadas para servidores de API utilizando node.js, trazendo agilidade nas requisições e um body-parser robusto imbutido.</li>
  <li><b>Knex / PostgreSQL:</b> Utilizamos o knex, um query builder em conjuunto com o PostgreSQL, que é um dos mais utilizados dentre os bancos de dados destinados a sistemas empresariais.</li>
  <li><b>Redis:</b> Utilizamos o redis para mantermos a agilidade do sistema e um sistema de cache robusto, deixando as respostas da API mais rapida e consumindo menos recursos de hardware em consultas SQL.</li>
  <li><b>Docker:</b> É necessario a utilização do Docker para realização de atualizações automáticas com CI/CD, mantendo também as boas praticas de utilização de containers, preparadas para utilização em produção.</li>
</ul>

<br>

## Diagramas de comunicações e segurança

<details open>
<summary><b>Token CSRF</b></summary>
<span>Este token é utilizado para validação do cliente e enviado a cada requisição para o backend em chamadas mutáveis como protocolos POST. É gerado um cookie, não httpOnly, para ser gravado em um header custom chamado X-CSRF-Token evitando ataques de Double Submit Cookie.</span>

```mermaid
sequenceDiagram
    autonumber
    actor Vitima as Vítima (Navegador)
    participant ERP as ERP Confiável<br/>(Ex: tenant.sollarium.com)
    participant Hacker as Site Malicioso<br/>(Ex: tenant.solIarium.com)

    %% --- FASE 1 ---
    rect rgb(240, 245, 255)
        Note over Vitima, ERP: FASE 1: Estabelecendo a Sessão Legítima
        Vitima->>ERP: Faz login com usuário e senha
        ERP-->>Vitima: Valida credenciais e envia Cookie de Sessão
        Note left of Vitima: Cookie fica guardado<br/>na memória do navegador
    end

    %% --- FASE 2 ---
    rect rgb(255, 248, 240)
        Note over Vitima, Hacker: FASE 2: A Armadilha (Acesso ao site terceiro)
        Vitima->>Hacker: Visita o site malicioso (em outra aba ou link)
        Hacker-->>Vitima: Retorna página com código oculto (Form/Payload)
    end

    %% --- FASE 3 ---
    rect rgb(255, 240, 240)
        Note over Vitima, ERP: FASE 3: O Ataque (Exploração do Ponto Cego)
        Vitima->>ERP: Código oculto força requisição POST/GET automática
        
        Note over Vitima, ERP: ⚠️ COMPORTAMENTO DO NAVEGADOR:<br/>O cookie de sessão do ERP é anexado AUTOMATICAMENTE!
        
        ERP->>ERP: Valida o Cookie (Sessão é válida)
        ERP-->>Vitima: Executa a ação maliciosa (ex: deletar usuário)
    end
```
</details>

<details open>

<summary><b>OAuth 2.1</b></summary>
<span>O sistema de login se benficia das requisições com o header CSRF para realização de qualquer coisa no sistema, incluindo o login do usuário com a geração de token para utilização da API interna do sistema.</span></br>
<span>Abaixo temos um exemplo de como o sistema de login se comporta no sistema, após o processamento do CSRF.</span>

```mermaid
sequenceDiagram
    autonumber
    actor Cliente as Cliente (Navegador)
    participant API as API (Fastify)
    participant DB as Banco de Dados (PostgreSQL)
    participant Redis as Cache (Redis)

    %% Requisição e Validação Inicial
    Cliente->>API: POST /api/oauth/login (email, senha)
    API->>DB: Busca usuário pelo email
    DB-->>API: Retorna ID, Hash da Senha e Informações
    
    Note over API: Bcrypt compara a senha recebida<br/>com o Hash do Banco

    %% Geração de Identificadores
    Note over API: Sucesso! Gera JWT <br/>e UUID único para a Sessão
    API->>DB: Verifica se o usuário já possui sessão
    DB-->>API: Retorna lista de sessões antigas

    %% Bloco Transacional (Garantia de Atomicidade)
    rect rgb(240, 245, 255)
        Note over API, DB: [Início da Transação do Banco]
        
        alt Usuário já estava logado
            API->>DB: Desativa aquela sessão ativa no sistema.
            API->>Redis: Invalida/Deleta todos os caches antigos (Promise.all)
        end

        API->>DB: Insere a nova identificação da session na DB
        API->>DB: Deixa o usuário online no sistema com a data atual de login.
        
        API->>Redis: Salva novos dados de sessão e Token
        Note over API, Redis: Salva: Dados básicos, Token OAuth, Nome,<br/>IP, ID e Permissões no Redis para futuras pesquisas.
    end

    %% 4. Finalização da Resposta
    Note over API: Injeta Cookies do JWT de login na requisição.
    API-->>Cliente: HTTP 200 OK com informações adicionais para o cliente.
```

</details>

<details open>

<summary><b>Utilização das endpoints internas</b></summary>
<span>O sistema de login se benficia das requisições com o header CSRF para realização de qualquer coisa no sistema, incluindo o login do usuário com a geração de token para utilização da API interna do sistema.</span></br>
<span>Abaixo temos um exemplo de como o sistema de login se comporta no sistema, após o processamento do CSRF.</span>

```mermaid
sequenceDiagram
    autonumber
    actor Navegador as Navegador (Cliente)
    participant Fastify as Fastify Router
    participant Auth as preHandler: authenticate()
    participant Tenant as preHandler: tenantDb()
    participant Redis as Cache (Redis)
    participant DB as Banco (Postgres - 'community')
    participant Controller as Controller (DoLogout)

    %% Camada de Segurança do Navegador (CSRF)
    Note over Navegador, Fastify: [Barreira CSRF] Validação SameSite
    Navegador->>Fastify: Ex. POST /api/OAuth/logout (Cookies: auth_token, s_ID)
    Note over Navegador: O navegador só anexa os cookies se a origem for legítima<br/>devido à flag do cookie configurada no Login.

    %% Primeiro preHandler: Autenticação
    Note over Fastify, Auth: [Esteira 1] Validação de Identidade
    Fastify->>Auth: Executa req.authenticate()
    Auth->>Auth: Extrai e descriptografa o JWT (auth_token)
    Auth->>Redis: Get session:s_ID (Verifica se sessão ainda existe)
    Redis-->>Auth: Sessão Ativa e Válida
    Auth-->>Fastify: Sucesso! (Injeta req.user na requisição)

    %% Segundo preHandler: Banco de Dados por Tenant
    Note over Fastify, Tenant: [Esteira 2] Inicialização do Banco
    Fastify->>Tenant: Executa req.tenantDb()
    Note over Tenant: Versão Community:<br/>Força o tenant fixo como 'community'
    Tenant->>DB: Pede a pool de conexão com o SQL
    DB-->>Tenant: Retorna Pool de Conexão do Knex
    Note over Tenant: Injeta a conexão ativa no objeto do Fastify<br/>(ex: req.db = conn)
    Tenant-->>Fastify: Sucesso! Banco pronto para uso

    %% Execução da Rota (Controller)
    Note over Fastify, Controller: [Destino Final] Execução da Lógica Comercial
    Fastify->>Controller: Executa OAuth.DoLogout(getCache, delCache...)
    Controller->>Redis: Limpa chaves de cache (delCache)
    Controller->>DB: Roda queries necessárias com a conexão retornada pelo req.tenantDb()<br/> guardadas dentro de um re.db por exemplo;
    Controller-->>Navegador: HTTP 200 OK (Gera headers para limpar os cookies)
```

</details>

<br>

## Copyright e PRs
<span>O codigo é aberto para que os usuários possam realizar a hospédagem, desde que respeitem as diretrizes da licença AGPL3.0, presente neste projeto.</span><br>
<span>Pull requests são muito bem vindos para o projeto e em caso de bugs ou problemas de segurança, sinta-se a vontade para abrir uma issue e retornarei para concertar-la o mais rápido possível.</span><br>

