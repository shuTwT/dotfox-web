<template>
  <el-form size="small">
    <el-form-item>
      <el-radio :label="1" v-model="radioValue">
        不填，允许的通配符[, - * /]
      </el-radio>
    </el-form-item>

    <el-form-item>
      <el-radio :label="2" v-model="radioValue"> 每年 </el-radio>
    </el-form-item>

    <el-form-item>
      <el-radio :label="3" v-model="radioValue">
        周期从
        <el-input-number v-model="cycle01" :min="fullYear" /> -
        <el-input-number v-model="cycle02" :min="fullYear" />
      </el-radio>
    </el-form-item>

    <el-form-item>
      <el-radio :label="4" v-model="radioValue">
        从
        <el-input-number v-model="average01" :min="fullYear" /> 年开始，每
        <el-input-number v-model="average02" :min="fullYear" /> 年执行一次
      </el-radio>
    </el-form-item>

    <el-form-item>
      <el-radio :label="5" v-model="radioValue">
        指定
        <el-select
          clearable
          v-model="checkboxList"
          placeholder="可多选"
          multiple
        >
          <el-option
            v-for="item in 9"
            :key="item"
            :value="item - 1 + fullYear"
            :label="item - 1 + fullYear"
          />
        </el-select>
      </el-radio>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";

defineOptions({
  name: "CrontabYear"
});

const props = defineProps(["check", "mouth", "cron"]);
const emit = defineEmits(["update"]);

const fullYear = ref(0);
const radioValue = ref<number | string>(1);
const cycle01 = ref(0);
const cycle02 = ref(0);
const average01 = ref(0);
const average02 = ref(1);
const checkboxList = ref([]);
const checkNum = props.check;

// 计算两个周期值
const cycleTotal = computed(() => {
  cycle01.value = checkNum(cycle01.value, fullYear.value, fullYear.value + 100);
  cycle02.value = checkNum(
    cycle02.value,
    fullYear.value + 1,
    fullYear.value + 101
  );
  return cycle01.value + "-" + cycle02.value;
});
// 计算平均用到的值
const averageTotal = computed(() => {
  average01.value = checkNum(
    average01.value,
    fullYear.value,
    fullYear.value + 100
  );
  average02.value = checkNum(average02.value, 1, 10);
  return average01.value + "/" + average02.value;
});
// 计算勾选的checkbox值合集
const checkboxString = computed(() => {
  let str = checkboxList.value.join();
  return str;
});

// 单选按钮值变化时
function radioChange() {
  if (props.cron.mouth === "*") {
    emit("update", "mouth", "0", "year");
  }
  if (props.cron.day === "*") {
    emit("update", "day", "0", "year");
  }
  if (props.cron.hour === "*") {
    emit("update", "hour", "0", "year");
  }
  if (props.cron.min === "*") {
    emit("update", "min", "0", "year");
  }
  if (props.cron.second === "*") {
    emit("update", "second", "0", "year");
  }
  switch (radioValue.value) {
    case 1:
      emit("update", "year", "");
      break;
    case 2:
      emit("update", "year", "*");
      break;
    case 3:
      emit("update", "year", cycle01.value + "-" + cycle02.value);
      break;
    case 4:
      emit("update", "year", average01.value + "/" + average02.value);
      break;
    case 5:
      emit("update", "year", checkboxString.value);
      break;
  }
}
// 周期两个值变化时
function cycleChange() {
  if (radioValue.value == "3") {
    emit("update", "year", cycleTotal.value);
  }
}
// 平均两个值变化时
function averageChange() {
  if (radioValue.value == "4") {
    emit("update", "year", averageTotal.value);
  }
}
// checkbox值变化时
function checkboxChange() {
  if (radioValue.value == "5") {
    emit("update", "year", checkboxString.value);
  }
}
watch(radioValue, radioChange)
watch(cycleTotal, cycleChange)
watch(averageTotal, averageChange)
watch(checkboxString, checkboxChange)
onMounted(()=>{
  // 仅获取当前年份
  fullYear.value = Number(new Date().getFullYear());
})
</script>
