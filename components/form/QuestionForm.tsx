"use client";

import { createQuestion, editQuestion } from "@/lib/actions/question.action";
import { questionSchema } from "@/lib/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Input } from "../ui/input";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import CTAButton from "../shared/root/CTAButton";
import RichTextEditor from "../shared/root/RichTextEditor";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "../ui/form";
import Image from "next/image";
import { toast } from "../ui/use-toast";

interface Props {
  authorId: string;
  type: "create" | "edit";
  data?: string;
}

const QuestionForm = ({ authorId, type, data }: Props) => {
  const questionData = type === "edit" && data && JSON.parse(data);

  const groupedTags =
    type === "edit" &&
    questionData.tags.map((tag: { name: string }) => tag.name);

  const [loading, setLoading] = useState(false);
  const path = "/";
  const router = useRouter();

  const [tag, setTag] = useState("");
  const form = useForm<z.infer<typeof questionSchema>>({
    resolver: zodResolver(questionSchema),
    defaultValues: {
      title: type === "edit" ? questionData.title : "",
      tags: type === "edit" ? groupedTags : [],
      content: type === "edit" ? questionData.content : "",
    },
  });

  async function onSubmit(values: z.infer<typeof questionSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    setLoading(true);

    try {
      if (type === "create") {
        const data = {
          ...values,
          authorId,
          path,
        };
        await createQuestion(data);

        toast({
          title: "Question added successfully.",
          className: "bg-[#1FD8A4] text-white outline-none",
        });
      }

      if (type === "edit") {
        const data = {
          questionId: questionData._id,
          title: values.title,
          content: values.content,
          path,
        };
        await editQuestion(data);
        toast({
          title: "Question edited successfully!",
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
    router.push("/");
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>, field: any) {
    if ((e.key === "Enter" || e.key === ",") && field.name === "tags") {
      e.preventDefault();
      if (field.value.length === 5) {
        form.setError("tags", { message: "Max tags reached" });
      } else if (tag.length > 20 || tag.length < 3) {
        form.setError("tags", {
          message: "Tag length must be between 3 and 10",
        });
      } else {
        field.value.push(tag);
        form.clearErrors("tags");
        setTag("");
      }
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setTag(e.target.value);
  }

  function handleRemoveTag(tag: String, field: any) {
    const newTags = field.value.filter((t: string) => t !== tag);
    form.setValue("tags", newTags);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
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
                Be specific and imagine you&apos;re asking a question to another
                person.
              </FormDescription>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem className="mt-5">
              <FormLabel>
                Add question description{" "}
                <sup className="text-primary-500">*</sup>
              </FormLabel>
              <FormControl className="bg-dark-400">
                <RichTextEditor
                  onBlur={field.onBlur}
                  initialValue={questionData.content}
                  onChange={field.onChange}
                  value={field.value}
                />
              </FormControl>
              <FormDescription className="paragraph-regular text-light-500">
                Introduce the problem and expand on what you put in the title.
                Minimum 100 characters.
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
                <>
                  <Input
                    disabled={type === "edit"}
                    placeholder={
                      type === "edit" ? "Tags are not editable" : "Enter tags  "
                    }
                    className="background-light800_dark400 border-none font-spaceGrotesk ring-0 focus:ring-0 focus:ring-offset-0 "
                    onChange={(e) => handleChange(e)}
                    onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
                      handleKeyDown(e, field)
                    }
                    value={tag}
                  />
                  <div className=" flex gap-2">
                    {field.value.map((tag, index) => (
                      <span
                        className="background-light800_dark400 relative mt-2 flex  rounded-md py-1 pl-2 pr-5 font-montserrat text-xs  "
                        key={index}
                      >
                        {tag}
                        {type === "create" && (
                          <Image
                            onClick={() => handleRemoveTag(tag, field)}
                            src={"/assets/icons/close.svg"}
                            width={10}
                            height={10}
                            alt="clear tag"
                            className="absolute right-1 top-1 cursor-pointer  dark:invert"
                          />
                        )}
                      </span>
                    ))}
                  </div>
                </>
              </FormControl>
              <FormDescription className="paragraph-regular text-light-500">
                {type === "create" &&
                  `Add up to 5 tags to describe what your question is about. Start
                typing to see suggestions`}
              </FormDescription>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <div className="flex w-full justify-end ">
          <CTAButton
            disabled={loading}
            label={`${loading ? "Loading...." : "Submit"}`}
            type="submit"
            classList="py px-10 flex"
          />
        </div>
      </form>
    </Form>
  );
};

export default QuestionForm;
