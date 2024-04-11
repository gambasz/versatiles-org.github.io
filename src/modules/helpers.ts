import handlebars from 'handlebars';
import { HelperDelegate } from 'handlebars';
import Context from '../lib/context.ts';

export async function build(context: Context) {
	await register('../helpers/merge_css.ts');

	async function register(filename: string) {
		const module = await import(filename + '?version=' + Date.now());
		let fun: HelperDelegate = module.helper(context);

		handlebars.registerHelper(module.name, (...args) => {
			try {
				return fun(...args)
			} catch (err) {
				console.error(err);
				return '<h1 style="color:red">' + String(err) + '</h1>'
			}
		});
	}
}
