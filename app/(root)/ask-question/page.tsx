"use client";
import React, { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import * as z from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { questionSchema } from "@/lib/validators";
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

const AskAQuestion = () => {
  const editorRef = useRef(null);

  const form = useForm<z.infer<typeof questionSchema>>({
    resolver: zodResolver(questionSchema),
    defaultValues: {
      question: "",
      tags: [],
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof questionSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <div className="text-dark100_light900 flex flex-col gap-2">
      <div className="font-montserrat text-3xl font-semibold text-dark-300 dark:text-light-700 max-sm:text-2xl ">
        Ask a public question
      </div>
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="question"
              render={({ field }) => (
                <FormItem className="mt-5">
                  <FormLabel>
                    Question Title <sup className="text-primary-500">*</sup>
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="background-light800_dark400 border-none font-spaceGrotesk ring-0 focus:ring-0 focus:ring-offset-0 "
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="paragraph-regular text-light-500">
                    Be specific and imagine you&epos;re asking a question to
                    another person.
                  </FormDescription>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="mt-5">
                  <FormLabel>
                    Add question description{" "}
                    <sup className="text-primary-500">*</sup>
                  </FormLabel>
                  <FormControl className="bg-dark-400">
                    <Editor
                      apiKey={process.env.NEXT_PUBLIC_TINY_EDITOR_API_KEY}
                      onInit={(evt, editor) => (editorRef.current = editor)}
                      initialValue="Start describing your question..."
                      init={{
                        height: 500,
                        menubar: false,
                        plugins: [
                          "codesample",
                          "advlist",
                          "autolink",
                          "lists",
                          "link",
                          "image",
                          "charmap",
                          "preview",
                          "anchor",
                          "searchreplace",
                          "visualblocks",
                          "code",
                          "fullscreen",
                          "insertdatetime",
                          "media",
                          "table",
                          "code",
                          "help",
                          "wordcount",
                        ],
                        toolbar:
                          "undo redo | blocks | " +
                          "bold italic forecolor " +
                          " | codesample  | " +
                          "alignleft aligncenter " +
                          "alignright alignjustify | bullist numlist outdent indent | " +
                          "removeformat | help",
                        content_style:
                          "body { font-family:Inter,Arial,sans-serif; font-size:14px }",
                      }}
                    />
                  </FormControl>
                  <FormDescription className="paragraph-regular text-light-500">
                    Introduce the problem and expand on what you put in the
                    title. Minimum 100 characters.
                  </FormDescription>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem className="mt-5">
                  <FormLabel>
                    Tags <sup className="text-primary-500">*</sup>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter tags..."
                      className="background-light800_dark400 border-none font-spaceGrotesk ring-0 focus:ring-0 focus:ring-offset-0 "
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="paragraph-regular text-light-500">
                    Add up to 5 tags to describe what your question is about.
                    Start typing to see suggestions
                  </FormDescription>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default AskAQuestion;
