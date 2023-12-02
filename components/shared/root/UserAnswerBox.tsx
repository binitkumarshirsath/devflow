"use client";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { answerSchema } from "@/lib/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import RichTextEditor from "./RichTextEditor";
import CTAButton from "./CTAButton";

/*
https://github.com/shadcn-ui/ui/issues/800
*/

const UserAnswerBox = () => {
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof answerSchema>>({
    resolver: zodResolver(answerSchema),
    defaultValues: {
      answer: "",
    },
  });

  function onSubmit(values: z.infer<typeof answerSchema>) {
    setLoading(true);
    console.log(values);
    setLoading(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="answer"
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
