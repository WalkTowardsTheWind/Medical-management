<template>
  <div>
    <div class="flex-display">
      <div class="left-box">表格上传(ElementUI):</div>
      <el-upload
        action="https://jsonplaceholder.typicode.com/posts/"
        :on-success="handleChange"
        :on-remove="handleRemove"
        :file-list="fileList"
        class="el-upload"
      >
        <el-button size="small" type="primary" class="el-btn"
          >点击上传</el-button
        >
        <div slot="tip" class="el-upload-tip">
          只能上传xlsx文件，且不超过5MB
        </div>
      </el-upload>
    </div>
    <el-table v-if="tableHead.length" :data="tableData[0]" style="width: 100%">
      <el-table-column
        v-for="(data, key) in tableHead"
        :prop="data"
        :label="data"
        :key="key"
        width="180"
        align="center"
      >
      </el-table-column>
    </el-table>
    <div class="flex-display">
      <div class="left-box">文件上传(input)：</div>
      <input type="file" v-on:change="onChange" class="file-ipt" />
      <el-button type="primary" round @click="DownExcel">下载按钮</el-button>
    </div>

    <div>
      <el-button type="primary" round @click="changPrint">主要按钮</el-button>
    </div>

    <PrintOrderInfo ref="packingInfoDialogRef"></PrintOrderInfo>

    <!-- <demo></demo> -->
  </div>
</template>

<script>
import PrintOrderInfo from "@/components/print-order-info/print-order-info.vue";
// import demo from '@/components/print-order-info/demo.vue'
import * as xlsx from "xlsx";
// import { read } from "xlsx";
import utils from "./excel";
export default {
  components: { PrintOrderInfo },
  data() {
    return {
      fileList: [], //上传文件列表
      tableHead: [], //表头
      tableData: [], // 表数据
    };
  },
  methods: {
    onChange(e) {
      const file = e.target.files[0];
      const fileReader = new FileReader();

      fileReader.onload = (ev) => {
        try {
          const data = ev.target.result;
          const workbook = xlsx.read(data, { type: "binary" });
          const params = [];
          // 取对应表生成json表格内容
          workbook.SheetNames.forEach((item) => {
            params.push({
              name: item,
              dataList: utils.sheet_to_json(workbook.Sheets[item]),
            });
            this.tableData.push(utils.sheet_to_json(workbook.Sheets[item]));
          });
          // 该算法仅针对表头无合并的情况
          if (this.tableData.length > 0) {
            // 获取excel中第一个表格数据tableData[0][0]，并且将表头提取出来
            for (const key in this.tableData[0][0]) {
              this.tableHead.push(key);
            }
          }
          return params;
          // 重写数据
        } catch (e) {
          console.log("error:" + e);
          return false;
        }
      };
      fileReader.readAsBinaryString(file);
    },
    handleRemove(file, fileList) {
      console.log("file", file);
      console.log("fileList", fileList);
    },
    handleChange(res, file, fileList) {
      // console.log('res',res)
      // console.log('file',file)
      // console.log('fileList',fileList)
      // 将文件放入
      for (let i = 0; i < fileList.length; i++) {
        if (file.name != fileList[i].name) {
          this.fileList.push({
            name: file.name,
            url: "",
            uid: file.uid,
          });
        }
      }

      // this.fileList = fileList.slice(-3);
      const files = { 0: file };
      // console.log('files',files)
      this.readExcel(files);
    },
    readExcel(file) {
      const fileReader = new FileReader();

      fileReader.onload = (ev) => {
        try {
          const data = ev.target.result;
          const workbook = xlsx.read(data, { type: "binary" });
          const params = [];
          // 取对应表生成json表格内容
          // console.log('workbook',workbook)
          // console.log('worksheet[address_of_cell];',worksheet['A1'])
          // console.log('workbook',workbook)
          workbook.SheetNames.forEach((item) => {
            params.push({
              name: item,
              dataList: utils.sheet_to_json(workbook.Sheets[item]),
            });
            this.tableData.push(utils.sheet_to_json(workbook.Sheets[item]));
          });
          // 该算法仅针对表头无合并的情况
          // console.log('params',params)
          // console.log('this.tableData',this.tableData)
          if (this.tableData.length > 0) {
            // 获取excel中第一个表格数据tableData[0][0]，并且将表头提取出来
            for (const key in this.tableData[0][0]) {
              this.tableHead.push(key);
            }
          }
          return params;
          // 重写数据
        } catch (e) {
          console.log("error:" + e);
          return false;
        }
      };
      fileReader.readAsBinaryString(file[0].raw);
    },
    changPrint() {
      // console.log('sss',this.$refs.packingInfoDialogRef.dialogVisible)
      this.$refs.packingInfoDialogRef.opens();
    },
    ///////////////////////////////
    DownExcel() {
      console.log("tableHead", this.tableHead);

      console.log("tableData", this.tableData);
      // 需要导出的数据源
      var data =JSON.parse(JSON.stringify(this.tableData[0]));
      console.log(data,'data')
      
      // 将数据源转成我们需要的二维数组
      
      var body = data.map((x) => 
      {
         let arr = Object.values(x); //对象转化为数组
        
        return arr
      });
      
    console.log(body,'body')

      // 定义Excel表头
      const header = [
        [
          "工号",
          "姓名",
          "一级部门",
          "所属部门",
          "身份证号码",
          "银行卡号",
          "开户行",
          "岗位",
          "入职日期",
          "人员类型",
          "离职日期",
          "员工状态",
          "基本工资\n核算标准",
          "岗位工资\n核算标准",
          "绩效\n核算标准",
          "出勤情况",
          "出勤情况",
          // "",
          "基本薪资合计",
          "岗位工资",
          "绩效工资",
          "浮动工资",
          "病假工资",
          "病假工资",
          "补贴",
          "补贴",
          "补贴",
          "公积金基数调整\n（个人承担）",
          "扣款合计",
          "遗留",
          "应发工资",
          "社保（个人部分明细）",
          "社保（个人部分明细）",
          "社保（个人部分明细）",
          "社保",
          "社保",
          "住房\n公积金",
          "住房\n公积金",
          "累计收入\n（已扣除起征点）",
          "累计专项扣除",
          "累计应缴预缴所得额",
          "累计应缴税额",
          "累计已缴税额",
          "本月应扣税额",
          "实发工资1",
          "税后扣款",
          "补",
          "金额",
          "实发工资2",
          "人工成本总额",
        ],
        [
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "月标准天数\n（不含双休）",
          "实际出勤天数",
          "",
          "",
          "",
          "提佣",
          "病假天数",
          "病假工资",
          "司龄标准",
          "司龄工资",
          "其他补贴",
          "公积金基数调整\n（个人承担）",
          "扣款合计",
          "遗留",
          "应发工资",
          "养老保险",
          "医疗保险",
          "失业保险",
          "社保合计\n（个人部分）",
          "社保\n（公司部分）",
          "住房\n公积金",
          "住房\n公积金-上月累计收入",
          "累计收入\n（已扣除起征点）",
          "累计专项扣除",
          "累计应缴预缴所得额",
          "累计应缴税额",
          "累计已缴税额",
          "本月应扣税额",
          "实发工资1",
          "税后扣款",
          "补",
          "金额",
          "实发工资2",
          "人工成本总额",
        ],
      ];

      body.unshift(...header); // 将定义好的表头添加到 body 中
      const workbook = xlsx.utils.book_new(); // 创建虚拟的 workbook
      const sheet = xlsx.utils.aoa_to_sheet(body); // aoa_to_sheet 将二维数组转成 sheet
      const merges = [
        { s: { r: 0, c: 0 }, e: { r: 1, c: 0 } },
        { s: { r: 0, c: 1 }, e: { r: 1, c: 1 } },
        { s: { r: 0, c: 2 }, e: { r: 1, c: 2 } },
        { s: { r: 0, c: 3 }, e: { r: 1, c: 3 } },
        { s: { r: 0, c: 4 }, e: { r: 1, c: 4 } },
        { s: { r: 0, c: 5 }, e: { r: 1, c: 5 } },
        { s: { r: 0, c: 6 }, e: { r: 1, c: 6 } },
        { s: { r: 0, c: 7 }, e: { r: 1, c: 7 } },
        { s: { r: 0, c: 8 }, e: { r: 1, c: 8 } },
        { s: { r: 0, c: 9 }, e: { r: 1, c: 9 } },
        { s: { r: 0, c: 10 }, e: { r: 1, c: 10 } },
        { s: { r: 0, c: 11 }, e: { r: 1, c: 11 } },
        { s: { r: 0, c: 12 }, e: { r: 1, c: 12 } },
        { s: { r: 0, c: 13 }, e: { r: 1, c: 13 } },
        { s: { r: 0, c: 14 }, e: { r: 1, c: 14 } },
        { s: { r: 0, c: 15 }, e: { r: 0, c: 16 } },
        { s: { r: 0, c: 17 }, e: { r: 1, c: 17 } },
        { s: { r: 0, c: 18 }, e: { r: 1, c: 18 } },
        { s: { r: 0, c: 19 }, e: { r: 1, c: 19 } },
        { s: { r: 0, c: 21 }, e: { r: 0, c: 22 } },
        { s: { r: 0, c: 23 }, e: { r: 0, c: 25 } },
        { s: { r: 0, c: 26 }, e: { r: 1, c: 26 } },
        { s: { r: 0, c: 27 }, e: { r: 1, c: 27 } },
        { s: { r: 0, c: 28 }, e: { r: 1, c: 28 } },
        { s: { r: 0, c: 29 }, e: { r: 1, c: 29 } },
        { s: { r: 0, c: 30 }, e: { r: 0, c: 32 } },
        { s: { r: 0, c: 33 }, e: { r: 0, c: 34 } },
        { s: { r: 0, c: 35 }, e: { r: 1, c: 35 } }, //住房公积金
        { s: { r: 0, c: 36 }, e: { r: 1, c: 36 } },
        { s: { r: 0, c: 37 }, e: { r: 1, c: 37 } },
        { s: { r: 0, c: 38 }, e: { r: 1, c: 38 } },
        { s: { r: 0, c: 39 }, e: { r: 1, c: 39 } },
        { s: { r: 0, c: 40 }, e: { r: 1, c: 40 } },
        { s: { r: 0, c: 41 }, e: { r: 1, c: 41 } },
        { s: { r: 0, c: 42 }, e: { r: 1, c: 42 } },
        { s: { r: 0, c: 43 }, e: { r: 1, c: 43 } },
        { s: { r: 0, c: 44 }, e: { r: 1, c: 44 } },
        { s: { r: 0, c: 45 }, e: { r: 1, c: 45 } },
        { s: { r: 0, c: 46 }, e: { r: 1, c: 46 } },
        { s: { r: 0, c: 47 }, e: { r: 1, c: 47 } },
        { s: { r: 0, c: 48 }, e: { r: 1, c: 48 } },
      ];
      sheet["!merges"] = merges; // 将merges添加到sheet中，设置合并单元格
      const cols = [{ wch: 10 }, { wch: 10 }];
      sheet["!cols"] = cols; // 将cols添加到sheet中，设置列宽
      const rows = [{ hpx: 20 }, { hpx: 16 }, { hpx: 18 }];
      sheet["!rows"] = rows; // 将rows添加到sheet中，设置行高

      xlsx.utils.book_append_sheet(workbook, sheet, "表"); // 向 workbook 中添加 sheet
      xlsx.writeFile(workbook, "excel名称.xlsx"); // 导出 workbook
      // 注意：定义导出 excel 的名称时需要加上后缀 .xlsx
    },
  },
};
</script>
<style lang="scss" scoped>
.upload-demo {
  width: 100%;
}
.flex-display {
  margin: 50px 30px;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  .left-box {
    margin: 20 30;
    height: 36px;
    line-height: 36px;
  }
}
.el-upload {
  margin-left: 40px;
  .el-btn {
    font-size: 16px;
  }
  .el-upload-tip {
    display: inline;
    font-size: 12px;
  }
}
.file-ipt {
  width: 200px;
  height: 36px;
  line-height: 36px;
  button {
    background-color: #409eff;
  }
}
input #file-upload-button {
  background-color: #409eff;
}
</style>
