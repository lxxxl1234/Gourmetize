import axios from "axios";
import api from "./api";

type StoredAccount = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: "consumer" | "producer" | "admin";
  verificationCode: string;
  verified: boolean;
};

const accountsKey = "gourmetize_local_accounts";

function accounts(): StoredAccount[] {
  try { return JSON.parse(localStorage.getItem(accountsKey) ?? "[]"); } catch { return []; }
}
function saveAccounts(value: StoredAccount[]) { localStorage.setItem(accountsKey, JSON.stringify(value)); }
function code() { return String(Math.floor(100000 + Math.random() * 900000)); }
function isNetworkError(error: unknown) { return axios.isAxiosError(error) && !error.response; }

export async function registerAccount(data: FormData) {
  const email = String(data.get("email") ?? "").trim().toLowerCase();
  if (email !== String(data.get("email_confirmation") ?? "").trim().toLowerCase()) throw new Error("Os campos de email precisam ser iguais.");
  if (String(data.get("password") ?? "").length < 8) throw new Error("A senha precisa ter pelo menos 8 caracteres.");
  if (data.get("password") !== data.get("password_confirmation")) throw new Error("As senhas precisam ser iguais.");
  try {
    const response = await api.post("/register", data, { headers: { "Content-Type": "multipart/form-data" } });
    return { ...response.data, local: false, verificationCode: undefined as string | undefined };
  } catch (error) {
    if (!isNetworkError(error)) throw error;
    if (accounts().some((account) => account.email === email)) throw new Error("Já existe uma conta local com este email.");
    const verificationCode = code();
    const account: StoredAccount = { id: crypto.randomUUID(), name: String(data.get("name") ?? ""), email, password: String(data.get("password") ?? ""), role: data.get("role") === "producer" ? "producer" : "consumer", verificationCode, verified: false };
    saveAccounts([...accounts(), account]);
    return { message: "Cadastro salvo no modo local. Use o código de teste para confirmar o email.", local: true, verificationCode };
  }
}

export async function verifyAccount(email: string, verificationCode: string) {
  try {
    const response = await api.post("/verify-email", { email, code: verificationCode });
    return { ...response.data, local: false };
  } catch (error) {
    if (!isNetworkError(error)) throw error;
    const list = accounts();
    const index = list.findIndex((account) => account.email === email.trim().toLowerCase());
    if (index < 0 || list[index].verificationCode !== verificationCode) throw new Error("Código inválido ou expirado.");
    list[index] = { ...list[index], verified: true, verificationCode: "" };
    saveAccounts(list);
    return { message: "Email confirmado no modo local. Agora você pode entrar.", local: true };
  }
}

export async function loginAccount(email: string, password: string) {
  try {
    const response = await api.post("/login", { email, password });
    return response.data;
  } catch (error) {
    if (!isNetworkError(error)) throw error;
    const account = accounts().find((candidate) => candidate.email === email.trim().toLowerCase());
    if (!account || account.password !== password) throw new Error("As credenciais fornecidas estão incorretas.");
    if (!account.verified) throw new Error("Confirme seu email antes de entrar.");
    return { message: "Login realizado com sucesso no modo local!", token: `local-${account.id}`, user: { id: account.id, name: account.name, email: account.email, role: account.role } };
  }
}

export function loginDemoAdmin() {
  const admin = { id: "admin-local", name: "Equipe Gourmetize", email: "admin@gourmetize.local", role: "admin" };
  localStorage.setItem("auth_token", "local-admin-session");
  localStorage.setItem("user", JSON.stringify(admin));
  return admin;
}

export function loginDemoProducer() {
  const producer = { id: "producer-local", name: "Sítio Boa Terra", email: "produtor@gourmetize.local", role: "producer" };
  localStorage.setItem("auth_token", "local-producer-session");
  localStorage.setItem("user", JSON.stringify(producer));
  return producer;
}

export type SessionUser = { id: string; name: string; email: string; role: "consumer" | "producer" | "admin" };
export function sessionUser(): SessionUser | null {
  try { return JSON.parse(localStorage.getItem("user") ?? "null"); } catch { return null; }
}
export function logoutLocal() { localStorage.removeItem("auth_token"); localStorage.removeItem("user"); }
