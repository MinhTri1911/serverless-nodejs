import constant from '../constant';
import { isNull } from 'util';
export default function ({ store, redirect, route }) {
  //call this function to check token of user
	store.dispatch('auth/initAuth')
	//check if user has already login, redirect to Home page
    if (store.state.auth.authenticated && !!localStorage.getItem('token')) {
			if (route.name == 'login') {
				return redirect('/')
			}
		}
		//store if user are visit SELECT_TICKET to go it when Login successful
    if (route.name === constant.router.SELECT_TICKET) {
			localStorage.setItem('redirect_url', route.name);
			}
		//if user to to another page we delete this redirect_url
		if (route.name !== constant.router.SELECT_TICKET && route.name !== 'login') {
			localStorage.removeItem('redirect_url');
    }
}
