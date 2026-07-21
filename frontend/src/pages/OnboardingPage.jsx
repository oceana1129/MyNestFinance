import React, { useState, useEffect } from 'react'
import { UserAuth } from '../context/AuthContext.jsx'
import { useNavigate } from 'react-router'
import { ChevronLeft, ChevronRight, Home as HomeIcon } from 'lucide-react'

import HomeNavBar from '../components/navigation/HomeNavBar.jsx';
import DefaultPageDisplay from '../components/data-display/DefaultPageDisplay.jsx';
import ProgressBar from '../components/data-input/ProgressBar.jsx';
import CardStandard from '../components/data-display/CardStandard.jsx';
import HeaderStandard from '../components/data-display/HeaderStandard.jsx';
import InputText from '../components/data-input/InputText.jsx';
import Button from '../components/actions/Button.jsx';
import OnboardBlock from '../components/forms/OnboardBlock.jsx';
import Blurb from '../components/data-display/Blurb.jsx';
import { getVisibleSteps } from '../onboardingSteps.js';

const OnboardingPage = () => {
    // local storage
    const { user } = UserAuth();
    const storageKey = user ? `onboarding-${user.uid}` : null;
    const [hydrated, setHydrated] = useState(false);

    // onboarding information
    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState({});
    const navigate = useNavigate();

    // recompute current number of steps
    // progress bar updates with the number of steps
    const steps = getVisibleSteps(answers);
    const totalSteps = steps.length;

    // which steps are currently visible
    const stepIds = steps.map((s) => s.id).join(",");

    // whenever the visible step list changes 
    useEffect(() => {
        const validKeys = new Set();
        steps.forEach((s) => {
            if (s.type === "text") validKeys.add(s.id);
            (s.blocks || []).forEach((block) => validKeys.add(block.key));
        });

        setAnswers((prev) => {
            let changed = false;
            const next = {};
            for (const key of Object.keys(prev)) {
                if (validKeys.has(key)) {
                    next[key] = prev[key];
                } else {
                    changed = true; // this key belongs to a step that's gone now
                }
            }
            // only trigger a re-render if something actually needed pruning
            return changed ? next : prev;
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [stepIds]);

    // on first load, restore any saved progress for this user
    useEffect(() => {
        if (!storageKey || hydrated) return;

        try {
            const saved = localStorage.getItem(storageKey);
            if (saved) {
                const parsed = JSON.parse(saved);
                setAnswers(parsed.answers || {});
                setCurrentStep(parsed.currentStep || 0);
            }
        } catch (error) {
            console.error("Failed to restore onboarding progress:", error);
        }

        setHydrated(true);
    }, [storageKey, hydrated]);

    // save progress on every change
    useEffect(() => {
        if (!storageKey || !hydrated) return;

        try {
            localStorage.setItem(storageKey, JSON.stringify({ currentStep, answers }));
        } catch (error) {
            console.error("Failed to save onboarding progress:", error);
        }
    }, [storageKey, hydrated, currentStep, answers]);

    const step = steps[currentStep];
    const progress = ((currentStep + 1) / totalSteps) * 100;

    // only blocks whose optional showIf passes get rendered
    const visibleBlocks = (step.blocks || []).filter(
        (block) => !block.showIf || block.showIf(answers)
    );

    const isCategoryDetailStep = Boolean(step.blurb); // category detail step
    const isCompleteStep = step.id === "complete"; // are we on the complete step
    const isLastStep = currentStep === totalSteps - 1; // are we on the last step

    const isAnswered = (value) =>
        Array.isArray(value) ? value.length > 0 : value !== undefined && value !== "";

    // whether it's safe to continue from current step
    const hasSelection =
        step.type === "text"
            ? isAnswered(answers[step.id])
            : visibleBlocks.length === 0 || visibleBlocks.every((block) => isAnswered(answers[block.key]));

    // updates
    const updateAnswer = (key, value) => {
        setAnswers((prev) => ({ ...prev, [key]: value }));
    };

    // user clicks back
    const handleBack = () => setCurrentStep((s) => Math.max(0, s - 1));

    // user clicks next
    const handleContinue = () => setCurrentStep((s) => s + 1);

    // user clicks skip button
    const handleSkip = () => {
        visibleBlocks.forEach((block) => updateAnswer(block.key, undefined));
        handleNextStep();
    };

    // save current onboarding progress to the backend, then advance
    const handleNextStep = async () => {
        try {
            // TODO: persist `answers` (or just this step's slice of it) to
            // your backend here, e.g.:
            // await fetch(`${API_URL}/users/me/onboarding`, {
            //     method: "PATCH",
            //     headers: { Authorization: `Bearer ${token}` },
            //     body: JSON.stringify(answers),
            // });
        } catch (error) {
            console.error("Failed to save onboarding progress:", error);
        }
        handleContinue();
    };

    // when the user has finished onboarding
    // send answers to the backend
    const handleFinish = async () => {
        try {
            console.log("Onboarding complete, answers:", answers);
            navigate("/plan");
        } catch (error) {
            console.error("Failed to save onboarding answers:", error);
        }
    };

    // final screen with button
    if (isCompleteStep) {
        return (
            <DefaultPageDisplay
                nav={<HomeNavBar defaultPage={false} onboarding={true} />}
                progress={
                    <ProgressBar value={100} rounded={false} color="from-blue-300" colorTwo="to-blue-700" trackColor="bg-blue-100" height="h-2" />
                }
                content={
                    <CardStandard
                        size="small"
                        content={
                            <>
                                <HeaderStandard header={step.header} text={step.text} />
                                <Button onClick={handleFinish} text={step.finalButtonText} iconLeft={HomeIcon} fill />
                                <p className="text-sm text-slate-400 text-center">{step.finalCaption}</p>
                            </>
                        }
                    />
                }
            />
        );
    }

    return (
        <DefaultPageDisplay
            nav={<HomeNavBar defaultPage={false} onboarding={true} />}
            progress={
                <ProgressBar
                    value={progress}
                    rounded={false}
                    color="from-blue-300"
                    colorTwo="to-blue-700"
                    trackColor="bg-blue-100"
                    height="h-2"
                />
            }
            content={
                <CardStandard
                    size="small"
                    content={
                        <>
                          {/* STEP HEADER */}
                            <HeaderStandard
                                header={step.header}
                                subheader={step.subheader}
                                text={step.text}
                            />

                            {/* CATEGORY BLURB IF NEEDED */}
                            {isCategoryDetailStep && <Blurb {...step.blurb} />}

                            {/* INPUT TEXT IF NEEDED */}
                            {step.type === "text" && (
                                <InputText
                                    onChange={(e) => updateAnswer(step.id, e.target.value)}
                                    inputType="text"
                                    inputValue={answers[step.id] || ""}
                                    labelText={step.label}
                                    labelIcon={step.icon}
                                    placeholderText={step.placeholder}
                                />
                            )}

                            {/* multi part question */}
                            {visibleBlocks.map((block) => (
                                <OnboardBlock
                                    key={block.key}
                                    block={block}
                                    value={answers[block.key]}
                                    onChange={(val) => updateAnswer(block.key, val)}
                                />
                            ))}

                            <div className="flex gap-3">
                                {currentStep > 0 && (
                                    <Button variant="secondary" onClick={handleBack} iconLeft={ChevronLeft} />
                                )}

                                {isCategoryDetailStep ? (
                                    <>
                                        <Button variant="secondary" onClick={handleSkip} text="Skip" />
                                        <Button
                                            onClick={handleNextStep}
                                            text="Add selected"
                                            iconRight={ChevronRight}
                                            disabled={!hasSelection}
                                            fill
                                        />
                                    </>
                                ) : (
                                    <Button
                                        onClick={handleNextStep}
                                        text={isLastStep ? "finish" : "continue"}
                                        iconRight={ChevronRight}
                                        disabled={!hasSelection}
                                        fill
                                    />
                                )}
                            </div>
                        </>
                    }
                />
            }
        />
    );
};

export default OnboardingPage;
