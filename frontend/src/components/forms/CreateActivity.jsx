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
 * Overlay for creating OR editing an activity log.
 *
 * @param {boolean} edit - true when editing an existing activity log
 * @param {object} editData - the activity being edited. Only read when
 *   `edit` is true; shape: { _id, name, amount, date, note }
 * @param {function} onCreate - async (activityData) => void. In edit mode,
 *   activityData includes `_id: editData._id` so the parent can tell
 *   create and update apart.
 */
export default function CreateActivity({
  edit = false,
  editData,
  open,
  onClose,
  onCreate,
  budgetItemId,
  emoji,
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

  // reset the form each time the overlay opens — preload from editData
  // when editing, otherwise default to today (within the current month)
  useEffect(() => {
    if (!open) return;

    setError(null);

    if (edit && editData) {
      setName(editData.name ?? "");
      setSpent(editData.amount ?? null);
      setNote(editData.note ?? null);
      setActivityDate(
        editData.date
          ? new Date(editData.date).toISOString().split("T")[0]
          : minDate,
      );
    } else {
      setName("");
      setSpent(null);
      setNote(null);
      // NOTE: this used to be `setActivityDate(new Date())` — a raw Date
      // object, which doesn't work as a controlled <input type="date">
      // value (that needs a "YYYY-MM-DD" string). Fixed here since edit
      // mode needs a correctly-formatted string anyway.
      const today = new Date().toISOString().split("T")[0];
      setActivityDate(today >= minDate && today <= maxDate ? today : minDate);
    }
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

  const isValid = name.trim() && spent;
  async function handleSubmit() {
    if (!isValid || submitting) return;

    try {
      setSubmitting(true);
      setError(null);

      await onCreate({
        ...(edit && editData?._id ? { _id: editData._id } : {}),
        budgetItem: budgetItemId,
        name: name.trim(),
        amount: spent,
        date: activityDate,
        note,
      });

      onClose();
    } catch (err) {
      console.error(err);
      setError(
        edit
          ? "Couldn't save the activity log. Try again."
          : "Couldn't create the activity log. Try again.",
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
            {edit ? "Edit activity log" : "New activity log"}
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
              text={
                submitting
                  ? edit
                    ? "Saving..."
                    : "Creating..."
                  : edit
                    ? "Save changes"
                    : "Create activity log"
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
