<script lang="ts">
	export let boardName: string;
	let enable = false;
	let inputBoardNameValue: string;

	//$: if (inputBoardNameValue) checkDeleteBoard(); // cada vez que escriba el usuario compruebo si puede borrar el tablero

	const checkDeleteBoard = () => {
		if (inputBoardNameValue === boardName) {
			enable = true;
		} else {
			enable = false;
		}
	};
</script>

<form action="?/deleteBoard" method="post">
	<p class="bg-red-400 border rounded-[8px] py-5 px-2 mb-4">
		Thullo will delete your board, activity and all other resources belonging to your Board
	</p>
	<div class="flex flex-col">
		<label for="nameBoard"
			>Enter your board name <span class="font-semibold">{boardName}</span> to continue:</label
		>
		<input
			type="text"
			name="nameBoard"
			bind:value={inputBoardNameValue}
			on:keyup={checkDeleteBoard}
			class="w-full text-sm py-2 px-2 outline-none border rounded-[8px] mb-4 mt-4"
		/>
	</div>
	<div class="flex justify-center">
		<button
			type="submit"
			class="py-2 px-2 rounded-[4px] text-sm bg-red-600 transition-colors duration-150 hover:bg-[#AE292E] text-white"
			disabled={!enable}>Delete board</button
		>
	</div>
</form>

<style>
	/* Hacer lo mas seguro para que no se pueda copiar el nombre del tablero */
	label {
		user-select: none;
		-moz-user-select: none; /* Firefox */
		-webkit-user-select: none; /* Safari and Chrome */
		-ms-user-select: none; /* IE 10+ */
	}
</style>
