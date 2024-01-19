

<script lang="ts">
    import { page } from "$app/stores"
	import CreateBoard from "./CreateBoard.svelte";
    import { signOut } from "@auth/sveltekit/client";


    // shacdn svelte
    import { Button } from "$lib/components/ui/button";
    import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
	import { enhance } from "$app/forms";

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
    

    const handleDropDownClick= () =>{
        isDropDownOpen= !isDropDownOpen
    }

   


   
   


   


</script>



<nav class="flex justify-between items-center border-b-2 border-[#D9DDE2] dark:border-[#32383D] h-[48px] w-full bg-[white] dark:bg-[#1D2125]">
    <!-- FIRST GROUP -->
    <div class="flex flex-row pl-[24px]" >
        <a href="/boards">
            <img class="h-[24px]" src="Logo.svg" alt="brandLogo">
        </a>
        <h1>{isDropDownOpen}</h1>
        <div>
            <div use:clickOutside={() => { isDropDownOpen= false }} class="dropdown active" data-dropdown>
                <button on:click={handleDropDownClick} data-dropdown-button id="link" class="h-[32px] text-sm font-medium text-white dark:text-[#1d2125] transition-colors duration-300 ease-in-out bg-[#0C66E4] hover:bg-[#0055CC] px-[12px] rounded-[5px]">Create</button>
                <!-- elemento que queremos ocultar -->
                {#if isDropDownOpen}
                    <div class="dropdown-menu">
                        <CreateBoard/>
                    </div>
                {/if}
            </div>
        </div>
    </div>

    <!-- SECOND GROUP -->
    <div class="pr-[24px]">
        <img class="h-[24px] w-[24px] rounded-full" src="{$page.data.session?.user?.image}" alt="profilePicture">
    </div>


    <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild let:builder>
          <Button builders={[builder]} variant="outline">Open</Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content class="w-56">
          <DropdownMenu.Label>My Account</DropdownMenu.Label>
          <DropdownMenu.Separator />
         
          <DropdownMenu.Separator />
          <DropdownMenu.Group>
            <DropdownMenu.Item>Team</DropdownMenu.Item>
            <DropdownMenu.Sub>
              <DropdownMenu.SubTrigger>Tema</DropdownMenu.SubTrigger>
              <DropdownMenu.SubContent>
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
                            <DropdownMenu.Item>Dark</DropdownMenu.Item>
                        </button>
                    </div>

                    <!-- LIGHT Element -->
                    <div>
                        <button on:click={() => nextTheme= 'light'}>
                            <DropdownMenu.Item>Light</DropdownMenu.Item>
                        </button>
                    </div>


                </form>
              
                       
                   

                 
                       
                 

                  
                        <DropdownMenu.Item>Sistem</DropdownMenu.Item>
                   
             
              </DropdownMenu.SubContent>
            </DropdownMenu.Sub>
          
          </DropdownMenu.Group>
          <DropdownMenu.Separator />
          <DropdownMenu.Item>GitHub</DropdownMenu.Item>
          <DropdownMenu.Item>Support</DropdownMenu.Item>
          <DropdownMenu.Item>API</DropdownMenu.Item>
          <DropdownMenu.Separator />
          <DropdownMenu.Item on:click={() => signOut({ callbackUrl: '/auth' })}>
            Log out
            <DropdownMenu.Shortcut>⇧⌘Q</DropdownMenu.Shortcut>
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