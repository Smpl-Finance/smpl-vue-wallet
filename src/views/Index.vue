<template>
	<div>
		<div class="container">
			<SpTokenSend :address="address" style='background: #274D94'/>
			<SpTransferList :address="address"  style='background-color: #cbb26a'/>
		</div>
	</div>
</template>

<script>
export default {
	components: {

	},
	name: 'Index',
	computed: {
		address() {
			return this.$store.getters['common/wallet/address']
		}
	}
}
</script>
