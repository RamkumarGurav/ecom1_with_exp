"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "react-hot-toast";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";
import { FcGoogle } from "react-icons/fc";
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
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowBigUpDash, CircleUser, EyeIcon, EyeOffIcon } from "lucide-react";
import { LoadingButton } from "@/components/Buttons/LoadingButton";
import { IconButton } from "@/components/Buttons/IconButton";
import Link from "next/link";
import { useAppDispatch } from "@/lib/redux-store/store";
import {
  storeAuthUser,
  deleteAuthUser,
} from "@/lib/redux-store/features/auth/authSlice";
const FormSchema = z.object({
  email: z.string().min(1, { message: "This field has to be filled." }),
  password: z.string().min(1, { message: "This field has to be filled." }),
});

const doLogin = async (data: any) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/login`,
    {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
    }
  );

  // console.log("RES ", res);

  return await res.json();
};

export default function LoginCard() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsSubmitted(true);
    try {
      const response = await doLogin(data);
      // console.log(response);
      if (response.success) {
        setIsSubmitted(false);
        toast.success("Successfully logged in");
        /*** if there is userData in the response then set it in localStorage ***/
        if (response.data) {
          dispatch(
            storeAuthUser({ ...response.data, session: response.session })
          );
          window.localStorage.setItem(
            "userData",
            JSON.stringify(response.data)
          );
        }
        router.push("/");
      } else {
        setIsSubmitted(false);
        toast.error(response.message);
      }
    } catch (error) {
      setIsSubmitted(false);
      toast.error("Error while logging in.");
      console.error("Error while logging in.", error);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl text-center">Login</CardTitle>
        <CardDescription>
          Please enter your email and password to login.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-1  flex flex-col justify-center">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-2 "
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>

                  <FormControl className="relative">
                    <div>
                      <Input
                        className="focus-visible:ring-gray-500"
                        placeholder="Email"
                        {...field}
                      />
                      <div className="absolute right-0 flex items-center pr-3 -translate-y-1/2 top-1/2 gap-x-1">
                        <CircleUser
                          className="cursor-pointer text-gray-700"
                          size={20}
                        />
                      </div>
                    </div>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl className="relative">
                    <div>
                      <Input
                        className="focus-visible:ring-gray-500"
                        placeholder="Password"
                        type={showPassword ? "text" : "password"}
                        {...field}
                      />
                      <div className="absolute right-0 flex items-center pr-3 -translate-y-1/2 top-1/2 gap-x-1">
                        {showPassword ? (
                          <EyeIcon
                            className="cursor-pointer text-gray-700"
                            onClick={togglePasswordVisibility}
                            size={20}
                          />
                        ) : (
                          <EyeOffIcon
                            className="cursor-pointer text-gray-700"
                            onClick={togglePasswordVisibility}
                            size={20}
                          />
                        )}
                      </div>
                    </div>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="pt-2 w-full">
              <LoadingButton
                type="submit"
                className="w-full  "
                isLoading={isSubmitted}
              >
                Login
              </LoadingButton>
            </div>
          </form>
        </Form>
        <p className="text-center text-gray-700">or</p>
        <div className="w-full">
          <Link
            href={`${process.env.NEXT_PUBLIC_API_URL}/auth/google/callback`}
          >
            <IconButton className="flex gap-2 w-full">
              <span>
                <FcGoogle />
              </span>
              <span>Login wit Google</span>
            </IconButton>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
