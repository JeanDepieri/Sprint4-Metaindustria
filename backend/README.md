# Backend — Metaindústria Sprint 4

API Spring Boot (Java 17, Maven, Spring Data JPA, H2 em arquivo). Código de domínio preservado da Sprint 3 aprovada com nota 100.

[Documentação completa](../README.md) | [Frontend](../frontend/)

## Executar

Na pasta `backend/`, use:

```bash
./mvnw spring-boot:run
```

No Windows use `.\\mvnw.cmd spring-boot:run`. Alternativa: `mvn spring-boot:run` com Maven instalado.

API: `http://localhost:8080/equipamentos`

Banco: `jdbc:h2:file:./data/sprint1db`. A pasta `data/` já está incluída para criar o arquivo H2 quando a API iniciar. O banco começa vazio em um clone novo, salvo se dados forem inseridos.

## Endpoints

| Verbo | Endpoint | Resultado |
| --- | --- | --- |
| GET | `/equipamentos` | Lista JSON |
| GET | `/equipamentos/{id}` | Equipamento por ID |
| POST | `/equipamentos` | Cadastrar e retornar ID |
| PUT | `/equipamentos/{id}` | Atualizar |
| DELETE | `/equipamentos/{id}` | Excluir |

As camadas são `controller`, `service`, `repository`, `model`. O controller possui CORS para demonstração acadêmica.

**Vídeo:** PENDENTE no README raiz.
