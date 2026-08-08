import { useEffect, useState } from "react";
import {
  X,
  UserRound,
  House,
  Home,
  KeyRound,
  Users,
  Sparkles,
  Building,
  PartyPopper,
  Car,
  Bike,
  Footprints,
  TrainFront,
  Accessibility,
  FileText,
  PersonStanding,
  UserPlus,
  Baby,
  Dog,
  CarTaxiFront,
  BriefcaseBusiness,
  Briefcase,
  GraduationCap,
  Laptop,
  Heart,
  Search,
  CreditCard,
  Banknote,
  Hospital,
  StickyNote,
  Wrench,
  Lightbulb,
  Apple,
  Stethoscope,
  PawPrint,
  LibraryBig,
  PiggyBank,
  Gamepad2,
  Zap,
  Droplet,
  Flame,
  Globe,
  Smartphone,
  Trash,
  Tv,
  ShoppingCart,
  Coffee,
  HandPlatter,
  Utensils,
  Glasses,
  Smile,
  Brain,
  BookHeart,
  PillBottle,
  Bandage,
  Bed,
  Ear,
  Wind,
  Pill,
  Shirt,
  Scissors,
  Dumbbell,
  Hand,
  ShieldCheck,
  Tablets,
  Shapes,
  PackageOpen,
  Book,
  PencilLine,
  Backpack,
  University,
  Video,
  Palette,
  Plane,
  RotateCcw,
  Gift,
  Package,
  HeartPlus,
  HeartPulse,
  TriangleAlert,
  HandCoins,
  LineChart,
  SmilePlus,
  Coins,
  CircleDollarSign,
  TrendingUp,
  Umbrella,
  Wallet,
  Sprout,
  Leaf,
  MirrorRound,
  BrushCleaning,
  DollarSign,
  Landmark,
  Ticket,
  Film,
  Receipt,
  Fuel,
  BookOpen,
  TramFront,
  Warehouse,
  LampDesk,
  Armchair,
  Flower,
  Clover,
  Sun,
  Bug,
  School,
  Eraser,
  Hammer,
  Puzzle,
  PencilRuler,
  Music,
  Siren,
  Feather,
  ChefHat,
  Snowflake,
  AirVent,
  Cat,
  TreePalm,
  Dices,
  Bubbles,
  Bird,
  KeySquare,
  Paintbrush,
  Trees,
  Fish,
  SportShoe,
  Bath,
  ThermometerSnowflake,
  Transgender,
  WashingMachine,
  MapPinned,
  ParkingCircle,
  Mail,
  Bus,
  Train,
  Wifi,
  Activity,
  HeartHandshake,
  Shield,
  Bell,
  Clock,
  Calendar,
  Star,
  CheckCircle,
  Gem,
  Egg,
  GlassWater,
} from "lucide-react";
import Button from "../actions/Button";

// emoji is a lucid react
export const ICON_GROUPS = [
  {
    title: "Miscellaneous",
    icons: {
      Sparkles,
      Shield,
      Bell,
      Clock,
      Star,
      CheckCircle,
    },
  },
  {
    title: "Home",
    icons: {
      Home,
      Building,
      Warehouse,
      LampDesk,
      Armchair,
      Hammer,
      KeySquare,
      Bath,
      BrushCleaning,
      MirrorRound,
      WashingMachine,
    },
  },

  {
    title: "Utilities",
    icons: {
      Lightbulb,
      Zap,
      AirVent,
      ThermometerSnowflake,
      Smartphone,
      Globe,
      Wifi,
      Tv,
      Trash,
      Mail,
    },
  },

  {
    title: "Transportation",
    icons: {
      Car,
      Bus,
      Bike,
      Train,
      Fuel,
      Plane,
      MapPinned,
      ParkingCircle,
    },
  },

  {
    title: "Food",
    icons: {
      Apple,
      Coffee,
      ShoppingCart,
      Utensils,
      ChefHat,
      HandPlatter,
      Egg,
      GlassWater,
    },
  },

  {
    title: "Money",
    icons: {
      Banknote,
      CreditCard,
      PiggyBank,
      Wallet,
      Landmark,
      DollarSign,
      Receipt,
      Coins,
      HandCoins,
      CircleDollarSign,
      TrendingUp,
      LineChart,
    },
  },

  {
    title: "Education",
    icons: {
      School,
      GraduationCap,
      Book,
      BookOpen,
      Laptop,
      PencilRuler,
      Eraser,
      Puzzle,
    },
  },

  {
    title: "Health",
    icons: {
      Heart,
      Hospital,
      Stethoscope,
      Brain,
      Pill,
      Ear,
      SmilePlus,
      Dumbbell,
      Activity,
    },
  },

  {
    title: "Family",
    icons: {
      Users,
      UserRound,
      HeartHandshake,
      Baby,
      Shapes,
    },
  },

  {
    title: "Pets",
    icons: {
      Dog,
      Cat,
      Bird,
      Fish,
      PawPrint,
      Feather,
    },
  },

  {
    title: "Nature",
    icons: {
      Trees,
      TreePalm,
      Leaf,
      Sprout,
      Flower,
      Clover,
      Sun,
      Snowflake,
      Bug,
      Bubbles,
      TreePalm,
    },
  },

  {
    title: "Shopping",
    icons: {
      Gift,
      Paintbrush,
      SportShoe,
      Shirt,
      Package,
      Gem,
    },
  },

  {
    title: "Entertainment",
    icons: {
      Film,
      Gamepad2,
      Dices,
      Music,
      Ticket,
    },
  },
];

const DEBT_TYPES = [
  { value: "credit-card", label: "Credit Card" },
  { value: "student-loan", label: "Student Loan" },
  { value: "auto-loan", label: "Auto Loan" },
  { value: "mortgage", label: "Mortgage" },
  { value: "personal-loan", label: "Personal Loan" },
  { value: "medical-debt", label: "Medical Debt" },
  { value: "other", label: "Other" },
];

const SCHEDULE_TYPES = [
  { value: "monthly", label: "Monthly" },
  { value: "weekly", label: "Weekly" },
  { value: "yearly", label: "Yearly" },
  { value: "daily", label: "Daily" },
  { value: "customInterval", label: "Custom interval" },
];

const DAYS_OF_WEEK = [
  { value: "sun", label: "Sun" },
  { value: "mon", label: "Mon" },
  { value: "tue", label: "Tue" },
  { value: "wed", label: "Wed" },
  { value: "thu", label: "Thu" },
  { value: "fri", label: "Fri" },
  { value: "sat", label: "Sat" },
];

const MONTHS_OF_YEAR = [
  { value: 1, label: "Jan" },
  { value: 2, label: "Feb" },
  { value: 3, label: "Mar" },
  { value: 4, label: "Apr" },
  { value: 5, label: "May" },
  { value: 6, label: "Jun" },
  { value: 7, label: "Jul" },
  { value: 8, label: "Aug" },
  { value: 9, label: "Sep" },
  { value: 10, label: "Oct" },
  { value: 11, label: "Nov" },
  { value: 12, label: "Dec" },
];

const INTERVAL_UNITS = [
  { value: "days", label: "days" },
  { value: "weeks", label: "weeks" },
  { value: "months", label: "months" },
  { value: "years", label: "years" },
];

const inputClass =
  "w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-500";
const labelClass = "mb-1 block text-sm font-medium text-slate-700";

/**
 * Overlay for creating a new budget item.
 *
 * Only `name` is required. Everything else is optional and gets a sane
 * default if left blank.
 *
 * @param {boolean} open
 * @param {function} onClose
 * @param {function} onCreate async payload
 * @param {string} budgetCategoryId
 * @param {string} monthlyBudgetId
 * @param {number} displayOrder
 * @param {"expense"|"debt"} categoryType - determines whether the debt
 *   fields section is shown (only if the parent category is debt type)
 */
/**
 * Overlay for creating OR editing a budget item.
 *
 * Only `name` is required. Everything else is optional and gets a sane
 * default if left blank.
 *
 * @param {boolean} open
 * @param {boolean} edit - true when editing an existing item
 * @param {object} editData - the item being edited. Only read when `edit`
 *   is true. Shape matches what this component already sends on create:
 *   { _id, name, plannedAmount, emoji, debt: {...}|null, plan: {...}|null }
 * @param {function} onClose
 * @param {function} onCreate async payload — in edit mode, includes
 *   `_id: editData._id` so the parent can tell create/update apart
 * @param {string} budgetCategoryId
 * @param {string} monthlyBudgetId
 * @param {number} displayOrder
 * @param {"expense"|"debt"} categoryType - determines whether the debt
 *   fields section is shown (only if the parent category is debt type)
 */
export default function CreateItem({
  open,
  edit = false,
  editData,
  onClose,
  onCreate,
  budgetCategoryId,
  monthlyBudgetId,
  displayOrder,
  categoryType = "expense",
}) {
  const isDebt = categoryType === "debt";

  const [name, setName] = useState("");
  const [plannedAmount, setPlannedAmount] = useState("");
  const [emoji, setEmoji] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  // debt fields
  const [debtType, setDebtType] = useState("other");
  const [originalBalance, setOriginalBalance] = useState("");
  const [currentBalance, setCurrentBalance] = useState("");
  const [minimumPayment, setMinimumPayment] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [preferredPayoffInYears, setPreferredPayoffInYears] = useState("");

  // recurring plan fields
  const [recurringEnabled, setRecurringEnabled] = useState(false);
  const [scheduleType, setScheduleType] = useState("monthly");
  const [dayOfWeek, setDayOfWeek] = useState("sun");
  const [dayOfMonth, setDayOfMonth] = useState("1");
  const [lastDayOfMonth, setLastDayOfMonth] = useState(false);
  const [monthOfYear, setMonthOfYear] = useState("1");
  const [interval, setInterval_] = useState("1");
  const [intervalUnit, setIntervalUnit] = useState("months");
  const [startDate, setStartDate] = useState("");

  // formats a Date/ISO-string/whatever into the "YYYY-MM-DD" shape
  // <input type="date"> requires
  function toDateInputValue(value) {
    if (!value) return "";
    return new Date(value).toISOString().split("T")[0];
  }

  useEffect(() => {
    if (!open) return;

    setError(null);

    if (edit && editData) {
      setName(editData.name ?? "");
      setPlannedAmount(
        editData.planned != null ? String(editData.planned) : "",
      );
      setEmoji(editData.emoji ?? null);

      const debt = editData.debt ?? {};
      setDebtType(debt.debtType ?? "other");
      setOriginalBalance(
        debt.originalBalance != null ? String(debt.originalBalance) : "",
      );
      setCurrentBalance(
        debt.currentBalance != null ? String(debt.currentBalance) : "",
      );
      setMinimumPayment(
        debt.minimumPayment != null ? String(debt.minimumPayment) : "",
      );
      setInterestRate(
        debt.interestRate != null ? String(debt.interestRate) : "",
      );
      setPreferredPayoffInYears(
        debt.preferredPayoffInYears != null
          ? String(debt.preferredPayoffInYears)
          : "",
      );

      const plan = editData.plan ?? null;
      setRecurringEnabled(Boolean(plan));
      setScheduleType(plan?.scheduleType ?? "monthly");
      setDayOfWeek(plan?.dayOfWeek ?? "sun");
      setDayOfMonth(plan?.dayOfMonth != null ? String(plan.dayOfMonth) : "1");
      setLastDayOfMonth(Boolean(plan?.lastDayOfMonth));
      setMonthOfYear(
        plan?.monthOfYear != null ? String(plan.monthOfYear) : "1",
      );
      setInterval_(plan?.interval != null ? String(plan.interval) : "1");
      setIntervalUnit(plan?.intervalUnit ?? "months");
      setStartDate(toDateInputValue(plan?.startDate));
    } else {
      setName("");
      setPlannedAmount("");
      setEmoji(null);

      setDebtType("other");
      setOriginalBalance("");
      setCurrentBalance("");
      setMinimumPayment("");
      setInterestRate("");
      setPreferredPayoffInYears("");

      setRecurringEnabled(false);
      setScheduleType("monthly");
      setDayOfWeek("sun");
      setDayOfMonth("1");
      setLastDayOfMonth(false);
      setMonthOfYear("1");
      setInterval_("1");
      setIntervalUnit("months");
      setStartDate("");
    }
  }, [open, edit, editData]);

  useEffect(() => {
    if (!open) return;

    function handleKeyDown(event) {
      if (event.key === "Escape") onClose();
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  const isValid = name.trim().length > 0 && emoji;

  function buildDebtPayload() {
    if (!isDebt) return null;

    return {
      debtType,
      // defaults to 0
      currentBalance: currentBalance === "" ? 0 : Number(currentBalance),
      originalBalance:
        originalBalance === "" ? undefined : Number(originalBalance),
      minimumPayment:
        minimumPayment === "" ? undefined : Number(minimumPayment),
      interestRate: interestRate === "" ? undefined : Number(interestRate),
      preferredPayoffInYears:
        preferredPayoffInYears === "" ? 5 : Number(preferredPayoffInYears),
    };
  }

  function buildPlanPayload() {
    if (!recurringEnabled) return null;

    const plan = {
      scheduleType,
      dayOfWeek: null,
      dayOfMonth: null,
      lastDayOfMonth: false,
      monthOfYear: null,
      interval: null,
      intervalUnit: null,
      startDate: startDate ? new Date(startDate) : undefined,
    };

    if (scheduleType === "weekly") {
      plan.dayOfWeek = dayOfWeek;
    } else if (scheduleType === "monthly") {
      plan.lastDayOfMonth = lastDayOfMonth;
      plan.dayOfMonth = lastDayOfMonth ? null : Number(dayOfMonth);
    } else if (scheduleType === "yearly") {
      plan.monthOfYear = Number(monthOfYear);
      plan.dayOfMonth = Number(dayOfMonth);
    } else if (scheduleType === "customInterval") {
      plan.interval = Number(interval);
      plan.intervalUnit = intervalUnit;
    }

    return plan;
  }

  async function handleSubmit() {
    if (!isValid || submitting) return;

    try {
      setSubmitting(true);
      setError(null);

      await onCreate({
        ...(edit && editData?._id ? { _id: editData._id } : {}),
        budgetCategory: budgetCategoryId,
        monthlyBudget: monthlyBudgetId,
        displayOrder: edit ? editData?.displayOrder : displayOrder,
        emoji: emoji,
        name: name.trim(),
        plannedAmount: plannedAmount === "" ? 0 : Number(plannedAmount),
        debt: buildDebtPayload(),
        plan: buildPlanPayload(),
      });

      onClose();
    } catch (err) {
      console.error(err);
      setError(
        edit
          ? "Couldn't save the item. Try again."
          : "Couldn't create the item. Try again.",
      );
    } finally {
      setSubmitting(false);
    }
  }
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-2xl bg-white p-6 shadow-xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-serif text-2xl text-slate-700 font-bold">
            {edit
              ? isDebt
                ? "Edit debt item"
                : "Edit item"
              : isDebt
                ? "New debt item"
                : "New item"}
          </h2>
          <button
            onClick={onClose}
            className="rounded-full p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex flex-col gap-5">
          <p className="text-md font-semibold text-slate-700">Item Details</p>
          {/* Name */}
          <div>
            <label className={labelClass}>
              Name <span className="text-red-700">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="e.g. Rent"
              className={inputClass}
              maxLength={40}
              autoFocus
            />
          </div>

          {/* Planned budget */}
          <div>
            <label className={labelClass}>Planned budget</label>
            <input
              type="number"
              min="0"
              step="0.01"
              value={plannedAmount}
              onChange={(event) => setPlannedAmount(event.target.value)}
              placeholder="0"
              className={inputClass}
            />
          </div>

          {/* Emoji (icon) */}
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Icon <span className="text-red-700">*</span>
            </label>
            <div className="grid max-h-48 gap-2 rounded-lg border border-slate-200 p-2">
              <div className="overflow-y-auto max-h-40 pb-2">
                {ICON_GROUPS.map((group) => (
                  <div key={group.title} className="mb-3 last:mb-0">
                    <p className="sticky top-0 h-[16] z-10 mb-1.5 bg-white py-1 text-xs font-semibold text-slate-500">
                      {group.title}
                    </p>
                    <div className="grid grid-cols-6 gap-2">
                      {Object.entries(group.icons).map(([iconName, Icon]) => (
                        <button
                          key={iconName}
                          onClick={() => setEmoji(iconName)}
                          className={`flex items-center justify-center rounded-lg border p-2 transition ${
                            emoji === iconName
                              ? "border-blue-500 bg-blue-50 text-blue-700"
                              : "border-slate-200 text-slate-500 hover:bg-slate-50"
                          }`}
                          title={iconName}
                        >
                          <Icon size={18} />
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Debt details */}
          {isDebt && (
            <div className="flex flex-col gap-4 rounded-lg">
              <p className="text-md font-semibold text-slate-700">
                Debt details
              </p>

              <div>
                <label className={labelClass}>Debt information </label>
                <select
                  value={debtType}
                  onChange={(event) => setDebtType(event.target.value)}
                  className={inputClass}
                >
                  {DEBT_TYPES.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelClass}>Current balance</label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={currentBalance}
                    onChange={(event) => setCurrentBalance(event.target.value)}
                    placeholder="0"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Original balance</label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={originalBalance}
                    onChange={(event) => setOriginalBalance(event.target.value)}
                    placeholder="optional"
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelClass}>Minimum payment</label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={minimumPayment}
                    onChange={(event) => setMinimumPayment(event.target.value)}
                    placeholder="optional"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Interest rate (APR %)</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    step="0.01"
                    value={interestRate}
                    onChange={(event) => setInterestRate(event.target.value)}
                    placeholder="optional"
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label className={labelClass}>Preferred payoff (years)</label>
                <input
                  type="number"
                  min="1"
                  step="1"
                  value={preferredPayoffInYears}
                  onChange={(event) =>
                    setPreferredPayoffInYears(event.target.value)
                  }
                  placeholder="5"
                  className={inputClass}
                />
              </div>
            </div>
          )}

          {/* Recurring plan */}
          <p className="text-md font-semibold text-slate-700">
            Recurring Item Details
          </p>
          <div className="flex flex-col gap-4 rounded-lg border border-slate-200 p-3">
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
              <input
                type="checkbox"
                checked={recurringEnabled}
                onChange={(event) => setRecurringEnabled(event.target.checked)}
              />
              Mark as recurring
            </label>

            {recurringEnabled && (
              <>
                <div>
                  <label className={labelClass}>Repeats</label>
                  <select
                    value={scheduleType}
                    onChange={(event) => setScheduleType(event.target.value)}
                    className={inputClass}
                  >
                    {SCHEDULE_TYPES.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>

                {scheduleType === "weekly" && (
                  <div>
                    <label className={labelClass}>Day of week</label>
                    <select
                      value={dayOfWeek}
                      onChange={(event) => setDayOfWeek(event.target.value)}
                      className={inputClass}
                    >
                      {DAYS_OF_WEEK.map((day) => (
                        <option key={day.value} value={day.value}>
                          {day.label}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {scheduleType === "monthly" && (
                  <div>
                    <label className="mb-2 flex items-center gap-2 text-sm text-slate-700">
                      <input
                        type="checkbox"
                        checked={lastDayOfMonth}
                        onChange={(event) =>
                          setLastDayOfMonth(event.target.checked)
                        }
                      />
                      Last day of the month
                    </label>
                    {!lastDayOfMonth && (
                      <div>
                        <label className={labelClass}>Day of month</label>
                        <input
                          type="number"
                          min="1"
                          max="31"
                          value={dayOfMonth}
                          onChange={(event) =>
                            setDayOfMonth(event.target.value)
                          }
                          className={inputClass}
                        />
                      </div>
                    )}
                  </div>
                )}

                {scheduleType === "yearly" && (
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className={labelClass}>Month</label>
                      <select
                        value={monthOfYear}
                        onChange={(event) => setMonthOfYear(event.target.value)}
                        className={inputClass}
                      >
                        {MONTHS_OF_YEAR.map((m) => (
                          <option key={m.value} value={m.value}>
                            {m.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className={labelClass}>Day</label>
                      <input
                        type="number"
                        min="1"
                        max="31"
                        value={dayOfMonth}
                        onChange={(event) => setDayOfMonth(event.target.value)}
                        className={inputClass}
                      />
                    </div>
                  </div>
                )}

                {scheduleType === "customInterval" && (
                  <div>
                    <label className={labelClass}>Every</label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        min="1"
                        max="365"
                        value={interval}
                        onChange={(event) => setInterval_(event.target.value)}
                        className={`${inputClass} w-20`}
                      />
                      <select
                        value={intervalUnit}
                        onChange={(event) =>
                          setIntervalUnit(event.target.value)
                        }
                        className={inputClass}
                      >
                        {INTERVAL_UNITS.map((unit) => (
                          <option key={unit.value} value={unit.value}>
                            {unit.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}

                <div>
                  <label className={labelClass}>Start date</label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(event) => setStartDate(event.target.value)}
                    className={inputClass}
                  />
                </div>
              </>
            )}
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <div className="mt-2 flex justify-end gap-2">
            <button
              onClick={onClose}
              className="rounded-lg px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={!isValid || submitting}
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {submitting
                ? edit
                  ? "Saving..."
                  : "Creating..."
                : edit
                  ? "Save changes"
                  : "Create item"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
