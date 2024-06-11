<script setup lang="ts">
import { ref, computed, watch } from "vue";

defineOptions({
  name: "CrontabDay"
});
const props = defineProps(["check", "cron"]);
const emit = defineEmits(["update"]);

const radioValue = ref<number|string>(1);
const workday = ref(1);
const cycle01 = ref(1);
const cycle02 = ref(2);
const average01 = ref(1);
const average02 = ref(1);
const checkboxList = ref([]);
const checkNum = props.check;

// 计算两个周期值
const cycleTotal = computed(() => {
  cycle01.value = checkNum(cycle01.value, 1, 31);
  cycle02.value = checkNum(cycle02.value, 1, 31);
  return cycle01.value + "-" + cycle02.value;
});
// 计算平均用到的值
const averageTotal = computed(() => {
  average01.value = checkNum(average01.value, 1, 31);
  average02.value = checkNum(average02.value, 1, 31);
  return average01.value + "/" + average02.value;
});
// 计算工作日格式
const workdayCheck = computed(() => {
  workday.value = checkNum(workday.value, 1, 31);
  return workday.value;
});
// 计算勾选的checkbox值合集
const checkboxString = computed(() => {
  let str = checkboxList.value.join();
  return str == "" ? "*" : str;
});

// 单选按钮值变化时
function radioChange() {
  if (radioValue.value === 1) {
    emit("update", "day", "*", "day");
    emit("update", "week", "?", "day");
    emit("update", "mouth", "*", "day");
  } else {
    if (props.cron.hour === "*") {
      emit("update", "hour", "0", "day");
    }
    if (props.cron.min === "*") {
      emit("update", "min", "0", "day");
    }
    if (props.cron.second === "*") {
      emit("update", "second", "0", "day");
    }
  }

  switch (radioValue.value) {
    case 2:
      emit("update", "day", "?");
      break;
    case 3:
      emit("update", "day", cycle01.value + "-" + cycle02.value);
      break;
    case 4:
      emit("update", "day", average01.value + "/" + average02.value);
      break;
    case 5:
      emit("update", "day", workday.value + "W");
      break;
    case 6:
      emit("update", "day", "L");
      break;
    case 7:
      emit("update", "day", checkboxString.value);
      break;
  }
}
// 周期两个值变化时
function cycleChange() {
  if (radioValue.value == "3") {
    emit("update", "day", cycleTotal.value);
  }
}
// 平均两个值变化时
function averageChange() {
  if (radioValue.value == "4") {
    emit("update", "day", averageTotal.value);
  }
}
// 最近工作日值变化时
function workdayChange() {
  if (radioValue.value == "5") {
    emit("update", "day", workday.value + "W");
  }
}
// checkbox值变化时
function checkboxChange() {
  if (radioValue.value == "7") {
    emit("update", "day", checkboxString.value);
  }
}
// 父组件传递的week发生变化触发
function weekChange() {
  //判断week值与day不能同时为“?”
  if (props.cron.week == "?" && radioValue.value == "2") {
    radioValue.value = "1";
  } else if (props.cron.week !== "?" && radioValue.value != "2") {
    radioValue.value = "2";
  }
}

watch(radioValue, radioChange)
watch(cycleTotal, cycleChange)
watch(averageTotal, averageChange)
watch(workdayCheck, workdayChange)
watch(checkboxString, checkboxChange)

</script>
<template>
  <el-form size="small">
    <el-form-item>
      <el-radio v-model="radioValue" :label="1">
        日，允许的通配符[, - * / L M]
      </el-radio>
    </el-form-item>

    <el-form-item>
      <el-radio v-model="radioValue" :label="2"> 不指定 </el-radio>
    </el-form-item>

    <el-form-item>
      <el-radio v-model="radioValue" :label="3">
        周期从
        <el-input-number v-model="cycle01" :min="0" :max="31" /> -
        <el-input-number v-model="cycle02" :min="0" :max="31" /> 日
      </el-radio>
    </el-form-item>

    <el-form-item>
      <el-radio v-model="radioValue" :label="4">
        从
        <el-input-number v-model="average01" :min="0" :max="31" /> 号开始，每
        <el-input-number v-model="average02" :min="0" :max="31" /> 日执行一次
      </el-radio>
    </el-form-item>

    <el-form-item>
      <el-radio v-model="radioValue" :label="5">
        每月
        <el-input-number v-model="workday" :min="0" :max="31" />
        号最近的那个工作日
      </el-radio>
    </el-form-item>

    <el-form-item>
      <el-radio v-model="radioValue" :label="6"> 本月最后一天 </el-radio>
    </el-form-item>

    <el-form-item>
      <el-radio v-model="radioValue" :label="7">
        指定
        <el-select
          clearable
          v-model="checkboxList"
          placeholder="可多选"
          multiple
          style="width: 100%"
        >
          <el-option v-for="item in 31" :key="item" :value="item">{{
            item
          }}</el-option>
        </el-select>
      </el-radio>
    </el-form-item>
  </el-form>
</template>


