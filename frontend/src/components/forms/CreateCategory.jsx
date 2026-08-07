// CreateCategoryOverlay.jsx
// ASSUMPTION: placing this next to your other overlays/modals — move as needed.
import { useEffect, useState } from "react";
import { getColorTheme } from "../../utils/ColorThemeLight";
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
// colors users can pick from
const COLORS = [
  { name: "rose", swatch: getColorTheme("rose").bgMedium },
  { name: "red", swatch: getColorTheme("red").bgMedium },
  { name: "orange", swatch: getColorTheme("orange").bgMedium },
  { name: "amber", swatch: getColorTheme("amber").bgMedium },
  { name: "yellow", swatch: getColorTheme("yellow").bgMedium },
  { name: "lime", swatch: getColorTheme("lime").bgMedium },
  { name: "green", swatch: getColorTheme("green").bgMedium },
  { name: "emerald", swatch: getColorTheme("emerald").bgMedium },
  { name: "teal", swatch: getColorTheme("teal").bgMedium },
  { name: "cyan", swatch: getColorTheme("cyan").bgMedium },
  { name: "sky", swatch: getColorTheme("sky").bgMedium },
  { name: "blue", swatch: getColorTheme("blue").bgMedium },
  { name: "indigo", swatch: getColorTheme("indigo").bgMedium },
  { name: "violet", swatch: getColorTheme("violet").bgMedium },
  { name: "purple", swatch: getColorTheme("purple").bgMedium },
  { name: "fuchsia", swatch: getColorTheme("fuchsia").bgMedium },
  { name: "pink", swatch: getColorTheme("pink").bgMedium },
  { name: "slate", swatch: getColorTheme("slate").bgMedium },
  { name: "zinc", swatch: getColorTheme("zinc").bgMedium },
  { name: "stone", swatch: getColorTheme("stone").bgMedium },
];

const CATEGORY_TYPES = [
  { value: "expense", label: "Expense" },
  { value: "debt", label: "Debt" },
];

/**
 * Overlay for creating OR editing a budget category.
 *
 * @param {boolean} open - whether the overlay is visible
 * @param {boolean} edit - true when editing an existing category rather
 *   than creating a new one
 * @param {object} editData - the category being edited. Only read when
 *   `edit` is true; shape: { _id, name, emoji, color, categoryType }
 * @param {function} onClose - called to dismiss the overlay
 * @param {function} onCreate - async (categoryData) => void. In edit mode,
 *   categoryData includes `_id: editData._id` so the parent can tell create
 *   and update apart and route to the right endpoint.
 * @param {string} monthlyBudgetId - the budget this category belongs to
 * @param {number} displayOrder - where this category should sit in the list
 *   (ignored in edit mode — the category keeps its existing position)
 */
export default function CreateCategory({
  open,
  edit = false,
  editData,
  onClose,
  onCreate,
  monthlyBudgetId,
  displayOrder,
}) {
  const [name, setName] = useState("");
  const [emoji, setEmoji] = useState(null);
  const [color, setColor] = useState(null);
  const [categoryType, setCategoryType] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  // reset the form each time the overlay opens — preload from editData
  // when editing, otherwise start blank
  useEffect(() => {
    if (!open) return;

    if (edit && editData) {
      setName(editData.name ?? "");
      setEmoji(editData.emoji ?? null);
      setColor(editData.color ?? null);
      setCategoryType(editData.categoryType ?? null);
    } else {
      setName("");
      setEmoji(null);
      setColor(null);
      setCategoryType(null);
    }

    setError(null);
  }, [open, edit, editData]);

  // close on Escape
  useEffect(() => {
    if (!open) return;

    function handleKeyDown(event) {
      if (event.key === "Escape") onClose();
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  const isValid = name.trim() && emoji && color && categoryType;

  async function handleSubmit() {
    console.log("HandleSubmit");
    if (!isValid || submitting) return;

    try {
      setSubmitting(true);
      setError(null);

      await onCreate({
        ...(edit && editData?._id ? { _id: editData._id } : {}),
        monthlyBudget: monthlyBudgetId,
        displayOrder: edit ? editData?.displayOrder : displayOrder,
        name: name.trim(),
        emoji,
        color,
        categoryType,
      });

      onClose();
    } catch (err) {
      console.error(err);
      setError(
        edit
          ? "Couldn't save the category. Try again."
          : "Couldn't create the category. Try again.",
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
        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-serif text-2xl font-bold">
            {edit ? "Edit category" : "New category"}
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
          {/* Name */}
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Name <span className="text-red-700">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="e.g. Groceries"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-500"
              maxLength={40}
            />
          </div>

          {/* Category type */}
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Type <span className="text-red-700">*</span>
            </label>
            <div className="flex gap-2">
              {CATEGORY_TYPES.map((type) => (
                <button
                  key={type.value}
                  onClick={() => setCategoryType(type.value)}
                  className={`flex-1 rounded-lg border px-3 py-2 text-sm font-medium transition ${
                    categoryType === type.value
                      ? "border-blue-500 bg-blue-50 text-blue-700"
                      : "border-slate-300 text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </div>

          {/* Color */}
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Color <span className="text-red-700">*</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {COLORS.map((c) => (
                <button
                  key={c.name}
                  onClick={() => setColor(c.name)}
                  aria-label={c.name}
                  className={`h-8 w-8 rounded-full ${c.swatch} transition ring-offset-2 ${
                    color === c.name ? "ring-2 ring-slate-900" : ""
                  }`}
                />
              ))}
            </div>
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

          {error && <p className="text-sm text-red-500">{error}</p>}

          <div className="mt-2 flex justify-end gap-2">
            <Button variant="ghost" text="Cancel" onClick={onClose} />
            <Button
              text={
                submitting
                  ? edit
                    ? "Saving..."
                    : "Creating..."
                  : edit
                    ? "Save changes"
                    : "Create category"
              }
              onClick={handleSubmit}
              disabled={!isValid || submitting}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
