import { useState } from 'react'
import TheGift from './TheGift'

const noButtonSizes = {
  normal:  'w-full sm:w-30 text-xl sm:text-2xl md:text-3xl px-6 py-2 sm:px-4 sm:py-0.5',
  shrink1: 'w-full sm:w-24 text-base sm:text-sm py-2 sm:py-1 px-2',
  shrink2: 'w-full sm:w-16 text-xs py-1 px-1',
  shrink3: 'w-10 text-[9px] py-0.5',
  shrink4: 'w-5 h-5 text-[6px] p-0',
}

const nextSize = {
  normal:  'shrink1',
  shrink1: 'shrink2',
  shrink2: 'shrink3',
  shrink3: 'shrink4',
  shrink4: null,
}

const LandingPage = () => {
  const [show, setShow] = useState('home')
  const [buttonSize, setButtonSize] = useState('normal')

  return (
    <div className='h-full'>

      {show === 'home' && (
        <section className='flex flex-col h-full items-center justify-center gap-3 px-4 sm:px-6 md:px-8'>
          <div className='p-0.5 gap-2'>
            <h1 className='text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-love-light text-center'>
              Greetings,
            </h1>
            <h1 className='text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-love-light text-center'>
              Fair Princess!!!
            </h1>
          </div>
          <p className='text-xl sm:text-2xl md:text-3xl lg:text-4xl font-body text-center px-2'>
            Dont you wish to witness my offerings to you?
          </p>
          <div className='flex flex-col sm:flex-row gap-4 sm:gap-2 font-body'>
            <button
              onClick={() => setShow('Yes')}
              className='mx-0 sm:mx-2 px-6 py-1.5 sm:px-4 sm:py-0.5 w-full sm:w-30 text-center outline-4 outline-double rounded-2xl outline-red-500 text-red-500 bg-[#faf9f0] text-xl sm:text-2xl md:text-3xl transition-all duration-300 hover:scale-105'
            >
              Yes, I do
            </button>
            <button
              onClick={() => setShow('No')}
              className='mx-0 sm:mx-2 px-6 py-1.5 sm:px-4 sm:py-0.5 w-full sm:w-30 text-center outline-4 outline-double rounded-2xl outline-red-800 text-red-800 bg-[#faf9f0] text-xl sm:text-2xl md:text-3xl transition-all duration-300 hover:scale-105'
            >
              No Thanks
            </button>
          </div>
        </section>
      )}

      {show === 'No' && (
        <section className='flex flex-col h-full items-center justify-center gap-3 px-4 sm:px-6 md:px-8'>
          <h1 className='text-center font-love-light text-3xl sm:text-4xl md:text-5xl text-red-500 px-2'>
            Please!! Promise You'll Like It...
          </h1>
          <div className='flex flex-col sm:flex-row gap-4 sm:gap-2 mt-2 font-body items-center justify-center'>
            <button
              onClick={() => setShow('Yes')}
              className='mx-0 sm:mx-2 px-6 py-2 sm:px-4 sm:py-0.5 text-center w-full sm:w-30 outline-4 outline-double rounded-2xl outline-red-500 text-red-500 bg-[#faf9f0] text-xl sm:text-2xl md:text-3xl transition-all duration-300 hover:scale-105'
            >
              Fine
            </button>

            {nextSize[buttonSize] !== undefined && (
              <button
                onClick={() => nextSize[buttonSize] && setButtonSize(nextSize[buttonSize])}
                className={`mx-0 sm:mx-2 text-center outline-4 outline-double rounded-2xl outline-red-800 text-red-800 bg-[#faf9f0] transition-all duration-500 overflow-hidden ${noButtonSizes[buttonSize]}`}
              >
                {buttonSize === 'shrink4' ? ' ' : 'Still No'}
              </button>
            )}
          </div>
        </section>
      )}

      {show === 'Yes' && (
        <TheGift />
      )}

    </div>
  )
}

export default LandingPage