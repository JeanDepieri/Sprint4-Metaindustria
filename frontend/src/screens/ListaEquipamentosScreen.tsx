import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { EquipamentoCard } from "../components/EquipamentoCard";
import { Equipamento } from "../types/Equipamento";
import { equipamentoService } from "../services/equipamentoService";

type Props = {
  onCadastrar: () => void;
  onSelecionarEquipamento: (id: number) => void;
};

export function ListaEquipamentosScreen({ onCadastrar, onSelecionarEquipamento }: Props) {
  const [equipamentos, setEquipamentos] = useState<Equipamento[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tentativa, setTentativa] = useState(0);

  // Ao voltar para a lista, a tela é montada novamente e faz um novo GET.
  useEffect(() => {
    let ativa = true;
    async function carregar() {
      setLoading(true);
      setError(null);
      try {
        const dados = await equipamentoService.listar();
        if (ativa) setEquipamentos(dados);
      } catch (error) {
        if (ativa) {
          setEquipamentos([]);
          setError("Não foi possível carregar os equipamentos. Verifique se o backend está em execução.");
        }
      } finally {
        if (ativa) setLoading(false);
      }
    }
    void carregar();
    return () => { ativa = false; };
  }, [tentativa]);

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <View style={styles.headerText}>
          <Text style={styles.eyebrow}>Monitoramento industrial</Text>
          <Text style={styles.title}>Equipamentos</Text>
        </View>
        <TouchableOpacity accessibilityRole="button" style={styles.button} onPress={onCadastrar}>
          <Text style={styles.buttonText}>Novo</Text>
        </TouchableOpacity>
      </View>
      {loading ? (
        <View style={styles.empty}>
          <ActivityIndicator size="large" color="#0f766e" />
          <Text style={styles.emptyDescription}>Carregando equipamentos...</Text>
        </View>
      ) : error ? (
        <View style={styles.empty}>
          <Text accessibilityRole="alert" style={styles.emptyDescription}>{error}</Text>
          <TouchableOpacity accessibilityRole="button" style={styles.button} onPress={() => setTentativa(t => t + 1)}>
            <Text style={styles.buttonText}>Tentar novamente</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          contentContainerStyle={styles.list}
          data={equipamentos}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <EquipamentoCard equipamento={item} onPress={onSelecionarEquipamento} />
          )}
          ListHeaderComponent={
            <TouchableOpacity accessibilityRole="button" onPress={() => setTentativa(t => t + 1)} style={{ paddingVertical: 10 }}>
              <Text style={{ color: "#0f766e", fontWeight: "700" }}>Atualizar lista</Text>
            </TouchableOpacity>
          }
          ListEmptyComponent={
            <View style={styles.empty}>
              <Text style={styles.emptyTitle}>Nenhum equipamento cadastrado</Text>
              <Text style={styles.emptyDescription}>Crie o primeiro equipamento para acompanhar a operação.</Text>
            </View>
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 28
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
    marginBottom: 20
  },
  headerText: {
    flex: 1,
    gap: 4
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
  button: {
    minWidth: 86,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: "#0f766e"
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "700"
  },
  list: {
    gap: 12,
    paddingBottom: 24
  },
  empty: {
    alignItems: "center",
    gap: 8,
    padding: 24,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 8,
    backgroundColor: "#ffffff"
  },
  emptyTitle: {
    color: "#0f172a",
    fontSize: 17,
    fontWeight: "700",
    textAlign: "center"
  },
  emptyDescription: {
    color: "#64748b",
    fontSize: 14,
    lineHeight: 20,
    textAlign: "center"
  }
});
