import Image from "next/image";
import aiChatbotIcon from "../../../../ai-chatbot.jpeg";

type ChatbotIconButtonProps = {
  className?: string;
};

export function ChatbotIconButton({ className = "" }: ChatbotIconButtonProps) {
  return (
    <button
      type="button"
      aria-label="AI chat"
      className={`inline-flex h-12 items-center justify-center gap-2 rounded-full border border-neutral-200 bg-white px-4 text-black shadow-sm transition active:scale-95 ${className}`}
    >
      <Image
        src={aiChatbotIcon}
        alt=""
        aria-hidden="true"
        width={32}
        height={32}
        className="h-7 w-7 object-contain"
      />
      <span className="text-sm font-medium leading-none">Ask AI</span>
    </button>
  );
}
