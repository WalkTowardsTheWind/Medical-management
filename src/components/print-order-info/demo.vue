<template>
  <div>
    <!-- <div style="width: 0; height: 0; overflow: hidden"> -->
      <div id="printMe">
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
  <!-- </div> -->
</template>

<script>
export default {
  data() {
    return {
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
}
</script>

<style>

</style>
