import { MdFilledCard } from "@/wrapper/labs/card";
import clsx from "clsx";

type Feedback = {
  detail: string;
  className?: string | undefined;
};

export function FeedbackDetail({ detail, className }: Feedback) {
  return (
    <MdFilledCard className={clsx("w-full", "min-h-12", "p-4", className)}>
      <div
        className="w-full h-full"
        dangerouslySetInnerHTML={{ __html: detail }}
      />
    </MdFilledCard>
  );
}
