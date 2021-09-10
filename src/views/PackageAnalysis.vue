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
  <v-row>
    <v-col cols="12" md="6">
      <BaseFile
        label="Please drag and drop an OTA package or Select one"
        @file-select="unpackOTA"
      />
      <PayloadDetail
        v-if="zipFile && payload"
        :zipFile="zipFile"
        :payload="payload"
      />
    </v-col>
    <v-divider vertical />
    <v-col cols="12" md="6">
      <PayloadComposition
        v-if="zipFile && payload.manifest"
        :manifest="payload.manifest"
      />
    </v-col>
  </v-row>
</template>

<script>
import BaseFile from '../components/BaseFile.vue'
import PayloadDetail from '../components/PayloadDetail.vue'
import PayloadComposition from '../components/PayloadComposition.vue'
import { Payload } from '../services/payload'

export default {
  components: {
    BaseFile,
    PayloadDetail,
    PayloadComposition
  },
  data() {
    return {
      zipFile: null,
      payload: null
    }
  },
  methods: {
    async unpackOTA(files) {
      this.zipFile = files[0]
      try {
        this.payload = new Payload(this.zipFile)
        await this.payload.init()
      } catch (err) {
        alert('Please check if this is a correct OTA package (.zip).')
        console.log(err)
      }
    }
  }
}
</script>
