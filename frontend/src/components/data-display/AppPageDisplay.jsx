import React from 'react'

// the page display for the main app (dashboard, insights, settings)
const AppPageDisplay = ({
    nav, contentPrimary, contentSecondary,
}) => {
  return (
    // nav is fixed on left side
    // primary content goes in the middle, and if secondary content is available, it goes on the right
    <div className="flex min-h-screen bg-gradient-to-br from-purple-100 to-rose-100">
      {/* left: the nav content */}
      <div className="sticky shrink-0 top-0 h-screen">
        {nav}
      </div>

      {/* middle: primary content, grows to fill remaining space, scrollable if it overflows */}
      <div className="flex-1 min-w-0 overflow-y-auto px-16 py-10">
        {contentPrimary}
      </div>

      {/* right: optional secondary panel, only takes space if provided */}
      {contentSecondary && (
        <div className="w-96 shrink-0 overflow-y-auto px-8 py-10">
          {contentSecondary}
        </div>
      )}
    </div>
  )
}

export default AppPageDisplay

