

<script lang="ts">
    import { page } from "$app/stores"
	import CreateBoard from "./CreateBoard.svelte";
    import { signOut } from "@auth/sveltekit/client";
    import AllBoardButton from "./AllBoardButton.svelte";
    import BrandIcon from "./icons/BrandIcon.svelte";



    // shacdn svelte
    import { Button } from "$lib/components/ui/button";
    import { Avatar } from "bits-ui";
    import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
	import { enhance } from "$app/forms";
	import Search from "./Search.svelte";
	import { Root } from "postcss";

    let isDropDownOpen = false;
    let nextTheme: string;
    
    export function clickOutside(element, callbackFunction){
        function onClick(event){
            if(!element.contains(event?.target)){
                callbackFunction();
            }
        }
        document.addEventListener('click', onClick);
        return { 
            update(newCallBackFunction){
                callbackFunction= newCallBackFunction;
            },
            destroy(){
                document.removeEventListener('click', onClick)
            } 
        }
    }
    

    // return the first letter
    const firstLetter= (username) =>{
        return username.charAt(0);
    }

    const handleDropDownClick= () =>{
        isDropDownOpen= !isDropDownOpen
    }

   


   
   


   


</script>



<nav class="flex justify-between items-center border-b-2 border-[#D9DDE2] dark:border-[#32383D] h-[68px] w-full bg-[white] dark:bg-[#1D2125]">
    <!-- FIRST GROUP -->
    <div class="flex flex-row pl-[35px]" >
        <a href="/boards">
            <BrandIcon/>                
        </a>

        <!-- BOARD TITLE -->
        <h1 class="text-[#333333] dark:text-[#B6C2CF] justify-center text-xl font-semibold ml-[130px]">Devchallenges Board</h1>
        <div class="inline-block h-[35px] mx-[30px] border-[1px] border-[#E0E0E0]"></div>

        <!-- <div>
            <div use:clickOutside={() => { isDropDownOpen= false }} class="dropdown active" data-dropdown>
                <button on:click={handleDropDownClick} data-dropdown-button id="link" class="h-[32px] text-sm font-medium text-white dark:text-[#1d2125] transition-colors duration-300 ease-in-out bg-[#0C66E4] hover:bg-[#0055CC] px-[12px] rounded-[5px]">Create</button>
                
                {#if isDropDownOpen}
                    <div class="dropdown-menu">
                        <CreateBoard/>
                    </div>
                {/if}
            </div>
        </div> -->
        <AllBoardButton/>
    </div>

  
    <Search/>


    
        <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild let:builder>
                {#if $page.data.session}
                <Button builders={[builder]} class='h-[36px] w-[36px] rounded-full flex justify-center items-center'>
                    <object data="{$page.data.session.user?.image}" type="image/jpg" class="-z-1 h-[35px] w-[35px] rounded-full" title="profile picture">  
                        <div class="h-[36px] w-[36px] rounded-full bg-[#BDBDBD] flex items-center justify-center">
                            <span class=" text-md">{firstLetter($page.data.session?.user?.name)}</span>
                        </div>
                    </object>
                </Button>
                
                
                {/if}
              
            </DropdownMenu.Trigger>
            <DropdownMenu.Content class="w-56 bg-[white] text-[#172B4D] dark:bg-[#282e33] dark:text-[#B6C2CF] text-base border-none rounded-xl">
              <DropdownMenu.Label class="text-base font-semibold">My Account</DropdownMenu.Label>
              <DropdownMenu.Separator />
             
              <DropdownMenu.Separator />
              <DropdownMenu.Group>
                <DropdownMenu.Sub>
                  <DropdownMenu.SubTrigger class="text-base">Tema</DropdownMenu.SubTrigger>
                  <DropdownMenu.SubContent class="bg-[white] dark:bg-[#282e33] text-base border-none rounded-xl">
                    <form method="POST" action="/?/theme" use:enhance={({formData}) =>{
                        formData.append('theme', nextTheme);
                        const htmlElement= document.querySelector('html');
                        if(!htmlElement) return;
                        htmlElement.setAttribute('data-theme', nextTheme);
                        htmlElement.classList.toggle($page.data.theme);
                    }}>
                        <!-- DARK Element -->
                        <div>
                            <button on:click={() => nextTheme= 'dark'}>
                                <DropdownMenu.Item class="text-base">Dark</DropdownMenu.Item>
                            </button>
                        </div>
    
                        <!-- LIGHT Element -->
                        <div>
                            <button on:click={() => nextTheme= 'light'}>
                                <DropdownMenu.Item class="text-base">Light</DropdownMenu.Item>
                            </button>
                        </div>
    
    
                    </form>
                  
                           
                       
    
                     
                           
                     
    
                      
                            <DropdownMenu.Item class="text-base">Sistem</DropdownMenu.Item>
                       
                 
                  </DropdownMenu.SubContent>
                </DropdownMenu.Sub>
              
              </DropdownMenu.Group>
              <DropdownMenu.Separator />
              <DropdownMenu.Item class="text-base">GitHub</DropdownMenu.Item>
              <DropdownMenu.Item class="text-base">Support</DropdownMenu.Item>
              <DropdownMenu.Item class="text-base">API</DropdownMenu.Item>
              <DropdownMenu.Separator />
              <DropdownMenu.Item class="text-base" on:click={() => signOut({ callbackUrl: '/auth' })}>
                Log out
                <DropdownMenu.Shortcut class="text-base">⇧⌘Q</DropdownMenu.Shortcut>
              </DropdownMenu.Item>
            </DropdownMenu.Content>
        </DropdownMenu.Root>

  
    
</nav>


<style lang="css">


    


    .dropdown {
        position: relative;
    }

    

    

    .dropdown-menu{
        position: absolute;
        left: 0;
        top: calc(100% + .5rem);
        opacity: 0;
        transform: translateY(-10px);
        transition: opacity 150ms ease-in-out, transform 150ms ease-in-out;
    }

    .dropdown.active > #link + .dropdown-menu{
        opacity: 1;
        transform: translateY(0);
        pointer-events: auto;

    }

    

   
</style>