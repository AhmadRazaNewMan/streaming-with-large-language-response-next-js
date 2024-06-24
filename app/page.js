'use client'

import { Bot, Loader2, Send, User2 } from "lucide-react";
import { useChat } from 'ai/react';
import Markdown from "./components/markdown";

export default function Home() {
  const { messages, input, handleInputChange, handleSubmit, isLoading, stop } = useChat({
    api: '/api/genai'
  });

  return (
    <main className="flex min-h-screen flex-col items-center  p-4 md:p-12 bg-gradient-to-r">
      <div className="w-full px-2 bg-white rounded-lg shadow-lg">
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-2xl font-semibold text-center text-gray-800">Chat with AI</h1>
        </div>
        <div className="p-4">
          {RenderMessages()}
          {RenderForm()}
        </div>
      </div>
    </main>
  );

  function RenderForm() {
    return (
      <form
        className="mt-4 flex items-center rounded-lg overflow-hidden shadow-md"
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
          className="flex-grow py-3 px-4 outline-none bg-gray-100 text-gray-800 placeholder-gray-500 disabled:bg-transparent"
        />
        <button
          type="submit"
          className={`flex items-center justify-center ${isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-purple-600 hover:bg-purple-700"} text-white font-semibold py-3 px-6 transition duration-200`}
          disabled={isLoading}
        >
          {isLoading ? <Loader2 onClick={stop} className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
        </button>
      </form>
    );
  }

  function RenderMessages() {
    return (
      <div id="chatbox" className="mt-4  space-y-4">
        {messages.map((m, index) => (
          <div
            key={index}
            className={`relative p-4 rounded-lg shadow-md max-w-lg ${m.role === "user" ? "bg-purple-600 text-white ml-auto" : ""} `}
          >
          
            {<Markdown text={m.content}/>}
            {m.role === 'user' ? (
              <User2 className="absolute top-2 -left-7 text-purple-700" />
            ) : (
              <Bot className={`absolute top-2 -left-6 rounded-lg text-purple-700 ${
                isLoading && index===messages.length-1 ? 'animate-bounce': ""
              }`}  />
            )}
          </div>
        ))}
      </div>
    );
  }
}
