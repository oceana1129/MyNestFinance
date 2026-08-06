// CreateCategoryOverlay.jsx
// ASSUMPTION: placing this next to your other overlays/modals — move as needed.
import { useEffect, useState } from "react";
import { getColorTheme } from "../../utils/ColorThemeLight";
import { X } from "lucide-react";
import Button from "../actions/Button";

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

const inputClass =
  "w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-500";
const labelClass = "mb-1 block text-sm font-medium text-slate-700";
const textareaClass = `
  w-full rounded-lg border border-gray-300 px-3 py-2
  outline-none focus:border-blue-500
  resize-none overflow-hidden
`;

/**
 * Overlay for creating a new activity log
 */
export default function CreateActivity({
  open,
  onClose,
  onCreate,
  bugdetItemId,
  month,
  year,
  displayOrder,
}) {
  const [name, setName] = useState("");
  const [spent, setSpent] = useState(null);
  const [activityDate, setActivityDate] = useState(
    `${year}-${String(month).padStart(2, "0")}-01`,
  );
  const [note, setNote] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const minDate = `${year}-${String(month).padStart(2, "0")}-01`;

  const maxDate = new Date(year, month, 0).toISOString().split("T")[0];

  // reset the form each time the overlay opens
  useEffect(() => {
    if (open) {
      setName("");
      setError(null);
      setActivityDate(null);
      setActivityDate(new Date());
    }
  }, [open]);

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

  const isValid = name.trim() && spent;
  async function handleSubmit() {
    if (!isValid || submitting) return;

    try {
      setSubmitting(true);
      setError(null);

      await onCreate({
        budgetItem: bugdetItemId,
        displayOrder,
        name: name.trim(),
        emoji,
        color,
        categoryType,
      });

      onClose();
    } catch (err) {
      console.error(err);
      setError("Couldn't create the category. Try again.");
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
          <h2 className="font-serif text-2xl font-bold">New activity log</h2>
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

          {/* Spent Money */}
          <div>
            <label className={labelClass}>
              Spent Amount <span className="text-red-700">*</span>
            </label>
            <input
              type="number"
              min="0"
              step="0.01"
              value={spent}
              onChange={(event) => setSpent(event.target.value)}
              placeholder="0"
              className={inputClass}
            />
          </div>

          {/* Date */}
          <div>
            <label className={labelClass}>Date Spent</label>

            <input
              type="date"
              value={activityDate}
              onChange={(event) => setActivityDate(event.target.value)}
              className={inputClass}
              min={minDate}
              max={maxDate}
            />
          </div>

          {/* Notes */}
          <div>
            <label className={labelClass}>Notes</label>

            <textarea
              value={note}
              onChange={(event) => {
                setNote(event.target.value);

                event.target.style.height = "0px";
                event.target.style.height = `${event.target.scrollHeight}px`;
              }}
              rows={1}
              placeholder="Optional notes..."
              className={textareaClass}
            />
          </div>

          {/*  */}

          {error && <p className="text-sm text-red-500">{error}</p>}

          <div className="mt-2 flex justify-end gap-2">
            <Button variant="ghost" text="Cancel" onClick={onClose} />
            <Button
              text={submitting ? "Creating..." : "Create activity log"}
              onClick={handleSubmit}
              disabled={!isValid || submitting}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
