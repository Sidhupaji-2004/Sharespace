import { Button } from '../../components/ui/button';
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import Loader from '@/components/ui/shared/Loader';
import {  Form,  FormControl,  FormDescription,  FormField,  FormItem, FormLabel, FormMessage} from "../../components/ui/form"
import { Input } from "../../components/ui/input"
import { SignupValidation } from '@/lib/validation';



const SignupForm = () => {

  const isLoading = false;
  // 1. Define your form.
  const form = useForm<z.infer<typeof SignupValidation>>({
    resolver: zodResolver(SignupValidation),
    defaultValues: {
      name: "", 
      username: "",
      email: "",
      password: "",
    },
  })
 
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof SignupValidation>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }

  return (
      <Form {...form}>
        <div className="sm:w-420 flex-center flex-col">
          <img src="/assets/images/logo.svg" alt="logo"/>
          <h2 className='h3-bold md:h2-bold pt-5 sm:pt-12'>Create a new account</h2>
          <p className='text-light-3 small-medium md:base-regular'>To use NexusWave, please enter your details</p>
          <form 
          onSubmit={form.handleSubmit(onSubmit)} 
          className="flex flex-col gap-5 w-full mt-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input className='shad-input' type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input className='shad-input' type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input className='shad-input'  type="email" {...field} />
                  </FormControl>
                  <FormDescription>

                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>password</FormLabel>
                  <FormControl>
                    <Input className='shad-input' type="password" {...field} />
                  </FormControl>
                  <FormDescription>

                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className='shad-button_primary' type="submit">
                {isLoading ? (
                  <div className='flex-center gap-2'>
                    <Loader />
                  </div>
                ): "Sign up"}
            </Button>
            <p className='text-small-regular text-light-2 text-center mt-2'>
              Already Have an Account ?
              <Link to="/sign-in" className='text-primary-500 text-small-semibold ml-1'>
                  Log in
              </Link>
            </p>

          </form>
        </div>
      </Form>
    )
}

export default SignupForm