import { useEffect, useMemo, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { LogOut, Plus, ShoppingBag, Sprout } from 'lucide-react';
import api from '../lib/api';
import { logout, sessionUser } from '../lib/auth';

type Product = { id: number; name: string; description?: string; price_cents: number; stock: number; producer: { id: number; name: string } };
type Order = { id: number; status: string; total_cents: number; items: { product_name: string; quantity: number }[] };
const money = (value: number) => (value / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
const statusText: Record<string, string> = { new: 'Novo', preparing: 'Em preparo', delivering: 'A caminho', completed: 'Concluído', cancelled: 'Cancelado' };

export default function Dashboard() {
  const user = sessionUser();
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [cart, setCart] = useState<Record<number, number>>({});
  const [notice, setNotice] = useState('');
  const [loading, setLoading] = useState(true);
  const [newProduct, setNewProduct] = useState({ name: '', price: '', stock: '', description: '' });
  if (!user) return <Navigate to='/login' replace />;
  const load = async () => {
    setLoading(true);
    try {
      const [productsResponse, ordersResponse] = await Promise.all([api.get(user.role === 'producer' ? '/products/mine' : '/products'), api.get('/orders')]);
      setProducts(productsResponse.data.data ?? []); setOrders(ordersResponse.data.data ?? []);
    } catch (error: any) { setNotice(error.response?.data?.message ?? 'Não foi possível carregar os dados.'); }
    finally { setLoading(false); }
  };
  useEffect(() => { void load(); }, []);
  const total = useMemo(() => products.reduce((sum, p) => sum + p.price_cents * (cart[p.id] ?? 0), 0), [products, cart]);
  const checkout = async () => {
    const items = Object.entries(cart).map(([product_id, quantity]) => ({ product_id: Number(product_id), quantity }));
    if (!items.length) return;
    try { await api.post('/orders', { items }); setCart({}); setNotice('Pedido criado e enviado ao produtor.'); await load(); }
    catch (error: any) { setNotice(error.response?.data?.message ?? 'Não foi possível criar o pedido.'); }
  };
  const createProduct = async (event: React.FormEvent) => {
    event.preventDefault();
    try { await api.post('/products', { name: newProduct.name, description: newProduct.description || null, price_cents: Math.round(Number(newProduct.price.replace(',', '.')) * 100), stock: Number(newProduct.stock), active: true }); setNewProduct({ name: '', price: '', stock: '', description: '' }); setNotice('Produto publicado.'); await load(); }
    catch (error: any) { setNotice(error.response?.data?.message ?? 'Revise os dados do produto.'); }
  };
  const changeStatus = async (order: Order, status: string) => { await api.patch(`/orders/${order.id}/status`, { status }); await load(); };
  const signOut = async () => { await logout(); navigate('/'); };
  return <main className='min-h-screen bg-[#f5f8f2] px-4 py-6 text-slate-900 sm:px-6 lg:px-10'><div className='mx-auto max-w-7xl'>
    <header className='mb-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-emerald-900/10 bg-white px-5 py-4 shadow-sm'><Link to='/' className='font-bold text-emerald-800'>Gourmetize</Link><div className='flex items-center gap-3 text-sm'><span>{user.name} · <b>{user.role === 'consumer' ? 'Consumidor' : user.role === 'producer' ? 'Produtor' : 'Administrador'}</b></span><button onClick={signOut} className='inline-flex items-center gap-2 rounded-lg border px-3 py-2'><LogOut size={15}/>Sair</button></div></header>
    <div className='mb-7 flex flex-wrap items-end justify-between gap-3'><div><p className='text-xs font-bold uppercase tracking-widest text-emerald-700'>Mercado local</p><h1 className='text-3xl font-bold'>{user.role === 'producer' ? 'Central do produtor' : user.role === 'admin' ? 'Operação da plataforma' : 'Sua feira, hoje'}</h1></div>{user.role === 'consumer' && <button onClick={checkout} disabled={!Object.keys(cart).length} className='rounded-xl bg-emerald-700 px-4 py-3 font-semibold text-white disabled:opacity-40'>Finalizar pedido · {money(total)}</button>}</div>
    {notice && <div className='mb-5 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900'>{notice}</div>}
    {loading ? <p>Carregando dados seguros…</p> : user.role === 'producer' ? <Producer products={products} orders={orders} draft={newProduct} setDraft={setNewProduct} submit={createProduct} changeStatus={changeStatus} /> : <Consumer products={products} cart={cart} add={(id) => setCart(current => ({ ...current, [id]: (current[id] ?? 0) + 1 }))} />}
    {user.role === 'admin' && <Orders orders={orders} admin changeStatus={changeStatus}/>}</div></main>;
}
function Consumer({ products, cart, add }: { products: Product[]; cart: Record<number, number>; add: (id: number) => void }) { return <section><h2 className='mb-4 text-xl font-bold'>Produtos disponíveis</h2><div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>{products.map(p => <article key={p.id} className='rounded-2xl border bg-white p-5 shadow-sm'><p className='text-xs font-semibold text-emerald-700'>{p.producer.name}</p><h3 className='mt-1 text-lg font-bold'>{p.name}</h3><p className='mt-2 min-h-10 text-sm text-slate-600'>{p.description}</p><div className='mt-4 flex items-center justify-between'><b>{money(p.price_cents)}</b><button onClick={() => add(p.id)} disabled={(cart[p.id] ?? 0) >= p.stock} className='rounded-lg bg-emerald-700 px-3 py-2 text-sm font-semibold text-white'>Adicionar</button></div></article>)}</div></section>; }
function Producer({ products, orders, draft, setDraft, submit, changeStatus }: any) { return <div className='grid gap-7 lg:grid-cols-[.8fr_1.2fr]'><form onSubmit={submit} className='rounded-2xl border bg-white p-5 shadow-sm'><h2 className='mb-4 flex items-center gap-2 text-xl font-bold'><Plus size={19}/>Novo produto</h2><input required value={draft.name} onChange={e => setDraft({...draft, name:e.target.value})} className='dash-input' placeholder='Nome'/><textarea value={draft.description} onChange={e => setDraft({...draft, description:e.target.value})} className='dash-input mt-3' placeholder='Descrição'/><div className='mt-3 grid grid-cols-2 gap-3'><input required value={draft.price} onChange={e => setDraft({...draft, price:e.target.value})} className='dash-input' placeholder='Preço (R$)'/><input required value={draft.stock} onChange={e => setDraft({...draft, stock:e.target.value})} className='dash-input' placeholder='Estoque'/></div><button className='mt-4 w-full rounded-lg bg-emerald-700 py-3 font-semibold text-white'>Publicar</button></form><div><h2 className='mb-4 flex items-center gap-2 text-xl font-bold'><Sprout size={19}/>Meu catálogo</h2>{products.map((p: Product) => <div key={p.id} className='mb-3 rounded-xl border bg-white p-4'><b>{p.name}</b><span className='float-right'>{p.stock} un.</span><p className='text-sm text-slate-600'>{money(p.price_cents)}</p></div>)}<Orders orders={orders} changeStatus={changeStatus}/></div></div>; }
function Orders({ orders, changeStatus, admin = false }: { orders: Order[]; changeStatus: (order: Order, status: string) => void; admin?: boolean }) { return <section className='mt-7'><h2 className='mb-4 flex items-center gap-2 text-xl font-bold'><ShoppingBag size={19}/>Pedidos</h2>{orders.map(order => <article key={order.id} className='mb-3 rounded-xl border bg-white p-4'><b>Pedido #{order.id}</b><span className='ml-2 text-sm text-slate-600'>{statusText[order.status] ?? order.status}</span><span className='float-right font-semibold'>{money(order.total_cents)}</span><p className='mt-2 text-sm'>{order.items.map(item => `${item.quantity}× ${item.product_name}`).join(', ')}</p>{(admin || order.status !== 'completed') && <select value={order.status} onChange={e => changeStatus(order, e.target.value)} className='mt-3 rounded border p-2 text-sm'><option value='new'>Novo</option><option value='preparing'>Em preparo</option><option value='delivering'>A caminho</option><option value='completed'>Concluído</option><option value='cancelled'>Cancelado</option></select>}</article>)}</section>; }
