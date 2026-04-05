// App.jsx
import LandingPage from './Components/LandingPage'

const App = () => {
  return (
    <div
      className="h-screen"
      style={{
        backgroundColor: '#faf9f0',
        backgroundImage: `
          linear-gradient(rgba(180, 160, 120, 0.15) 1px, transparent 1px),
          linear-gradient(90deg, rgba(180, 160, 120, 0.15) 1px, transparent 1px),
          linear-gradient(rgba(180, 160, 120, 0.07) 1px, transparent 1px),
          linear-gradient(90deg, rgba(180, 160, 120, 0.07) 1px, transparent 1px)
        `,
        backgroundSize: '40px 40px, 40px 40px, 8px 8px, 8px 8px',
        boxShadow: 'inset 0 0 120px rgba(160, 140, 100, 0.15)',
      }}
    >
      <LandingPage />
    </div>
  )
}

export default App