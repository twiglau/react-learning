<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	uni-button:after {
	    content: ' ';
	    width: 200%;
	    height: 200%;
	    position: absolute;
	    top: 0;
	    left: 0;
	    border: none !important;
	    border-radius: 0 !important;
	}
	page {
		background-color: $uni-bg-color;
	}
	.container {
		background-color: $uni-bg-color !important;
		min-height: 100vh;
	}
</style>
