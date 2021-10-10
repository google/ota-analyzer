<!--
 Copyright 2021 Google LLC

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
-->

<template>
  <label class="file-select ma-5">
    <div
      class="select-button"
      @dragover="dragover"
      @dragleave="dragleave"
      @drop="drop"
    >
      <span v-if="label">{{ !fileName ? label : '' }}</span>
      <span v-else>Select File</span>
      <div v-if="fileName">File selected: {{ fileName }}</div>
    </div>
    <input ref="file" type="file" accept=".zip" @change="handleFileChange" />
  </label>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    label: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      fileName: ''
    }
  },

  methods: {
    handleFileChange(event: any) {
      if (!event.currentTarget) {
        return
      }
      let target = event.currentTarget! as HTMLInputElement
      if (target.files == null || target.files.length < 1) {
        return
      }
      this.$emit('file-select', target.files![0])
      this.fileName = target.files![0].name
    },
    dragover(event: DragEvent) {
      event.preventDefault()
      if (!event.currentTarget) {
        return
      }
      let target = event.currentTarget! as HTMLInputElement
      if (!target.classList.contains('file-hover')) {
        target.classList.add('file-hover')
      }
    },
    dragleave(event: DragEvent) {
      if (!event.currentTarget) {
        return
      }
      let target = event.currentTarget! as HTMLInputElement
      target.classList.remove('file-hover')
    },
    drop(event: DragEvent) {
      event.preventDefault()
      if (!event.currentTarget) {
        return
      }
      let target = event.currentTarget! as HTMLInputElement
      if (!event.dataTransfer || event.dataTransfer.files.length == 0) {
        return
      }
      target.files = event.dataTransfer.files
      this.handleFileChange(event)
      target.classList.remove('file-hover')
    }
  }
})
</script>

<style scoped>
.file-select > .select-button {
  padding: 3rem;
  border-radius: 0.3rem;
  border: 4px dashed #eaebec;
  text-align: center;
  font-weight: bold;
  cursor: pointer;
}

.file-select > input[type='file'] {
  display: none;
}

.file-hover {
  background-color: #95e995;
}
</style>
