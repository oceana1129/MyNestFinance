import Button from "../actions/Button";
import { MoveLeft, Ellipsis, Pencil } from "lucide-react";

export default function InspectorPage({
  backText,
  header,
  metric,
  children,
  userSettings,
  primaryButton,
  secondaryButton,
  dangerButton,

  onBack,
}) {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between">
        <Button
          iconLeft={MoveLeft}
          text={backText}
          variant="glass"
          onClick={onBack}
        />

        <Button iconLeft={Ellipsis} variant="ghost" />
      </div>

      {header}

      {metric}

      {children}

      {primaryButton}

      {secondaryButton}

      {dangerButton}
    </div>
  );
}
