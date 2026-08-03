import Button from "../actions/Button";
import { MoveLeft, Ellipsis } from "lucide-react";

export default function InspectorPage({

    backText,
    header,
    metric,
    children,

    primaryButton,
    dangerButton,

    onBack,

}) {

    return (

        <div className="flex flex-col gap-8 px-8 py-10 h-screen sticky top-0">

            <div className="flex justify-between">

                <Button
                    iconLeft={MoveLeft}
                    text={backText}
                    variant="glass"
                    onClick={onBack}
                />

                <Button
                    iconLeft={Ellipsis}
                    variant="ghost"
                />

            </div>

            {header}

            {metric}

            {children}

            {primaryButton}

            {dangerButton}

        </div>

    );

}