export default function ({ store, redirect, route }) {
    if (!store.state.auth.authenticated && !!localStorage.getItem('token') == false) {
        localStorage.setItem('redirect_url', route.path)
        
        return redirect('/admin/auth')
    }
}