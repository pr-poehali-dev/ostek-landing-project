import { useState } from "react";
import Icon from "@/components/ui/icon";

const PRODUCT_IMAGE = "https://cdn.poehali.dev/projects/c1e68221-34b2-4916-b8ef-350370ecb4ea/files/8a67a025-66f9-4318-adb8-44d97b0be725.jpg";

// SVG логотип Остек (воссоздан по фирменному стилю)
function OstecLogo({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 160 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="6" width="28" height="28" rx="2" fill="#0055A4" />
      <text x="14" y="25" textAnchor="middle" fill="white" fontSize="14" fontWeight="700" fontFamily="Arial, sans-serif">О</text>
      <text x="36" y="28" fill="#0055A4" fontSize="19" fontWeight="700" fontFamily="Arial, sans-serif" letterSpacing="1">СТЕК</text>
    </svg>
  );
}

const specs = [
  { param: "Грузоподъёмность", os1000: "до 5 кг", os3000: "до 25 кг", os6500: "до 100 кг" },
  { param: "Диапазон углов", os1000: "±180°", os3000: "±360°", os6500: "Неограничен" },
  { param: "Скорость вращения", os1000: "до 400 °/с", os3000: "до 300 °/с", os6500: "до 150 °/с" },
  { param: "Погрешность позиц.", os1000: "±0.001°", os3000: "±0.003°", os6500: "±0.005°" },
  { param: "Степеней свободы", os1000: "1 DOF", os3000: "3 DOF", os6500: "6 DOF" },
  { param: "Интерфейс", os1000: "USB / RS-422", os3000: "Ethernet / CAN", os6500: "Ethernet / CAN" },
];

const advantages = [
  {
    icon: "Crosshair",
    title: "Субмикронная точность",
    desc: "Погрешность позиционирования от ±0.001°. Подходит для калибровки высокоточных МЭМС-гироскопов и БИНС.",
  },
  {
    icon: "Shield",
    title: "Соответствие MIL-STD-810H",
    desc: "Продукция прошла испытания по ГОСТ РВ и MIL-STD-810H. Поставляется с полным пакетом документации и метрологической аттестацией.",
  },
  {
    icon: "Plug",
    title: "Открытый API",
    desc: "Поддержка LabVIEW, MATLAB/Simulink и Python SDK. Драйверы для Windows / Linux. Интеграция от 1 дня.",
  },
];

const applications = [
  { icon: "Navigation", label: "Инерциальные системы", desc: "Испытания и калибровка ИНС, БИНС, AHRS" },
  { icon: "RotateCcw", label: "Гироскопы", desc: "Точная имитация угловых движений" },
  { icon: "Cpu", label: "МЭМС-датчики", desc: "Верификация MEMS IMU и акселерометров" },
  { icon: "Plane", label: "Авионика", desc: "Системы навигации БПЛА и авиатехники" },
  { icon: "Car", label: "Автопром / ADAS", desc: "Калибровка систем автономного вождения" },
  { icon: "Rocket", label: "Космос", desc: "Испытания датчиков ориентации КА" },
];

const cases = [
  {
    num: "01",
    tag: "Авиация",
    task: "Калибровка БИНС с погрешностью не более 0.002° при −40…+60 °C.",
    solution: "Трёхосевой стенд ОС-3000 с термокамерой и ПО автокалибровки.",
    result: "Время калибровки сократилось в 4 раза. Погрешность — 0.0015°.",
  },
  {
    num: "02",
    tag: "Автопром",
    task: "Тестирование 6-осевых IMU для ADAS при вибрации до 20 g.",
    solution: "Комплекс ОС-6500 с интеграцией в тестовый стенд через Ethernet.",
    result: "Выявлено 12% дефектных партий до сборки. Рекламации −87%.",
  },
  {
    num: "03",
    tag: "Космос",
    task: "Испытания МЭМС-гироскопов в режиме имитации орбитального движения.",
    solution: "Прецизионный ОС-6500 со скоростью до 0.0001 °/с и спецпрофилями.",
    result: "Сертификация оборудования для трёх КА. Сопровождение 5 лет.",
  },
];

const faqs = [
  {
    q: "Какая гарантия на стенды?",
    a: "Стандартная гарантия — 24 месяца. По запросу — расширенная до 36 или 60 месяцев с приоритетным выездом инженера в течение 48 часов.",
  },
  {
    q: "Как оформить ТЗ на нестандартный стенд?",
    a: "Мы проводим бесплатную консультацию, по итогам которой готовим ТЗ и КП. Разработка нестандартного изделия — от 8 недель в зависимости от DOF и требований точности.",
  },
  {
    q: "Есть ли у вас сертификаты?",
    a: "Да. Продукция сертифицирована по ГОСТ РВ 0015-002. Все стенды проходят метрологическую аттестацию. Документация предоставляется в комплекте поставки.",
  },
];

function OstecLogoFull({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 200 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="4" width="40" height="40" rx="3" fill="#0055A4" />
      <text x="20" y="30" textAnchor="middle" fill="white" fontSize="20" fontWeight="800" fontFamily="Arial Black, Arial, sans-serif">О</text>
      <text x="50" y="34" fill="#0055A4" fontSize="24" fontWeight="800" fontFamily="Arial Black, Arial, sans-serif" letterSpacing="2">СТЕК</text>
      <text x="50" y="46" fill="#6C757D" fontSize="9" fontFamily="Arial, sans-serif" letterSpacing="0.5">ИСПЫТАТЕЛЬНОЕ ОБОРУДОВАНИЕ</text>
    </svg>
  );
}

// ─── Header ───────────────────────────────────────────────────────────────────
function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-[#DEE2E6] shadow-sm">
      <div className="max-w-7xl mx-auto px-6">
        <div className="h-16 flex items-center justify-between gap-8">
          <a href="#" className="shrink-0">
            <OstecLogo className="h-9 w-auto" />
          </a>
          <nav className="hidden md:flex items-center gap-7">
            {[
              { label: "Продукты", href: "#specs" },
              { label: "Решения", href: "#applications" },
              { label: "О компании", href: "#cases" },
              { label: "Контакты", href: "#footer" },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm text-[#333333] hover:text-[#0055A4] transition-colors font-medium"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="hidden md:flex items-center gap-5">
            <a href="tel:+74951234567" className="flex items-center gap-2 text-sm text-[#333333] font-medium hover:text-[#0055A4] transition-colors">
              <Icon name="Phone" size={14} className="text-[#0055A4]" />
              +7 (495) 123-45-67
            </a>
            <a href="#footer" className="bg-[#0055A4] hover:bg-[#004490] text-white text-sm font-semibold px-5 py-2 transition-colors">
              Заказать
            </a>
          </div>
          <button className="md:hidden text-[#6C757D]" onClick={() => setMenuOpen(!menuOpen)}>
            <Icon name={menuOpen ? "X" : "Menu"} size={22} />
          </button>
        </div>
      </div>
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-[#DEE2E6] px-6 py-4 space-y-3">
          {["Продукты", "Решения", "О компании", "Контакты"].map((item) => (
            <a key={item} href="#" className="block text-sm text-[#333333] font-medium py-1" onClick={() => setMenuOpen(false)}>
              {item}
            </a>
          ))}
          <a href="#footer" className="block bg-[#0055A4] text-white text-sm font-semibold px-4 py-2.5 text-center mt-3" onClick={() => setMenuOpen(false)}>
            Заказать
          </a>
        </div>
      )}
    </header>
  );
}

// ─── Hero ──────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="bg-[#F8F9FA] border-b border-[#DEE2E6]">
      <div className="max-w-7xl mx-auto px-6 py-20 md:py-28">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 text-xs text-[#0055A4] font-medium uppercase tracking-widest mb-6">
              <span className="w-6 h-px bg-[#0055A4]" />
              Стенды имитации движения
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-[#111111] leading-tight mb-4">
              Стенды имитации<br />движения
            </h1>
            <p className="text-xl text-[#6C757D] mb-3 font-medium">
              Одноосевые поворотные столы для испытаний и калибровки
            </p>
            <p className="text-sm text-[#6C757D] leading-relaxed mb-8 max-w-md">
              Высокоточное оборудование для тестирования инерциальных навигационных систем, гироскопов и МЭМС-датчиков. Соответствие MIL-STD-810H и ГОСТ РВ.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="#specs"
                className="inline-flex items-center gap-2 bg-[#0055A4] hover:bg-[#004490] text-white text-sm font-semibold px-6 py-3 transition-colors"
              >
                Подробнее
                <Icon name="ArrowRight" size={16} />
              </a>
              <a
                href="#footer"
                className="inline-flex items-center gap-2 border border-[#DEE2E6] hover:border-[#0055A4] text-[#333333] hover:text-[#0055A4] text-sm font-medium px-6 py-3 transition-colors bg-white"
              >
                Запросить КП
              </a>
            </div>
            <div className="flex gap-10 mt-10 pt-8 border-t border-[#DEE2E6]">
              {[["15+", "лет опыта"], ["200+", "стендов в эксплуатации"], ["40+", "стран поставки"]].map(([n, l]) => (
                <div key={l}>
                  <div className="text-2xl font-bold text-[#0055A4]">{n}</div>
                  <div className="text-xs text-[#6C757D] mt-0.5">{l}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="border border-[#DEE2E6] bg-white overflow-hidden shadow-lg">
              <img src={PRODUCT_IMAGE} alt="Поворотный стол Остек" className="w-full h-80 object-cover" />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-[#0055A4] text-white px-5 py-3 shadow-lg">
              <div className="text-xs font-medium opacity-80">Точность позиционирования</div>
              <div className="text-xl font-bold">±0.001°</div>
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
    <section className="bg-white py-20 border-b border-[#DEE2E6]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div>
            <div className="text-xs text-[#0055A4] font-medium uppercase tracking-widest mb-4">Флагманский продукт</div>
            <h2 className="text-3xl font-bold text-[#111111] mb-4">
              ОС-1000<br />
              <span className="text-xl font-medium text-[#6C757D]">Одноосевой поворотный стол</span>
            </h2>
            <p className="text-[#333333] leading-relaxed mb-6 text-sm">
              Компактный прецизионный стенд для калибровки одноосевых гироскопов, акселерометров и МЭМС-датчиков. Бесшумный прямой привод, закрытая обратная связь по энкодеру.
            </p>
            <a href="#footer" className="inline-flex items-center gap-2 text-[#0055A4] hover:text-[#004490] text-sm font-semibold transition-colors group">
              Запросить спецификацию
              <Icon name="ArrowRight" size={15} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
          <div>
            <div className="text-xs text-[#6C757D] font-medium uppercase tracking-widest mb-4">Ключевые характеристики</div>
            {[
              ["Грузоподъёмность", "до 5 кг"],
              ["Погрешность позиционирования", "±0.001°"],
              ["Скорость вращения", "до 400 °/с"],
              ["Интерфейс управления", "USB / RS-422 / Ethernet"],
              ["Диапазон углов", "±360° / неограничен"],
              ["Рабочая температура", "−10…+50 °C"],
            ].map(([name, value]) => (
              <div key={name} className="flex items-center justify-between py-3.5 border-b border-[#DEE2E6] last:border-0">
                <span className="text-sm text-[#6C757D]">{name}</span>
                <span className="text-sm font-semibold text-[#111111] font-mono">{value}</span>
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
    <section className="bg-[#F8F9FA] py-20 border-b border-[#DEE2E6]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="text-xs text-[#0055A4] font-medium uppercase tracking-widest mb-3">Преимущества</div>
          <h2 className="text-3xl font-bold text-[#111111]">Почему выбирают Остек</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {advantages.map((a) => (
            <div
              key={a.title}
              className="bg-white border border-[#DEE2E6] p-8 hover:border-[#0055A4] hover:shadow-md transition-all duration-200 cursor-default group"
            >
              <div className="w-10 h-10 bg-[#E8F0FA] flex items-center justify-center mb-5 group-hover:bg-[#0055A4] transition-colors duration-200">
                <Icon name={a.icon} size={20} className="text-[#0055A4] group-hover:text-white transition-colors duration-200" />
              </div>
              <h3 className="text-[#111111] font-semibold mb-2">{a.title}</h3>
              <p className="text-[#6C757D] text-sm leading-relaxed">{a.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Specs table ──────────────────────────────────────────────────────────────
function Specs() {
  return (
    <section id="specs" className="bg-white py-20 border-b border-[#DEE2E6]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-10">
          <div className="text-xs text-[#0055A4] font-medium uppercase tracking-widest mb-3">Линейка продуктов</div>
          <h2 className="text-3xl font-bold text-[#111111]">Технические характеристики</h2>
        </div>
        <div className="overflow-x-auto border border-[#DEE2E6]">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#F8F9FA] border-b border-[#DEE2E6]">
                <th className="text-left text-[#6C757D] font-medium px-6 py-4 text-xs uppercase tracking-wider">Параметр</th>
                <th className="text-center text-[#111111] font-semibold px-6 py-4">
                  ОС-1000<span className="block text-[#6C757D] font-normal text-xs font-sans">1-DOF</span>
                </th>
                <th className="text-center text-[#111111] font-semibold px-6 py-4">
                  ОС-3000<span className="block text-[#6C757D] font-normal text-xs font-sans">3-DOF</span>
                </th>
                <th className="text-center bg-[#0055A4] text-white font-semibold px-6 py-4">
                  ОС-6500<span className="block text-blue-200 font-normal text-xs font-sans">6-DOF</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {specs.map((row, i) => (
                <tr key={row.param} className={`border-b border-[#DEE2E6] hover:bg-[#F8F9FA] transition-colors ${i % 2 === 0 ? "bg-white" : "bg-[#F8F9FA]/50"}`}>
                  <td className="text-[#6C757D] px-6 py-4">{row.param}</td>
                  <td className="text-center text-[#333333] px-6 py-4 font-mono">{row.os1000}</td>
                  <td className="text-center text-[#333333] px-6 py-4 font-mono">{row.os3000}</td>
                  <td className="text-center text-[#333333] px-6 py-4 font-mono bg-[#E8F0FA] border-x border-blue-100 font-semibold">{row.os6500}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-[#6C757D] text-xs mt-3">* Нестандартные параметры — по ТЗ заказчика.</p>
      </div>
    </section>
  );
}

// ─── Applications ─────────────────────────────────────────────────────────────
function Applications() {
  return (
    <section id="applications" className="bg-[#F8F9FA] py-20 border-b border-[#DEE2E6]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12">
          <div className="text-xs text-[#0055A4] font-medium uppercase tracking-widest mb-3">Применение</div>
          <h2 className="text-3xl font-bold text-[#111111]">Сферы применения</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {applications.map((app) => (
            <div
              key={app.label}
              className="bg-white border border-[#DEE2E6] p-6 flex gap-4 items-start hover:border-[#0055A4] hover:shadow-sm transition-all duration-200 group cursor-default"
            >
              <div className="shrink-0 w-9 h-9 bg-[#E8F0FA] flex items-center justify-center group-hover:bg-[#0055A4] transition-colors duration-200">
                <Icon name={app.icon} size={18} className="text-[#0055A4] group-hover:text-white transition-colors duration-200" />
              </div>
              <div>
                <h3 className="text-[#111111] font-semibold text-sm mb-1">{app.label}</h3>
                <p className="text-[#6C757D] text-xs leading-relaxed">{app.desc}</p>
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
    <section id="cases" className="bg-white py-20 border-b border-[#DEE2E6]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12">
          <div className="text-xs text-[#0055A4] font-medium uppercase tracking-widest mb-3">Опыт</div>
          <h2 className="text-3xl font-bold text-[#111111]">Реализованные проекты</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {cases.map((c) => (
            <div key={c.num} className="border border-[#DEE2E6] hover:border-[#0055A4] hover:shadow-md transition-all duration-200 cursor-default">
              <div className="bg-[#0055A4] px-6 py-4 flex items-center justify-between">
                <span className="text-white font-bold text-lg font-mono">{c.num}</span>
                <span className="text-blue-200 text-xs font-medium uppercase tracking-wider">{c.tag}</span>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <div className="text-xs text-[#6C757D] font-medium uppercase tracking-wider mb-1.5">Задача</div>
                  <p className="text-[#333333] text-sm leading-relaxed">{c.task}</p>
                </div>
                <div className="h-px bg-[#DEE2E6]" />
                <div>
                  <div className="text-xs text-[#6C757D] font-medium uppercase tracking-wider mb-1.5">Решение</div>
                  <p className="text-[#333333] text-sm leading-relaxed">{c.solution}</p>
                </div>
                <div className="h-px bg-[#DEE2E6]" />
                <div>
                  <div className="text-xs text-[#0055A4] font-medium uppercase tracking-wider mb-1.5">Результат</div>
                  <p className="text-[#111111] text-sm font-semibold leading-relaxed">{c.result}</p>
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
    <section className="bg-[#F8F9FA] py-20 border-b border-[#DEE2E6]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="text-xs text-[#0055A4] font-medium uppercase tracking-widest mb-3">Демонстрация</div>
            <h2 className="text-3xl font-bold text-[#111111] mb-4">Стенд в действии</h2>
            <p className="text-[#6C757D] text-sm leading-relaxed mb-6">
              Посмотрите, как стенд ОС-6500 выполняет полный цикл калибровки БИНС за 12 минут. Видео доступно по запросу или на очной демонстрации в нашем демозале в Москве.
            </p>
            <button
              onClick={() => setOpen(true)}
              className="inline-flex items-center gap-2 border border-[#0055A4] text-[#0055A4] hover:bg-[#0055A4] hover:text-white text-sm font-medium px-5 py-2.5 transition-colors"
            >
              <Icon name="Play" size={15} />
              Смотреть видео
            </button>
          </div>
          <div
            className="relative border border-[#DEE2E6] bg-white cursor-pointer group overflow-hidden shadow"
            onClick={() => setOpen(true)}
          >
            <img src={PRODUCT_IMAGE} alt="Видео-демонстрация" className="w-full h-64 object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 bg-[#0055A4] text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200">
                <Icon name="Play" size={26} className="ml-1" />
              </div>
            </div>
          </div>
        </div>
      </div>
      {open && (
        <div className="fixed inset-0 z-[100] bg-black/50 flex items-center justify-center p-6" onClick={() => setOpen(false)}>
          <div className="bg-white border border-[#DEE2E6] p-8 max-w-lg w-full text-center shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="w-12 h-12 bg-[#E8F0FA] flex items-center justify-center mx-auto mb-4">
              <Icon name="Play" size={22} className="text-[#0055A4] ml-0.5" />
            </div>
            <h3 className="text-[#111111] font-bold text-lg mb-2">Видео-демонстрация</h3>
            <p className="text-[#6C757D] text-sm mb-6">Оставьте заявку — пришлём ссылку или пригласим на демонстрацию в нашем демозале.</p>
            <div className="flex gap-3 justify-center">
              <a href="#footer" className="bg-[#0055A4] hover:bg-[#004490] text-white text-sm font-semibold px-5 py-2.5 transition-colors" onClick={() => setOpen(false)}>
                Оставить заявку
              </a>
              <button onClick={() => setOpen(false)} className="border border-[#DEE2E6] text-[#6C757D] hover:text-[#333333] text-sm font-medium px-5 py-2.5 transition-colors">
                Закрыть
              </button>
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
    <section className="bg-white py-20 border-b border-[#DEE2E6]">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="text-xs text-[#0055A4] font-medium uppercase tracking-widest mb-3">Вопросы и ответы</div>
          <h2 className="text-3xl font-bold text-[#111111]">Часто задаваемые вопросы</h2>
        </div>
        <div className="divide-y divide-[#DEE2E6] border border-[#DEE2E6]">
          {faqs.map((f, i) => (
            <div key={i}>
              <button
                className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-[#F8F9FA] transition-colors group"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span className={`font-medium text-sm leading-snug transition-colors ${open === i ? "text-[#0055A4]" : "text-[#111111] group-hover:text-[#0055A4]"}`}>
                  {f.q}
                </span>
                <span className={`ml-4 shrink-0 transition-transform duration-200 ${open === i ? "rotate-180" : ""}`}>
                  <Icon name="ChevronDown" size={18} className={open === i ? "text-[#0055A4]" : "text-[#6C757D]"} />
                </span>
              </button>
              {open === i && (
                <div className="px-6 pb-5 bg-[#F8F9FA] border-t border-[#DEE2E6]">
                  <p className="text-[#333333] text-sm leading-relaxed pt-4">{f.a}</p>
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
    <footer id="footer" className="bg-[#F8F9FA] border-t border-[#DEE2E6]">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-16">
          <div>
            <OstecLogo className="h-9 w-auto mb-6" />
            <p className="text-[#6C757D] text-sm leading-relaxed mb-8 max-w-xs">
              Разработка и поставка испытательного оборудования для навигационных и инерциальных систем.
            </p>
            <div className="space-y-3.5">
              {[
                { icon: "MapPin", text: "125009, Москва, ул. Тверская, д. 16" },
                { icon: "Phone", text: "+7 (495) 123-45-67", href: "tel:+74951234567" },
                { icon: "Mail", text: "info@ostek.ru", href: "mailto:info@ostek.ru" },
                { icon: "Clock", text: "Пн–Пт, 9:00–18:00 МСК" },
              ].map((item) => (
                <div key={item.text} className="flex items-start gap-3">
                  <Icon name={item.icon} size={15} className="text-[#0055A4] mt-0.5 shrink-0" />
                  {item.href ? (
                    <a href={item.href} className="text-[#333333] text-sm hover:text-[#0055A4] transition-colors">{item.text}</a>
                  ) : (
                    <span className="text-[#6C757D] text-sm">{item.text}</span>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-8 pt-8 border-t border-[#DEE2E6]">
              <div className="text-xs text-[#6C757D] font-medium uppercase tracking-wider mb-3">Быстрые ссылки</div>
              <div className="grid grid-cols-2 gap-y-2 gap-x-4">
                {["Продукты", "Решения", "Сертификаты", "Демозал", "О компании", "Контакты"].map((link) => (
                  <a key={link} href="#" className="text-sm text-[#6C757D] hover:text-[#0055A4] transition-colors">{link}</a>
                ))}
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-[#111111] font-bold text-lg mb-1">Оставить заявку на расчёт</h3>
            <p className="text-[#6C757D] text-sm mb-6">Инженер свяжется с вами в течение 2 рабочих часов</p>
            {sent ? (
              <div className="border border-green-200 bg-green-50 p-8 text-center">
                <div className="w-10 h-10 bg-green-100 flex items-center justify-center mx-auto mb-3">
                  <Icon name="Check" size={20} className="text-green-600" />
                </div>
                <p className="text-[#111111] font-semibold mb-1">Заявка принята</p>
                <p className="text-[#6C757D] text-sm">Наш инженер свяжется с вами в ближайшее время.</p>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-[#6C757D] font-medium mb-1.5">Ваше имя *</label>
                    <input
                      type="text" required value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full border border-[#DEE2E6] bg-white px-3 py-2.5 text-sm text-[#333333] placeholder:text-[#6C757D]/50 focus:outline-none focus:border-[#0055A4] transition-colors"
                      placeholder="Иван Петров"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-[#6C757D] font-medium mb-1.5">Компания</label>
                    <input
                      type="text" value={form.company}
                      onChange={(e) => setForm({ ...form, company: e.target.value })}
                      className="w-full border border-[#DEE2E6] bg-white px-3 py-2.5 text-sm text-[#333333] placeholder:text-[#6C757D]/50 focus:outline-none focus:border-[#0055A4] transition-colors"
                      placeholder="ООО «Компания»"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-[#6C757D] font-medium mb-1.5">Телефон *</label>
                  <input
                    type="tel" required value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full border border-[#DEE2E6] bg-white px-3 py-2.5 text-sm text-[#333333] placeholder:text-[#6C757D]/50 focus:outline-none focus:border-[#0055A4] transition-colors"
                    placeholder="+7 (___) ___-__-__"
                  />
                </div>
                <div>
                  <label className="block text-xs text-[#6C757D] font-medium mb-1.5">Требования / комментарий</label>
                  <textarea
                    rows={3} value={form.comment}
                    onChange={(e) => setForm({ ...form, comment: e.target.value })}
                    className="w-full border border-[#DEE2E6] bg-white px-3 py-2.5 text-sm text-[#333333] placeholder:text-[#6C757D]/50 focus:outline-none focus:border-[#0055A4] transition-colors resize-none"
                    placeholder="DOF, грузоподъёмность, диапазон углов..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#0055A4] hover:bg-[#004490] text-white font-semibold py-3 text-sm transition-colors flex items-center justify-center gap-2"
                >
                  <Icon name="Send" size={15} />
                  Отправить заявку
                </button>
                <p className="text-[#6C757D]/60 text-xs text-center">Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности</p>
              </form>
            )}
          </div>
        </div>
      </div>
      <div className="border-t border-[#DEE2E6] bg-white">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-[#6C757D] text-xs">© 2024 ГК Остек. Все права защищены.</p>
          <div className="flex gap-5">
            {["Политика конфиденциальности", "Реквизиты"].map((link) => (
              <a key={link} href="#" className="text-[#6C757D] hover:text-[#333333] text-xs transition-colors">{link}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
const Index = () => {
  return (
    <div className="font-sans bg-white text-[#333333]">
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
};

export default Index;
