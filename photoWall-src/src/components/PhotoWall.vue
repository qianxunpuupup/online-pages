<script setup>
import { computed } from 'vue'
import PhotoCard from './PhotoCard.vue'
import { chapters } from '../data/photos.js'

const props = defineProps({
  photos: { type: Array, required: true },
  active: { type: String, required: true },
  total: { type: Number, required: true }
})
const emit = defineEmits(['open', 'pick'])

const counts = computed(() => {
  const map = { all: props.total }
  props.photos.forEach((p) => {
    map[p.chapter] = (map[p.chapter] || 0) + 1
  })
  return map
})
</script>

<template>
  <section class="wall" aria-label="照片墙">
    <div class="wall__bar">
      <div class="wall__chapters" role="tablist" aria-label="按章节筛选">
        <button
          v-for="c in chapters"
          :key="c.id"
          class="chip"
          :class="{ 'is-active': active === c.id }"
          role="tab"
          :aria-selected="active === c.id"
          @click="emit('pick', c.id)"
        >
          <span class="chip__mark">{{ c.mark }}</span>
          <span class="chip__name">{{ c.name }}</span>
          <span class="chip__count mono">{{ counts[c.id] || 0 }}</span>
        </button>
      </div>
      <p class="wall__hint mono">点击照片 · 展开故事</p>
    </div>

    <div :key="active" class="wall__grid">
      <PhotoCard
        v-for="(p, i) in photos"
        :key="p.id"
        :photo="p"
        :index="i"
        @open="emit('open', $event)"
      />
    </div>

    <p v-if="!photos.length" class="wall__empty mono">这一章还是空白 —— 等待新的光。</p>
  </section>
</template>

<style scoped>
.wall {
  position: relative;
  z-index: 1;
  padding: 0 clamp(1rem, 5vw, 4.5rem) clamp(3rem, 8vw, 7rem);
}

.wall__bar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1rem 2rem;
  padding: 1.6rem 0 2.4rem;
  margin-bottom: 1.6rem;
  border-top: 1px solid var(--rule);
  border-bottom: 1px solid var(--rule);
}
.wall__chapters {
  display: flex;
  flex-wrap: wrap;
  gap: 0.55rem;
}
.chip {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.42rem 0.85rem;
  border: 1px solid var(--rule);
  border-radius: 999px;
  background: rgba(253, 250, 243, 0.4);
  color: var(--ink-soft);
  font-family: var(--serif);
  font-size: 0.86rem;
  transition:
    background 0.4s var(--ease),
    color 0.4s var(--ease),
    border-color 0.4s var(--ease),
    transform 0.4s var(--ease);
}
.chip:hover {
  transform: translateY(-2px);
  border-color: var(--ink-faint);
  color: var(--ink);
}
.chip__mark {
  font-size: 0.8rem;
  opacity: 0.75;
}
.chip__count {
  font-size: 0.58rem;
  color: var(--ink-faint);
  transition: color 0.4s var(--ease);
}
.chip.is-active {
  background: var(--ink);
  border-color: var(--ink);
  color: var(--paper);
}
.chip.is-active .chip__count {
  color: rgba(239, 230, 216, 0.62);
}

.wall__hint {
  margin: 0;
  font-size: 0.6rem;
  color: var(--ink-faint);
}

.wall__grid {
  column-count: 3;
  column-gap: var(--gap);
}
@media (max-width: 1080px) {
  .wall__grid {
    column-count: 2;
  }
}
@media (max-width: 600px) {
  .wall__grid {
    column-count: 1;
  }
}

.wall__empty {
  padding: 5rem 0;
  text-align: center;
  color: var(--ink-faint);
  font-size: 0.68rem;
}
</style>
