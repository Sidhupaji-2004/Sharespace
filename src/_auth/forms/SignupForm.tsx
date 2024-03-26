import { Button } from '../../components/ui/button';
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import Loader from '@/components/ui/shared/Loader';
import {  Form,  FormControl,  FormDescription,  FormField,  FormItem, FormLabel, FormMessage} from "../../components/ui/form"
import { Input } from "../../components/ui/input"
import { SignupValidation } from '@/lib/validation';
import { createUserAccount } from '@/lib/appwrite/api';
import { useToast } from '@/components/ui/use-toast';
import { useCreateUserAccount, useSignInAccount } from '@/lib/react-query/queriesAndMutations';
import { useUserContext } from '@/context/AuthContext';


/* The code block is defining a functional component called `SignupForm`. */
const SignupForm = () => {
  const { toast } = useToast();
  const { checkAuthUser, isLoading : isUserLoading } = useUserContext();
  /**
   * mutateAsync : createUserAccount function which creates the user and saves it in the database
   */
  const navigate = useNavigate();
  const { mutateAsync: createUserAccount, isPending : isCreatingUser } = useCreateUserAccount();
  const { mutateAsync : signInAccount, isPending : isSigningIn } = useSignInAccount();


  /* The `useForm` hook from the `react-hook-form` library is being used to create a form instance. */
  const form = useForm<z.infer<typeof SignupValidation>>({
    resolver: zodResolver(SignupValidation),
    defaultValues: {
      name: "", 
      username: "",
      email: "",
      password: "",
    },
  })
 
  /**
   * The function `onSubmit` is an asynchronous function that takes in values and creates a new user
   * account using those values, then logs the new user.
   * @param values - The `values` parameter is an object that represents the form values submitted by
   * the user. It is inferred from the `SignupValidation` schema, which is likely a validation schema
   * or type definition for the form fields.
   * 
   * 
   * we create an account, add it to the user context and navigate to the home page. 
   */
  async function onSubmit(values: z.infer<typeof SignupValidation>) {
    const newUser = await createUserAccount(values);
    if(!newUser) {
      return toast({
        title: 'Signup failed. Please try again.'
      })
    }

    const session = await signInAccount({
      email: values.email,
      password: values.password
    });

    if(!session) {
      return toast({
        title: 'SignIn failed. Please try again.'
      })
    }
    /**
     * The user signs in and a session is created. 
     * Now store this session in react-context
     */
    const isLoggedIn = await checkAuthUser();
    if(isLoggedIn) {
      form.reset();
      navigate('/');
    }
    else{
      return toast({
        title: 'SignIn failed. Please try again.'
      })
    }
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
                {isCreatingUser ? (
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