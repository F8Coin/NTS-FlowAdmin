<template>
    <el-dialog 
        :visible.sync="isVisible"
        :title="addFundDialog.title" 
        :close-on-click-modal='false'
        :close-on-press-escape='false'
        :modal-append-to-body="false"
        @close="closeDialog">
        <div class="form">
            <el-form 
                ref="form" 
                :model="form"
                :rules="form_rules"
                :label-width="dialog.formLabelWidth" 
                style="margin:10px;width:auto;">

                <el-form-item prop='company' label="企业名称:">
                    <el-input type="text" v-model="form.company"></el-input>
                </el-form-item>

                <el-form-item prop='username'  label="业务负责人:">
                    <el-input type="text" v-model.number="form.username"></el-input>
                </el-form-item>

                <el-form-item prop='tel' label="负责人电话:">
                    <el-input type="text" v-model.number="form.tel"></el-input>
                </el-form-item>

                <el-form-item prop='email' label="负责人邮箱:">
                    <el-input type="text" v-model.number="form.email"></el-input>
                </el-form-item>
                
                <el-form-item prop='address' label="企业地址:">
                    <el-input type="text" v-model.number="form.address"></el-input>
                </el-form-item>

                <el-form-item label="备注:">
                    <el-input type="textarea" v-model="form.remarks"></el-input>
                </el-form-item>

                <el-form-item  class="text_right">
                    <el-button @click="isVisible = false">取 消</el-button>
                    <el-button type="primary" @click='onSubmit("form")'>提  交</el-button>
                </el-form-item>

            </el-form>
        </div>
    </el-dialog>
</template>

<script>
   import { mapState, mapGetters } from 'vuex'
   import { addMoney,updateMoney } from "@/api/money";

  export default {
      name:'addFundDialogs',
      data(){
          let validateData = (rule, value, callback) => {
                if(value === ''){
                    let text;
                    if(rule.field == "username"){
                        text='业务负责人';
                    }else if(rule.field == "tel"){
                        text='电话';
                    }else if(rule.field == "email"){
                        text='邮箱';
                    }else if(rule.field == "address"){
                        text='企业地址';
                    }
                    callback(new Error(text+'不能为空'));
                }
            };
          return {
            isVisible: this.isShow,
            form:{
                address:'',
                company: '',
                username: '',
                tel:'',
                email:'',
                remarks: ''
            },
            payType:[
                {label:'提现',value:'0'},
                {label:'提现手续费',value:'1'},
                {label:'提现锁定',value:'2'},
                {label:'理财服务退出',value:'3'},
                {label:'购买宜定盈',value:'4'},
                {label:'充值',value:'5'},
                {label:'优惠券',value:'6'},
                {label:'充值礼券',value:'7'},
                {label:'转账',value:'8'}
            ],
            form_rules: {
                company   : [
                    {required: true, message : '用户名不能为空',trigger : 'blur'}
                ],
                username   : [
                    { required: true, validator:validateData,trigger: 'blur'},
                ],
                tel   : [
                    { required: true, validator:validateData,trigger: 'blur'},
                ],
                email   : [
                    { required: true, validator:validateData,trigger: 'blur'},
                ],
                address   : [
                    { required: true, validator:validateData,trigger: 'blur'},
                ]
            },
            //详情弹框信息
            dialog: {
                width:'300px',
                formLabelWidth:'120px'
            }
          }
      },
      props:{
          isShow:Boolean,
          dialogRow:Object
      },
      computed:{
        ...mapGetters(['addFundDialog']),

      },
      created(){
           if(this.addFundDialog.type === 'edit'){
                this.form = this.dialogRow;
                // this.form.incomePayType = (this.dialogRow.incomePayType).toString();
                // this.form.pay = -this.dialogRow.pay;
            }else{
                // this.$refs['form'].resetFields();
                // console.log(this.$refs['form']);
            }                
      },
      mounted(){

      },
      methods:{
          onScreeoutMoney(){

          },
          onAddMoney(){

          },
          closeDialog(){
              this.$emit('closeDialog');
          },
          //表单提交
          onSubmit(form){
            this.$refs['form'].validate((valid) => {
                if (valid) {//表单数据验证完成之后，提交数据;
                    let formData = this[form];
                    const para = Object.assign({}, formData)
                    // edit
                    if(this.addFundDialog.type === 'edit'){
                        updateMoney(para).then(res => {
                            this.$message({
                                message: '修改成功',
                                type: 'success'
                            })
                            this.$refs['form'].resetFields()
                            this.isVisible = false
                            this.$emit('getFundList');
                       })
                    }else{
                        // add
                        addMoney(para).then(res => {
                            this.$message({
                                message: '新增成功',
                                type: 'success'
                            })
                            this.$refs['form'].resetFields()
                            this.isVisible = false
                            this.$emit('getFundList');
                       })
                    }
                }
            })
          },
      }
  }
</script>

<style lang="less" scoped>
    .search_container{
        margin-bottom: 20px;
    }
    .btnRight{
        float: right;
        margin-right: 0px !important;
    }
    .searchArea{
        background:rgba(255,255,255,1);
        border-radius:2px;
        padding: 18px 18px 0;
    }
</style>
