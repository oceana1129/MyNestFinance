import React from "react";
import { Link } from "react-router";
import NavBar from "../components/navigation/HomeNavBar.jsx";
import Button from "../components/actions/Button.jsx";
import {
  Tags,
  BarChart3,
  RefreshCw,
  Bell,
  LineChart,
  Landmark,
  UserPlus,
  FolderPlus,
  PenLine,
  MapPin,
  Sprout,
  ShieldCheck,
  EyeOff,
  Ban,
  Home,
  Hamburger,
  Lightbulb,
  ShoppingCart,
  Coffee,
  Globe,
} from "lucide-react";

const FEATURES = [
  {
    icon: Tags,
    iconBg: "bg-amber-100 text-amber-600",
    title: "Custom categories",
    text: "Create income, expense, and debt categories that actually match your life and needs.",
  },
  {
    icon: BarChart3,
    iconBg: "bg-emerald-100 text-emerald-600",
    title: "Plan vs actual",
    text: "Set a planned budget each month, then track what you actually spent. See the gap at a glance.",
  },
  {
    icon: RefreshCw,
    iconBg: "bg-sky-100 text-sky-600",
    title: "Recurring plan",
    text: "Mark subscriptions, rent, or bills as recurring so they show up automatically every month. No copy pasting required.",
  },
  {
    icon: Bell,
    iconBg: "bg-yellow-100 text-yellow-600",
    title: "Gentle reminders",
    text: "Get nudged before something's due with a calm heads up so you're never caught off guard.",
  },
  {
    icon: LineChart,
    iconBg: "bg-violet-100 text-violet-600",
    title: "Visual insights",
    text: "Soft, readable charts that show spending trends over time.",
  },
  {
    icon: Landmark,
    iconBg: "bg-rose-100 text-rose-600",
    title: "Debt tracker",
    text: "Track balances, minimum payments, and interest rates. And chip away at your remaining balances.",
  },
];

const STEPS = [
  {
    icon: UserPlus,
    title: "Create your account",
    text: "Sign up with your email. No credit card, no subscription needed. Your data stays private and yours.",
  },
  {
    icon: FolderPlus,
    title: "Add your categories",
    text: "Build income, expense, and debt categories that reflect your actual life. Give them names, emojis, and colors that feel right to you.",
  },
  {
    icon: PenLine,
    title: "Set your plan for the month",
    text: "Enter how much you plan to earn, spend, or pay off. You can adjust anytime. There's no wrong way to start.",
  },
  {
    icon: MapPin,
    title: "Log what actually happens",
    text: "As the month goes on, record what you actually spent. MyNest shows how you are doing within your personal budget.",
  },
  {
    icon: Sprout,
    title: "Check your insights, feel good",
    text: "At the end of the month, review what worked and what you'd like to adjust.",
  },
];

const TRUST_BADGES = [
  { icon: ShieldCheck, text: "No credit card needed" },
  { icon: EyeOff, text: "No data selling" },
  { icon: Ban, text: "No ads, ever" },
];

// a lightweight stand-in for the real in-app category card, used to give
// the hero something concrete to show rather than an abstract illustration
function PreviewCard() {
  const groups = [
    {
      label: "Utilities",
      icon: "🏠",
      items: [
        {
          emoji: "🌐",
          name: "Internet",
          meta: "May 21 · utilities",
          amount: "-$70.00",
        },
        {
          emoji: "💡",
          name: "Electricity",
          meta: "May 15 · utilities",
          amount: "-$146.12",
        },
      ],
    },
    {
      label: "Food",
      icon: "🍔",
      items: [
        {
          emoji: "🛒",
          name: "Groceries",
          meta: "May 28 · food",
          amount: "-$98.54",
        },
        { emoji: "☕", name: "Coffee", meta: "May 7 · food", amount: "-$5.49" },
      ],
    },
  ];

  return (
    <div className="mx-auto mt-12 w-full max-w-2xl rounded-3xl bg-white/90 p-4 shadow-xl shadow-violet-950/10 backdrop-blur">
      <div className="mb-4 rounded-xl bg-pink-50 px-4 py-3 text-sm text-slate-700">
        You're on track this month. Everything is within your plan. Great job!
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {groups.map((group) => (
          <div key={group.label} className="rounded-xl border border-slate-100">
            <div className="flex items-center gap-1.5 border-b border-slate-100 px-4 py-2.5 text-xs font-semibold uppercase tracking-wide text-slate-400">
              <span>{group.icon}</span>
              {group.label}
            </div>

            <div className="divide-y divide-slate-100">
              {group.items.map((item) => (
                <div
                  key={item.name}
                  className="flex items-center gap-3 px-4 py-3"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-50 text-base">
                    {item.emoji}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-slate-800">
                      {item.name}
                    </p>
                    <p className="truncate text-xs text-slate-400">
                      {item.meta}
                    </p>
                  </div>
                  <p className="shrink-0 text-sm font-semibold text-slate-800">
                    {item.amount}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Eyebrow({ children }) {
  return (
    <span className="inline-flex items-center rounded-full tracking-wider px-4 py-1.5 text-lg font-semibold uppercase tracking-wide text-violet-700">
      {children}
    </span>
  );
}

const HomePage = () => {
  return (
    <div>
      <NavBar defaultPage={true} signupPage={false} loginPage={false} />
      <main className="min-h-screen overflow-x-hidden bg-white">
        {/* HERO */}
        <section className="bg-gradient-to-br from-violet-200 via-pink-100 to-orange-100 px-4 pb-24 pt-20">
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
            <Eyebrow>Budgets for neurodivergent minds</Eyebrow>

            <h1 className="font-serif text-5xl font-bold leading-[1.2] tracking-tight text-slate-900 sm:text-6xl md:text-7xl">
              Budgeting that feels
              <br />
              <span className="italic text-violet-600 py-4 inline-block">
                like home.
              </span>
            </h1>

            <p className="max-w-xl text-slate-600">
              MyNest is a calm, flexible budgeting tool built for real life.
              It's for days when your brain doesn't want to open a spreadsheet.
            </p>

            <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
              <Link to="/signup">
                <Button
                  text="Start for free"
                  variant="primary"
                  className="rounded-full px-6 py-3 text-base"
                />
              </Link>
              <Button
                text="See how it works"
                variant="glass"
                className="rounded-full px-6 py-3 text-base"
              />
            </div>
          </div>

          <PreviewCard />
        </section>

        {/* WHAT'S INSIDE */}
        <section className="bg-stone-50 px-4 py-24">
          <div className="mx-auto max-w-3xl text-center">
            <Eyebrow>What's inside</Eyebrow>
            <h2 className="mt-4 font-serif text-4xl font-bold text-slate-900 sm:text-5xl">
              Everything you need.
            </h2>
            <p className="mt-3 text-slate-600">
              We cut out the noise so you can focus on what matters:
              understanding your money without feeling any of the overwhelm.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map(({ icon: Icon, iconBg, title, text }) => (
              <div
                key={title}
                className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <div
                  className={`mb-4 flex h-10 w-10 items-center justify-center rounded-xl ${iconBg}`}
                >
                  <Icon size={20} />
                </div>
                <h4 className="mb-1.5 font-semibold text-slate-900">{title}</h4>
                <p className="text-sm leading-relaxed text-slate-500">{text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* GETTING STARTED */}
        <section className="bg-stone-50 px-4 py-24">
          <div className="mx-auto max-w-3xl text-center">
            <Eyebrow>Getting started</Eyebrow>
            <h2 className="mt-4 font-serif text-4xl font-bold text-slate-900 sm:text-5xl">
              Up and running in minutes.
            </h2>
            <p className="mt-3 text-slate-600">
              No onboarding maze. Just a few simple steps to get your first
              budget set up.
            </p>
          </div>

          <div className="mx-auto mt-16 max-w-xl">
            {STEPS.map(({ icon: Icon, title, text }, index) => (
              <div key={title} className="relative flex gap-5 pb-10 last:pb-0">
                {index < STEPS.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="absolute left-5 top-11 h-[calc(100%-1.5rem)] w-px -translate-x-1/2 bg-slate-200"
                  />
                )}
                <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-violet-600 shadow-sm">
                  <Icon size={18} />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900">{title}</h4>
                  <p className="mt-1 text-sm leading-relaxed text-slate-500">
                    {text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* BUILT FOR REAL PEOPLE */}
        <section className="bg-gradient-to-br from-violet-200 via-pink-100 to-orange-100 px-4 py-24">
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow>Built for real people</Eyebrow>
            <h2 className="mt-4 font-serif text-4xl font-bold leading-tight text-slate-900 sm:text-5xl">
              Made with neurodivergent minds in mind.
            </h2>
            <p className="mt-4 text-slate-600">
              MyNest was designed from the ground up to represent the needs of
              those who are under served. Everyone deserves a budgeting
              experience that doesn't punish them for how their brain works.
            </p>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="px-4 py-24">
          <div className="mx-auto flex max-w-xl flex-col items-center gap-6 text-center">
            <h2 className="font-serif text-4xl font-bold text-slate-900 sm:text-5xl">
              Your nest is waiting.
            </h2>
            <p className="text-slate-600">
              Start building a budget that works with your brain, not against
              it. Free to use, no pressure, no spreadsheets.
            </p>

            <Link to="/signup">
              <Button
                text="Create your free account"
                variant="primary"
                className="rounded-full px-8 py-3.5 text-base"
              />
            </Link>

            <div className="mt-2 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-slate-400">
              {TRUST_BADGES.map(({ icon: Icon, text }) => (
                <span key={text} className="inline-flex items-center gap-1.5">
                  <Icon size={14} />
                  {text}
                </span>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomePage;
