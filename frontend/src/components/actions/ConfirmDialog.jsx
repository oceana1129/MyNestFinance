import Button from "./Button";

export default function ConfirmDialog({
  open,
  title = "Delete",
  message,
  confirmText = "Delete",
  cancelText = "Cancel",
  onClose,
}) {
  if (!open) return null;

  function handleConfirm() {
    onClose(true);
  }

  function handleCancel() {
    onClose(false);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
        <h2 className="text-xl font-semibold text-slate-800">{title}</h2>

        <p className="mt-2 text-slate-600">{message}</p>

        <div className="mt-6 flex justify-end gap-3">
          <Button variant="ghost" text={cancelText} onClick={handleCancel} />

          <Button variant="danger" text={confirmText} onClick={handleConfirm} />
        </div>
      </div>
    </div>
  );
}
