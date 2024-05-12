import { store } from "@/store";
import { defineStore } from "pinia";
import type { dictType } from "../types";

export const useDictStore = defineStore({
  id: "pure-dict",
  state: (): dictType => ({
    dict: []
  }),
  actions: {
    getDict(dictType: string) {
      const dicts = this.dict.filter(item => item.dictType == dictType);
      if (dicts.length > 0) {
        return dicts[0]?.dictData;
      } else {
        throw "find dict by dictType failed";
      }
    },
    setDict(dictType: string, dictData: object) {
      if (dictType !== null && dictType !== "") {
        this.dict.push({ dictType, dictData });
      }
    },
    removeDict(dictType: string) {
      for (const key in this.dict) {
        const element = this.dict[key];
        if (element.dictType == dictType) {
          this.dict.splice(key, 1);
          return true;
        }
      }
      return false;
    },
    clearDict() {
      this.dict = [];
    }
  }
});

export function useDictStoreHook() {
  return useDictStore(store);
}
