import React, {
  useState,
  useEffect,
  useRef
} from "react";

import API from "../services/api";

import {
  Send,
  Bot,
  User,
  Sparkles,
  Compass,
  Globe,
  Coffee,
  Mountain
} from "lucide-react";

export default function AIChatbot() {

  const [messages, setMessages] =
    useState([]);

  const [inputValue, setInputValue] =
    useState("");

  const [isTyping, setIsTyping] =
    useState(false);

  const messagesEndRef =
    useRef(null);

  const inputRef =
    useRef(null);

  // Auto scroll
  const scrollToBottom = () => {

    messagesEndRef.current
      ?.scrollIntoView({
        behavior: "smooth"
      });
  };

  useEffect(() => {

    scrollToBottom();

  }, [messages, isTyping]);

  useEffect(() => {

    inputRef.current?.focus();

  }, []);

  const handleSendMessage = async () => {

    if(
      !inputValue.trim() ||
      isTyping
    ) return;

    const userMessage = {

      id: Date.now(),

      role: "user",

      content:
        inputValue.trim(),
    };

    setMessages((prev) => [
      ...prev,
      userMessage
    ]);

    const currentMessage =
      inputValue;

    setInputValue("");

    setIsTyping(true);

    try {

      const res = await API.post(
        "/ai/travel-chat",
        {
          message:
            currentMessage
        }
      );

      const aiResponse = {

        id: Date.now() + 1,

        role: "assistant",

        content:
          res.data.reply,
      };

      setMessages((prev) => [
        ...prev,
        aiResponse
      ]);

    } catch (err) {

      console.log(err);

      const errorMessage = {

        id: Date.now() + 1,

        role: "assistant",

        content:
          "⚠️ AI service temporarily unavailable."
      };

      setMessages((prev) => [
        ...prev,
        errorMessage
      ]);

    } finally {

      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {

    if(
      e.key === "Enter" &&
      !e.shiftKey
    ){

      e.preventDefault();

      handleSendMessage();
    }
  };

  const handleSuggestedPrompt = (
    prompt
  ) => {

    setInputValue(prompt);

    inputRef.current?.focus();
  };

  const quickPrompts = [

    "Find me a guide in Paris",

    "Best cultural tours in Japan",

    "Adventure hiking in Peru",

    "Food tours in Italy",
  ];

  return (

    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-indigo-50/30 to-purple-50/40 dark:from-gray-900 dark:via-gray-900 dark:to-purple-900/20 transition-colors duration-300 relative overflow-hidden">

      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">

        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full blur-3xl opacity-20 animate-pulse dark:bg-purple-600"></div>

        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-300 rounded-full blur-3xl opacity-20 animate-pulse dark:bg-blue-600"></div>

      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8 h-screen flex flex-col">

        {/* Header */}
        <div className="mb-6 md:mb-8">

          <div className="bg-gradient-to-r from-purple-600/10 via-purple-500/10 to-blue-600/10 dark:from-purple-600/20 dark:via-purple-500/20 dark:to-blue-600/20 backdrop-blur-xl rounded-3xl border border-white/30 dark:border-gray-700/30 p-6 md:p-8 shadow-2xl">

            <div className="flex items-center gap-4 flex-wrap">

              <div className="relative">

                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full blur-xl opacity-60 animate-pulse"></div>

                <div className="relative bg-gradient-to-r from-purple-600 to-blue-600 rounded-full p-3 shadow-lg">

                  <Sparkles className="w-8 h-8 text-white" />

                </div>

              </div>

              <div className="flex-1">

                <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 via-purple-500 to-blue-600 bg-clip-text text-transparent">

                  GuideMate AI Assistant

                </h1>

                <p className="text-gray-600 dark:text-gray-300 mt-2">

                  Your intelligent travel companion for guides,
                  destinations, adventures, and personalized travel planning.

                </p>

              </div>

            </div>

          </div>

        </div>

        {/* Chat Container */}
        <div className="flex-1 bg-white/40 dark:bg-gray-800/40 backdrop-blur-xl rounded-3xl border border-white/50 dark:border-gray-700/50 shadow-2xl flex flex-col overflow-hidden">

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">

            {messages.length === 0 ? (

              <div className="flex flex-col items-center justify-center min-h-[500px] text-center p-6">

                <div className="relative mb-6">

                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full blur-2xl opacity-40 animate-pulse"></div>

                  <div className="relative bg-gradient-to-r from-purple-600 to-blue-600 rounded-full p-4 shadow-xl">

                    <Bot className="w-16 h-16 text-white" />

                  </div>

                </div>

                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">

                  Hello Traveler! 👋

                </h2>

                <p className="text-gray-600 dark:text-gray-300 text-lg mb-8 max-w-md">

                  Ask me anything about travel, guides,
                  destinations, food tours, adventures, and more.

                </p>

                {/* Prompt Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl w-full">

                  {[
                    {
                      icon: Compass,
                      text: "Find me a guide in Paris"
                    },
                    {
                      icon: Globe,
                      text: "Best cultural tours in Japan"
                    },
                    {
                      icon: Mountain,
                      text: "Adventure hiking in Peru"
                    },
                    {
                      icon: Coffee,
                      text: "Food tours in Italy"
                    },
                  ].map((prompt, idx) => (

                    <button
                      key={idx}
                      onClick={() =>
                        handleSuggestedPrompt(
                          prompt.text
                        )
                      }
                      className="group flex items-center gap-3 p-4 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl border border-white/40 dark:border-gray-700/40 hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300 hover:scale-105"
                    >

                      <div className="p-2 rounded-xl bg-purple-500/20">

                        <prompt.icon className="w-5 h-5 text-purple-500" />

                      </div>

                      <span className="text-sm font-medium text-gray-700 dark:text-gray-200">

                        {prompt.text}

                      </span>

                    </button>

                  ))}

                </div>

              </div>

            ) : (

              <>
                {messages.map((message) => (

                  <div
                    key={message.id}
                    className={`flex gap-3 ${
                      message.role === "user"
                      ? "justify-end"
                      : "justify-start"
                    }`}
                  >

                    {/* AI Avatar */}
                    {message.role === "assistant" && (

                      <div className="flex-shrink-0">

                        <div className="w-9 h-9 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center shadow-md">

                          <Bot className="w-5 h-5 text-white" />

                        </div>

                      </div>

                    )}

                    {/* Message Bubble */}
                    <div
                      className={`max-w-[80%] md:max-w-[70%] rounded-2xl px-5 py-3 shadow-lg ${
                        message.role === "user"
                        ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                        : "bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/40 dark:border-gray-700/40 text-gray-900 dark:text-white"
                      }`}
                    >

                      <p className="text-sm md:text-base leading-relaxed whitespace-pre-wrap">

                        {message.content}

                      </p>

                    </div>

                    {/* User Avatar */}
                    {message.role === "user" && (

                      <div className="flex-shrink-0">

                        <div className="w-9 h-9 rounded-full bg-gradient-to-r from-gray-600 to-gray-700 flex items-center justify-center shadow-md">

                          <User className="w-5 h-5 text-white" />

                        </div>

                      </div>

                    )}

                  </div>

                ))}

                {/* Typing Indicator */}
                {isTyping && (

                  <div className="flex gap-3 justify-start">

                    <div className="flex-shrink-0">

                      <div className="w-9 h-9 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center shadow-md">

                        <Bot className="w-5 h-5 text-white" />

                      </div>

                    </div>

                    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl px-5 py-3 border border-white/40 dark:border-gray-700/40 shadow-lg">

                      <div className="flex gap-1.5">

                        <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"></div>

                        <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce delay-150"></div>

                        <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce delay-300"></div>

                      </div>

                    </div>

                  </div>

                )}

                <div ref={messagesEndRef} />

              </>

            )}

          </div>

          {/* Quick Prompts */}
          {messages.length > 0 && (

            <div className="px-4 pt-3 pb-2 border-t border-gray-200/50 dark:border-gray-700/50">

              <div className="flex gap-2 overflow-x-auto pb-2">

                {quickPrompts.map((prompt, idx) => (

                  <button
                    key={idx}
                    onClick={() =>
                      handleSuggestedPrompt(
                        prompt
                      )
                    }
                    className="flex-shrink-0 px-4 py-2 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-full text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 border border-gray-300/50 dark:border-gray-700/50 hover:border-purple-500/50 hover:shadow-md hover:shadow-purple-500/20 transition-all duration-300 hover:scale-105"
                  >

                    {prompt}

                  </button>

                ))}

              </div>

            </div>

          )}

          {/* Input */}
          <div className="p-4 md:p-6 border-t border-gray-200/50 dark:border-gray-700/50 bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm">

            <div className="flex gap-3 items-end">

              <div className="flex-1 relative">

                <textarea
                  ref={inputRef}
                  value={inputValue}
                  onChange={(e) => {

                    setInputValue(
                      e.target.value
                    );

                    e.target.style.height =
                      "auto";

                    e.target.style.height =
                      `${e.target.scrollHeight}px`;
                  }}
                  onKeyDown={handleKeyPress}
                  placeholder="Ask about travel, guides, food tours, destinations..."
                  rows={1}
                  className="w-full px-5 py-3 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-gray-300/50 dark:border-gray-700/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 resize-none text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                  style={{
                    minHeight: "52px",
                    maxHeight: "120px"
                  }}
                />

              </div>

              <button
                onClick={handleSendMessage}
                disabled={
                  !inputValue.trim() ||
                  isTyping
                }
                className="p-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-2xl hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 hover:scale-105 disabled:opacity-50"
              >

                <Send className="w-5 h-5" />

              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}