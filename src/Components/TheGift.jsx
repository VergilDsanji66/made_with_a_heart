import { Heart } from 'lucide-react'
import v1 from '../assets/v1.mp4'

const TheGift = () => {
  return (
    <div className='flex flex-col items-center justify-center h-screen gap-4 p-4'>
      <div className='relative w-full max-w-4xl mx-auto'>
        <video 
          src={v1}
          controls
          autoPlay
          loop
          muted
          className='w-full h-auto rounded-lg shadow-2xl'
        >
          Your browser does not support the video tag.
        </video>
        
        {/* Optional: Add a decorative heart overlay */}
        <div className='absolute -top-4 -right-4 animate-pulse'>
          <Heart className='text-red-500 w-8 h-8 fill-red-500' />
        </div>
      </div>
      
      {/* Optional: Add a caption */}
      <p className='text-2xl font-love-light text-center mt-4'>
        A special gift just for you 💝
      </p>
    </div>
  )
}

export default TheGift