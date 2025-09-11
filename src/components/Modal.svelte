<script>
	import { fade, scale } from 'svelte/transition';
	
	let { isOpen = false, isRaw = false, maxW = 'max-w-full', forceClose = true, onClose = () => {}, children } = $props();
	
	function close() {
		onClose();
	}
	
	function handleKeydown(e) {
		if (forceClose && (e.key === 'Enter' || e.key === ' ')) {
			close();
		}
	}
</script>

{#if isOpen}
	<div class="fixed inset-0 z-10 overflow-y-auto">
		<div 
			class="fixed inset-0 bg-gray-500 dark:bg-gray-800 bg-opacity-75 dark:bg-opacity-75 transition-opacity" 
			transition:fade 
			role="button" 
			tabindex="0" 
			onclick={forceClose ? close : null} 
			onkeydown={handleKeydown}
		></div>
		<div class="flex items-center sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
			<div
				class="relative bg-white dark:bg-gray-900 rounded-lg {isRaw ? 'p-0' : 'p-4'} text-left overflow-hidden shadow-xl transform transition-all my-8 w-full {maxW}"
				transition:scale={{ duration: 300 }}
			>
				{@render children?.()}
			</div>
		</div>
	</div>
{/if}