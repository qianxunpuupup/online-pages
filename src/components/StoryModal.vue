<script setup>
import { ref, watch, computed, onBeforeUnmount } from 'vue'
import { chapters } from '../data/photos.js'

const props = defineProps({
  photo: { type: Object, default: null },
  index: { type: Number, default: -1 },
  total: { type: Number, default: 0 }
})
const emit = defineEmits(['close', 'step'])

const stage = ref(null)
const loaded = ref(false)
const failed = ref(false)

const chapterName = computed(
  () => chapters.find((c) => c.id === props.photo?.chapter)?.name ?? '手记'
)
const chapterMark = computed(
  () => chapters.find((c) => c.id === props.photo?.chapter)?.mark ?? '◎'
)
const serial = computed(() => String(props.index + 1).padStart(2, '0'))

/* 打开时锁定页面滚动 + 键盘操作 */
function onKey(e) {
  if (!props.photo) return
  if (e.key === 'Escape') emit('close')
  if (e.key === 'ArrowRight') emit('step', 1)
  if (e.key === 'ArrowLeft') emit('step', -1)
}

watch(
  () => props.photo,
  (val) => {
    loaded.value = false
    failed.value = false
    if (val) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', onKey)
    } else {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }
)

onBeforeUnmount(() => {
  document.body.style.overflow = ''
  window.removeEventListener('keydown', onKey)
})
</script>

<template>
  <Teleport to="body">
    <Transition name="viewer">
      <div
        v-if="photo"
        class="viewer"
        role="dialog"
        aria-modal="true"
        :aria-label="`${photo.title} 的故事`"
        @click.self="emit('close')"
      >
        <div class="viewer__scrim" aria-hidden="true" @click="emit('close')"></div>

        <div class="viewer__panel">
          <button class="viewer__close" aria-label="关闭" @click="emit('close')">
            <span></span><span></span>
          </button>

          <!-- 左：照片 -->
          <figure class="viewer__stage" ref="stage">
            <img
              :key="photo.id"
              :src="photo.src"
              :alt="`${photo.place} · ${photo.title}`"
              :class="{ 'is-loaded': loaded }"
              decoding="async"
              @load="loaded = true"
              @error="failed = true"
            />
            <span v-if="failed" class="stage__failed mono">底片未显影 · 请检查影像来源</span>
            <figcaption class="viewer__exif mono">
              {{ photo.date }} · {{ photo.time }} · {{ photo.weather }}
            </figcaption>
          </figure>

          <!-- 右：故事 -->
          <div class="viewer__story" :key="photo.id">
            <header class="story__top">
              <span class="story__chapter mono">{{ chapterMark }} {{ chapterName }}</span>
              <span class="story__serial mono">No.{{ serial }} / {{ String(total).padStart(2, '0') }}</span>
            </header>

            <h2 class="story__title">{{ photo.title }}</h2>
            <p class="story__mood">「{{ photo.mood }}」</p>

            <div class="story__meta">
              <div class="meta__cell">
                <span class="meta__k mono">时间</span>
                <span class="meta__v">{{ photo.date }}<em>{{ photo.time }}</em></span>
              </div>
              <div class="meta__cell">
                <span class="meta__k mono">地点</span>
                <span class="meta__v">{{ photo.place }}</span>
              </div>
            </div>

            <div class="story__body">
              <p v-for="(para, i) in photo.story.split('。').filter((s) => s.trim())" :key="i">
                {{ para }}。
              </p>
            </div>

            <ul class="story__tags">
              <li v-for="t in photo.tags" :key="t" class="mono">#{{ t }}</li>
            </ul>

            <footer class="story__nav">
              <button class="nav__btn" @click="emit('step', -1)">
                <span class="mono">← 上一张</span>
              </button>
              <button class="nav__btn nav__btn--next" @click="emit('step', 1)">
                <span class="mono">下一张 →</span>
              </button>
            </footer>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.viewer {
  position: fixed;
  inset: 0;
  z-index: 100;
  display: grid;
  place-items: center;
  padding: clamp(0rem, 3vw, 2.4rem);
}
.viewer__scrim {
  position: absolute;
  inset: 0;
  background: rgba(14, 11, 9, 0.78);
  backdrop-filter: blur(14px) saturate(115%);
}

.viewer__panel {
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 1.35fr) minmax(320px, 0.85fr);
  width: min(1180px, 100%);
  max-height: min(88vh, 900px);
  border-radius: 6px;
  overflow: hidden;
  background: var(--darkroom);
  box-shadow: 0 40px 120px -30px rgba(0, 0, 0, 0.85);
}

/* 关闭按钮 */
.viewer__close {
  position: absolute;
  top: 0.9rem;
  right: 0.9rem;
  z-index: 5;
  width: 42px;
  height: 42px;
  border-radius: 999px;
  background: rgba(253, 250, 243, 0.1);
  backdrop-filter: blur(8px);
  transition: background 0.35s var(--ease), transform 0.35s var(--ease);
}
.viewer__close:hover {
  background: rgba(253, 250, 243, 0.22);
  transform: rotate(90deg);
}
.viewer__close span {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 16px;
  height: 1.5px;
  background: #fdfaf3;
}
.viewer__close span:first-child {
  transform: translate(-50%, -50%) rotate(45deg);
}
.viewer__close span:last-child {
  transform: translate(-50%, -50%) rotate(-45deg);
}

/* 照片台 */
.viewer__stage {
  position: relative;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: radial-gradient(120% 120% at 30% 20%, #241d18 0%, #100d0b 70%);
  min-height: 0;
  padding: clamp(1rem, 2.4vw, 2.2rem);
}
.viewer__stage img {
  max-width: 100%;
  max-height: none;
  width: 100%;
  height: auto;
  max-height: 100%;
  object-fit: contain;
  border-radius: 3px;
  box-shadow: 0 24px 60px -20px rgba(0, 0, 0, 0.9);
  /* 显影效果 */
  filter: blur(14px) brightness(1.35) saturate(0.4);
  opacity: 0.35;
  transform: scale(1.02);
  transition:
    filter 1.15s var(--ease),
    opacity 0.9s var(--ease),
    transform 1.3s var(--ease);
}
.viewer__stage img.is-loaded {
  filter: blur(0) brightness(1) saturate(1);
  opacity: 1;
  transform: scale(1);
}
.stage__failed {
  position: absolute;
  inset: 0;
  z-index: 3;
  display: grid;
  place-items: center;
  font-size: 0.58rem;
  letter-spacing: 0.24em;
  color: rgba(239, 230, 216, 0.45);
}
.viewer__exif {
  position: absolute;
  left: clamp(1rem, 2.4vw, 2.2rem);
  bottom: 0.85rem;
  font-size: 0.58rem;
  color: rgba(239, 230, 216, 0.55);
  letter-spacing: 0.12em;
}

/* 故事栏 */
.viewer__story {
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
  padding: clamp(1.6rem, 3vw, 2.6rem);
  overflow-y: auto;
  background: linear-gradient(180deg, #1b1713 0%, #16120f 100%);
  color: var(--paper);
  animation: storyIn 0.75s var(--ease) both 0.12s;
}
@keyframes storyIn {
  from {
    opacity: 0;
    transform: translateY(14px);
  }
}

.story__top {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 1rem;
  padding-bottom: 0.9rem;
  border-bottom: 1px solid rgba(239, 230, 216, 0.14);
}
.story__chapter {
  font-size: 0.6rem;
  color: var(--gold);
  letter-spacing: 0.2em;
}
.story__serial {
  font-size: 0.58rem;
  color: rgba(239, 230, 216, 0.5);
}

.story__title {
  margin: 0.2rem 0 0;
  font-family: var(--display);
  font-weight: 600;
  font-size: clamp(1.7rem, 3vw, 2.5rem);
  line-height: 1.2;
  color: #fbf6ec;
}
.story__mood {
  margin: 0;
  font-family: var(--serif);
  font-style: italic;
  font-size: 0.95rem;
  color: rgba(239, 230, 216, 0.66);
}

.story__meta {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.9rem;
  margin: 0.5rem 0 0.3rem;
  padding: 0.95rem 0;
  border-top: 1px solid rgba(239, 230, 216, 0.14);
  border-bottom: 1px solid rgba(239, 230, 216, 0.14);
}
.meta__cell {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}
.meta__k {
  font-size: 0.55rem;
  letter-spacing: 0.22em;
  color: var(--vermilion);
}
.meta__v {
  font-size: 0.86rem;
  line-height: 1.5;
  color: rgba(239, 230, 216, 0.9);
}
.meta__v em {
  display: block;
  font-family: var(--mono);
  font-style: normal;
  font-size: 0.66rem;
  letter-spacing: 0.12em;
  color: rgba(239, 230, 216, 0.55);
}

.story__body {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}
.story__body p {
  margin: 0;
  font-size: 0.92rem;
  line-height: 2;
  color: rgba(239, 230, 216, 0.82);
}
.story__body p:first-child::first-letter {
  float: left;
  margin: 0.1rem 0.5rem 0 0;
  font-family: var(--display);
  font-size: 2.6rem;
  line-height: 0.9;
  color: var(--gold);
}

.story__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 0.4rem 0 0;
  padding: 0;
  list-style: none;
}
.story__tags li {
  padding: 0.26rem 0.6rem;
  border: 1px solid rgba(239, 230, 216, 0.2);
  border-radius: 999px;
  font-size: 0.56rem;
  color: rgba(239, 230, 216, 0.62);
}

.story__nav {
  position: sticky;
  bottom: 0;
  display: flex;
  gap: 0.6rem;
  margin: auto -0.4rem 0;
  padding: 1rem 0.4rem 0.2rem;
  background: linear-gradient(to top, #16120f 62%, rgba(22, 18, 15, 0));
}
.nav__btn {
  flex: 1;
  padding: 0.7rem 1rem;
  border: 1px solid rgba(239, 230, 216, 0.22);
  border-radius: 3px;
  color: rgba(239, 230, 216, 0.85);
  text-align: left;
  transition: background 0.4s var(--ease), border-color 0.4s var(--ease), transform 0.4s var(--ease);
}
.nav__btn span {
  font-size: 0.6rem;
}
.nav__btn--next {
  text-align: right;
}
.nav__btn:hover {
  background: rgba(193, 74, 36, 0.16);
  border-color: var(--vermilion);
  transform: translateY(-2px);
}

/* 进出场 */
.viewer-enter-active,
.viewer-leave-active {
  transition: opacity 0.45s var(--ease);
}
.viewer-enter-from,
.viewer-leave-to {
  opacity: 0;
}
.viewer-enter-active .viewer__panel {
  transition: transform 0.6s var(--ease), opacity 0.6s var(--ease);
}
.viewer-enter-from .viewer__panel {
  transform: translateY(26px) scale(0.975);
  opacity: 0;
}

@media (max-width: 860px) {
  .viewer {
    padding: 0;
    align-items: stretch;
  }
  .viewer__panel {
    grid-template-columns: 1fr;
    grid-template-rows: minmax(0, 42vh) minmax(0, 1fr);
    max-height: 100vh;
    height: 100vh;
    border-radius: 0;
  }
  .viewer__stage {
    padding: 1.4rem 1.4rem 2.2rem;
  }
  .viewer__story {
    padding: 1.5rem 1.3rem 2rem;
  }
  .viewer__exif {
    bottom: 0.7rem;
    left: 1.4rem;
  }
}
</style>
