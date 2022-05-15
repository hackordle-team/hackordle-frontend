import { info } from 'console';
import { toast } from 'react-toastify';

export const makeToast = (message: string) => {
  toast.info(message, {
    position: "bottom-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    type: 'info',
  });
}