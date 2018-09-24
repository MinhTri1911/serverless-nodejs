export default function ({ store, route, redirect }) {
    const token = localStorage.getItem('token')

    //check access token exists within Api local storage
    if (!store.state.auth.authenticated && token) {
        store.dispatch('auth/check')
        // Get info user
        store.dispatch('auth/initAuth')

        if (localStorage.getItem('redirect_url')) {
            let url = localStorage.removeItem('redirect_url')

            return redirect(url)
        } else {
            return redirect(route.path)
        }
    } else {
        return redirect('/admin/auth')
    }
}

