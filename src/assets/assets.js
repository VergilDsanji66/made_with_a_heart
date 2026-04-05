// assets.js
import img0 from '../assets/Limg0.jpeg'
import img1 from '../assets/Limg1.jpeg'
import img2 from '../assets/Limg2.jpeg'
import img3 from '../assets/Limg3.jpeg'

import nimg0 from '../assets/Nimg0.jpeg'
import nimg1 from '../assets/Nimg1.jpeg'
import nimg2 from '../assets/Nimg2.jpeg'
import nimg3 from '../assets/Nimg3.jpeg'

// Configuration for different routes
export const giftConfigs = {
  lethu: {
    name: 'lethu',
    images: [img0, img1, img2, img3],
    words: ['You', 'Mean', 'Everything', 'To Me'],
    finalTitle: 'Not just a friend —',
    finalMessage: 'A piece of my heart, always.',
    heartColor: '#e05a6a',
    textColor: 'text-red-400'
  },
  ndivho: {
    name: 'Ndivho',
    images: [nimg0, nimg1, nimg2, nimg3],
    words: ['A', 'Smile', 'I Love', 'A Presence I Admire'],
    finalTitle: 'A new friend,',
    finalMessage: 'A new memory to hold dear ✨',
    heartColor: '#6a9ee0',
    textColor: 'text-blue-400'
  }
  // Add more people here easily!
}

// Helper function to get config based on route
export const getGiftConfig = (route) => {
  // Remove leading slash if present
  const cleanRoute = route.replace(/^\//, '').toLowerCase()
  return giftConfigs[cleanRoute]
}