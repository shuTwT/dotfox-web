<script setup lang="ts">
import { getGenTable, updateGenTable } from "@/api/tool";
import { getMenuTreeSelect, getDictOptionSelect } from "@/api/system";
import { useRoute } from "vue-router";
import { ref } from "vue";
import { basicInfoFormRules, genInfoFormRules } from "./utils/rule";
import { handleTree } from "@pureadmin/utils";
defineOptions({
  name: "EditTable"
});
const route = useRoute();
const activeName = ref("columnInfo");
const tableHeight = ref(document.documentElement.scrollHeight - 245 + "px");
const tables = ref([]);
const columns = ref([]);
const dictOptions = ref([]);
const menus = ref([]);
const info = ref({
  tableName: "",
  tableComment: "",
  className: "",
  functionAuthor: "",
  remark: "",
  tplCategory: "",
  tplWebType: "",
  packageName: "",
  moduleName: "",
  businessName: "",
  functionName: "",
  genType: "",
  parentMenuId: "",
  genPath: "",
  treeCode: "",
  columns: [],
  treeParentCode: "",
  treeName: "",
  subTableName: "",
  subTableFkName: ""
});
const subColumns = ref([]);
const tableId = Number(route.params.tableId);
function onSearch() {
  getGenTable(tableId).then(res => {
    info.value = res.data;
  });
  getDictOptionSelect().then(res => {
    dictOptions.value = res.data;
  });
  getMenuTreeSelect().then(res => {
    console.log(res.data);
    menus.value = handleTree(res.data, "menuId");
    console.log(menus.value);
  });
}
onSearch();
function submitForm() {}
function close() {}
function tplSelectChange() {}
function subSelectChange() {}
</script>

<template>
  <el-card>
    <el-tabs v-model="activeName">
      <el-tab-pane label="基本信息" name="basic">
        <el-form
          ref="basicInfoForm"
          :model="info"
          :rules="basicInfoFormRules"
          label-width="150px"
        >
          <el-row>
            <el-col :span="12">
              <el-form-item label="表名称" prop="tableName">
                <el-input
                  v-model="info.tableName"
                  placeholder="请输入仓库名称"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="表描述" prop="tableComment">
                <el-input v-model="info.tableComment" placeholder="请输入" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="实体类名称" prop="className">
                <el-input v-model="info.className" placeholder="请输入" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="作者" prop="functionAuthor">
                <el-input v-model="info.functionAuthor" placeholder="请输入" />
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="备注" prop="remark">
                <el-input v-model="info.remark" type="textarea" :rows="3" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="字段信息" name="columnInfo">
        <el-table
          ref="dragTable"
          :data="columns"
          row-key="columnId"
          :max-height="tableHeight"
        >
          <el-table-column
            label="序号"
            type="index"
            min-width="5%"
            class-name="allowDrag"
          />
          <el-table-column
            label="字段列名"
            prop="columnName"
            min-width="10%"
            :show-overflow-tooltip="true"
          />
          <el-table-column label="字段描述" min-width="10%">
            <template v-slot="scope">
              <el-input v-model="scope.row.columnComment" />
            </template>
          </el-table-column>
          <el-table-column
            label="物理类型"
            prop="columnType"
            min-width="10%"
            :show-overflow-tooltip="true"
          />
          <el-table-column label="Java类型" min-width="11%">
            <template v-slot="scope">
              <el-select v-model="scope.row.javaType">
                <el-option label="Long" value="Long" />
                <el-option label="String" value="String" />
                <el-option label="Integer" value="Integer" />
                <el-option label="Double" value="Double" />
                <el-option label="BigDecimal" value="BigDecimal" />
                <el-option label="Date" value="Date" />
                <el-option label="Boolean" value="Boolean" />
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="java属性" min-width="10%">
            <template v-slot="scope">
              <el-input v-model="scope.row.javaField" />
            </template>
          </el-table-column>

          <el-table-column label="插入" min-width="5%">
            <template v-slot="scope">
              <el-checkbox
                v-model="scope.row.isInsert"
                true-label="1"
                false-label="0"
              />
            </template>
          </el-table-column>
          <el-table-column label="编辑" min-width="5%">
            <template v-slot="scope">
              <el-checkbox
                v-model="scope.row.isEdit"
                true-label="1"
                false-label="0"
              />
            </template>
          </el-table-column>
          <el-table-column label="列表" min-width="5%">
            <template v-slot="scope">
              <el-checkbox
                v-model="scope.row.isList"
                true-label="1"
                false-label="0"
              />
            </template>
          </el-table-column>
          <el-table-column label="查询" min-width="5%">
            <template v-slot="scope">
              <el-checkbox
                v-model="scope.row.isQuery"
                true-label="1"
                false-label="0"
              />
            </template>
          </el-table-column>
          <el-table-column label="查询方式" min-width="10%">
            <template v-slot="scope">
              <el-select v-model="scope.row.queryType">
                <el-option label="=" value="EQ" />
                <el-option label="!=" value="NE" />
                <el-option label=">" value="GT" />
                <el-option label=">=" value="GTE" />
                <el-option label="<" value="LT" />
                <el-option label="<=" value="LTE" />
                <el-option label="LIKE" value="LIKE" />
                <el-option label="BETWEEN" value="BETWEEN" />
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="必填" min-width="5%">
            <template v-slot="scope">
              <el-checkbox
                v-model="scope.row.isRequired"
                true-label="1"
                false-label="0"
              />
            </template>
          </el-table-column>
          <el-table-column label="显示类型" min-width="12%">
            <template v-slot="scope">
              <el-select v-model="scope.row.htmlType">
                <el-option label="文本框" value="input" />
                <el-option label="文本域" value="textarea" />
                <el-option label="下拉框" value="select" />
                <el-option label="单选框" value="radio" />
                <el-option label="复选框" value="checkbox" />
                <el-option label="日期控件" value="datetime" />
                <el-option label="图片上传" value="imageUpload" />
                <el-option label="文件上传" value="fileUpload" />
                <el-option label="富文本控件" value="editor" />
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="字典类型" min-width="12%">
            <template v-slot="scope">
              <el-select
                v-model="scope.row.dictType"
                clearable
                filterable
                placeholder="请选择"
              >
                <el-option
                  v-for="dict in dictOptions"
                  :key="dict.dictType"
                  :label="dict.dictName"
                  :value="dict.dictType"
                >
                  <span style="float: left">{{ dict.dictName }}</span>
                  <span style="float: right; font-size: 13px; color: #8492a6">{{
                    dict.dictType
                  }}</span>
                </el-option>
              </el-select>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="生成信息" name="genInfo">
        <el-form
          ref="genInfoForm"
          :model="info"
          :rules="genInfoFormRules"
          label-width="150px"
        >
          <el-row>
            <el-col :span="12">
              <el-form-item prop="tplCategory">
                <template v-slot:label>
                  <span>生成模板</span>
                </template>
                <el-select v-model="info.tplCategory" @change="tplSelectChange">
                  <el-option label="单表（增删改查）" value="crud" />
                  <el-option label="树表（增删改查）" value="tree" />
                  <el-option label="主子表（增删改查）" value="sub" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="tplWebType">
                <template v-slot:label>
                  <span>前端类型</span>
                </template>
                <el-select v-model="info.tplWebType">
                  <el-option label="Vue2 Element UI 模版" value="element-ui" />
                  <el-option
                    label="Vue3 Element Plus 模版"
                    value="element-plus"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="packageName">
                <template v-slot:label>
                  <span>
                    生成包路径
                    <el-tooltip
                      content="生成在哪个java包下，例如 com.ruoyi.system"
                      placement="top"
                    >
                      <i class="el-icon-question" />
                    </el-tooltip>
                  </span>
                </template>
                <el-input v-model="info.packageName" />
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item prop="moduleName">
                <template v-slot:label>
                  <span>
                    生成模块名
                    <el-tooltip
                      content="可理解为子系统名，例如 system"
                      placement="top"
                    >
                      <i class="el-icon-question" />
                    </el-tooltip>
                  </span>
                </template>
                <el-input v-model="info.moduleName" />
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item prop="businessName">
                <template v-slot:label>
                  <span>
                    生成业务名
                    <el-tooltip
                      content="可理解为功能英文名，例如 user"
                      placement="top"
                    >
                      <i class="el-icon-question" />
                    </el-tooltip>
                  </span>
                </template>
                <el-input v-model="info.businessName" />
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item prop="functionName">
                <template v-slot:label>
                  <span>
                    生成功能名
                    <el-tooltip content="用作类描述，例如 用户" placement="top">
                      <i class="el-icon-question" />
                    </el-tooltip>
                  </span>
                </template>
                <el-input v-model="info.functionName" />
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item prop="genType">
                <template v-slot:label>
                  <span>
                    生成代码方式
                    <el-tooltip
                      content="默认为zip压缩包下载，也可以自定义生成路径"
                      placement="top"
                    >
                      <i class="el-icon-question" />
                    </el-tooltip>
                  </span>
                </template>
                <el-radio v-model="info.genType" label="0">zip压缩包</el-radio>
                <el-radio v-model="info.genType" label="1">自定义路径</el-radio>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item>
                <template v-slot:label>
                  <span>
                    上级菜单
                    <el-tooltip
                      content="分配到指定菜单下，例如 系统管理"
                      placement="top"
                    >
                      <i class="el-icon-question" />
                    </el-tooltip>
                  </span>
                </template>
                <el-tree-select
                  v-model="info.parentMenuId"
                  :append-to-body="true"
                  :data="menus"
                  :show-count="true"
                  placeholder="请选择系统菜单"
                />
              </el-form-item>
            </el-col>

            <el-col v-if="info.genType == '1'" :span="24">
              <el-form-item prop="genPath">
                <template v-slot:label>
                  <span>
                    自定义路径
                    <el-tooltip
                      content="填写磁盘绝对路径，若不填写，则生成到当前Web项目下"
                      placement="top"
                    >
                      <i class="el-icon-question" />
                    </el-tooltip>
                  </span>
                </template>
                <el-input v-model="info.genPath">
                  <template v-slot:append>
                    <el-dropdown>
                      <el-button type="primary">
                        最近路径快速选择
                        <i class="el-icon-arrow-down el-icon--right" />
                      </el-button>
                      <template v-slot:dropdown>
                        <el-dropdown-menu>
                          <el-dropdown-item @click="info.genPath = '/'"
                            >恢复默认的生成基础路径</el-dropdown-item
                          >
                        </el-dropdown-menu>
                      </template>
                    </el-dropdown>
                  </template>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row v-show="info.tplCategory == 'tree'">
            <h4 class="form-header">其他信息</h4>
            <el-col :span="12">
              <el-form-item>
                <template v-slot:label>
                  <span>
                    树编码字段
                    <el-tooltip
                      content="树显示的编码字段名， 如：dept_id"
                      placement="top"
                    >
                      <i class="el-icon-question" />
                    </el-tooltip>
                  </span>
                </template>
                <el-select v-model="info.treeCode" placeholder="请选择">
                  <el-option
                    v-for="(column, index) in info.columns"
                    :key="index"
                    :label="column.columnName + '：' + column.columnComment"
                    :value="column.columnName"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item>
                <template v-slot:label>
                  <span>
                    树父编码字段
                    <el-tooltip
                      content="树显示的父编码字段名， 如：parent_Id"
                      placement="top"
                    >
                      <i class="el-icon-question" />
                    </el-tooltip>
                  </span>
                </template>
                <el-select v-model="info.treeParentCode" placeholder="请选择">
                  <el-option
                    v-for="(column, index) in info.columns"
                    :key="index"
                    :label="column.columnName + '：' + column.columnComment"
                    :value="column.columnName"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item>
                <template v-slot:label>
                  <span>
                    树名称字段
                    <el-tooltip
                      content="树节点的显示名称字段名， 如：dept_name"
                      placement="top"
                    >
                      <i class="el-icon-question" />
                    </el-tooltip>
                  </span>
                </template>
                <el-select v-model="info.treeName" placeholder="请选择">
                  <el-option
                    v-for="(column, index) in info.columns"
                    :key="index"
                    :label="column.columnName + '：' + column.columnComment"
                    :value="column.columnName"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row v-show="info.tplCategory == 'sub'">
            <h4 class="form-header">关联信息</h4>
            <el-col :span="12">
              <el-form-item>
                <template v-slot:label>
                  <span>
                    关联子表的表名
                    <el-tooltip
                      content="关联子表的表名， 如：sys_user"
                      placement="top"
                    >
                      <i class="el-icon-question" />
                    </el-tooltip>
                  </span>
                </template>
                <el-select
                  v-model="info.subTableName"
                  placeholder="请选择"
                  @change="subSelectChange"
                >
                  <el-option
                    v-for="(table, index) in tables"
                    :key="index"
                    :label="table.tableName + '：' + table.tableComment"
                    :value="table.tableName"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item>
                <template v-slot:label>
                  <span>
                    子表关联的外键名
                    <el-tooltip
                      content="子表关联的外键名， 如：user_id"
                      placement="top"
                    >
                      <i class="el-icon-question" />
                    </el-tooltip>
                  </span>
                </template>
                <el-select v-model="info.subTableFkName" placeholder="请选择">
                  <el-option
                    v-for="(column, index) in subColumns"
                    :key="index"
                    :label="column.columnName + '：' + column.columnComment"
                    :value="column.columnName"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-tab-pane>
    </el-tabs>
    <el-form label-width="100px">
      <el-form-item
        style="margin-top: 10px; margin-left: -100px; text-align: center"
      >
        <el-button type="primary" @click="submitForm()">提交</el-button>
        <el-button @click="close()">返回</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
