import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

const URLS = {
  auth: "https://functions.poehali.dev/41eb9af5-55fe-4528-b41e-f9102919a259",
  products: "https://functions.poehali.dev/a930e6be-82f0-4bee-a4d3-c582d32775ef",
  orders: "https://functions.poehali.dev/aff50269-75f9-4981-8d81-2e79ac8cdc0c",
};

const C = {
  bg: "#F4F6F9",
  sidebar: "#111111",
  sidebarText: "#CCCCCC",
  sidebarActive: "#7CC800",
  white: "#FFFFFF",
  btn: "#7CC800",
  btnH: "#69AE00",
  text: "#111111",
  muted: "#666666",
  border: "#E5E7EB",
  danger: "#EF4444",
  yellow: "#F59E0B",
  green: "#10B981",
};

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  new: { label: "Новый", color: C.btn },
  in_progress: { label: "В работе", color: C.yellow },
  done: { label: "Выполнен", color: C.green },
  cancelled: { label: "Отменён", color: C.danger },
};

function authHeaders(token: string) {
  return { "Content-Type": "application/json", Authorization: `Bearer ${token}` };
}

// ─── LOGIN ────────────────────────────────────────────────────────────────────
function LoginPage({ onLogin }: { onLogin: (token: string, username: string) => void }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch(URLS.auth, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();
    setLoading(false);
    if (data.ok) {
      localStorage.setItem("admin_token", data.token);
      onLogin(data.token, data.username);
    } else {
      setError(data.error || "Ошибка входа");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: C.bg }}>
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg p-8">
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-3" style={{ background: C.btn }}>
            <Icon name="Shield" size={24} color={C.white} />
          </div>
          <h1 className="text-xl font-bold" style={{ color: C.text }}>Вход в панель</h1>
          <p className="text-sm mt-1" style={{ color: C.muted }}>Только для администраторов</p>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: C.muted }}>Логин</label>
            <input
              className="w-full border rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2"
              style={{ borderColor: C.border, color: C.text, ringColor: C.btn } as React.CSSProperties}
              value={username}
              onChange={e => setUsername(e.target.value)}
              autoFocus
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: C.muted }}>Пароль</label>
            <input
              type="password"
              className="w-full border rounded-lg px-4 py-2.5 text-sm outline-none"
              style={{ borderColor: C.border, color: C.text }}
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          {error && <p className="text-sm text-center" style={{ color: C.danger }}>{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-lg font-semibold text-sm transition-colors mt-2"
            style={{ background: loading ? "#ccc" : C.btn, color: C.white }}
          >
            {loading ? "Вход..." : "Войти"}
          </button>
        </form>
      </div>
    </div>
  );
}

// ─── PRODUCTS TAB ─────────────────────────────────────────────────────────────
interface Product {
  id: number; name: string; category: string; description: string;
  specs: string; image_url: string; is_active: boolean; created_at: string;
}

function ProductsTab({ token }: { token: string }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ name: "", category: "", description: "", specs: "", image_url: "" });

  async function load() {
    const res = await fetch(URLS.products);
    const data = await res.json();
    setProducts(data);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    await fetch(URLS.products, {
      method: "POST",
      headers: authHeaders(token),
      body: JSON.stringify(form),
    });
    setSaving(false);
    setShowForm(false);
    setForm({ name: "", category: "", description: "", specs: "", image_url: "" });
    load();
  }

  async function handleDelete(id: number) {
    if (!confirm("Удалить товар?")) return;
    await fetch(`${URLS.products}?id=${id}`, { method: "DELETE", headers: authHeaders(token) });
    load();
  }

  async function toggleActive(p: Product) {
    await fetch(`${URLS.products}?id=${p.id}`, {
      method: "PUT",
      headers: authHeaders(token),
      body: JSON.stringify({ ...p, is_active: !p.is_active }),
    });
    load();
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold" style={{ color: C.text }}>Каталог товаров</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
          style={{ background: C.btn, color: C.white }}
        >
          <Icon name={showForm ? "X" : "Plus"} size={16} />
          {showForm ? "Закрыть" : "Добавить товар"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleAdd} className="bg-white rounded-xl border p-6 mb-6 grid grid-cols-1 md:grid-cols-2 gap-4"
          style={{ borderColor: C.border }}>
          <h3 className="col-span-full font-semibold" style={{ color: C.text }}>Новый товар</h3>
          {[
            { key: "name", label: "Название", required: true },
            { key: "category", label: "Категория" },
            { key: "image_url", label: "Ссылка на изображение" },
          ].map(f => (
            <div key={f.key}>
              <label className="block text-sm font-medium mb-1" style={{ color: C.muted }}>{f.label}</label>
              <input
                className="w-full border rounded-lg px-3 py-2 text-sm"
                style={{ borderColor: C.border }}
                required={f.required}
                value={form[f.key as keyof typeof form]}
                onChange={e => setForm(prev => ({ ...prev, [f.key]: e.target.value }))}
              />
            </div>
          ))}
          {[
            { key: "description", label: "Описание" },
            { key: "specs", label: "Характеристики" },
          ].map(f => (
            <div key={f.key} className="col-span-full">
              <label className="block text-sm font-medium mb-1" style={{ color: C.muted }}>{f.label}</label>
              <textarea
                rows={3}
                className="w-full border rounded-lg px-3 py-2 text-sm resize-none"
                style={{ borderColor: C.border }}
                value={form[f.key as keyof typeof form]}
                onChange={e => setForm(prev => ({ ...prev, [f.key]: e.target.value }))}
              />
            </div>
          ))}
          <div className="col-span-full flex justify-end gap-3">
            <button type="button" onClick={() => setShowForm(false)}
              className="px-4 py-2 rounded-lg text-sm border font-medium"
              style={{ borderColor: C.border, color: C.muted }}>Отмена</button>
            <button type="submit" disabled={saving}
              className="px-6 py-2 rounded-lg text-sm font-semibold"
              style={{ background: C.btn, color: C.white }}>
              {saving ? "Сохранение..." : "Сохранить"}
            </button>
          </div>
        </form>
      )}

      {loading ? (
        <p className="text-sm text-center py-10" style={{ color: C.muted }}>Загрузка...</p>
      ) : products.length === 0 ? (
        <div className="bg-white rounded-xl border p-10 text-center" style={{ borderColor: C.border }}>
          <Icon name="Package" size={40} color={C.border} />
          <p className="mt-3 text-sm" style={{ color: C.muted }}>Товаров пока нет. Добавьте первый!</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border overflow-hidden" style={{ borderColor: C.border }}>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ background: C.bg }}>
                {["Название", "Категория", "Статус", "Дата", "Действия"].map(h => (
                  <th key={h} className="px-4 py-3 text-left font-semibold" style={{ color: C.muted }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {products.map((p, i) => (
                <tr key={p.id} style={{ borderTop: i > 0 ? `1px solid ${C.border}` : undefined }}>
                  <td className="px-4 py-3 font-medium" style={{ color: C.text }}>{p.name}</td>
                  <td className="px-4 py-3" style={{ color: C.muted }}>{p.category || "—"}</td>
                  <td className="px-4 py-3">
                    <button onClick={() => toggleActive(p)}
                      className="px-2.5 py-1 rounded-full text-xs font-semibold"
                      style={{ background: p.is_active ? "#ECFDF5" : "#FEF2F2", color: p.is_active ? C.green : C.danger }}>
                      {p.is_active ? "Активен" : "Скрыт"}
                    </button>
                  </td>
                  <td className="px-4 py-3 text-xs" style={{ color: C.muted }}>
                    {new Date(p.created_at).toLocaleDateString("ru-RU")}
                  </td>
                  <td className="px-4 py-3">
                    <button onClick={() => handleDelete(p.id)}
                      className="p-1.5 rounded hover:bg-red-50 transition-colors">
                      <Icon name="Trash2" size={15} color={C.danger} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// ─── ORDERS TAB ───────────────────────────────────────────────────────────────
interface Order {
  id: number; name: string; company: string; email: string;
  phone: string; product: string; message: string; status: string; created_at: string;
}

function OrdersTab({ token }: { token: string }) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<number | null>(null);

  async function load() {
    const res = await fetch(URLS.orders, { headers: authHeaders(token) });
    const data = await res.json();
    setOrders(data);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function changeStatus(id: number, status: string) {
    setUpdating(id);
    await fetch(`${URLS.orders}?id=${id}`, {
      method: "PUT",
      headers: authHeaders(token),
      body: JSON.stringify({ status }),
    });
    setUpdating(null);
    load();
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold" style={{ color: C.text }}>Заказы и заявки</h2>
        <span className="text-sm px-3 py-1 rounded-full font-semibold"
          style={{ background: "#EFF6FF", color: "#3B82F6" }}>
          {orders.filter(o => o.status === "new").length} новых
        </span>
      </div>

      {loading ? (
        <p className="text-sm text-center py-10" style={{ color: C.muted }}>Загрузка...</p>
      ) : orders.length === 0 ? (
        <div className="bg-white rounded-xl border p-10 text-center" style={{ borderColor: C.border }}>
          <Icon name="InboxIcon" fallback="Inbox" size={40} color={C.border} />
          <p className="mt-3 text-sm" style={{ color: C.muted }}>Заявок пока нет</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border overflow-hidden" style={{ borderColor: C.border }}>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ background: C.bg }}>
                {["#", "Имя / Компания", "Контакт", "Продукт", "Сообщение", "Статус"].map(h => (
                  <th key={h} className="px-4 py-3 text-left font-semibold" style={{ color: C.muted }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {orders.map((o, i) => (
                <tr key={o.id} style={{ borderTop: i > 0 ? `1px solid ${C.border}` : undefined }}>
                  <td className="px-4 py-3 text-xs" style={{ color: C.muted }}>#{o.id}</td>
                  <td className="px-4 py-3">
                    <div className="font-medium" style={{ color: C.text }}>{o.name}</div>
                    {o.company && <div className="text-xs" style={{ color: C.muted }}>{o.company}</div>}
                    <div className="text-xs" style={{ color: C.muted }}>{new Date(o.created_at).toLocaleDateString("ru-RU")}</div>
                  </td>
                  <td className="px-4 py-3">
                    {o.phone && <div style={{ color: C.text }}>{o.phone}</div>}
                    {o.email && <div className="text-xs" style={{ color: C.muted }}>{o.email}</div>}
                  </td>
                  <td className="px-4 py-3 max-w-[120px] truncate" style={{ color: C.muted }}>{o.product || "—"}</td>
                  <td className="px-4 py-3 max-w-[200px]">
                    <p className="text-xs line-clamp-2" style={{ color: C.muted }}>{o.message || "—"}</p>
                  </td>
                  <td className="px-4 py-3">
                    <select
                      value={o.status}
                      disabled={updating === o.id}
                      onChange={e => changeStatus(o.id, e.target.value)}
                      className="text-xs border rounded-lg px-2 py-1.5 font-semibold cursor-pointer"
                      style={{
                        borderColor: STATUS_LABELS[o.status]?.color || C.border,
                        color: STATUS_LABELS[o.status]?.color || C.text,
                        background: C.white,
                      }}
                    >
                      {Object.entries(STATUS_LABELS).map(([val, { label }]) => (
                        <option key={val} value={val}>{label}</option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// ─── MAIN ADMIN PAGE ──────────────────────────────────────────────────────────
export default function Admin() {
  const [token, setToken] = useState(() => localStorage.getItem("admin_token") || "");
  const [username, setUsername] = useState("");
  const [tab, setTab] = useState<"orders" | "products">("orders");
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (!token) { setChecking(false); return; }
    fetch(URLS.auth, { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json())
      .then(data => {
        if (data.ok) setUsername(data.username);
        else { setToken(""); localStorage.removeItem("admin_token"); }
      })
      .finally(() => setChecking(false));
  }, []);

  function handleLogin(t: string, u: string) { setToken(t); setUsername(u); }

  function handleLogout() {
    localStorage.removeItem("admin_token");
    setToken("");
    setUsername("");
  }

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: C.bg }}>
        <Icon name="Loader2" size={32} color={C.btn} />
      </div>
    );
  }

  if (!token) return <LoginPage onLogin={handleLogin} />;

  const navItems = [
    { key: "orders", label: "Заказы", icon: "ClipboardList" },
    { key: "products", label: "Каталог", icon: "Package" },
  ] as const;

  return (
    <div className="min-h-screen flex" style={{ background: C.bg }}>
      {/* Sidebar */}
      <aside className="w-56 flex flex-col py-6 px-4 shrink-0" style={{ background: C.sidebar }}>
        <div className="flex items-center gap-2 mb-8 px-2">
          <div className="w-7 h-7 rounded flex items-center justify-center" style={{ background: C.btn }}>
            <Icon name="Zap" size={14} color="#fff" />
          </div>
          <span className="font-bold text-sm text-white">Остек Админ</span>
        </div>

        <nav className="flex flex-col gap-1 flex-1">
          {navItems.map(item => (
            <button
              key={item.key}
              onClick={() => setTab(item.key)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-left transition-colors"
              style={{
                background: tab === item.key ? "#1E1E1E" : "transparent",
                color: tab === item.key ? C.sidebarActive : C.sidebarText,
              }}
            >
              <Icon name={item.icon} size={16} />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="border-t pt-4 mt-4" style={{ borderColor: "#2A2A2A" }}>
          <div className="px-3 mb-3">
            <div className="text-xs font-semibold text-white">{username}</div>
            <div className="text-xs" style={{ color: C.sidebarText }}>Администратор</div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm w-full transition-colors"
            style={{ color: C.sidebarText }}
            onMouseEnter={e => (e.currentTarget.style.background = "#1E1E1E")}
            onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
          >
            <Icon name="LogOut" size={15} />
            Выйти
          </button>
        </div>
      </aside>

      {/* Content */}
      <main className="flex-1 p-8 overflow-auto">
        {tab === "orders" && <OrdersTab token={token} />}
        {tab === "products" && <ProductsTab token={token} />}
      </main>
    </div>
  );
}