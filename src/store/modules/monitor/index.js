import { defineStore } from 'pinia'

export const useMonitorStore = defineStore('monitor', {
  state() {
    return {
      BO_MIDDLE_DATA_01: [],
      BO_MIDDLE_DATA_02_1: [],
      BO_MIDDLE_DATA_02_2: [],
      BO_MIDDLE_DATA_03: [],
      BO_RIGHT_DATA_01: [],
      BO_RIGHT_DATA_02: [],
      BO_RIGHT_DATA_03: [],
      BO_LEFT_DATA_01: [],
      BO_LEFT_DATA_02: [],
      BO_LEFT_DATA_03: [],

      DS_LEFT_DATA_01: [],
      DS_LEFT_DATA_02: [],
      DS_LEFT_DATA_03_1: [],
      DS_LEFT_DATA_03_2: [],
      DS_RIGHT_DATA_01: [],
      DS_RIGHT_DATA_02: [],
      DS_RIGHT_DATA_03: [],

      DRS_LEFT_DATA_01: [],
      DRS_RIGHT_DATA_01: [],
      DRS_RIGHT_DATA_02: [],
      DRS_RIGHT_DATA_03: [],
      DRS_MIDDLE_DATA_01: [],
      DRS_MIDDLE_DATA_02: [],
      DRS_MIDDLE_DATA_03: [],
    }
  },
  actions: {
    SET_BO_LEFT_DATA_01(data) {
      this.BO_LEFT_DATA_01 = data
    },
    SET_BO_LEFT_DATA_02(data) {
      this.BO_LEFT_DATA_02 = data
    },
    SET_BO_LEFT_DATA_03(data) {
      this.BO_LEFT_DATA_03 = data
    },
    SET_BO_MIDDLE_DATA_01(data) {
      this.BO_MIDDLE_DATA_01 = data
    },
    SET_BO_MIDDLE_DATA_02_1(data) {
      this.BO_MIDDLE_DATA_02_1 = data
    },
    SET_BO_MIDDLE_DATA_02_2(data) {
      this.BO_MIDDLE_DATA_02_2 = data
    },
    SET_BO_MIDDLE_DATA_03(data) {
      this.BO_MIDDLE_DATA_03 = data
    },
    SET_BO_RIGHT_DATA_01(data) {
      this.BO_RIGHT_DATA_01 = data
    },
    SET_BO_RIGHT_DATA_02(data) {
      this.BO_RIGHT_DATA_02 = data
    },
    SET_BO_RIGHT_DATA_03(data) {
      this.BO_RIGHT_DATA_03 = data
    },

    SET_DS_LEFT_DATA_01(data) {
      this.DS_LEFT_DATA_01 = data
    },
    SET_DS_LEFT_DATA_02(data) {
      this.DS_LEFT_DATA_02 = data
    },
    SET_DS_LEFT_DATA_03_1(data) {
      this.DS_LEFT_DATA_03_1 = data
    },
    SET_DS_LEFT_DATA_03_2(data) {
      this.DS_LEFT_DATA_03_2 = data
    },
    SET_DS_RIGHT_DATA_01(data) {
      this.DS_RIGHT_DATA_01 = data
    },
    SET_DS_RIGHT_DATA_02(data) {
      this.DS_RIGHT_DATA_02 = data
    },
    SET_DS_RIGHT_DATA_03(data) {
      this.DS_RIGHT_DATA_03 = data
    },

    SET_DRS_LEFT_DATA_01(data) {
      this.DRS_LEFT_DATA_01 = data
    },
    SET_DRS_RIGHT_DATA_01(data) {
      this.DRS_RIGHT_DATA_01 = data
    },
    SET_DRS_RIGHT_DATA_02(data) {
      this.DRS_RIGHT_DATA_02 = data
    },
    SET_DRS_RIGHT_DATA_03(data) {
      this.DRS_RIGHT_DATA_03 = data
    },
    SET_DRS_MIDDLE_DATA_01(data) {
      this.DRS_MIDDLE_DATA_01 = data
    },
    SET_DRS_MIDDLE_DATA_02(data) {
      this.DRS_MIDDLE_DATA_02 = data
    },
    SET_DRS_MIDDLE_DATA_03(data) {
      this.DRS_MIDDLE_DATA_03 = data
    },
  },
})
