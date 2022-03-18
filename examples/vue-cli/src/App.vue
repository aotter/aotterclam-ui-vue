<template>
  <div>
    <BootstrapUI />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import BootstrapUI from '@/components/BootstrapUI.vue'

export default defineComponent({
  name: 'App',
  components: { BootstrapUI },
  setup() {
    return {}
  }
})
</script>

<style></style>
