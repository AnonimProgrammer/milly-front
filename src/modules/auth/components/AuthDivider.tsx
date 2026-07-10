export function AuthDivider() {
  return (
    <div className="relative my-6">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-black/10" />
      </div>
      <div className="relative flex justify-center text-[10px] uppercase tracking-wider">
        <span className="bg-white dark:bg-zinc-900 px-3 text-zinc-500 dark:text-zinc-400 font-light">or continue with</span>
      </div>
    </div>
  );
}
