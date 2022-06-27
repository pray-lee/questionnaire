<template>
  <div class="list">
    <div id="scroll-wrapper">
      <div v-if="tableData.length">
        <el-table
          ref="filterTable"
          size="mini"
          :data="tableData"
          style="width: 100%"
          :height="height"
        >
          <el-table-column
            v-for="(item, index) in column"
            :key="index"
            :fixed="item.fixed"
            :prop="item.field"
            :label="item.title"
            :width="item.width"
          >
            <template slot-scope="scope">
              <span v-if="item.field === 'provider'" style="color: #ad5910">{{
                scope.row.provider
              }}</span>
              <span
                v-if="item.field === 'assignedPerson'"
                style="color: #3276c3"
                >{{ scope.row.assignedPerson }}</span
              >
              <span v-if="item.field === 'accountNo'" style="color: purple">{{
                scope.row.accountNo
              }}</span>
              <span v-if="item.field === 'isLogin'">
                <i v-if="!!scope.row.isLogin" class="el-icon-check"></i>
                <i v-else class="el-icon-close"></i>
              </span>
              <span v-if="item.field === 'isVoucher'">
                <i v-if="!!scope.row.isVoucher" class="el-icon-check"></i>
                <i v-else class="el-icon-close"></i>
              </span>
              <span v-if="item.field === 'isMxz'">
                <i v-if="!!scope.row.isMxz" class="el-icon-check"></i>
                <i v-else class="el-icon-close"></i>
              </span>
              <span v-if="item.field === 'isReport'">
                <i v-if="!!scope.row.isReport" class="el-icon-check"></i>
                <i v-else class="el-icon-close"></i>
              </span>
              <span v-if="item.field === 'isExport'">
                <i v-if="!!scope.row.isExport" class="el-icon-check"></i>
                <i v-else class="el-icon-close"></i>
              </span>
              <span v-if="item.field === 'isAnswer'">
                <i v-if="!!scope.row.isAnswer" class="el-icon-check"></i>
                <i v-else class="el-icon-close"></i>
              </span>
              <span v-if="item.field === 'userName'" style="color: #ff5252">{{
                scope.row.userName
              }}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-else class="nodata">暂无数据</div>
    </div>
  </div>
</template>

<script>
import { getTableList } from "@/api/questionnaire/getTableList";
import { Notification } from "element-ui";
export default {
  props: {
    userName: {
      required: true,
      type: String,
    },
  },
  data() {
    return {
      height: 0,
      column: [],
      tableData: [],
    };
  },
  created() {
    this.column = [
      {
        title: "推广人",
        field: "provider",
        fixed: false,
        width: 80,
      },
      {
        title: "用户名称",
        field: "assignedPerson",
        fixed: true,
        width: 100,
      },
      {
        title: "账号",
        field: "accountNo",
        fixed: false,
        width: 100,
      },
      {
        title: "登录",
        field: "isLogin",
        fixed: false,
        width: 70,
      },
      {
        title: "凭证生成",
        field: "isVoucher",
        fixed: false,
        width: 70,
      },
      {
        title: "数据穿透",
        field: "isMxz",
        fixed: false,
        width: 70,
      },
      {
        title: "报表",
        field: "isReport",
        fixed: false,
        width: 60,
      },
      // {
      //   title: "批量导出",
      //   field: "isExport",
      //   fixed: false,
      //   width: 70,
      // },
      {
        title: "提交问卷",
        field: "isAnswer",
        fixed: false,
        width: 70,
      },
      {
        title: "真实姓名",
        field: "userName",
        fixed: false,
        width: 80,
      },
    ];
  },
  mounted() {
    this.$nextTick(() => {
      setTimeout(() => {
        this.setListHeight();
      });
    });
    this.getTable();
  },
  methods: {
    getTable() {
      getTableList(this.userName).then((res) => {
        console.log(res, "表格数据");
        if (res.data.success) {
          this.tableData = res.data.result;
        } else {
          Notification.error({
            message: res.data.msg,
            duration: 1500,
            position: "top-left",
          });
        }
      });
    },
    setListHeight() {
      let listHeight = null;
      const topHeight = document.getElementsByClassName("tab")[0].offsetHeight;
      const windowHeight = document.documentElement.clientHeight;
      listHeight = windowHeight - topHeight;
      this.height = listHeight;
      document.getElementById("scroll-wrapper").style.height =
        listHeight + "px";
    },
  },
};
</script>
<style scoped>
#scroll-wrapper {
  overflow: hidden;
}
.el-icon-check {
  color: yellowgreen;
  font-weight: bold;
  font-size: 30px;
}
.cell span {
  font-weight: bold;
}
.nodata {
  padding: 40px;
  font-size: 30px;
  text-align: center;
}
</style>