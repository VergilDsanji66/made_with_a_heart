import { useState } from 'react'
import TheGift from './TheGift'

const landingPage = () => {
  const [show, setShow] = useState('home')
  const [buttonSize, setButtonSize] = useState('normal')

  return (
    <div className='h-full'>
      {show === 'home' && (
        <section className='flex flex-col h-full items-center justify-center gap-3'>
            <div className=' p-0.5 gap-2 '>
            <h1 className=' text-8xl font-love-light text-center '>Greetings,</h1>
            <h1 className=' text-8xl font-love-light text-center '>Fair Princess!!!</h1>
          </div>
          <p className=' text-4xl font-body '>Dont you wish to witness my offerings to you?</p>
          <div className='flex gap-2 font-body text-3xl'>
            <button onClick={() => setShow('Yes')} className=' mx-2 px-4 py-0.5 w-30 text-center outline-4 outline-double rounded-2xl outline-red-500 text-red-500 bg-gray-100'>Yes, I do</button>
            <button onClick={() => setShow('No')} className=' mx-2 px-4 py-0.5 w-30 text-center outline-4 outline-double rounded-2xl outline-red-800 text-red-800 bg-gray-100'>No Thanks</button>
          </div>
        </section>
      )}
      {show === 'No' && (
        <section className='flex flex-col h-full items-center justify-center gap-3'>
          <h1 className='text-center font-love-light text-5xl text-red-500'>Please!! Promise You'll Like It...</h1>
          <div className='flex gap-2 mt-2 font-body text-3xl items-center justify-center'>
            <button onClick={() => setShow('Yes')} className=' mx-2 px-4 py-0.5 text-center w-30 outline-4 outline-double rounded-2xl outline-red-500 text-red-500 bg-gray-100 text-3xl'>Fine</button>
          
            {buttonSize === 'normal' && (
              <button onClick={() => setButtonSize('shirnk-1')} className=' mx-2 px-4 py-0.5 text-center w-30 outline-4 outline-double rounded-2xl outline-red-800 text-red-800 bg-gray-100 text-3xl'>Still No</button>
            )}

            {buttonSize === 'shirnk-1' && (
               <button onClick={() => setButtonSize('shirnk-2')} className=' mx-2 text-center w-18 h-5 outline-4 outline-double rounded-2xl outline-red-800 text-red-800 bg-gray-100 text-base'>Still No</button>
            )}

            {buttonSize === 'shirnk-2' && (
               <button onClick={() => setButtonSize('shirnk-3')} className=' mx-2 text-center w-12 h-4 outline-4 outline-double rounded-2xl outline-red-800 text-red-800 bg-gray-100 text-xs'>Still No</button>
            )}
           </div>
        </section>
      )}

      {show === 'Yes' && (
        <TheGift/>
      )}
    </div>
  )
}

export default landingPage