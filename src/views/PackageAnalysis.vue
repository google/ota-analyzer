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
    <v-alert style="color: yellow;">
      Your files will not be uploaded anywhere. All analysis are done in the frontend using Javascript.
    </v-alert>
  </v-row>
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
        v-if="zipFile && payload && payload.manifest"
        :manifest="payload.manifest"
      />
    </v-col>
  </v-row>
</template>

<script lang="ts">
import BaseFile from '../components/BaseFile.vue'
import PayloadDetail from '../components/PayloadDetail.vue'
import PayloadComposition from '../components/PayloadComposition.vue'
import { Payload } from '../services/payload'
import { defineComponent } from 'vue'
import { ZipFile } from '@/services/trim_zip'

export default defineComponent({
  components: {
    BaseFile,
    PayloadDetail,
    PayloadComposition
  },
  data() {
    return ({
      zipFile: null,
      payload: null
    } as unknown) as {
      zipFile: ZipFile
      payload: Payload
    }
  },
  methods: {
    async unpackOTA(file: File | URL) {
      this.zipFile = new ZipFile(file)
      try {
        const payload = new Payload(this.zipFile as ZipFile);
        await payload.init();
        this.payload = payload;
      } catch (err) {
        alert(`Please check if this is a correct OTA package (.zip). ${err}`)
        console.log(err)
      }
    }
  }
})
</script>
