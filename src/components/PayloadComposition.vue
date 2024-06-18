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
  <v-btn v-if="targetFile" block class="md-6" @click="exportTargetFileMetadata"
    >Export Target File Metadata</v-btn
  >
  <a ref="download" />
  <PartialCheckbox v-model="partitionInclude" :labels="updatePartitions" />
  <div v-if="echartsData">
    <PieChart :echartsData="echartsData" @click="piechartClick" />
  </div>
  <v-divider />
  <v-row>
    <v-col cols="12" md="4">
      <v-btn block @click="updateChart('blocks')">
        Analyse Installed Blocks (in target build)
      </v-btn>
    </v-col>
    <v-col cols="12" md="4">
      <v-btn block @click="updateChart('payload')">
        Analyse Payload Composition
      </v-btn>
    </v-col>
    <v-col cols="12" md="4">
      <v-btn block @click="updateChart('partitions')">
        Analyse Partition Payload Composition
      </v-btn>
    </v-col>
  </v-row>
  <v-row>
    <v-col cols="12" md="4" class="tooltip">
      <v-btn
        :disabled="
          manifest.nonAB || !manifest.dynamicPartitionMetadata || !manifest.dynamicPartitionMetadata.vabcEnabled
        "
        title="Only available for VABC update"
        block
        @click="updateChart('COWmerge')"
      >
        Analyse COW Merge Operations
      </v-btn>
      <span v-if="manifest.nonAB" class="tooltiptext">
        This function is only supported in A/B OTA
      </span>
    </v-col>
    <v-col cols="12" md="4">
      <v-btn block :disabled="!targetFile" @click="updateChart('filenames')">
        Analyse Filenames
      </v-btn>
    </v-col>
    <v-col cols="12" md="4">
      <v-btn block :disabled="!targetFile" @click="updateChart('extensions')">
        Analyse File Extensions
      </v-btn>
    </v-col>
  </v-row>
  <v-row>
    <v-col cols="12" md="6" />
    <v-col cols="12" md="6">
      <BaseFile
        v-if="!demo"
        label="Drag and drop or Select The target Android build"
        @file-select="selectBuild"
      />
    </v-col>
  </v-row>
</template>

<script lang="ts">
import axios from 'axios'
import PartialCheckbox from './PartialCheckbox.vue'
import PieChart from './PieChart.vue'
import BaseFile from './BaseFile.vue'
import { analysePartitions } from '../services/payload_composition'
import { chromeos_update_engine as update_metadata_pb } from '../services/update_metadata_pb'
import { TooltipComponentPositionCallbackParams } from 'echarts'
import { EchartsData } from '@/services/echarts_data'
import { defineComponent } from 'vue'
import {
  downloadFile,
  ensureSuffix,
  getFileName,
  trimTargetFiles
} from '@/services/trim_zip'

interface ComponentState {
  partitionInclude: Map<string, boolean>
  echartsData: EchartsData | null
  listData: string
  targetFile: File | URL | null
}

export default defineComponent({
  components: {
    PartialCheckbox,
    PieChart,
    BaseFile
  },
  props: {
    manifest: {
      type: update_metadata_pb.DeltaArchiveManifest,
      default: () => []
    },
    demo: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      partitionInclude: new Map(),
      echartsData: null,
      listData: '',
      targetFile: null
    } as ComponentState
  },
  computed: {
    updatePartitions(): string[] {
      return this.manifest.partitions.map(
        (partition: update_metadata_pb.IPartitionUpdate) => {
          return partition.partitionName
        }
      )
    }
  },
  async mounted() {
    if (this.demo) {
      try {
        const download = await axios.get(
          './files/cf_x86_target_file_demo.zip',
          { responseType: 'blob' }
        )
        this.targetFile = new File([download.data], 'target_demo.zip')
      } catch (err) {
        console.log('Please put a proper example target file in /public/files/')
      }
    }
  },
  methods: {
    piechartClick(param: TooltipComponentPositionCallbackParams) {
      console.log(param)
    },
    async updateChart(metrics: string) {
      let partitionSelected = this.manifest.partitions.filter(partition =>
        this.partitionInclude.get(partition.partitionName)
      )
      try {
        this.echartsData = await analysePartitions(
          metrics,
          partitionSelected,
          this.manifest.blockSize,
          this.targetFile as File
        )
      } catch (err) {
        alert(`Cannot be processed for the following issue: ${err}`)
      }
    },
    selectBuild(file: File | URL) {
      //TODO(lishutong) check the version of target file is same to the OTA target
      this.targetFile = file
    },
    async exportTargetFileMetadata() {
      const blob = await trimTargetFiles(this.targetFile! as File)
      const downloadNode = this.$refs['download'] as HTMLAnchorElement
      downloadFile(
        blob,
        downloadNode,
        'trimmed_' + ensureSuffix(getFileName(this.targetFile! as File), '.zip')
      )
    }
  }
})
</script>

<style scoped>
.list-data {
  text-align: center;
}
.tooltip {
  position: relative;
  display: inline-block;
}

.tooltip .tooltiptext {
  visibility: hidden;
  width: 120px;
  background-color: black;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;
  position: absolute;
  z-index: 1;
}

.tooltip:hover .tooltiptext {
  visibility: visible;
}
</style>
