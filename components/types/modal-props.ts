export interface IModalProps {
  visible: boolean;
  hideModal: () => void;
}

export interface IModalPropsSuccess extends IModalProps {
  onSuccess: () => void;
}
