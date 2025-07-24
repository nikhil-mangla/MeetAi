"use client";

import {z} from "zod";
import Link from "next/link";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { OctagonAlertIcon } from "lucide-react";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";



const formSchema = z.object ({
    email: z.string().email(),
    password: z.string().min(1, {message: "Password is required"}),

});

export const SignInView = () => {
    const router = useRouter();
    const [pending, setPending] = useState(false);
    const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  

  const onSubmit = async(data: z.infer<typeof formSchema>) => {
    setError(null);

    authClient.signIn.email(
        {
            email: data.email,
            password: data.password,
            callbackURL: "/",
        },
        {
            onSuccess: () => {
                setPending(false);
                router.push("/")
                
            },
            onError: ({ error }: { error: { message: string } }) => {
                setPending(false);
                setError(error.message)
            }
        },
    );
    
  };

  const onSocial = (provider: "github" | "google") => {

  
    setError(null);
    setPending(true);
    authClient.signIn.social(
        {
            provider: provider,
            callbackURL: "/",
        },
        {
            onSuccess: () => {
                setPending(false);
                
            },
            onError: ({ error }: { error: { message: string } }) => {
                setPending(false);
                setError(error.message)
            }
        },
    );
    
  };
    return (

        <div className="flex flex-col gap-6">
            <Card className="overflow-hidden p-2">
                <CardContent className="grid p-0 md:grid-cols-2">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 md:p-8">
                            <div className="flex flex-col gap-6">
                                <div className="flex flex-col items-center text center">
                                    <h1 className="text-2xl font-bold">
                                        Welcome Back
                                    </h1>
                                    <p className="text-muted-foregroud text-balance">
                                        Login to your account
                                    </p>
                                </div>
                                <div className="grid gap-3">
                                    <FormField 
                                        control={form.control}
                                        name = "email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Email
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type = "email"
                                                        placeholder = "m@example.com"
                                                        {...field}
                                                    />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="grid gap-3">
                                    <FormField 
                                        control={form.control}
                                        name = "password"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Password
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type = "password"
                                                        placeholder = "********"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />
                                    {
                                        !!error && (
                                            <Alert className="bg-destructive/10 border-none">
                                                <OctagonAlertIcon className="h-4 w-4 !text-destructive" />
                                                <AlertTitle> {error} </AlertTitle>
                                            </Alert>
                                        )
                                    }
                                    <Button
                                        disabled={pending}
                                        type="submit"
                                        className="w-full"
                                        >
                                            Sign in
                                        </Button>
                                        <div className="relative flex items-center justify-center text-center text-sm my-4">
                                            <div className="flex-grow border-t border-border"></div>
                                            <span className="bg-card text-muted-foreground px-2 z-10">
                                                Or continue with
                                            </span>
                                            <div className="flex-grow border-t border-border"></div>
                                        </div>
                                        <div className="flex gap-2">
                                            <Button disabled={pending}
                                            onClick={() => onSocial("google")}
                                            variant="outline" type="button" className="w-1/2">
                                                <FaGoogle />
                                            </Button>
                                            <Button disabled={pending} 
                                           onClick={() => onSocial("github")}
                                            variant="outline" type="button" className="w-1/2">
                                                <FaGithub />
                                            </Button>
                                        </div>
                                        <div className="text-center text-sm">
                                            Don&apos;t have an account?{" "}
                                            <Link href="/sign-up" className="underline underline-offset-4">
                                            Sign up
                                            </Link>
                                        </div>
                                </div>
                            </div>

                           
                        </form>
                    </Form>
                    <div className="bg-radial from-green-700 to-green-900 relative hidden md:flex flex-col
                    gap-y-4 items-center justify-center">
                        <img src="/logo.svg" alt="Image" className="h-[92px] w-[92px]" />
                        <p className="text-2xl font-semibold text-white">
                            Meet.AI
                        </p>

                    </div>
                </CardContent>

            </Card>
            <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
                By clicking continue, you agree to our <a href="#">Terms of service</a> and <a href="#">Privacy Policy</a>
            </div>

        </div>
    )
}

