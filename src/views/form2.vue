<template>
  <CommonForm :form-data="formData" :form-items="formItems" :inline="true">
    <template v-slot:age="">
      <el-input v-model="formData.age"></el-input>
    </template>
    <template v-slot:footer="">
        <el-row>
            <el-button >查询</el-button>
            <el-button type="danger" >新增</el-button>
        </el-row>
    </template>
  </CommonForm>
</template>
<script>
export default {
  data() {
    return {
      formItems: [
        {
          el: "el-input",
          placeholder: "输入姓名",
          key: "name",
          label: "姓名",
        },
        {
          el: "slot",
          key: "age",
          label: "年龄",
        },
      ],
      formData: {
        name: "bigham",
        age: 26,
      },
    };
  },
};
</script>