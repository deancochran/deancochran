<script lang="ts">
	interface Props {
		src: string;
		alt: string;
		[key: string]: any
	}

	let { src, alt, ...rest }: Props = $props();
	src.replace('/static', '');
</script>

<img {src} {alt} class="object-scale-down" loading="eager" {...rest} />
