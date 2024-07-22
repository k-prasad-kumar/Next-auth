import CardWrapper from "@/components/auth/card-wrapper";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

const ErrorCard = () => {
  return (
    <CardWrapper
      headerLabel="Oops! Something went wrong"
      backButtonLabel="Back to Login"
      backButtonLink="/auth/login"
    >
      <div className="w-full flex justify-center items-center">
        <ExclamationTriangleIcon className="w-14 h-14 text-destructive" />
      </div>
    </CardWrapper>
  );
};
export default ErrorCard;
