export default function ({ store, redirect, route }) {
    if (store.state.auth.authenticated && localStorage.getItem('token')) {
        if (route.name == 'admin-auth') {
            let url = localStorage.getItem('redirect_url')
                ? localStorage.getItem('redirect_url') 
                : '/'

            return redirect(url)            
        }
    }
}