import React, { useState, useEffect } from "react";

const GeezNumeralsDemo: React.FC = () => {
  const [inputNumber, setInputNumber] = useState(2025);
  const [geezOutput, setGeezOutput] = useState("");

  // Geez numerals mapping (matching the library)
  const GEEZ_NUMERALS = {
    ones: ["", "፩", "፪", "፫", "፬", "፭", "፮", "፯", "፰", "፱"],
    tens: ["", "፲", "፳", "፴", "፵", "፶", "፷", "፸", "፹", "፺"],
    hundreds: "፻",
    tenThousands: "፼",
  };

  // Geez numeral conversion function (matching library exactly)
  const toEthNumber = (num: number): string => {
    // Handle empty/zero state
    if (num === 0) {
      return "";
    }

    if (!Number.isInteger(num) || num < 1 || num > 1000000) {
      return "Invalid number";
    }

    let result = "";
    let remaining = num;

    // Handle ten-thousands (፼)
    if (remaining >= 10000) {
      const tenThousands = Math.floor(remaining / 10000);
      remaining %= 10000;

      if (tenThousands === 1) {
        result += GEEZ_NUMERALS.tenThousands;
      } else if (tenThousands >= 2 && tenThousands <= 9) {
        result += GEEZ_NUMERALS.ones[tenThousands] + GEEZ_NUMERALS.tenThousands;
      } else if (tenThousands >= 10) {
        result += toEthNumber(tenThousands) + GEEZ_NUMERALS.tenThousands;
      }
    }

    // Handle hundreds and thousands (፻)
    if (remaining >= 100) {
      const hundreds = Math.floor(remaining / 100);
      remaining %= 100;

      if (hundreds === 1) {
        result += GEEZ_NUMERALS.hundreds;
      } else if (hundreds >= 2 && hundreds <= 9) {
        result += GEEZ_NUMERALS.ones[hundreds] + GEEZ_NUMERALS.hundreds;
      } else if (hundreds >= 10) {
        result += toEthNumber(hundreds) + GEEZ_NUMERALS.hundreds;
      }
    }

    // Handle tens and ones
    if (remaining > 0) {
      const tens = Math.floor(remaining / 10);
      const ones = remaining % 10;

      if (tens > 0) {
        result += GEEZ_NUMERALS.tens[tens];
      }

      if (ones > 0) {
        result += GEEZ_NUMERALS.ones[ones];
      }
    }

    return result;
  };

  useEffect(() => {
    setGeezOutput(toEthNumber(inputNumber));
  }, [inputNumber]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    // Handle empty input - reset to empty state
    if (inputValue === "") {
      setInputNumber(0); // Use 0 to represent empty state
      return;
    }

    const value = parseInt(inputValue);
    if (!isNaN(value) && value >= 1 && value <= 1000000) {
      setInputNumber(value);
    }
  };

  const convertNumber = (num: number) => {
    setInputNumber(num);
  };

  const quickNumbers = [1, 10, 100, 1000, 10000, 2025];

  return (
    <section className="my-10 rounded-xl border border-gray-200 bg-white">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
        <h3 className="text-sm font-semibold text-gray-900">
          🔢 Geez Numerals Demo
        </h3>
        <span className="text-xs font-medium text-gray-500">
          Traditional Ethiopian numbering system
        </span>
      </div>

      {/* Body */}
      <div className="p-6 space-y-6">
        {/* Input and Output */}
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Arabic Number:
            </label>
            <input
              type="number"
              value={inputNumber === 0 ? "" : inputNumber}
              onChange={handleInputChange}
              min="1"
              max="1000000"
              className="w-full rounded-md border border-gray-300 px-3 py-2.5 text-sm
                focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              placeholder="Enter number (1-1,000,000)"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Geez Numeral:
            </label>
            <div className="min-h-[2.5rem] rounded-md border border-gray-200 bg-gray-50 px-3 py-2.5 text-xl font-medium text-gray-900 amharic">
              {geezOutput}
            </div>
          </div>
        </div>

        {/* Quick Number Buttons */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Quick Examples:
          </label>
          <div className="flex flex-wrap gap-2">
            {quickNumbers.map((num) => (
              <button
                key={num}
                onClick={() => convertNumber(num)}
                className={`px-4 py-2 rounded-lg border-2 font-medium transition-all ${
                  inputNumber === num
                    ? "border-blue-500 bg-blue-50 text-blue-700"
                    : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
                }`}
              >
                {num.toLocaleString()}
              </button>
            ))}
          </div>
        </div>

        {/* Tip */}
        <div className="rounded-md border border-blue-200 bg-blue-50 px-4 py-3">
          <div className="flex">
            <div className="flex-shrink-0">
              <span className="text-blue-400">💡</span>
            </div>
            <div className="ml-3">
              <p className="text-sm text-blue-700">
                <strong>Traditional System:</strong> Geez numerals use ፩(1),
                ፲(10), ፻(100), ፼(10,000). Note the special rules for 100 and
                10,000 (no '1' multiplier).
              </p>
            </div>
          </div>
        </div>

        {/* Code Example */}
        <div className="rounded-lg border border-gray-200 bg-gray-900 p-4">
          <h4 className="text-sm font-semibold text-gray-100 mb-3">
            Numeral Conversion
          </h4>
          <pre className="text-xs text-gray-100 overflow-x-auto">
            {`import { toEthNumber, fromEthNumber } from 'ethio-intl';

// Arabic to Geez
const geez = toEthNumber(2025);
// Result: "፳፻፳፭"

const geez100 = toEthNumber(100);
// Result: "፻" (note: no '1' multiplier)

const geez10000 = toEthNumber(10000);
// Result: "፼" (note: no '1' multiplier)

// Geez to Arabic
const arabic = fromEthNumber('፳፻፳፭');
// Result: 2025`}
          </pre>
        </div>
      </div>
    </section>
  );
};

export default GeezNumeralsDemo;
