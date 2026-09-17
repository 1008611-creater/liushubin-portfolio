import { AnimatePresence, motion } from 'motion/react'

import { IndexList } from '../components/IndexList'
import { SpiralGallery } from '../components/SpiralGallery'
import { PROJECTS, PROFILE } from '../content/site'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { useSite } from '../site/context'

const EXPO_OUT = [0.16, 1, 0.3, 1] as const

export function Home() {
  const { view, reducedMotion, entered } = useSite()
  useDocumentTitle('')
  const dur = reducedMotion ? 0 : 0.5

  return (
    <main className="home" id="main">
      <h1 className="sr-only">
        {PROFILE.name} 作品集 · {PROFILE.role}
      </h1>

      <div className="home__stage" data-entered={entered}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={view}
            className="home__view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: dur, ease: EXPO_OUT }}
          >
            {view === 'spiral' ? (
              <SpiralGallery projects={PROJECTS} />
            ) : (
              <IndexList projects={PROJECTS} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </main>
  )
}
