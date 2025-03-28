import './App.css'
import Step from '../compontents/Step'

function App() {
  
  
  return (
    <>
      <div className="flex flex-col gap-4 h-screen items-center justify-center">
        <div className="flex flex-col gap-4">
          <h1>Feature</h1>
          <Step type="Given" />
          <Step type="When" />
          <Step type="Then" />
        </div>
      </div>
    </>
  )
}

export default App
