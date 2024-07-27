<template>
	<tm-tabbar :autoSelect="false" v-model:active="activeIndex" :width="0">
		<tm-tabbar-item @click="setActiveIndex(0)" activeColor="blue" text="首页" icon="tmicon-home">
		</tm-tabbar-item>

		<tm-tabbar-item @click="setActiveIndex(1)" activeColor="blue" text="我的" icon="tmicon-account">
		</tm-tabbar-item>
	</tm-tabbar>
</template>

<script setup lang="ts">
import useTabBarStore from "@/store/tabBar";

const tabBarStore = useTabBarStore();

let activeIndex = $computed<number>(() => tabBarStore.activeIndex)

async function setActiveIndex(index: number) {
	if (activeIndex !== index) {
		if (index === 0) {
			uni.navigateTo({
				url: '/pages/index/index'
			});
		} else {
			uni.navigateTo({
				url: '/pages/my/index'
			});
		}
	}
	//把当前activeIndex 实时存储在仓库
	tabBarStore.setActiveIndex(index)
}

</script>

<style scoped lang="scss"></style>
