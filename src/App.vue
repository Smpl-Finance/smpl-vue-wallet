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

		console.log(`api host:port: ${apiHost}:${apiPort}`)
		console.log(`rpc host:port: ${rpcHost}:${rpcPort}`)
		console.log(`chainId: ${chainId}`)

		await this.$store.dispatch(
			'common/env/init',
			{
				apiNode: `https://${apiHost}:${apiPort}`,
				rpcNode: `https://${rpcHost}:${rpcPort}`,
				wsNode: `wss://${rpcHost}:${rpcPort}/websocket`,
				chainId: `${chainId}`,
				addrPrefix: `smpl`,
				sdkVersion: 'Stargate',
				getTXApi: `https://${rpcHost}:${rpcPort}/tx?hash=0x`,
				refresh: 10000
			}
		)
		this.initialized = true
	},
	errorCaptured(err) {
		console.log(err)
		return false
	}
}
</script>
