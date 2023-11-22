export function deleteUrlParameter(key: string) {
  // get current url
  const currentUrl = new URL(location.href);
  // create new URLSearchParams with current parameters
  const updatedSearchParams = new URLSearchParams(currentUrl.search);
  // delete some parameter
  updatedSearchParams.delete(key);

  // return params entries
  return {
    ...Object.fromEntries(updatedSearchParams.entries()),
  };
}
