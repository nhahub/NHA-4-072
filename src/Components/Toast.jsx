import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { FaCheck, FaTimes, FaExclamationTriangle } from 'react-icons/fa'

export default function Toast({ message, type = 'success', onClose, autoClose = 3000 }) {
  useEffect(() => {
    if (autoClose) {
      const timer = setTimeout(onClose, autoClose)
      return () => clearTimeout(timer)
    }
  }, [autoClose, onClose])

  const styles = {
    success: {
      bg: 'bg-emerald-600 border-emerald-500',
      icon: <FaCheck className="w-5 h-5 text-white" />
    },
    error: {
      bg: 'bg-rose-600 border-rose-500',
      icon: <FaExclamationTriangle className="w-5 h-5 text-white" />
    }
  }

  const currentStyle = styles[type] || styles.success

  const toastComponent = (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[99999] pointer-events-none animate-toast-slide">
      <div className={`flex items-center gap-4 px-6 py-4 rounded-xl shadow-2xl border backdrop-blur-xl transition-all duration-300 pointer-events-auto min-w-[320px] ${currentStyle.bg}`}>
        <div className="flex-shrink-0">
          {currentStyle.icon}
        </div>
        <div className="flex-1 text-sm font-semibold text-white">
          {message}
        </div>
        <button 
          onClick={onClose} 
          className="p-1 rounded-lg text-white hover:bg-white/20 transition flex-shrink-0"
        >
          <FaTimes className="w-4 h-4" />
        </button>
      </div>
    </div>
  )

  return createPortal(toastComponent, document.body)
}