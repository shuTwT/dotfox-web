<template>
  <div>
    <el-tabs type="border-card">
      <el-tab-pane label="秒" v-if="shouldHide('second')">
        <CrontabSecond
          @update="updateContabValue"
          :check="checkNumber"
          ref="cronsecond"
        />
      </el-tab-pane>

      <el-tab-pane label="分钟" v-if="shouldHide('min')">
        <CrontabMin
          @update="updateContabValue"
          :check="checkNumber"
          :cron="contabValueObj"
          ref="cronmin"
        />
      </el-tab-pane>

      <el-tab-pane label="小时" v-if="shouldHide('hour')">
        <CrontabHour
          @update="updateContabValue"
          :check="checkNumber"
          :cron="contabValueObj"
          ref="cronhour"
        />
      </el-tab-pane>

      <el-tab-pane label="日" v-if="shouldHide('day')">
        <CrontabDay
          @update="updateContabValue"
          :check="checkNumber"
          :cron="contabValueObj"
          ref="cronday"
        />
      </el-tab-pane>

      <el-tab-pane label="月" v-if="shouldHide('mouth')">
        <CrontabMouth
          @update="updateContabValue"
          :check="checkNumber"
          :cron="contabValueObj"
          ref="cronmouth"
        />
      </el-tab-pane>

      <el-tab-pane label="周" v-if="shouldHide('week')">
        <CrontabWeek
          @update="updateContabValue"
          :check="checkNumber"
          :cron="contabValueObj"
          ref="cronweek"
        />
      </el-tab-pane>

      <el-tab-pane label="年" v-if="shouldHide('year')">
        <CrontabYear
          @update="updateContabValue"
          :check="checkNumber"
          :cron="contabValueObj"
          ref="cronyear"
        />
      </el-tab-pane>
    </el-tabs>

    <div class="popup-main">
      <div class="popup-result">
        <p class="title">时间表达式</p>
        <table>
          <thead>
            <th v-for="item of tabTitles" width="40" :key="item">{{ item }}</th>
            <th>crontab完整表达式</th>
          </thead>
          <tbody>
            <td>
              <span>{{ contabValueObj.second }}</span>
            </td>
            <td>
              <span>{{ contabValueObj.min }}</span>
            </td>
            <td>
              <span>{{ contabValueObj.hour }}</span>
            </td>
            <td>
              <span>{{ contabValueObj.day }}</span>
            </td>
            <td>
              <span>{{ contabValueObj.mouth }}</span>
            </td>
            <td>
              <span>{{ contabValueObj.week }}</span>
            </td>
            <td>
              <span>{{ contabValueObj.year }}</span>
            </td>
            <td>
              <span>{{ contabValueString }}</span>
            </td>
          </tbody>
        </table>
      </div>
      <CrontabResult :ex="contabValueString"></CrontabResult>

      <div class="pop_btn">
        <el-button size="small" type="primary" @click="submitFill"
          >确定</el-button
        >
        <el-button size="small" type="warning" @click="clearCron"
          >重置</el-button
        >
        <el-button size="small" @click="hidePopup">取消</el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref,watch } from "vue";
import CrontabSecond from "./crontabSecond.vue";
import CrontabMin from "./crontabMin.vue";
import CrontabHour from "./crontabHour.vue";
import CrontabDay from "./crontabDay.vue";
import CrontabMouth from "./crontabMouth.vue";
import CrontabWeek from "./crontabWeek.vue";
import CrontabYear from "./crontabYear.vue";
import CrontabResult from "./crontabResult.vue";

defineOptions({
  name: "ReCrontab"
});
const props=defineProps(["expression", "hideComponent"]);
const emit = defineEmits(["hide","fill"])
const tabTitles = ref(["秒", "分钟", "小时", "日", "月", "周", "年"]);
const tabActive = ref(0);
const myindex = ref(0);
const contabValueObj = ref({
  second: "*",
  min: "*",
  hour: "*",
  day: "*",
  mouth: "*",
  week: "?",
  year: ""
});

const cronsecond = ref()
const cronmin = ref()
const cronhour = ref()
const cronday = ref()
const cronmouth = ref()
const cronweek = ref()
const cronyear = ref()

const cronRefs = {
  cronsecond,
  cronmin,
  cronhour,
  cronday,
  cronmouth,
  cronweek,
  cronyear
}

function shouldHide(key) {
  if (props.hideComponent && props.hideComponent.includes(key)) return false;
  return true;
}
function resolveExp() {
  //反解析 表达式
  if (props.expression) {
    let arr = props.expression.split(" ");
    if (arr.length >= 6) {
      //6 位以上是合法表达式
      let obj = {
        second: arr[0],
        min: arr[1],
        hour: arr[2],
        day: arr[3],
        mouth: arr[4],
        week: arr[5],
        year: arr[6] ? arr[6] : ""
      };
      contabValueObj.value = {
        ...obj
      };
      for (let i in obj) {
        if (obj[i]) changeRadio(i, obj[i]);
      }
    }
  } else {
    //没有传入的表达式 则还原
    clearCron();
  }
}
// tab切换值
function tabCheck(index) {
  tabActive.value = index;
}
// 由子组件触发，更改表达式组成的字段值
function updateContabValue(name, value, from) {
  contabValueObj.value[name] = value;
  if (from && from !== name) {
    console.log(`来自组件 ${from} 改变了 ${name} ${value}`);
    changeRadio(name, value);
  }
}
//赋值到组件
function changeRadio(name, value) {
  let arr = ["second", "min", "hour", "mouth"],
    refName = "cron" + name,
    insVlaue=0;

  if (!cronRefs[refName].value) return;

  if (arr.includes(name)) {
    if (value === "*") {
      insVlaue = 1;
    } else if (value.indexOf("-") > -1) {
      let indexArr = value.split("-");
      isNaN(indexArr[0])
        ? (cronRefs[refName].value.cycle01 = 0)
        : (cronRefs[refName].value.cycle01 = indexArr[0]);
        cronRefs[refName].value.cycle02 = indexArr[1];
      insVlaue = 2;
    } else if (value.indexOf("/") > -1) {
      let indexArr = value.split("/");
      isNaN(indexArr[0])
        ? (cronRefs[refName].value.average01 = 0)
        : (cronRefs[refName].value.average01 = indexArr[0]);
        cronRefs[refName].value.average02 = indexArr[1];
      insVlaue = 3;
    } else {
      insVlaue = 4;
      cronRefs[refName].value.checkboxList = value.split(",");
    }
  } else if (name == "day") {
    if (value === "*") {
      insVlaue = 1;
    } else if (value == "?") {
      insVlaue = 2;
    } else if (value.indexOf("-") > -1) {
      let indexArr = value.split("-");
      isNaN(indexArr[0])
        ? (cronRefs[refName].value.cycle01 = 0)
        : (cronRefs[refName].value.cycle01 = indexArr[0]);
        cronRefs[refName].value.cycle02 = indexArr[1];
      insVlaue = 3;
    } else if (value.indexOf("/") > -1) {
      let indexArr = value.split("/");
      isNaN(indexArr[0])
        ? (cronRefs[refName].value.average01 = 0)
        : (cronRefs[refName].value.average01 = indexArr[0]);
        cronRefs[refName].value.average02 = indexArr[1];
      insVlaue = 4;
    } else if (value.indexOf("W") > -1) {
      let indexArr = value.split("W");
      isNaN(indexArr[0])
        ? (cronRefs[refName].value.workday = 0)
        : (cronRefs[refName].value.workday = indexArr[0]);
      insVlaue = 5;
    } else if (value === "L") {
      insVlaue = 6;
    } else {
      cronRefs[refName].value.checkboxList = value.split(",");
      insVlaue = 7;
    }
  } else if (name == "week") {
    if (value === "*") {
      insVlaue = 1;
    } else if (value == "?") {
      insVlaue = 2;
    } else if (value.indexOf("-") > -1) {
      let indexArr = value.split("-");
      isNaN(indexArr[0])
        ? (cronRefs[refName].value.cycle01 = 0)
        : (cronRefs[refName].value.cycle01 = indexArr[0]);
        cronRefs[refName].value.cycle02 = indexArr[1];
      insVlaue = 3;
    } else if (value.indexOf("#") > -1) {
      let indexArr = value.split("#");
      isNaN(indexArr[0])
        ? (cronRefs[refName].value.average01 = 1)
        : (cronRefs[refName].value.average01 = indexArr[0]);
        cronRefs[refName].value.average02 = indexArr[1];
      insVlaue = 4;
    } else if (value.indexOf("L") > -1) {
      let indexArr = value.split("L");
      isNaN(indexArr[0])
        ? (cronRefs[refName].value.weekday = 1)
        : (cronRefs[refName].value.weekday = indexArr[0]);
      insVlaue = 5;
    } else {
      cronRefs[refName].value.checkboxList = value.split(",");
      insVlaue = 7;
    }
  } else if (name == "year") {
    if (value == "") {
      insVlaue = 1;
    } else if (value == "*") {
      insVlaue = 2;
    } else if (value.indexOf("-") > -1) {
      insVlaue = 3;
    } else if (value.indexOf("/") > -1) {
      insVlaue = 4;
    } else {
      cronRefs[refName].value.checkboxList = value.split(",");
      insVlaue = 5;
    }
  }
  cronRefs[refName].value.radioValue = insVlaue;
}
// 表单选项的子组件校验数字格式（通过-props传递）
function checkNumber(value, minLimit, maxLimit) {
  //检查必须为整数
  value = Math.floor(value);
  if (value < minLimit) {
    value = minLimit;
  } else if (value > maxLimit) {
    value = maxLimit;
  }
  return value;
}
// 隐藏弹窗
function hidePopup() {
  emit("hide");
}
// 填充表达式
function submitFill() {
  emit("fill", contabValueString.value);
  hidePopup();
}
function clearCron() {
  // 还原选择项
  contabValueObj.value = {
    second: "*",
    min: "*",
    hour: "*",
    day: "*",
    mouth: "*",
    week: "?",
    year: ""
  };
  for (let j in contabValueObj.value) {
    changeRadio(j, contabValueObj.value[j]);
  }
}
const contabValueString = computed(()=>{
  let obj = contabValueObj.value;
      let str =
        obj.second +
        " " +
        obj.min +
        " " +
        obj.hour +
        " " +
        obj.day +
        " " +
        obj.mouth +
        " " +
        obj.week +
        (obj.year == "" ? "" : " " + obj.year);
      return str;
})
watch(props.expression, resolveExp)
onMounted(()=>{
  resolveExp()
})
</script>

<style scoped>
.pop_btn {
  text-align: center;
  margin-top: 20px;
}
.popup-main {
  position: relative;
  margin: 10px auto;
  background: #fff;
  border-radius: 5px;
  font-size: 12px;
  overflow: hidden;
}
.popup-title {
  overflow: hidden;
  line-height: 34px;
  padding-top: 6px;
  background: #f2f2f2;
}
.popup-result {
  box-sizing: border-box;
  line-height: 24px;
  margin: 25px auto;
  padding: 15px 10px 10px;
  border: 1px solid #ccc;
  position: relative;
}
.popup-result .title {
  position: absolute;
  top: -28px;
  left: 50%;
  width: 140px;
  font-size: 14px;
  margin-left: -70px;
  text-align: center;
  line-height: 30px;
  background: #fff;
}
.popup-result table {
  text-align: center;
  width: 100%;
  margin: 0 auto;
}
.popup-result table span {
  display: block;
  width: 100%;
  font-family: arial;
  line-height: 30px;
  height: 30px;
  white-space: nowrap;
  overflow: hidden;
  border: 1px solid #e8e8e8;
}
.popup-result-scroll {
  font-size: 12px;
  line-height: 24px;
  height: 10em;
  overflow-y: auto;
}
</style>
