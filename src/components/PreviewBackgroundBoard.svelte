

<script lang="ts">
    export let image: string;

    $: if(image) console.log('ha cambiado', image)
</script>

<div class="w-[200px] h-[120px] bg-cover bg-no-repeat rounded-md flex justify-center items-center" style="background-image: url({image});">
    <img class="items-center justify-center" src="board.svg" alt="boardIcon">
</div>


