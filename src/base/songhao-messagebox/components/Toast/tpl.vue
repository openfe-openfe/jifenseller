<style>
	.messagebox-fade-enter {
	  opacity: 0
	}
	.messagebox-fade-enter-active, .messagebox-fade-leave-active {
	  transition: opacity .4s
	}
	.messagebox-fade-leave-active {
		opacity: 0;
	}

</style>
<template>
	<transition name="messagebox-fade">
		<div class="messagebox-toast" v-if="show">
			<div class="messagebox-toast-message">
				{{content}}
			</div>
		</div>
	</transition>
</template>
<script>
    import pageChange from '../../mixins'
	export default {
        mixins: [pageChange],
		data () {
			return {
				show: false,
				content: '',
				duration: 1500
			}
		}
	}
</script>