import { isAxiosError } from "axios";
import { api } from "./api";
import { Equipamento } from "../types/Equipamento";

export const equipamentoService = {
  async listar(): Promise<Equipamento[]> {
    const response = await api.get<Equipamento[]>("/equipamentos");
    return response.data;
  },

  async buscarPorId(id: number): Promise<Equipamento> {
    const response = await api.get<Equipamento>(`/equipamentos/${id}`);
    return response.data;
  },

  async criar(equipamento: Omit<Equipamento, "id">): Promise<Equipamento> {
    const response = await api.post<Equipamento>("/equipamentos", equipamento);
    return response.data;
  }
};

// Mantém detalhes de HTTP fora das telas; as falhas são tratadas por cada tela.
export function equipamentoNaoEncontrado(error: unknown): boolean {
  return isAxiosError(error) && error.response?.status === 404;
}
