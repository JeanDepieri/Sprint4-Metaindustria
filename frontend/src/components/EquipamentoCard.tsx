import { Pressable, StyleSheet, Text, View } from "react-native";
import { Equipamento } from "../types/Equipamento";
import { formatarData } from "../utils/data";

type Props = {
  equipamento: Equipamento;
  onPress: (id: number) => void;
};

export function EquipamentoCard({ equipamento, onPress }: Props) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Ver equipamento ${equipamento.nome}`}
      onPress={() => onPress(equipamento.id)}
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
    >
      <View style={styles.header}>
        <Text style={styles.title}>{equipamento.nome}</Text>
        <View style={[styles.badge, { backgroundColor: "#ccfbf1", maxWidth: "55%" }]}>
          <Text style={[styles.badgeText, { color: "#115e59" }]}>
            {equipamento.statusOperacional || "Não informado"}
          </Text>
        </View>
      </View>
      <Text style={styles.description}>Setor: {equipamento.setor}</Text>
      <Text style={styles.date}>
        Última manutenção: {formatarData(equipamento.ultimaManutencao)}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: 10,
    padding: 16,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 8,
    backgroundColor: "#ffffff"
  },
  cardPressed: {
    opacity: 0.76
  },
  header: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 12
  },
  title: {
    flex: 1,
    color: "#0f172a",
    fontSize: 17,
    fontWeight: "700"
  },
  badge: {
    minWidth: 72,
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "700"
  },
  description: {
    color: "#475569",
    fontSize: 14,
    lineHeight: 20
  },
  date: {
    color: "#64748b",
    fontSize: 13,
    fontWeight: "600"
  }
});
