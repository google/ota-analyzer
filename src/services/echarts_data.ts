/**
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { EChartsOption } from 'echarts'

export class EchartsData {
  statisticData: Map<string, number>
  trimmedData: Map<string, string>
  title: string
  unit: string
  maximumEntries: number
  /**
   * Given a set of [key, value] pairs and title, create an object for further
   * usage in Vue-Echarts.
   * @param {Map} statisticData
   * @param {String} title
   * @param {String} unit
   * @param {Number} maximumEntries
   */
  constructor(
    statisticData: Map<string, number>,
    title: string,
    unit: string,
    maximumEntries = 15
  ) {
    this.statisticData = statisticData
    this.trimmedData = trimMap(statisticData, maximumEntries)
    this.title = title
    this.unit = unit
    this.maximumEntries = maximumEntries
  }

  /**
   * Convert the raw data into a string.
   * @return {String} A list of [key, value].
   */
  listData() {
    let /** String */ table = ''
    for (let [key, value] of this.statisticData) {
      table += key + ' : ' + value.toString() + ' Blocks' + '\n'
    }
    return table
  }

  /**
   * Generate necessary parameters (option) for vue-echarts.
   * Format of the parameters can be found here:
   * https://echarts.apache.org/en/option.html
   * @param {String} unit
   * @return {Object} an ECharts option object.
   */
  getEchartsOption(): EChartsOption {
    let /** Object */ option: EChartsOption = {}
    option.title = {
      text: this.title,
      left: 'center'
    }
    option.tooltip = {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ' + this.unit + ' ({d}%)'
    }
    option.legend = {
      orient: 'horizontal',
      left: 'top',
      top: '10%',
      data: Array.from(this.trimmedData.keys())
    }
    option.series = [
      {
        name: this.title,
        type: 'pie',
        radius: '55%',
        center: ['50%', '60%'],
        data: Array.from(this.trimmedData).map((pair: any) => {
          return { value: pair[1], name: pair[0] }
        }),
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
    return option
  }
}

/**
 * When there are too many entries in the map, the pie chart can be very
 * crowded. This function will return the entries that have high values.
 * Specifically, the top <maximumEntries> will be stored and the others
 * will be added into an entry called 'other'.
 * @param {Map} map
 * @param {Number} maximumEntries
 * @return {Map}
 */
function trimMap(map: Map<string, any>, maximumEntries: number) {
  if (map.size <= maximumEntries) return map
  let /** Map */ new_map = new Map()
  for (let i = 0; i < maximumEntries; i++) {
    let /** Number */ curr = 0
    let /** String */ currKey = ''
    for (let [key, value] of map) {
      if (!new_map.get(key)) {
        if (value > curr) {
          curr = value
          currKey = key
        }
      }
    }
    new_map.set(currKey, curr)
  }
  let /** Number */ restTotal = 0
  for (let [key, value] of map) {
    if (!new_map.get(key)) {
      restTotal += value
    }
  }
  new_map.set('other', restTotal)
  return new_map
}
