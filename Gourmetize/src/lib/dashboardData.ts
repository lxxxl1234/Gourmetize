export type Product = { id: string; name: string; producer: string; category: string; price: number; stock: number; active: boolean; distance: string; harvest: string; impactKg: number };
export type Order = { id: string; customer: string; producer: string; total: number; status: "Novo" | "Em preparo" | "A caminho" | "Concluído"; items: number; createdAt: string };
export type Producer = { id: string; name: string; location: string; status: "Pendente" | "Aprovado"; products: number };
export type DashboardData = { products: Product[]; orders: Order[]; producers: Producer[] };

const key = "gourmetize_dashboard_data";
const seed: DashboardData = {
  products: [
    { id: "p1", name: "Cesta da estação", producer: "Sítio Boa Terra", category: "Hortifruti", price: 48.5, stock: 12, active: true, distance: "14 km", harvest: "Colhido esta manhã", impactKg: 2.4 },
    { id: "p2", name: "Mel silvestre 280g", producer: "Apiário Serra Clara", category: "Mercearia", price: 28, stock: 18, active: true, distance: "21 km", harvest: "Produção artesanal", impactKg: 1.1 },
    { id: "p3", name: "Queijo meia cura", producer: "Queijaria do Vale", category: "Laticínios", price: 34.9, stock: 7, active: true, distance: "38 km", harvest: "Lote da semana", impactKg: 1.8 },
    { id: "p4", name: "Café orgânico 250g", producer: "Raízes do Campo", category: "Bebidas", price: 22.5, stock: 25, active: true, distance: "46 km", harvest: "Torra de terça-feira", impactKg: 0.9 },
  ],
  orders: [
    { id: "#1048", customer: "Marina Alves", producer: "Sítio Boa Terra", total: 86.4, status: "Em preparo", items: 4, createdAt: "Hoje, 10:42" },
    { id: "#1047", customer: "Rafael Nunes", producer: "Queijaria do Vale", total: 58.9, status: "Novo", items: 2, createdAt: "Hoje, 09:18" },
  ],
  producers: [
    { id: "pr1", name: "Sítio Boa Terra", location: "Cotia, SP", status: "Aprovado", products: 14 },
    { id: "pr2", name: "Horta da Nena", location: "Mogi das Cruzes, SP", status: "Pendente", products: 6 },
    { id: "pr3", name: "Queijaria do Vale", location: "Atibaia, SP", status: "Aprovado", products: 8 },
  ],
};

export function getDashboardData(): DashboardData {
  try {
    const stored = JSON.parse(localStorage.getItem(key) ?? JSON.stringify(seed)) as DashboardData;
    return {
      ...seed,
      ...stored,
      products: stored.products.map((product) => Object.assign(
        { distance: "Próximo de você", harvest: "Disponível agora", impactKg: 1 },
        seed.products.find((reference) => reference.id === product.id) ?? {},
        product,
      )),
    };
  } catch { return seed; }
}
export function saveDashboardData(data: DashboardData) { localStorage.setItem(key, JSON.stringify(data)); }
