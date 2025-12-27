import React, { useState, useEffect } from "react";
import { transliterate } from "../lib/transliterate";

const LiveDemo: React.FC = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  useEffect(() => {
    setOutput(transliterate(input));
  }, [input]);

  return (
    <section className="my-10 rounded-xl border border-gray-200 bg-white">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
        <h3 className="text-sm font-semibold text-gray-900">
          Live Transliteration
        </h3>

        <span className="text-xs font-medium text-gray-500">
          Real-time preview
        </span>
      </div>

      {/* Body */}
      <div className="p-6 space-y-6">
        {/* Input */}
        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700">
            Latin input
          </label>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type using Latin characters (e.g. selam, ne, hu)"
            className="w-full rounded-md border border-gray-300 px-3 py-2.5 text-sm
              focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
        </div>

        {/* Output */}
        <div>
          <div className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-gray-400">
            Output (Amharic)
          </div>

          <div className="min-h-[3rem] rounded-md border border-gray-200 bg-gray-50 px-4 py-3 text-2xl amharic text-gray-900">
            {output || (
              <span className="text-gray-400 italic">
                Output will appear here
              </span>
            )}
          </div>
        </div>

        {/* Examples */}
        <div className="rounded-md border border-gray-100 bg-gray-50 px-4 py-3 text-xs text-gray-600">
          <div className="mb-1 font-medium text-gray-500">Examples</div>
          <div className="grid grid-cols-2 gap-x-6 gap-y-1">
            <span>selam → ሰላም</span>
            <span>ne → ነ</span>
            <span>hu → ሁ</span>
            <span>dehna → ደህና</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LiveDemo;
