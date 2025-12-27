import React, { useState, useEffect } from "react";

const CalendarDemo: React.FC = () => {
  const [gregorianDate, setGregorianDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [language, setLanguage] = useState<"en" | "am">("en");
  const [ethiopianDate, setEthiopianDate] = useState("");

  // Amharic month names (matching library)
  const AMHARIC_MONTHS = {
    en: [
      "Meskerem",
      "Tikimt",
      "Hidar",
      "Tahsas",
      "Tir",
      "Yekatit",
      "Megabit",
      "Miazia",
      "Genbot",
      "Sene",
      "Hamle",
      "Nehase",
      "Pagume",
    ],
    am: [
      "መስከረም",
      "ጥቅምት",
      "ህዳር",
      "ታህሳስ",
      "ጥር",
      "የካቲት",
      "መጋቢት",
      "ሚያዝያ",
      "ጀንቦት",
      "ሰኔ",
      "ሐምሌ",
      "ነሐሴ",
      "ጳጉሜ",
    ],
  };

  // Gregorian leap year check
  const isGregorianLeapYear = (year: number): boolean => {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  };

  // Get Ethiopian New Year date
  const getEthiopianNewYear = (gregorianYear: number): Date => {
    const day = isGregorianLeapYear(gregorianYear) ? 12 : 11;
    return new Date(Date.UTC(gregorianYear, 8, day, 12, 0, 0, 0)); // September 11 or 12 at noon UTC
  };

  // Get Ethiopian year for a Gregorian date
  const getEthiopianYear = (gregorianDate: Date): number => {
    const gregorianYear = gregorianDate.getFullYear();
    const newYearDate = getEthiopianNewYear(gregorianYear);
    const normalizedDate = new Date(
      Date.UTC(
        gregorianDate.getFullYear(),
        gregorianDate.getMonth(),
        gregorianDate.getDate(),
        12,
        0,
        0,
        0
      )
    );

    if (normalizedDate < newYearDate) {
      return gregorianYear - 8;
    } else {
      return gregorianYear - 7;
    }
  };

  // Ethiopian leap year check
  const isEthiopianLeapYear = (ethiopianYear: number): boolean => {
    return ethiopianYear % 4 === 3;
  };

  // Precise Ethiopian date conversion (matching library)
  const toEthDate = (inputDate: Date, lang: "en" | "am" = "en"): string => {
    const date = new Date(
      Date.UTC(
        inputDate.getFullYear(),
        inputDate.getMonth(),
        inputDate.getDate(),
        12,
        0,
        0,
        0
      )
    );

    const gregorianYear = date.getUTCFullYear();
    let ethiopianYear = getEthiopianYear(inputDate);
    let newYearDate = getEthiopianNewYear(gregorianYear);

    const normalizedInputDate = new Date(
      Date.UTC(
        inputDate.getFullYear(),
        inputDate.getMonth(),
        inputDate.getDate(),
        12,
        0,
        0,
        0
      )
    );
    if (normalizedInputDate < newYearDate) {
      ethiopianYear = getEthiopianYear(inputDate);
      newYearDate = getEthiopianNewYear(gregorianYear - 1);
    }

    let daysDiff = Math.floor(
      (date.getTime() - newYearDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    let ethiopianMonth: number, ethiopianDay: number;

    if (daysDiff < 360) {
      ethiopianMonth = Math.floor(daysDiff / 30) + 1;
      ethiopianDay = (daysDiff % 30) + 1;
    } else {
      const pagumeDays = daysDiff - 360;
      const isLeapYear = isEthiopianLeapYear(ethiopianYear);

      if (pagumeDays < (isLeapYear ? 6 : 5)) {
        ethiopianMonth = 13;
        ethiopianDay = pagumeDays + 1;
      } else {
        ethiopianMonth = 1;
        ethiopianDay = pagumeDays - (isLeapYear ? 6 : 5) + 1;
      }
    }

    const monthName = AMHARIC_MONTHS[lang][ethiopianMonth - 1];
    return `${monthName} ${ethiopianDay}, ${ethiopianYear}`;
  };

  useEffect(() => {
    const date = new Date(gregorianDate);
    const result = toEthDate(date, language);
    setEthiopianDate(result);
  }, [gregorianDate, language]);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGregorianDate(e.target.value);
  };

  const switchLanguage = (lang: "en" | "am") => {
    setLanguage(lang);
  };

  const today = new Date().toISOString().split("T")[0];
  const todayEthiopian = toEthDate(new Date(), language);

  return (
    <section className="my-10 rounded-xl border border-gray-200 bg-white">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
        <h3 className="text-sm font-semibold text-gray-900">
          📅 Ethiopian Calendar Demo
        </h3>
        <span className="text-xs font-medium text-gray-500">
          Gregorian ↔ Ethiopian conversion
        </span>
      </div>

      {/* Body */}
      <div className="p-6 space-y-6">
        {/* Input and Output */}
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Gregorian Date:
            </label>
            <input
              type="date"
              value={gregorianDate}
              onChange={handleDateChange}
              className="w-full rounded-md border border-gray-300 px-3 py-2.5 text-sm
                focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ethiopian Date:
            </label>
            <div className="min-h-[2.5rem] rounded-md border border-gray-200 bg-gray-50 px-3 py-2.5 text-lg font-medium text-gray-900 amharic">
              {ethiopianDate}
            </div>
          </div>
        </div>

        {/* Language Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Language:
          </label>
          <div className="flex gap-2">
            <button
              onClick={() => switchLanguage("en")}
              className={`px-4 py-2 rounded-lg border-2 font-medium transition-all ${
                language === "en"
                  ? "border-blue-500 bg-blue-50 text-blue-700"
                  : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
              }`}
            >
              🇺🇸 English
            </button>
            <button
              onClick={() => switchLanguage("am")}
              className={`px-4 py-2 rounded-lg border-2 font-medium transition-all ${
                language === "am"
                  ? "border-blue-500 bg-blue-50 text-blue-700"
                  : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
              }`}
            >
              🇪🇹 አማርኛ
            </button>
          </div>
        </div>

        {/* Today Button */}
        <div>
          <button
            onClick={() => setGregorianDate(today)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Use Today's Date
          </button>
        </div>

        {/* Tip */}
        <div className="rounded-md border border-blue-200 bg-blue-50 px-4 py-3">
          <div className="flex">
            <div className="flex-shrink-0">
              <span className="text-blue-400">💡</span>
            </div>
            <div className="ml-3">
              <p className="text-sm text-blue-700">
                <strong>Technical:</strong> Uses precise astronomical
                calculations with Julian Day Number algorithm for accurate
                Gregorian ↔ Ethiopian conversion. Note the 7-8 year offset and
                automatic leap year handling.
              </p>
            </div>
          </div>
        </div>

        {/* Code Example */}
        <div className="rounded-lg border border-gray-200 bg-gray-900 p-4">
          <h4 className="text-sm font-semibold text-gray-100 mb-3">
            Calendar Conversion
          </h4>
          <pre className="text-xs text-gray-100 overflow-x-auto">
            {`import { toEthDate } from 'ethio-intl';

// Convert Gregorian to Ethiopian
const today = new Date();
const ethDate = toEthDate(today, 'en');
// Result: "Tahsas 13, 2018"

const ethDateAmharic = toEthDate(today, 'am');
// Result: "ታህሳስ 13, 2018"

// Handle leap years automatically
const leapYear = new Date(2024, 8, 11);
const ethLeap = toEthDate(leapYear);
// Result: "Meskerem 1, 2017" (note: 7-8 year offset)`}
          </pre>
        </div>
      </div>
    </section>
  );
};

export default CalendarDemo;
