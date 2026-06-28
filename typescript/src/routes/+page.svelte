<script>
	import { resolve } from '$app/paths';
</script>

<p>Login and goto</p>
<ul>
	<li><a href={resolve('/setup')}>same page</a></li>
	<li><a href={resolve('/setup?random')}>random page</a></li>
</ul>
