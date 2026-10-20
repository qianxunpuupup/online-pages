<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
  photos: { type: Array, required: true },
  chapters: { type: Array, required: true }
})

const broken = ref(new Set())
const isBroken = (id) => broken.value.has(id)
function markBroken(id) {
  broken.value = new Set(broken.value).add(id)
}

const places = computed(() => {
  const set = new Set(props.photos.map((p) => p.place.split('·')[0].trim()))
  return [...set]
})

/* 首屏三张叠放的冲印件 */
const cluster = computed(() => [props.photos[0], props.photos[5], props.photos[9]].filter(Boolean))

const marquee = computed(() => {
  const names = props.photos.map((p) => p.place.split('·')[1]?.trim() || p.place)
  return [...names, ...names]
})
</script>

<template>
  <header class="masthead">
    <div class="masthead__bar">
      <span class="brand">
        <span class="brand__dot" aria-hidden="true"></span>
        <span class="brand__cn">拾光集</span>
        <span class="brand__en mono">Photo&nbsp;Journal</span>
      </span>
      <span class="bar__meta mono">
        <i>VOL.01</i>
        <em>坊间私藏版</em>
      </span>
    </div>

    <div class="masthead__hero">
      <div class="hero__left">
        <p class="kicker mono">—— 把散落的光，收进一本册子</p>
        <h1 class="hero__title">
          <span class="t1">拾</span><span class="t2">光</span><span class="t3">集</span>
        </h1>
        <p class="hero__lede">
          这里没有著名景点，只有某个清晨、某条巷子、某顿热饭。<br />
          十二张照片，十二段被光留下来的日子。点开任意一张，
          它会告诉你——那是什么时候，在哪里，以及当时发生了什么。
        </p>

        <ul class="hero__stats">
          <li>
            <strong>{{ photos.length }}</strong>
            <span class="mono">帧影像</span>
          </li>
          <li>
            <strong>{{ chapters.length - 1 }}</strong>
            <span class="mono">个章节</span>
          </li>
          <li>
            <strong>{{ places.length }}</strong>
            <span class="mono">座城市</span>
          </li>
        </ul>
      </div>

      <div class="hero__cluster" aria-hidden="true">
        <figure
          v-for="(p, i) in cluster"
          :key="p.id"
          class="stack"
          :class="`stack--${i}`"
        >
          <img
            :src="p.src"
            alt=""
            loading="eager"
            decoding="async"
            :class="{ 'is-broken': isBroken(p.id) }"
            @error="markBroken(p.id)"
          />
          <figcaption class="mono">{{ p.date }}</figcaption>
        </figure>
        <span class="cluster__seal mono">已冲印<br />12 / 12</span>
      </div>
    </div>

    <div class="marquee" aria-hidden="true">
      <div class="marquee__track">
        <span v-for="(m, i) in marquee" :key="i" class="marquee__item">
          {{ m }}<i>✳</i>
        </span>
      </div>
    </div>
  </header>
</template>

<style scoped>
.masthead {
  position: relative;
  z-index: 1;
  padding: 0 clamp(1rem, 5vw, 4.5rem);
}

/* 报头 */
.masthead__bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1.5rem 0;
  border-bottom: 1px solid var(--rule);
}
.brand {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
}
.brand__dot {
  width: 9px;
  height: 9px;
  border-radius: 999px;
  background: var(--vermilion);
  box-shadow: 0 0 0 3px rgba(193, 74, 36, 0.18);
}
.brand__cn {
  font-family: var(--display);
  font-weight: 700;
  font-size: 1rem;
  letter-spacing: 0.06em;
}
.brand__en {
  font-size: 0.56rem;
  color: var(--ink-faint);
}
.bar__meta {
  display: inline-flex;
  align-items: center;
  gap: 0.7rem;
  font-size: 0.58rem;
  color: var(--ink-faint);
}
.bar__meta i {
  font-style: normal;
  color: var(--ink);
}
.bar__meta em {
  font-style: normal;
  padding-left: 0.7rem;
  border-left: 1px solid var(--rule);
}

/* 主视觉 */
.masthead__hero {
  display: grid;
  grid-template-columns: minmax(0, 1.05fr) minmax(280px, 0.95fr);
  gap: clamp(1.5rem, 5vw, 4rem);
  align-items: center;
  padding: clamp(2.5rem, 7vw, 5.5rem) 0 clamp(2rem, 5vw, 4rem);
}
.kicker {
  margin: 0 0 1.1rem;
  font-size: 0.6rem;
  letter-spacing: 0.2em;
  color: var(--vermilion);
}
.hero__title {
  display: flex;
  gap: 0.06em;
  margin: 0 0 1.4rem;
  font-family: var(--display);
  font-weight: 700;
  font-size: clamp(3.6rem, 12vw, 8.5rem);
  line-height: 0.92;
  letter-spacing: 0.01em;
}
.hero__title span {
  display: inline-block;
  animation: rise 1s var(--ease) both;
}
.hero__title .t1 {
  animation-delay: 0.05s;
}
.hero__title .t2 {
  animation-delay: 0.16s;
}
.hero__title .t3 {
  animation-delay: 0.27s;
  color: var(--vermilion);
  font-style: italic;
}
@keyframes rise {
  from {
    opacity: 0;
    transform: translateY(0.42em) rotate(3deg);
  }
}

.hero__lede {
  max-width: 34rem;
  margin: 0 0 2rem;
  font-size: 0.98rem;
  line-height: 2.05;
  color: var(--ink-soft);
}

.hero__stats {
  display: flex;
  gap: clamp(1.4rem, 4vw, 3rem);
  margin: 0;
  padding: 1.2rem 0 0;
  border-top: 1px solid var(--rule);
  list-style: none;
}
.hero__stats li {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}
.hero__stats strong {
  font-family: var(--display);
  font-size: 2rem;
  font-weight: 600;
  line-height: 1;
}
.hero__stats span {
  font-size: 0.56rem;
  color: var(--ink-faint);
}

/* 叠放冲印件 */
.hero__cluster {
  position: relative;
  height: clamp(320px, 42vw, 480px);
}
.stack {
  position: absolute;
  margin: 0;
  padding: 0.6rem 0.6rem 0;
  background: linear-gradient(168deg, #fdfaf3, #f2e9d9);
  border-radius: 3px;
  box-shadow: var(--shadow-card);
  transition: transform 0.8s var(--ease), box-shadow 0.8s var(--ease);
}
.stack img {
  width: 100%;
  aspect-ratio: 3 / 4;
  object-fit: cover;
  border-radius: 2px;
  background: var(--paper-deep);
}
.stack img.is-broken {
  background-image: repeating-linear-gradient(
    115deg,
    rgba(36, 31, 26, 0.07) 0 10px,
    transparent 10px 26px
  );
}
.stack figcaption {
  padding: 0.45rem 0 0.55rem;
  font-size: 0.55rem;
  color: var(--ink-faint);
  text-align: right;
}
.stack--0 {
  width: 46%;
  left: 4%;
  top: 8%;
  transform: rotate(-7deg);
  z-index: 3;
}
.stack--1 {
  width: 44%;
  right: 6%;
  top: 0;
  transform: rotate(5deg);
  z-index: 2;
}
.stack--2 {
  width: 42%;
  left: 27%;
  bottom: 2%;
  transform: rotate(-1.5deg);
  z-index: 4;
}
.hero__cluster:hover .stack--0 {
  transform: rotate(-9deg) translate(-6px, -8px);
}
.hero__cluster:hover .stack--1 {
  transform: rotate(8deg) translate(8px, -6px);
}
.hero__cluster:hover .stack--2 {
  transform: rotate(1deg) translateY(6px);
}
.cluster__seal {
  position: absolute;
  right: 2%;
  bottom: 6%;
  z-index: 5;
  display: grid;
  place-items: center;
  width: 78px;
  height: 78px;
  border-radius: 999px;
  border: 1px dashed rgba(193, 74, 36, 0.55);
  color: var(--vermilion);
  font-size: 0.52rem;
  line-height: 1.6;
  text-align: center;
  letter-spacing: 0.1em;
  background: rgba(253, 250, 243, 0.72);
  transform: rotate(-9deg);
}

/* 走马灯 */
.marquee {
  overflow: hidden;
  padding: 0.9rem 0;
  border-top: 1px solid var(--rule);
  border-bottom: 1px solid var(--rule);
  mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
  -webkit-mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
}
.marquee__track {
  display: flex;
  width: max-content;
  animation: slide 46s linear infinite;
}
.marquee:hover .marquee__track {
  animation-play-state: paused;
}
.marquee__item {
  display: inline-flex;
  align-items: center;
  gap: 1.6rem;
  padding-right: 1.6rem;
  font-family: var(--serif);
  font-size: 0.82rem;
  color: var(--ink-soft);
  white-space: nowrap;
}
.marquee__item i {
  font-style: normal;
  color: var(--vermilion);
  font-size: 0.6rem;
}
@keyframes slide {
  to {
    transform: translateX(-50%);
  }
}

@media (max-width: 900px) {
  .masthead__hero {
    grid-template-columns: 1fr;
  }
  .hero__cluster {
    order: -1;
    height: clamp(260px, 62vw, 380px);
    margin-bottom: 1rem;
  }
}
@media (max-width: 560px) {
  .hero__stats {
    gap: 1.2rem;
  }
  .hero__stats strong {
    font-size: 1.6rem;
  }
}
</style>
