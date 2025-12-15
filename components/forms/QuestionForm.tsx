"use client";
import { askQuestionSchema, AskQuestionSchemeType } from "@/lib/validaios";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useRef } from "react";
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
import { MDXEditorMethods } from "@mdxeditor/editor";
import dynamic from "next/dynamic";
import TagCard from "../cards/TagCard";
import { Button } from "../ui/button";
const Editor = dynamic(() => import("@/components/editor"), {
  ssr: false,
});

function QuestionForm() {
  const editorRef = useRef<MDXEditorMethods>(null);
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
  const handleOnAddTag = (
    e: React.KeyboardEvent<HTMLInputElement>,
    field: { value: string[] }
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const tagInput = e.currentTarget.value.trim();
      if (
        tagInput &&
        tagInput.length < 15 &&
        !form.getValues("tags").includes(tagInput)
      ) {
        form.setValue("tags", [...field.value, tagInput]);
        e.currentTarget.value = "";
        form.clearErrors("tags");
      } else if (tagInput.length > 15) {
        form.setError("tags", {
          type: "manual",
          message: "Tag should less than 15 charachters",
        });
      } else if (form.getValues("tags").includes(tagInput)) {
        form.setError("tags", {
          type: "manual",
          message: "Tag is already exsit",
        });
      }
    }
  };
  const handleRemoveTag = (tag: string, field: { value: string[] }) => {
    const newTags = field.value.filter((t) => t !== tag);
    form.setValue("tags", newTags);
    // form.clearErrors("tags");
    if (newTags.length === 0) {
      form.setError("tags", {
        type: "manual",
        message: "tags are required",
      });
    }
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
                  Title<span className="text-primary-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="title"
                    className="no-focus paragraph-regular background-light700_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                  />
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
                  Content<span className="text-primary-500">*</span>{" "}
                </FormLabel>
                <Editor
                  editorRef={editorRef}
                  placeholder="add question"
                  onChange={field.onChange}
                  value={field.value}
                />

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
                  Tags<span className="text-primary-500">*</span>
                </FormLabel>
                <FormControl>
                  <div>
                    <Input
                      onKeyDown={(e) => handleOnAddTag(e, field)}
                      placeholder="Add tags"
                      className="no-focus paragraph-regular background-light700_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                    />
                    <div className="flex-start mt-2.5 flex-wrap gap-2.5">
                      {" "}
                      {field.value.map((tag) => (
                        <TagCard
                          key={tag}
                          _id={tag}
                          name={tag}
                          compact
                          isButton
                          remove
                          handleRemove={() => handleRemoveTag(tag, field)}
                        />
                      ))}
                    </div>
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
          <div className="mt-16 flex justify-end">
            <Button
              type="submit"
              className="primary-gradient text-light-900! w-fit"
            >
              {" "}
              Ask a Question
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default QuestionForm;
