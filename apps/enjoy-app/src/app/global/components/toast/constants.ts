import { ToastType } from '../../utils/enum';
import alertImg from '../../../../assets/icons/alert.svg';
import successImg from '../../../../assets/icons/success.svg';

export const toastVariants = {
  [ToastType.Failed]: {
    mainColor: '#e31c4a',
    background: '#f2dedf',
    icon: alertImg,
  },
  [ToastType.Success]: {
    mainColor: '#21a621',
    background: '#e8f1e8',
    icon: successImg,
  },
};
