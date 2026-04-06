// assets.js
import img0 from '../assets/Limg0.jpeg'
import img1 from '../assets/Limg1.jpeg'
import img2 from '../assets/Limg2.jpeg'
import img3 from '../assets/Limg3.jpeg'

import nimg0 from '../assets/Nimg0.jpeg'
import nimg1 from '../assets/Nimg1.jpeg'
import nimg2 from '../assets/Nimg2.jpeg'
import nimg3 from '../assets/Nimg3.jpeg'

import cimg0 from '../assets/cimg0.jpeg'
import cimg1 from '../assets/cimg1.jpeg'
import cimg2 from '../assets/cimg2.jpeg'
import cimg3 from '../assets/cimg3.jpeg'

import rimg0 from '../assets/rimg0.jpeg'
import rimg1 from '../assets/rimg1.jpeg'
import rimg2 from '../assets/rimg2.jpeg'
import rimg3 from '../assets/rimg3.jpeg'

import pimg0 from '../assets/pimg0.jpeg'
import pimg1 from '../assets/pimg1.jpeg'
import pimg2 from '../assets/pimg2.jpeg'
import pimg3 from '../assets/pimg3.jpeg'

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
    words: ['A', 'Smile', 'A Treasure', 'A Presence I Adore'],
    finalTitle: 'A new friend,',
    finalMessage: 'A beautiful memory to hold forever',
    heartColor: '#FF69B4',
    textColor: 'text-pink-400',
    bgGlow: 'rgba(255,105,180,0.15)'
  }, 
  cecilia: {
    id: 'cecilia',
    name: 'Cecilia',
    images: [cimg0, cimg1, cimg2, cimg3],
    words: ['A', 'Smile', 'A Treasure', 'A Presence I Miss'],
    finalTitle: 'An old friend,',
    finalMessage: 'A beautiful memory to hold forever',
    heartColor: '#FF69B4',
    textColor: 'text-pink-400',
    bgGlow: 'rgba(255,105,180,0.15)'
  },
  roto: {
    id: 'roto',
    name: 'Roto',
    images: [rimg0, rimg1, rimg2, rimg3],
    words: ['Congratulations', 'Graduate', 'So Proud', 'Of You!'],
    finalTitle: 'A milestone achieved,',
    finalMessage: 'Your hard work paid off! 🎓✨',
    heartColor: '#4A90E2',
    textColor: 'text-blue-500',
    bgGlow: 'rgba(74,144,226,0.15)'
  },
  pfano: {
    id: 'pfano',
    name: 'Pfano',
    images: [pimg0, pimg1, pimg2, pimg3],
    words: ['A', 'Smile', 'A Treasure', 'A Presence I Miss'],
    finalTitle: 'An old friend,',
    finalMessage: 'A beautiful memory to hold forever',
    heartColor: '#4A90E2',
    textColor: 'text-blue-500',
    bgGlow: 'rgba(74,144,226,0.15)'
  }
}

export const getGiftConfig = (userId) => {
  return giftConfigs[userId] || null
}