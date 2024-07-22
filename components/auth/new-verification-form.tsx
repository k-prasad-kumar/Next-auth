"use client";

import { useSearchParams } from "next/navigation";
import CardWrapper from "./card-wrapper";
import { ImSpinner9 } from "react-icons/im";
import { useCallback, useEffect, useState } from "react";
import { newVerification } from "@/lib/actions/users";
import FormError from "../form-error";
import FormSuccess from "../form-success";

const NewVerificationForm = () => {
  const [success, setSuccess] = useState<string | undefined>("");
  const [error, setError] = useState<string | undefined>("");
  const searchParams = useSearchParams();

  const token = searchParams.get("token");

  const onSubmit = useCallback(() => {
    if (!token) return setError("Missing token");

    newVerification(token!)
      .then((data) => {
        setSuccess(data?.success);
        setError(data?.error);
      })
      .catch((error) => {
        setError("Something went wrong!");
      });
  }, [token]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <CardWrapper
      headerLabel="Verify Your Email"
      backButtonLabel="Back to Login"
      backButtonLink="/auth/login"
    >
      <div className="flex justify-center items-center">
        {!success && !error && (
          <ImSpinner9 className="w-14 h-14 animate-spin" />
        )}
        <FormSuccess message={success} />
        <FormError message={error} />
      </div>
    </CardWrapper>
  );
};
export default NewVerificationForm;
