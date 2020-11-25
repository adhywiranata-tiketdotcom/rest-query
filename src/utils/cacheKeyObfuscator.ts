const obsfuscator = {
  encode: (str: string) => btoa(str),
  decode: (str: string) => atob(str),
};

export default obsfuscator;
