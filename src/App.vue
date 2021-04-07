<template>
	<div @click="checkName">
		<div>{{ name }}</div>
		<Button type="primary">几点我</Button>
		<Button type="primary" loading-txt="缓慢提交中..."></Button>
	</div>
</template>
<script>
import { defineComponent, ref } from 'vue'
import { Button } from '../packages/Button'
export default defineComponent({
	components: {
		Button,
	},
	setup() {
		const name = ref('shao')
		const checkName = () => {
			name.value = 'zhang'
		}
		const change = (val) => {
			alert(val)
		}
		return {
			name,
			checkName,
			change,
		}
	},
})
</script>
