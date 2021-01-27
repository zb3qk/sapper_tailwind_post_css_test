import { writable } from 'svelte/store';
import watchMedia from "svelte-media";

const mediaqueries = {
    small: "(max-width: 849px)",
    large: "(min-width: 850px)",
    short: "(max-height: 399px)",
    landscape: "(orientation: landscape) and (max-height: 499px)",
    tiny: "(orientation: portrait) and (max-height: 599px)",
    dark: "(prefers-color-scheme: dark)",
    noanimations: "(prefers-reduced-motion: reduce)"
  };
  
export const media = watchMedia(mediaqueries);

const createLocalStore = (key, startValue) => {
  const {
    subscribe,
    set,
    update
  } = writable(startValue);

  return {
    subscribe,
    set,
    update,
    useLocalStorage: () => {
      const json = localStorage.getItem(key);
      if (json) {
        set(JSON.parse(json));
      }

      subscribe(current => {
        localStorage.setItem(key, JSON.stringify(current));
      });
    }
  };
}


// If localStorage has the key then it will be used
// if not the default will be used. Format:
// export const var = createLocalStore(key, default)
// export const country = createLocalStore('country', 'CA');
export const theme = createLocalStore('theme', media.dark ? 'dark' : 'light');