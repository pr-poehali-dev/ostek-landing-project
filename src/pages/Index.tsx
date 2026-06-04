import { useState } from "react";
import Icon from "@/components/ui/icon";

const PRODUCT_IMAGE = "https://cdn.poehali.dev/projects/c1e68221-34b2-4916-b8ef-350370ecb4ea/files/8a67a025-66f9-4318-adb8-44d97b0be725.jpg";
const STYLE_IMAGE = "https://cdn.poehali.dev/projects/c1e68221-34b2-4916-b8ef-350370ecb4ea/bucket/9a8169e7-ece4-4278-bd68-1fe71872b56b.png";
const LOGO_IMAGE = "https://cdn.poehali.dev/projects/c1e68221-34b2-4916-b8ef-350370ecb4ea/bucket/60cecc92-0e1d-4cbc-b1d9-1fa1ca471bb1.jpg";

function OstecLogo({ className = "" }: { className?: string }) {
  return (
    <img src={LOGO_IMAGE} alt="Остек" className={className} style={{ objectFit: "contain" }} />
  );
}

const specs = [
  { param: "Грузоподъёмность",     os1000: "до 5 кг",       os3000: "до 25 кг",   os6500: "до 100 кг" },
  { param: "Диапазон углов",       os1000: "±180°",         os3000: "±360°",      os6500: "Неограничен" },
  { param: "Скорость вращения",    os1000: "до 400 °/с",    os3000: "до 300 °/с", os6500: "до 150 °/с" },
  { param: "Погрешность позиц.",   os1000: "±0.001°",       os3000: "±0.003°",    os6500: "±0.005°" },
  { param: "Степеней свободы",     os1000: "1 DOF",         os3000: "3 DOF",      os6500: "6 DOF" },
  { param: "Интерфейс",            os1000: "USB / RS-422",  os3000: "Eth / CAN",  os6500: "Eth / CAN" },
];

const advantages = [
  { icon: "Crosshair", title: "Субмикронная точность",   desc: "Погрешность позиционирования от ±0.001°. Подходит для калибровки высокоточных МЭМС-гироскопов и БИНС." },
  { icon: "Shield",    title: "Соответствие MIL-STD-810H", desc: "Продукция прошла испытания по ГОСТ РВ и MIL-STD-810H. Полный пакет документации и метрологической аттестации." },
  { icon: "Plug",      title: "Открытый API",            desc: "Поддержка LabVIEW, MATLAB/Simulink и Python SDK. Драйверы Windows / Linux. Интеграция от 1 дня." },
];

const applications = [
  { icon: "Navigation", label: "Инерциальные системы", desc: "Испытания и калибровка ИНС, БИНС, AHRS" },
  { icon: "RotateCcw",  label: "Гироскопы",            desc: "Точная имитация угловых движений" },
  { icon: "Cpu",        label: "МЭМС-датчики",         desc: "Верификация MEMS IMU и акселерометров" },
  { icon: "Plane",      label: "Авионика",              desc: "Системы навигации БПЛА и авиатехники" },
  { icon: "Car",        label: "Автопром / ADAS",       desc: "Калибровка систем автономного вождения" },
  { icon: "Rocket",     label: "Космос",                desc: "Испытания датчиков ориентации КА" },
];

const cases = [
  { num: "01", tag: "Авиация",   task: "Калибровка БИНС с погрешностью не более 0.002° при −40…+60 °C.", solution: "Трёхосевой стенд ОС-3000 с термокамерой и ПО автокалибровки.", result: "Время калибровки сократилось в 4 раза. Погрешность — 0.0015°." },
  { num: "02", tag: "Автопром",  task: "Тестирование 6-осевых IMU для ADAS при вибрации до 20 g.", solution: "Комплекс ОС-6500 с интеграцией в тестовый стенд через Ethernet.", result: "Выявлено 12% дефектных партий до сборки. Рекламации −87%." },
  { num: "03", tag: "Космос",    task: "Испытания МЭМС-гироскопов в режиме имитации орбитального движения.", solution: "Прецизионный ОС-6500 со скоростью до 0.0001 °/с и спецпрофилями.", result: "Сертификация оборудования для трёх КА. Сопровождение 5 лет." },
];

const faqs = [
  { q: "Какая гарантия на стенды?", a: "Стандартная гарантия — 24 месяца. По запросу — расширенная до 36 или 60 месяцев с приоритетным выездом инженера в течение 48 часов." },
  { q: "Как оформить ТЗ на нестандартный стенд?", a: "Мы проводим бесплатную консультацию, по итогам которой готовим ТЗ и КП. Разработка нестандартного изделия — от 8 недель в зависимости от DOF и требований точности." },
  { q: "Есть ли у вас сертификаты?", a: "Да. Продукция сертифицирована по ГОСТ РВ 0015-002. Все стенды проходят метрологическую аттестацию. Документация предоставляется в комплекте поставки." },
];

// ─── Palette ──────────────────────────────────────────────────────────────────
const C = {
  dark:    "#1A1A1A",   // хедер, заголовки
  mid:     "#2C2C2C",   // тёмный фон для мобильного меню
  accent:  "#5C6B3A",   // болотный/оливковый — кнопки, иконки, акценты
  accentH: "#4A5630",   // hover болотного
  accentBg:"#EFF2E8",   // очень светлый оливковый фон для плашек
  light:   "#F8F8F6",   // основной светлый фон секций
  white:   "#FFFFFF",
  text:    "#222222",   // основной текст
  muted:   "#6B7280",   // вторичный текст
  border:  "#E2E4DC",   // граница на светлом
  borderD: "#3A3A3A",   // граница на тёмном фоне
};

// ─── Header ───────────────────────────────────────────────────────────────────
function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 shadow-sm" style={{ background: C.white, borderBottom: `1px solid ${C.border}` }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="h-16 flex items-center justify-between gap-8">
          <a href="#">
            <OstecLogo className="h-9 w-auto" />
          </a>
          <nav className="hidden md:flex items-center gap-7">
            {[{ label: "Продукты", href: "#specs" }, { label: "Решения", href: "#applications" }, { label: "О компании", href: "#cases" }, { label: "Контакты", href: "#footer" }].map((item) => (
              <a key={item.label} href={item.href} className="text-sm font-medium transition-colors" style={{ color: C.muted }}
                onMouseEnter={e => (e.currentTarget.style.color = C.accent)}
                onMouseLeave={e => (e.currentTarget.style.color = C.muted)}
              >{item.label}</a>
            ))}
          </nav>
          <div className="hidden md:flex items-center gap-5">
            <a href="tel:+74957884444" className="flex items-center gap-2 text-sm font-medium transition-colors" style={{ color: C.text }}>
              <Icon name="Phone" size={14} style={{ color: C.accent }} />
              +7 (495) 788-44-44
            </a>
            <a href="#footer" className="text-sm font-semibold px-5 py-2 transition-colors" style={{ background: C.accent, color: C.white }}
              onMouseEnter={e => (e.currentTarget.style.background = C.accentH)}
              onMouseLeave={e => (e.currentTarget.style.background = C.accent)}
            >Заказать</a>
          </div>
          <button className="md:hidden" style={{ color: C.muted }} onClick={() => setMenuOpen(!menuOpen)}>
            <Icon name={menuOpen ? "X" : "Menu"} size={22} />
          </button>
        </div>
      </div>
      {menuOpen && (
        <div className="md:hidden px-6 py-4 space-y-3" style={{ background: C.white, borderTop: `1px solid ${C.border}` }}>
          {["Продукты", "Решения", "О компании", "Контакты"].map((item) => (
            <a key={item} href="#" className="block text-sm font-medium py-1" style={{ color: C.text }} onClick={() => setMenuOpen(false)}>{item}</a>
          ))}
          <a href="#footer" className="block text-sm font-semibold px-4 py-2.5 text-center mt-3" style={{ background: C.accent, color: C.white }} onClick={() => setMenuOpen(false)}>Заказать</a>
        </div>
      )}
    </header>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="relative overflow-hidden" style={{ background: C.light, borderBottom: `1px solid ${C.border}`, minHeight: 520 }}>
      <div className="max-w-7xl mx-auto px-6 py-20 md:py-28">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-widest mb-7" style={{ color: C.accent }}>
              <span className="w-6 h-px" style={{ background: C.accent }} />
              Стенды имитации движения
            </div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4" style={{ color: C.dark }}>
              Стенды имитации<br />движения
            </h1>
            <p className="text-xl font-medium mb-3" style={{ color: C.muted }}>
              Одноосевые поворотные столы для испытаний и калибровки
            </p>
            <p className="text-sm leading-relaxed mb-8 max-w-md" style={{ color: C.muted }}>
              Высокоточное оборудование для тестирования инерциальных навигационных систем, гироскопов и МЭМС-датчиков. Соответствие MIL-STD-810H и ГОСТ РВ.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="#specs" className="inline-flex items-center gap-2 text-sm font-semibold px-6 py-3 transition-colors"
                style={{ background: C.accent, color: C.white }}
                onMouseEnter={e => (e.currentTarget.style.background = C.accentH)}
                onMouseLeave={e => (e.currentTarget.style.background = C.accent)}
              >
                Подробнее <Icon name="ArrowRight" size={16} />
              </a>
              <a href="#footer" className="inline-flex items-center gap-2 text-sm font-medium px-6 py-3 transition-colors"
                style={{ border: `1px solid ${C.border}`, color: C.text, background: C.white }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = C.accent; e.currentTarget.style.color = C.accent; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.text; }}
              >
                Запросить КП
              </a>
            </div>
            <div className="flex gap-10 mt-10 pt-8" style={{ borderTop: `1px solid ${C.border}` }}>
              {[["15+", "лет опыта"], ["200+", "стендов в эксплуатации"], ["40+", "стран поставки"]].map(([n, l]) => (
                <div key={l}>
                  <div className="text-2xl font-bold" style={{ color: C.accent }}>{n}</div>
                  <div className="text-xs mt-0.5" style={{ color: C.muted }}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="hidden md:block relative">
            <div className="overflow-hidden shadow-lg" style={{ border: `1px solid ${C.border}` }}>
              <img src={PRODUCT_IMAGE} alt="Поворотный стол Остек" className="w-full h-80 object-cover" />
            </div>
            <div className="absolute -bottom-4 -left-4 px-5 py-3 shadow-lg" style={{ background: C.accent }}>
              <div className="text-xs font-medium" style={{ color: "rgba(255,255,255,0.75)" }}>Точность позиционирования</div>
              <div className="text-xl font-bold text-white">±0.001°</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Product block ─────────────────────────────────────────────────────────────
function ProductBlock() {
  return (
    <section className="py-20" style={{ background: C.light, borderBottom: `1px solid ${C.border}` }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div>
            <div className="text-xs font-medium uppercase tracking-widest mb-4" style={{ color: C.accent }}>Флагманский продукт</div>
            <h2 className="text-3xl font-bold mb-2" style={{ color: C.dark }}>ОС-1000</h2>
            <p className="text-xl font-medium mb-4" style={{ color: C.muted }}>Одноосевой поворотный стол</p>
            <p className="text-sm leading-relaxed mb-6" style={{ color: C.text }}>
              Компактный прецизионный стенд для калибровки одноосевых гироскопов, акселерометров и МЭМС-датчиков. Бесшумный прямой привод, закрытая обратная связь по энкодеру.
            </p>
            <a href="#footer" className="inline-flex items-center gap-2 text-sm font-semibold transition-colors group" style={{ color: C.accent }}
              onMouseEnter={e => (e.currentTarget.style.color = C.accentH)}
              onMouseLeave={e => (e.currentTarget.style.color = C.accent)}
            >
              Запросить спецификацию
              <Icon name="ArrowRight" size={15} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
          <div>
            <div className="text-xs font-medium uppercase tracking-widest mb-4" style={{ color: C.muted }}>Ключевые характеристики</div>
            {[
              ["Грузоподъёмность", "до 5 кг"],
              ["Погрешность позиционирования", "±0.001°"],
              ["Скорость вращения", "до 400 °/с"],
              ["Интерфейс управления", "USB / RS-422 / Ethernet"],
              ["Диапазон углов", "±360° / неограничен"],
              ["Рабочая температура", "−10…+50 °C"],
            ].map(([name, value]) => (
              <div key={name} className="flex items-center justify-between py-3.5" style={{ borderBottom: `1px solid ${C.border}` }}>
                <span className="text-sm" style={{ color: C.muted }}>{name}</span>
                <span className="text-sm font-semibold font-mono" style={{ color: C.dark }}>{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Advantages ───────────────────────────────────────────────────────────────
function Advantages() {
  return (
    <section className="py-20" style={{ background: C.white, borderBottom: `1px solid ${C.border}` }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="text-xs font-medium uppercase tracking-widest mb-3" style={{ color: C.accent }}>Преимущества</div>
          <h2 className="text-3xl font-bold" style={{ color: C.dark }}>Почему выбирают Остек</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {advantages.map((a) => (
            <div key={a.title} className="p-8 cursor-default transition-all duration-200 group"
              style={{ background: C.light, border: `1px solid ${C.border}` }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = C.accent; (e.currentTarget as HTMLElement).style.boxShadow = `0 4px 20px rgba(42,122,140,0.12)`; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = C.border; (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}
            >
              <div className="w-10 h-10 flex items-center justify-center mb-5 transition-colors duration-200" style={{ background: `rgba(42,122,140,0.12)` }}>
                <Icon name={a.icon} size={20} style={{ color: C.accent }} />
              </div>
              <h3 className="font-semibold mb-2" style={{ color: C.dark }}>{a.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: C.muted }}>{a.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Specs ────────────────────────────────────────────────────────────────────
function Specs() {
  return (
    <section id="specs" className="py-20" style={{ background: C.light, borderBottom: `1px solid ${C.border}` }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-10">
          <div className="text-xs font-medium uppercase tracking-widest mb-3" style={{ color: C.accent }}>Линейка продуктов</div>
          <h2 className="text-3xl font-bold" style={{ color: C.dark }}>Технические характеристики</h2>
        </div>
        <div className="overflow-x-auto" style={{ border: `1px solid ${C.border}` }}>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ background: C.white, borderBottom: `1px solid ${C.border}` }}>
                <th className="text-left font-medium px-6 py-4 text-xs uppercase tracking-wider" style={{ color: C.muted }}>Параметр</th>
                <th className="text-center font-semibold px-6 py-4" style={{ color: C.dark }}>ОС-1000<span className="block font-normal text-xs font-sans" style={{ color: C.muted }}>1-DOF</span></th>
                <th className="text-center font-semibold px-6 py-4" style={{ color: C.dark }}>ОС-3000<span className="block font-normal text-xs font-sans" style={{ color: C.muted }}>3-DOF</span></th>
                <th className="text-center font-semibold px-6 py-4 text-white" style={{ background: C.accent }}>ОС-6500<span className="block font-normal text-xs font-sans" style={{ color: "rgba(232,244,247,0.7)" }}>6-DOF</span></th>
              </tr>
            </thead>
            <tbody>
              {specs.map((row, i) => (
                <tr key={row.param} style={{ background: i % 2 === 0 ? C.white : C.light, borderBottom: `1px solid ${C.border}` }}>
                  <td className="px-6 py-4" style={{ color: C.muted }}>{row.param}</td>
                  <td className="text-center px-6 py-4 font-mono" style={{ color: C.text }}>{row.os1000}</td>
                  <td className="text-center px-6 py-4 font-mono" style={{ color: C.text }}>{row.os3000}</td>
                  <td className="text-center px-6 py-4 font-mono font-semibold" style={{ background: "rgba(42,122,140,0.08)", color: C.dark, borderLeft: `1px solid ${C.border}`, borderRight: `1px solid ${C.border}` }}>{row.os6500}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs mt-3" style={{ color: C.muted }}>* Нестандартные параметры — по ТЗ заказчика.</p>
      </div>
    </section>
  );
}

// ─── Applications ─────────────────────────────────────────────────────────────
function Applications() {
  return (
    <section id="applications" className="py-20" style={{ background: C.white, borderBottom: `1px solid ${C.border}` }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12">
          <div className="text-xs font-medium uppercase tracking-widest mb-3" style={{ color: C.accent }}>Применение</div>
          <h2 className="text-3xl font-bold" style={{ color: C.dark }}>Сферы применения</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {applications.map((app) => (
            <div key={app.label} className="flex gap-4 items-start p-6 cursor-default transition-all duration-200"
              style={{ background: C.light, border: `1px solid ${C.border}` }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = C.accent; (e.currentTarget as HTMLElement).style.boxShadow = `0 2px 12px rgba(92,107,58,0.10)`; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = C.border; (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}
            >
              <div className="shrink-0 w-9 h-9 flex items-center justify-center" style={{ background: C.accentBg }}>
                <Icon name={app.icon} size={18} style={{ color: C.accent }} />
              </div>
              <div>
                <h3 className="font-semibold text-sm mb-1" style={{ color: C.dark }}>{app.label}</h3>
                <p className="text-xs leading-relaxed" style={{ color: C.muted }}>{app.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Cases ────────────────────────────────────────────────────────────────────
function Cases() {
  return (
    <section id="cases" className="py-20" style={{ background: C.white, borderBottom: `1px solid ${C.border}` }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12">
          <div className="text-xs font-medium uppercase tracking-widest mb-3" style={{ color: C.accent }}>Опыт</div>
          <h2 className="text-3xl font-bold" style={{ color: C.dark }}>Реализованные проекты</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {cases.map((c) => (
            <div key={c.num} className="transition-all duration-200 cursor-default"
              style={{ border: `1px solid ${C.border}` }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = C.accent; (e.currentTarget as HTMLElement).style.boxShadow = `0 4px 20px rgba(42,122,140,0.1)`; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = C.border; (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}
            >
              <div className="px-6 py-4 flex items-center justify-between" style={{ background: C.accent }}>
                <span className="font-bold text-lg font-mono text-white">{c.num}</span>
                <span className="text-xs font-medium uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.7)" }}>{c.tag}</span>
              </div>
              <div className="p-6 space-y-4" style={{ background: C.white }}>
                <div>
                  <div className="text-xs font-medium uppercase tracking-wider mb-1.5" style={{ color: C.muted }}>Задача</div>
                  <p className="text-sm leading-relaxed" style={{ color: C.text }}>{c.task}</p>
                </div>
                <div style={{ height: 1, background: C.border }} />
                <div>
                  <div className="text-xs font-medium uppercase tracking-wider mb-1.5" style={{ color: C.muted }}>Решение</div>
                  <p className="text-sm leading-relaxed" style={{ color: C.text }}>{c.solution}</p>
                </div>
                <div style={{ height: 1, background: C.border }} />
                <div>
                  <div className="text-xs font-medium uppercase tracking-wider mb-1.5" style={{ color: C.accent }}>Результат</div>
                  <p className="text-sm font-semibold leading-relaxed" style={{ color: C.dark }}>{c.result}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Video ────────────────────────────────────────────────────────────────────
function VideoSection() {
  const [open, setOpen] = useState(false);
  return (
    <section className="py-20" style={{ background: C.light, borderBottom: `1px solid ${C.border}` }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="text-xs font-medium uppercase tracking-widest mb-3" style={{ color: C.accent }}>Демонстрация</div>
            <h2 className="text-3xl font-bold mb-4" style={{ color: C.dark }}>Стенд в действии</h2>
            <p className="text-sm leading-relaxed mb-6" style={{ color: C.muted }}>
              Посмотрите, как стенд ОС-6500 выполняет полный цикл калибровки БИНС за 12 минут. Видео доступно по запросу или на очной демонстрации в нашем демозале.
            </p>
            <button onClick={() => setOpen(true)} className="inline-flex items-center gap-2 text-sm font-medium px-5 py-2.5 transition-colors"
              style={{ border: `1px solid ${C.accent}`, color: C.accent }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = C.accent; (e.currentTarget as HTMLElement).style.color = C.white; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.color = C.accent; }}
            >
              <Icon name="Play" size={15} />
              Смотреть видео
            </button>
          </div>
          <div className="relative overflow-hidden shadow cursor-pointer group" style={{ border: `1px solid ${C.border}` }} onClick={() => setOpen(true)}>
            <img src={PRODUCT_IMAGE} alt="" className="w-full h-64 object-cover opacity-70 group-hover:opacity-90 transition-opacity duration-300" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200" style={{ background: C.accent }}>
                <Icon name="Play" size={26} className="ml-1 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
      {open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6" style={{ background: "rgba(0,0,0,0.45)" }} onClick={() => setOpen(false)}>
          <div className="p-8 max-w-lg w-full text-center shadow-2xl" style={{ background: C.white, border: `1px solid ${C.border}` }} onClick={e => e.stopPropagation()}>
            <div className="w-12 h-12 flex items-center justify-center mx-auto mb-4" style={{ background: C.accentBg }}>
              <Icon name="Play" size={22} style={{ color: C.accent }} className="ml-0.5" />
            </div>
            <h3 className="font-bold text-lg mb-2" style={{ color: C.dark }}>Видео-демонстрация</h3>
            <p className="text-sm mb-6" style={{ color: C.muted }}>Оставьте заявку — пришлём ссылку или пригласим на демонстрацию в нашем демозале.</p>
            <div className="flex gap-3 justify-center">
              <a href="#footer" className="text-sm font-semibold px-5 py-2.5 text-white transition-colors" style={{ background: C.accent }}
                onMouseEnter={e => (e.currentTarget.style.background = C.accentH)} onMouseLeave={e => (e.currentTarget.style.background = C.accent)}
                onClick={() => setOpen(false)}
              >Оставить заявку</a>
              <button onClick={() => setOpen(false)} className="text-sm font-medium px-5 py-2.5 transition-colors" style={{ border: `1px solid ${C.border}`, color: C.muted }}
                onMouseEnter={e => (e.currentTarget.style.color = C.dark)} onMouseLeave={e => (e.currentTarget.style.color = C.muted)}
              >Закрыть</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────
function FAQ() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section className="py-20" style={{ background: C.light, borderBottom: `1px solid ${C.border}` }}>
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="text-xs font-medium uppercase tracking-widest mb-3" style={{ color: C.accent }}>Вопросы и ответы</div>
          <h2 className="text-3xl font-bold" style={{ color: C.dark }}>Часто задаваемые вопросы</h2>
        </div>
        <div style={{ border: `1px solid ${C.border}` }}>
          {faqs.map((f, i) => (
            <div key={i} style={{ borderBottom: i < faqs.length - 1 ? `1px solid ${C.border}` : "none" }}>
              <button className="w-full flex items-center justify-between px-6 py-5 text-left transition-colors group" style={{ background: C.white }}
                onMouseEnter={e => (e.currentTarget.style.background = C.light)}
                onMouseLeave={e => (e.currentTarget.style.background = C.white)}
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span className="font-medium text-sm leading-snug transition-colors" style={{ color: open === i ? C.accent : C.dark }}>{f.q}</span>
                <span className={`ml-4 shrink-0 transition-transform duration-200 ${open === i ? "rotate-180" : ""}`}>
                  <Icon name="ChevronDown" size={18} style={{ color: open === i ? C.accent : C.muted }} />
                </span>
              </button>
              {open === i && (
                <div className="px-6 pb-5" style={{ background: C.light, borderTop: `1px solid ${C.border}` }}>
                  <p className="text-sm leading-relaxed pt-4" style={{ color: C.text }}>{f.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  const [form, setForm] = useState({ name: "", company: "", phone: "", comment: "" });
  const [sent, setSent] = useState(false);

  return (
    <footer id="footer" style={{ background: C.dark, borderTop: `1px solid ${C.borderD}` }}>
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-16">
          <div>
            <OstecLogo className="h-10 w-auto mb-6" />
            <p className="text-sm leading-relaxed mb-8 max-w-xs" style={{ color: "rgba(232,244,247,0.55)" }}>
              Разработка и поставка испытательного оборудования для навигационных и инерциальных систем.
            </p>
            <div className="space-y-3.5">
              {[
                { icon: "MapPin",     text: "121467, Москва, ул. Молдавская, д. 5, стр. 2" },
                { icon: "Phone",      text: "+7 (495) 788-44-44 (многоканальный)", href: "tel:+74957884444" },
                { icon: "Headphones", text: "8 800 700-39-39 (сервисный центр)",    href: "tel:88007003939" },
                { icon: "Printer",    text: "+7 (495) 788-44-42 (факс)" },
                { icon: "Mail",       text: "test@ostec-group.ru",                  href: "mailto:test@ostec-group.ru" },
                { icon: "Clock",      text: "Пн–Пт, 9:00–18:00 МСК" },
              ].map((item) => (
                <div key={item.text} className="flex items-start gap-3">
                  <Icon name={item.icon} size={15} style={{ color: C.accent, marginTop: 2, flexShrink: 0 }} />
                  {item.href
                    ? <a href={item.href} className="text-sm transition-colors" style={{ color: "rgba(232,244,247,0.75)" }}
                        onMouseEnter={e => (e.currentTarget.style.color = C.white)}
                        onMouseLeave={e => (e.currentTarget.style.color = "rgba(232,244,247,0.75)")}
                      >{item.text}</a>
                    : <span className="text-sm" style={{ color: "rgba(232,244,247,0.5)" }}>{item.text}</span>
                  }
                </div>
              ))}
            </div>
            <div className="mt-8 pt-8" style={{ borderTop: `1px solid ${C.borderD}` }}>
              <div className="text-xs font-medium uppercase tracking-wider mb-3" style={{ color: "rgba(232,244,247,0.4)" }}>Быстрые ссылки</div>
              <div className="grid grid-cols-2 gap-y-2 gap-x-4">
                {["Продукты", "Решения", "Сертификаты", "Демозал", "О компании", "Контакты"].map((link) => (
                  <a key={link} href="#" className="text-sm transition-colors" style={{ color: "rgba(232,244,247,0.5)" }}
                    onMouseEnter={e => (e.currentTarget.style.color = C.accent)}
                    onMouseLeave={e => (e.currentTarget.style.color = "rgba(232,244,247,0.5)")}
                  >{link}</a>
                ))}
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-1 text-white">Оставить заявку на расчёт</h3>
            <p className="text-sm mb-6" style={{ color: "rgba(232,244,247,0.5)" }}>Инженер свяжется с вами в течение 2 рабочих часов</p>

            {sent ? (
              <div className="p-8 text-center" style={{ border: `1px solid rgba(42,122,140,0.4)`, background: "rgba(42,122,140,0.1)" }}>
                <div className="w-10 h-10 flex items-center justify-center mx-auto mb-3" style={{ background: "rgba(42,122,140,0.2)" }}>
                  <Icon name="Check" size={20} style={{ color: C.accent }} />
                </div>
                <p className="font-semibold mb-1 text-white">Заявка принята</p>
                <p className="text-sm" style={{ color: "rgba(232,244,247,0.55)" }}>Наш инженер свяжется с вами в ближайшее время.</p>
              </div>
            ) : (
              <form onSubmit={e => { e.preventDefault(); setSent(true); }} className="space-y-4">
                {[
                  { key: "name",    label: "Ваше имя *",   type: "text",  required: true,  ph: "Иван Петров" },
                  { key: "company", label: "Компания",      type: "text",  required: false, ph: "ООО «Компания»" },
                  { key: "phone",   label: "Телефон *",     type: "tel",   required: true,  ph: "+7 (___) ___-__-__" },
                ].map(({ key, label, type, required, ph }) => (
                  <div key={key}>
                    <label className="block text-xs font-medium mb-1.5" style={{ color: "rgba(232,244,247,0.5)" }}>{label}</label>
                    <input type={type} required={required} value={form[key as keyof typeof form]} placeholder={ph}
                      onChange={e => setForm({ ...form, [key]: e.target.value })}
                      className="w-full px-3 py-2.5 text-sm placeholder:opacity-30 focus:outline-none transition-colors"
                      style={{ background: C.mid, border: `1px solid ${C.borderD}`, color: C.white }}
                      onFocus={e => (e.currentTarget.style.borderColor = C.accent)}
                      onBlur={e => (e.currentTarget.style.borderColor = C.borderD)}
                    />
                  </div>
                ))}
                <div>
                  <label className="block text-xs font-medium mb-1.5" style={{ color: "rgba(232,244,247,0.5)" }}>Требования / комментарий</label>
                  <textarea rows={3} value={form.comment} placeholder="DOF, грузоподъёмность, диапазон углов..."
                    onChange={e => setForm({ ...form, comment: e.target.value })}
                    className="w-full px-3 py-2.5 text-sm placeholder:opacity-30 focus:outline-none transition-colors resize-none"
                    style={{ background: C.mid, border: `1px solid ${C.borderD}`, color: C.white }}
                    onFocus={e => (e.currentTarget.style.borderColor = C.accent)}
                    onBlur={e => (e.currentTarget.style.borderColor = C.borderD)}
                  />
                </div>
                <button type="submit" className="w-full font-semibold py-3 text-sm flex items-center justify-center gap-2 text-white transition-colors"
                  style={{ background: C.accent }}
                  onMouseEnter={e => (e.currentTarget.style.background = C.accentH)}
                  onMouseLeave={e => (e.currentTarget.style.background = C.accent)}
                >
                  <Icon name="Send" size={15} />
                  Отправить заявку
                </button>
                <p className="text-xs text-center" style={{ color: "rgba(232,244,247,0.3)" }}>Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности</p>
              </form>
            )}
          </div>
        </div>
      </div>

      <div style={{ borderTop: `1px solid ${C.borderD}`, background: "#172E3A" }}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs" style={{ color: "rgba(232,244,247,0.35)" }}>© 2024 ГК Остек. Все права защищены.</p>
          <div className="flex gap-5">
            {["Политика конфиденциальности", "Реквизиты"].map(link => (
              <a key={link} href="#" className="text-xs transition-colors" style={{ color: "rgba(232,244,247,0.35)" }}
                onMouseEnter={e => (e.currentTarget.style.color = "rgba(232,244,247,0.7)")}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(232,244,247,0.35)")}
              >{link}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
const Index = () => (
  <div className="font-sans" style={{ color: C.text }}>
    <Header />
    <Hero />
    <ProductBlock />
    <Advantages />
    <Specs />
    <Applications />
    <Cases />
    <VideoSection />
    <FAQ />
    <Footer />
  </div>
);

export default Index;