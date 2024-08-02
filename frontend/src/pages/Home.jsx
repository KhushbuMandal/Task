import React from 'react'


function Home() {
  return (
    <div className="home">
       <div className="flex flex-col items-center justify-center h-full bg-[#F0F8FF] p-8">
      <div className="relative w-full max-w-md">
        <div className="absolute inset-0 bg-[#F0F8FF] rounded-2xl shadow-lg" />
        <div className="relative bg-white rounded-2xl shadow-lg p-8">
          <div className="flex justify-center mb-6">
            <img
              src="/home.png"
              alt="Pocket Notes Illustration"
              width={1000}
              height={1000}
              className="w-full max-w-[300px] h-auto"
            />
          </div>
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold">Pocket Notes</h2>
            <p className="text-muted-foreground">
              Send and receive messages without keeping your phone online. Use Pocket Notes on up to 4 linked devices
              and 1 mobile phone.
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <LockIcon className="w-4 h-4" />
              end-to-end encrypted
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

function LockIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  )
}


function XIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )
}

export default Home