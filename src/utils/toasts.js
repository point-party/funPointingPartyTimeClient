import UIkit from 'uikit';

export const PRIMARY = 'primary';
export const SUCCESS = 'success';
export const WARNING = 'warning';
export const DANGER = 'danger';

const toast = (message, status) => {
  UIkit.notification({
    message,
    status,
    pos: 'top-center',
    timeout: 2000,
  });
};

export const successToast = message => {
  toast(message, SUCCESS);
};

export const errorToast = message => {
  toast(message, DANGER);
};
