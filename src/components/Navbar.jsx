import React from 'react'

const Navbar = () => {
  return (
    <nav className="border-b border-white/10 bg-[#0b0a08]">
      <div className="flex items-center justify-between px-5 py-4 sm:px-8 lg:px-12">
        <div className="flex items-center gap-2.5">
          <svg
            viewBox="0 0 34 34"
            fill="none"
            className="h-8 w-8"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="4" y="4" width="26" height="26" rx="8" fill="none" stroke="#f5b544" strokeWidth="1.5" />
            <path d="M11 17.5L15.5 22L23.5 12.5" stroke="#f5b544" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </svg>
          <span className="text-lg font-semibold tracking-tight text-white">
            Taskwise
          </span>
        </div>

        <span className="hidden text-xs font-medium uppercase tracking-[0.2em] text-white/30 sm:block">
          Plan the day. Check it off.
        </span>
      </div>
    </nav>
  )
}

export default Navbar

