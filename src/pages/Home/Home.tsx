import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion, useScroll, useTransform, type Variants } from 'framer-motion';
import { site } from '../../config/site';
import Button from '../../components/ui/Button';
import Embers from '../../components/Embers/Embers';
import Stats from '../../components/Stats/Stats';
import HomeEventAlert from '../../components/HomeEventAlert/HomeEventAlert';
import HomeFeatures from '../../components/HomeFeatures/HomeFeatures';
import HomeClasses from '../../components/HomeClasses/HomeClasses';
import HomeNews from '../../components/HomeNews/HomeNews';
import HomeCTA from '../../components/HomeCTA/HomeCTA';
import ui from '../../components/ui/ui.module.css';
import styles from './Home.module.css';

interface GalleryCard {
  id: string;
  src: string;
  title: string;
  category: string;
  description: string;
}

// Exactly 3 cards as requested
const galleryData: GalleryCard[] = [
  {
    id: 'siege',
    src: 'kal 1.jpg',
    title: 'Ashen Keep Siege',
    category: 'Guild Warfare',
    description: 'Catapult barrages, battering rams, and massive 100v100 guild territorial warfare fighting for citadel taxes.',
  },
  {
    id: 'boss',
    src: 'kal 2.jpg',
    title: 'Gravemaw World Raid',
    category: 'World Bosses',
    description: 'Server-wide midnight gatherings combating colossal mythical beasts for legendary equipment chests.',
  },
  {
    id: 'pvp',
    src: 'kal 3.jpg',
    title: 'Contested Zone Skirmishes',
    category: 'Open PvP',
    description: 'Flag up in neutral wilderness for bonus honor rewards and lethal high-stakes rival champion duels.',
  },
];

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15, delayChildren: 0.3 } },
};

const riseVariant: Variants = {
  hidden: { opacity: 0, y: 35, filter: 'blur(6px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
};

export default function Home() {
  const heroRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const [activeImage, setActiveImage] = useState<GalleryCard | null>(null);

  // Automatic slider state: 1 card displayed at a time, other 2 scrolling automatically
  const [slideIndex, setSlideIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-scroll loop every 3.8s across the 3 cards
  useEffect(() => {
    if (isPaused || reduceMotion) return;
    const interval = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % galleryData.length);
    }, 3800);
    return () => clearInterval(interval);
  }, [isPaused, reduceMotion]);

  const nextSlide = () => setSlideIndex((prev) => (prev + 1) % galleryData.length);
  const prevSlide = () => setSlideIndex((prev) => (prev - 1 + galleryData.length) % galleryData.length);

  // Parallax scroll effects on Hero
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const videoY = useTransform(scrollYProgress, [0, 1], ['0%', reduceMotion ? '0%' : '20%']);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', reduceMotion ? '0%' : '-10%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <>
      {/* =========================================================================
          1. TOP HERO SECTION WITH CINEMATIC ATMOSPHERIC BACKGROUND
          ========================================================================= */}
      <section id="home" ref={heroRef} className={styles.heroSection}>
        <motion.div className={styles.videoWrap} style={{ y: videoY }}>
          {!videoFailed && (
            <video 
              className={`${styles.videoBg} ${videoLoaded ? styles.videoOn : ''}`}
              src={site.heroVideo}
              poster={site.heroPoster || undefined}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              onCanPlay={() => setVideoLoaded(true)}
              onError={() => setVideoFailed(true)}
            />
          )}
        </motion.div>

        {/* Cinematic dark fantasy gradient overlays */}
        <div className={styles.videoTint} />
        <div className={styles.videoVignette} />
        <div className={styles.videoFade} />
        <Embers />

        {/* Hero Content */}
        <motion.div className={styles.heroContent} style={{ y: contentY, opacity: contentOpacity }}>
          <motion.div variants={containerVariants} initial="hidden" animate="show" className={styles.heroStack}>
            <motion.div variants={riseVariant} className={styles.statusPill}>
              <span className={styles.pulseDot} />
              <span>Realm Online • Over 1,200 Warriors in Battle</span>
            </motion.div>

            <motion.h1 variants={riseVariant} className={styles.heroTitle}>
              <span className={styles.titleGlow}>{site.name}</span>
            </motion.h1>

            <motion.span variants={riseVariant} className={styles.heroRule} aria-hidden="true" />

            <motion.p variants={riseVariant} className={styles.heroTagline}>{site.tagline}</motion.p>
            <motion.p variants={riseVariant} className={styles.heroDesc}>{site.description}</motion.p>

            <motion.div variants={riseVariant} className={styles.heroActions}>
              <Button to="/download">Download Client</Button>
              <Button to="/register" variant="ghost">Play Now</Button>
            </motion.div>

            <motion.div variants={riseVariant} className={styles.heroHighlights}>
              <span className={styles.highlightItem}>⚔️ Open PvP & Castle Sieges</span>
              <span className={styles.highlightDot}>•</span>
              <span className={styles.highlightItem}>🛡️ Active Anti-Cheat</span>
              <span className={styles.highlightDot}>•</span>
              <span className={styles.highlightItem}>⚡ Balanced Progressive Economy</span>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Scroll down indicator to Gallery section */}
        <a href="#gallery" className={styles.scrollIndicator} aria-label="Scroll to Gallery">
          <motion.span
            className={styles.scrollDot}
            animate={reduceMotion ? undefined : { y: [0, 14, 0], opacity: [1, 0.2, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </a>
      </section>

      {/* =========================================================================
          2. GALLERY SECTION:
             - 1. Full-width dedicated video section for "Castle War" with dark fantasy border
             - 2. 3 Cards Carousel (1 card full width, other 2 scrolling automatically)
          ========================================================================= */}
      <section id="gallery" className={styles.imagesSection}>
        <div className={ui.container}>
          <div className={styles.imagesHead}>
            <motion.p
              className={styles.imagesKicker}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              CHRONICLES OF THE REALM
            </motion.p>
            <motion.h2
              className={`${styles.imagesTitle} ${ui.goldText}`}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              Warfare & Realm Gallery
            </motion.h2>
            <motion.p
              className={styles.imagesSubtitle}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Experience the pinnacle of guild combat and explore screenshots from contested zones across Kal Online.
            </motion.p>
          </div>

          {/* 1. DEDICATED FULL-WIDTH "CASTLE WAR" VIDEO SECTION WITH DARK FANTASY BORDER */}
          <motion.div
            className={styles.castleWarSection}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className={styles.castleWarHeader}>
              <div className={styles.warBadge}>
                <span className={styles.pulseDot} />
                CASTLE WAR • CITADEL CONQUEST
              </div>
              <h3 className={`${styles.castleWarTitle} ${ui.goldText}`}>
                The Siege of Ashen Keep
              </h3>
              <p className={styles.castleWarSubtitle}>
                Every Saturday at 17:00 UTC — Over 200 warriors clash for territorial tax rights, citadel ownership, and realm glory.
              </p>
            </div>

            <div className={styles.castleWarVideoFrame}>
              <div className={styles.frameCornerTL} />
              <div className={styles.frameCornerTR} />
              <div className={styles.frameCornerBL} />
              <div className={styles.frameCornerBR} />

              <video
                className={styles.castleWarVideo}
                src="video.mp4"
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                controls
              />

              <div className={styles.castleWarVideoOverlay}>
                <div className={styles.liveSiegeTag}>
                  <span className={styles.siegeIcon}>⚔️</span>
                  <span>Live Castle Siege Gameplay • Contested Citadel Gates</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* 2. 3 CARDS CAROUSEL: 1 CARD VISIBLE AT A TIME + 2 AUTO SCROLLING SMOOTHLY */}
          <div
            className={styles.carouselSection}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className={styles.carouselSectionHead}>
              <div>
                <h3>Battlefield Chronicles</h3>
                <p>Auto-scrolling showcase — displaying 1 card at a time with smooth automatic transitions.</p>
              </div>
              <div className={styles.carouselNav}>
                <button
                  type="button"
                  className={styles.carouselNavBtn}
                  onClick={prevSlide}
                  aria-label="Previous card"
                >
                  &#8592;
                </button>
                <button
                  type="button"
                  className={styles.carouselNavBtn}
                  onClick={nextSlide}
                  aria-label="Next card"
                >
                  &#8594;
                </button>
              </div>
            </div>

            {/* Slider Viewport: Shows exactly 1 card across the width */}
            <div className={styles.carouselViewport}>
              <div
                className={styles.carouselTrack}
                style={{
                  transform: `translateX(-${slideIndex * 100}%)`,
                }}
              >
                {galleryData.map((item, idx) => (
                  <div
                    key={item.id}
                    className={styles.carouselCard}
                    onClick={() => setActiveImage(item)}
                  >
                    <span className={styles.counterBadge}>
                      0{idx + 1} / 0{galleryData.length}
                    </span>
                    <img src={item.src} alt={item.title} className={styles.cardMedia} loading="lazy" />
                    <div className={styles.imageOverlay}>
                      <span className={styles.imageBadge}>{item.category}</span>
                      <h4 className={styles.imageTitle}>{item.title}</h4>
                      <p className={styles.cardDesc}>{item.description}</p>
                      <span className={styles.imagePrompt}>Click to enlarge image &rarr;</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 3 Interactive Tabs below the card showing the 3 items */}
            <div className={styles.sliderTabs}>
              {galleryData.map((item, idx) => {
                const isActive = slideIndex === idx;
                return (
                  <button
                    key={item.id}
                    type="button"
                    className={`${styles.tabItem} ${isActive ? styles.activeTabItem : ''}`}
                    onClick={() => setSlideIndex(idx)}
                  >
                    <span className={styles.tabNumber}>0{idx + 1}</span>
                    <div className={styles.tabInfo}>
                      <span className={styles.tabCategory}>{item.category}</span>
                      <strong className={styles.tabTitle}>{item.title}</strong>
                    </div>
                    {isActive && <div className={styles.tabProgress} />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Lightbox Preview */}
        <AnimatePresence>
          {activeImage && (
            <div className={styles.lightbox} onClick={() => setActiveImage(null)}>
              <motion.div
                className={styles.lightboxContent}
                onClick={(e) => e.stopPropagation()}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ duration: 0.3 }}
              >
                <button
                  type="button"
                  className={styles.lightboxClose}
                  onClick={() => setActiveImage(null)}
                  aria-label="Close image"
                >
                  &times;
                </button>
                <img src={activeImage.src} alt={activeImage.title} className={styles.lightboxImg} />
                <div className={styles.lightboxMeta}>
                  <span className={styles.imageBadge}>{activeImage.category}</span>
                  <h3 className={styles.lightboxTitle}>{activeImage.title}</h3>
                  <p className={styles.lightboxDesc}>{activeImage.description}</p>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </section>

      {/* =========================================================================
          3. SERVER STATS & LIVE EVENT COUNTDOWN
          ========================================================================= */}
      <Stats />
      <HomeEventAlert />

      {/* =========================================================================
          4. CORE SYSTEMS & 4-DISCIPLINE CLASSES SHOWCASE
          ========================================================================= */}
      <HomeFeatures />
      <HomeClasses />

      {/* =========================================================================
          5. NEWS & CALL TO ACTION
          ========================================================================= */}
      <HomeNews />
      <HomeCTA />
    </>
  );
}
