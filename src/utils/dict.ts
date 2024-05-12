import { getSystemDictDataList } from "@/api/system";
import { useDictStore } from "@/store/modules/dict";
import { ref, toRefs } from "vue";

export function useDict(...args: any[]) {
  const res = ref<Record<string, any[]>>({});
  args.forEach(dictType => {
    res.value[dictType] = [];
    const dicts = useDictStore().getDict(dictType);
    if (dicts) {
      res.value[dictType] = dicts;
    } else {
      getSystemDictDataList({ dictType }).then(resp => {
        res.value[dictType] = resp.data.map(p => ({
          label: p.dictLabel,
          value: p.dictValue
        }));
        useDictStore().setDict(dictType, res.value[dictType]);
      });
    }
  });

  /**
   * @description 通过字典code获取字典label
   * @param val 字典code
   * @param dictType 字典类型
   * @param defaultVal 默认值
   * @returns
   */
  function getLabelByCode(val: string, dictType: string, defaultVal = "") {
    const dictDataList = res.value[dictType];
    let dictLabel: string;
    dictDataList.map(item => {
      if (item.code == val) {
        dictLabel = item.label;
      }
    });
    return dictLabel ?? defaultVal;
  }

  function getCodeByLabel(val: string, dictType: string, defaultVal = "") {
    const dictDataList = res.value[dictType];
    let dictCode: string;
    dictDataList.map(item => {
      if (item.label == val) {
        dictCode = item.value;
      }
    });
    return dictCode ?? defaultVal;
  }

  function getLabelsByCodes(vals: string[], dictType: string): string[];
  function getLabelsByCodes(vals: string, dictType: string): string[];
  function getLabelsByCodes(vals: string | string[], dictType: string) {
    const dictDataList = res.value[dictType];
    let dictLabels: string[];
    if (typeof vals == "string") {
      vals = vals.split(",");
    }
    vals.map(val => {
      dictDataList.map(item => {
        if (item.label == val) {
          dictLabels.push(item.label);
        }
      });
    });
    return dictLabels;
  }

  function getCodesByLabels(vals: string | string[], dictType: string) {
    const dictDataList = res.value[dictType];
    let dictCodes: string[];
    if (typeof vals == "string") {
      vals = vals.split(",");
    }
    vals.map(val => {
      dictDataList.map(item => {
        if (item.label == val) {
          dictCodes.push(item.value);
        }
      });
    });
    return dictCodes;
  }

  /**
   *
   * @param dictTypes 字典类型数组,可以传字符串数组也可以传`,`分隔的字符串(不推荐)
   * @returns
   */
  function getDictObjByDictTypes(dictTypes: string[]): any[];
  /**
   *
   * @param dictTypes 字典类型数组,可以传字符串数组也可以传`,`分隔的字符串(不推荐)
   * @returns
   */
  function getDictObjByDictTypes(dictTypes: string): any[];
  function getDictObjByDictTypes(dictTypes: string | string[]) {
    const dictDataObj = [];
    if (typeof dictTypes == "string") {
      dictTypes = dictTypes.split(",");
    }

    dictTypes.map(dictType => {
      if (Reflect.has(res.value, dictType)) {
        dictDataObj[dictType] = res.value[dictType];
      } else {
        console.warn(`there is no dict with dictType ${dictType}`);
      }
    });
    return dictDataObj;
  }

  return {
    ...toRefs(res.value),
    getLabelByCode,
    getCodeByLabel,
    getLabelsByCodes,
    getCodesByLabels,
    getDictObjByDictTypes
  };
}
