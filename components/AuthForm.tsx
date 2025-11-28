"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  DefaultValues,
  FieldValues,
  Path,
  Resolver,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { z, ZodType } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import ROUTES from "@/constants/routes";

interface AuthFormProps<T extends FieldValues> {
  defaultValues: T;
  schema: ZodType<T>;
  formType: "SIGN_IN" | "SIGN_UP";
  onSubmit: (data: T) => Promise<{ success: boolean }>;
}
const AuthForm = <T extends FieldValues>({
  defaultValues,
  schema,
  formType,
  onSubmit,
}: AuthFormProps<T>) => {
  const buttonText = formType == "SIGN_IN" ? "Sign in" : "Sign up";
  // 1. Define your form.
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema as any) as Resolver<T, any>,
    defaultValues: defaultValues as DefaultValues<T>,
  });
  // 2. Define a submit handler.
  const handleSubmit: SubmitHandler<T> = async () => {
    //ToDO Authenticate User
  };
  return (
    <Form {...form}>
      {buttonText}
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        {Object.keys(defaultValues).map((field) => (
          <FormField
            control={form.control}
            name={field as Path<T>}
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-2.5">
                <FormLabel className="paragraph-medium text-dark400_light700">
                  {field.name === "email" ? "Email Address" : field.name}
                </FormLabel>
                <FormControl>
                  <Input
                    className="paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 no-focus min-h-12 rounded-1.5 border"
                    required
                    type={field.name === "password" ? "password" : "text"}
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        ))}

        <Button
          disabled={form.formState.isSubmitting}
          className="primary-gradient paragraph-medium rounded-2 font-inter text-light-900! min-h-12 w-full px-4 py-3"
        >
          {form.formState.isSubmitting
            ? buttonText === "Sign in"
              ? "Sign In ..."
              : "Sign Up ..."
            : buttonText}
        </Button>
        {formType === "SIGN_IN" ? (
          <p className="paragraph-regular text-dark400_light700 mt-6 text-center">
            Don’t have an account?{" "}
            <Link
              href={ROUTES.SIGN_UP}
              className="paragraph-semibold primary-text-gradient"
            >
              Sign up
            </Link>
          </p>
        ) : (
          <p className="paragraph-regular text-dark400_light700 mt-6 text-center">
            Already have an account?{" "}
            <Link
              href={ROUTES.SIGN_IN}
              className="paragraph-semibold primary-text-gradient"
            >
              Sign in
            </Link>
          </p>
        )}
      </form>
    </Form>
  );
};

export default AuthForm;
