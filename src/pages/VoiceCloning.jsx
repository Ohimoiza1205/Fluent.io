import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../config/supabase';
import Button from '../components/ui/Button';
import Navbar from '../components/ui/Navbar';

const VoiceCloning = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioBlob, setAudioBlob] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [cloningSuccess, setCloningSuccess] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [permissionError, setPermissionError] = useState('');
  const [processingError, setProcessingError] = useState('');

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const timerRef = useRef(null);
  const audioRef = useRef(null);

  const navigate = useNavigate();
  const { user, showNavbar } = useAuth();

  const MAX_RECORDING_TIME = 15;

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const startRecording = async () => {
    try {
      setPermissionError('');
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        setAudioBlob(audioBlob);
        setShowConfirmation(true);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
      setRecordingTime(0);

      timerRef.current = setInterval(() => {
        setRecordingTime(prev => {
          if (prev >= MAX_RECORDING_TIME - 1) {
            stopRecording();
            return MAX_RECORDING_TIME;
          }
          return prev + 1;
        });
      }, 1000);
    } catch (error) {
      console.error('Error accessing microphone:', error);
      setPermissionError('Please allow microphone access to record your voice.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      clearInterval(timerRef.current);
    }
  };

  const playRecording = () => {
    if (audioBlob && audioRef.current) {
      const audioUrl = URL.createObjectURL(audioBlob);
      audioRef.current.src = audioUrl;
      audioRef.current.play();
      setIsPlaying(true);
      audioRef.current.onended = () => {
        setIsPlaying(false);
        URL.revokeObjectURL(audioUrl);
      };
    }
  };

  // ✅ Fixed Function
  const confirmRecording = async () => {
    if (!audioBlob || !user) {
      setProcessingError('Audio recording or user authentication missing');
      return;
    }

    setIsProcessing(true);
    setProcessingError('');

    try {
      const formData = new FormData();
      const audioFile = new File([audioBlob], 'voice-recording.wav', {
        type: audioBlob.type,
      });
      formData.append('audio', audioFile); // lowercase key
      formData.append('name', user.email.split('@')[0] + '-voice'); // give each user a voice name

      const functionUrl = `${import.meta.env.VITE_SUPABASE_FUNCTION_URL}/create-voice`;

      const response = await fetch(functionUrl, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errText = await response.text();
        console.error('Edge Function error response:', errText);
        throw new Error(`Edge Function returned status ${response.status}`);
      }

      const data = await response.json();
      console.log('Voice clone success:', data);
      setCloningSuccess(true);
      setShowConfirmation(false);
    } catch (error) {
      console.error('Error creating voice clone:', error);
      setProcessingError(error.message || 'Failed to process voice recording.');
    } finally {
      setIsProcessing(false);
    }
  };

  const retryRecording = () => {
    setAudioBlob(null);
    setShowConfirmation(false);
    setRecordingTime(0);
    setCloningSuccess(false);
  };

  const formatTime = (seconds) =>
    `${Math.floor(seconds / 60)}:${(seconds % 60).toString().padStart(2, '0')}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {showNavbar && <Navbar />}

      <section className="relative min-h-screen overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-800 to-purple-1000" />
        </div>

        <div className={`absolute ${showNavbar ? 'top-20' : 'top-4'} left-4 z-20`}>
          <Button variant="secondary" onClick={() => navigate('/')} className="text-sm py-2 px-4">
            ← Back to Home
          </Button>
        </div>

        <div className={`relative z-10 flex flex-col items-center justify-center min-h-screen px-4 ${showNavbar ? 'pt-20' : 'pt-4'}`}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full max-w-2xl"
          >
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-8 shadow-2xl text-center">
              {!cloningSuccess ? (
                <>
                  <h1 className="text-4xl font-bold text-gray-900 mb-4">Voice Cloning</h1>
                  <p className="text-gray-600 text-lg mb-6">
                    Record a 15-second sample of your voice to create your personal voice clone.
                  </p>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                    <h3 className="text-lg font-semibold text-blue-900 mb-3">📖 Please read this script:</h3>
                    <p className="text-blue-800 text-base leading-relaxed font-medium">
                      "Hello, this is my voice sample for cloning. I enjoy exploring new technologies and creating amazing experiences. 
                      The quick brown fox jumps over the lazy dog while numbers like one, two, three, and phrases with various sounds help create a comprehensive voice profile."
                    </p>
                    <p className="text-blue-600 text-sm mt-3">
                      💡 Speak clearly and naturally at your normal pace.
                    </p>
                  </div>

                  {!showConfirmation && (
                    <div className="space-y-8">
                      <div className="text-center">
                        <span className="text-3xl font-bold text-gray-700">
                          {formatTime(recordingTime)} / {formatTime(MAX_RECORDING_TIME)}
                        </span>
                      </div>

                      <div className="flex justify-center">
                        <div className={`relative w-48 h-48 rounded-full border-8 flex items-center justify-center transition-all duration-300 ${isRecording
                            ? 'border-red-500 bg-red-50 animate-pulse'
                            : 'border-blue-500 bg-blue-50 hover:border-blue-600'
                          }`}>
                          <div className={`w-20 h-20 rounded-full transition-all duration-300 ${isRecording ? 'bg-red-500' : 'bg-blue-500'}`} />
                        </div>
                      </div>

                      <div className="space-y-4">
                        {!isRecording ? (
                          <Button variant="primary" onClick={startRecording} className="text-xl py-4 px-8">
                            Start Recording
                          </Button>
                        ) : (
                          <Button variant="secondary" onClick={stopRecording} className="text-xl py-4 px-8">
                            Stop Recording
                          </Button>
                        )}

                        {permissionError && (
                          <p className="text-red-600">{permissionError}</p>
                        )}
                      </div>
                    </div>
                  )}

                  {showConfirmation && (
                    <div className="space-y-8">
                      <h2 className="text-2xl font-bold text-gray-900 mb-4">Recording Complete!</h2>
                      <p className="text-gray-600">Listen to your recording and confirm if you're happy with it.</p>
                      <Button variant="secondary" onClick={playRecording} disabled={isPlaying} className="text-lg py-3 px-6">
                        {isPlaying ? '▶️ Playing...' : '▶️ Play Recording'}
                      </Button>

                      <div className="flex gap-4 justify-center">
                        <Button variant="primary" onClick={confirmRecording} disabled={isProcessing} className="py-3 px-6">
                          {isProcessing ? 'Processing...' : 'Use This Recording'}
                        </Button>
                        <Button variant="secondary" onClick={retryRecording} disabled={isProcessing} className="py-3 px-6">
                          Record Again
                        </Button>
                      </div>

                      {processingError && (
                        <p className="text-red-600">{processingError}</p>
                      )}
                    </div>
                  )}
                </>
              ) : (
                <div className="space-y-8">
                  <div className="text-6xl">🎉</div>
                  <h2 className="text-3xl font-bold text-green-600 mb-4">Voice Cloned Successfully!</h2>
                  <Button variant="primary" onClick={() => navigate('/')} className="py-3 px-6">
                    Return to Home
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
          <audio ref={audioRef} style={{ display: 'none' }} />
        </div>
      </section>
    </div>
  );
};

export default VoiceCloning;
