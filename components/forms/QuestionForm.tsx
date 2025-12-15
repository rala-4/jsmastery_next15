"use client";
import { askQuestionSchema, AskQuestionSchemeType } from "@/lib/validaios";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
function QuestionForm() {
  const form = useForm<AskQuestionSchemeType>({
    resolver: zodResolver(askQuestionSchema),
    defaultValues: {
      title: "",
      content: "",
      tags: [],
    },
  });
  const onSbmit = (data: AskQuestionSchemeType) => {
    alert(JSON.stringify(data));
  };

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSbmit)}
          className="flex w-full flex-col gap-10"
        >
          <FormField
            name="title"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex w-full flex-col">
                <FormLabel className="paragraph-semibold text-dark400_light800">
                  Title
                </FormLabel>
                <FormControl>
                  <Input {...field} placeholder="title" />
                </FormControl>
                <FormDescription className="body-regular text-light-500 mt-2.5">
                  Be specific and imagine you’re asking a question to another
                  person.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />{" "}
          <FormField
            name="content"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-3">
                <FormLabel className="paragraph-semibold text-dark400_light800">
                  Content
                </FormLabel>
                <FormControl>Content</FormControl>
                <FormDescription className="body-regular text-light-500 mt-2.5">
                  Introduce the problem and expand on what you put in the title.
                  Minimum 20 characters.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="tags"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-3">
                <FormLabel className="paragraph-semibold text-dark400_light800">
                  Tags
                </FormLabel>
                <FormControl>
                  <div>
                    <Input {...field} placeholder="Add tags" />
                    Tags
                  </div>
                </FormControl>
                <FormDescription className="body-regular text-light-500 mt-2.5">
                  Tags Add up to 3 tags to describe what your question is about.
                  You need to press enter to add a tag.
                </FormDescription>

                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
}

export default QuestionForm;
