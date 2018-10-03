export default function ({ store, redirect, route }) {
    //check if user has already login, redirect to Home page
	if (!store.state.auth.authenticated && !!localStorage.getItem('token') == false) {
		localStorage.setItem('redirect_url', route.path)
		return redirect('/Login')
	}

}
