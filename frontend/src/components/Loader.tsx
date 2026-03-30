import { Loader2 } from "lucide-react";

function Loader() {
  return (
    <div className="fixed inset-0 z-9999 flex flex-col items-center justify-center bg-white dark:bg-slate-900 transition-all duration-300">
      <div className="flex flex-col items-center">
        <Loader2 className="h-10 w-10 text-blue-600 animate-spin" />
        <p className="mt-4 text-sm font-medium text-gray-500 animate-pulse uppercase tracking-widest">
          Loading
        </p>
      </div>
    </div>
  );
}

export default Loader;