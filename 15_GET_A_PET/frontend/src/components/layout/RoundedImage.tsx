import React from 'react'
import styles from './RoundedImage.module.css'

interface RoundedImageProps {
  src: string,
  alt: string,
  width?: string
}

function RoundedImage({ src, alt, width }: RoundedImageProps) {
  return (
    <img className={`${styles.rounded_image} ${width ? styles[width] : ''}`}
      src={src}
      alt={alt}
    />
  )
}

export default RoundedImage
