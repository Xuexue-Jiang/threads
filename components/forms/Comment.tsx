'use client'
import { useForm } from "react-hook-form"
import Image from "next/image"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { CommentValidation } from "@/lib/validations/thread"
import { usePathname } from 'next/navigation'
import { addCommentToThread } from "@/lib/actions/thread.actions"
// import { createThread } from '@/lib/actions/thread.actions'

interface Props {
  threadId: string
  currentUserImg: string
  currentUserId: string
}

const Comment = ({ threadId, currentUserImg, currentUserId }: Props) => {
  const pathname = usePathname()

  const form = useForm<z.infer<typeof CommentValidation>>({
    resolver: zodResolver(CommentValidation),
    defaultValues: {
      thread: '',
    }
  })

  const onSubmit = async (values: z.infer<typeof CommentValidation>) => {
    await addCommentToThread({
      threadId: threadId,
      commentText: values.thread,
      userId: JSON.parse(currentUserId),
      path: pathname
    })

    form.reset()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="comment-form">
      <FormField
          control={form.control}
          name="thread"
          render={({ field }) => (
            <FormItem className="flex items-center gap-3 w-full">
              <FormLabel>
                <div className="relative w-12 h-12 rounded-full overflow-hidden">
                  <Image
                    src={currentUserImg} 
                    alt="Profile Image"
                    layout="fill"
                    objectFit="cover"
                    objectPosition="center"
                  />
                </div>
              </FormLabel>
              <FormControl className="border-none bg-transparent">
                <Input className='outline-none text-light-1'
                  type="text"
                  placeholder="Comment..."
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type='submit' className='comment-form_btn'>Reply</Button>
      </form>
    </Form>
  )
}

export default Comment