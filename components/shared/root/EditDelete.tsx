"use client";
import { deleteQuestion } from "@/lib/actions/question.action";
import { SignedIn } from "@clerk/nextjs";
import { useToast } from "@/components/ui/use-toast";

import Image from "next/image";
import React from "react";

interface Props {
  userId: string;
  questionId: string;
  clerkId: string;
}

const EditDelete = ({ userId, clerkId, questionId }: Props) => {
  const { toast } = useToast();
  const path = "/";
  const handleEdit = () => {};
  const handleDelete = async () => {
    await deleteQuestion({
      path,
      questionId,
    });
    toast({
      title: "Question deleted successfully.",
      variant: "default",
    });
  };

  return (
    <SignedIn>
      <div className="flex  justify-between gap-2 ">
        <Image
          alt="Edit"
          width={20}
          height={20}
          className="cursor-pointer"
          src={"/assets/icons/edit.svg"}
          onClick={handleEdit}
        />
        <Image
          alt="Edit"
          width={20}
          height={20}
          className="cursor-pointer"
          src={"/assets/icons/trash.svg"}
          onClick={handleDelete}
        />
      </div>
    </SignedIn>
  );
};

export default EditDelete;
