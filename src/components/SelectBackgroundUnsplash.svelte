

<script lang="ts">
	import type { Image } from "$lib/types";
    import { getPhotoByQuery } from "$lib/unsplashService";
	import { createEventDispatcher } from "svelte";

    let searchValue='';
    let backgrounds: Image[]= [];

    const dispacth= createEventDispatcher();

    const search= async (name: string) =>{
        let response= await getPhotoByQuery(name);
        if (response) backgrounds= response.results;
    }

    const handleBackgroundSelected= (image: string) =>{
        dispacth('selectBackgroundUnsplash', image);
    }
</script>


<section class="h-[504px] w-[304px] border rounded-lg px-[12px] pt-[15px] shadow-lg">
    <header>
        <h3 class="text-center font-semibold text-[#44546F]">Fotos de <a href="https://unsplash.com" target="_blank">Unsplash</a></h3>
    </header>

    <div>
        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-search" width="16" height="16" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" /><path d="M21 21l-6 -6" /></svg>
        <input class="outline-none w-full h-[36px] py-[8px] border-2 border-gray-300 rounded-md" placeholder="Fotos" bind:value={searchValue} on:input={async () => await search(searchValue)} type="search" name="" id="">
    </div>
   
   
    
    <div class="grid grid-cols-2 gap-4 overflow-y-scroll h-full">
        {#if backgrounds }
            {#each backgrounds as image }
                <button on:click={() => handleBackgroundSelected(image.urls.full)}>
                    <img class="rounded-[3px] w-[132px] h-[73px] object-cover" src="{image.urls.small}" alt={image.description}>
                </button>
            {/each}
        {/if}
    </div>
</section>





