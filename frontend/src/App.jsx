import "./tailwind.css"
import Routes from './pages/Routes'

const App = () => {
  return (
    <div style={{ background: 'linear-gradient(135deg, #05051a 0%, #0d0628 40%, #130a2e 70%, #050520 100%)', backgroundAttachment: 'fixed', color: 'white', minHeight: '100vh' }}>
      <Routes />
    </div>
  )
}

export default App