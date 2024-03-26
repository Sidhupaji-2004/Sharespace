import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { PostValidation } from "@/lib/validation"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

import { useNavigate } from 'react-router-dom';
import { Input } from "@/components/ui/input"
import { Textarea } from "../textarea"
import FileUploader from "../shared/FileUploader"
import { Models } from "appwrite"
import { useUserContext } from "@/context/AuthContext"
import { useToast } from "../use-toast"
import { useCreatePost, useDeletePost, useUpdatePost } from "@/lib/react-query/queriesAndMutations"

type PostFormProps = {
  post ?: Models.Document, 
  action ?: 'create' | 'update'
};

const PostForm = ({ post, action } : PostFormProps) => {
  console.log({post});

  const { mutateAsync : createPost, isPending : isLoadingCreate } = useCreatePost(); 
  const { mutateAsync : deletePost, isPending : isLoadingDelete } = useDeletePost(); 
  const { mutateAsync : updatePost, isPending : isLoadingUpdate } = useUpdatePost(); 

  const { user } = useUserContext();
  const { toast } = useToast();
  const navigate = useNavigate();
  if(post){
    console.log(post.imageURL);
  }

  const form = useForm<z.infer<typeof PostValidation>>({
    resolver: zodResolver(PostValidation),
    defaultValues: {
      caption: post ? post?.caption : "",
      file: [], 
      location: post ? post.location : "", 
      tags: post ? post.tags.join(",") : "",
    },
  })
 

  /**
   * The function onSubmit creates a new post with user input values and redirects to the homepage if
   * successful.
   * This function is async cuz we are using the await action of createPost. 
   * @param values - The `values` parameter in the `onSubmit` function is inferred from the
   * `PostValidation` schema. It represents the data that is submitted in a form or request for
   * creating a new post.
   */
  async function onSubmit(values: z.infer<typeof PostValidation>) {
    if(post && action === 'update'){
      const updatedPost = await updatePost({
          ...values, 
          postId: post.$id, 
          imageId : post?.imageId, 
          imageUrl : post?.imageUrl
      });

      if(!updatedPost){
        toast({title : 'Error Updating the post'})
      }
      return navigate(`/posts/${post.$id}`)
    }
    const newPost = await createPost({
      ...values, 
      userId : user.id,
    })

    if(!newPost){
      toast({
        title: "Please try again", 
      })
    }
    navigate('/');
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col w-full max-w-5xl gap-9">
        <FormField
          control={form.control}
          name="caption"
          render={({ field }) => (
            <FormItem>
              <FormLabel className='shad-form_label'>Caption</FormLabel>
              <FormControl>
                <Textarea className='shad-textarea custom-scrollbar' placeholder="shadcn" {...field} />
              </FormControl>
              <FormMessage className="shad-form_message"/>
            </FormItem>
          )}
        />        
        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormLabel className='shad-form_label'>Add Photo</FormLabel>
              <FormControl>
                <FileUploader 
                  fieldChange={field.onChange}
                  imageURL={post?.imageUrl}
                />
              </FormControl>
              <FormMessage className="shad-form_message"/>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel className='shad-form_label'>Add Location</FormLabel>
              <FormControl>
                <Textarea className='shad-input custom-scrollbar' placeholder="shadcn" {...field} />
              </FormControl>
              <FormMessage className="shad-form_message"/>
            </FormItem>
          )}
        /> 
        
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel className='shad-form_label' {...field}>Add tags (separated by comma ",")</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Code-Yellow, React, Assistance" className='shad-input' />
              </FormControl>
              <FormMessage className="shad-form_message"/>
            </FormItem>
          )}
        />   
        <div className='flex items-center gap-4 justify-end'>
            <Button type="button" className="shad-button_dark_4">Cancel</Button>
            <Button 
              type="submit" 
              className="shad-button_primary whitespace-nowrap"
              disabled={isLoadingCreate || isLoadingUpdate}
            >
                Update
            </Button>
        </div>
      </form>
    </Form>
  )
}

export default PostForm