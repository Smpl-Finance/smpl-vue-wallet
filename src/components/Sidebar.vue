<template>
	<SpSidebar
		v-on:sidebar-open='sidebarOpen = true'
		v-on:sidebar-close='sidebarOpen = false'
	>
		<template v-slot:default>
			<img src='https://smpl.sfo3.cdn.digitaloceanspaces.com/logos/smpl-fnnc-logo-bird-right.png'
					 style='width: 150px; height: auto; margin-left: 20px' />
		</template>
		<template v-slot:footer>
			<SpStatusAPI :showText='sidebarOpen' />
			<SpStatusRPC :showText='sidebarOpen' />
			<SpStatusWS :showText='sidebarOpen' />
			<div class='sp-text'>Build: v0.3.8</div>
		</template>
	</SpSidebar>
</template>

<script>
export default {
	name: 'Sidebar',
	data() {
		return {
			sidebarOpen: true
		}
	},
	computed: {
		hasWallet() {
			return this.$store.hasModule(['common', 'wallet'])
		}
	}
}
</script>
