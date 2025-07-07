'use client';
import { Skeleton } from "@/components/ui/skeleton";
import React, { useState, useRef, useEffect } from "react";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import { Mic } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Artificial() {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState([]);
  const textareaRef = useRef(null);
  const [checkedItems, setCheckedItems] = useState({});
  const [value, setValue] = useState("");
  const [show, setShow] = useState(false);
  const socketRef = useRef(null);
  const [res, setRes] = useState([]);
  //websocket

  // const [messages, setMessages] = useState([]);
  // const [chech, setChech] = useState({});

  useEffect(() => {
    socketRef.current = new WebSocket("ws://localhost:3000");
    socketRef.current.onopen = () => {
      console.log("WebSocket connected");
    }
    socketRef.current.onmessage = (event) => {
      setMessages((prev) => [...prev, event.data]);
    };
    socketRef.current.onclose = () => {
      console.log("WebSocket disconnected");
    };
    return () => {
      socketRef.current.close();
    };
  }, []);




  // Speech recognition
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.value = transcript; // Use state to manage value
      handleInput();
    }
  }, [transcript]);

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  // Auto resize whenever user types
  const handleInput = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = textarea.scrollHeight + "px";
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    const text = textareaRef.current.value;
    if (text.trim() !== "" && socketRef.current) {
      socketRef.current.send(text);
      console.log("Submitted text:", text);
      setValue(text);
      textareaRef.current.value = "";
      handleInput();
      setShow(false)

      getResponse(text);

      console.log(`Response: ${response}`);

    }
  };
  useEffect(() => {
    console.log(`Response: ${response}`);
  }, [response]);
  const getResponse = async (input) => {
    if (!input || input.trim() === "") {
      alert("Please enter text");
      return;
    }
    console.log(`Input: ${input}`);
    setLoading(true);
    try {
      const res = await fetch('/api/Ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: input })
      });
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await res.json();
      const generatedData = data.cleanedText.split('\n').map(item => item.trim()).filter(item => item !== '');
      setResponse(generatedData);
      setCheckedItems({})
    } catch (error) {
      console.error('Error fetching response:', error);
      alert('Failed to fetch response. Please try again.');
    } finally {
      setLoading(false);


    }


  };


  const toggleCheck = (item) => {
    setCheckedItems(prev => ({
      ...prev,
      [item]: !prev[item],
    }));
  };

  const getMissingItems = () => {
     const rest =response.filter(item => !checkedItems[item]);
     return rest
  };


  const handleGenerate = () => {
    setShow(true);
  };

  useEffect(() => {
    setRes(getMissingItems());
  }, );

  const downloadCSV =()=>{
    setRes(getMissingItems());
    console.log(`Response hjvbhjb: ${res}`);
const csvcontent =res.join('\n');
const blob = new Blob([csvcontent], { type: "text/csv" });
 const url = URL.createObjectURL(blob);
 triggerDownload(url, 'data.csv');
  }

  const triggerDownload = (url , filename) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
     URL.revokeObjectURL(url);
  };
  return (
    <>

<div className="w-full flex flex-col items-center justify-center p-10 space-y-8">
  {/* Input Section */}
  <div className="w-full max-w-4xl space-y-4">
    <div className="relative backdrop-blur-lg bg-gray-800/40 border border-gray-600/30 rounded-2xl p-6 shadow-2xl transition-all duration-300 hover:bg-gray-800/60 hover:border-gray-500/50">
      <div className="flex items-center gap-4">
        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            onInput={handleInput}
            onKeyDown={handleKeyDown}
            rows={1}
            placeholder="Type your message or use voice input..."
            className="w-full bg-gray-700/50 backdrop-blur-md text-white placeholder-gray-400 rounded-xl px-4 py-3 text-lg outline-none border border-gray-600/30 focus:border-emerald-400 focus:bg-gray-700/70 transition-all duration-300 resize-none"
            style={{
              overflow: "hidden",
              resize: "none",
            }}
          />
        </div>
        <button
          onClick={
            listening
              ? SpeechRecognition.stopListening
              : SpeechRecognition.startListening
          }
          className={`p-3 rounded-xl transition-all duration-300 transform hover:scale-110 ${listening
            ? 'bg-green-500/80 hover:bg-green-500 text-white animate-pulse'
            : 'bg-emerald-600/70 hover:bg-emerald-500 text-gray-200 hover:text-white'
            } backdrop-blur-sm shadow-lg`}
        >
          <Mic size={32} />
        </button>
      </div>
    </div>
  </div>

  {/* Results Section */}
  <div className="w-full max-w-7xl space-y-6 animate-fadeIn">
    {loading ? (
      <Skeleton className="h-[20px] w-[100px] rounded-full" />
    ) : (
      <>
        <div className="bg-gray-900/30 border border-gray-700/40 p-6 rounded-xl shadow-inner transition-all duration-300 hover:border-gray-500/60">
          <div className="font-semibold mb-3 flex flex-wrap text-lg">
            Ingredients required to cook
            <h1 className="text-emerald-400 font-bold px-2 underline">{value}</h1>
          </div>
          <ul className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {response.map((item) => (
              <li key={item}>
                <label className="flex items-center space-x-2 cursor-pointer p-2 hover:bg-emerald-500/10 hover:text-emerald-300 rounded transition-all duration-200">
                  <input
                    type="checkbox"
                    checked={!!checkedItems[item]}
                    onChange={() => toggleCheck(item)}
                    className="w-5 h-5 accent-emerald-500"
                  />
                  <span
                    className={`${checkedItems[item]
                      ? "line-through text-gray-500"
                      : "text-white"
                      } transition-colors duration-200`}
                  >
                    {item}
                  </span>
                </label>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-gray-900/30 border border-gray-700/40 p-6 rounded-xl shadow-inner transition-all duration-300 hover:border-gray-500/60">
          <h2 className="font-semibold mb-3 text-lg">Items to Buy</h2>
          <ul className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {getMissingItems().length === 0 ? (
              <li className="text-green-400 font-semibold">
                ✅ All items are checked!
              </li>
            ) : (
              getMissingItems().map((item) => (
                <li
                  key={item}
                  className="bg-emerald-500/20 text-emerald-300 p-2 rounded border border-emerald-400/40 transition-all duration-300 hover:bg-emerald-500/30"
                >
                  {item}
                </li>
              ))
            )}
          </ul>
        </div>
      </>
    )}
  </div>

  {/* Updated List Button */}
  <div className="flex flex-col items-center justify-center w-full space-y-4">
   {
    // res ? <Button
    //   onClick={downloadCSV}
    //   className="text-lg bg-gradient-to-r from-emerald-600 to-green-500 hover:from-emerald-500 hover:to-green-400 text-white transition-transform duration-200 hover:scale-105 shadow-lg pointer-events-none opacity-50 cursor-not-allowed"
    // >
    //   download List
    // </Button>
    // :
    <Button
      onClick={downloadCSV}
      className="text-lg bg-gradient-to-r from-emerald-600 to-green-500 hover:from-emerald-500 hover:to-green-400 text-white transition-transform duration-200 hover:scale-105 shadow-lg "
    >
      download List
    </Button>
   }
    
    
    {/* {show && (
      <ul className="grid grid-cols-2 md:grid-cols-4 gap-2 animate-fadeIn">
        {getMissingItems().map((item) => (
          <li
            key={item}
            className="bg-blue-500/30 text-blue-300 p-2 rounded border border-blue-400/40 transition-all duration-300 hover:bg-blue-500/50"
          >
            {item}
          </li>
        ))}
      </ul>
    )} */}
  </div>
</div>


    
    </>
  );
};