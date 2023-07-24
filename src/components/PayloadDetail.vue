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
  <v-btn
    class="download-btn"
    v-if="zipFile && payload"
    @click="exportOTAPackage"
    >Export Metadata</v-btn
  >
  <a ref="download" />
  <BasicInfo :zipFile="zipFile" :payload="payload" class="mb-5" />
  <v-divider />
  <div v-if="payload">
    <h3>Partition List</h3>
    <v-row v-if="payload.manifest" class="mb-5">
      <v-col
        v-for="partition in payload.manifest.partitions"
        :key="partition.partitionName"
        cols="12"
        md="4"
      >
        <v-card elevation="5" hover shaped class="partial-info">
          <PartitionDetail
            :partition="partition"
            :dynamicPartitionList="dynamicPartitions"
          />
        </v-card>
      </v-col>
    </v-row>
    <v-divider />
    <div
      v-if="!payload.manifest.nonAB && payloadHash"
    >
      <h3>Payload SHA256 Hash</h3>
      <span style="text-align: center; display: block;">
        {{ payloadHash }}
      </span>
    </div>
    <v-divider />
    <div
      v-if="payload.metadata_signature && !payload.manifest.nonAB"
      class="signature"
    >
      <h3>Metadata Signature</h3>
      <span style="white-space: pre-wrap">
        {{ octToHex(payload.metadata_signature.signatures[0].data) }}
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import PartitionDetail from './PartitionDetail.vue'
import BasicInfo from './BasicInfo.vue'
import { Payload, octToHex } from '../services/payload'
import {
  downloadFile,
  ensureSuffix,
  trimOTAPackage,
  ZipFile
} from '@/services/trim_zip'
import { defineComponent } from 'vue'

export default defineComponent({
  components: {
    PartitionDetail,
    BasicInfo
  },
  props: {
    zipFile: {
      type: ZipFile,
      default: null
    },
    payload: {
      type: Payload,
      default: null
    }
  },
  methods: {
    octToHex: octToHex,
    async exportOTAPackage() {
      const blob = await trimOTAPackage(this.payload as Payload)
      const downloadNode = this.$refs['download'] as HTMLAnchorElement
      downloadFile(
        blob,
        downloadNode,
        'trimmed_' + ensureSuffix(this.zipFile.getFileName(), '.zip')
      )
    }
  },
  computed: {
    dynamicPartitions(): string[] {
      return (
        this.payload.manifest?.dynamicPartitionMetadata?.groups?.flatMap(
          g => g.partitionNames || []
        ) || []
      )
    },
    payloadHash(): string {
      const hash = this.payload?.getPayloadHash();
      if (!hash) {
        return "";
      }
      return octToHex(hash, false);
    },
  }
})
</script>

<style scoped>
.signature {
  overflow: scroll;
  height: 200px;
  width: 100%;
  word-break: break-all;
  text-align: center;
}

.partial-info {
  padding: 5px;
}

.download-btn {
  text-align: center;
  justify-content: center;
  display: flex;
  align-content: center;
  margin: 0 auto;
}
</style>
