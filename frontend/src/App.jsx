import "../App.scss"
import "bootstrap/dist/js/bootstrap.bundle"
import Routes from './pages/Routes'
import Header from './components/Header'
import Footer from './components/Footer'

const App = () => {
  return (
    <>
      <Header />
      <Routes />
      <Footer />
    </>
  )
}

export default App