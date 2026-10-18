# Blogger Atom Tools

Ferramentas gratuitas em Google Apps Script para importar metadados do feed Atom do Blogger para o Google Planilhas (Google Sheets).

O projeto disponibiliza funções para consultar datas de publicação, datas de atualização e URLs de postagens, além de obter informações gerais sobre o feed de um blog. O objetivo é facilitar a organização de informações editoriais e apoiar verificações de URLs em blogs do Blogger.

## Funcionalidades

- Importação das datas de publicação das postagens.
- Importação das datas de última atualização dos posts.
- Extração das URLs das postagens.
- Consulta da data de publicação do primeiro post listado no feed.
- Consulta da data de atualização geral do feed.
- Extração da URL principal do blog, quando disponibilizada pelo feed.
- Formatação das datas no padrão brasileiro: `dd/MM/yyyy`.
- Tratamento de erros HTTP e de problemas na leitura do XML.

## Para quem é esta ferramenta?

Este projeto é destinado a blogueiros, profissionais de SEO, editores de conteúdo e desenvolvedores que utilizam Blogger, Google Planilhas e Google Apps Script para organizar informações e automatizar tarefas relacionadas à gestão editorial.

O código pode ser utilizado como base para consultas de metadados, conferência de URLs e rotinas de organização de uma Base Editorial.

## Funções disponíveis

### 1. IMPORTAR_ATOM_ROBUSTO

Importa os dados das postagens encontradas no feed Atom.

O resultado contém três colunas:

| Publicado | Última modificação | URL |
|---|---|---|
| Data de publicação | Data de atualização | Endereço do post |

Exemplo de utilização no Google Planilhas:

```excel
=IMPORTAR_ATOM_ROBUSTO("URL_DO_FEED")
```

### 2. IMPORTAR_HOME_ROBUSTO

Importa informações gerais do feed do Blogger.

O resultado contém três colunas:

| Primeiro post | Atualização do feed | URL da home |
|---|---|---|
| Data do primeiro post listado | Data de atualização do feed | Endereço principal do blog |

Exemplo de utilização no Google Planilhas:

```excel
=IMPORTAR_HOME_ROBUSTO("URL_DO_FEED")
```

Substitua `URL_DO_FEED` pelo endereço real do feed Atom do seu blog.

## Tutorial principal: extrair URLs de posts do Blogger

O tutorial principal apresenta a implementação prática do projeto com Feed Atom, Google Apps Script e Google Planilhas. Ele explica como extrair URLs de postagens, importar datas de publicação e atualização e comparar os resultados com os registros de uma Base Editorial.

**[Como Extrair URLs de Posts do Blogger com Feed Atom e Google Planilhas](https://primordiallab.blogspot.com/2026/10/como-extrair-urls-de-posts-do-blogger.html)**

No artigo, você encontrará orientações para:

- Consultar URLs de posts disponibilizadas pelo feed Atom.
- Importar dados de publicação e atualização para uma planilha.
- Comparar os endereços encontrados com os registros da Base Editorial.
- Identificar divergências que merecem verificação.
- Compreender as limitações do feed e da implementação.

**Importante:** encontrar uma URL no feed não comprova, por si só, que a página está acessível, possui a canonical desejada ou está indexada pelo Google. Essas verificações são distintas e podem exigir procedimentos adicionais.

## Como instalar

1. Acesse o [Google Apps Script](https://script.google.com/).
2. Crie um novo projeto ou abra um projeto existente.
3. Abra o arquivo `Code.gs`.
4. Copie o código-fonte disponível neste repositório.
5. Cole o código no editor do Apps Script e salve o projeto.
6. Abra uma planilha do Google Planilhas vinculada ao projeto, ou crie uma nova planilha e associe um projeto de Apps Script.
7. Utilize uma das funções disponíveis em uma célula, informando a URL do feed Atom.

Consulte o [tutorial completo de implementação](https://primordiallab.blogspot.com/2026/10/como-extrair-urls-de-posts-do-blogger.html) para acompanhar as instruções e conhecer os detalhes de utilização.

**Observação:** a instalação deve ser validada no ambiente do Google Apps Script. Como o código utiliza `UrlFetchApp` e `XmlService`, o funcionamento depende dos serviços disponíveis e da possibilidade de acessar e interpretar o feed informado.

## Código-fonte

O código está disponível neste repositório:

[Consultar o arquivo Code.gs](./Code.gs)

Você pode consultar a implementação, estudar as funções e adaptar o código às necessidades do seu projeto.

## Recursos relacionados

O uso de metadados de publicações pode fazer parte de uma estratégia mais ampla de organização editorial, análise de conteúdo e compreensão da estrutura de um site.

### Organização e análise de conteúdo

- **[O que é SEO Semântico e por que entidades mudaram o jogo do rankeamento](https://primordiallab.blogspot.com/2026/04/o-que-e-seo-semantico-e-por-que.html)** — entenda a importância das entidades, do contexto e das relações semânticas para a organização do conteúdo e a compreensão da relevância temática.

- **[Arquitetura editorial: o sistema que organiza a base de conteúdo](https://primordiallab.blogspot.com/2026/04/arquitetura-editorial-o-sistema-que.html)** — conheça uma abordagem estrutural para organizar conteúdos, definir relações entre artigos e preservar a coerência de uma base editorial em expansão.

### Automação e organização técnica

- **[A Camada Operacional Invisível por Trás de Estruturas Digitais de Alta Autoridade](https://primordiallab.blogspot.com/2026/08/a-camada-operacional-invisivel-por-tras.html)** — conheça mecanismos de automação editorial, registro de dados e auditoria de conteúdo aplicados à organização de projetos digitais.

Mais conteúdos sobre SEO, automação e organização editorial estão disponíveis no [Primordial Lab](https://primordiallab.blogspot.com/).

## Limitações e observações

- O código foi desenvolvido para o ambiente Google Apps Script.
- O feed informado precisa estar acessível e retornar dados compatíveis com o formato Atom esperado.
- A função `IMPORTAR_ATOM_ROBUSTO` processa as entradas retornadas pelo feed. A quantidade de posts disponíveis depende do conteúdo fornecido pelo próprio feed.
- A implementação atual não garante paginação para recuperar todas as postagens de um blog.
- A função `IMPORTAR_HOME_ROBUSTO` obtém a data de publicação da primeira entrada listada no feed, a data de atualização geral do feed e a URL principal do blog, quando disponibilizadas.
- As datas são apresentadas no formato `dd/MM/yyyy`, sem exibir o horário.
- A presença de uma URL no feed não garante que ela esteja acessível, canonicalizada corretamente ou indexada pelo Google.
- O código não implementa, por si só, histórico persistente, monitoramento periódico garantido ou validação completa de indexação.
- Mensagens de erro podem ser retornadas quando o feed não estiver acessível, apresentar uma resposta HTTP inesperada ou não puder ser processado.
- O funcionamento deve ser validado no ambiente em que o código será utilizado.

## Contribuições

Sugestões, correções e melhorias são bem-vindas.

Ao adaptar o código, verifique seu funcionamento no ambiente em que pretende utilizá-lo e mantenha a documentação atualizada para facilitar a compreensão por outros usuários.

## Licença

A licença de reutilização deste projeto ainda precisa ser definida. Até que um arquivo de licença seja adicionado ao repositório, não presuma que o código está liberado sob uma licença específica de código aberto.

---

Desenvolvido para facilitar o trabalho com feeds Atom do Blogger e Google Planilhas.

Projeto: Blogger Atom Tools.

Mais informações: [Primordial Lab](https://primordiallab.blogspot.com/).
