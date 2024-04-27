import { type Actions, fail, redirect } from '@sveltejs/kit';
import { isValidTheme } from '../../hooks.server';
import { deleteAccount } from '$lib/requestsBackend';
import type { addMemberParams } from '$lib/types';

export const actions: Actions = {
	theme: async ({ cookies, request }) => {
		const data = await request.formData();
		const theme = data.get('theme');
		console.log('paso por aqui');
		if (!isValidTheme(theme)) {
			return fail(400, { theme, missing: true });
		}
		cookies.set('theme', theme, { path: '/' });
		return { success: true };
	},
	deleteAccount: async ({ request, cookies }) => {
		const authToken = cookies.get('AuthorizationToken');
		const { email } = Object.fromEntries(await request.formData()) as addMemberParams;
		if (email) await deleteAccount(authToken, email);
		redirect(302, '/');
	}
};
