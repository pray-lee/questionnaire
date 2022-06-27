<template>
    <div class="detail">
        <div class="tab">
            <div @click="changeActive('add-number')" class="add-number-btn" :class="{active: isActive === 'add-number'}">账号生成</div>
            <div class="separator"></div>
            <div @click="changeActive('list')" class="list-btn" :class="{active: isActive === 'list'}">报表</div>
            <div class="separator"></div>
            <div @click="logOut" class="list-btn">注销</div>
        </div>
        <component :is="current" :userName="userName"></component>
    </div>
</template>
<script>
import addNumber from '_c/AddNumber'
import List from '_c/List'
export default {
    name: 'detail',
    props: {
        userName: {
            required: true,
            type: String
        }
    },
    data() {
        return {
            current: "add-number",
            isActive: 'add-number'
        }
    },
    components: {
        addNumber,
        List
    },
    methods: {
        logOut() {
            window.localStorage.removeItem('userName')
            this.$emit('logout')
        },
        changeActive(name) {
            this.isActive = name
            this.current = name
        }
    }
}
</script>
<style scoped>
.tab{
    display:flex;
    justify-content: space-around;
    margin:0 40px;
}
.tab div{
    flex: 1;
    font-size: 28px;
    font-weight:bold;
    text-align:center;
    height: 100px;
    line-height: 100px;
    color:#999;
    background:#fff;
}
.tab div.active{
    border-bottom: 5px solid #3276c3;
    color:#3276c3
}
.tab .separator{
    flex: 0 0 auto;
    width:0px;
    height: 40px;
    margin: 30px 40px;
    border-left: 5px solid #3276c3
}
</style>