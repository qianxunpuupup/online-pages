<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  photo: { type: Object, required: true },
  index: { type: Number, required: true }
})
const emit = defineEmits(['open'])

/* 每张冲印件的随手摆放角度 */
const ROTATIONS = [-1.4, 0.9, -0.6, 1.6, -1.1, 0.5, -1.8, 1.2, -0.4, 1.5, -0.9, 0.7]

const rot = computed(() => ROTATIONS[props.index % ROTATIONS.length])
const delay = computed(() => Math.min(props.index, 8) * 70)

const el = ref(null)
const shown = ref(false)
const failed = ref(false)
let io = null

onMounted(() => {
  if (typeof IntersectionObserver === 'undefined') {
    shown.value = true
    return
  }
  io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          shown.value = true
          io?.unobserve(e.target)
        }
      })
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
  )
  if (el.value) io.observe(el.value)
})

onBeforeUnmount(() => io?.disconnect())

const no = computed(() => String(props.index + 1).padStart(2, '0'))

function open() {
  emit('open', props.photo)
}
function onKey(e) {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault()
    open()
  }
}
</script>

<template>
  <figure
    ref="el"
    class="print"
    :class="{ 'is-in': shown }"
    :style="{ '--rot': rot + 'deg', '--delay': delay + 'ms' }"
    role="button"
    tabindex="0"
    :aria-label="`打开《${photo.title}》，${photo.place}`"
    @click="open"
    @keydown="onKey"
  >
    <div class="print__frame">
      <div class="print__photo" :class="{ 'is-failed': failed }" :style="{ aspectRatio: photo.ratio }">
        <img
          :src="photo.src"
          :alt="`${photo.place} · ${photo.title}`"
          loading="lazy"
          decoding="async"
          @error="failed = true"
        />
        <span v-if="failed" class="print__failed mono">底片未显影</span>
        <span class="print__veil" aria-hidden="true"></span>
        <span class="print__time mono" aria-hidden="true">{{ photo.time }}</span>
        <span class="print__cta mono" aria-hidden="true">阅读故事 <i>→</i></span>
      </div>

      <figcaption class="print__caption">
        <span class="print__no mono">No.{{ no }}</span>
        <h3 class="print__title">{{ photo.title }}</h3>
        <span class="print__rule" aria-hidden="true"></span>
        <p class="print__meta mono">{{ photo.date }}<br />{{ photo.place }}</p>
      </figcaption>
    </div>
  </figure>
</template>

<style scoped>
.print {
  margin: 0 0 var(--gap);
  break-inside: avoid;
  opacity: 0;
  transform: translateY(34px) scale(0.965);
  transition:
    opacity 0.85s ease var(--delay),
    transform 0.95s var(--ease) var(--delay);
}
.print.is-in {
  opacity: 1;
  transform: none;
}

.print__frame {
  position: relative;
  padding: 0.85rem 0.85rem 0;
  border-radius: 3px;
  background: linear-gradient(168deg, #fdfaf3 0%, #f7f0e3 62%, #f1e8d7 100%);
  box-shadow: var(--shadow-card);
  cursor: pointer;
  transform: rotate(var(--rot));
  transform-origin: 50% 55%;
  transition:
    transform 0.72s var(--ease),
    box-shadow 0.72s var(--ease);
  will-change: transform;
}
.print__frame::after {
  /* 冲印件的暗角 */
  content: '';
  position: absolute;
  inset: 0.85rem 0.85rem auto;
  border-radius: 2px;
  box-shadow: inset 0 0 42px rgba(36, 31, 26, 0.12);
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.6s var(--ease);
}
.print:hover .print__frame,
.print:focus-visible .print__frame {
  transform: rotate(0deg) translateY(-8px);
  box-shadow: var(--shadow-lift);
}
.print:hover .print__frame::after {
  opacity: 1;
}

.print__photo {
  position: relative;
  overflow: hidden;
  border-radius: 2px;
  background: var(--paper-deep);
}
.print__photo::before {
  /* 未显影的底片条纹 */
  content: '';
  position: absolute;
  inset: 0;
  opacity: 0;
  background: repeating-linear-gradient(
    115deg,
    rgba(36, 31, 26, 0.07) 0 10px,
    transparent 10px 26px
  );
}
.print__photo.is-failed::before {
  opacity: 1;
}
.print__photo.is-failed::after {
  content: '';
  position: absolute;
  inset: 10px;
  border: 1px dashed rgba(36, 31, 26, 0.28);
  border-radius: 2px;
}
.print__failed {
  position: absolute;
  inset: 0;
  z-index: 2;
  display: grid;
  place-items: center;
  font-size: 0.6rem;
  letter-spacing: 0.28em;
  color: var(--ink-faint);
}
.print__photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: scale(1.006);
  transition:
    transform 1.1s var(--ease),
    filter 0.7s var(--ease);
  filter: saturate(0.94) contrast(1.02);
}
.print:hover .print__photo img,
.print:focus-visible .print__photo img {
  transform: scale(1.055);
  filter: saturate(1.06) contrast(1.05);
}

.print__veil {
  position: absolute;
  inset: auto 0 0 0;
  height: 55%;
  background: linear-gradient(to top, rgba(20, 15, 11, 0.72), transparent);
  opacity: 0;
  transition: opacity 0.5s var(--ease);
}
.print:hover .print__veil,
.print:focus-visible .print__veil {
  opacity: 1;
}

.print__time,
.print__cta {
  position: absolute;
  z-index: 2;
  color: #fdfaf3;
  font-size: 0.62rem;
  letter-spacing: 0.16em;
}
.print__time {
  top: 0.6rem;
  left: 0.6rem;
  padding: 0.18rem 0.42rem;
  border-radius: 999px;
  background: rgba(20, 15, 11, 0.42);
  backdrop-filter: blur(6px);
}
.print__cta {
  left: 0.85rem;
  bottom: 0.8rem;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  opacity: 0;
  transform: translateY(8px);
  transition:
    opacity 0.45s var(--ease),
    transform 0.45s var(--ease);
}
.print__cta i {
  font-style: normal;
  transition: transform 0.45s var(--ease);
}
.print:hover .print__cta,
.print:focus-visible .print__cta {
  opacity: 1;
  transform: translateY(0);
}
.print:hover .print__cta i {
  transform: translateX(4px);
}

.print__caption {
  position: relative;
  padding: 0.85rem 0.3rem 1rem;
}
.print__no {
  font-size: 0.6rem;
  color: var(--ink-faint);
}
.print__title {
  margin: 0.15rem 0 0.4rem;
  font-family: var(--display);
  font-weight: 600;
  font-size: 1.18rem;
  line-height: 1.35;
  letter-spacing: 0.01em;
  color: var(--ink);
}
.print__rule {
  display: block;
  width: 26px;
  height: 2px;
  margin-bottom: 0.5rem;
  background: var(--vermilion);
  transform-origin: left;
  transform: scaleX(0.55);
  transition: transform 0.6s var(--ease);
}
.print:hover .print__rule,
.print:focus-visible .print__rule {
  transform: scaleX(1);
}
.print__meta {
  margin: 0;
  font-size: 0.62rem;
  line-height: 1.8;
  color: var(--ink-faint);
  letter-spacing: 0.08em;
}
</style>
