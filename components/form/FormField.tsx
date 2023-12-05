"use client";
import React from "react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { FieldPath, UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { Input } from "../ui/input";

interface FormFieldProps<T> {
  control: UseFormReturn<T>["control"];
  name: FieldPath<T>;
  label: string;
  placeholder: string;
}

const FormFieldComponent = <T extends z.ZodObject<any, any>>({
  control,
  name,
  label,
  placeholder,
}: FormFieldProps<T>) => (
  <FormField
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem>
        <FormLabel>
          {label} <sup className="text-red-500">*</sup>
        </FormLabel>
        <FormControl>
          <Input placeholder={placeholder} {...field} />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);

export default FormFieldComponent;
