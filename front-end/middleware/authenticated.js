import constant from '@/constant';

export default function ({ store, redirect, route }) {
  //check if user has already login, redirect to Home page
	if (!store.state.auth.authenticated && !!localStorage.getItem('token') == false) {
    return redirect(('/' + route.params.client_id + constant.router.LOGIN));
	} else {
    //call this function to check token of user
	  store.dispatch('auth/initAuth');
  }
}
