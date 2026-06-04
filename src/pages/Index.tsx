import { useState } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/c1e68221-34b2-4916-b8ef-350370ecb4ea/files/96836f10-7541-43b9-a4e5-8deb497e83b5.jpg";

const specs = [
  { param: "Грузоподъёмность", values: ["до 5 кг", "до 25 кг", "до 100 кг"] },
  { param: "Диапазон углов", values: ["±180°", "±360° / неогр.", "±360° / неогр."] },
  { param: "Скорость вращения", values: ["до 400 °/с", "до 300 °/с", "до 150 °/с"] },
  { param: "Угловая погрешность", values: ["±0.001°", "±0.003°", "±0.005°"] },
  { param: "Степеней свободы", values: ["1 DOF", "3 DOF", "6 DOF"] },
  { param: "Интерфейс управления", values: ["USB / RS-422", "Ethernet / CAN", "Ethernet / CAN"] },
  { param: "Рабочая температура", values: ["-10…+50 °C", "-20…+60 °C", "-40…+70 °C"] },
];

const advantages = [
  {
    icon: "Crosshair",
    title: "Субмикронная точность",
    desc: "Угловая погрешность до ±0.001° обеспечивает достоверные результаты испытаний инерциальных навигационных систем и высокоточных MEMS-гироскопов.",
    tag: "±0.001°",
  },
  {
    icon: "Shield",
    title: "Надёжность MIL-STD",
    desc: "Стенды соответствуют требованиям MIL-STD-810H и ГОСТ РВ. Подтверждены испытаниями на виброустойчивость, термоудар и электромагнитную совместимость.",
    tag: "MIL-STD-810H",
  },
  {
    icon: "Plug",
    title: "Интеграция с вашим ПО",
    desc: "Открытый API на базе Ethernet, поддержка LabVIEW, MATLAB/Simulink и Python SDK. Готовые драйверы под Windows / Linux для быстрого ввода в эксплуатацию.",
    tag: "Open API",
  },
];

const applications = [
  { icon: "Plane", label: "Авионика", desc: "Тестирование ИНС, БИНС, AHRS для авиационной и беспилотной техники" },
  { icon: "Bot", label: "Робототехника", desc: "Калибровка IMU и сенсорных модулей промышленных манипуляторов" },
  { icon: "Car", label: "Автопром", desc: "Верификация систем стабилизации, ADAS и автономного вождения" },
  { icon: "Rocket", label: "Космическая промышленность", desc: "Испытания датчиков ориентации для малых КА и ракет-носителей" },
];

const cases = [
  {
    num: "01",
    client: "Разработчик БПЛА",
    task: "Требовалась калибровка БИНС с погрешностью не более 0.002° при температурном диапазоне −40…+60 °C.",
    solution: "Поставили трёхосевой стенд ОС-3000 с термокамерой и ПО автоматической калибровки.",
    result: "Сокращение времени калибровки в 4 раза. Погрешность — 0.0015°. Серийное производство запущено через 3 месяца.",
  },
  {
    num: "02",
    client: "Интегратор ADAS-систем",
    task: "Тестирование 6-осевых IMU для системы автономного вождения в условиях тряски и вибрации до 20 g.",
    solution: "Комплекс 6-DOF ОС-6200 с интеграцией в тестовый стенд заказчика через Ethernet / CAN.",
    result: "Выявлено 12% дефектных партий до финальной сборки. Рекламации снижены на 87%.",
  },
  {
    num: "03",
    client: "КБ космической отрасли",
    task: "Испытания звёздных датчиков и МЭМС-гироскопов в условиях, имитирующих орбитальное движение КА.",
    solution: "Прецизионный стенд ОС-6500 с угловой скоростью до 0.0001 °/с и специальным алгоритмом профилей.",
    result: "Успешная сертификация оборудования для трёх КА. Сопровождение — 5 лет.",
  },
];

const faqs = [
  {
    q: "Какая гарантия на стенды?",
    a: "Стандартная гарантия — 24 месяца с даты ввода в эксплуатацию. По запросу оформляем расширенную гарантию на 36 или 60 месяцев с приоритетным сервисным обслуживанием и выездом инженера в течение 48 часов.",
  },
  {
    q: "Как оформить ТЗ на нестандартный стенд?",
    a: "Свяжитесь с нашим инженером. Мы проводим бесплатную 1-часовую консультацию, после которой готовим предварительное ТЗ и КП. Разработка нестандартного изделия — от 8 недель в зависимости от DOF и требований точности.",
  },
  {
    q: "Есть ли у вас сертификаты?",
    a: "Да. Продукция сертифицирована по ГОСТ РВ 0015-002, имеет заключения об испытаниях по MIL-STD-810H. Все стенды проходят метрологическую аттестацию в аккредитованной лаборатории. Документация предоставляется в комплекте.",
  },
];

function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-ostek-dark/95 backdrop-blur-sm border-b border-ostek-border">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-ostek-blue rounded flex items-center justify-center">
            <span className="text-white font-bold text-sm font-mono">О</span>
          </div>
          <span className="text-ostek-white font-semibold text-lg tracking-tight">Остек</span>
        </div>
        <nav className="hidden md:flex items-center gap-8">
          {["Продукты", "Кейсы", "Контакты"].map((item) => (
            <a
              key={item}
              href={`#${item === "Продукты" ? "specs" : item === "Кейсы" ? "cases" : "footer"}`}
              className="text-ostek-muted hover:text-ostek-white text-sm font-medium transition-colors duration-200"
            >
              {item}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <a
            href="#footer"
            className="hidden md:inline-flex items-center gap-2 bg-ostek-blue hover:bg-ostek-blue-dim text-white text-sm font-medium px-4 py-2 rounded transition-colors duration-200"
          >
            <Icon name="MessageSquare" size={15} />
            Связаться с инженером
          </a>
          <button
            className="md:hidden text-ostek-muted hover:text-ostek-white"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <Icon name={mobileOpen ? "X" : "Menu"} size={22} />
          </button>
        </div>
      </div>
      {mobileOpen && (
        <div className="md:hidden bg-ostek-surface border-b border-ostek-border px-6 py-4 flex flex-col gap-4">
          {["Продукты", "Кейсы", "Контакты"].map((item) => (
            <a
              key={item}
              href={`#${item === "Продукты" ? "specs" : item === "Кейсы" ? "cases" : "footer"}`}
              className="text-ostek-text text-sm font-medium"
              onClick={() => setMobileOpen(false)}
            >
              {item}
            </a>
          ))}
          <a href="#footer" className="bg-ostek-blue text-white text-sm font-medium px-4 py-2 rounded text-center">
            Связаться с инженером
          </a>
        </div>
      )}
    </header>
  );
}

function Hero() {
  const [videoOpen, setVideoOpen] = useState(false);
  return (
    <section className="relative min-h-screen flex items-center bg-ostek-dark pt-16 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: `url(${HERO_IMAGE})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-ostek-dark via-ostek-dark/80 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-ostek-dark via-transparent to-transparent" />
      <div className="relative max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-16 items-center">
        <div>
          <div className="inline-flex items-center gap-2 bg-ostek-blue/10 border border-ostek-blue/30 text-ostek-blue-light text-xs font-mono px-3 py-1.5 rounded mb-8 opacity-0 animate-fade-up">
            <span className="w-1.5 h-1.5 bg-ostek-blue-light rounded-full animate-pulse" />
            Остек — решения для испытаний и тестирования
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-ostek-white leading-tight mb-6 opacity-0 animate-fade-up-delay">
            Стенды имитации<br />
            <span className="text-ostek-blue-light">движения 6+ DOF</span>
          </h1>
          <p className="text-ostek-muted text-lg leading-relaxed mb-10 max-w-lg opacity-0 animate-fade-up-delay2">
            Высокоточное оборудование для тестирования инерциальных навигационных систем, гироскопов и MEMS-датчиков. Точность до ±0.001°, соответствие MIL-STD-810H.
          </p>
          <div className="flex flex-wrap gap-4 opacity-0 animate-fade-up-delay3">
            <a
              href="#footer"
              className="inline-flex items-center gap-2 bg-ostek-blue hover:bg-ostek-blue-dim text-white font-semibold px-6 py-3 rounded transition-all duration-200 hover:shadow-lg hover:shadow-ostek-blue/25"
            >
              <Icon name="FileText" size={18} />
              Запросить спецификацию
            </a>
            <button
              onClick={() => setVideoOpen(true)}
              className="inline-flex items-center gap-2 border border-ostek-border hover:border-ostek-muted text-ostek-text hover:text-ostek-white font-medium px-6 py-3 rounded transition-all duration-200"
            >
              <Icon name="Play" size={18} />
              Смотреть видео работы
            </button>
          </div>
          <div className="flex gap-8 mt-12 opacity-0 animate-fade-up-delay3">
            {[["15+", "лет на рынке"], ["200+", "установленных стендов"], ["40+", "стран поставки"]].map(([num, label]) => (
              <div key={label}>
                <div className="text-2xl font-bold text-ostek-white font-mono">{num}</div>
                <div className="text-xs text-ostek-muted mt-0.5">{label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="hidden md:block relative">
          <div className="relative rounded-lg overflow-hidden border border-ostek-border shadow-2xl">
            <img src={HERO_IMAGE} alt="Стенд имитации движения" className="w-full h-80 object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-ostek-dark/60 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
              <div className="bg-ostek-dark/80 backdrop-blur border border-ostek-border rounded px-3 py-2">
                <div className="text-xs text-ostek-muted font-mono">МОДЕЛЬ</div>
                <div className="text-sm text-ostek-white font-semibold">ОС-6500 / 6-DOF</div>
              </div>
              <div className="bg-ostek-blue/20 border border-ostek-blue/40 rounded px-3 py-2">
                <div className="text-xs text-ostek-blue-light font-mono">ТОЧНОСТЬ</div>
                <div className="text-sm text-white font-semibold">±0.001°</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {videoOpen && (
        <div
          className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-6"
          onClick={() => setVideoOpen(false)}
        >
          <div
            className="bg-ostek-surface border border-ostek-border rounded-xl p-8 max-w-2xl w-full text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-16 h-16 bg-ostek-blue/20 border border-ostek-blue/40 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="Play" size={28} className="text-ostek-blue-light ml-1" />
            </div>
            <h3 className="text-ostek-white font-semibold text-xl mb-2">Видео-демонстрация стенда ОС-6500</h3>
            <p className="text-ostek-muted text-sm mb-6">Свяжитесь с нами, чтобы получить ссылку на полную демонстрацию работы стенда или запросить онлайн-сессию с инженером.</p>
            <div className="flex gap-3 justify-center">
              <a href="#footer" className="bg-ostek-blue hover:bg-ostek-blue-dim text-white text-sm font-medium px-5 py-2.5 rounded transition-colors" onClick={() => setVideoOpen(false)}>
                Запросить видео
              </a>
              <button onClick={() => setVideoOpen(false)} className="border border-ostek-border hover:border-ostek-muted text-ostek-muted hover:text-ostek-white text-sm font-medium px-5 py-2.5 rounded transition-colors">
                Закрыть
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function Advantages() {
  return (
    <section className="bg-ostek-surface py-24 border-b border-ostek-border">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-14">
          <div className="text-ostek-blue text-xs font-mono uppercase tracking-widest mb-3">Преимущества</div>
          <h2 className="text-3xl md:text-4xl font-bold text-ostek-white">Почему наши стенды</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {advantages.map((a) => (
            <div
              key={a.title}
              className="group bg-ostek-card border border-ostek-border rounded-xl p-8 hover:border-ostek-blue/50 hover:shadow-xl hover:shadow-ostek-blue/5 transition-all duration-300 hover:-translate-y-1 cursor-default"
            >
              <div className="w-12 h-12 bg-ostek-blue/10 border border-ostek-blue/20 rounded-lg flex items-center justify-center mb-6 group-hover:bg-ostek-blue/20 group-hover:border-ostek-blue/40 transition-all duration-300">
                <Icon name={a.icon} size={22} className="text-ostek-blue-light" />
              </div>
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-ostek-white font-semibold text-lg leading-snug pr-4">{a.title}</h3>
                <span className="shrink-0 text-xs font-mono text-ostek-blue-light bg-ostek-blue/10 border border-ostek-blue/20 px-2 py-1 rounded">
                  {a.tag}
                </span>
              </div>
              <p className="text-ostek-muted text-sm leading-relaxed">{a.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Specs() {
  return (
    <section id="specs" className="bg-ostek-dark py-24 border-b border-ostek-border">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-14">
          <div className="text-ostek-blue text-xs font-mono uppercase tracking-widest mb-3">Технические данные</div>
          <h2 className="text-3xl md:text-4xl font-bold text-ostek-white">Технические характеристики</h2>
        </div>
        <div className="overflow-x-auto rounded-xl border border-ostek-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-ostek-surface border-b border-ostek-border">
                <th className="text-left text-ostek-muted font-medium px-6 py-4 font-mono text-xs uppercase tracking-wider">Параметр</th>
                <th className="text-center text-ostek-blue-light font-semibold px-6 py-4">ОС-1000 <span className="block text-ostek-muted font-normal text-xs font-mono">1-DOF</span></th>
                <th className="text-center text-ostek-blue-light font-semibold px-6 py-4">ОС-3000 <span className="block text-ostek-muted font-normal text-xs font-mono">3-DOF</span></th>
                <th className="text-center bg-ostek-blue/5 border-x border-ostek-blue/20 text-white font-semibold px-6 py-4">ОС-6500 <span className="block text-ostek-blue-light font-normal text-xs font-mono">6-DOF</span></th>
              </tr>
            </thead>
            <tbody>
              {specs.map((row, i) => (
                <tr key={row.param} className={`border-b border-ostek-border/60 hover:bg-ostek-surface/50 transition-colors ${i % 2 === 0 ? "" : "bg-ostek-surface/20"}`}>
                  <td className="text-ostek-muted px-6 py-4 font-medium">{row.param}</td>
                  {row.values.map((val, j) => (
                    <td key={j} className={`text-center text-ostek-text px-6 py-4 font-mono text-sm ${j === 2 ? "bg-ostek-blue/5 border-x border-ostek-blue/10" : ""}`}>
                      {val}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-ostek-muted/60 text-xs mt-4 font-mono">* Параметры приведены для стандартной конфигурации. Нестандартные характеристики — по ТЗ заказчика.</p>
      </div>
    </section>
  );
}

function Applications() {
  return (
    <section className="bg-ostek-surface py-24 border-b border-ostek-border">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-14">
          <div className="text-ostek-blue text-xs font-mono uppercase tracking-widest mb-3">Отрасли</div>
          <h2 className="text-3xl md:text-4xl font-bold text-ostek-white">Сферы применения</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {applications.map((app) => (
            <div
              key={app.label}
              className="group bg-ostek-card border border-ostek-border rounded-xl p-7 hover:border-ostek-blue/40 hover:bg-ostek-card/80 transition-all duration-300 cursor-default"
            >
              <div className="w-11 h-11 bg-ostek-dark border border-ostek-border rounded-lg flex items-center justify-center mb-5 group-hover:border-ostek-blue/40 group-hover:bg-ostek-blue/10 transition-all duration-300">
                <Icon name={app.icon} size={20} className="text-ostek-muted group-hover:text-ostek-blue-light transition-colors duration-300" />
              </div>
              <h3 className="text-ostek-white font-semibold mb-2">{app.label}</h3>
              <p className="text-ostek-muted text-sm leading-relaxed">{app.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Cases() {
  return (
    <section id="cases" className="bg-ostek-dark py-24 border-b border-ostek-border">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-14">
          <div className="text-ostek-blue text-xs font-mono uppercase tracking-widest mb-3">Реализованные проекты</div>
          <h2 className="text-3xl md:text-4xl font-bold text-ostek-white">Почему доверяют нам</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {cases.map((c) => (
            <div
              key={c.num}
              className="group bg-ostek-card border border-ostek-border rounded-xl p-8 hover:border-ostek-blue/40 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-center justify-between mb-6">
                <span className="text-4xl font-bold font-mono text-ostek-blue/20 group-hover:text-ostek-blue/40 transition-colors duration-300">{c.num}</span>
                <span className="text-xs text-ostek-muted bg-ostek-dark border border-ostek-border px-3 py-1 rounded font-mono">{c.client}</span>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="text-xs font-mono text-ostek-blue-light uppercase tracking-wider mb-1.5">Задача</div>
                  <p className="text-ostek-muted text-sm leading-relaxed">{c.task}</p>
                </div>
                <div className="h-px bg-ostek-border" />
                <div>
                  <div className="text-xs font-mono text-ostek-blue-light uppercase tracking-wider mb-1.5">Решение</div>
                  <p className="text-ostek-muted text-sm leading-relaxed">{c.solution}</p>
                </div>
                <div className="h-px bg-ostek-border" />
                <div>
                  <div className="text-xs font-mono text-green-400 uppercase tracking-wider mb-1.5">Результат</div>
                  <p className="text-ostek-text text-sm leading-relaxed font-medium">{c.result}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function VideoSection() {
  const [open, setOpen] = useState(false);
  return (
    <section className="bg-ostek-surface py-24 border-b border-ostek-border">
      <div className="max-w-7xl mx-auto px-6">
        <div className="relative rounded-2xl overflow-hidden border border-ostek-border bg-ostek-dark group cursor-pointer" onClick={() => setOpen(true)}>
          <img src={HERO_IMAGE} alt="Демонстрация работы стенда" className="w-full h-64 md:h-96 object-cover opacity-40 group-hover:opacity-50 transition-opacity duration-300" />
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="w-20 h-20 bg-ostek-blue/30 hover:bg-ostek-blue/50 border-2 border-ostek-blue-light/60 rounded-full flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110 group-hover:shadow-2xl group-hover:shadow-ostek-blue/30">
              <Icon name="Play" size={32} className="text-white ml-2" />
            </div>
            <h3 className="text-ostek-white font-bold text-2xl mb-2">Видео-демонстрация</h3>
            <p className="text-ostek-muted text-sm">Стенд ОС-6500 в работе: калибровка гироскопа за 12 минут</p>
          </div>
        </div>
      </div>
      {open && (
        <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-6" onClick={() => setOpen(false)}>
          <div className="bg-ostek-surface border border-ostek-border rounded-xl p-8 max-w-lg w-full text-center" onClick={(e) => e.stopPropagation()}>
            <div className="w-16 h-16 bg-ostek-blue/20 border border-ostek-blue/40 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="Play" size={28} className="text-ostek-blue-light ml-1" />
            </div>
            <h3 className="text-ostek-white font-semibold text-xl mb-2">Видео-демонстрация</h3>
            <p className="text-ostek-muted text-sm mb-6">Оставьте заявку — мы отправим ссылку на полную демонстрацию или организуем онлайн-сессию с инженером.</p>
            <div className="flex gap-3 justify-center">
              <a href="#footer" className="bg-ostek-blue hover:bg-ostek-blue-dim text-white text-sm font-medium px-5 py-2.5 rounded transition-colors" onClick={() => setOpen(false)}>
                Запросить видео
              </a>
              <button onClick={() => setOpen(false)} className="border border-ostek-border hover:border-ostek-muted text-ostek-muted hover:text-ostek-white text-sm font-medium px-5 py-2.5 rounded transition-colors">
                Закрыть
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function FAQ() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section className="bg-ostek-dark py-24 border-b border-ostek-border">
      <div className="max-w-4xl mx-auto px-6">
        <div className="mb-14 text-center">
          <div className="text-ostek-blue text-xs font-mono uppercase tracking-widest mb-3">FAQ</div>
          <h2 className="text-3xl md:text-4xl font-bold text-ostek-white">Часто задаваемые вопросы</h2>
        </div>
        <div className="space-y-3">
          {faqs.map((f, i) => (
            <div
              key={i}
              className={`border rounded-xl overflow-hidden transition-all duration-300 ${open === i ? "border-ostek-blue/40 bg-ostek-card" : "border-ostek-border bg-ostek-surface hover:border-ostek-border/80"}`}
            >
              <button
                className="w-full flex items-center justify-between px-6 py-5 text-left group"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span className={`font-medium text-sm leading-snug transition-colors duration-200 ${open === i ? "text-ostek-white" : "text-ostek-text group-hover:text-ostek-white"}`}>
                  {f.q}
                </span>
                <span className={`ml-4 shrink-0 w-7 h-7 flex items-center justify-center rounded border transition-all duration-300 ${open === i ? "border-ostek-blue/40 bg-ostek-blue/20 rotate-45" : "border-ostek-border bg-ostek-dark"}`}>
                  <Icon name="Plus" size={14} className={open === i ? "text-ostek-blue-light" : "text-ostek-muted"} />
                </span>
              </button>
              {open === i && (
                <div className="px-6 pb-6">
                  <p className="text-ostek-muted text-sm leading-relaxed">{f.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const [formData, setFormData] = useState({ name: "", company: "", phone: "", message: "" });
  const [sent, setSent] = useState(false);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };
  return (
    <footer id="footer" className="bg-ostek-surface border-t border-ostek-border">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-16">
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-9 h-9 bg-ostek-blue rounded flex items-center justify-center">
                <span className="text-white font-bold font-mono">О</span>
              </div>
              <span className="text-ostek-white font-semibold text-xl">Остек</span>
            </div>
            <p className="text-ostek-muted text-sm leading-relaxed mb-8 max-w-sm">
              Производство высокоточных стендов имитации движения для испытательных лабораторий, ОКБ и серийных производств.
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Icon name="MapPin" size={16} className="text-ostek-blue-light mt-0.5 shrink-0" />
                <span className="text-ostek-muted text-sm">125009, Москва, ул. Тверская, д. 16, стр. 1</span>
              </div>
              <div className="flex items-center gap-3">
                <Icon name="Phone" size={16} className="text-ostek-blue-light shrink-0" />
                <a href="tel:+74951234567" className="text-ostek-text text-sm hover:text-ostek-white transition-colors">+7 (495) 123-45-67</a>
              </div>
              <div className="flex items-center gap-3">
                <Icon name="Mail" size={16} className="text-ostek-blue-light shrink-0" />
                <a href="mailto:info@ostek.ru" className="text-ostek-text text-sm hover:text-ostek-white transition-colors">info@ostek.ru</a>
              </div>
              <div className="flex items-center gap-3">
                <Icon name="Clock" size={16} className="text-ostek-blue-light shrink-0" />
                <span className="text-ostek-muted text-sm">Пн–Пт, 9:00–18:00 МСК</span>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-ostek-white font-semibold text-lg mb-6">Оставить заявку на расчёт</h3>
            {sent ? (
              <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-8 text-center">
                <div className="w-12 h-12 bg-green-500/20 border border-green-500/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Check" size={22} className="text-green-400" />
                </div>
                <p className="text-ostek-white font-semibold mb-1">Заявка отправлена!</p>
                <p className="text-ostek-muted text-sm">Наш инженер свяжется с вами в течение 2 рабочих часов.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-ostek-muted text-xs font-mono uppercase tracking-wider mb-1.5 block">Ваше имя</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-ostek-dark border border-ostek-border rounded-lg px-4 py-3 text-ostek-text text-sm placeholder:text-ostek-muted/40 focus:outline-none focus:border-ostek-blue/60 transition-colors"
                      placeholder="Иван Петров"
                    />
                  </div>
                  <div>
                    <label className="text-ostek-muted text-xs font-mono uppercase tracking-wider mb-1.5 block">Компания</label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full bg-ostek-dark border border-ostek-border rounded-lg px-4 py-3 text-ostek-text text-sm placeholder:text-ostek-muted/40 focus:outline-none focus:border-ostek-blue/60 transition-colors"
                      placeholder="ООО «Ваша компания»"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-ostek-muted text-xs font-mono uppercase tracking-wider mb-1.5 block">Телефон</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-ostek-dark border border-ostek-border rounded-lg px-4 py-3 text-ostek-text text-sm placeholder:text-ostek-muted/40 focus:outline-none focus:border-ostek-blue/60 transition-colors"
                    placeholder="+7 (___) ___-__-__"
                  />
                </div>
                <div>
                  <label className="text-ostek-muted text-xs font-mono uppercase tracking-wider mb-1.5 block">Комментарий / ТЗ</label>
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-ostek-dark border border-ostek-border rounded-lg px-4 py-3 text-ostek-text text-sm placeholder:text-ostek-muted/40 focus:outline-none focus:border-ostek-blue/60 transition-colors resize-none"
                    placeholder="Опишите требования: кол-во осей, нагрузка, диапазон углов..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-ostek-blue hover:bg-ostek-blue-dim text-white font-semibold py-3.5 rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-ostek-blue/25 flex items-center justify-center gap-2"
                >
                  <Icon name="Send" size={16} />
                  Отправить заявку
                </button>
                <p className="text-ostek-muted/50 text-xs text-center">Ответ в течение 2 рабочих часов · Бесплатная консультация инженера</p>
              </form>
            )}
          </div>
        </div>
        <div className="border-t border-ostek-border mt-16 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-ostek-muted/50 text-xs">© 2024 Остек. Все права защищены.</p>
          <div className="flex gap-6">
            {["Политика конфиденциальности", "Реквизиты"].map((link) => (
              <a key={link} href="#" className="text-ostek-muted/50 hover:text-ostek-muted text-xs transition-colors">{link}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

const Index = () => {
  return (
    <div className="font-sans bg-ostek-dark min-h-screen">
      <Header />
      <Hero />
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
