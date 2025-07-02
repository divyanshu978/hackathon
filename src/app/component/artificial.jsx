'use client';
import { Skeleton } from "@/components/ui/skeleton";
import React, { useState, useRef, useEffect } from "react";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { MicVocal } from 'lucide-react';
import { Mic } from "lucide-react";
import AiResponse from "./AiResponse";

export default function Artificial() {
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState('');
    const textareaRef = useRef(null);
    const [value, setValue] = useState("");

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
        if (text.trim() !== "") {
            console.log("Submitted text:", text);
            setValue(text);
            textareaRef.current.value = "";
            handleInput();
            getResponse(text);
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
            setResponse(data.output);
        } catch (error) {
            console.error('Error fetching response:', error);
            alert('Failed to fetch response. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (

        <>
            <div className="w-full h-screen flex items-center justify-center p-10">



                <div className='w-8/12 flex h-200 border-4 border-red-700/50 flex-col items-center bg-gray-800'>

                    <div className="text-2xl mt-5">
                        {
                            value
                        }
                    </div>


                    <div className='w-full h-full overflow-y-auto bg-gray-800 mt-5 shadow-3xl container rounded-md p-5 text-xl'>
                        {
                            loading ?
                                <Skeleton className="h-[20px] w-[100px] rounded-full" />
                                : <AiResponse text={response} />
                        }
                    </div>
                    <div className=" flex items-center justify-center w-full m-10">
                        <div className="flex items-center justify-center border-2 border-red-500 mx-3 rounded-lg w sm:w-70 md:w-100 lg:w-200">
                            <textarea
                                ref={textareaRef}
                                onInput={handleInput}
                                onKeyDown={handleKeyDown}
                                rows={2}
                                placeholder="Type your message..."
                                style={{
                                    width: "100%",
                                    overflow: "hidden",
                                    resize: "none",
                                    padding: "8px",
                                }}
                            ></textarea>

                            <button onClick={listening ? SpeechRecognition.stopListening : SpeechRecognition.startListening}
                                className="text-xl bg-destructive text-white shadow-xs p-2 mx-4 rounded-2xl hover:bg-destructive/20 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60"
                            >
                                <Mic size={32} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}
