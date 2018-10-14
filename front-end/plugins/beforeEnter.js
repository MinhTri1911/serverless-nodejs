import constant from '@/constant';

export default function ({ store, route, redirect }) {
  if (!!localStorage.getItem('token')) {
    store.dispatch('auth/initAuth');
  }
}
