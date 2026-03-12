import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getCurrentBrainBuff, BrainBuffData } from '../../../services/brainBuffService';
import { Loader2, AlertCircle, Brain, Lightbulb, CheckCircle2, XCircle, Clock } from 'lucide-react';

interface BrainBuffSectionProps {
    isActive: boolean;
}

export default function BrainBuffSection({ isActive }: BrainBuffSectionProps) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [questionData, setQuestionData] = useState<BrainBuffData | null>(null);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const [timerActive, setTimerActive] = useState(false);
    const [showResult, setShowResult] = useState(false);
    const [timeUp, setTimeUp] = useState(false);
    const [hintRevealed, setHintRevealed] = useState(false);
    const [timeRemaining, setTimeRemaining] = useState(120);

    useEffect(() => {
        if (isActive) {
            fetchQuestion();
        }
    }, [isActive]);

    useEffect(() => {
        if (timerActive && timeRemaining > 0) {
            const timer = setInterval(() => {
                setTimeRemaining(prev => prev - 1);
            }, 1000);
            return () => clearInterval(timer);
        } else if (timeRemaining === 0 && !showResult) {
            handleTimeUp();
        }
    }, [timerActive, timeRemaining, showResult]);

    const fetchQuestion = async () => {
        try {
            setLoading(true);
            const data = await getCurrentBrainBuff();
            setQuestionData(data);
            setHintRevealed(false);

            const savedState = localStorage.getItem(`brainbuff_${data.weekId}`);
            if (savedState) {
                const parsed = JSON.parse(savedState);
                if (parsed.completed) {
                    setSelectedOption(parsed.selected);
                    setIsCorrect(parsed.isCorrect);
                    setShowResult(true);
                    setTimerActive(false);
                } else {
                    setTimerActive(true);
                }
            } else {
                setTimerActive(true);
            }
        } catch {
            setError('Failed to load BrainBuff.');
        } finally {
            setLoading(false);
        }
    };

    const handleOptionSelect = (optionId: string) => {
        if (showResult || timeUp || !questionData) return;

        setTimerActive(false);
        setSelectedOption(optionId);
        const correct = optionId === questionData.correctAnswer;
        setIsCorrect(correct);
        setShowResult(true);

        localStorage.setItem(`brainbuff_${questionData.weekId}`, JSON.stringify({
            completed: true,
            selected: optionId,
            isCorrect: correct
        }));
    };

    const handleTimeUp = () => {
        if (showResult) return;
        setTimeUp(true);
        setTimerActive(false);
        setShowResult(true);
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15, delayChildren: 0.2 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center h-full">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                    <Loader2 className="w-16 h-16 text-cyan-400" />
                </motion.div>
                <p className="text-cyan-200/60 mt-4 text-lg">Summoning the Oracle...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-center p-8">
                <AlertCircle className="w-20 h-20 text-red-400 mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">Oops!</h3>
                <p className="text-cyan-200/60">{error}</p>
                <button
                    onClick={fetchQuestion}
                    className="mt-6 px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-full font-bold hover:shadow-lg hover:shadow-cyan-500/30 transition-all"
                >
                    Try Again
                </button>
            </div>
        );
    }

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isActive ? "visible" : "hidden"}
            className="relative z-10 flex flex-col items-center justify-center h-full px-4 py-8 overflow-y-auto"
        >
            {/* Header */}
            <motion.div variants={itemVariants} className="text-center mb-8">
                <div className="flex items-center justify-center gap-3 mb-4">
                    <Brain className="w-10 h-10 text-cyan-400" />
                    <h2 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                        BRAIN BUFF
                    </h2>
                </div>
                <p className="text-cyan-200/60">Weekly Mathematical Challenge</p>
                <div className="h-1 w-24 mx-auto mt-4 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full" />
            </motion.div>

            {/* Timer */}
            {timerActive && (
                <motion.div 
                    variants={itemVariants}
                    className="flex items-center gap-2 mb-6 px-6 py-3 bg-slate-800/50 rounded-full border border-cyan-500/30"
                >
                    <Clock className="w-5 h-5 text-cyan-400" />
                    <span className={`text-2xl font-mono font-bold ${timeRemaining < 30 ? 'text-red-400' : 'text-cyan-400'}`}>
                        {formatTime(timeRemaining)}
                    </span>
                </motion.div>
            )}

            {/* Question Card */}
            <motion.div
                variants={itemVariants}
                className="w-full max-w-3xl bg-slate-800/40 backdrop-blur-xl rounded-2xl p-6 md:p-8 border border-cyan-500/20 shadow-2xl shadow-cyan-500/10"
            >
                {questionData && (
                    <>
                        {/* Week indicator */}
                        <div className="text-center mb-4">
                            <span className="px-4 py-1 bg-cyan-500/20 text-cyan-400 rounded-full text-sm font-medium">
                                Week {questionData.weekId}
                            </span>
                        </div>

                        {/* Question */}
                        <h3 className="text-xl md:text-2xl font-bold text-white text-center mb-8 leading-relaxed">
                            {questionData.question}
                        </h3>

                        {/* Options */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                            {questionData.options.map((option) => {
                                const isSelected = selectedOption === option.id;
                                const isCorrectOption = option.id === questionData.correctAnswer;
                                
                                let optionStyle = 'border-cyan-500/30 hover:border-cyan-400 hover:bg-cyan-500/10';
                                if (showResult) {
                                    if (isCorrectOption) {
                                        optionStyle = 'border-green-500 bg-green-500/20';
                                    } else if (isSelected && !isCorrect) {
                                        optionStyle = 'border-red-500 bg-red-500/20';
                                    } else {
                                        optionStyle = 'border-slate-600/30 opacity-50';
                                    }
                                }

                                return (
                                    <motion.button
                                        key={option.id}
                                        onClick={() => handleOptionSelect(option.id)}
                                        disabled={showResult}
                                        whileHover={!showResult ? { scale: 1.02 } : {}}
                                        whileTap={!showResult ? { scale: 0.98 } : {}}
                                        className={`relative p-4 rounded-xl border-2 text-left transition-all duration-300 ${optionStyle}`}
                                    >
                                        <span className="text-white font-medium">{option.text}</span>
                                        {showResult && isCorrectOption && (
                                            <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 text-green-400" />
                                        )}
                                        {showResult && isSelected && !isCorrect && (
                                            <XCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 text-red-400" />
                                        )}
                                    </motion.button>
                                );
                            })}
                        </div>

                        {/* Hint */}
                        {!showResult && questionData.hint && (
                            <motion.div variants={itemVariants} className="text-center">
                                {!hintRevealed ? (
                                    <button
                                        onClick={() => setHintRevealed(true)}
                                        className="flex items-center gap-2 mx-auto px-4 py-2 text-cyan-400 hover:text-cyan-300 transition-colors"
                                    >
                                        <Lightbulb className="w-5 h-5" />
                                        <span>Need a hint?</span>
                                    </button>
                                ) : (
                                    <motion.p
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="text-cyan-200/70 italic"
                                    >
                                        💡 {questionData.hint}
                                    </motion.p>
                                )}
                            </motion.div>
                        )}

                        {/* Result */}
                        <AnimatePresence>
                            {showResult && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                    className={`mt-6 p-4 rounded-xl text-center ${
                                        timeUp 
                                            ? 'bg-yellow-500/20 border border-yellow-500/30'
                                            : isCorrect 
                                            ? 'bg-green-500/20 border border-green-500/30' 
                                            : 'bg-red-500/20 border border-red-500/30'
                                    }`}
                                >
                                    {timeUp ? (
                                        <p className="text-yellow-400 font-bold text-lg">⏰ Time's Up!</p>
                                    ) : isCorrect ? (
                                        <p className="text-green-400 font-bold text-lg">🎉 Excellent! You got it right!</p>
                                    ) : (
                                        <p className="text-red-400 font-bold text-lg">❌ Not quite. Keep practicing!</p>
                                    )}
                                    {questionData.explanation && (
                                        <p className="text-cyan-200/70 mt-3 text-sm">
                                            {questionData.explanation}
                                        </p>
                                    )}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </>
                )}
            </motion.div>
        </motion.div>
    );
}
