import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'

import { disposeAmbient, startAmbient, stopAmbient } from '../lib/ambient'
import { useFinePointer, useReducedMotion } from '../hooks/useReducedMotion'
import { SiteContext, type SiteState, type ViewMode } from './context'

export function SiteProvider({ children }: { children: ReactNode }) {
  const reducedMotion = useReducedMotion()
  const finePointer = useFinePointer()
  const [entered, setEntered] = useState(false)
  const [soundOn, setSoundOn] = useState(false)
  const [view, setView] = useState<ViewMode>('spiral')
  const [menuOpen, setMenuOpen] = useState(false)

  const enter = useCallback((withSound: boolean) => {
    setEntered(true)
    if (withSound) setSoundOn(true)
  }, [])

  const toggleSound = useCallback(() => setSoundOn((on) => !on), [])

  useEffect(() => {
    if (soundOn) startAmbient()
    else stopAmbient()
  }, [soundOn])

  useEffect(() => disposeAmbient, [])

  // 入场门与菜单展开时锁住底层滚动，避免背景跟着动
  useEffect(() => {
    const locked = !entered || menuOpen
    document.documentElement.dataset.scroll = locked ? 'locked' : 'free'
    return () => {
      document.documentElement.dataset.scroll = 'free'
    }
  }, [entered, menuOpen])

  const value = useMemo<SiteState>(
    () => ({
      entered,
      enter,
      soundOn,
      toggleSound,
      view,
      setView,
      menuOpen,
      setMenuOpen,
      reducedMotion,
      finePointer,
    }),
    [entered, enter, soundOn, toggleSound, view, menuOpen, reducedMotion, finePointer],
  )

  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>
}
