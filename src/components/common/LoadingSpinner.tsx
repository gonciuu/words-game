import React from 'react'

const LoadingSpinner = () => {
  return (
    <div className="h-[100vh] w-[100vw] flex justify-center items-center">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white"></div>
    </div>
  )
}

export default LoadingSpinner
