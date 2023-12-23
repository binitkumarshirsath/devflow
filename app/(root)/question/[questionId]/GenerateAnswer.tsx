/* eslint-disable no-unused-vars */
"use client";

import UserAnswerBox from "@/components/shared/root/UserAnswerBox";
import { toast } from "@/components/ui/use-toast";
import Image from "next/image";
import React, { useState } from "react";

interface Props {
  userId: string;
  questionId: string;
  question: string;
}

const GenerateAnswer = ({ questionId, userId, question }: Props) => {
  const [loading, setLoading] = useState(false);

  const handleGenerateAnswer = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/chatgpt`,
        {
          method: "POST",
          body: JSON.stringify({ question }),
        }
      );

      const data = await response.json();
      alert(data.reply);
    } catch (error) {
      console.log("Error while generating anwer", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="mt-4 flex items-center justify-between font-montserrat  text-sm md:mt-5">
        <div className="text-dark500_light700 font-montserrat">
          Write your answer here :
        </div>
        <button
          className="background-light800_dark400 flex items-center gap-2 rounded-lg  px-3 py-1 text-primary-500"
          onClick={() =>
            toast({
              title:
                "AI answer generation is disabled due to budget constraints.",
              //   type: "foreground",
              variant: "destructive",
            })
          }
          disabled={loading}
        >
          <Image
            alt="ai-ans"
            width={20}
            height={20}
            src={"/assets/icons/stars.svg"}
          />
          Generate AI answer
        </button>
      </div>

      <UserAnswerBox user={userId} question={questionId} />
    </>
  );
};

export default GenerateAnswer;
