import { Link, useLocation } from 'react-router-dom'
import { motion } from 'motion/react'

import { PROFILE } from '../content/site'
import { useSite, type ViewMode } from '../site/context'
import { RotatingBadge } from './RotatingBadge'
import { SoundToggle } from './SoundToggle'

const VIEWS: Array<{ id: ViewMode; label: string; hint: string }> = [
  { id: 'spiral', label: '螺旋', hint: '把四件作品摆成一条可拖动的螺旋' },
  { id: 'index', label: '索引', hint: '把四件作品排成可扫读的文字索引' },
]

/** 固定 chrome：左上身份、顶部视图切换、右上菜单、左下徽章、右下声音。 */
export function SiteChrome() {
  const { view, setView, setMenuOpen, menuOpen, entered } = useSite()
  const { pathname } = useLocation()
  const onHome = pathname === '/'

  return (
    <>
      <header className="chrome" data-ready={entered} data-menu-open={menuOpen}>
        <div className="chrome__bar">
          <Link to="/" className="chrome__brand">
            <span className="chrome__brand-cn">{PROFILE.name}</span>
            <span className="chrome__brand-tag label">{PROFILE.role}</span>
          </Link>

          <div className="chrome__center">
            {onHome ? (
              <div className="switch" role="group" aria-label="视图切换">
                {VIEWS.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    className="switch__btn"
                    aria-pressed={view === item.id}
                    title={item.hint}
                    onClick={() => setView(item.id)}
                  >
                    {view === item.id && (
                      <motion.span
                        className="switch__pill"
                        layoutId="view-pill"
                        transition={{ type: 'spring', stiffness: 420, damping: 36 }}
                      />
                    )}
                    <span className="switch__label">{item.label}</span>
                  </button>
                ))}
              </div>
            ) : (
              <Link to="/" className="chrome__back">
                <span aria-hidden="true">←</span> 全部作品
              </Link>
            )}
          </div>

          <button
            type="button"
            className="chrome__menu"
            aria-expanded={menuOpen}
            aria-haspopup="dialog"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span className="chrome__menu-dot" aria-hidden="true" />
            菜单
          </button>
        </div>
      </header>

      {onHome && entered && <RotatingBadge />}
      <SoundToggle />
    </>
  )
}
