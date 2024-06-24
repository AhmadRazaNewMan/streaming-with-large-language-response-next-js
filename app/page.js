'use client'

import { Send } from "lucide-react";
import Image from "next/image";
import { useChat } from 'ai/react';

export default function Home() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: '/api/genai' // corrected API endpoint format
  });

  return (
    <main className="flex min-h-screen flex-col p-4 md:p-12 bg-gradient-to-r">
      {RenderForm()}
      {JSON.stringify(messages)}
    </main>
  );

  // Inner RenderForm Function
  function RenderForm() {
    return (
      <form 
        className="w-full max-w-lg flex flex-row gap-2 items-center bg-white p-4 rounded-xl shadow-lg" 
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
          placeholder="Ask something . . ." 
          className="flex-grow border border-gray-300 rounded-full outline-none px-4 py-2 text-blue-800 placeholder:text-blue-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-200"
        />
        <button 
          type="submit" 
          className="flex items-center justify-center bg-orange-500 rounded-full hover:bg-orange-600 text-white font-bold py-2 px-4 transition duration-200 transform hover:scale-105"
        >
          <Send className="w-5 h-5" />
        </button>
      </form>
    );
  }
}
