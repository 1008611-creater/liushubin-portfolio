/**
 * 入场声音。
 *
 * 全部由 WebAudio 现场合成，不引入任何音频文件，因此不涉及素材授权。
 * 默认静音：只有用户在入场门主动选择「带声音进入」，才允许创建 AudioContext。
 */

const VOICES = [55, 82.41, 110, 164.81, 220] as const
const LEVEL = 0.062

type AudioCtor = typeof AudioContext

let ctx: AudioContext | null = null
let master: GainNode | null = null
let extra: Array<OscillatorNode | AudioBufferSourceNode> = []

function getCtor(): AudioCtor | null {
  if (typeof window === 'undefined') return null
  const w = window as unknown as { AudioContext?: AudioCtor; webkitAudioContext?: AudioCtor }
  return w.AudioContext ?? w.webkitAudioContext ?? null
}

function build(): void {
  const Ctor = getCtor()
  if (!Ctor || ctx) return

  ctx = new Ctor()
  master = ctx.createGain()
  master.gain.value = 0
  master.connect(ctx.destination)

  const filter = ctx.createBiquadFilter()
  filter.type = 'lowpass'
  filter.frequency.value = 520
  filter.Q.value = 0.7
  filter.connect(master)

  VOICES.forEach((hz, i) => {
    if (!ctx || !filter) return
    const osc = ctx.createOscillator()
    osc.type = i < 3 ? 'sine' : 'triangle'
    osc.frequency.value = hz
    osc.detune.value = i % 2 === 0 ? -5 : 6

    const gain = ctx.createGain()
    gain.gain.value = 0.34 / (i + 1.35)

    osc.connect(gain)
    gain.connect(filter)
    osc.start()
    extra.push(osc)
  })

  // 极慢的滤波扫动，让长音不显呆板
  if (!ctx || !filter) return
  const sweep = ctx.createOscillator()
  sweep.type = 'sine'
  sweep.frequency.value = 0.055
  const sweepDepth = ctx.createGain()
  sweepDepth.gain.value = 190
  sweep.connect(sweepDepth)
  sweepDepth.connect(filter.frequency)
  sweep.start()
  extra.push(sweep)
}

export function startAmbient(): void {
  build()
  if (!ctx || !master) return
  void ctx.resume()
  const now = ctx.currentTime
  master.gain.cancelScheduledValues(now)
  master.gain.setValueAtTime(master.gain.value, now)
  master.gain.linearRampToValueAtTime(LEVEL, now + 3.4)
}

export function stopAmbient(): void {
  if (!ctx || !master) return
  const now = ctx.currentTime
  master.gain.cancelScheduledValues(now)
  master.gain.setValueAtTime(master.gain.value, now)
  master.gain.linearRampToValueAtTime(0, now + 1.1)
}

/** 页面卸载时释放，避免后台标签页继续占用音频通道。 */
export function disposeAmbient(): void {
  extra.forEach((node) => {
    try {
      node.stop()
    } catch {
      /* 已停止的节点再次 stop 会抛错，忽略即可 */
    }
    node.disconnect()
  })
  extra = []
  master?.disconnect()
  master = null
  const closing = ctx
  ctx = null
  void closing?.close()
}
