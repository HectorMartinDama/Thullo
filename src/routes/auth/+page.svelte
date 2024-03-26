

<script type="ts">
   import { signIn } from "@auth/sveltekit/client";

</script>

<h1>Pagina para inicar session</h1>
<button type="submit" on:click={() => signIn('google', { callbackUrl: '/' })}>Inicia sesion con google</button>






