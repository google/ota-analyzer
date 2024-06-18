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
  <h3>Basic infos</h3>
  <div v-if="zipFile" v-bind="$attrs">
    <ul class="align">
      <li><strong> File name </strong> {{ zipFile.getFileName() }}</li>
      <li><strong> File size </strong> {{ zipFile.getFileSize() }} Bytes</li>
    </ul>
  </div>
  <div v-if="payload && payload.metadata" v-bind="$attrs">
    <ul class="align">
      <li v-for="formatter in otaMetadata" :key="formatter.name">
        <strong> {{ formatter.name.trim() + ' ' }} </strong>
        <p class="wrap">
          {{ String(payload[formatter.key]).trim() }}
        </p>
      </li>
    </ul>
  </div>
  <div v-if="payload && payload.manifest">
    <ul class="align">
      <li>
        <strong> Incremental </strong>
        <!-- Check if the first partition is incremental or not -->
        <span v-if="payload.preBuild">
          &#9989;
        </span>
        <span v-else> &#10060; </span>
      </li>
      <li>
        <strong> Partial </strong>
        <span v-if="payload.manifest.partialUpdate"> &#9989; </span>
        <span v-else> &#10060; </span>
      </li>
      <li>
        <strong> A/B update </strong>
        <span v-if="!payload.manifest.nonAB">
          &#9989;
        </span>
        <span v-else> &#10060; </span>
      </li>
      <li v-if="payload.manifest.dynamicPartitionMetadata">
        <strong> VAB </strong>
        <span v-if="payload.manifest.dynamicPartitionMetadata.snapshotEnabled">
          &#9989;
        </span>
        <span v-else> &#10060; </span>
      </li>
      <li v-if="payload.manifest.dynamicPartitionMetadata">
        <strong> VABC </strong>
        <span v-if="payload.manifest.dynamicPartitionMetadata.vabcEnabled">
          &#9989;
        </span>
        <span v-else> &#10060; </span>
      </li>
      <li>
        <strong> Wipes Data </strong>
        <span v-if="isDataWipePackage">
          &#9989;
        </span>
        <span v-else> &#10060; </span>
      </li>
      <li v-if="totalDynamicPartitionSize">
        <strong> Total Dynamic Partition Size </strong>
        {{ totalDynamicPartitionSize }}
      </li>
      <li v-if="totalCOWSize">
        <strong> Total VABC COW Size </strong>
        {{ totalCOWSize }}
      </li>
      <li v-if="vabcCompressionParam">
        <strong> VABC Compression Algorithm </strong>
        {{ vabcCompressionParam }}
      </li>
      <li v-if="compressionFactor">
        <strong> Compression Factor </strong>
        {{ compressionFactor }}
      </li>
      <li v-if="cowVersion">
        <strong> Cow Version </strong>
        {{ cowVersion }}
      </li>
      <li v-if="securityPatchLevel">
        <strong> Security Patch Level </strong>
        {{ securityPatchLevel }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Payload, MetadataFormat } from '../services/payload'
import { ZipFile } from '@/services/trim_zip'

import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    zipFile: {
      type: ZipFile,
      required: true
    },
    payload: {
      type: Payload,
      required: true
    }
  },
  data() {
    return {
      MetadataFormat
    }
  },
  computed: {
    isDataWipePackage(): boolean {
      return this.payload.payload_properties.includes('POWERWASH=1')
    },
    otaMetadata(): {
      prefix: string
      key: string
      name: string
    }[] {
      return MetadataFormat.filter(
        formatter => String((this.payload as any)[formatter.key]).length > 0
      )
    },
    totalCOWSize(): number {
      const cowSizes = this.payload?.manifest?.partitions.map(
        p => p.estimateCowSize || 0
      )
      if (!cowSizes) {
        return 0
      }
      return cowSizes.reduce((a, b) => a + b)
    },
    vabcCompressionParam(): string {
      return (
        this.payload?.manifest?.dynamicPartitionMetadata
          ?.vabcCompressionParam || ''
      )
    },
    compressionFactor(): number {
      return (
        this.payload?.manifest?.dynamicPartitionMetadata?.compressionFactor || 0
      )
    },
    cowVersion(): number {
      return this.payload?.manifest?.dynamicPartitionMetadata?.cowVersion || 0
    },
    securityPatchLevel(): string {
      const spl = this.payload?.manifest?.securityPatchLevel
      if (!spl) {
        return ''
      }
      return spl
    },
    totalDynamicPartitionSize(): number {
      const groups = this.payload?.manifest?.dynamicPartitionMetadata?.groups
      if (!groups) {
        return 0
      }
      const dynamicPartitionNamess = new Set(
        groups.flatMap(g => g.partitionNames)
      )
      const dynamicPartitions =
        this.payload.manifest?.partitions.filter(p =>
          dynamicPartitionNamess.has(p.partitionName)
        ) || []
      if (dynamicPartitions.length <= 0) {
        return 0
      }
      return dynamicPartitions
        .map(p => p.newPartitionInfo?.size || 0)
        .reduce((acc, cur) => acc + cur)
    }
  }
})
</script>

<style scoped>
.align strong {
  display: inline-block;
  width: 50%;
  position: relative;
  padding-right: 10px; /* Ensures colon does not overlay the text */
  text-align: right;
}

.align strong::after {
  content: ':';
}

li {
  list-style-type: none;
}

.wrap {
  width: 50%;
  display: inline-block;
  white-space: pre-wrap;
  word-break: break-all;
  font-family: inherit;
}
</style>
