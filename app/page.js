'use client'

import { Bot, Loader2, Send, User2 } from "lucide-react";
import { useChat } from 'ai/react';
import Markdown from "./components/Markdown";

export default function Home() {
  const { messages, input, handleInputChange, handleSubmit, isLoading, stop } = useChat({
    api: '/api/genai'
  });

  return (
    <main className="flex min-h-screen flex-col items-center p-4 md:p-12 bg-gradient-to-r ">
      <div className="w-full max-w-4xl px-2 bg-white rounded-lg shadow-2xl">
        <div className="p-6 border-b border-gray-300">
          <h1 className="text-3xl font-bold text-center text-gray-900">Chat with AI</h1>
        </div>
        <div className="p-6">
          {RenderMessages()}
          {RenderForm()}
        </div>
      </div>
    </main>
  );

  function RenderForm() {
    return (
      <form
        className="mt-4 flex items-center rounded-full overflow-hidden shadow-lg transition-transform duration-300 transform-gpu hover:scale-105"
        onSubmit={(event) => {
          event.preventDefault();
          handleSubmit(event, {
            data: {
              prompt: input
            }
          });
        }}
      >
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder={isLoading ? "Generating..." : "Ask something..."}
          disabled={isLoading}
          className="flex-grow py-3 px-4 outline-none bg-gray-100 text-gray-900 placeholder-gray-500 disabled:bg-transparent"
        />
        <button
          type="submit"
          className={`flex items-center justify-center ${isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-purple-700 hover:bg-purple-800"} text-white font-semibold py-3 px-6 transition duration-200`}
          disabled={isLoading}
        >
          {isLoading ? <Loader2 onClick={stop} className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
        </button>
      </form>
    );
  }

  function RenderMessages() {
    return (
      <div id="chatbox" className="mt-4 space-y-4">
        {messages.map((m, index) => (
          <div
            key={index}
            className={`relative p-4 rounded-lg shadow-lg w-auto transition-transform duration-300 transform-gpu hover:scale-80 ${m.role === "user" ? "bg-purple-700 text-white ml-auto" : "bg-gray-100 text-gray-900"} `}
          >
            <Markdown text={m.content} />
            {m.role === 'user' ? (
              <User2 className="absolute top-2 -left-7 text-purple-300" />
            ) : (
              <Bot className={`absolute top-2 -left-7 rounded-full text-purple-300 ${
                isLoading && index === messages.length - 1 ? 'animate-bounce' : ""
              }`} />
            )}
          </div>
        ))}
      </div>
    );
  }
}
