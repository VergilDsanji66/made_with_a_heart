// assets/assets.js
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
    heartColor: '#e05a6a',  // Soft romantic red
    textColor: 'text-red-400',
    bgGlow: 'rgba(220,100,100,0.15)'
  },
  ndivho: {
    name: 'Ndivho',
    images: [nimg0, nimg1, nimg2, nimg3],
    words: ['A', 'Smile', 'I Treasure', 'A Presence I Adore'],
    finalTitle: 'A new friend,',
    finalMessage: 'A beautiful memory to hold forever 🌸',
    heartColor: '#FF69B4',  // Hot pink - vibrant and joyful
    textColor: 'text-pink-400',
    bgGlow: 'rgba(255,105,180,0.15)'
  }
  // Add more people here easily!
}

// Helper function to get config based on route
export const getGiftConfig = (route) => {
  // route will be 'lethu' or 'Ndivho' (case-sensitive from URL)
  if (route === 'lethu') return giftConfigs.lethu
  if (route === 'Ndivho') return giftConfigs.ndivho
  return null  // Return null for invalid routes (no default)
}