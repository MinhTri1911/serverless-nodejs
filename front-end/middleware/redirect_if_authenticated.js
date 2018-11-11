export default function ({ store, redirect, route }) {

  // Check user has already login, redirect to Home page
  if (store.state.auth.authenticated) {
    return redirect('/' + route.params.client_id);
  }
}
