/* eslint-disable no-console */

const WARN_LEADING = '[TIX REST QUERY WARNING]';
const ERR_LEADING = '[TIX REST QUERY ERROR]';

export default {
  warn: (...message: string[]) => {
    console.warn(WARN_LEADING, ...message);
  },
  err: (...message: string[]) => {
    console.error(ERR_LEADING, ...message);
  },
};
