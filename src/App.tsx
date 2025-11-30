import Test from '@/components/Test'

function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="text-center space-y-6">
        <h1 className="text-5xl font-bold text-gray-900 mb-2">
          TM01 Task Manager
        </h1>
        <p className="text-gray-600 text-lg mb-8">
          React 18 + TypeScript + Vite + Supabase
        </p>
        <Test />
        <p className="text-green-600 font-medium mt-4">
          ✓ Setup Complete
        </p>
      </div>
    </div>
  )
}

export default App
