import React from "react";
import { useState, useEffect } from "react";

import CardStandard from "../data-display/CardStandard";
import HeaderStandard from "../data-display/HeaderStandard";
import InfoDisplay from "../data-display/InfoDisplay";
import Toggle from "../actions/Toggle";
import { Mail, Bell } from "lucide-react";
import { UserAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";

const SettingsNotifications = () => {
  const { profile, updateSettings } = UserAuth();

  const [emailNotification, setEmailNotification] = useState(true);
  const [inAppNotification, setInAppNotification] = useState(true);

  useEffect(() => {
    if (profile?.settings) {
      setEmailNotification(profile.settings.emailNotifications);
      setInAppNotification(profile.settings.appNotifications);
    }
  }, [profile]);

  const handleEmailChange = async (checked) => {
    const previous = emailNotification;
    setEmailNotification(checked);

    try {
      await updateSettings({ emailNotifications: checked });
      toast.success("Settings updated");
    } catch (error) {
      console.error("Failed to update email notification setting:", error);
      setEmailNotification(previous); // revert on failure
      toast.error("Couldn't update settings");
    }
  };

  const handleAppChange = async (checked) => {
    const previous = inAppNotification;
    setEmailNotification(checked);

    try {
      await updateSettings({ appNotifications: checked });
      toast.success("Settings updated");
    } catch (error) {
      console.error("Failed to update in app notification setting:", error);
      setInAppNotification(previous); // revert on failure
      toast.error("Couldn't update settings");
    }
  };

  return (
    <CardStandard
      size="small"
      content={
        <>
          <HeaderStandard
            header="Notifications"
            text="Choose how we can reach you."
          />
          {/* settings */}
          <div>
            <div className="p-4 border-y border-slate-300">
              <InfoDisplay
                icon={Mail}
                header="Email notifications"
                text="Reminders sent to your inbox."
                content={
                  <Toggle
                    checked={emailNotification}
                    onChange={handleEmailChange}
                  />
                }
              />
            </div>
            <div className="p-4">
              <InfoDisplay
                icon={Bell}
                header="In-app notifications"
                text={`Alerts inside MyNest`}
                content={
                  <Toggle
                    checked={inAppNotification}
                    onChange={handleAppChange}
                  />
                }
              />
            </div>
          </div>
        </>
      }
    />
  );
};

export default SettingsNotifications;
