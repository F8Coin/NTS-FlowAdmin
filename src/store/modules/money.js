
import { getMoneyIncomePay } from '@/api/money'  // 导入企业用户信息相关接口

const money = {
  state: {
     addFundDialog: {
        title:'创建企业账户',
        type:'add'
     },
     search: {
        startTime:'',
        endTime:'',
        name:''
     },
     searchBtnDisabled: true
  },
  getters:{
    addFundDialog: state => state.addFundDialog,
    search: state => state.search,
    searchBtnDisabled: state => state.searchBtnDisabled,
  },
  mutations: {
    SET_DIALOG_TITLE: (state, type) => {
      if(type === 'add'){
        state.addFundDialog.title = '创建企业账户'
        state.addFundDialog.type = 'add'
      }else{
        state.addFundDialog.title = '修改企业账户信息'
        state.addFundDialog.type = 'edit'
      }
    },
    SET_SEARCH : (state, payload) => {
       state.search = payload;
    },
    SET_SEARCHBTN_DISABLED : (state, payload) => {
      state.searchBtnDisabled = payload;
   }
  },
  actions: {
     // 获取企业用户列表
     GetMoneyIncomePay({commit},reqData) {
        return new Promise(resolve => {
            getMoneyIncomePay(reqData).then(response => {
                const data = response.data
                resolve(data)
            })
        })
    } 


  }
}

export default money
