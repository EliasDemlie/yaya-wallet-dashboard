import React from 'react'

function LoadingSpinner({ size = "medium", text = "Loading..." }) {
  const sizeClasses = {
    small: "w-4 h-4",
    medium: "w-8 h-8", 
    large: "w-12 h-12"
  }

  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className={`${sizeClasses[size]} animate-spin rounded-full border-4 border-gray-200 border-t-blue-600`}></div>
      <p className="mt-4 text-gray-600">{text}</p>
    </div>
  )
}

export default LoadingSpinner
