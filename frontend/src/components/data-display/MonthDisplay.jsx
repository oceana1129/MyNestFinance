import { useEffect, useRef, useState } from "react";
import { UserAuth } from "../../context/AuthContext";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import Button from "../actions/Button";

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export default function MonthDisplay({
  value,
  onChange,
  minYear = 2023,
  maxYear = new Date().getFullYear() + 1,
}) {
  const [open, setOpen] = useState(false);
  const pickerRef = useRef(null);

  // local storage
  const { user } = UserAuth();
  const hasLoaded = useRef(false);
  const storageKey = user
    ? `dashboard-month-${user.uid}`
    : `dashboard-month-development`;

  useEffect(() => {
    function handleClickOutside(event) {
      if (pickerRef.current && !pickerRef.current.contains(event.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // load the saved value
  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);

      if (saved) {
        onChange(JSON.parse(saved));
      }
    } catch (error) {
      console.error("Failed to load dashboard month and year", error);
    } finally {
      hasLoaded.current = true;
    }
  }, [storageKey, onChange]);

  // save into local storage
  useEffect(() => {
    if (!hasLoaded.current) return;

    try {
      localStorage.setItem(storageKey, JSON.stringify(value));
    } catch (error) {
      console.error("Failed to save dashboard month and year", error);
    }
  }, [storageKey, value]);

  function selectMonth(month) {
    onChange({
      year: value.year,
      month,
    });

    setOpen(false);
  }

  function previousMonth() {
    onChange({
      year: value.month == 1 ? value.year - 1 : value.year,
      month: value.month > 1 ? value.month - 1 : 12,
    });
  }

  function nextMonth() {
    let newYear = value.month == 12 ? value.year + 1 : value.year;
    if (newYear > maxYear) newYear = maxYear;
    onChange({
      year: newYear,
      month: value.month < 12 ? value.month + 1 : 1,
    });
  }

  return (
    <div
      ref={pickerRef}
      className="relative inline-block flex gap-4 justify-end"
    >
      <Button
        variant="glass"
        iconLeft={ChevronLeft}
        size="small"
        disabled={value.year == minYear && value.month == 1}
        onClick={previousMonth}
      />
      <Button
        onClick={() => setOpen((o) => !o)}
        variant="glass"
        text={`${MONTHS[value.month - 1]} ${value.year}`}
        iconRight={Calendar}
        size="small"
        className="min-w-32"
      />
      <Button
        onClick={nextMonth}
        variant="glass"
        iconLeft={ChevronRight}
        disabled={value.year == maxYear && value.month == 12}
        size="small"
      />

      {open && (
        <div
          className=" absolute top-[120%] right-0
            w-[248px] p-3 rounded-lg border border-gray-300
            bg-white shadow-xl z-50"
        >
          <div className="flex justify-between items-center mb-3">
            <Button
              variant="ghost"
              disabled={value.year <= minYear}
              iconLeft={ChevronLeft}
              onClick={() =>
                onChange({
                  ...value,
                  year: value.year - 1,
                })
              }
            />

            <strong>{value.year}</strong>

            <Button
              variant="ghost"
              disabled={value.year >= maxYear}
              iconLeft={ChevronRight}
              onClick={() =>
                onChange({
                  ...value,
                  year: value.year + 1,
                })
              }
            />
          </div>

          <div className="grid grid-cols-3 gap-2">
            {MONTHS.map((month, index) => (
              <Button
                key={month}
                text={month}
                variant="secondary"
                onClick={() => selectMonth(index + 1)}
                className={`
                      ${
                        value.month === index + 1
                          ? "border-blue-500"
                          : "border-gray-300"
                      }
                  `}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
