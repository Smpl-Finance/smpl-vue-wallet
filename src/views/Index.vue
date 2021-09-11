<template>
	<div>
		<div class="container">
			<SpTokenSend :address="address" class='token-send'/>
			<SpTransferList :address="address"/>
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
