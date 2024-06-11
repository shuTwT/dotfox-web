<template>
  <el-form size="small">
    <el-form-item>
      <el-radio v-model="radioValue" :label="1">
        分钟，允许的通配符[, - * /]
      </el-radio>
    </el-form-item>

    <el-form-item>
      <el-radio v-model="radioValue" :label="2">
        周期从
        <el-input-number v-model="cycle01" :min="0" :max="60" /> -
        <el-input-number v-model="cycle02" :min="0" :max="60" /> 分钟
      </el-radio>
    </el-form-item>

    <el-form-item>
      <el-radio v-model="radioValue" :label="3">
        从
        <el-input-number v-model="average01" :min="0" :max="60" /> 分钟开始，每
        <el-input-number v-model="average02" :min="0" :max="60" /> 分钟执行一次
      </el-radio>
    </el-form-item>

    <el-form-item>
      <el-radio v-model="radioValue" :label="4">
        指定
        <el-select
          clearable
          v-model="checkboxList"
          placeholder="可多选"
          multiple
          style="width: 100%"
        >
          <el-option v-for="item in 60" :key="item" :value="item - 1">{{
            item - 1
          }}</el-option>
        </el-select>
      </el-radio>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
defineOptions({
  name: "CrontabMin"
});
const props = defineProps(["check", "cron"]);
const emit = defineEmits(["update"]);

const radioValue = ref<number | string>(1);
const cycle01 = ref(1);
const cycle02 = ref(2);
const average01 = ref(0);
const average02 = ref(1);
const checkboxList = ref([]);
const checkNum = props.check;

// 计算两个周期值
const cycleTotal = computed(() => {
  cycle01.value = checkNum(cycle01.value, 0, 59);
  cycle02.value = checkNum(cycle02.value, 0, 59);
  return cycle01.value + "-" + cycle02.value;
});
// 计算平均用到的值
const averageTotal = computed(() => {
  average01.value = checkNum(average01.value, 0, 59);
  average02.value = checkNum(average02.value, 1, 59);
  return average01.value + "/" + average02.value;
});
// 计算勾选的checkbox值合集
const checkboxString = computed(() => {
  let str = checkboxList.value.join();
  return str == "" ? "*" : str;
});

// 单选按钮值变化时
function radioChange() {
  if (radioValue.value !== 1 && props.cron.second === "*") {
    emit("update", "second", "0", "min");
  }
  switch (radioValue.value) {
    case 1:
      emit("update", "min", "*", "min");
      emit("update", "hour", "*", "min");
      break;
    case 2:
      emit("update", "min", cycle01.value + "-" + cycle02.value, "min");
      break;
    case 3:
      emit("update", "min", average01.value + "/" + average02.value, "min");
      break;
    case 4:
      emit("update", "min", checkboxString.value, "min");
      break;
  }
}
// 周期两个值变化时
function cycleChange() {
  if (radioValue.value == "2") {
    emit("update", "min", cycleTotal.value, "min");
  }
}
// 平均两个值变化时
function averageChange() {
  if (radioValue.value == "3") {
    emit("update", "min", averageTotal.value, "min");
  }
}
// checkbox值变化时
function checkboxChange() {
  if (radioValue.value == "4") {
    emit("update", "min", checkboxString.value, "min");
  }
}

watch(radioValue,radioChange)
watch(cycleTotal,cycleChange)
watch(averageTotal,averageChange)
watch(checkboxString,checkboxChange)
</script>
