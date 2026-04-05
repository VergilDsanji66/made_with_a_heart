// assets.js
import img0 from '../assets/Limg0.jpeg'
import img1 from '../assets/Limg1.jpeg'
import img2 from '../assets/Limg2.jpeg'
import img3 from '../assets/Limg3.jpeg'

import nimg0 from '../assets/Nimg0.jpeg'
import nimg1 from '../assets/Nimg1.jpeg'
import nimg2 from '../assets/Nimg2.jpeg'
import nimg3 from '../assets/Nimg3.jpeg'

export const giftConfigs = {
  lethu: {
    id: 'lethu',
    name: 'Lethu',
    images: [img0, img1, img2, img3],
    words: ['You', 'Mean', 'Everything', 'To Me'],
    finalTitle: 'Not just a friend —',
    finalMessage: 'A piece of my heart, always.',
    heartColor: '#e05a6a',
    textColor: 'text-red-400',
    bgGlow: 'rgba(220,100,100,0.15)'
  },
  ndivho: {
    id: 'ndivho',
    name: 'Ndivho',
    images: [nimg0, nimg1, nimg2, nimg3],
    words: ['A', 'Smile', 'I Treasure', 'A Presence I Adore'],
    finalTitle: 'A new friend,',
    finalMessage: 'A beautiful memory to hold forever 🌸',
    heartColor: '#FF69B4',
    textColor: 'text-pink-400',
    bgGlow: 'rgba(255,105,180,0.15)'
  }
}

export const getGiftConfig = (userId) => {
  return giftConfigs[userId] || null
}