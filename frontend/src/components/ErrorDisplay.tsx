type Props = {
  message: string | undefined;
};

const ErrorDisplay = ({ message }: Props) => {
  return <p className="text-xs text-secondary">{message}</p>;
};

export default ErrorDisplay;
