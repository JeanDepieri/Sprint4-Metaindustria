# Frontend — Metaindústria Sprint 4

App **Expo / React Native / TypeScript** integrado ao backend Spring Boot, baseado na Sprint 3 avaliada com nota 100.

[Documentação completa da entrega](../README.md) | [Backend](../backend/)

## Executar

```bash
npm ci
npx expo start
```

Pressione `w` para abrir no navegador. Requer Node.js e npm compatíveis com Expo SDK 48; navegador ou cliente Expo compatível.

## Comunicação com a API

Ajuste `src/services/api.ts` para a rede utilizada:

- Web e simulador iOS no mesmo computador: `http://localhost:8080`
- Emulador Android: `http://10.0.2.2:8080`
- Celular físico: configurar `ENDERECO_CELULAR` com `http://IP_DO_PC:8080`.

O backend deve estar ativo na porta **8080**.

| Tela | Serviço Axios | Endpoint |
| --- | --- | --- |
| Lista | `equipamentoService.listar()` | `GET /equipamentos` |
| Cadastro | `equipamentoService.criar()` | `POST /equipamentos` |
| Detalhe | `equipamentoService.buscarPorId(id)` | `GET /equipamentos/{id}` |

O app não apresenta registros fictícios quando a API está indisponível. Recarregue a lista com o backend parado para observar a mensagem de erro.

**Vídeo da Sprint 4:** https://youtu.be/BnFtq--t4h0 — confirme visibilidade **Não listado** e até 5 min.
