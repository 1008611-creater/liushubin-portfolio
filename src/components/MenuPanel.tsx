import { useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'motion/react'

import { PROFILE, PROJECTS } from '../content/site'
import { useSite } from '../site/context'

const EXPO_OUT = [0.16, 1, 0.3, 1] as const

const PAGES = [
  { to: '/', label: '首页', hint: 'Index' },
  { to: '/resume', label: '简历', hint: 'Resume' },
  { to: '/about', label: '关于', hint: 'About' },
  { to: '/contact', label: '联系', hint: 'Contact' },
] as const

/** 右上角胶囊展开成整屏浅色面板。点击链接、按 Esc 或触发路由变化都会关闭。 */
export function MenuPanel() {
  const { reducedMotion, setMenuOpen } = useSite()
  const closeRef = useRef<HTMLButtonElement>(null)
  const location = useLocation()
  const dur = reducedMotion ? 0 : 0.62

  useEffect(() => {
    closeRef.current?.focus()
  }, [])

  // 只在路径真的变化时关闭。若写成普通 effect，挂载那一次就会立刻把菜单关掉。
  const openedAt = useRef(location.pathname)
  useEffect(() => {
    if (location.pathname !== openedAt.current) setMenuOpen(false)
  }, [location.pathname, setMenuOpen])

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [setMenuOpen])

  return (
    <motion.div
      className="menu"
      role="dialog"
      aria-modal="true"
      aria-label="站点导航"
      data-menu="open"
      initial={{ opacity: 0, scale: 0.12, borderRadius: 999 }}
      animate={{ opacity: 1, scale: 1, borderRadius: 0 }}
      exit={{ opacity: 0, scale: 0.12, borderRadius: 999 }}
      transition={{ duration: dur, ease: EXPO_OUT }}
      style={{ transformOrigin: 'calc(100% - 46px) 34px' }}
    >
      <div className="menu__inner shell">
        <header className="menu__top">
          <Link to="/" className="menu__brand">
            <span className="menu__brand-cn">{PROFILE.name}</span>
            <span className="label menu__brand-en">{PROFILE.nameEn}</span>
          </Link>
          <button
            ref={closeRef}
            type="button"
            className="menu__close"
            onClick={() => setMenuOpen(false)}
          >
            关闭 <span aria-hidden="true">✕</span>
          </button>
        </header>

        <div className="menu__body">
          <nav className="menu__col menu__col--pages" aria-label="页面">
            <p className="label menu__col-title">页面</p>
            <ul>
              {PAGES.map((page, i) => (
                <motion.li
                  key={page.to}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: dur ? 0.5 : 0, ease: EXPO_OUT, delay: dur ? 0.16 + i * 0.05 : 0 }}
                >
                  <Link to={page.to} className="menu__page">
                    <span className="menu__page-cn">{page.label}</span>
                    <span className="menu__page-en">{page.hint}</span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </nav>

          <nav className="menu__col menu__col--work" aria-label="作品">
            <p className="label menu__col-title">作品 04</p>
            <ul>
              {PROJECTS.map((project, i) => (
                <motion.li
                  key={project.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: dur ? 0.5 : 0, ease: EXPO_OUT, delay: dur ? 0.2 + i * 0.05 : 0 }}
                >
                  <Link to={`/work/${project.slug}`} className="menu__project">
                    <span className="label menu__project-index">{project.index}</span>
                    <span className="menu__project-main">
                      <span className="menu__project-cn">{project.title}</span>
                      <span className="menu__project-en serif-em">{project.titleEn}</span>
                    </span>
                    <span className="label menu__project-kicker">{project.kicker}</span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </nav>
        </div>

        <footer className="menu__foot">
          <a className="menu__foot-link" href={`mailto:${PROFILE.email}`}>
            {PROFILE.email}
          </a>
          <a className="menu__foot-link" href={PROFILE.github} target="_blank" rel="noreferrer">
            GitHub / {PROFILE.githubHandle}
          </a>
          <span className="label">{PROFILE.available}</span>
        </footer>
      </div>
    </motion.div>
  )
}
