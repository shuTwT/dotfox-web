<template>
  <el-form size="small">
    <el-form-item>
      <el-radio v-model="radioValue" :label="1">
        周，允许的通配符[, - * / L #]
      </el-radio>
    </el-form-item>

    <el-form-item>
      <el-radio v-model="radioValue" :label="2"> 不指定 </el-radio>
    </el-form-item>

    <el-form-item>
      <el-radio v-model="radioValue" :label="3">
        周期从星期
        <el-input-number v-model="cycle01" :min="1" :max="7" /> -
        <el-input-number v-model="cycle02" :min="1" :max="7" />
      </el-radio>
    </el-form-item>

    <el-form-item>
      <el-radio v-model="radioValue" :label="4">
        第
        <el-input-number v-model="average01" :min="1" :max="4" /> 周的星期
        <el-input-number v-model="average02" :min="1" :max="7" />
      </el-radio>
    </el-form-item>

    <el-form-item>
      <el-radio v-model="radioValue" :label="5">
        本月最后一个星期
        <el-input-number v-model="weekday" :min="1" :max="7" />
      </el-radio>
    </el-form-item>

    <el-form-item>
      <el-radio v-model="radioValue" :label="6">
        指定
        <el-select
          clearable
          v-model="checkboxList"
          placeholder="可多选"
          multiple
          style="width: 100%"
        >
          <el-option
            v-for="(item, index) of weekList"
            :key="index"
            :value="index + 1"
            >{{ item }}</el-option
          >
        </el-select>
      </el-radio>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from "vue";

defineOptions({
  name: "CrontabWeek",
});
const props = defineProps(["check", "cron"]);
const emit = defineEmits(["update"]);

const radioValue = ref<number|string>(2);
const weekday = ref(1);
const cycle01 = ref(1);
const cycle02 = ref(2);
const average01 = ref(1);
const average02 = ref(1);
const checkboxList = ref([]);
const weekList = ref(["周一", "周二", "周三", "周四", "周五", "周六", "周日"]);
const checkNum = props.check;

// 计算两个周期值
const cycleTotal = computed(() => {
  cycle01.value = checkNum(cycle01.value, 1, 7);
  cycle02.value = checkNum(cycle02.value, 1, 7);
  return cycle01.value + "-" + cycle02.value;
});
// 计算平均用到的值
const averageTotal = computed(() => {
  average01.value = checkNum(average01.value, 1, 4);
  average02.value = checkNum(average02.value, 1, 7);
  return average01.value + "#" + average02.value;
});
// 最近的工作日（格式）
const weekdayCheck = computed(() => {
  weekday.value = checkNum(weekday.value, 1, 7);
  return weekday.value;
});
// 计算勾选的checkbox值合集
const checkboxString = computed(() => {
  let str = checkboxList.value.join();
  return str == "" ? "*" : str;
});

// 单选按钮值变化时
function radioChange() {
  if (radioValue.value === 1) {
    emit("update", "week", "*");
    emit("update", "year", "*");
  } else {
    if (props.cron.mouth === "*") {
      emit("update", "mouth", "0", "week");
    }
    if (props.cron.day === "*") {
      emit("update", "day", "0", "week");
    }
    if (props.cron.hour === "*") {
      emit("update", "hour", "0", "week");
    }
    if (props.cron.min === "*") {
      emit("update", "min", "0", "week");
    }
    if (props.cron.second === "*") {
      emit("update", "second", "0", "week");
    }
  }
  switch (radioValue.value) {
    case 2:
      emit("update", "week", "?");
      break;
    case 3:
      emit("update", "week", cycle01.value + "-" + cycle02.value);
      break;
    case 4:
      emit("update", "week", average01.value + "#" + average02.value);
      break;
    case 5:
      emit("update", "week", weekday.value + "L");
      break;
    case 6:
      emit("update", "week", checkboxString.value);
      break;
  }
}
// 根据互斥事件，更改radio的值

// 周期两个值变化时
function cycleChange() {
  if (radioValue.value == "3") {
    emit("update", "week", cycleTotal.value);
  }
}
// 平均两个值变化时
function averageChange() {
  if (radioValue.value == "4") {
    emit("update", "week", averageTotal.value);
  }
}
// 最近工作日值变化时
function weekdayChange() {
  if (radioValue.value == "5") {
    emit("update", "week", weekday.value + "L");
  }
}
// checkbox值变化时
function checkboxChange() {
  if (radioValue.value == "6") {
    emit("update", "week", checkboxString.value);
  }
}

watch(radioValue, radioChange);
watch(cycleTotal, cycleChange);
watch(averageTotal, averageChange);
watch(weekdayCheck, weekdayChange);
watch(checkboxString, checkboxChange);


</script>
