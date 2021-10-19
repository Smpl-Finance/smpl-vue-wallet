import { createStore } from 'vuex'
import init from './config'
import axios from 'axios'

const store = createStore({
	state() {
		return {}
	},
	mutations: {
		addCustodialBalance(state, { balances, walletAddressMap }) {
			console.log('founder', walletAddressMap.founder)
			const allBalancesGetter = this.getters['cosmos.bank.v1beta1/getAllBalances']
			const nonCustodialAddress = store.getters['common/wallet/address']
			const crazyFuckingObject = {
				params: { address: nonCustodialAddress },
				query: null
			}
			const allBalances = allBalancesGetter(crazyFuckingObject)

			balances.forEach(
				balance => {
					const denom = walletAddressMap.founder ? `Dem Dank ${balance.denom}zzz` : balance.denom;
					allBalances?.balances?.push({ denom: `${denom} (unvested)`, amount: balance.amount })
				}
			)
		}
	},
	actions: {
		async getCustodialBalance(store, walletAddressMap) {
			const apiHost = process.env.VUE_APP_SMPL_CHAIN_API_HOST
			const apiPort = process.env.VUE_APP_SMPL_CHAIN_API_PORT
			const webProtocol = process.env.VUE_APP_SMPL_CHAIN_WEB_PROTO

			const url = `cosmos/bank/v1beta1/balances/${walletAddressMap.custodialAddress}`

			const custodialBalance = await axios.get(`${webProtocol}://${apiHost}:${apiPort}/${url}`)


			store.commit('addCustodialBalance', { balances: custodialBalance?.data?.balances, walletAddressMap })
		}
	}
})
init(store)
export default store
