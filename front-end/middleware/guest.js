import constant from '../constant';

export default function ({ store, redirect, route }) {
  // Check if user has already login, redirect to Home page
  if (store.state.auth.authenticated
    && !!localStorage.getItem('token')
    && route.name == 'client_id-login'
  ) {
    return redirect('/' + route.params.client_id);
  }

   // Check if Admin has already login, redirect to Home page
   if (store.state.auth.admin_flag
    && !!localStorage.getItem('token')
    && route.name == 'client_id-login-admin'
  ) {
    return redirect('/' + route.params.client_id);
  }

  // Store if user are visit SELECT_TICKET to go it when Login successful
  if (route.name === constant.router.SELECT_TICKET_NAME
    || route.name === constant.router.SELECT_SEAT_NAME
  ) {
    store.dispatch('auth/setUrl', {"redirectURL": route.name, "id": route.params.id, "query": route.query});
  }

  // Check user to to another page we delete this redirect_url
  if (route.name !== constant.router.SELECT_TICKET_NAME
    && route.name !== constant.router.LOGIN_NAME
    && route.name !== constant.router.SELECT_SEAT_NAME
  ) {
    store.dispatch('auth/removeUrl');
  }

  // Remove redirect URL error page
  if (route.name === constant.router.ERROR_NAME) {
    store.dispatch('auth/removeUrl');
  }

  //Check token it user have
  if (store.state.auth.authenticated) {
    store.dispatch('auth/initAuth');
  }

  if (store.state.auth.admin_flag) {
    store.dispatch('auth/initAuthAdmin');
  }

}
