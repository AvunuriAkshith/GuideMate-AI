import React, {
  useEffect,
  useRef,
  useState
} from "react";

import {
  io
} from "socket.io-client";

import API from "../services/api";

import {
  Send,
  Sparkles,
  Phone,
  Video,
  MoreVertical,
  CheckCheck,
  ShieldCheck
} from "lucide-react";

const socket = io(
  "http://127.0.0.1:8000"
);

export default function GuideChat() {

  const [messages, setMessages] =
    useState([]);

  const [message, setMessage] =
    useState("");

  const messagesEndRef =
    useRef(null);

  const guideEmail =
    localStorage.getItem(
      "email"
    );

  const touristEmail =
    localStorage.getItem(
      "selectedTourist"
    );

  const room =
    `${touristEmail}-${guideEmail}`;

  useEffect(() => {

    socket.emit(
      "join_room",
      { room }
    );

    fetchMessages();

    socket.on(
      "receive_message",
      (data) => {

        setMessages((prev) => [
          ...prev,
          data
        ]);
      }
    );

    return () => {

      socket.off(
        "receive_message"
      );
    };

  }, []);

  useEffect(() => {

    messagesEndRef.current
      ?.scrollIntoView({
        behavior: "smooth"
      });

  }, [messages]);

  const fetchMessages =
    async () => {

      try {

        const res = await API.get(
          `/messages/${room}`
        );

        setMessages(
          res.data
        );

      } catch (err) {

        console.log(err);
      }
    };

  const sendMessage = () => {

    if (
      message.trim() === ""
    )
      return;

    socket.emit(
      "send_message",
      {
        room,
        sender:
          guideEmail,
        text: message
      }
    );

    setMessage("");
  };

  return (

    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-indigo-950 flex items-center justify-center p-4 overflow-hidden">

      {/* Glow Background */}
      <div className="absolute inset-0 overflow-hidden">

        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500/20 blur-3xl rounded-full"></div>

        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/20 blur-3xl rounded-full"></div>

      </div>

      {/* Chat Container */}
      <div className="relative z-10 w-full max-w-6xl h-[92vh] bg-white/10 backdrop-blur-2xl border border-white/10 rounded-[2rem] overflow-hidden shadow-[0_0_60px_rgba(139,92,246,0.35)] flex flex-col">

        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600/30 to-blue-600/30 border-b border-white/10 p-5 flex items-center justify-between">

          <div className="flex items-center gap-4">

            {/* Avatar */}
            <div className="relative">

              <img
                src="https://i.pravatar.cc/150?img=25"
                alt="Tourist"
                className="w-14 h-14 rounded-2xl object-cover border-2 border-white shadow-xl"
              />

              <div className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-green-400 border-2 border-black animate-pulse"></div>

            </div>

            {/* Info */}
            <div>

              <div className="flex items-center gap-2">

                <h1 className="text-2xl font-black text-white">

                  Tourist Chat

                </h1>

                <ShieldCheck className="w-5 h-5 text-cyan-400" />

              </div>

              <p className="text-sm text-gray-300">

                {touristEmail}

              </p>

            </div>

          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">

            <button className="bg-white/10 hover:bg-white/20 transition p-3 rounded-2xl text-white">

              <Phone className="w-5 h-5" />

            </button>

            <button className="bg-white/10 hover:bg-white/20 transition p-3 rounded-2xl text-white">

              <Video className="w-5 h-5" />

            </button>

            <button className="bg-white/10 hover:bg-white/20 transition p-3 rounded-2xl text-white">

              <MoreVertical className="w-5 h-5" />

            </button>

          </div>

        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5">

          {messages.map(
            (msg, index) => {

              const isGuide =
                msg.sender ===
                guideEmail;

              return (

                <div
                  key={index}
                  className={`flex ${
                    isGuide
                    ? "justify-end"
                    : "justify-start"
                  }`}
                >

                  <div
                    className={`max-w-[80%] md:max-w-[60%] rounded-[2rem] px-5 py-4 shadow-xl backdrop-blur-xl border transition-all duration-300 hover:scale-[1.02]
                    ${
                      isGuide

                      ? `
                        bg-gradient-to-r
                        from-purple-600
                        to-blue-600
                        text-white
                        border-purple-400/30
                      `

                      : `
                        bg-white/10
                        text-white
                        border-white/10
                      `
                    }`}
                  >

                    {/* Sender */}
                    <div className="text-xs opacity-70 mb-2">

                      {
                        isGuide

                        ? "You"

                        : "Tourist"
                      }

                    </div>

                    {/* Message */}
                    <p className="leading-relaxed break-words">

                      {msg.text}

                    </p>

                    {/* Footer */}
                    <div className="flex items-center justify-end gap-2 mt-3 text-xs opacity-70">

                      <span>

                        {
                          new Date()
                          .toLocaleTimeString(
                            [],
                            {
                              hour:
                                "2-digit",
                              minute:
                                "2-digit"
                            }
                          )
                        }

                      </span>

                      {isGuide && (

                        <CheckCheck className="w-4 h-4" />

                      )}

                    </div>

                  </div>

                </div>

              );
            }
          )}

          <div ref={messagesEndRef}></div>

        </div>

        {/* Input */}
        <div className="border-t border-white/10 bg-black/10 backdrop-blur-xl p-5">

          <div className="flex items-center gap-4">

            <input
              value={message}
              onChange={(e) =>
                setMessage(
                  e.target.value
                )
              }
              onKeyDown={(e) => {

                if (
                  e.key === "Enter"
                ) {

                  sendMessage();
                }
              }}
              placeholder="Reply to tourist..."
              className="flex-1 bg-white/10 border border-white/10 backdrop-blur-xl rounded-2xl px-6 py-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />

            <button
              onClick={sendMessage}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white p-4 rounded-2xl shadow-lg hover:shadow-purple-500/30 transition-all duration-300 hover:scale-105"
            >

              <Send className="w-5 h-5" />

            </button>

          </div>

        </div>

      </div>

    </div>
  );
}