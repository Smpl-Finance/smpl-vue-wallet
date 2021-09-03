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
		await this.$store.dispatch(
			'common/env/init',
			{
				apiNode: 'https://smpl-test-node1.s56.net:1318',
				// apiNode: 'http://localhost:1317',
				rpcNode: 'https://smpl-test-node1.s56.net:26658',
				// rpcNode: 'http://localhost:26657',
				wsNode: 'wss://smpl-test-node1.s56.net:26658/websocket',
				// wsNode: 'ws://localhost:26657/websocket',
				chainId: 'smpl-test',
				// chainId: 'linchain',
				addrPrefix: 'smpl',
				// addrPrefix: 'lin',
				sdkVersion: 'Stargate',
				getTXApi: 'https://smpl-test-node1.s56.net:26658/tx?hash=0x',
				// getTXApi: 'http://localhost:26657/tx?hash=0x',
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
