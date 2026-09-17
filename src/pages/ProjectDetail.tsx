import { Link, Navigate, useParams } from 'react-router-dom'
import { motion } from 'motion/react'

import { getNeighbours, getProject } from '../content/site'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { useSite } from '../site/context'

const EXPO_OUT = [0.16, 1, 0.3, 1] as const

export function ProjectDetail() {
  const { slug = '' } = useParams()
  const project = getProject(slug)
  const { reducedMotion } = useSite()
  useDocumentTitle(project ? project.title : '未找到')
  const dur = reducedMotion ? 0 : 0.6

  if (!project) return <Navigate to="/not-found" replace />

  const { prev, next } = getNeighbours(project.slug)
  const rise = (delay: number) => ({
    initial: { opacity: 0, y: reducedMotion ? 0 : 22 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-12% 0px -12% 0px' },
    transition: { duration: dur, ease: EXPO_OUT, delay: dur ? delay : 0 },
  })

  return (
    <main className="detail" id="main">
      <article>
        <header className="detail__head shell">
          <motion.div className="detail__crumbs" {...rise(0)}>
            <Link to="/" className="label detail__crumb">
              全部作品
            </Link>
            <span className="label detail__crumb-sep" aria-hidden="true">
              /
            </span>
            <span className="label">{project.index}</span>
          </motion.div>

          <motion.p className="label detail__kicker" {...rise(0.04)}>
            {project.kicker} · {project.period}
          </motion.p>

          <motion.h1 className="detail__title" {...rise(0.08)}>
            {project.title}
            <span className="detail__title-en serif-em">{project.titleEn}</span>
          </motion.h1>

          <motion.p className="detail__lead" {...rise(0.12)}>
            {project.lead}
          </motion.p>
        </header>

        <motion.figure className="detail__hero shell" {...rise(0.05)}>
          <img
            src={project.media[0].src}
            alt={project.media[0].caption}
            fetchPriority="high"
            decoding="async"
          />
          <figcaption className="label">{project.media[0].caption}</figcaption>
        </motion.figure>

        <section className="detail__facts shell" aria-label="项目事实">
          <dl className="detail__fact-grid">
            {project.facts.map((fact, i) => (
              <motion.div className="detail__fact" key={fact.label} {...rise(0.04 * i)}>
                <dt className="label">{fact.label}</dt>
                <dd>{fact.value}</dd>
              </motion.div>
            ))}
          </dl>
        </section>

        <section className="detail__method shell" aria-label="推进方式">
          <motion.h2 className="section-head" {...rise(0)}>
            <span className="label section-head__tag">推进方式</span>
            <span className="section-head__line">
              先决定<span className="mark">什么不变</span>，再决定页面怎么长
            </span>
          </motion.h2>

          <ol className="detail__steps">
            {project.method.map((item, i) => (
              <motion.li className="detail__step" key={item.heading} {...rise(0.05 * i)}>
                <span className="label detail__step-num">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="detail__step-title">{item.heading}</h3>
                <p className="detail__step-body">{item.body}</p>
              </motion.li>
            ))}
          </ol>
        </section>

        {project.media.length > 1 && (
          <section className="detail__gallery shell" aria-label="项目画面">
            {project.media.slice(1).map((item, i) => (
              <motion.figure
                className="detail__shot"
                key={item.src}
                data-wide={i % 3 === 0 ? 'true' : 'false'}
                {...rise(0.03)}
              >
                <img src={item.src} alt={item.caption} loading="lazy" decoding="async" />
                <figcaption className="label">{item.caption}</figcaption>
              </motion.figure>
            ))}
          </section>
        )}

        <section className="detail__stack shell" aria-label="使用到的工具与语言">
          <motion.h2 className="label section-head__tag" {...rise(0)}>
            用到的
          </motion.h2>
          <ul className="detail__tags">
            {project.stack.map((tag) => (
              <motion.li className="detail__tag" key={tag} {...rise(0.03)}>
                {tag}
              </motion.li>
            ))}
          </ul>
          <p className="detail__role label">
            {project.role} · {project.summary}
          </p>
        </section>

        <nav className="detail__nav shell" aria-label="相邻项目">
          <Link className="detail__nav-item" to={`/work/${prev.slug}`}>
            <span className="label">
              <span aria-hidden="true">←</span> 上一个
            </span>
            <span className="detail__nav-title">{prev.title}</span>
          </Link>
          <Link className="detail__nav-item detail__nav-item--next" to={`/work/${next.slug}`}>
            <span className="label">
              下一个 <span aria-hidden="true">→</span>
            </span>
            <span className="detail__nav-title">{next.title}</span>
          </Link>
        </nav>
      </article>
    </main>
  )
}
