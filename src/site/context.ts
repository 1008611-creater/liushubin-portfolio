import { createContext, useContext } from 'react'

export type ViewMode = 'spiral' | 'index'

export type SiteState = {
  /** 是否已经通过入场门。未通过时内容不可交互。 */
  entered: boolean
  enter: (withSound: boolean) => void
  soundOn: boolean
  toggleSound: () => void
  view: ViewMode
  setView: (view: ViewMode) => void
  menuOpen: boolean
  setMenuOpen: (open: boolean) => void
  reducedMotion: boolean
  finePointer: boolean
}

export const SiteContext = createContext<SiteState | null>(null)

export function useSite(): SiteState {
  const value = useContext(SiteContext)
  if (!value) throw new Error('useSite 必须在 SiteProvider 内使用')
  return value
}
