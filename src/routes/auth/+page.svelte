

<script type="ts">
   import { signIn } from "@auth/sveltekit/client";





   export let data;
   console.log('hola a todos', data.session);
</script>

<h1>Pagina para inicar session</h1>
<button type="submit" on:click={() => signIn('google', { callbackUrl: '/' })}>Inicia sesion con google</button>






