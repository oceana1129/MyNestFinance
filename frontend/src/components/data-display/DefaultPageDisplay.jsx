import React from "react";

// the page display for home page, login, signup, and onboarding
const DefaultPageDisplay = ({ nav, progress, content }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-purple-100 to-rose-100">
      {/* left: the nav content */}
      {nav}
      {progress}
      {/* middle: primary content, grows to fill remaining space, scrollable if it overflows */}
      <main className="flex justify-center flex-1 min-w-0 overflow-y-auto px-16 py-10">
        {content}
      </main>
    </div>
  );
};

export default DefaultPageDisplay;
