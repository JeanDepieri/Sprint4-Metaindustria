# Metaindústria — Sprint 4 | Code&Ops

**Entrega final FIAP · Engenharia da Computação · 3ECR · Integração Spring Boot + React Native/Expo**

> **Estado da entrega:** Frontend e backend da Sprint 3 aprovada (nota 100) publicados neste repositório independente para Sprint 4. Testes funcionais não foram repetidos, conforme solicitado. O link da demonstração final no YouTube foi adicionado ao README. Confirme que a visibilidade está como **Não listado** e que o vídeo tem até 5 minutos.

## 1. Projeto, problema e solução

O projeto Metaindústria visa apoiar a gestão de ativos industriais e a visibilidade do estado operacional dos equipamentos. A entidade implementada nesta integração é **Equipamento**, com cadastro, consulta em lista e detalhe no aplicativo. O aplicativo **não usa mocks no fluxo principal**: os registros vêm da API Java e do banco H2 persistido em arquivo. A iniciativa mais ampla de segurança industrial e EPIs pertence ao contexto de produto da equipe, mas este demonstrativo funcional é o **CRUD de equipamentos**; não afirmar que detecção de EPIs por câmera está implementada neste pacote.

### Equipe

| Integrante | RM |
| --- | --- |
| Davi da Silva Biaggioli | 552581 |
| Jean Lucas Loureiro Depieri | 555797 |
| João Gabriel De Bortoli Ribeiro | 554601 |
| Lucas Akira Watanabe | 554875 |
| Luiz Guilherme de Souza Varischi | 559028 |
| Francisco Ferrara Neto | 557209 |

### Repositório exclusivo da Sprint 4 e vídeo

**Repositório da Sprint 4:** [JeanDepieri/Sprint4-Metaindustria](https://github.com/JeanDepieri/Sprint4-Metaindustria). Contém [frontend](frontend/) e [backend](backend/) neste mesmo repositório.

**Fonte original da Sprint 3:** [Sprint3-Metaindustria](https://github.com/JeanDepieri/Sprint3-Metaindustria). Para fins de histórico, sem necessidade de alterá-lo.

**Vídeo de demonstração:** [Sprint 4 | Metaindústria — Entrega Final (https://youtu.be/BnFtq--t4h0)](https://youtu.be/BnFtq--t4h0). Configure o vídeo no YouTube como **Não listado** (não Privado), com duração de até 5 minutos.

**Observação sobre repositórios:** esta versão publica frontend e backend em duas pastas do mesmo repositório. Se o professor exigir rigorosamente dois repositórios GitHub distintos, será necessário separar os dois diretórios.

## 2. Arquitetura

```text
Metaindústria — Sprint 4
├── frontend/                      # Expo / React Native / TypeScript
│   ├── App.tsx
│   ├── package.json
│   └── src/
│       ├── screens/
│       │   ├── ListaEquipamentosScreen.tsx
│       │   ├── CadastroEquipamentoScreen.tsx
│       │   └── DetalheEquipamentoScreen.tsx
│       ├── services/
│       │   ├── api.ts            # Axios + baseURL + timeout
│       │   └── equipamentoService.ts
│       ├── components/EquipamentoCard.tsx
│       ├── types/Equipamento.ts
│       └── utils/data.ts
├── backend/                       # Java 17 / Spring Boot / H2
│   ├── pom.xml
│   ├── mvnw / mvnw.cmd
│   ├── data/.gitkeep               # Pasta para banco H2 persistente
│   └── src/main/
│       ├── java/com/FIAP/Sprint1_2026_APeMD/
│       │   ├── controller/EquipamentoController.java
│       │   ├── service/EquipamentoService.java
│       │   ├── repository/EquipamentoRepository.java
│       │   └── model/Equipamento.java
│       └── resources/application.properties
├── evidencias/                    # Evidências textuais herdadas da Sprint 3
├── docs/historico/                # Documentação histórica
└── README.md
```

**Fluxo real:** Tela → `src/services/equipamentoService.ts` → `src/services/api.ts` (Axios) → HTTP/JSON → `EquipamentoController` → `EquipamentoService` → `EquipamentoRepository` (JPA) → H2 (arquivo).

## 3. Pré-requisitos

- **Java 17 JDK** (`java -version`), com `JAVA_HOME` quando necessário.
- **Maven** instalado **ou** Maven Wrapper (`mvnw` e `mvnw.cmd`) incluso no backend.
- **Node.js + npm** compatíveis com Expo SDK 48 (para maior previsibilidade, Node 18). O projeto **preserva Expo SDK 48 / React Native 0.71** que foram aprovados; não atualizar dependências durante a demonstração.
- **Expo CLI** via `npx expo start`; navegador moderno para apresentação web ou emulador/Expo Go compatível com SDK 48.
- Internet na primeira instalação das dependências. O celular físico e o computador com o backend precisam comunicar-se na mesma rede local.

## 4. Como executar — do zero

### 4.1. Clonar o novo repositório Sprint 4

```bash
git clone https://github.com/JeanDepieri/Sprint4-Metaindustria.git
```

Este repositório contém **as duas pastas** `backend/` e `frontend/`. Abra um terminal em cada pasta.

### 4.2. Iniciar o backend — Terminal 1

Linux/macOS:

```bash
cd Sprint4-Metaindustria/backend
./mvnw spring-boot:run
```

Windows PowerShell:

```powershell
cd Sprint4-Metaindustria\backend
.\mvnw.cmd spring-boot:run
```

Se preferir Maven instalado, substitua o wrapper por `mvn spring-boot:run`. Não execute o Maven na raiz; abra a pasta onde existe `pom.xml`.

- **Porta da API:** `8080` (definida em `backend/src/main/resources/application.properties`).
- **GET de verificação:** <http://localhost:8080/equipamentos> → JSON (array, inclusive `[]` se vazio).
- **H2 persistente:** `jdbc:h2:file:./data/sprint1db`. O banco é criado na pasta `backend/data/` na primeira execução; um clone novo não contém os registros antigos.
- **H2 Console:** <http://localhost:8080/h2-console> | usuário `sa` | senha vazia.
- **CORS:** `@CrossOrigin(origins = "*")` em `EquipamentoController` para o frontend web (configuração acadêmica; restringir em produção).

### 4.3. Iniciar o frontend — Terminal 2

Linux/macOS:

```bash
cd Sprint4-Metaindustria/frontend
npm ci
npx expo start
```

Windows PowerShell:

```powershell
cd Sprint4-Metaindustria\frontend
npm ci
npx expo start
```

No menu do Expo, pressione `w` para abrir no **navegador web**, opção mais simples para o professor. Alternativa: `npx expo start --web`. Para Android/iOS, use o cliente ou emulador compatível com **SDK 48**. O aplicativo mantém as telas de lista, cadastro e detalhe.

### 4.4. BASE_URL — endereço correto em cada ambiente

Edite **`frontend/src/services/api.ts`**:

```ts
const ENDERECO_CELULAR: string = "";
```

| Ambiente | `baseURL` usada |
| --- | --- |
| Web, mesmo PC do backend | `http://localhost:8080` |
| iOS Simulator, mesmo Mac | `http://localhost:8080` |
| Android Emulator do Android Studio | `http://10.0.2.2:8080` |
| Celular físico conectado à mesma rede | preencher `ENDERECO_CELULAR` com `http://IP_DO_COMPUTADOR:8080` |
| Navegador web em outro computador | preencher `ENDERECO_CELULAR` com `http://IP_DO_COMPUTADOR:8080` |

A constante vem **vazia por padrão** para não prender a Sprint 4 ao IP usado na máquina da equipe. Para celular físico, por exemplo:

```ts
const ENDERECO_CELULAR: string = "http://192.168.1.104:8080";
```

Substitua o IP pelo real (Windows: `ipconfig`; Linux: `hostname -I`), salve e recarregue o app. Não use `localhost` no celular: apontaria para o próprio aparelho. Libere a porta TCP 8080 no firewall **apenas para a rede local confiável**. O túnel Expo não expõe automaticamente o backend Spring Boot.

## 5. Entidade e endpoints

### Entidade `Equipamento`

```json
{
  "id": 1,
  "nome": "Prensa Hidráulica 01",
  "setor": "Linha A",
  "statusOperacional": "ATIVO",
  "ultimaManutencao": "2026-05-10"
}
```

`id` é gerado pelo backend; não é preenchido no cadastro. `ultimaManutencao` usa ISO `AAAA-MM-DD` na API. O frontend converte para exibição `DD/MM/AAAA`.

| Método | Endpoint | Finalidade / resposta |
| --- | --- | --- |
| `GET` | `/equipamentos` | Listar equipamentos (`200`, array JSON) |
| `GET` | `/equipamentos/{id}` | Detalhe (`200` ou `404`) |
| `POST` | `/equipamentos` | Cadastrar (`201` + objeto gerado) |
| `PUT` | `/equipamentos/{id}` | Atualizar (`200` ou `404`; disponível na API) |
| `DELETE` | `/equipamentos/{id}` | Remover (`204` ou `404`; disponível na API) |

**Fluxo tela → serviço → endpoint**

| Tela | Serviço chamado | HTTP |
| --- | --- | --- |
| Lista / atualizar lista | `equipamentoService.listar()` | `GET /equipamentos` |
| Cadastro / salvar | `equipamentoService.criar(...)` | `POST /equipamentos` |
| Detalhe / abrir o registro | `equipamentoService.buscarPorId(id)` | `GET /equipamentos/{id}` |

O aplicativo demonstra os três fluxos; `PUT` e `DELETE` estão disponíveis na **API**, não há telas de edição ou exclusão no app. Requisições e `baseURL` ficam **exclusivamente em `src/services/`**. Erros de rede/HTTP são tratados nas telas com estado de carregamento e mensagem visível; **não há mock de fallback**.

## 6. Demonstração exigida (do aplicativo até a API)

1. Com o backend iniciado, abra `http://localhost:8080/equipamentos` no navegador: o retorno é JSON.
2. Abra o aplicativo Expo na tela **Equipamentos**. Os registros devem corresponder ao JSON retornado.
3. Toque em **Novo** e cadastre:
   - Nome: `Prensa Hidráulica Sprint 4`
   - Setor: `Linha A`
   - Status operacional: `ATIVO`
   - Última manutenção: `2026-10-22`
4. Toque em **Salvar equipamento**. O app faz `POST /equipamentos`, recebe o ID e abre a tela **Detalhe** com os dados reais.
5. Veja novamente `http://localhost:8080/equipamentos` e localize o novo registro, ou consulte `http://localhost:8080/equipamentos/ID_RETORNADO`.
6. **Pare o backend** com `Ctrl+C` no Terminal 1.
7. No aplicativo, volte à lista e toque **Atualizar lista** ou recarregue a aplicação. O aplicativo deve apresentar *"Não foi possível carregar os equipamentos. Verifique se o backend está em execução."* e o botão **Tentar novamente**. **Não** são carregados dados simulados.
8. Opcional: reinicie o backend e toque **Tentar novamente**. O H2 em arquivo preserva os registros.

**Observação:** encerrar o backend não necessariamente remove dados já exibidos da memória da tela. **Recarregue ou atualize a lista** para forçar um novo GET e evidenciar a falha, como pedido no enunciado.

## 7. Roteiro do vídeo obrigatório (YouTube Não listado, até 5 min)

| Momento sugerido | Mostrar na gravação |
| --- | --- |
| `0:00 – 0:35` | GitHub da Sprint 4, pastas **frontend** e **backend**, e o README com integrantes, setup, endpoints e link de vídeo |
| `0:35 – 1:15` | Terminal do backend iniciado na porta 8080; GET `/equipamentos` com JSON no navegador |
| `1:15 – 2:05` | Expo aberto; tela de lista mostrando os mesmos registros reais |
| `2:05 – 3:10` | Preenchimento do cadastro; salvar; tela detalhe com ID gerado pelo backend |
| `3:10 – 3:45` | GET da API atualizado ou `GET /equipamentos/{id}` confirmando o cadastro |
| `3:45 – 4:40` | `Ctrl+C` no backend; recarregar/atualizar app; mostrar **erro visível, sem mock** |
| `4:40 – 5:00` | Resumo dos serviços e encerramento (sem ultrapassar 5 min) |

**Vídeo publicado pela equipe:** https://youtu.be/BnFtq--t4h0. Antes de entregar, confira no YouTube Studio que a visibilidade é **Não listado**, e teste se o link abre sem estar conectado à conta que fez o upload. Não use **Privado**, pois o professor não poderá assistir apenas com o link.

## 8. Checklist de entrega (100 pontos)

- [x] Código-fonte integrado herdado da Sprint 3 aprovada, API Java em camadas, CRUD, CORS e H2 file.
- [x] `frontend/src/services/api.ts` / `equipamentoService.ts`, telas lista, cadastro e detalhe usando a API, sem mock.
- [x] README completo: projeto, entidade, equipe/RMs, setup, `BASE_URL`, endpoints, mapeamento tela/serviço/endpoint, queda do backend, roteiro.
- [x] Frontend e backend separados nas pastas `frontend/` e `backend/` deste repositório.
- [x] Publicar os códigos e a documentação no repositório independente da Sprint 4.
- [x] **Adicionar o URL do vídeo** fornecido pela equipe: https://youtu.be/BnFtq--t4h0.
- [ ] **Conferir no YouTube Studio** visibilidade **Não listado**, duração de até 5 minutos e acesso ao vídeo por link sem login; conferir acesso ao GitHub.

**Peso na avaliação:** sistema integrado (30) · README reproduzível (35) · vídeo com front ↔ back e backend parado (35).

> O professor já atribuiu nota **100** à Sprint 3. Esta entrega mantém a integração aprovada e altera somente a apresentação/configuração necessárias à Sprint 4. **Não foram repetidos testes funcionais nesta atualização, conforme solicitado pela equipe.**