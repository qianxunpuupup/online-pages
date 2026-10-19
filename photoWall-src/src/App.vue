<script setup>
import { ref, computed } from 'vue'
import JournalHeader from './components/JournalHeader.vue'
import PhotoWall from './components/PhotoWall.vue'
import StoryModal from './components/StoryModal.vue'
import { photos, chapters } from './data/photos.js'

const active = ref('all')
const openId = ref(null)

const visible = computed(() =>
  active.value === 'all' ? photos : photos.filter((p) => p.chapter === active.value)
)

const current = computed(() => visible.value.find((p) => p.id === openId.value) || null)
const currentIndex = computed(() => visible.value.findIndex((p) => p.id === openId.value))

function pick(id) {
  active.value = id
  openId.value = null
}

function open(photo) {
  openId.value = photo.id
}

function step(dir) {
  if (!visible.value.length) return
  const n = visible.value.length
  const next = (currentIndex.value + dir + n) % n
  openId.value = visible.value[next].id
}
</script>

<template>
  <div class="journal">
    <JournalHeader :photos="photos" :chapters="chapters" />

    <PhotoWall
      :photos="visible"
      :active="active"
      :total="photos.length"
      @open="open"
      @pick="pick"
    />

    <footer class="colophon">
      <div class="colophon__marks" aria-hidden="true">
        <span></span><span></span><span></span>
      </div>
      <p class="colophon__line">
        以光为墨，以时为纸 —— 每一帧都值得被讲出来。
      </p>
      <p class="colophon__sig mono">拾光集 · 私藏影像手记 · 共 {{ photos.length }} 帧</p>
    </footer>

    <StoryModal
      :photo="current"
      :index="currentIndex"
      :total="visible.length"
      @close="openId = null"
      @step="step"
    />
  </div>
</template>

<style scoped>
.journal {
  position: relative;
  min-height: 100vh;
}

.colophon {
  position: relative;
  z-index: 1;
  padding: clamp(2.5rem, 6vw, 4.5rem) clamp(1rem, 5vw, 4.5rem) clamp(3rem, 7vw, 5rem);
  border-top: 1px solid var(--rule);
  text-align: center;
}
.colophon__marks {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 1.4rem;
}
.colophon__marks span {
  width: 6px;
  height: 6px;
  border-radius: 999px;
  background: var(--ink-faint);
  opacity: 0.5;
}
.colophon__marks span:nth-child(2) {
  background: var(--vermilion);
  opacity: 1;
}
.colophon__line {
  max-width: 30rem;
  margin: 0 auto 0.9rem;
  font-family: var(--serif);
  font-style: italic;
  font-size: 0.95rem;
  color: var(--ink-soft);
}
.colophon__sig {
  margin: 0;
  font-size: 0.56rem;
  color: var(--ink-faint);
}
</style>

<style>
/* 全局网格间距变量 */
:root {
  --gap: clamp(1.1rem, 2.4vw, 2rem);
}
</style>
