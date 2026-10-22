import { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Equipamento } from "../types/Equipamento";
import { equipamentoNaoEncontrado, equipamentoService } from "../services/equipamentoService";
import { formatarData } from "../utils/data";

type Props = { id: number; onVoltar: () => void };

export function DetalheEquipamentoScreen({ id, onVoltar }: Props) {
  const [equipamento, setEquipamento] = useState<Equipamento | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tentativa, setTentativa] = useState(0);

  useEffect(() => {
    let ativa = true;
    async function carregar() {
      setLoading(true);
      setError(null);
      setEquipamento(null);
      try {
        const dados = await equipamentoService.buscarPorId(id);
        if (ativa) setEquipamento(dados);
      } catch (error) {
        if (ativa) setError(equipamentoNaoEncontrado(error)
          ? "Equipamento não encontrado. Ele pode ter sido removido."
          : "Não foi possível carregar o equipamento. Verifique se o backend está em execução.");
      } finally {
        if (ativa) setLoading(false);
      }
    }
    void carregar();
    return () => { ativa = false; };
  }, [id, tentativa]);

  return (
    <ScrollView style={styles.screen} contentContainerStyle={{ paddingBottom: 30 }}>
      <TouchableOpacity accessibilityRole="button" onPress={onVoltar} style={styles.backButton}>
        <Text style={styles.backButtonText}>Voltar</Text>
      </TouchableOpacity>
      {loading ? (
        <View style={styles.empty}>
          <ActivityIndicator size="large" color="#0f766e" />
          <Text style={styles.emptyText}>Carregando equipamento...</Text>
        </View>
      ) : error ? (
        <View style={styles.empty}>
          <Text accessibilityRole="alert" style={styles.emptyText}>{error}</Text>
          <TouchableOpacity accessibilityRole="button" onPress={() => setTentativa(t => t + 1)} style={styles.backButton}>
            <Text style={styles.backButtonText}>Tentar novamente</Text>
          </TouchableOpacity>
        </View>
      ) : equipamento ? (
        <View style={styles.content}>
          <Text style={styles.eyebrow}>Detalhe do equipamento</Text>
          <Text style={styles.title}>{equipamento.nome}</Text>
          <View style={styles.infoGrid}>
            <View style={styles.infoBox}>
              <Text style={styles.infoLabel}>ID</Text>
              <Text style={styles.infoValue}>{equipamento.id}</Text>
            </View>
            <View style={styles.infoBox}>
              <Text style={styles.infoLabel}>Setor</Text>
              <Text style={styles.infoValue}>{equipamento.setor}</Text>
            </View>
            <View style={styles.infoBox}>
              <Text style={styles.infoLabel}>Status operacional</Text>
              <Text style={styles.infoValue}>{equipamento.statusOperacional}</Text>
            </View>
            <View style={styles.infoBox}>
              <Text style={styles.infoLabel}>Última manutenção</Text>
              <Text style={styles.infoValue}>{formatarData(equipamento.ultimaManutencao)}</Text>
            </View>
          </View>
        </View>
      ) : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 28
  },
  backButton: {
    alignSelf: "flex-start",
    paddingVertical: 8,
    marginBottom: 18
  },
  backButtonText: {
    color: "#0f766e",
    fontSize: 16,
    fontWeight: "700"
  },
  content: {
    gap: 18
  },
  eyebrow: {
    color: "#0f766e",
    fontSize: 13,
    fontWeight: "700",
    textTransform: "uppercase"
  },
  title: {
    color: "#0f172a",
    fontSize: 30,
    fontWeight: "800"
  },
  infoGrid: {
    gap: 12
  },
  infoBox: {
    gap: 6,
    padding: 16,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 8,
    backgroundColor: "#ffffff"
  },
  infoLabel: {
    color: "#64748b",
    fontSize: 13,
    fontWeight: "700",
    textTransform: "uppercase"
  },
  infoValue: {
    color: "#0f172a",
    fontSize: 17,
    fontWeight: "700"
  },
  empty: {
    gap: 8,
    padding: 20,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 8,
    backgroundColor: "#ffffff"
  },
  emptyTitle: {
    color: "#0f172a",
    fontSize: 18,
    fontWeight: "800"
  },
  emptyText: {
    color: "#64748b",
    fontSize: 15,
    lineHeight: 22
  }
});
