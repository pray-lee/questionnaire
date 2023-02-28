<template>
  <div class="add-number">
    <section>
      <div class="input-area">
        <div class="name">
          <label for="">体验者：</label>
          <input type="text" placeholder="请输入体验者" v-model="assignedPerson"/>
        </div>
        <div class="num">
          <label for="">数量：</label>
          <input type="text" placeholder="请输入数量" v-model="numbers"/>
        </div>
        <div class="num">
          <label for="">角色：</label>
          <el-select v-model="roleId" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.roleName"
              :value="item.id">
            </el-option>
          </el-select>
        </div>
        <button class="generate" @click="generate">生成</button>
      </div>
      <div id="list-area" v-cloak>
        <ul v-if="list.length">
          <li class="copy-wrapper" v-for="(item, index) in list" :key="item.id">
            <button
              class="copy-btn"
              :data-clipboard-target="'#copy' + index"
              data-clipboard-action="copy"
              :class="'copy'+index"
              @click="copy('copy'+index)"
            >
              点击复制
            </button>
            <div :id="'copy'+index">
              <p class="word">
                【{{
                  item.assignedPerson
                }}】先生/女士，您好。您的专属体验系统登录账号和密码已生成，详见分割线下附内容。为了您能获得畅爽体验，建议使用谷歌浏览器并根据体验指南来进行操作，您在系统登录后即可在页面右上角找到并下载体验指南。体验过程中有任何问题可随时与我（您的专属体验顾问）沟通哦！
              </p>
              <div
                class="account"
                v-for="detail in item.detailList"
                :key="detail.id"
              >
                <p style="color: #666">
                  ---------------------------------------------
                </p>
                <p>登陆网址：demo.caika.net</p>
                <p>账号：{{ detail.accountNo }}</p>
                <p>密码：{{detail.password}}</p>
                <p class="notice">注意：密码'C'是大写哦！体验到期时间：{{item.expirationTime.split(' ')[0]}}</p>
              </div>
            </div>
          </li>
        </ul>
        <div v-else style="padding: 40px 0;text-align:center">暂无生成号段....</div>
      </div>
    </section>
  </div>
</template>
<script>
import Clipboard from "clipboard";
import { getCard, generateCard } from "@/api/questionnaire/generate";
import { Notification } from "element-ui";
import BScroll from "@better-scroll/core";
export default {
  name: "addNumber",
  props: {
    userName: {
      required: true,
      type: String,
    },
  },
  data() {
    return {
      list: [],
      options: [],
      roleId: '',
      assignedPerson: '',
      numbers: ''
    };
  },
  mounted() {
    this.getCardList();
    this.initBScroll();
  },
  methods: {
    clearUserInfo() {
      this.assignedPerson = ''
      this.numbers = ''
    },
    getCardList() {
      getCard(this.userName).then((res) => {
        if (res.data.success) {
          this.list = res.data.result?.distributeAccountList;
          this.options = res.data.result?.roleList.filter(item => item.id == '2c91e3ec6b6d9e14016b6ed042a80a7f' || item.id == '2c91e3eb728287550172b5fda93401dc')
          this.$nextTick(() => {
            this.bs.refresh()
          })
          this.clearUserInfo()
        }else{
            Notification.warning({
                message: res.data.msg,
                position: "top-left",
                duration: 1500,
            });
        }
      });
    },
    generate() {
        generateCard({
            userName:this.userName,
            assignedPerson:this.assignedPerson,
            numbers:this.numbers,
            roleId: this.roleId
        })
            .then(res => {
                if(res.data.success) {
                    this.getCardList()
                }else{
                    Notification.error({
                        message: res.data.msg,
                        position:'top-left',
                        duration: 1500
                    })
                }
            })
    },
    setListHeight() {
      let listHeight = null;
      const topHeight = document.getElementsByClassName("tab")[0].offsetHeight;
      const inputHeight =
        document.getElementsByClassName("input-area")[0].offsetHeight;
      const windowHeight = document.documentElement.clientHeight;
      listHeight = windowHeight - topHeight - inputHeight - 40;
      document.getElementById("list-area").style.height = listHeight + "px";
    },
    initBScroll() {
      const wrapper = document.getElementById("list-area");
      this.$nextTick(() => {
        setTimeout(() => {
          this.setListHeight();
          this.bs = new BScroll(wrapper, {});
        });
      });
    },
    copy(selector) {
      console.log(selector, "selector");
      var clipboard = new Clipboard(`.${selector}`);
      clipboard.on("success", function (e) {
        Notification.success({
          message: "复制成功",
          duration: 1500,
          position: "top-left",
        });
        e.clearSelection();
        clipboard.destroy();
      });
    },
  },
};
</script>
<style scoped>
[v-cloak] {
    display:none
}
.add-number {
  padding: 40px 40px;
}
.input-area {
  padding-bottom: 40px;
}
.input-area > div {
  display: flex;
  height: 80px;
  line-height: 80px;
  margin-bottom: 40px;
  font-size: 30px;
  color: #666;
}
.el-select{
  flex: 1
}
.input-area >>> input::placeholder {
    color: #3276c3;
    opacity: 1; /* Firefox */
  }
  
 .input-area >>> input::-ms-input-placeholder { /* Internet Explorer 10-11 */
   color: #3276c3;
  }
  
  .input-area >>> input::-ms-input-placeholder { /* Microsoft Edge */
   color: #3276c3;
  }
.input-area >>> input {
  width: 100%;
  -webkit-appearance: none;
  flex: 1;
  outline: 0;
  padding: 0 30px;
  border: 4px solid #3276c3;
  color: #3276c3;
  border-radius: 10px;
  font-size: 30px;
}
.name,
.num {
  flex: 2;
}
.name label,
.num label {
  width: 5em;
  color: #333;
  font-size: 30px;
}
.generate {
  display: block;
  background: #3276c3;
  color: #fff;
  outline: 0;
  border: 0;
  width: 100%;
  height: 80px;
  text-align: center;
  line-height: 80px;
  font-size: 30px;
  font-weight: bold;
  border-radius: 10px;
}
#list-area {
  overflow: hidden;
}
#list-area ul {
  padding: 20px 20px 40px 20px;
}
#list-area li {
  text-align: left;
  list-style: none;
  padding: 80px 20px 20px 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  font-size: 26px;
}
.word {
  padding-bottom: 20px;
  font-size: 26px;
  color: #666;
}
.account {
  color: #3276c3;
  font-weight: bold;
}
.notice {
  padding-top: 20px;
  color: #ff5252;
  font-size: 24px;
  font-style: italic;
}
.copy-wrapper {
  position: relative;
  margin-bottom: 40px;
}
.copy-wrapper:last-child {
  margin-bottom: 0;
}
.copy-btn {
  position: absolute;
  top: 20px;
  right: 20px;
  -webkit-appearance: none;
  border: 3px solid #3276c3;
  padding: 5px;
  background: #fff;
  color: #3276c3;
  border-radius: 8px;
  font-size: 24px
}
</style>