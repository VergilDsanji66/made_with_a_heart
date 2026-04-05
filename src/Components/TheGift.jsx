// TheGift.jsx
import { useState, useEffect } from 'react'
import { getGiftConfig } from '../assets/assets'

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

// Function to preload images
const preloadImages = (imageUrls) => {
  return Promise.all(
    imageUrls.map((url) => {
      return new Promise((resolve, reject) => {
        const img = new Image()
        img.src = url
        img.onload = () => resolve(url)
        img.onerror = () => reject(new Error(`Failed to load image: ${url}`))
      })
    })
  )
}

const TheGift = ({ userId }) => {
  // Get the configuration for this user
  const config = getGiftConfig(userId)
  
  // Add loading state
  const [imagesLoaded, setImagesLoaded] = useState(false)
  const [loadError, setLoadError] = useState(null)
  
  // If no config found (invalid user), show error or redirect
  if (!config) {
    return (
      <div className='h-full flex items-center justify-center flex-col gap-4'>
        <h1 className='font-love-light text-4xl text-red-500'>Oops!</h1>
        <p className='font-body text-xl text-gray-600'>This gift doesn't exist.</p>
        <button 
          onClick={() => window.location.href = '/'}
          className='px-6 py-2 outline-4 outline-double rounded-2xl outline-red-500 text-red-500 bg-[#faf9f0]'
        >
          Go Home
        </button>
      </div>
    )
  }
  
  const [step, setStep] = useState(0)
  const [heartProgress, setHeartProgress] = useState(0)
  const [wordVisible, setWordVisible] = useState(true)
  const [photoVisible, setPhotoVisible] = useState(true)
  const [position, setPosition] = useState(generatePosition())
  const [positions] = useState(() => config.images.map(() => generatePosition()))

  // Preload images when component mounts
  useEffect(() => {
    let isMounted = true
    
    const loadImages = async () => {
      try {
        await preloadImages(config.images)
        if (isMounted) {
          setImagesLoaded(true)
        }
      } catch (error) {
        console.error('Failed to load images:', error)
        if (isMounted) {
          setLoadError(error.message)
        }
      }
    }
    
    loadImages()
    
    return () => {
      isMounted = false
    }
  }, [config.images])

  const targetProgress = (step + 1) * 0.25

  // Only start animation when images are loaded
  useEffect(() => {
    if (!imagesLoaded) return
    if (step >= 4) return
    if (heartProgress >= targetProgress) return
    
    const timer = setTimeout(() => {
      setHeartProgress(prev => Math.min(prev + 0.008, targetProgress))
    }, 16)
    
    return () => clearTimeout(timer)
  }, [heartProgress, targetProgress, step, imagesLoaded])

  useEffect(() => {
    if (!imagesLoaded) return
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
  }, [heartProgress, targetProgress, step, config.images.length, imagesLoaded])

  // Show loading screen while images are loading
  if (!imagesLoaded && !loadError) {
    return (
      <div className='h-full flex flex-col items-center justify-center gap-4'>
        <div className="relative">
          <div className="w-16 h-16 border-4 border-red-200 border-t-red-500 rounded-full animate-spin"></div>
        </div>
        <p className='font-body text-xl text-gray-600 animate-pulse'>
          Preparing your gift...
        </p>
        <p className='font-body text-sm text-gray-400'>
          Loading {config.images.length} memories
        </p>
      </div>
    )
  }

  // Show error if loading failed
  if (loadError) {
    return (
      <div className='h-full flex items-center justify-center flex-col gap-4'>
        <h1 className='font-love-light text-4xl text-red-500'>Connection Issue</h1>
        <p className='font-body text-xl text-gray-600 text-center px-4'>
          Having trouble loading the gift. Please check your connection and try again.
        </p>
        <button 
          onClick={() => window.location.reload()}
          className='px-6 py-2 outline-4 outline-double rounded-2xl outline-red-500 text-red-500 bg-[#faf9f0] hover:scale-105 transition-transform'
        >
          Try Again
        </button>
      </div>
    )
  }

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