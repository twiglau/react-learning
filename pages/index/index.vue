<template>
	<view class="content">
		<image class="logo" src="/static/logo.png"></image>
		<view class="text-area">
			<text class="title">{{count}}</text>
			<text>{{userId}}</text>
		</view>
		<view>
			<u-button
			    text="默认按钮"
			    size="normal"
				type="success"
				@click="btnClick"
			></u-button>
			<u-button
				text="危险按钮"
				size="normal"
				type="error"
				@click="btnClick"
			></u-button>
		</view>
	</view>
</template>

<script setup>
	import { computed, ref } from 'vue'
	import { login } from '@/api/user'
	import { useStore } from 'vuex'
	
	const store = useStore()
	const userId = computed(() => store.state.user.userId)
	const count = ref(10)
	const btnClick = async () => {
		const res = await login()
		console.log('res: ', res)
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
