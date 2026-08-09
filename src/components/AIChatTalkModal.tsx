import React, { useState, useEffect, useRef } from 'react';
import { 
  X, Sparkles, Send, Mic, MicOff, Volume2, VolumeX, Bot, User, 
  RefreshCw, MessageSquare, Radio, Copy, Check, Info, HelpCircle,
  Zap, Play, Square, Headphones, Code
} from 'lucide-react';
import { ProfileData } from '../types';

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  isSpeaking?: boolean;
}

interface AIChatTalkModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: ProfileData;
}

export const AIChatTalkModal: React.FC<AIChatTalkModalProps> = ({
  isOpen,
  onClose,
  profile
}) => {
  const [activeTab, setActiveTab] = useState<'chat' | 'talk'>('chat');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome-1',
      sender: 'ai',
      text: `Hello! 👋 Welcome to Arjun Singh Ghatang's Official Portal. I am your AI Smart Assistant & Voice Companion. Ask me anything about BBS study notes, economics, CEO office location in Syangja & Kathmandu, or contact information!`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const [inputQuery, setInputQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Voice & Talk Mode States
  const [isListening, setIsListening] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [currentVoice, setCurrentVoice] = useState<'Kore' | 'Zephyr' | 'Puck' | 'Fenrir'>('Zephyr');
  const [autoSpeakAI, setAutoSpeakAI] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  const currentAudioRef = useRef<HTMLAudioElement | null>(null);

  // Auto Scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Cleanup audio & mic on unmount or close
  useEffect(() => {
    if (!isOpen) {
      stopAudio();
      stopListening();
    }
  }, [isOpen]);

  const stopAudio = () => {
    if (currentAudioRef.current) {
      currentAudioRef.current.pause();
      currentAudioRef.current = null;
    }
    window.speechSynthesis?.cancel();
    setIsPlayingAudio(false);
    setMessages(prev => prev.map(m => ({ ...m, isSpeaking: false })));
  };

  // Web Speech Recognition for Voice Input
  const startListening = () => {
    stopAudio();
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert('Speech recognition is not supported in your browser. You can type your message in the chat input.');
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0].transcript)
          .join('');
        setInputQuery(transcript);
      };

      recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (err) {
      console.error('Error starting speech recognition:', err);
      setIsListening(false);
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }
    setIsListening(false);
  };

  // Text-To-Speech (Talk Back function)
  const speakText = async (text: string, msgId?: string) => {
    stopAudio();

    if (msgId) {
      setMessages(prev => prev.map(m => m.id === msgId ? { ...m, isSpeaking: true } : m));
    }
    setIsPlayingAudio(true);

    try {
      // Try Gemini API TTS Endpoint
      const res = await fetch('/api/ai-tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, voice: currentVoice })
      });

      const data = await res.json();

      if (data.success && data.audioBase64) {
        // Decode base64 PCM / audio
        const audio = new Audio(`data:audio/mp3;base64,${data.audioBase64}`);
        currentAudioRef.current = audio;

        audio.onended = () => {
          setIsPlayingAudio(false);
          setMessages(prev => prev.map(m => ({ ...m, isSpeaking: false })));
        };

        audio.onerror = () => {
          fallbackBrowserTTS(text, msgId);
        };

        await audio.play();
        return;
      }
    } catch (e) {
      console.log('Gemini TTS failed, falling back to Browser Web Speech API:', e);
    }

    // Fallback: Browser Web Speech API
    fallbackBrowserTTS(text, msgId);
  };

  const fallbackBrowserTTS = (text: string, msgId?: string) => {
    if (!('speechSynthesis' in window)) {
      setIsPlayingAudio(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    utterance.onend = () => {
      setIsPlayingAudio(false);
      setMessages(prev => prev.map(m => ({ ...m, isSpeaking: false })));
    };

    utterance.onerror = () => {
      setIsPlayingAudio(false);
      setMessages(prev => prev.map(m => ({ ...m, isSpeaking: false })));
    };

    window.speechSynthesis.speak(utterance);
  };

  // Send message handler
  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputQuery).trim();
    if (!query || isLoading) return;

    stopAudio();

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputQuery('');
    setIsLoading(true);

    try {
      // Build conversation history for API
      const history = messages.slice(-8).map(m => ({
        role: m.sender === 'user' ? 'user' : 'model',
        content: m.text
      }));

      const res = await fetch('/api/ai-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: query, history })
      });

      const data = await res.json();
      const replyText = data.reply || "I am here to assist you with Arjun Singh Ghatang's BBS resources, CEO updates, or contact info!";

      const aiMsg: Message = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, aiMsg]);
      setIsLoading(false);

      if (autoSpeakAI || activeTab === 'talk') {
        speakText(replyText, aiMsg.id);
      }
    } catch (error) {
      console.error('Error fetching AI chat reply:', error);
      const fallbackMsg: Message = {
        id: `ai-err-${Date.now()}`,
        sender: 'ai',
        text: `I'm happy to help! You can find Arjun Singh Ghatang's BBS Study Notes, YouTube Video Portal, Office location in Syangja/Kathmandu, and contact options directly on this web portal.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, fallbackMsg]);
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Helper to parse and render formatted message text with code block syntax highlighting & copy buttons
  const renderFormattedText = (text: string, msgId: string) => {
    const codeBlockRegex = /```([a-zA-Z0-9_+-]*)\n?([\s\S]*?)```/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = codeBlockRegex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push({
          type: 'text',
          content: text.substring(lastIndex, match.index)
        });
      }

      const lang = match[1] || 'code';
      const code = match[2].trim();

      parts.push({
        type: 'code',
        lang,
        code
      });

      lastIndex = match.index + match[0].length;
    }

    if (lastIndex < text.length) {
      parts.push({
        type: 'text',
        content: text.substring(lastIndex)
      });
    }

    if (parts.length === 0) {
      return <p className="whitespace-pre-wrap">{text}</p>;
    }

    return (
      <div className="space-y-2.5">
        {parts.map((part, idx) => {
          if (part.type === 'text') {
            return (
              <p key={idx} className="whitespace-pre-wrap leading-relaxed">
                {part.content}
              </p>
            );
          }

          const codeKey = `${msgId}-code-${idx}`;

          return (
            <div key={idx} className="my-2 rounded-2xl border border-slate-700 bg-slate-950 overflow-hidden shadow-xl">
              <div className="bg-slate-900 px-3.5 py-1.5 border-b border-slate-800 flex items-center justify-between text-[11px] font-mono text-indigo-300">
                <span className="font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
                  <Code className="w-3.5 h-3.5 text-amber-400" />
                  {part.lang || 'CODE'}
                </span>
                <button
                  onClick={() => copyToClipboard(part.code, codeKey)}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-[10px] font-extrabold transition cursor-pointer border border-slate-700"
                >
                  {copiedId === codeKey ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span className="text-emerald-400">Copied Code!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3 text-indigo-300" />
                      <span>Copy Code</span>
                    </>
                  )}
                </button>
              </div>
              <pre className="p-3.5 text-xs text-emerald-300 font-mono overflow-x-auto leading-relaxed bg-slate-950 scrollbar-thin scrollbar-thumb-slate-800">
                <code>{part.code}</code>
              </pre>
            </div>
          );
        })}
      </div>
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      
      {/* Container */}
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col h-[90vh] max-h-[700px]">
        
        {/* Header Masthead */}
        <div className="p-4 bg-slate-950 border-b border-slate-800/80 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={profile.profilePicUrl || '/arjun_profile_pic.jpg'}
                alt={profile.name}
                className="w-10 h-10 rounded-2xl object-cover ring-2 ring-amber-400 shadow-lg shrink-0"
              />
              <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 border-2 border-slate-950 rounded-full animate-pulse" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-sm text-white tracking-wide">
                  CEO Portal AI Assistant
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-indigo-500/40 text-[10px] font-black text-indigo-300 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  <span>Gemini 3.6 AI</span>
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Official Smart AI & Voice Companion for <strong className="text-amber-300">{profile.name}</strong>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setAutoSpeakAI(!autoSpeakAI)}
              title={autoSpeakAI ? "Voice Mute" : "Voice Auto-Speak On"}
              className={`p-2 rounded-xl transition ${
                autoSpeakAI 
                  ? 'bg-indigo-600/30 text-indigo-300 border border-indigo-500/50' 
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {autoSpeakAI ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs: Chat vs Voice Talk Mode */}
        <div className="px-4 py-2 bg-slate-900 border-b border-slate-800 flex items-center justify-between gap-2 shrink-0">
          <div className="flex items-center gap-2 bg-slate-950 p-1 rounded-2xl border border-slate-800 w-full sm:w-auto">
            <button
              onClick={() => {
                setActiveTab('chat');
                stopAudio();
              }}
              className={`flex-1 sm:flex-initial px-4 py-1.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer ${
                activeTab === 'chat'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>AI Chat Assistant</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('talk');
                stopAudio();
              }}
              className={`flex-1 sm:flex-initial px-4 py-1.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer ${
                activeTab === 'talk'
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Radio className="w-3.5 h-3.5 text-amber-300" />
              <span>Voice Talk Mode</span>
              {isPlayingAudio && <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />}
            </button>
          </div>

          {/* Voice Character Picker */}
          <div className="hidden sm:flex items-center gap-1.5 text-[11px] text-slate-400">
            <Headphones className="w-3.5 h-3.5 text-indigo-400" />
            <span>Voice:</span>
            <select
              value={currentVoice}
              onChange={(e: any) => setCurrentVoice(e.target.value)}
              className="bg-slate-950 border border-slate-800 text-indigo-300 rounded-lg px-2 py-1 text-xs focus:outline-none focus:border-indigo-500 font-bold"
            >
              <option value="Zephyr">Zephyr (Clear Natural)</option>
              <option value="Kore">Kore (Smooth Female)</option>
              <option value="Puck">Puck (Energetic Male)</option>
              <option value="Fenrir">Fenrir (Deep Executive)</option>
            </select>
          </div>
        </div>

        {/* Tab 1: AI Chat Assistant */}
        {activeTab === 'chat' && (
          <div className="flex-1 flex flex-col min-h-0">
            
            {/* Quick Prompt Chips */}
            <div className="px-4 py-2 bg-slate-950/60 border-b border-slate-800/60 flex items-center gap-2 overflow-x-auto no-scrollbar shrink-0">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider shrink-0 flex items-center gap-1">
                <Zap className="w-3 h-3 text-amber-400" /> Ask / Generate Code:
              </span>
              {[
                "💻 Generate React Component Code",
                "🐍 Write Python Data Script",
                "⚡ Write JavaScript Algorithm",
                "Who is Arjun Singh Ghatang?",
                "BBS 1st to 4th Year Study Notes",
                "CEO Office Location & Syangja Contact"
              ].map((chip, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(chip)}
                  className="px-2.5 py-1 rounded-full bg-slate-800/80 hover:bg-slate-700 text-[11px] text-slate-300 hover:text-white font-medium border border-slate-700/60 whitespace-nowrap transition cursor-pointer"
                >
                  {chip}
                </button>
              ))}
            </div>

            {/* Messages Feed */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex items-start gap-3 ${
                    msg.sender === 'user' ? 'flex-row-reverse' : ''
                  }`}
                >
                  <div className="shrink-0">
                    {msg.sender === 'user' ? (
                      <img
                        src={profile.profilePicUrl || '/arjun_profile_pic.jpg'}
                        alt={profile.name}
                        className="w-8 h-8 rounded-xl object-cover ring-2 ring-amber-400 shrink-0"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-xl bg-indigo-600/30 text-indigo-300 border border-indigo-500/40 flex items-center justify-center text-xs font-bold shrink-0">
                        <Bot className="w-4 h-4" />
                      </div>
                    )}
                  </div>

                  <div className={`max-w-[85%] rounded-2xl p-3.5 text-xs sm:text-sm leading-relaxed space-y-1.5 ${
                    msg.sender === 'user'
                      ? 'bg-indigo-600 text-white rounded-tr-none'
                      : 'bg-slate-950 border border-slate-800 text-slate-200 rounded-tl-none'
                  }`}>
                    <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-1 mb-1">
                      <span className="font-extrabold text-[10px] uppercase opacity-80">
                        {msg.sender === 'user' ? profile.name : 'Arjun AI Companion'}
                      </span>
                      <span className="text-[10px] opacity-60 font-mono">
                        {msg.timestamp}
                      </span>
                    </div>

                    {msg.sender === 'ai' ? (
                      renderFormattedText(msg.text, msg.id)
                    ) : (
                      <p className="whitespace-pre-wrap">{msg.text}</p>
                    )}

                    {msg.sender === 'ai' && (
                      <div className="flex items-center justify-end gap-2 pt-1.5 border-t border-slate-800/80 mt-2">
                        <button
                          onClick={() => speakText(msg.text, msg.id)}
                          className={`p-1 rounded-lg transition ${
                            msg.isSpeaking
                              ? 'bg-emerald-500 text-slate-950 font-bold'
                              : 'text-slate-400 hover:text-emerald-400'
                          }`}
                          title="Speak Aloud"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => copyToClipboard(msg.text, msg.id)}
                          className="p-1 text-slate-400 hover:text-white transition cursor-pointer"
                          title="Copy text"
                        >
                          {copiedId === msg.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-indigo-600/30 text-indigo-300 border border-indigo-500/40 flex items-center justify-center">
                    <Bot className="w-4 h-4 animate-spin" />
                  </div>
                  <div className="px-4 py-3 bg-slate-950 border border-slate-800 rounded-2xl rounded-tl-none text-xs text-indigo-300 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce" />
                    <span className="w-2 h-2 rounded-full bg-purple-400 animate-bounce delay-100" />
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-bounce delay-200" />
                    <span>Gemini AI is thinking...</span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Bar */}
            <div className="p-3 bg-slate-950 border-t border-slate-800 flex items-center gap-2 shrink-0">
              <button
                onClick={isListening ? stopListening : startListening}
                className={`p-2.5 rounded-xl transition flex items-center justify-center shrink-0 cursor-pointer ${
                  isListening
                    ? 'bg-rose-600 text-white animate-pulse'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                }`}
                title={isListening ? "Listening... Click to stop" : "Speak to AI"}
              >
                {isListening ? <MicOff className="w-4 h-4 text-white" /> : <Mic className="w-4 h-4 text-indigo-400" />}
              </button>

              <input
                type="text"
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder={isListening ? "Listening to your voice..." : "Ask AI about BBS study materials, CEO contact, or location..."}
                className="flex-1 bg-slate-900 border border-slate-800 focus:border-indigo-500 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none"
              />

              <button
                onClick={() => handleSendMessage()}
                disabled={!inputQuery.trim() || isLoading}
                className="p-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white rounded-xl transition cursor-pointer shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>

          </div>
        )}

        {/* Tab 2: Voice Talk Mode */}
        {activeTab === 'talk' && (
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center space-y-6 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950">
            
            {/* Animated Voice Orb */}
            <div className="relative my-4">
              <div className={`w-32 h-32 rounded-full flex items-center justify-center transition-all duration-500 ${
                isPlayingAudio
                  ? 'bg-gradient-to-tr from-emerald-500 via-indigo-600 to-purple-600 scale-110 shadow-[0_0_50px_rgba(16,185,129,0.5)] animate-pulse'
                  : isListening
                  ? 'bg-gradient-to-tr from-amber-500 via-rose-600 to-indigo-600 scale-105 shadow-[0_0_40px_rgba(245,158,11,0.5)] animate-ping'
                  : 'bg-slate-800 border-4 border-slate-700/80 shadow-inner'
              }`}>
                <div className="w-24 h-24 rounded-full bg-slate-950 flex flex-col items-center justify-center text-white space-y-1">
                  {isPlayingAudio ? (
                    <Volume2 className="w-10 h-10 text-emerald-400 animate-bounce" />
                  ) : isListening ? (
                    <Mic className="w-10 h-10 text-amber-400 animate-pulse" />
                  ) : (
                    <Bot className="w-10 h-10 text-indigo-400" />
                  )}
                </div>
              </div>

              {/* Ping Ring Effect */}
              {(isPlayingAudio || isListening) && (
                <span className="absolute -inset-4 rounded-full border border-indigo-500/40 animate-ping pointer-events-none" />
              )}
            </div>

            {/* Status Indicator */}
            <div className="space-y-1">
              <h4 className="text-base font-extrabold text-white">
                {isPlayingAudio
                  ? "AI Voice Companion is Speaking..."
                  : isListening
                  ? "Listening to Your Voice..."
                  : "Tap Mic to Start Voice Conversation"}
              </h4>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                {isPlayingAudio
                  ? "Enjoy hands-free AI conversation with Arjun Singh Ghatang's voice companion."
                  : isListening
                  ? "Speak your question about BBS study, CEO contact, or website features."
                  : "Press the microphone button below to talk to the AI system in real-time."}
              </p>
            </div>

            {/* Live Voice Controls */}
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={isListening ? stopListening : startListening}
                className={`px-6 py-3 rounded-2xl text-xs font-black transition shadow-xl flex items-center gap-2 cursor-pointer ${
                  isListening
                    ? 'bg-rose-600 hover:bg-rose-500 text-white'
                    : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white'
                }`}
              >
                {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                <span>{isListening ? "Stop Listening" : "Start Voice Talk"}</span>
              </button>

              {isPlayingAudio && (
                <button
                  onClick={stopAudio}
                  className="px-4 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
                >
                  <Square className="w-4 h-4 text-rose-400" />
                  <span>Stop Speech</span>
                </button>
              )}
            </div>

            {/* Voice Transcriptions Feed Sample */}
            <div className="w-full max-w-md bg-slate-950 p-3.5 rounded-2xl border border-slate-800/80 text-left space-y-2 mt-2">
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Latest AI Speech Output:</span>
              <p className="text-xs text-slate-300 font-medium italic line-clamp-3">
                "{messages.filter(m => m.sender === 'ai').slice(-1)[0]?.text || "Hello! Press Start Voice Talk to ask questions or listen to AI updates!"}"
              </p>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
