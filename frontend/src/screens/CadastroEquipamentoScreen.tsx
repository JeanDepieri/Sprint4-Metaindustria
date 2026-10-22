import { useRef, useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { equipamentoService } from "../services/equipamentoService";
import { dataValida } from "../utils/data";

type Props = { onCancelar: () => void; onSalvo: (id: number) => void };

export function CadastroEquipamentoScreen({ onCancelar, onSalvo }: Props) {
  const [nome, setNome] = useState("");
  const [setor, setSetor] = useState("");
  const [statusOperacional, setStatusOperacional] = useState("");
  const [ultimaManutencao, setUltimaManutencao] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const enviando = useRef(false);

  async function handleSalvar() {
    if (enviando.current) return;
    setError(null);
    if (!nome.trim() || !setor.trim() || !statusOperacional.trim() || !ultimaManutencao.trim()) {
      setError("Preencha nome, setor, status operacional e última manutenção.");
      return;
    }
    if (!dataValida(ultimaManutencao.trim())) {
      setError("Informe uma data válida no formato AAAA-MM-DD (ex.: 2026-05-10).");
      return;
    }
    enviando.current = true;
    setLoading(true);
    let criadoId: number | null = null;
    try {
      const criado = await equipamentoService.criar({
        nome: nome.trim(),
        setor: setor.trim(),
        statusOperacional: statusOperacional.trim(),
        ultimaManutencao: ultimaManutencao.trim()
      });
      criadoId = criado.id;
    } catch (error) {
      setError("Não foi possível cadastrar o equipamento. Verifique a conexão com o backend. Se houve demora na resposta, confira a lista antes de reenviar.");
    } finally {
      enviando.current = false;
      setLoading(false);
    }
    if (criadoId !== null) onSalvo(criadoId);
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={styles.screen}>
      <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ flexGrow: 1, paddingBottom: 12 }}>
        <View style={styles.header}>
          <TouchableOpacity accessibilityRole="button" disabled={loading} onPress={onCancelar} style={styles.secondaryButton}>
            <Text style={styles.secondaryButtonText}>Voltar</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Novo equipamento</Text>
        </View>
        <View style={styles.form}>
          <View style={styles.field}>
            <Text style={styles.label}>Nome</Text>
            <TextInput accessibilityLabel="Nome" editable={!loading} maxLength={255} placeholder="Ex: Caldeira principal"
              placeholderTextColor="#94a3b8" value={nome} onChangeText={setNome} style={styles.input} />
          </View>
          <View style={styles.field}>
            <Text style={styles.label}>Setor</Text>
            <TextInput accessibilityLabel="Setor" editable={!loading} maxLength={255} placeholder="Ex: Linha A"
              placeholderTextColor="#94a3b8" value={setor} onChangeText={setSetor} style={styles.input} />
          </View>
          <View style={styles.field}>
            <Text style={styles.label}>Status operacional</Text>
            <TextInput accessibilityLabel="Status operacional" editable={!loading} maxLength={255} placeholder="Ex: ATIVO ou EM_MANUTENCAO"
              placeholderTextColor="#94a3b8" autoCapitalize="characters" value={statusOperacional} onChangeText={setStatusOperacional} style={styles.input} />
          </View>
          <View style={styles.field}>
            <Text style={styles.label}>Última manutenção (AAAA-MM-DD)</Text>
            <TextInput accessibilityLabel="Última manutenção" editable={!loading} maxLength={10} placeholder="2026-05-10"
              placeholderTextColor="#94a3b8" autoCapitalize="none" value={ultimaManutencao} onChangeText={setUltimaManutencao} style={styles.input} />
          </View>
          {error && <Text accessibilityRole="alert" style={{ color: "#991b1b", lineHeight: 22 }}>{error}</Text>}
        </View>
        <TouchableOpacity accessibilityRole="button" accessibilityState={{ disabled: loading, busy: loading }}
          disabled={loading} style={[styles.saveButton, { marginTop: 24, opacity: loading ? 0.65 : 1 }]} onPress={handleSalvar}>
          <Text style={styles.saveButtonText}>{loading ? "Salvando..." : "Salvar equipamento"}</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 28,
    paddingBottom: 24
  },
  header: {
    gap: 16,
    marginBottom: 24
  },
  title: {
    color: "#0f172a",
    fontSize: 28,
    fontWeight: "800"
  },
  form: {
    flex: 1,
    gap: 18
  },
  field: {
    gap: 8
  },
  label: {
    color: "#334155",
    fontSize: 14,
    fontWeight: "700"
  },
  input: {
    minHeight: 50,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "#cbd5e1",
    borderRadius: 8,
    backgroundColor: "#ffffff",
    color: "#0f172a",
    fontSize: 16
  },
  secondaryButton: {
    alignSelf: "flex-start",
    paddingVertical: 8
  },
  secondaryButtonText: {
    color: "#0f766e",
    fontSize: 16,
    fontWeight: "700"
  },
  saveButton: {
    minHeight: 52,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    backgroundColor: "#0f766e"
  },
  saveButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "800"
  }
});
