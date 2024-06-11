<template>
  <el-form size="small">
    <el-form-item>
      <el-radio v-model="radioValue" :label="1">
        月，允许的通配符[, - * /]
      </el-radio>
    </el-form-item>

    <el-form-item>
      <el-radio v-model="radioValue" :label="2">
        周期从
        <el-input-number v-model="cycle01" :min="1" :max="12" /> -
        <el-input-number v-model="cycle02" :min="1" :max="12" /> 月
      </el-radio>
    </el-form-item>

    <el-form-item>
      <el-radio v-model="radioValue" :label="3">
        从
        <el-input-number v-model="average01" :min="1" :max="12" /> 月开始，每
        <el-input-number v-model="average02" :min="1" :max="12" /> 月月执行一次
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
          <el-option v-for="item in 12" :key="item" :value="item">{{
            item
          }}</el-option>
        </el-select>
      </el-radio>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
defineOptions({
  name: "CrontabMouth"
});
const props = defineProps(["check", "cron"]);
const emit = defineEmits(["update"]);

const radioValue = ref<number | string>(1);
const cycle01 = ref(1);
const cycle02 = ref(2);
const average01 = ref(1);
const average02 = ref(1);
const checkboxList = ref([]);
const checkNum = props.check;

// 计算两个周期值
const cycleTotal = computed(() => {
  cycle01.value = checkNum(cycle01.value, 1, 12);
  cycle02.value = checkNum(cycle02.value, 1, 12);
  return cycle01.value + "-" + cycle02.value;
});
// 计算平均用到的值
const averageTotal = computed(() => {
  average01.value = checkNum(average01.value, 1, 12);
  average02.value = checkNum(average02.value, 1, 12);
  return average01.value + "/" + average02.value;
});
// 计算勾选的checkbox值合集
const checkboxString = computed(() => {
  let str = checkboxList.value.join();
  return str == "" ? "*" : str;
});

// 单选按钮值变化时
function radioChange() {
  if (radioValue.value === 1) {
    emit("update", "mouth", "*");
    emit("update", "year", "*");
  } else {
    if (props.cron.day === "*") {
      emit("update", "day", "0", "mouth");
    }
    if (props.cron.hour === "*") {
      emit("update", "hour", "0", "mouth");
    }
    if (props.cron.min === "*") {
      emit("update", "min", "0", "mouth");
    }
    if (props.cron.second === "*") {
      emit("update", "second", "0", "mouth");
    }
  }
  switch (radioValue.value) {
    case 2:
      emit("update", "mouth", cycle01.value + "-" + cycle02.value);
      break;
    case 3:
      emit("update", "mouth", average01.value+ "/" + average02.value);
      break;
    case 4:
      emit("update", "mouth", checkboxString.value);
      break;
  }
}
// 周期两个值变化时
function cycleChange() {
  if (this.radioValue == "2") {
    emit("update", "mouth", cycleTotal.value);
  }
}
// 平均两个值变化时
function averageChange() {
  if (this.radioValue == "3") {
    emit("update", "mouth", averageTotal.value);
  }
}
// checkbox值变化时
function checkboxChange() {
  if (this.radioValue == "4") {
    emit("update", "mouth", checkboxString.value);
  }
}

watch(radioValue,radioChange)
watch(cycleTotal,cycleChange)
watch(averageTotal,averageChange)
watch(checkboxString,checkboxChange)
</script>
