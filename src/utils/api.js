/* eslint-disable import/prefer-default-export */
export const getApiUrl = () => {
  return process.env.NODE_ENV === 'production'
    ? 'sleepy-escarpment-81369.herokuapp.com'
    : 'localhost:8080';
};
