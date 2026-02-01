"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

/* -------------------- */
/* Zod Schema */
/* -------------------- */
const loginSchema = z.object({
  email: z.email({ error: 'Please enter a valid email.' }).trim()
    .min(1, "Email is required"),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters"),
  remember: z.boolean().optional(),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function Home() {
  const {status} = useSession()
  const {
    register, handleSubmit, formState: { errors }, setValue, reset
  } = useForm<LoginFormValues>({ resolver: zodResolver(loginSchema), defaultValues: { remember: false },
  });

  const [authError, setAuthError] = useState<string | null>(null);

  const router = useRouter()

 useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/")
    }
  }, [status, router])

  if (status === "loading") {
    return <div>Loading...</div>
  }

  const onSubmit = async (data: LoginFormValues) => {
    setAuthError(null)

    const res = await signIn("credentials", {
      email : data.email,
      password : data.password,
      redirect: false,
    })

    if(res?.error) {
      setAuthError("Invalid email or password.");
      reset()
    }
    else {
      router.replace('/dashboard')
    }
  };

  return (
    <main className="min-h-screen grid grid-cols-2">
      
      <div className="h-screen flex flex-col justify-center items-center">
        <div className="w-full px-15">
          <h1 className="text-xl font-bold mb-3">Welcome back</h1>

{/* login error display */}
          {authError && (
            <p className="text-sm text-red-500 mb-2">{authError}</p>
          )}

{/* login form */}
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="font-bold text-sm"> Email </label>
              <input id="email" type="email" placeholder="name@example.com" className="border border-gray-300 rounded-md w-full px-4 py-2"
                {...register("email")} />
              {errors.email && ( <p className="text-sm text-red-500"> {errors.email.message} </p> )}
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="font-bold text-sm"> Password </label>
              <input id="password" type="password" placeholder="•••••••••••" className="border border-gray-300 rounded-md w-full px-4 py-2"
                {...register("password")}
              />
              {errors.password && ( <p className="text-sm text-red-500"> {errors.password.message} </p> )}
            </div>

            <div className="flex gap-2 items-center">
              <Checkbox id="remember" onCheckedChange={(val) => setValue("remember", Boolean(val))} />
              <label htmlFor="remember" className="text-sm text-gray-600 cursor-pointer"> Remember me </label>
            </div>

            <Button type="submit" className="bg-blue-700 text-white hover:bg-blue-500 py-5 text-md" >
              Sign in
            </Button>
          </form>
        </div>
      </div>

      <div className="bg-blue-500 h-screen flex flex-col justify-center items-center">
         <div className="px-20 text-white">
           <h1 className="text-3xl mb-3 font-semibold px-2">ticktock</h1>
           <p className="text-md px-3">
             Introducing ticktock, our cutting-edge timesheet web application designed to revolutionize how you 
             manage employee work hours. With ticktock, you can effortlessly track and monitor employee attendance 
             and productivity from anywhere, anytime, using any internet-connected device.
           </p>
         </div>
       </div>
    </main>
  );
}
