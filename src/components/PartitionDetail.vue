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
  <h4 :class="{ 'new-partition': !partition.oldPartitionInfo }">
    {{ partition.partitionName }}
  </h4>
  <p v-if="partition.estimateCowSize">
    <strong> Estimate COW Size: </strong> {{ partition.estimateCowSize }} Bytes
  </p>
  <div class="toggle">
    <h4 @click="toggle('showInfo')" :class="{ active: showInfo }">
      Partition Infos
    </h4>
    <ul v-if="showInfo">
      <li v-if="partition.oldPartitionInfo">
        <strong>
          Old Partition Size:
        </strong>
        {{ partition.oldPartitionInfo.size }} Bytes
      </li>
      <li v-if="partition.oldPartitionInfo">
        <strong>
          Old Partition Hash:
        </strong>
        <div class="hex">
          {{ octToHex(partition.oldPartitionInfo.hash, false, 16) }}
        </div>
      </li>
      <li>
        <strong>
          New Partition Size:
        </strong>
        {{ partition.newPartitionInfo.size }} Bytes
      </li>
      <li v-if="partition.newPartitionInfo.hash">
        <strong>
          New Partition Hash:
        </strong>
        <div class="hex">
          {{ octToHex(partition.newPartitionInfo.hash, false, 16) }}
        </div>
      </li>
      <li v-if="partition.version">
        <strong>
          Version:
        </strong>
        {{ partition.version }}
      </li>
      <li v-if="readableTimestamp">
        <strong>
          Version:
        </strong>
        {{ readableTimestamp }}
      </li>
    </ul>
  </div>
  <div class="toggle">
    <h4 @click="toggle('showOPs')" :class="{ active: showOPs }">
      Total Operations: {{ partition.operations.length }}
    </h4>
    <ul v-if="showOPs">
      <li
        v-for="operation in partition.operations"
        :key="operation.dataSha256Hash"
      >
        <OperationDetail :operation="operation" :mapType="opType.mapType" />
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { chromeos_update_engine } from '@/services/update_metadata_pb'
import { defineComponent } from 'vue'
import { OpType, octToHex } from '../services/payload'
import OperationDetail from './OperationDetail.vue'

export default defineComponent({
  components: {
    OperationDetail
  },
  props: {
    partition: {
      type: chromeos_update_engine.PartitionUpdate,
      required: true
    }
  },
  data() {
    return {
      showOPs: false,
      showInfo: false,
      opType: new OpType()
    }
  },
  methods: {
    toggle(key: string) {
      ;(this as any)[key] = !(this as any)[key]
    },
    octToHex: octToHex
  },
  computed: {
    readableTimestamp() {
      const unixTimestamp = parseInt(this.partition.version)
      if (isNaN(unixTimestamp)) {
        return ''
      }
      // Unix timestamp is in seconds, but js want milliseconds. So *1000
      return new Date(unixTimestamp * 1000).toString()
    }
  }
})
</script>

<style scoped>
.toggle {
  display: block;
  cursor: pointer;
}

li {
  list-style-type: none;
}
.hex {
  word-break: break-all;
}

.active {
  color: rgb(var(--v-theme-secondary));
}

.new-partition {
  color: rgb(var(--v-theme-success));
}
</style>
