import { GetRequest, Request } from "./base";

export const login = (body, callback) => {
	const headers = new Headers({
		'Content-type': 'application/json; charset=UTF-8',
	});
	Request(`${process.env.REACT_APP_API_URL}/login`, headers, 'POST', body)
		.then((response) => {
			if (!response.ok) {
				if (response.status === 500) {
					response.json().then(() => callback({ ok: false, message: '500: Internal server error' }));
				} else {
					response.json().then(data =>
						callback({ ok: false, message: data.message }));
				}
			} else {
				response.json().then((data) => {
					localStorage.setItem('HelloBuildApp', JSON.stringify(data));
					callback({ ok: true });
				})
			}
		});
};

export const register = (body, callback) => {
	const headers = new Headers({
		'Content-type': 'application/json; charset=UTF-8',
	});
	Request(`${process.env.REACT_APP_API_URL}/register`, headers, 'POST', body)
		.then((response) => {
			if (!response.ok) {
				if (response.status === 500) {
					response.json().then(() => callback({ ok: false, message: '500: Internal server error' }));
				} else {
					response.json().then(data => callback({ ok: false, message: data.message }));
				}
			} else {
				callback({ ok: true });
			}
		});
};

export const getGitHubAT = (body, callback) => {
	const headers = new Headers({
		'Content-type': 'application/json; charset=UTF-8',
	});
	Request(`${process.env.REACT_APP_API_URL}/github`, headers, 'POST', body)
		.then((response) => {
			if (!response.ok) {
				if (response.status === 500) {
					response.json().then(() => callback({ ok: false, message: '500: Internal server error' }));
				} else {
					response.json().then(data => callback({ ok: false, message: data.message }));
				}
			} else {
				response.json().then((data) => {
					localStorage.setItem('HelloBuildAppGAT', data.access_token);
					callback({ ok: true });
				})
			}
		});
};

export const getFavorites = (id, callback) => {
	const headers = new Headers({
		'Content-type': 'application/json; charset=UTF-8',
	});
	GetRequest(`${process.env.REACT_APP_API_URL}/favorites?id=${id}`, headers)
		.then((response) => {
			if (response.ok) {
				response.json().then(data => callback({ ok: true, data }));
			} else {
				callback({ ok: false });
			}
		});
};

export const postFavorite = (body, callback) => {
	const headers = new Headers({
		'Content-type': 'application/json; charset=UTF-8',
	});
	Request(`${process.env.REACT_APP_API_URL}/favorites`, headers, 'POST', body)
		.then((response) => {
			if (!response.ok) {
				if (response.status === 500) {
					response.json().then(() => callback({ ok: false, message: '500: Internal server error' }));
				} else {
					response.json().then(data => callback({ ok: false, message: data.message }));
				}
			} else {
				callback({ ok: true });
			}
		});
};