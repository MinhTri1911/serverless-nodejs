import constant from '@/constant';

export default function ({ store, route, redirect }) {
  if (store.state.auth.authenticated) {
    store.dispatch('auth/initAuth');
  }
}
