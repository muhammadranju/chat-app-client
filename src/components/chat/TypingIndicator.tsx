import type { TypingIndicatorProps } from "@/types/types";

const TypingIndicator = ({ username }: TypingIndicatorProps) => {
  return (
    <div className="px-4 py-1 flex items-center gap-2 bg-transparent">
      <span className="text-sm text-gray-500">{username} is typing</span>
      <span className="typing-dots flex gap-1">
        <span className="dot w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-0"></span>
        <span className="dot w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-200"></span>
        <span className="dot w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-400"></span>
      </span>
    </div>
  );
};

export default TypingIndicator;
