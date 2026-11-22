// Tiny scripts that run in <head> before the first paint (kept out of client components on purpose).

/** Applies the saved light/dark choice, or follows the operating system. No flash. */
export const themeScript = `(function(){try{var t=localStorage.getItem('yb-theme');var d=t?t==='dark':matchMedia('(prefers-color-scheme: dark)').matches;document.documentElement.classList.toggle('dark',d);}catch(e){}})();`;

/** Hides the cookie notice for visitors who already dismissed it. */
export const cookieScript = `try{if(localStorage.getItem('yb-cookie-notice')==='ok')document.documentElement.dataset.cookieOk='1'}catch(e){}`;
