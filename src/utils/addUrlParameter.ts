export function addUrlParameter(key: string, value: string) {
  // get current url
  const currentUrl = new URL(location.href);
  // create new url parameters
  const updatedSearchParams = new URLSearchParams(currentUrl.search);
  // added or updated url
  updatedSearchParams.append(key, value);

  return {
    ...Object.fromEntries(updatedSearchParams.entries()),
  };
}
