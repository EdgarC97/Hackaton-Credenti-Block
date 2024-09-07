export const setToken = (token: string) => {
    localStorage.setItem('accessToken', token);
}

export const getToken = ():string | null => {
    return localStorage.getItem('accessToken');
}

export const isAuthenticated = (): boolean => {
  const token = getToken();
  return Boolean(token); //Retorna true si existe un token
}