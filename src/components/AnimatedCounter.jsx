import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useEffect, useRef } from 'react'

const AnimatedCounter = ({ value, duration = 2, suffix = '', prefix = '' }) => {
  const ref = useRef(null)
  const motionValue = useMotionValue(0)
  const springValue = useSpring(motionValue, { duration: duration * 1000 })
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  useEffect(() => {
    if (isInView) {
      motionValue.set(value)
    }
  }, [motionValue, isInView, value])

  useEffect(() => {
    springValue.on('change', (latest) => {
      if (ref.current) {
        ref.current.textContent = prefix + Math.floor(latest).toLocaleString() + suffix
      }
    })
  }, [springValue, prefix, suffix])

  return <span ref={ref}>{prefix}0{suffix}</span>
}

export default AnimatedCounter

