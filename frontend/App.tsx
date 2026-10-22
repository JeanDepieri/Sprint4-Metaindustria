import { useState } from "react";
import { SafeAreaView, StatusBar, StyleSheet } from "react-native";
import { CadastroEquipamentoScreen } from "./src/screens/CadastroEquipamentoScreen";
import { DetalheEquipamentoScreen } from "./src/screens/DetalheEquipamentoScreen";
import { ListaEquipamentosScreen } from "./src/screens/ListaEquipamentosScreen";

type Screen = "lista" | "cadastro" | "detalhe";

export default function App() {
  const [screen, setScreen] = useState<Screen>("lista");
  const [equipamentoSelecionadoId, setEquipamentoSelecionadoId] = useState<number | null>(null);

  function abrirDetalhe(id: number) {
    setEquipamentoSelecionadoId(id);
    setScreen("detalhe");
  }

  function voltarLista() {
    setEquipamentoSelecionadoId(null);
    setScreen("lista");
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8fafc" />
      {screen === "lista" && (
        <ListaEquipamentosScreen
          onCadastrar={() => setScreen("cadastro")}
          onSelecionarEquipamento={abrirDetalhe}
        />
      )}
      {screen === "cadastro" && (
        <CadastroEquipamentoScreen onCancelar={voltarLista} onSalvo={abrirDetalhe} />
      )}
      {screen === "detalhe" && equipamentoSelecionadoId !== null && (
        <DetalheEquipamentoScreen id={equipamentoSelecionadoId} onVoltar={voltarLista} />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8fafc" }
});
