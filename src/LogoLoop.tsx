import type { CSSProperties, ReactNode } from 'react'
import './LogoLoop.css'

type LogoLoopItem = {
  node: ReactNode
  title: string
  href?: string
}

type LogoLoopProps = {
  logos: LogoLoopItem[]
  speed?: number
  direction?: 'left' | 'right'
  logoHeight?: number
  gap?: number
  pauseOnHover?: boolean
  scaleOnHover?: boolean
  fadeOut?: boolean
  fadeOutColor?: string
  ariaLabel?: string
}

export default function LogoLoop({
  logos,
  speed = 60,
  direction = 'left',
  logoHeight = 40,
  gap = 40,
  pauseOnHover = false,
  scaleOnHover = false,
  fadeOut = false,
  fadeOutColor = '#001822',
  ariaLabel = 'Logo carousel',
}: LogoLoopProps) {
  const loopItems = [...logos, ...logos]
  const duration = Math.max(18, (logos.length * (logoHeight + gap + 72)) / speed)

  return (
    <div
      className={[
        'logoloop',
        `logoloop--${direction}`,
        pauseOnHover ? 'logoloop--pause-hover' : '',
        scaleOnHover ? 'logoloop--scale-hover' : '',
        fadeOut ? 'logoloop--fade' : '',
      ]
        .filter(Boolean)
        .join(' ')}
      style={
        {
          '--logoloop-logo-height': `${logoHeight}px`,
          '--logoloop-gap': `${gap}px`,
          '--logoloop-duration': `${duration}s`,
          '--logoloop-fade-color': fadeOutColor,
        } as CSSProperties
      }
      aria-label={ariaLabel}
      role="region"
    >
      <div className="logoloop__track">
        {loopItems.map((logo, index) => {
          const content = (
            <>
              <span className="logoloop__node" aria-hidden="true">
                {logo.node}
              </span>
              <span className="logoloop__title">{logo.title}</span>
            </>
          )

          return logo.href ? (
            <a
              className="logoloop__item"
              href={logo.href}
              key={`${logo.title}-${index}`}
              title={logo.title}
              aria-label={logo.title}
            >
              {content}
            </a>
          ) : (
            <div
              className="logoloop__item"
              key={`${logo.title}-${index}`}
              title={logo.title}
              aria-label={logo.title}
            >
              {content}
            </div>
          )
        })}
      </div>
    </div>
  )
}
