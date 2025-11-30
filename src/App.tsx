import { Button } from '@/components/ui/button'

function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-8">
      <div className="space-y-4 text-center">
        <h1 className="text-4xl font-bold text-gray-900">
          TM01 Task Manager
        </h1>
        <p className="text-gray-600">shadcn/ui + Tailwind CSS</p>
        
        <div className="flex gap-4 justify-center">
          <Button>Default Button</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="outline">Outline</Button>
        </div>
        
        <p className="text-green-600 font-semibold">✓ Setup Complete</p>
      </div>
    </div>
  )
}

export default App
