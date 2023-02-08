<template>
  <div>
    <div >
      <!-- style="width: 0; height: 0; overflow: hidden" -->
        <div id="printMe">
          <div style="font-size: 20px;font-weight: bold;text-align: center;">采购订单</div>
          <div class="table-list" style="display:flex">
            <div style="width: 270px;"><p>采购单号:</p><span style="display:inline-block;margin:1px">12345678910</span></div>
            <div style="width: 260px;"><p>单据日期:</p><span style="display:inline-block;margin:1px">2022-10-10</span></div>
            <div style="width: 200px;"><p>业务类型:</p><span style="display:inline-block;margin:1px">普通采购</span></div>
            <div style="width: 270px;"><p>供应商:</p><span style="display:inline-block;margin:1px">张三</span></div>
            <div style="width: 260px;"><p>部门:</p><span style="display:inline-block;margin:1px">采购部</span></div>
            <div style="width: 200px;"><p>备注:</p><span style="display:inline-block;margin:1px">采购部</span></div>
          </div>
            <!--表格-->
          <table>
            <thead>
              <tr>
                <td>日期</td><td>姓名</td><td>地址</td>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item,index) in tableData" :key="index" style="page-break-inside: avoid;">
                <td>{{item.date}}</td>
                <td>{{item.name}}</td>
                <td>{{item.address}}</td>
              </tr>
            </tbody>
          </table>
          <!-- 换页CSS，逻辑分页 -->
          <!-- <div style="page-break-after: always;" v-for="(items, pageIndex) in printData.orderDetails" :key="'page' + pageIndex">
            <table style="border: 1px solid black; width: 100%; margin: 0 auto; border-spacing: 0; border-collapse: collapse; font-size: 14px;">
              <tr>
                <th style="border: 1px solid black;">序号</th>
                <th style="border: 1px solid black;">商品编码</th>
                <th style="border: 1px solid black;">商品名称</th>
                <th style="border: 1px solid black;">重量/斤</th>
                <th style="border: 1px solid black;">料箱数</th>
              </tr>
              <tr v-for="(itemss, dataIndex) in items" :key="itemss.skuCode">
                <td style="border: 1px solid black; text-align: center; width: 50px;">{{ pageIndex * 48 + dataIndex + 1 }}</td>
                <td style="border: 1px solid black; text-align: center; width: 160px;">{{ itemss.skuCode }}</td>
                <td style="border: 1px solid black;">{{ itemss.skuName | skuNameFilter }}</td>
                <td style="border: 1px solid black; text-align: center; width: 80px;">{{ itemss.weight | weightFilter }}</td>
                <td style="border: 1px solid black; text-align: center; width: 80px;">{{ itemss.binQty || 0 }}</td>
              </tr>
              <template v-if="pageIndex === printData.orderDetails.length - 1">
                <tr v-for="(item, blankIndex) in blankRowNum" :key="'index' + blankIndex">
                  <td style="border: 1px solid black; text-align: center; width: 50px;">&nbsp;</td>
                  <td style="border: 1px solid black; text-align: center; width: 160px;">&nbsp;</td>
                  <td style="border: 1px solid black;">&nbsp;</td>
                  <td style="border: 1px solid black; text-align: center; width: 80px;">&nbsp;</td>
                  <td style="border: 1px solid black; text-align: center; width: 80px;">&nbsp;</td>
                </tr>
              </template>
            </table>
            <div style="margin: 5px 0"></div>
            <table style="border: 1px solid black; width: 100%; margin: 0 auto; border-spacing: 0; border-collapse: collapse; font-size: 14px;">
              <tr>
                <th style="border: 1px solid black; width: 50px">车间</th>
                <td v-if="printData.workShopName" style="border: 1px solid black; width: 150px">{{ printData.workShopName }}</td>
                <td v-else style="border: 1px solid black; width: 150px;">&nbsp;</td>
                <th style="border: 1px solid black; width: 130px">生产用料清单号</th>
                <td v-if="printData.voucherCode" style="border: 1px solid black; width: 160px">{{ printData.voucherCode }}</td>
                <td v-else style="border: 1px solid black; width: 160px">&nbsp;</td>
                <th style="border: 1px solid black; width: 70px">工单号</th>
                <td v-if="printData.workOrderNO" style="border: 1px solid black;">{{ printData.workOrderNO }}</td>
                <td v-else style="border: 1px solid black;">&nbsp;</td>
              </tr>
              <tr>
                <td style="border: 1px solid black; padding: 6px;" colspan="6">
                  <div style="padding: 6px;width: 50px; height: 29px; font-weight: bold">货号</div>
                  <p v-if="printData.productName" style="font-size: 40px; font-weight: 700; margin: 0">{{ printData.productName }}</p>
                  <p v-else style="font-size: 40px; font-weight: 700; margin: 0">&nbsp;</p>
                </td>
              </tr>
            </table>
          </div> -->
        </div>
        <button
          id="printButtonRef"
          v-print="printObj">
          打印票单
        </button>
      </div>
  </div>
</template>

<script>
import { keepTwoDecimal } from "@/utils/unit";
export default {
  name: "PrintOrderInfo",
  data() {
    return {
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }
      ],
      pageSize: 48,
      // 控制对话框显示与隐藏
      dialogVisible: false,
      printObj: {
        // 打印配置对象
        id: "printMe",
        popTitle: "&nbsp;",
        extraHead: '<meta http-equiv="Content-Language"content="zh-cn"/>',
      },
      // 打印表单数据对象
      printData: {
        orderDetails: [], // skuCode-商品编码 \ skuName-商品名称 \ weight-重量(斤) \ binQty-箱数
        workShopName: "车间aaa", // 车间
        voucherCode: "生产用料清单号aaa", // 生产用料清单号
        workOrderNO: "工单号aaa", // 工单号
        productName: "货号aaa", // 货号
      },
    };
  },
  filters: {
    skuNameFilter(skuName) {
      return skuName && skuName.length > 23
        ? skuName.substring(0, 23) + " ..."
        : skuName;
    },
    weightFilter(weight) {
      return weight ? keepTwoDecimal(weight) : 0;
    },
  },
  computed: {
    // 打印票单的空白行数（48是每页48行满页的意思）
    blankRowNum() {
      if (
        this.printData &&
        this.printData.orderDetails &&
        this.printData.orderDetails.length
      ) {
        const pageTotal = this.printData.orderDetails.length;
        const lastPage = this.printData.orderDetails[pageTotal - 1];
        return 48 - lastPage.length;
      }
      return 48;
    },
  },
  methods: {
    // 显示上架绑定dialog
    opens(){this.dialogVisible = true;
      document.getElementById("printButtonRef").click();},
    open(printData) {
      this.dialogVisible = true;
      this.printData = printData;
      this.initData();
      // 触发隐藏的打印按钮点击事件，开始打印票单
      document.getElementById("printButtonRef").click();
    },
    // 关闭对话框事件
    handleClose() {
      this.dialogVisible = false;
    },
    // 初始化数据
    initData() {
      // 一维数组拆分成二维数组（代码逻辑数据分页）
      // 二维数组中的每个小数组代表一页数据
      const pageArray = [];
      const total = this.printData.orderDetails.length;
      const pageNum = Math.ceil(total / this.pageSize);
      for (let i = 0; i < pageNum; i++) {
        const pageArr = [];
        if (i === pageNum - 1) {
          pageArray.push(this.printData.orderDetails);
        } else {
          for (let j = 0; j < this.pageSize; j++) {
            pageArr.push(this.printData.orderDetails.shift());
          }
          pageArray.push(pageArr);
        }
      }
      this.printData.orderDetails = pageArray;
    },
  },
};
</script>

<style scoped>
/* @page {
    size: auto;
    margin: 0mm;
  } */

</style>
