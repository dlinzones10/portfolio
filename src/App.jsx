import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'

export default function App() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        {/* Next build steps: PortfolioGrid (#work), InstructorHub (#teaching), ContactForm (#contact) */}
        <div id="work" />
        <div id="teaching" />
        <div id="contact" />
      </main>
    </>
  )
}
