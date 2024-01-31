<template>
	<view class="content">
		<image class="logo" src="/static/logo.png"></image>
		<view class="text-area">
			<text class="title">{{count}}</text>
			<text class="u-id">{{userId}}</text>
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
		<test ref="testRef" />
	</view>
</template>

<script setup>
	import Test from '@/components/test'
	import { computed, getCurrentInstance, ref } from 'vue'
	import { login } from '@/api/user'
	import { useStore } from 'vuex'
	const instance = getCurrentInstance()
	const store = useStore()
	const userId = computed(() => store.state.user.userId)
	const count = ref(10)
	const testRef = ref(null)
	const uidColor = ref('red')
	const btnClick = async () => {
		const res = await login()
		console.log('res: ', res)
		uidColor.value = 'blue'
		console.log('value:', instance.vnode.el.parentElement?.removeChild(instance.vnode.el))
	}
</script>

<style lang="scss">
	.u-id {
		color: v-bind(uidColor);
	}
</style>
