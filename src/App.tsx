import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'motion/react'

import { Cursor } from './components/Cursor'
import { EntryGate } from './components/EntryGate'
import { GridOverlay } from './components/GridOverlay'
import { MenuPanel } from './components/MenuPanel'
import { SiteChrome } from './components/SiteChrome'
import { About } from './pages/About'
import { Contact } from './pages/Contact'
import { Home } from './pages/Home'
import { NotFound } from './pages/NotFound'
import { ProjectDetail } from './pages/ProjectDetail'
import { Resume } from './pages/Resume'
import { useSite } from './site/context'

/** 换页时回到顶部。SPA 不做这一步，进详情页会停在上一页的滚动位置。 */
function ScrollReset() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [pathname])
  return null
}

export default function App() {
  const { entered, enter, menuOpen } = useSite()
  const location = useLocation()

  /*
   * 简历页和作品详情页是可以被单独分享的链接，不该要求访客先过入场门：
   * 招聘方点开一个链接却先看到全屏问句，是纯粹的流失点。
   * 只有首页保留入场门，其余路由直接落到内容。
   */
  const skipGate = location.pathname !== '/'
  const showContent = entered || skipGate

  useEffect(() => {
    if (skipGate && !entered) enter(false)
  }, [skipGate, entered, enter])

  return (
    <>
      <a className="skip-link" href="#main">
        跳到主要内容
      </a>

      <GridOverlay />
      <ScrollReset />

      <div className="site" data-entered={showContent}>
        <AnimatePresence mode="wait" initial={false}>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/work/:slug" element={<ProjectDetail />} />
            <Route path="/resume" element={<Resume />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/not-found" element={<NotFound />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </div>

      {showContent && <SiteChrome />}

      <AnimatePresence>{menuOpen && <MenuPanel />}</AnimatePresence>
      <AnimatePresence>{!showContent && <EntryGate />}</AnimatePresence>
      <Cursor />
    </>
  )
}
