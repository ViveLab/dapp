import * as constants from '@/store/constants'
import CertifierContract from '@/contracts/Certifier.json'
const state = {
  provider: !!(window.web3 && window.web3.currentProvider),
  isOwner: false,
  name: null,
  contract: null,
  coinbase: null
}

const actions = {
  [constants.CERTIFIER_INIT]: ({commit}) => {
    const abi = CertifierContract.abi
    const contractAddress = '0xb015812908eb910f530f793b53a4b68ace1627e8'
    const instance = web3.eth.contract(abi).at(contractAddress)
    commit(constants.CERTIFIER_SET_INSTANCE, instance)
    web3.eth.getCoinbase((error, coinbase) => {
      if(error) console.error(error)
      commit(constants.CERTIFIER_SET_COINBASE, coinbase)
      instance.isOwner({from: coinbase}, (error, isOwner) => {
        if(error) console.error(error)
        commit(constants.CERTIFIER_SET_IS_OWNER, isOwner)
      })
      instance.getName({from:coinbase},(error,name)=>{
        if(error) console.error(error)
        commit(constants.CERTIFIER_SET_NAME,name)
      })
    })
  }
}

const mutations = {
  [constants.CERTIFIER_SET_INSTANCE]: (state, instance) => {
    state.contract = instance
  },
  [constants.CERTIFIER_SET_COINBASE]: (state, coinbase) => {
    state.coinbase = coinbase
  },
  [constants.CERTIFIER_SET_IS_OWNER]: (state, isOwner) => {
    state.isOwner = isOwner
  },
  [constants.CERTIFIER_SET_NAME]:(state,name)=>{
    state.name= name
  }
}

const getters = {}

export default {
  state,
  actions,
  mutations,
  getters
}