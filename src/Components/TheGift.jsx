import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getGiftConfig } from '../assets/assets'

// If NOT using React Router, use this hook:
const usePathname = () => {
  const [pathname, setPathname] = useState(window.location.pathname)
  useEffect(() => {
    const handlePopState = () => setPathname(window.location.pathname)
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])
  return pathname
}

const randomBetween = (min, max) => Math.random() * (max - min) + min

const generatePosition = () => ({
  top: `${randomBetween(10, 65)}%`,
  left: `${randomBetween(10, 65)}%`,
  rotation: randomBetween(-18, 18),
})

const heartPoints = () => {
  const points = []
  const steps = 300
  for (let i = 0; i <= steps; i++) {
    const t = (i / steps) * Math.PI * 2
    const x = 16 * Math.pow(Math.sin(t), 3)
    const y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t))
    points.push({ x, y })
  }
  return points
}

const allPoints = heartPoints()

const buildPath = (progress, cx, cy, scale) => {
  const count = Math.floor(progress * allPoints.length)
  const visible = allPoints.slice(0, count)
  if (visible.length < 2) return ''
  return visible.map((pt, i) => {
    const x = (pt.x / 18) * scale + cx
    const y = (pt.y / 18) * scale + cy
    return `${i === 0 ? 'M' : 'L'} ${x} ${y}`
  }).join(' ')
}

const HeartSVG = ({ progress, cx, cy, scale, svgW, svgH, color }) => {
  const d = buildPath(progress, cx, cy, scale)
  return (
    <svg
      width={svgW} height={svgH}
      viewBox={`0 0 ${svgW} ${svgH}`}
      className='pointer-events-none'
    >
      {d && (
        <path
          d={d}
          fill='none'
          stroke={color || '#e05a6a'}
          strokeWidth='2.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      )}
    </svg>
  )
}

const TheGift = () => {
  // Get the current route
  const pathname = usePathname()
  const config = getGiftConfig(pathname)
  
  const [step, setStep] = useState(0)
  const [heartProgress, setHeartProgress] = useState(0)
  const [wordVisible, setWordVisible] = useState(true)
  const [photoVisible, setPhotoVisible] = useState(true)
  const [position, setPosition] = useState(generatePosition())
  const [positions] = useState(() => config.images.map(() => generatePosition()))

  const targetProgress = (step + 1) * 0.25

  useEffect(() => {
    if (step >= 4) return
    if (heartProgress >= targetProgress) return
    const timer = setTimeout(() => {
      setHeartProgress(prev => Math.min(prev + 0.008, targetProgress))
    }, 16)
    return () => clearTimeout(timer)
  }, [heartProgress, targetProgress, step])

  useEffect(() => {
    if (step >= 4) return
    if (heartProgress < targetProgress) return

    const pause = setTimeout(() => {
      setWordVisible(false)
      setPhotoVisible(false)

      setTimeout(() => {
        if (step + 1 >= config.images.length) {
          setStep(4)
          return
        }
        setStep(prev => prev + 1)
        setPosition(generatePosition())
        setWordVisible(true)
        setPhotoVisible(true)
      }, 600)
    }, 2500)

    return () => clearTimeout(pause)
  }, [heartProgress, targetProgress, step, config.images.length])

  return (
    <div className='relative w-full h-full overflow-hidden flex items-center justify-center'>

      {step < 4 && (
        <>
          {/* Photo — behind everything */}
          <div
            className='absolute z-0'
            style={{
              top: position.top,
              left: position.left,
              opacity: photoVisible ? 1 : 0,
              transform: `rotate(${position.rotation}deg) scale(${photoVisible ? 1 : 0.85})`,
              transition: 'opacity 0.5s ease, transform 0.5s ease',
            }}
          >
            <img
              src={config.images[step]}
              alt={`gift-${step}`}
              className='w-48 sm:w-56 md:w-64 rounded-lg object-cover aspect-square'
              style={{ boxShadow: '4px 6px 20px rgba(0,0,0,0.25)' }}
            />
          </div>

          {/* Heart — middle layer */}
          <div className='absolute inset-0 flex items-center justify-center pointer-events-none z-10'>
            <HeartSVG
              progress={heartProgress}
              cx={150} cy={150} scale={120}
              svgW={300} svgH={300}
              color={config.heartColor}
            />
          </div>

          {/* Word — top layer */}
          <div className='absolute inset-0 flex items-center justify-center pointer-events-none z-20'>
            <span
              className={`font-love-light text-5xl sm:text-6xl md:text-7xl ${config.textColor}`}
              style={{
                opacity: wordVisible ? 1 : 0,
                transition: 'opacity 0.4s ease',
                textShadow: '0 2px 12px rgba(220,100,100,0.15)',
              }}
            >
              {config.words[step]}
            </span>
          </div>
        </>
      )}

      {step === 4 && (
        <div className='relative flex flex-col items-center justify-center h-full gap-2 px-4'>
          <div className='grid grid-cols-2 gap-4 sm:gap-6'>
            {config.images.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`final-${i}`}
                className='w-36 sm:w-44 md:w-52 rounded-lg object-cover aspect-square'
                style={{
                  boxShadow: '4px 6px 20px rgba(0,0,0,0.2)',
                  transform: `rotate(${positions[i].rotation * 0.4}deg)`,
                }}
              />
            ))}
          </div>

          <p className={`font-love-light text-3xl sm:text-4xl ${config.textColor} text-center mt-2`}>
            {config.finalTitle}
          </p>

          <div className='flex items-center justify-center'>
            <HeartSVG
              progress={1}
              cx={75} cy={75} scale={55}
              svgW={150} svgH={150}
              color={config.heartColor}
            />
          </div>

          <p className={`font-love-light text-3xl sm:text-4xl ${config.textColor} text-center -mt-4`}>
            {config.finalMessage}
          </p>
        </div>
      )}

    </div>
  )
}

export default TheGift