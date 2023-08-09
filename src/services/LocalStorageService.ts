export const LocalStorageService = {
	get(name: string) {
		return localStorage.getItem(name);
	},

	set(name: string, item: any) {
		localStorage.setItem(name, item);
	},

	remove(name: string) {
		localStorage.removeItem(name);
	}
};
