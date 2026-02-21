"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Play, Copy, Check, Terminal } from "lucide-react";

const codeSnippets = [
  {
    language: "typescript",
    title: "React Hook",
    code: `const useMousePosition = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handler);
    return () => window.removeEventListener('mousemove', handler);
  }, []);

  return position;
};`,
  },
  {
    language: "python",
    title: "AI Agent",
    code: `class AgenticAI:
    def __init__(self, model="gpt-4"):
        self.model = model
        self.memory = []

    async def think(self, prompt: str) -> str:
        context = self.build_context()
        response = await self.llm.generate(
            prompt=prompt,
            context=context
        )
        self.memory.append(response)
        return response.action`,
  },
  {
    language: "javascript",
    title: "Animation",
    code: `gsap.timeline()
  .fromTo('.hero-text',
    { y: 100, opacity: 0 },
    { y: 0, opacity: 1, duration: 1, stagger: 0.1 }
  )
  .fromTo('.hero-image',
    { scale: 0.8, opacity: 0 },
    { scale: 1, opacity: 1, duration: 0.8 },
    '-=0.5'
  );`,
  },
];

const LiveCodeEditor: React.FC = () => {
  const [activeSnippet, setActiveSnippet] = useState(0);
  const [displayedCode, setDisplayedCode] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [copied, setCopied] = useState(false);
  const typeRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const code = codeSnippets[activeSnippet].code;
    let index = 0;
    setDisplayedCode("");
    setIsTyping(true);

    const type = () => {
      if (index < code.length) {
        setDisplayedCode(code.slice(0, index + 1));
        index++;
        typeRef.current = setTimeout(type, 20 + Math.random() * 30);
      } else {
        setIsTyping(false);
      }
    };

    type();

    return () => {
      if (typeRef.current) clearTimeout(typeRef.current);
    };
  }, [activeSnippet]);

  const handleCopy = () => {
    navigator.clipboard.writeText(codeSnippets[activeSnippet].code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const highlightSyntax = (code: string, language: string) => {
    const keywords = {
      typescript: ["const", "let", "var", "function", "return", "import", "export", "interface", "type", "async", "await", "useEffect", "useState"],
      python: ["class", "def", "self", "async", "await", "return", "import", "from", "if", "else", "for", "in"],
      javascript: ["const", "let", "var", "function", "return", "import", "export", "async", "await"],
    };

    const lang = language as keyof typeof keywords;
    let highlighted = code;

    (keywords[lang] || []).forEach((keyword) => {
      const regex = new RegExp(`\\b${keyword}\\b`, "g");
      highlighted = highlighted.replace(regex, `<span class="text-purple-400">${keyword}</span>`);
    });

    highlighted = highlighted.replace(/(["'`])([^"'`]*)\1/g, '<span class="text-emerald-400">$1$2$1</span>');
    highlighted = highlighted.replace(/\/\/.*/g, '<span class="text-gray-500">$&</span>');
    highlighted = highlighted.replace(/#.*/g, '<span class="text-gray-500">$&</span>');
    highlighted = highlighted.replace(/(\w+)\(/g, '<span class="text-yellow-400">$1</span>(');

    return highlighted;
  };

  return (
    <div className="relative">
      <div className="bg-[#1e1e1e] rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
        <div className="flex items-center justify-between px-4 py-3 bg-[#2d2d2d] border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>

          <div className="flex items-center gap-2">
            {codeSnippets.map((snippet, i) => (
              <button
                key={i}
                onClick={() => setActiveSnippet(i)}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                  activeSnippet === i
                    ? "bg-indigo-500 text-white"
                    : "text-gray-400 hover:text-white hover:bg-white/10"
                }`}
              >
                {snippet.title}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
            >
              {copied ? <Check size={16} className="text-green-400" /> : <Copy size={16} />}
            </button>
          </div>
        </div>

        <div className="relative p-6 font-mono text-sm overflow-x-auto">
          <div className="absolute left-0 top-0 bottom-0 w-12 bg-[#1e1e1e] border-r border-white/5 flex flex-col items-end pr-2 pt-6 text-gray-600 text-xs">
            {displayedCode.split("\n").map((_, i) => (
              <div key={i} className="leading-6">{i + 1}</div>
            ))}
          </div>

          <pre className="pl-8 leading-6 text-gray-300">
            <code dangerouslySetInnerHTML={{ __html: highlightSyntax(displayedCode, codeSnippets[activeSnippet].language) }} />
            {isTyping && (
              <motion.span
                className="inline-block w-2 h-5 bg-indigo-400 ml-1"
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity }}
              />
            )}
          </pre>
        </div>

        <div className="px-4 py-3 bg-[#2d2d2d] border-t border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Terminal size={14} />
            <span>{codeSnippets[activeSnippet].language}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs text-gray-500">Live</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveCodeEditor;
