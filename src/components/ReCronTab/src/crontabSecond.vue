<template>
  <el-form size="small">
    <el-form-item>
      <el-radio v-model="radioValue" :label="1">
        秒，允许的通配符[, - * /]
      </el-radio>
    </el-form-item>

    <el-form-item>
      <el-radio v-model="radioValue" :label="2">
        周期从
        <el-input-number v-model="cycle01" :min="0" :max="60" /> -
        <el-input-number v-model="cycle02" :min="0" :max="60" /> 秒
      </el-radio>
    </el-form-item>

    <el-form-item>
      <el-radio v-model="radioValue" :label="3">
        从
        <el-input-number v-model="average01" :min="0" :max="60" /> 秒开始，每
        <el-input-number v-model="average02" :min="0" :max="60" /> 秒执行一次
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
import { ref, onMounted, computed, watch } from "vue";
defineOptions({
  name: "CrontabSecond"
});
const props = defineProps(["check", "radioParent"]);
const emit = defineEmits(["update"]);

const radioValue = ref<number|string>(1);
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
  switch (radioValue.value) {
    case 1:
      emit("update", "second", "*", "second");
      emit("update", "min", "*", "second");
      break;
    case 2:
      emit("update", "second", cycle01.value + "-" + cycle02.value);
      break;
    case 3:
      emit("update", "second", average01.value + "/" + average02.value);
      break;
    case 4:
      emit("update", "second", checkboxString.value);
      break;
  }
}
// 周期两个值变化时
function cycleChange() {
  if (radioValue.value == "2") {
    emit("update", "second", cycleTotal.value);
  }
}
// 平均两个值变化时
function averageChange() {
  if (radioValue.value == "3") {
    emit("update", "second", averageTotal.value);
  }
}
// checkbox值变化时
function checkboxChange() {
  if (radioValue.value == "4") {
    emit("update", "second", checkboxString.value);
  }
}

watch(radioValue,radioChange)
watch(cycleTotal,cycleChange)
watch(averageTotal,averageChange)
watch(checkboxString,checkboxChange)
watch(props.radioParent,()=>{
  radioValue.value=props.radioParent
})
</script>
