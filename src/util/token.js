export function clearToken()
{
    window.sessionStorage.removeItem("loginToken");
    window.localStorage.removeItem("loginToken");
}