"use client";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { answerSchema } from "@/lib/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import RichTextEditor from "./RichTextEditor";
import CTAButton from "./CTAButton";
import { postAnswer } from "@/lib/actions/answer.action";

/*
https://github.com/shadcn-ui/ui/issues/800
*/

interface Props {
  user: string;
  question: string;
}

const UserAnswerBox = ({ user, question }: Props) => {
  console.log(user, question);

  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof answerSchema>>({
    resolver: zodResolver(answerSchema),
    defaultValues: {
      content: "",
    },
  });

  async function onSubmit({ content }: z.infer<typeof answerSchema>) {
    setLoading(true);
    await postAnswer({
      author: user,
      content,
      path: `/question/${question}`,
      question,
    });
    setLoading(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <RichTextEditor
                  onBlur={field.onBlur}
                  onChange={field.onChange}
                  value={field.value}
                  initialValue="Write your answer here..."
                />
              </FormControl>
            </FormItem>
          )}
        />
        <div className="mt-5 flex w-full justify-end ">
          <CTAButton
            label={`${loading ? "Loading...." : "Submit"}`}
            type="submit"
            classList="py px-10 flex"
          />
        </div>
      </form>
    </Form>
  );
};

export default UserAnswerBox;
