export const getRoomName = () => {
  let roomName = '';
  const { pathname } = window.location;
  if (pathname.includes('room')) {
    roomName = pathname.split('/')[2];
  }
  return roomName;
};

export const getRoomNameFromQueryParams = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const roomName = urlParams.get('roomName');
  return roomName || '';
};

export const getObserverFromQueryParams = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const observer = urlParams.get('observer');
  return observer === 'true';
};
