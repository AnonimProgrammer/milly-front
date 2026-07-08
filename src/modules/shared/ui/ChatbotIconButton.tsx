type ChatbotIconButtonProps = {
  className?: string;
};

export function ChatbotIconButton({ className = "" }: ChatbotIconButtonProps) {
  return (
    <button
      type="button"
      aria-label="AI chat"
      className={`inline-flex h-12 w-12 items-center justify-center rounded-full border border-neutral-200 bg-white text-black shadow-sm transition active:scale-95 ${className}`}
    >
      <svg
        width="26"
        height="26"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="block"
      >
        <g transform="translate(12 12) scale(1.95) translate(-12 -12)">
          <path
            d="M12 1.75L14.22 8.28L20.75 10.5L14.22 12.72L12 19.25L9.78 12.72L3.25 10.5L9.78 8.28L12 1.75Z"
            fill="url(#chatbotGeminiGradient)"
          />
        </g>
        <defs>
          <linearGradient
            id="chatbotGeminiGradient"
            x1="3.25"
            y1="1.75"
            x2="20.75"
            y2="19.25"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#2E90FA" />
            <stop offset="0.5" stopColor="#8B5CF6" />
            <stop offset="1" stopColor="#22D3EE" />
          </linearGradient>
        </defs>
      </svg>
    </button>
  );
}
