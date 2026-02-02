import React, { useState, useEffect } from "react";
import {
  BookOpen,
  Check,
  X,
  ArrowRight,
  RefreshCw,
  Trophy,
  Brain,
  ChevronRight,
  ChevronLeft,
  List,
  ExternalLink,
} from "lucide-react";

/**
 * ⚙️ НАЛАШТУВАННЯ ДЛЯ КОРИСТУВАЧА
 */
const GOOGLE_DOC_URL = "#"; // Посилання на ваші правила
const NEXT_APP_URL = "#"; // Посилання на ТЕМУ 4
const PREV_APP_URL = "#"; // Посилання на ТЕМУ 2 (Mianownik)
const MENU_APP_URL = "#"; // Посилання на ГОЛОВНЕ МЕНЮ

// --- БАЗА ПИТАНЬ (50 шт) - NARZĘDNIK ---
const QUESTIONS_DB = [
  // --- Професії (Kim?) ---
  {
    text: "Jestem ______ (student).",
    options: ["studentem", "student", "studentą"],
    correct: 0,
    explanation: "Чоловічий рід: закінчення -em.",
  },
  {
    text: "Ona jest ______ (architekt).",
    options: ["architektem", "architekta", "architektą"],
    correct: 0,
    explanation: "Професія (він/вона) часто має форму чоловічого роду + -em.",
  },
  {
    text: "On jest dobrym ______ (kierowca).",
    options: ["kierowcą", "kierowcem", "kierowcu"],
    correct: 0,
    explanation: "ВИНЯТОК! Чоловічий рід на -a відмінюється як жіночий (-ą).",
  },
  {
    text: "Mój tata jest ______ (lekarz).",
    options: ["lekarzem", "lekarzą", "lekarzu"],
    correct: 0,
    explanation: "Чоловічий рід: -em.",
  },
  {
    text: "Moja mama jest ______ (nauczycielka).",
    options: ["nauczycielką", "nauczycielkem", "nauczycielka"],
    correct: 0,
    explanation: "Жіночий рід: -ą.",
  },
  {
    text: "Chcę zostać ______ (programista).",
    options: ["programistą", "programistem", "programistu"],
    correct: 0,
    explanation: "ВИНЯТОК! Чоловік на -a -> закінчення -ą.",
  },
  {
    text: "On jest ______ (Polak).",
    options: ["Polakiem", "Polakem", "Polaką"],
    correct: 0,
    explanation: "Після K/G додаємо i (-iem).",
  },
  {
    text: "Jestem ______ (kelnerka).",
    options: ["kelnerką", "kelnerkem", "kelnerka"],
    correct: 0,
    explanation: "Жіночий рід: -ą.",
  },
  {
    text: "On jest moim ______ (kolega).",
    options: ["kolegą", "kolegem", "kolegu"],
    correct: 0,
    explanation: "ВИНЯТОК! Чоловік на -a -> -ą.",
  },
  {
    text: "Zostałem ______ (ojciec).",
    options: ["ojcem", "ojciecem", "ojca"],
    correct: 0,
    explanation: "Ojciec -> Ojcem (випадає 'ie').",
  },

  // --- Інтереси (Czym?) - Interesuję się... ---
  {
    text: "Interesuję się ______ (sport).",
    options: ["sportem", "sport", "sportą"],
    correct: 0,
    explanation: "Чоловічий рід: -em.",
  },
  {
    text: "Interesuję się ______ (muzyka).",
    options: ["muzyką", "muzykiem", "muzyka"],
    correct: 0,
    explanation: "Жіночий рід: -ą.",
  },
  {
    text: "Interesuję się ______ (historia).",
    options: ["historią", "historiem", "historia"],
    correct: 0,
    explanation: "Жіночий рід: -ą.",
  },
  {
    text: "Interesuję się ______ (kino).",
    options: ["kinem", "kino", "kiną"],
    correct: 0,
    explanation: "Середній рід (-o): -em.",
  },
  {
    text: "Interesuję się ______ (polityka).",
    options: ["polityką", "politykiem", "polityka"],
    correct: 0,
    explanation: "Жіночий рід: -ą.",
  },
  {
    text: "Interesuję się ______ (technologia).",
    options: ["technologią", "technologiem", "technologia"],
    correct: 0,
    explanation: "Жіночий рід: -ą.",
  },
  {
    text: "Interesuję się ______ (piłka nożna).",
    options: ["piłką nożną", "piłkem nożnem", "piłka nożna"],
    correct: 0,
    explanation: "Жіночий рід: обидва слова отримують -ą.",
  },
  {
    text: "Interesuję się ______ (język polski).",
    options: ["językiem polskim", "językem polskym", "język polski"],
    correct: 0,
    explanation: "Чоловічий рід (K/G): -iem/-im.",
  },
  {
    text: "Interesuję się ______ (fotografia).",
    options: ["fotografią", "fotografiem", "fotografia"],
    correct: 0,
    explanation: "Жіночий рід: -ą.",
  },
  {
    text: "Interesuję się ______ (malarstwo).",
    options: ["malarstwem", "malarstwo", "malarstwą"],
    correct: 0,
    explanation: "Середній рід: -em.",
  },

  // --- З ким? З чим? (Z + Narzędnik) ---
  {
    text: "Idę do kina z ______ (brat).",
    options: ["bratem", "brata", "bratą"],
    correct: 0,
    explanation: "Чоловічий рід: -em.",
  },
  {
    text: "Rozmawiam z ______ (siostra).",
    options: ["siostrą", "siostrem", "siostra"],
    correct: 0,
    explanation: "Жіночий рід: -ą.",
  },
  {
    text: "Piję kawę z ______ (mleko).",
    options: ["mlekiem", "mlekem", "mleką"],
    correct: 0,
    explanation: "Середній рід (K): -iem.",
  },
  {
    text: "Lubię herbatę z ______ (cukier).",
    options: ["cukrem", "cukierem", "cukra"],
    correct: 0,
    explanation: "Cukier -> Cukrem (випадає 'ie').",
  },
  {
    text: "Jem kanapkę z ______ (ser).",
    options: ["serem", "sera", "seru"],
    correct: 0,
    explanation: "Чоловічий рід: -em.",
  },
  {
    text: "Idę na spacer z ______ (pies).",
    options: ["psem", "piesem", "psą"],
    correct: 0,
    explanation: "Pies -> Psem (випадає 'ie').",
  },
  {
    text: "Mieszkam z ______ (babcia).",
    options: ["babcią", "babciem", "babcia"],
    correct: 0,
    explanation: "Жіночий рід: -ą.",
  },
  {
    text: "Pracuję z ______ (ten pan).",
    options: ["tym panem", "tym pan", "tą panią"],
    correct: 0,
    explanation: "Чоловічий рід: -ym -em.",
  },
  {
    text: "Rozmawiam z ______ (ta pani).",
    options: ["tą panią", "tym panem", "tą pani"],
    correct: 0,
    explanation: "Жіночий рід: -ą -ą.",
  },
  {
    text: "Jadę ______ (samochód).",
    options: ["samochodem", "samochódem", "samochodą"],
    correct: 0,
    explanation: "Інструмент (чим?): -em (ó змінюється на o).",
  },

  // --- Прикметники (Jaki -> Jakim? / Jaka -> Jaką?) ---
  {
    text: "Jestem ______ (dobry) studentem.",
    options: ["dobrym", "dobrem", "dobrą"],
    correct: 0,
    explanation: "Чоловічий прикметник: -ym.",
  },
  {
    text: "Mieszkam z ______ (młoda) kobietą.",
    options: ["młodą", "młodym", "młodej"],
    correct: 0,
    explanation: "Жіночий прикметник: -ą.",
  },
  {
    text: "Piszę ______ (nowy) długopisem.",
    options: ["nowym", "nowem", "nową"],
    correct: 0,
    explanation: "Чоловічий прикметник: -ym.",
  },
  {
    text: "Interesuję się ______ (polska) historią.",
    options: ["polską", "polskim", "polskiem"],
    correct: 0,
    explanation: "Жіночий прикметник: -ą.",
  },
  {
    text: "Rozmawiam z ______ (wysoki) mężczyzną.",
    options: ["wysokim", "wysokiem", "wysoką"],
    correct: 0,
    explanation: "Чоловічий прикметник (K): -im.",
  },
  {
    text: "Idę z ______ (małe) dzieckiem.",
    options: ["małym", "małem", "małą"],
    correct: 0,
    explanation: "Середній прикметник: -ym.",
  },
  {
    text: "To jest kanapka z ______ (biały) serem.",
    options: ["białym", "białem", "białą"],
    correct: 0,
    explanation: "Чоловічий прикметник: -ym.",
  },
  {
    text: "Jadę ______ (szybki) pociągiem.",
    options: ["szybkim", "szybkiem", "szybką"],
    correct: 0,
    explanation: "Чоловічий прикметник (K): -im.",
  },
  {
    text: "On jest ______ (świetny) aktorem.",
    options: ["świetnym", "świetnem", "świetną"],
    correct: 0,
    explanation: "Чоловічий прикметник: -ym.",
  },
  {
    text: "Ona jest ______ (dobra) matką.",
    options: ["dobrą", "dobrym", "dobrej"],
    correct: 0,
    explanation: "Жіночий прикметник: -ą.",
  },

  // --- Мікс (Різне) ---
  {
    text: "Piszę ______ (ołówek).",
    options: ["ołówkiem", "ołówkem", "ołówką"],
    correct: 0,
    explanation: "Інструмент (K): -iem.",
  },
  {
    text: "Jadę do pracy ______ (autobus).",
    options: ["autobusem", "autobusa", "autobusą"],
    correct: 0,
    explanation: "Транспорт: -em.",
  },
  {
    text: "Warszawa jest ______ (stolica) Polski.",
    options: ["stolicą", "stolicem", "stolicy"],
    correct: 0,
    explanation: "Jest kim? Czym? -> -ą.",
  },
  {
    text: "Adam Mickiewicz był ______ (poeta).",
    options: ["poetą", "poetem", "poetom"],
    correct: 0,
    explanation: "Чоловік на -a -> -ą.",
  },
  {
    text: "Lubię pizzę z ______ (szynka).",
    options: ["szynką", "szynkiem", "szynku"],
    correct: 0,
    explanation: "Жіночий рід: -ą.",
  },
  {
    text: "Piję herbatę z ______ (cytryna).",
    options: ["cytryną", "cytrynem", "cytrynu"],
    correct: 0,
    explanation: "Жіночий рід: -ą.",
  },
  {
    text: "Spaceruję z ______ (pies).",
    options: ["psem", "piesem", "psą"],
    correct: 0,
    explanation: "Pies -> Psem.",
  },
  {
    text: "Rozmawiam z ______ (kolega).",
    options: ["kolegą", "kolegem", "kolegu"],
    correct: 0,
    explanation: "Чоловік на -a -> -ą.",
  },
  {
    text: "Jestem ______ (zmęczony).",
    options: ["zmęczony", "zmęczonym", "zmęczona"],
    correct: 0,
    explanation:
      "УВАГА! Тут 'Jaki jestem?' (прикметник після 'być' без іменника) -> Називний відмінок! Але якщо 'Jestem zmęczonym człowiekiem' - то орудний.",
  },
  {
    text: "On jest ______ (zły).",
    options: ["zły", "złym", "zła"],
    correct: 0,
    explanation: "Тут теж просто прикметник! (On jest jaki?).",
  },
];

const PolishTrainerT3 = () => {
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [showTheory, setShowTheory] = useState(true);

  // Ініціалізація: перемішуємо питання при старті
  useEffect(() => {
    restartGame();
  }, []);

  const restartGame = () => {
    const shuffled = [...QUESTIONS_DB].sort(() => 0.5 - Math.random());
    setShuffledQuestions(shuffled);
    setCurrentQIndex(0);
    setScore(0);
    setCompleted(false);
    setShowFeedback(false);
    setSelectedOption(null);
  };

  const handleOptionClick = (index) => {
    if (showFeedback) return;

    const question = shuffledQuestions[currentQIndex];
    const correct = index === question.correct;

    setSelectedOption(index);
    setIsCorrect(correct);
    setShowFeedback(true);

    if (correct) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentQIndex < shuffledQuestions.length - 1) {
      setCurrentQIndex((prev) => prev + 1);
      setShowFeedback(false);
      setSelectedOption(null);
    } else {
      setCompleted(true);
    }
  };

  // --- RENDERERS ---

  if (shuffledQuestions.length === 0)
    return <div className="p-10 text-center">Завантаження...</div>;

  const question = shuffledQuestions[currentQIndex];
  const progressPercentage = Math.round(
    (currentQIndex / shuffledQuestions.length) * 100
  );

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 flex flex-col">
      {/* 1. HEADER */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">
              A1
            </span>
            <h1 className="font-bold text-slate-800 truncate">
              Тема 3: Narzędnik
            </h1>
          </div>

          <div className="flex items-center gap-1">
            {/* Назад */}
            <a
              href={PREV_APP_URL}
              className={`p-2 rounded-full transition-colors ${
                PREV_APP_URL === "#"
                  ? "text-slate-300 cursor-not-allowed"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
              title="Попередня тема"
            >
              <ChevronLeft size={24} />
            </a>

            {/* МЕНЮ */}
            <a
              href={MENU_APP_URL}
              className={`p-2 rounded-full transition-colors ${
                MENU_APP_URL === "#"
                  ? "text-slate-300 cursor-not-allowed"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
              title="Усі теми"
            >
              <List size={24} />
            </a>

            {/* Вперед */}
            <a
              href={NEXT_APP_URL}
              className={`p-2 rounded-full transition-colors ${
                NEXT_APP_URL === "#"
                  ? "text-slate-300 cursor-not-allowed"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
              title="Наступна тема"
            >
              <ChevronRight size={24} />
            </a>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-xl mx-auto w-full p-4 md:p-6 flex flex-col">
        {/* 2. THEORY BLOCK (Collapsible) */}
        <div className="mb-6 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div
            onClick={() => setShowTheory(!showTheory)}
            className="p-4 bg-slate-50 border-b border-slate-100 flex items-center justify-between cursor-pointer hover:bg-slate-100 transition-colors"
          >
            <div className="flex items-center gap-2 font-semibold text-blue-700">
              <BookOpen size={20} />
              <span>Експрес-правила</span>
            </div>
            <span className="text-xs text-slate-400">
              {showTheory ? "Згорнути" : "Показати"}
            </span>
          </div>

          {showTheory && (
            <div className="p-5 text-sm leading-relaxed text-slate-700 space-y-4">
              <p>
                <b>Narzędnik (Орудний відмінок)</b> — Ким? Чим? (Kim? Czym?).
                Використовуємо після: <i>być, interesować się, z (з)</i>.
              </p>

              <div className="grid grid-cols-1 gap-2">
                <div className="p-2 bg-blue-50 rounded border border-blue-100">
                  <strong className="block text-blue-800">
                    1. Чоловічий (Męski) та Середній (Nijaki):
                  </strong>
                  <ul className="list-disc pl-5 mt-1 space-y-1">
                    <li>
                      Іменник: <b>-em</b> (domem, oknem). <br />
                      <span className="text-xs text-slate-500">
                        Якщо K/G &rarr; <b>-iem</b> (Polakiem).
                      </span>
                    </li>
                    <li>
                      Прикметник: <b>-ym</b> (dobrym). <br />
                      <span className="text-xs text-slate-500">
                        Якщо K/G &rarr; <b>-im</b> (polskim).
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="p-2 bg-red-50 rounded border border-red-100">
                  <strong className="block text-red-800">
                    2. Жіночий (Żeński):
                  </strong>
                  <ul className="list-disc pl-5 mt-1 space-y-1">
                    <li>
                      Іменник: <b>-ą</b> (kawą, kobietą).
                    </li>
                    <li>
                      Прикметник: <b>-ą</b> (dobrą, polską).
                    </li>
                  </ul>
                </div>

                <div className="p-2 bg-amber-50 rounded border border-amber-100">
                  <strong className="block text-amber-800">
                    ⚠️ Винятки (Чоловіки на -a):
                  </strong>
                  <ul className="list-disc pl-5 mt-1 space-y-1">
                    <li>
                      <i>Kolega, Tata, Mężczyzna</i> поводяться як жінки! &rarr;{" "}
                      <b>-ą</b>.
                    </li>
                    <li>Z kolegą, z tatą.</li>
                  </ul>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 mt-2">
                <a
                  href={GOOGLE_DOC_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider ${
                    GOOGLE_DOC_URL === "#"
                      ? "text-slate-400 cursor-not-allowed"
                      : "text-blue-600 hover:underline"
                  }`}
                >
                  <ExternalLink size={14} />
                  {GOOGLE_DOC_URL === "#"
                    ? "Детальні правила (Скоро)"
                    : "Відкрити повні правила"}
                </a>
              </div>
            </div>
          )}
        </div>

        {/* 3. GAME ZONE */}
        {!completed ? (
          <div className="flex-1 flex flex-col justify-center">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 text-center mb-6 min-h-[160px] flex flex-col items-center justify-center">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
                Питання {currentQIndex + 1} з {shuffledQuestions.length}
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 leading-tight">
                {question.text}
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-3 mb-6">
              {question.options.map((opt, idx) => {
                let btnClass =
                  "p-4 rounded-xl font-semibold text-lg transition-all border-2 text-left relative ";

                if (showFeedback) {
                  if (idx === question.correct) {
                    btnClass += "bg-green-100 border-green-500 text-green-800";
                  } else if (selectedOption === idx) {
                    btnClass += "bg-red-100 border-red-500 text-red-800";
                  } else {
                    btnClass += "bg-white border-slate-100 text-slate-300";
                  }
                } else {
                  btnClass +=
                    "bg-white border-slate-200 hover:border-blue-500 hover:bg-blue-50 text-slate-700 shadow-sm active:scale-[0.98]";
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleOptionClick(idx)}
                    disabled={showFeedback}
                    className={btnClass}
                  >
                    {opt}
                    {showFeedback && idx === question.correct && (
                      <Check
                        size={20}
                        className="absolute right-4 top-1/2 -translate-y-1/2"
                      />
                    )}
                    {showFeedback &&
                      idx !== question.correct &&
                      selectedOption === idx && (
                        <X
                          size={20}
                          className="absolute right-4 top-1/2 -translate-y-1/2"
                        />
                      )}
                  </button>
                );
              })}
            </div>

            {showFeedback && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
                {!isCorrect && (
                  <div className="bg-red-50 text-red-800 p-4 rounded-xl mb-4 text-sm border border-red-100 flex gap-3 items-start">
                    <Brain size={20} className="shrink-0 mt-0.5" />
                    <div>
                      <strong>Підказка:</strong> {question.explanation}
                    </div>
                  </div>
                )}

                <button
                  onClick={handleNext}
                  className={`w-full p-4 rounded-xl font-bold text-lg text-white shadow-lg flex items-center justify-center gap-2 transition-all ${
                    isCorrect
                      ? "bg-green-600 hover:bg-green-700 shadow-green-200"
                      : "bg-slate-800 hover:bg-slate-900 shadow-slate-300"
                  }`}
                >
                  {currentQIndex < shuffledQuestions.length - 1
                    ? "Далі"
                    : "Завершити"}{" "}
                  <ArrowRight size={20} />
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center animate-in zoom-in duration-500">
            <div className="mb-6">
              {score === shuffledQuestions.length ? (
                <Trophy size={80} className="text-yellow-500 mx-auto" />
              ) : score >= shuffledQuestions.length * 0.8 ? (
                <Trophy size={80} className="text-blue-500 mx-auto" />
              ) : (
                <RefreshCw size={80} className="text-slate-300 mx-auto" />
              )}
            </div>

            <h2 className="text-3xl font-bold text-slate-800 mb-2">
              {score === shuffledQuestions.length
                ? "Ідеально!"
                : "Тренування завершено!"}
            </h2>
            <p className="text-slate-500 mb-8 text-lg">
              Ваш результат: <strong className="text-slate-800">{score}</strong>{" "}
              з {shuffledQuestions.length}
            </p>

            <button
              onClick={restartGame}
              className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 flex items-center gap-2"
            >
              <RefreshCw size={20} />
              Почати знову
            </button>
          </div>
        )}
      </main>

      {!completed && (
        <footer className="bg-white border-t border-slate-100 p-4">
          <div className="max-w-xl mx-auto">
            <div className="flex justify-between text-xs font-bold text-slate-400 mb-2">
              <span>Прогрес</span>
              <span>
                {Math.round((score / (currentQIndex + 1)) * 100) || 0}% Успіху
              </span>
            </div>
            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-500 transition-all duration-500 ease-out"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
};

export default PolishTrainerT3;
