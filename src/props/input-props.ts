interface InputProps {
  id: string;
  className?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  labelContent?: string;
  type: string;
}

export default InputProps;
