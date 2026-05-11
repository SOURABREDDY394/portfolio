import { Suspense, lazy, useEffect, useId, useState } from 'react'
import type { ChangeEvent, FormEvent, PointerEvent } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowRight,
  Award,
  Brain,
  Building2,
  Calendar,
  CheckCircle,
  Code2,
  Database,
  Download,
  ExternalLink,
  FileText,
  Github,
  GraduationCap,
  ImageIcon,
  Layers3,
  Linkedin,
  Mail,
  Menu,
  MapPin,
  Rocket,
  Send,
  Server,
  ShieldCheck,
  Sparkles,
  TerminalSquare,
  Trophy,
  User,
  X,
  Zap,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import {
  SiCss,
  SiFastapi,
  SiFlask,
  SiGit,
  SiGithub,
  SiHtml5,
  SiJavascript,
  SiNextdotjs,
  SiPython,
  SiReact,
  SiSupabase,
  SiTailwindcss,
} from 'react-icons/si'
import { TbBrain } from 'react-icons/tb'
import LogoLoop from './LogoLoop'
import './App.css'

const Lanyard = lazy(() => import('./components/Lanyard/Lanyard.tsx'))

type Project = {
  title: string
  description: string
  longDescription: string
  icon: LucideIcon
  tech: string[]
  features: string[]
  demoUrl: string
  githubUrl: string
}

type SkillGroup = {
  title: string
  icon: LucideIcon
  skills: { name: string; icon: LucideIcon }[]
}

type Achievement = {
  slug: string
  title: string
  category: string
  date: string
  location: string
  organization: string
  subtitle: string
  shortDescription: string
  overview: string
  learned: string[]
  skillsGained: string[]
  tools: string[]
  takeaways: string[]
  media: AchievementMedia[]
  placeholders: string[]
  icon: LucideIcon
}

type AchievementMedia = {
  type: 'image' | 'pdf'
  src: string
  label: string
  alt: string
  objectPosition?: string
}

const navItems = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Achievements', href: '#achievements' },
  { name: 'Contact', href: '#contact' },
]

const journeyItems = [
  {
    title: 'FSB Degree College',
    detail: 'Laid the foundation in Computer Applications and discovered my passion for tech.',
    date: '2019 - 2022',
    icon: GraduationCap,
  },
  {
    title: 'AI / ML Enthusiast',
    detail: 'Dove into Artificial Intelligence and Machine Learning with curiosity and focus.',
    date: '2022 - 2023',
    icon: Brain,
  },
  {
    title: 'Hackathon Participant',
    detail: 'Built real-world solutions under pressure and collaborated with ambitious builders.',
    date: '2023',
    icon: Trophy,
  },
  {
    title: 'Certifications Earned',
    detail: 'Strengthened skills through industry-recognized certifications and hands-on learning.',
    date: '2023 - 2024',
    icon: Award,
  },
  {
    title: 'Continuous Growth',
    detail: 'Always learning, always building, and pushing toward more capable AI products.',
    date: 'Ongoing',
    icon: Rocket,
  },
]

const skillGroups: SkillGroup[] = [
  {
    title: 'Frontend Systems',
    icon: Code2,
    skills: [
      { name: 'HTML', icon: Code2 },
      { name: 'CSS', icon: Layers3 },
      { name: 'JavaScript', icon: TerminalSquare },
      { name: 'React', icon: Zap },
      { name: 'Next.js', icon: Sparkles },
      { name: 'Tailwind', icon: Layers3 },
    ],
  },
  {
    title: 'Backend Systems',
    icon: Server,
    skills: [
      { name: 'Python', icon: TerminalSquare },
      { name: 'Flask', icon: Server },
      { name: 'Django', icon: ShieldCheck },
      { name: 'FastAPI', icon: Zap },
      { name: 'REST APIs', icon: Layers3 },
      { name: 'Databases', icon: Database },
    ],
  },
  {
    title: 'AI Engineering',
    icon: Brain,
    skills: [
      { name: 'Machine Learning', icon: Brain },
      { name: 'Deep Learning', icon: Sparkles },
      { name: 'NLP', icon: TerminalSquare },
      { name: 'OCR', icon: Zap },
      { name: 'Vector DB', icon: Database },
      { name: 'AI Models', icon: Brain },
    ],
  },
]

const techLogos = [
  { node: <SiHtml5 />, title: 'HTML' },
  { node: <SiCss />, title: 'CSS' },
  { node: <SiJavascript />, title: 'JavaScript' },
  { node: <SiReact />, title: 'React' },
  { node: <SiNextdotjs />, title: 'Next.js' },
  { node: <SiPython />, title: 'Python' },
  { node: <SiFlask />, title: 'Flask' },
  { node: <SiFastapi />, title: 'FastAPI' },
  { node: <SiTailwindcss />, title: 'Tailwind CSS' },
  { node: <SiSupabase />, title: 'Supabase' },
  { node: <SiGithub />, title: 'GitHub' },
  { node: <SiGit />, title: 'Git' },
  { node: <TbBrain />, title: 'Machine Learning' },
  { node: <TbBrain />, title: 'AI' },
]

const projects: Project[] = [
  {
    title: 'ShopMind AI',
    description: 'An intelligent e-commerce assistant for recommendations, behavior insights, and personalized shopping flows.',
    longDescription:
      'ShopMind AI is built as an AI commerce module that combines customer intent, behavior analytics, and smart product discovery into one assistant experience.',
    icon: Sparkles,
    tech: ['React', 'Python', 'AI Models', 'APIs', 'Analytics'],
    features: ['Personalized recommendations', 'Shopping behavior insights', 'AI-assisted product discovery'],
    demoUrl: '#',
    githubUrl: 'https://github.com/SOURABREDDY394',
  },
  {
    title: 'AI Startup Helper',
    description: 'A founder co-pilot that helps validate ideas, build strategy, and accelerate startup decisions.',
    longDescription:
      'AI Startup Helper turns early-stage uncertainty into structured research, idea validation, and automated planning support for founders.',
    icon: Rocket,
    tech: ['Next.js', 'FastAPI', 'NLP', 'Automation', 'Data'],
    features: ['Idea validation', 'Strategy generation', 'Data-backed startup guidance'],
    demoUrl: '#',
    githubUrl: 'https://github.com/SOURABREDDY394',
  },
  {
    title: 'DevMind AI',
    description: 'An AI-powered development assistant for code generation, documentation, and context-aware debugging.',
    longDescription:
      'DevMind AI is a developer intelligence module that supports productivity through code assistance, project context, and automated explanations.',
    icon: Code2,
    tech: ['React', 'TypeScript', 'LLMs', 'Vector DB', 'Developer Tools'],
    features: ['Code generation', 'Context-aware debugging', 'Documentation support'],
    demoUrl: '#',
    githubUrl: 'https://github.com/SOURABREDDY394',
  },
]

const achievements: Achievement[] = [
  {
    slug: 'codex-hackathon',
    title: 'Codex Hackathon',
    category: 'Hackathon',
    date: 'Date to be updated',
    location: 'Location to be updated',
    organization: 'Codex',
    subtitle: 'Top 10 Finalist',
    shortDescription: 'Built an AI-powered developer tool and presented it as a focused hackathon solution.',
    overview:
      'Codex Hackathon was a practical build-focused experience where the goal was to turn an idea into a working AI-powered developer tool. The achievement represents product thinking, rapid execution, and the ability to communicate a technical solution clearly under time pressure.',
    learned: [
      'How to scope an AI product quickly and focus on the features that create the most value.',
      'How to balance speed, technical quality, and presentation clarity during a timed build.',
      'How to explain an engineering idea in a way that feels useful to both technical and non-technical audiences.',
    ],
    skillsGained: ['AI product thinking', 'Rapid prototyping', 'Problem framing', 'Technical presentation'],
    tools: ['AI workflows', 'Frontend development', 'APIs', 'Developer tooling concepts'],
    takeaways: [
      'A strong hackathon project needs a clear problem, a working flow, and a focused story.',
      'Execution speed improves when the product direction is simple and measurable.',
      'AI tools become more valuable when they are connected to a real user workflow.',
    ],
    media: [
      {
        type: 'image',
        src: '/achievements/codexhackathon1.jpeg',
        label: 'Codex Hackathon event photo',
        alt: 'Codex Hackathon event photo',
        objectPosition: 'center center',
      },
      {
        type: 'image',
        src: '/achievements/codexhackathon2.jpeg',
        label: 'Codex Hackathon workspace photo',
        alt: 'Codex Hackathon workspace photo',
        objectPosition: 'center center',
      },
    ],
    placeholders: ['Certificate image will be added here', 'Project demo screenshot will be added here'],
    icon: Code2,
  },
  {
    slug: 'ai-scientist',
    title: 'AI Scientist',
    category: 'AI Challenge',
    date: 'Date to be updated',
    location: 'Location to be updated',
    organization: 'AI Scientist Program',
    subtitle: 'Runner Up',
    shortDescription: 'Worked on an AI research agent concept focused on automating parts of scientific discovery.',
    overview:
      'AI Scientist was an achievement centered on building and reasoning about intelligent research workflows. The experience focused on how AI can assist with exploration, hypothesis generation, automation, and structured research support.',
    learned: [
      'How AI systems can support research workflows without replacing human judgment.',
      'How to break a broad scientific discovery problem into smaller automated steps.',
      'How to evaluate AI outputs with structure, context, and careful reasoning.',
    ],
    skillsGained: ['AI reasoning', 'Research automation', 'Workflow design', 'Evaluation mindset'],
    tools: ['AI models', 'Prompt workflows', 'Research agents', 'Python concepts'],
    takeaways: [
      'Research automation works best when the AI system is guided by clear constraints.',
      'AI-generated outputs need review, ranking, and context before they become useful.',
      'Agentic systems should be designed around repeatable processes, not only impressive demos.',
    ],
    media: [
      {
        type: 'image',
        src: '/achievements/ai-scientist-certificate.png',
        label: 'AI Scientist completion certificate',
        alt: 'AI Scientist completion certificate for Sourab Reddy',
        objectPosition: 'center center',
      },
    ],
    placeholders: ['Certificate image will be added here', 'Research workflow screenshot will be added here', 'Event gallery image will be added here'],
    icon: Brain,
  },
  {
    slug: 'solo-seven-robotics-workshop',
    title: 'Solo Seven Robotics',
    category: 'Robotics Workshop',
    date: 'Date to be updated',
    location: 'Location to be updated',
    organization: 'Solo Seven Robotics',
    subtitle: 'Core Team Member',
    shortDescription: 'Participated in a robotics workshop focused on autonomous systems and practical problem solving.',
    overview:
      'Solo Seven Robotics Workshop helped connect software thinking with physical systems. The experience focused on robotics fundamentals, team coordination, real-world constraints, and the discipline required to build systems that interact with the physical environment.',
    learned: [
      'How robotics projects combine logic, hardware behavior, testing, and iteration.',
      'How team roles and coordination affect the success of practical engineering work.',
      'How real-world constraints change the way software and automation systems are designed.',
    ],
    skillsGained: ['Robotics fundamentals', 'Team collaboration', 'Systems thinking', 'Debugging under constraints'],
    tools: ['Robotics concepts', 'Sensors and control basics', 'Automation logic', 'Team prototyping'],
    takeaways: [
      'Robotics makes engineering more concrete because every decision is tested in the real world.',
      'Good systems thinking matters as much as individual technical skill.',
      'Testing and iteration are essential when software controls physical outcomes.',
    ],
    media: [
      {
        type: 'image',
        src: '/achievements/robotics1.jpeg',
        label: 'Robotics workshop demonstration',
        alt: 'Robotics workshop demonstration with robotic arms',
        objectPosition: 'center center',
      },
      {
        type: 'image',
        src: '/achievements/robotics2.jpeg',
        label: 'Physical AI workshop group photo',
        alt: 'Physical AI workshop group photo',
        objectPosition: 'center center',
      },
    ],
    placeholders: ['Certificate image will be added here'],
    icon: Zap,
  },
  {
    slug: 'devday-ai-engineer-workshop',
    title: 'DevDay AI Engineer Workshop',
    category: 'AI Engineering Workshop',
    date: 'Date to be updated',
    location: 'Location to be updated',
    organization: 'DevDay',
    subtitle: 'AI Engineer Workshop',
    shortDescription: 'Joined an AI engineering workshop focused on practical AI systems, tools, and implementation workflows.',
    overview:
      'DevDay AI Engineer Workshop was a practical learning experience focused on how AI engineering concepts become usable products. The workshop connects model capabilities, developer tools, implementation patterns, and product-quality thinking.',
    learned: [
      'How to think about AI features as complete systems instead of isolated prompts.',
      'How developers can structure AI workflows for reliability, iteration, and usability.',
      'How modern AI engineering connects frontend experience, backend logic, and model behavior.',
    ],
    skillsGained: ['AI engineering', 'System design', 'Developer workflow thinking', 'Product implementation'],
    tools: ['AI models', 'APIs', 'Developer tools', 'Full-stack workflows'],
    takeaways: [
      'AI engineering is strongest when model behavior is wrapped in a thoughtful product flow.',
      'Reliable AI systems need clear inputs, helpful constraints, and useful feedback loops.',
      'The best AI products feel simple to users because the engineering underneath is carefully designed.',
    ],
    media: [
      {
        type: 'image',
        src: '/achievements/devday1.jpeg',
        label: 'DevDay AI engineering workshop photo',
        alt: 'DevDay AI engineering workshop photo',
        objectPosition: 'center center',
      },
    ],
    placeholders: ['Certificate image will be added here', 'Event gallery image will be added here'],
    icon: GraduationCap,
  },
]

const contactLinks = [
  {
    label: 'Email',
    value: 'sourabreddimalla@gmail.com',
    href: 'mailto:sourabreddimalla@gmail.com',
    icon: Mail,
  },
  {
    label: 'GitHub',
    value: 'github.com/SOURABREDDY394',
    href: 'https://github.com/SOURABREDDY394',
    icon: Github,
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/sourab-reddy-9b0582330',
    href: 'https://linkedin.com/in/sourab-reddy-9b0582330',
    icon: Linkedin,
  },
]

function useDepthProgress() {
  const [depth, setDepth] = useState(0)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const sections = navItems.map((item) => item.href.slice(1))

    const handleScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      const nextDepth = maxScroll > 0 ? window.scrollY / maxScroll : 0
      setDepth(Math.min(Math.max(nextDepth, 0), 1))

      for (const section of [...sections].reverse()) {
        const element = document.getElementById(section)
        if (element && element.getBoundingClientRect().top <= 170) {
          setActiveSection(section)
          break
        }
      }
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return { depth, activeSection }
}

function scrollToSection(href: string, behavior: ScrollBehavior = 'smooth') {
  const element = document.querySelector(href)
  if (!element) return

  const navOffset = window.innerWidth < 760 ? 118 : 172
  const targetTop = element.getBoundingClientRect().top + window.scrollY - navOffset
  window.scrollTo({ top: Math.max(0, targetTop), behavior })
}

function navigateTo(path: string) {
  window.history.pushState({}, '', path)
  window.dispatchEvent(new PopStateEvent('popstate'))
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function handleInteractiveMove(event: PointerEvent<HTMLElement>) {
  const rect = event.currentTarget.getBoundingClientRect()
  const x = ((event.clientX - rect.left) / rect.width) * 100
  const y = ((event.clientY - rect.top) / rect.height) * 100
  const rotateY = ((x - 50) / 50) * 3
  const rotateX = ((50 - y) / 50) * 3

  event.currentTarget.style.setProperty('--mx', `${x}%`)
  event.currentTarget.style.setProperty('--my', `${y}%`)
  event.currentTarget.style.setProperty('--rx', `${rotateX}deg`)
  event.currentTarget.style.setProperty('--ry', `${rotateY}deg`)
}

function resetInteractiveMove(event: PointerEvent<HTMLElement>) {
  event.currentTarget.style.setProperty('--rx', '0deg')
  event.currentTarget.style.setProperty('--ry', '0deg')
}

function handleOceanLightMove(event: PointerEvent<HTMLElement>) {
  const card = event.currentTarget
  const rect = card.getBoundingClientRect()
  const x = ((event.clientX - rect.left) / rect.width) * 100
  const y = ((event.clientY - rect.top) / rect.height) * 100

  card.style.setProperty('--glow-x', `${x}%`)
  card.style.setProperty('--glow-y', `${y}%`)
  card.style.setProperty('--glow-intensity', '1')
  card.style.setProperty('--glow-radius', '280px')
}

function handleOceanLightLeave(event: PointerEvent<HTMLElement>) {
  event.currentTarget.style.setProperty('--glow-intensity', '0')
}

function handleOceanLightClick(event: PointerEvent<HTMLElement>) {
  const card = event.currentTarget
  const rect = card.getBoundingClientRect()
  const ripple = document.createElement('span')

  ripple.className = 'ocean-light-ripple'
  ripple.style.left = `${event.clientX - rect.left}px`
  ripple.style.top = `${event.clientY - rect.top}px`
  card.appendChild(ripple)
  window.setTimeout(() => ripple.remove(), 760)
}

function useIsCompactViewport(maxWidth = 768) {
  const [isCompact, setIsCompact] = useState(false)

  useEffect(() => {
    const media = window.matchMedia(`(max-width: ${maxWidth}px)`)
    const updateViewport = () => setIsCompact(media.matches)

    updateViewport()
    media.addEventListener('change', updateViewport)
    return () => media.removeEventListener('change', updateViewport)
  }, [maxWidth])

  return isCompact
}

function useRoutePath() {
  const [path, setPath] = useState(() => window.location.pathname)

  useEffect(() => {
    const syncPath = () => setPath(window.location.pathname)
    window.addEventListener('popstate', syncPath)
    return () => window.removeEventListener('popstate', syncPath)
  }, [])

  return path
}

function useMobileScrollReveal(refreshKey: string) {
  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const compactViewport = window.matchMedia('(max-width: 760px)')
    let observer: IntersectionObserver | null = null

    const reveal = () => {
      observer?.disconnect()

      const revealItems = Array.from(document.querySelectorAll<HTMLElement>('.reveal, .reveal-card'))

      if (!compactViewport.matches || reduceMotion.matches || !('IntersectionObserver' in window)) {
        revealItems.forEach((item) => item.classList.add('visible'))
        return
      }

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return
            entry.target.classList.add('visible')
            observer?.unobserve(entry.target)
          })
        },
        {
          threshold: 0.15,
          rootMargin: '0px 0px -60px 0px',
        },
      )

      revealItems.forEach((item) => {
        item.classList.remove('visible')
        observer?.observe(item)
      })
    }

    reveal()
    compactViewport.addEventListener('change', reveal)
    reduceMotion.addEventListener('change', reveal)

    return () => {
      observer?.disconnect()
      compactViewport.removeEventListener('change', reveal)
      reduceMotion.removeEventListener('change', reveal)
    }
  }, [refreshKey])
}

function OceanBackground() {
  return (
    <div className="ocean-bg" aria-hidden="true">
      <div className="global-light-rays" />
      <div className="ocean-glow" />
      <div className="caustic-light" />
      <div className="bubbles bubbles-one" />
      <div className="bubbles bubbles-two" />
      <div className="marine-snow" />
      <div className="ocean-vignette" />
    </div>
  )
}

function Navbar({ activeSection, depth, routePath }: { activeSection: string; depth: number; routePath: string }) {
  const [open, setOpen] = useState(false)

  const onNavigate = (href: string) => {
    if (href === '#achievements') {
      navigateTo('/achievements')
      setOpen(false)
      return
    }

    if (window.location.pathname !== '/') {
      window.history.pushState({}, '', '/')
      window.dispatchEvent(new PopStateEvent('popstate'))
      window.requestAnimationFrame(() => scrollToSection(href))
    } else {
      scrollToSection(href)
    }
    setOpen(false)
  }

  return (
    <motion.header
      className="site-nav-wrap"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.75, ease: 'easeOut' }}
    >
      <nav className="site-nav" style={{ '--nav-depth': depth } as React.CSSProperties}>
        <button
          className="brand"
          onClick={() => {
            if (window.location.pathname !== '/') {
              navigateTo('/')
            } else {
              onNavigate('#home')
            }
          }}
          aria-label="Go to home"
        >
          <span className="brand-mark">
            <img src="/images/logo.png" alt="" />
          </span>
          <span>Sourab Reddy</span>
        </button>

        <div className="nav-links" aria-label="Primary navigation">
          {navItems.map((item) => {
            const isActive =
              item.href === '#achievements'
                ? routePath.startsWith('/achievements') || activeSection === 'achievements'
                : routePath === '/' && activeSection === item.href.slice(1)
            return (
              <button
                key={item.href}
                className={isActive ? 'active' : ''}
                onClick={() => onNavigate(item.href)}
              >
                {item.name}
              </button>
            )
          })}
        </div>

        <a className="nav-cta" href="/resume.html">
          Resume
          <ArrowRight size={18} />
        </a>

        <button className="menu-toggle" onClick={() => setOpen((value) => !value)} aria-label="Toggle menu">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
          >
            {navItems.map((item) => (
              <button key={item.href} onClick={() => onNavigate(item.href)}>
                {item.name}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

function DepthPath({ depth }: { depth: number }) {
  return (
    <div className="dive-line" aria-hidden="true">
      <span className="dive-dot" style={{ top: `${depth * 100}%` }} />
      {['Surface', 'Shallow', 'Mid', 'Deep', 'Abyss'].map((label, index) => (
        <span
          className="depth-label"
          style={{ top: `${(index / 4) * 100}%` }}
          key={label}
        >
          {label}
        </span>
      ))}
    </div>
  )
}

function FishSvg() {
  const gradientId = useId()
  const bodyGradient = `${gradientId}-body`
  const tailGradient = `${gradientId}-tail`
  const finGradient = `${gradientId}-fin`
  const shineGradient = `${gradientId}-shine`

  return (
    <svg className="fish-svg" viewBox="0 0 160 72" aria-hidden="true">
      <defs>
        <linearGradient id={bodyGradient} x1="12" x2="136" y1="18" y2="52" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="var(--fish-shadow)" />
          <stop offset="0.3" stopColor="var(--fish-body)" />
          <stop offset="0.62" stopColor="var(--fish-silver)" />
          <stop offset="1" stopColor="var(--fish-deep)" />
        </linearGradient>
        <linearGradient id={tailGradient} x1="120" x2="160" y1="36" y2="36" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="var(--fish-body)" stopOpacity="0.78" />
          <stop offset="1" stopColor="var(--fish-deep)" stopOpacity="0.2" />
        </linearGradient>
        <linearGradient id={finGradient} x1="56" x2="92" y1="10" y2="62" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="var(--fish-silver)" stopOpacity="0.34" />
          <stop offset="1" stopColor="var(--fish-deep)" stopOpacity="0.06" />
        </linearGradient>
        <radialGradient id={shineGradient} cx="42%" cy="28%" r="58%">
          <stop offset="0" stopColor="rgba(230, 255, 255, 0.46)" />
          <stop offset="0.45" stopColor="rgba(128, 235, 255, 0.16)" />
          <stop offset="1" stopColor="rgba(128, 235, 255, 0)" />
        </radialGradient>
      </defs>
      <g className="fish-anatomy">
        <path className="fish-tail fish-tail-back" d="M119 36 C136 17 147 12 158 9 C152 25 146 32 132 36 C146 40 152 48 158 63 C147 60 136 55 119 36 Z" fill={`url(#${tailGradient})`} />
        <path className="fish-tail fish-tail-front" d="M122 36 C136 22 145 19 155 17 C150 28 144 33 132 36 C144 39 150 44 155 55 C145 53 136 50 122 36 Z" fill="var(--fish-tail-edge)" />
        <path className="fish-body" d="M12 37 C30 11 76 3 119 24 C129 29 136 34 142 37 C135 41 128 46 118 51 C75 71 30 62 12 37 Z" fill={`url(#${bodyGradient})`} />
        <path className="fish-highlight" d="M28 29 C48 15 83 14 113 27 C87 22 57 24 31 36 C25 39 22 37 28 29 Z" fill={`url(#${shineGradient})`} />
        <path className="fish-line" d="M35 37 C58 32 89 33 122 40" />
        <path className="fish-fin fish-fin-top" d="M64 19 C76 4 96 6 106 23 C88 18 76 18 64 19 Z" fill={`url(#${finGradient})`} />
        <path className="fish-fin fish-fin-bottom" d="M68 50 C82 67 103 62 112 45 C94 51 80 52 68 50 Z" fill={`url(#${finGradient})`} />
        <path className="fish-fin fish-fin-side" d="M73 39 C86 38 94 43 100 53 C86 51 76 47 73 39 Z" fill="var(--fish-fin-soft)" />
        <ellipse className="fish-eye" cx="31" cy="32" rx="2.7" ry="2.1" />
        <path className="fish-gill" d="M43 26 C38 32 38 42 44 48" />
      </g>
    </svg>
  )
}

function SceneFrame({
  id,
  zone,
  children,
}: {
  id: string
  zone: string
  children: React.ReactNode
}) {
  return (
    <section id={id} className={`section scene-${zone} reveal`}>
      <div className="scene-overlay" />
      <div className="scene-world" aria-hidden="true">
        <span className="world-light world-light-a" />
        <span className="world-light world-light-b" />
        <span className="fish fish-a" />
        <span className="fish fish-b" />
        <span className="fish fish-c" />
        <span className="rock rock-left" />
        <span className="rock rock-right" />
        <span className="coral coral-left" />
        <span className="coral coral-right" />
        <span className="ruin ruin-a" />
        <span className="ruin ruin-b" />
        <span className="module-glow module-glow-a" />
        <span className="module-glow module-glow-b" />
        <div className="section-marine-life">
          <span className="surface-wave-detail" />
          <span className="fish fish-right small swim-right surface-minnow minnow-one">
            <FishSvg />
          </span>
          <span className="fish fish-left small swim-left surface-minnow minnow-two">
            <FishSvg />
          </span>
          <span className="fish fish-right small drift-slow surface-minnow minnow-three">
            <FishSvg />
          </span>
          <span className="jellyfish discovery-jelly ambient-jelly hero-jelly-one" />
          <span className="surface-rock surface-rock-left" />
          <span className="surface-rock surface-rock-right" />
          <span className="fish fish-right small school-right shallow-school shallow-school-one">
            <FishSvg />
          </span>
          <span className="fish fish-left small school-left shallow-school shallow-school-two">
            <FishSvg />
          </span>
          <span className="jellyfish discovery-jelly ambient-jelly shallow-jelly-one" />
          <span className="shallow-reef shallow-reef-left" />
          <span className="shallow-reef shallow-reef-right" />
          <span className="fish fish-left medium swim-left mid-fish mid-fish-one">
            <FishSvg />
          </span>
          <span className="fish fish-right medium swim-right mid-fish mid-fish-two">
            <FishSvg />
          </span>
          <span className="fish fish-right medium drift-slow mid-fish mid-fish-three">
            <FishSvg />
          </span>
          <span className="jellyfish discovery-jelly ambient-jelly mid-jelly-one" />
          <span className="mid-wall mid-wall-left" />
          <span className="mid-wall mid-wall-right" />
          <span className="fish fish-right large swim-right deep-fish deep-fish-one">
            <FishSvg />
          </span>
          <span className="fish fish-left large swim-left deep-fish deep-fish-two">
            <FishSvg />
          </span>
          <span className="jellyfish discovery-jelly ambient-jelly deep-jelly-one" />
          <span className="deep-structure deep-structure-one" />
          <span className="deep-structure deep-structure-two" />
          <span className="jellyfish discovery-jelly discovery-jelly-one" />
          <span className="jellyfish discovery-jelly discovery-jelly-two" />
          <span className="bio-flora bio-flora-left" />
          <span className="bio-flora bio-flora-right" />
          <span className="discovery-ruin discovery-ruin-one" />
          <span className="fish fish-right large drift-slow abyss-life abyss-life-one">
            <FishSvg />
          </span>
          <span className="fish fish-left large drift-slow abyss-life abyss-life-two">
            <FishSvg />
          </span>
          <span className="abyss-floor abyss-floor-left" />
          <span className="abyss-floor abyss-floor-right" />
        </div>
      </div>
      <div className="content">{children}</div>
    </section>
  )
}

function SectionIntro({
  eyebrow,
  title,
  subtitle,
  align = 'left',
}: {
  eyebrow: string
  title: string
  subtitle?: string
  align?: 'left' | 'center'
}) {
  return (
    <motion.div
      className={`section-intro reveal-card ${align === 'center' ? 'centered' : ''}`}
      initial={{ opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-120px' }}
      transition={{ duration: 0.75, ease: 'easeOut' }}
    >
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {subtitle && <p className="section-copy">{subtitle}</p>}
    </motion.div>
  )
}

function HeroSection() {
  const hideLanyard = useIsCompactViewport(1024)

  return (
    <SceneFrame id="home" zone="surface">
      <div className="hero-grid hero-interaction">
        <motion.div
          className="hero-copy"
          initial={{ opacity: 0, y: 34 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <p className="eyebrow dot">AI Systems Architect</p>
          <h1>
            SOURAB
            <span>REDDY</span>
          </h1>
          <div className="role-line">
            <span />
            <h3>Full Stack & AI Engineer</h3>
          </div>
          <p className="hero-desc">
            Building intelligent systems, futuristic digital products, and immersive
            AI-powered experiences that push the boundaries of what is possible.
          </p>
          <div className="hero-actions">
            <button className="primary-btn" onClick={() => scrollToSection('#projects')}>
              Explore Projects
              <ArrowRight size={18} />
            </button>
            <a className="ghost-btn" href="/Sourab_Reddy_ATS_Resume.pdf" download>
              Download Resume
              <Download size={18} />
            </a>
          </div>
          <div className="stats-bar hero-stats">
            <Stat icon={Code2} value="24+" label="Technologies mastered" revealDelay={0} />
            <Stat icon={Sparkles} value="3+" label="AI projects built" revealDelay={100} />
            <Stat icon={ShieldCheck} value="4+" label="Certifications earned" revealDelay={200} />
          </div>
        </motion.div>

        <motion.div
          className="profile-system"
          initial={{ opacity: 0, scale: 0.94, x: 36 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.95, delay: 0.15, ease: 'easeOut' }}
        >
          <div
            className="profile-card interactive-profile"
            onPointerMove={handleInteractiveMove}
            onPointerLeave={resetInteractiveMove}
          >
            <div className="profile-header">
              <Brain size={18} />
              <span>AI Engineer</span>
            </div>
            <div className="profile-orbit">
              <div className="portrait-window">
                <img src="/images/profile-pf2.jpeg" alt="Sourab Reddy" />
              </div>
            </div>
            <p className="mobile-role-text">Full Stack & AI Engineer</p>
            <div className="profile-chip chip-ai">
              <Brain size={22} />
              <span>AI Engineer</span>
            </div>
            <div className="profile-chip chip-stack">
              <Code2 size={22} />
              <span>Full Stack</span>
            </div>
            <div className="profile-chip chip-degree">
              <GraduationCap size={22} />
              <span>BCA</span>
            </div>
            <div className="profile-footer">Building the future with AI</div>
          </div>
        </motion.div>

        {!hideLanyard && (
          <div className="hero-lanyard-badge" aria-label="Interactive Sourab Reddy identity badge">
            <Suspense fallback={null}>
              <Lanyard position={[0, 0, 24]} gravity={[0, -40, 0]} fov={22} transparent />
            </Suspense>
          </div>
        )}
      </div>
    </SceneFrame>
  )
}

function Stat({
  icon: Icon,
  value,
  label,
  revealDelay,
}: {
  icon: LucideIcon
  value: string
  label: string
  revealDelay?: number
}) {
  return (
    <div className="stat reveal-card" style={{ '--reveal-delay': `${revealDelay ?? 0}ms` } as React.CSSProperties}>
      <Icon size={24} />
      <strong>{value}</strong>
      <span>{label}</span>
    </div>
  )
}

function JourneySection() {
  return (
    <SceneFrame id="about" zone="shallow">
      <SectionIntro
        eyebrow="02 / Shallow Depths"
        title="MY JOURNEY"
        subtitle="Every milestone is a dive deeper into technology. The path below connects learning, building, and growing into one route."
      />

      <div className="journey-route about-journey-interaction">
        <svg viewBox="0 0 1200 240" preserveAspectRatio="none" aria-hidden="true">
          <path d="M20 132 C160 214 250 22 390 102 S630 180 750 92 S980 88 1180 30" />
        </svg>
        {journeyItems.map((item, index) => {
          const Icon = item.icon
          return (
            <motion.article
              className="journey-node reveal-card"
              key={item.title}
              initial={{ opacity: 0, y: 42 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.65, delay: index * 0.08 }}
              style={{ '--reveal-delay': `${index * 100}ms` } as React.CSSProperties}
            >
              <div className="node-beacon">0{index + 1}</div>
              <div className="glass-card journey-card">
                <Icon size={34} />
                <h3>{item.title}</h3>
                <p>{item.detail}</p>
                <span>
                  <Calendar size={14} />
                  {item.date}
                </span>
              </div>
            </motion.article>
          )
        })}
      </div>

      <div className="stats-bar bottom-stats">
        <Stat icon={Sparkles} value="5+" label="Years of learning" revealDelay={0} />
        <Stat icon={Code2} value="20+" label="Projects built" revealDelay={100} />
        <Stat icon={Award} value="10+" label="Certifications" revealDelay={200} />
        <Stat icon={Rocket} value="Infinity" label="Possibilities ahead" revealDelay={300} />
      </div>
    </SceneFrame>
  )
}

function SkillsLogoLoop() {
  const isCompact = useIsCompactViewport()

  return (
    <motion.div
      className="skills-logo-loop reveal-card"
      initial={{ opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-90px' }}
      transition={{ duration: 0.75 }}
    >
      <div className="skills-logo-loop-header">
        <h3>Tech Stack I Work With</h3>
        <p>Tools and technologies I use to build full-stack and AI-powered systems.</p>
      </div>

      <div className="skills-logo-loop-box">
        <LogoLoop
          logos={techLogos}
          speed={isCompact ? 45 : 70}
          direction="left"
          logoHeight={isCompact ? 30 : 42}
          gap={isCompact ? 28 : 48}
          pauseOnHover={false}
          scaleOnHover={false}
          fadeOut
          fadeOutColor="#001822"
          ariaLabel="Developer technology stack"
        />
      </div>
    </motion.div>
  )
}

function SkillsSection() {
  return (
    <SceneFrame id="skills" zone="mid">
      <div className="skills-heading">
        <SectionIntro
          eyebrow="03 / Mid Ocean"
          title="SKILLS"
          subtitle="A fusion of full-stack development and AI engineering built into underwater systems."
        />
        <div className="system-badge reveal-card float-soft">
          <Brain size={30} />
          <span>Built for scale</span>
          <small>Driven by intelligence</small>
        </div>
      </div>

      <SkillsLogoLoop />

      <div className="skill-grid skills-console-interaction">
        {skillGroups.map((group, index) => {
          const GroupIcon = group.icon
          return (
            <motion.article
              className="skill-console reveal-card float-soft"
              key={group.title}
              initial={{ opacity: 0, y: 44 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.7, delay: index * 0.1 }}
              style={{ '--reveal-delay': `${index * 100}ms` } as React.CSSProperties}
            >
              <div className="console-top" />
              <div className="console-icon">
                <GroupIcon size={32} />
              </div>
              <span className="console-number">0{index + 1}</span>
              <h3>{group.title}</h3>
              <div className="skill-list">
                {group.skills.map((skill) => {
                  const SkillIcon = skill.icon
                  return (
                    <div className="skill-token" key={skill.name}>
                      <SkillIcon size={24} />
                      <span>{skill.name}</span>
                    </div>
                  )
                })}
              </div>
              <div className="console-base" />
            </motion.article>
          )
        })}
      </div>
    </SceneFrame>
  )
}

function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  return (
    <SceneFrame id="projects" zone="deep">
      <div className="projects-layout">
        <div className="projects-copy">
          <SectionIntro
            eyebrow="04 / Deep Ocean"
            title="PROJECTS"
            subtitle="AI-powered systems built like deep-sea research modules, connected by one descending exploration route."
          />
          <div className="mission-card reveal-card">
            <Sparkles size={24} />
            <p>Each project is a step deeper into innovation, engineered with purpose and driven by intelligence.</p>
            <span>Building the future with AI</span>
          </div>
        </div>

        <div className="project-stack project-research-interaction">
          {projects.map((project, index) => {
            const Icon = project.icon
            return (
              <motion.article
                className={`project-module project-ocean-light-card reveal-card float-soft module-${index + 1}`}
                key={project.title}
                onPointerMove={handleOceanLightMove}
                onPointerLeave={handleOceanLightLeave}
                onPointerDown={handleOceanLightClick}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.75, delay: index * 0.1 }}
                style={{ '--reveal-delay': `${index * 100}ms` } as React.CSSProperties}
              >
                <span className="module-node">0{index + 1}</span>
                <div className="module-icon">
                  <Icon size={40} />
                </div>
                <div>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="tech-row">
                    {project.tech.slice(0, 4).map((tech) => (
                      <span key={tech}>{tech}</span>
                    ))}
                  </div>
                  <button className="text-link" onClick={() => setSelectedProject(project)}>
                    View Details
                    <ArrowRight className="view-arrow" size={18} />
                  </button>
                </div>
                <div className={`module-window preview-${index + 1}`} aria-hidden="true">
                  <span className="screen-grid" />
                  <span className="screen-core">
                    <Icon size={34} />
                  </span>
                  <span className="screen-orbit orbit-a" />
                  <span className="screen-orbit orbit-b" />
                  <span className="screen-line line-a" />
                  <span className="screen-line line-b" />
                  <span className="screen-dots" />
                </div>
              </motion.article>
            )
          })}
        </div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="modal-shell"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              className="project-modal"
              initial={{ opacity: 0, y: 36, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.96 }}
              onClick={(event) => event.stopPropagation()}
            >
              <button className="modal-close" onClick={() => setSelectedProject(null)} aria-label="Close project details">
                <X size={22} />
              </button>
              <selectedProject.icon size={44} />
              <h3>{selectedProject.title}</h3>
              <p>{selectedProject.longDescription}</p>
              <div className="feature-list">
                {selectedProject.features.map((feature) => (
                  <span key={feature}>
                    <CheckCircle size={16} />
                    {feature}
                  </span>
                ))}
              </div>
              <div className="modal-actions">
                <a href={selectedProject.demoUrl}>
                  Live Demo
                  <ExternalLink size={18} />
                </a>
                <a href={selectedProject.githubUrl} target="_blank" rel="noreferrer">
                  GitHub
                  <Github size={18} />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </SceneFrame>
  )
}

function AchievementsSection() {
  return (
    <SceneFrame id="achievements" zone="discovery">
      <SectionIntro
        eyebrow="05 / Deep Sea Discovery"
        title="ACHIEVEMENTS"
        subtitle="Landmarks of curiosity, commitment, and creation discovered along the deep-sea path."
      />

      <div className="artifact-grid achievement-badge-interaction">
        {achievements.map((achievement, index) => {
          const Icon = achievement.icon
          return (
            <motion.article
              className="artifact-card"
              key={achievement.title}
              initial={{ opacity: 0, y: 58 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.75, delay: index * 0.1 }}
              style={{ '--lift': `${index % 2 === 0 ? 0 : 36}px` } as React.CSSProperties}
            >
              <div
                className="artifact-capsule achievement-ocean-light-card reveal-card float-soft"
                onPointerMove={handleOceanLightMove}
                onPointerLeave={handleOceanLightLeave}
                onPointerDown={handleOceanLightClick}
                style={{ '--reveal-delay': `${index * 100}ms` } as React.CSSProperties}
              >
                <Icon size={48} />
                <h3>{achievement.title}</h3>
                <span>{achievement.subtitle}</span>
                <p>{achievement.shortDescription}</p>
                <button className="artifact-link" onClick={() => navigateTo(`/achievements/${achievement.slug}`)}>
                  View Details
                  <ArrowRight className="view-arrow" size={16} />
                </button>
                <ShieldCheck size={30} className="artifact-seal" />
              </div>
              <div className="artifact-pedestal" />
            </motion.article>
          )
        })}
      </div>
      <p className="discovery-line">Every milestone. Every depth. Every discovery.</p>
    </SceneFrame>
  )
}

function AchievementGalleryMedia({ media }: { media: AchievementMedia }) {
  if (media.type === 'pdf') {
    return (
      <div
        className="achievement-media-card certificate-preview-card interactive-surface"
        onPointerMove={handleInteractiveMove}
        onPointerLeave={resetInteractiveMove}
      >
        <object className="certificate-preview-frame" data={`${media.src}#toolbar=0&navpanes=0&scrollbar=0`} type="application/pdf">
          <a href={media.src} target="_blank" rel="noreferrer">
            <FileText size={46} />
            <strong>{media.label}</strong>
            <span>Open certificate PDF</span>
          </a>
        </object>
        <div className="certificate-preview-footer">
          <span>
            <FileText size={18} />
            {media.label}
          </span>
          <a href={media.src} target="_blank" rel="noreferrer">
            Open Full Certificate
            <ArrowRight size={16} />
          </a>
        </div>
      </div>
    )
  }

  return (
    <figure
      className="achievement-media-card interactive-surface"
      onPointerMove={handleInteractiveMove}
      onPointerLeave={resetInteractiveMove}
    >
      <img src={media.src} alt={media.alt} style={{ objectPosition: media.objectPosition }} />
      <figcaption>{media.label}</figcaption>
    </figure>
  )
}

function AchievementCard({ achievement }: { achievement: Achievement }) {
  const Icon = achievement.icon

  return (
    <motion.article
      className="achievement-page-card interactive-surface"
      onPointerMove={handleInteractiveMove}
      onPointerLeave={resetInteractiveMove}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6 }}
    >
      <div className="achievement-card-top">
        <div className="achievement-icon">
          <Icon size={30} />
        </div>
        <span className="achievement-badge">{achievement.category}</span>
      </div>
      <h3>{achievement.title}</h3>
      <p>{achievement.shortDescription}</p>
      <div className="achievement-meta-list">
        <span>
          <Calendar size={16} />
          {achievement.date}
        </span>
        <span>
          <MapPin size={16} />
          {achievement.location}
        </span>
        <span>
          <Building2 size={16} />
          {achievement.organization}
        </span>
      </div>
      <button className="text-link achievement-detail-btn" onClick={() => navigateTo(`/achievements/${achievement.slug}`)}>
        View Details
        <ArrowRight size={18} />
      </button>
    </motion.article>
  )
}

function AchievementsIndexPage() {
  return (
    <main className="ocean-site route-page">
      <OceanBackground />
      <DepthPath depth={0.72} />
      <Navbar activeSection="achievements" depth={0.72} routePath="/achievements" />
      <section className="route-section achievements-page">
        <div className="route-shell">
          <div className="route-hero">
            <p className="eyebrow">Achievement Archive</p>
            <h1>Achievements</h1>
            <p>
              A deeper archive of workshops, challenges, and milestones. Each achievement opens into a detailed case study with space for certificates and gallery images.
            </p>
          </div>

          <div className="achievement-page-grid">
            {achievements.map((achievement) => (
              <AchievementCard achievement={achievement} key={achievement.slug} />
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

function DetailSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section
      className="achievement-detail-section interactive-surface"
      onPointerMove={handleInteractiveMove}
      onPointerLeave={resetInteractiveMove}
    >
      <h2>{title}</h2>
      {children}
    </section>
  )
}

function AchievementDetailPage({ achievement }: { achievement?: Achievement }) {
  if (!achievement) {
    return (
      <main className="ocean-site route-page">
        <OceanBackground />
        <Navbar activeSection="achievements" depth={0.78} routePath={window.location.pathname} />
        <section className="route-section achievements-page">
          <div className="route-shell">
            <div className="route-hero">
              <p className="eyebrow">Achievement Not Found</p>
              <h1>Missing Record</h1>
              <p>This achievement page is not available yet.</p>
              <button className="primary-btn" onClick={() => navigateTo('/achievements')}>
                <ArrowRight size={18} />
                Back to Achievements
              </button>
            </div>
          </div>
        </section>
      </main>
    )
  }

  const Icon = achievement.icon

  return (
    <main className="ocean-site route-page">
      <OceanBackground />
      <DepthPath depth={0.82} />
      <Navbar activeSection="achievements" depth={0.82} routePath={`/achievements/${achievement.slug}`} />
      <section className="route-section achievement-detail-page">
        <div className="route-shell">
          <button className="back-link" onClick={() => navigateTo('/achievements')}>
            <ArrowRight size={18} />
            Back to Achievements
          </button>

          <div className="achievement-detail-hero">
            <div>
              <span className="achievement-badge">{achievement.category}</span>
              <h1>{achievement.title}</h1>
              <p>{achievement.overview}</p>
            </div>
            <div className="detail-hero-icon">
              <Icon size={58} />
            </div>
          </div>

          <div className="detail-info-grid">
            <div className="interactive-surface" onPointerMove={handleInteractiveMove} onPointerLeave={resetInteractiveMove}>
              <Calendar size={22} />
              <span>Date</span>
              <strong>{achievement.date}</strong>
            </div>
            <div className="interactive-surface" onPointerMove={handleInteractiveMove} onPointerLeave={resetInteractiveMove}>
              <MapPin size={22} />
              <span>Location</span>
              <strong>{achievement.location}</strong>
            </div>
            <div className="interactive-surface" onPointerMove={handleInteractiveMove} onPointerLeave={resetInteractiveMove}>
              <Building2 size={22} />
              <span>Organization</span>
              <strong>{achievement.organization}</strong>
            </div>
          </div>

          <div className="achievement-case-grid">
            <DetailSection title="Overview">
              <p>{achievement.overview}</p>
            </DetailSection>

            <DetailSection title="What I Learned">
              <ul>
                {achievement.learned.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </DetailSection>

            <DetailSection title="Skills Gained">
              <div className="detail-chip-row">
                {achievement.skillsGained.map((skill) => (
                  <span key={skill}>{skill}</span>
                ))}
              </div>
            </DetailSection>

            <DetailSection title="Tools / Technologies">
              <div className="detail-chip-row">
                {achievement.tools.map((tool) => (
                  <span key={tool}>{tool}</span>
                ))}
              </div>
            </DetailSection>

            <DetailSection title="Key Takeaways">
              <ul>
                {achievement.takeaways.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </DetailSection>
          </div>

          <section className="achievement-gallery-section">
            <h2>Gallery / Certificate</h2>
            <div className="placeholder-grid">
              {achievement.media.map((media) => (
                <AchievementGalleryMedia media={media} key={media.src} />
              ))}
              {achievement.placeholders.map((placeholder) => (
                <div
                  className="image-placeholder interactive-surface"
                  key={placeholder}
                  onPointerMove={handleInteractiveMove}
                  onPointerLeave={resetInteractiveMove}
                >
                  <ImageIcon size={36} />
                  <span>{placeholder}</span>
                </div>
              ))}
            </div>
          </section>

          <button className="primary-btn detail-bottom-btn" onClick={() => navigateTo('/achievements')}>
            <ArrowRight size={18} />
            Back to Achievements
          </button>
        </div>
      </section>
    </main>
  )
}

function ContactSection() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((current) => ({ ...current, [event.target.name]: event.target.value }))
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitted(true)
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({ name: '', email: '', subject: '', message: '' })
    }, 2600)
  }

  return (
    <SceneFrame id="contact" zone="abyss">
      <div className="contact-grid contact-sonar-interaction">
        <div className="contact-copy">
          <SectionIntro
            eyebrow="06 / Abyss Base"
            title="CONTACT ME"
            subtitle="Final depth. Real connection. Have a project in mind, want to collaborate, or just want to say hello?"
          />

          <div className="channel-panel reveal-card">
            <h3>Communication Channels</h3>
            {contactLinks.map((link, index) => {
              const Icon = link.icon
              return (
                <a
                  className="reveal-card"
                  href={link.href}
                  key={link.label}
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  rel="noreferrer"
                  style={{ '--reveal-delay': `${index * 100}ms` } as React.CSSProperties}
                >
                  <Icon size={24} />
                  <span>
                    <strong>{link.label}</strong>
                    {link.value}
                  </span>
                  <ArrowRight size={18} />
                </a>
              )
            })}
            <div className="status-pill">Status: Available for new opportunities</div>
          </div>
        </div>

        <motion.form
          className="contact-form reveal-card float-soft"
          onSubmit={handleSubmit}
          initial={{ opacity: 0, x: 42 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.75 }}
          style={{ '--reveal-delay': '300ms' } as React.CSSProperties}
        >
          <div className="form-icon">
            <Mail size={24} />
          </div>
          <h3>Send a Message</h3>
          {isSubmitted ? (
            <div className="success-state">
              <CheckCircle size={60} />
              <strong>Message Sent Successfully</strong>
              <p>Thank you for reaching out. I will get back to you soon.</p>
            </div>
          ) : (
            <>
              <div className="form-row">
                <label>
                  Your Name
                  <span>
                    <User size={18} />
                    <input name="name" value={formData.name} onChange={handleChange} placeholder="Enter your name" required />
                  </span>
                </label>
                <label>
                  Your Email
                  <span>
                    <Mail size={18} />
                    <input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Enter your email" required />
                  </span>
                </label>
              </div>
              <label>
                Subject
                <span>
                  <TerminalSquare size={18} />
                  <input name="subject" value={formData.subject} onChange={handleChange} placeholder="What is this about?" required />
                </span>
              </label>
              <label>
                Message
                <span className="textarea-wrap">
                  <Send size={18} />
                  <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Write your message here..." required />
                </span>
              </label>
              <button className="primary-btn full" type="submit">
                <Send size={18} />
                Send Message
              </button>
              <p className="secure-note">
                <ShieldCheck size={15} />
                Your message is secure. I will get back to you soon.
              </p>
            </>
          )}
          <AnimatePresence>
            {isSubmitted && (
              <motion.div
                className="contact-toast"
                initial={{ opacity: 0, y: 16, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 12, scale: 0.96 }}
              >
                <CheckCircle size={18} />
                Message queued locally
              </motion.div>
            )}
          </AnimatePresence>
        </motion.form>
      </div>
    </SceneFrame>
  )
}

function FooterSection() {
  return (
    <footer className="site-footer footer-calm-interaction">
      <div className="footer-wave" aria-hidden="true" />
      <div className="footer-shell">
        <button className="footer-brand" onClick={() => scrollToSection('#home')} aria-label="Back to home">
          <span className="brand-mark">
            <img src="/images/logo.png" alt="" />
          </span>
          <span>Sourab Reddy</span>
        </button>
        <div className="footer-links">
          {navItems.slice(1).map((item) => (
            <button
              key={item.href}
              onClick={() => {
                if (item.href === '#achievements') {
                  navigateTo('/achievements')
                  return
                }
                scrollToSection(item.href)
              }}
            >
              {item.name}
            </button>
          ))}
        </div>
        <div className="footer-socials">
          <a href="mailto:sourabreddimalla@gmail.com" aria-label="Email Sourab Reddy">
            <Mail size={18} />
          </a>
          <a href="https://github.com/SOURABREDDY394" target="_blank" rel="noreferrer" aria-label="GitHub">
            <Github size={18} />
          </a>
          <a href="https://linkedin.com/in/sourab-reddy-9b0582330" target="_blank" rel="noreferrer" aria-label="LinkedIn">
            <Linkedin size={18} />
          </a>
        </div>
      </div>
    </footer>
  )
}

export default function App() {
  const { depth, activeSection } = useDepthProgress()
  const routePath = useRoutePath()
  useMobileScrollReveal(routePath)

  useEffect(() => {
    let lastHash = ''

    const scrollToHash = () => {
      if (!window.location.hash) return
      lastHash = window.location.hash
      const alignToHash = () => scrollToSection(lastHash, 'auto')
      window.requestAnimationFrame(alignToHash)
      window.setTimeout(alignToHash, 120)
      window.setTimeout(alignToHash, 420)
      window.setTimeout(alignToHash, 850)
    }

    const syncHash = () => {
      if (!window.location.hash || window.location.hash === lastHash) return
      scrollToHash()
    }

    scrollToHash()
    window.addEventListener('hashchange', scrollToHash)
    window.addEventListener('popstate', scrollToHash)
    const hashSyncInterval = window.setInterval(syncHash, 250)

    return () => {
      window.removeEventListener('hashchange', scrollToHash)
      window.removeEventListener('popstate', scrollToHash)
      window.clearInterval(hashSyncInterval)
    }
  }, [])

  if (routePath === '/achievements') {
    return <AchievementsIndexPage />
  }

  if (routePath.startsWith('/achievements/')) {
    const slug = routePath.split('/').filter(Boolean)[1]
    const achievement = achievements.find((item) => item.slug === slug)
    return <AchievementDetailPage achievement={achievement} />
  }

  return (
    <main className="ocean-site">
      <OceanBackground />
      <DepthPath depth={depth} />
      <Navbar activeSection={activeSection} depth={depth} routePath={routePath} />
      <HeroSection />
      <JourneySection />
      <SkillsSection />
      <ProjectsSection />
      <AchievementsSection />
      <ContactSection />
      <FooterSection />
    </main>
  )
}
