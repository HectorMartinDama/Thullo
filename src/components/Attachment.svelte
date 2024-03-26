

<script lang="ts">
	import type { Attachament } from "$lib/types";

    export let attachament: Attachament;
</script>



<section class="flex flex-row gap-[50px]">
    <object data="hola.png" type="image/jpg" class="w-[80px] h-[53px] rounded-[8px]" >
        <div class="w-[80px] h-[53px] rounded-[8px] bg-[#E0E0E0]">
            <span class="text-[#4F4F4F]"></span>
        </div>
    </object>
    
    <div class="gap-[7px]">
        <button class="h-[30px] w-[90px] rounded-[8px] border border-[#BDBDBD] text-[#828282] flex justify-center items-center">Download</button>
        <button class="h-[30px] w-[90px] rounded-[8px] border border-[#BDBDBD] text-[#828282] flex justify-center items-center">Delete</button>
    </div>
</section>
