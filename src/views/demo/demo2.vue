<template>
  <div  style="display: inline-block; float: left; cursor: pointer">
  <el-tooltip effect="dark" content="删除角色" placement="bottom">
<el-popover
  placement="top"
  width="160"
  v-model="visible">
  <p>这是一段内容这是一段内容确定删除吗？</p>
  <div style="text-align: right; margin: 0">
    <el-button size="mini" type="text" @click="visible = false">取消</el-button>
    <el-button type="primary" size="mini" @click="visible = false">确定</el-button>
  </div>
  <i  slot="reference" class="el-icon-delete" style="margin-left: " />
  <!-- <el-button slot="reference">删除</el-button> -->
</el-popover>
</el-tooltip>
</div>
</template>

<script>
  export default {
    data() {
      return {
        visible: false,
      };
    }
  }
</script>



<style>
  .time {
    font-size: 13px;
    color: #999;
  }
  
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  
  .clearfix:after {
      clear: both
  }
</style>

