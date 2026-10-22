import axios from "axios";
import { Platform } from "react-native";

// Para celular físico, informe a URL do computador na rede local.
// Exemplos: http://192.168.1.104:8080
// Deixe vazio para usar o endereço padrão de web/simuladores.
const ENDERECO_CELULAR: string = "";

export const api = axios.create({
  baseURL: ENDERECO_CELULAR || (Platform.OS === "android"
    ? "http://10.0.2.2:8080"
    : "http://localhost:8080"),
  timeout: 5000,
  headers: { "Content-Type": "application/json" }
});
