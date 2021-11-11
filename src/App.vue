<template>
	<div v-if='initialized'>
		<SpWallet ref='wallet' v-on:dropdown-opened='$refs.menu.closeDropdown()' />
		<SpLayout>
			<template v-slot:sidebar>
				<Sidebar />
			</template>
			<template v-slot:content>
				<router-view />
			</template>
		</SpLayout>
	</div>
</template>

<style>
body {
	margin: 0;
}
</style>

<script>
import './scss/app.scss'
import '@starport/vue/lib/starport-vue.css'
import Sidebar from './components/Sidebar'
import { addressMaps } from './addressMaps.js'

export default {
	components: {
		Sidebar
	},
	data() {
		return {
			initialized: false
		}
	},
	computed: {
		hasWallet() {
			return this.$store.hasModule(['common', 'wallet'])
		}
	},
	async created() {
		const apiHost = process.env.VUE_APP_SMPL_CHAIN_API_HOST
		const apiPort = process.env.VUE_APP_SMPL_CHAIN_API_PORT
		const rpcHost = process.env.VUE_APP_SMPL_CHAIN_RPC_HOST
		const rpcPort = process.env.VUE_APP_SMPL_CHAIN_RPC_PORT
		const chainId = process.env.VUE_APP_SMPL_CHAIN_ID
		const webProtocol = process.env.VUE_APP_SMPL_CHAIN_WEB_PROTO
		const websocketProtocol = process.env.VUE_APP_SMPL_CHAIN_WEBSOCKET_PROTO


		await this.$store.dispatch(
			'common/env/init',
			{
				apiNode: `${webProtocol}://${apiHost}:${apiPort}`,
				rpcNode: `${webProtocol}://${rpcHost}:${rpcPort}`,
				wsNode: `${websocketProtocol}://${rpcHost}:${rpcPort}/websocket`,
				chainId: `${chainId}`,
				addrPrefix: `smpl`,
				sdkVersion: 'Stargate',
				getTXApi: `${webProtocol}://${rpcHost}:${rpcPort}/tx?hash=0x`,
				refresh: 10000
			}
		)
		this.initialized = true

		this.$store.subscribe(
			(mutation, state) => {
				if (mutation.type !== 'cosmos.bank.v1beta1/QUERY') {
					return
				}
				const nonCustodialAddress = this.$store.getters['common/wallet/address']
				const custodialAddress = addressMaps[chainId].find(
					e => e.nonCustodialAddress?.toLowerCase() === nonCustodialAddress?.toLowerCase()
				)

				if (!custodialAddress) {
					return
				}
				this.$store.dispatch('getCustodialBalance', custodialAddress)
			}
		)
	},
	errorCaptured(err) {
		console.log(err)
		return false
	}
}
</script>
