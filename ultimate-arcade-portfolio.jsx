import React, { useState, useEffect, useCallback } from 'react';

export default function UltimateArcadePortfolio() {
  const [score, setScore] = useState(0);
  const [coins, setCoins] = useState(0);
  const [lives, setLives] = useState(3);
  const [mounted, setMounted] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [achievements, setAchievements] = useState([]);
  const [showAchievement, setShowAchievement] = useState(null);
  const [playerName, setPlayerName] = useState('PLAYER1');
  const [isEditing, setIsEditing] = useState(false);
  const [konamiCode, setKonamiCode] = useState([]);
  const [floatingCoins, setFloatingCoins] = useState([]);
  const [clickCombo, setClickCombo] = useState(0);
  const [lastClickTime, setLastClickTime] = useState(0);
  const [comboTimeout, setComboTimeout] = useState(null);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [highScores, setHighScores] = useState([
    { name: 'DEVELOPER', score: 999999 },
    { name: 'DESIGNER', score: 888888 },
    { name: 'CODER', score: 777777 },
  ]);
  const [skillPoints, setSkillPoints] = useState(0);
  const [miniGameActive, setMiniGameActive] = useState(false);
  const [miniGameScore, setMiniGameScore] = useState(0);
  const [targets, setTargets] = useState([]);

  const projects = [
    {
      title: 'PROJECT NEON',
      description: 'Vibrant design system for modern apps',
      difficulty: 'HARD',
      xp: 5000,
      color: 'bg-pink-500',
      icon: '🎯',
      unlocked: true,
      completed: false,
      tech: ['React', 'Figma', 'TypeScript'],
      year: '2024'
    },
    {
      title: 'BLOCK PARTY',
      description: 'E-commerce platform with 10k+ users',
      difficulty: 'MEDIUM',
      xp: 3500,
      color: 'bg-blue-500',
      icon: '🛒',
      unlocked: true,
      completed: false,
      tech: ['Next.js', 'Stripe', 'MongoDB'],
      year: '2023'
    },
    {
      title: 'PIXEL PERFECT',
      description: 'Award-winning studio showcase',
      difficulty: 'HARD',
      xp: 4500,
      color: 'bg-yellow-400',
      icon: '🎨',
      unlocked: coins >= 10,
      completed: false,
      tech: ['Three.js', 'GSAP', 'Webflow'],
      year: '2024'
    },
    {
      title: 'COLOR BURST',
      description: 'Interactive art installation',
      difficulty: 'EXPERT',
      xp: 7000,
      color: 'bg-purple-500',
      icon: '💥',
      unlocked: coins >= 25,
      completed: false,
      tech: ['Canvas', 'WebGL', 'P5.js'],
      year: '2023'
    },
    {
      title: 'CRYPTO DASH',
      description: 'Real-time crypto tracker',
      difficulty: 'MEDIUM',
      xp: 4000,
      color: 'bg-green-400',
      icon: '📈',
      unlocked: coins >= 50,
      completed: false,
      tech: ['Vue.js', 'WebSocket', 'Chart.js'],
      year: '2024'
    },
    {
      title: 'AI PLAYGROUND',
      description: 'Machine learning experiments',
      difficulty: 'EXPERT',
      xp: 8000,
      color: 'bg-orange-500',
      icon: '🤖',
      unlocked: coins >= 75,
      completed: false,
      tech: ['Python', 'TensorFlow', 'FastAPI'],
      year: '2024'
    },
  ];

  const [projectStates, setProjectStates] = useState(projects);

  const skills = [
    { name: 'REACT', level: 95, maxLevel: 100, color: 'bg-blue-500', icon: '⚛️', xp: 9500 },
    { name: 'NEXT.JS', level: 90, maxLevel: 100, color: 'bg-pink-500', icon: '▲', xp: 9000 },
    { name: 'TYPESCRIPT', level: 88, maxLevel: 100, color: 'bg-yellow-400', icon: '📘', xp: 8800 },
    { name: 'TAILWIND', level: 92, maxLevel: 100, color: 'bg-green-400', icon: '🎨', xp: 9200 },
    { name: 'NODE.JS', level: 85, maxLevel: 100, color: 'bg-purple-500', icon: '🟢', xp: 8500 },
    { name: 'DESIGN', level: 93, maxLevel: 100, color: 'bg-orange-500', icon: '✨', xp: 9300 },
  ];

  const [skillLevels, setSkillLevels] = useState(skills);

  const testimonials = [
    {
      text: "BEST DEVELOPER I'VE WORKED WITH. DELIVERED ON TIME AND EXCEEDED EXPECTATIONS!",
      author: "SARAH CHEN",
      role: "CEO, TECHCORP",
      rating: 5,
      icon: "👩‍💼"
    },
    {
      text: "INCREDIBLE DESIGN SKILLS AND CLEAN CODE. A TRUE PROFESSIONAL!",
      author: "MIKE JOHNSON",
      role: "CTO, STARTUPX",
      rating: 5,
      icon: "👨‍💻"
    },
    {
      text: "TRANSFORMED OUR VISION INTO REALITY. HIGHLY RECOMMENDED!",
      author: "LISA PARK",
      role: "FOUNDER, DESIGNCO",
      rating: 5,
      icon: "👩‍🎨"
    },
  ];

  const allAchievements = [
    { id: 'first_coin', name: 'COIN COLLECTOR', desc: 'Collect your first coin', icon: '🪙', threshold: 1 },
    { id: 'ten_coins', name: 'TREASURE HUNTER', desc: 'Collect 10 coins', icon: '💰', threshold: 10 },
    { id: 'fifty_coins', name: 'GOLD RUSH', desc: 'Collect 50 coins', icon: '💎', threshold: 50 },
    { id: 'combo_master', name: 'COMBO MASTER', desc: 'Get a 5x click combo', icon: '🔥', threshold: 5 },
    { id: 'combo_legend', name: 'COMBO LEGEND', desc: 'Reach 20x MAX combo', icon: '⚡', threshold: 20 },
    { id: 'konami', name: 'KONAMI CODE', desc: 'Secret code activated!', icon: '🎮', threshold: 1 },
    { id: 'explorer', name: 'EXPLORER', desc: 'Complete all projects', icon: '🗺️', threshold: 1 },
    { id: 'skill_master', name: 'SKILL MASTER', desc: 'Max out a skill', icon: '🎓', threshold: 1 },
    { id: 'mini_game_pro', name: 'MINI GAME PRO', desc: 'Score 10+ in mini-game', icon: '🏆', threshold: 10 },
  ];

  // Konami Code
  const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

  useEffect(() => {
    setMounted(true);
    
    // Auto-rotate testimonials
    const testimonialInterval = setInterval(() => {
      setCurrentTestimonial(prev => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(testimonialInterval);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      const newCode = [...konamiCode, e.key].slice(-10);
      setKonamiCode(newCode);
      
      if (newCode.join(',') === konamiSequence.join(',')) {
        unlockAchievement('konami');
        setCoins(prev => prev + 50);
        setScore(prev => prev + 10000);
        setSkillPoints(prev => prev + 10);
        setKonamiCode([]);
        playSound('powerup');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [konamiCode]);

  const playSound = (type) => {
    if (!soundEnabled) return;
    // Sound effect placeholder - in real app, play actual sounds
    console.log(`🔊 ${type} sound`);
  };

  const unlockAchievement = (id) => {
    if (!achievements.includes(id)) {
      setAchievements(prev => [...prev, id]);
      const achievement = allAchievements.find(a => a.id === id);
      setShowAchievement(achievement);
      setScore(prev => prev + 1000);
      setSkillPoints(prev => prev + 5);
      playSound('achievement');
      setTimeout(() => setShowAchievement(null), 4000);
    }
  };

  const collectCoin = (e, value = 1) => {
    const now = Date.now();
    
    let newCombo;
    if (now - lastClickTime < 2500) {
      newCombo = Math.min(clickCombo + 1, 20);
    } else {
      newCombo = 1;
    }
    
    setClickCombo(newCombo);
    setLastClickTime(now);
    
    if (comboTimeout) {
      clearTimeout(comboTimeout);
    }
    
    const timeout = setTimeout(() => {
      setClickCombo(0);
    }, 4500);
    setComboTimeout(timeout);
    
    const coinValue = value * newCombo;
    
    const newCoin = {
      id: Date.now(),
      x: e.clientX,
      y: e.clientY,
      value: coinValue,
      combo: newCombo
    };
    
    setFloatingCoins(prev => [...prev, newCoin]);
    setTimeout(() => {
      setFloatingCoins(prev => prev.filter(c => c.id !== newCoin.id));
    }, 1000);
    
    setCoins(prev => prev + coinValue);
    setScore(prev => prev + (coinValue * 100));
    playSound('coin');
    
    // Check achievements
    if (newCombo >= 5 && !achievements.includes('combo_master')) {
      unlockAchievement('combo_master');
    }
    if (newCombo === 20 && !achievements.includes('combo_legend')) {
      unlockAchievement('combo_legend');
    }
    
    const totalCoins = coins + coinValue;
    if (totalCoins >= 1 && !achievements.includes('first_coin')) unlockAchievement('first_coin');
    if (totalCoins >= 10 && !achievements.includes('ten_coins')) unlockAchievement('ten_coins');
    if (totalCoins >= 50 && !achievements.includes('fifty_coins')) unlockAchievement('fifty_coins');
  };

  const startGame = () => {
    setGameStarted(true);
    setScore(100);
    playSound('start');
    collectCoin({ currentTarget: { getBoundingClientRect: () => ({ left: 0, top: 0 }) }, clientX: window.innerWidth / 2, clientY: window.innerHeight / 2 }, 1);
  };

  const completeProject = (index) => {
    if (projectStates[index].unlocked && !projectStates[index].completed) {
      const updatedProjects = [...projectStates];
      updatedProjects[index].completed = true;
      setProjectStates(updatedProjects);
      setScore(prev => prev + projectStates[index].xp);
      setCoins(prev => prev + 10);
      setSkillPoints(prev => prev + 3);
      playSound('complete');
      
      // Check if all projects completed
      if (updatedProjects.every(p => p.completed)) {
        unlockAchievement('explorer');
      }
    }
  };

  const levelUpSkill = (index) => {
    if (skillPoints >= 1 && skillLevels[index].level < skillLevels[index].maxLevel) {
      const updated = [...skillLevels];
      updated[index].level = Math.min(updated[index].level + 1, updated[index].maxLevel);
      updated[index].xp = updated[index].level * 100;
      setSkillLevels(updated);
      setSkillPoints(prev => prev - 1);
      setScore(prev => prev + 500);
      playSound('levelup');
      
      if (updated[index].level === updated[index].maxLevel) {
        unlockAchievement('skill_master');
      }
    }
  };

  const startMiniGame = () => {
    setMiniGameActive(true);
    setMiniGameScore(0);
    setTargets([]);
    playSound('start');
    
    // Spawn targets for 10 seconds
    const spawnInterval = setInterval(() => {
      const newTarget = {
        id: Date.now(),
        x: Math.random() * 80 + 10,
        y: Math.random() * 60 + 20,
      };
      setTargets(prev => [...prev, newTarget]);
      
      // Remove target after 2 seconds
      setTimeout(() => {
        setTargets(prev => prev.filter(t => t.id !== newTarget.id));
      }, 2000);
    }, 800);
    
    setTimeout(() => {
      clearInterval(spawnInterval);
      setTimeout(() => {
        setMiniGameActive(false);
        setTargets([]);
        if (miniGameScore >= 10) {
          unlockAchievement('mini_game_pro');
        }
      }, 2000);
    }, 10000);
  };

  const hitTarget = (targetId, e) => {
    setTargets(prev => prev.filter(t => t.id !== targetId));
    setMiniGameScore(prev => prev + 1);
    setScore(prev => prev + 500);
    setCoins(prev => prev + 2);
    playSound('hit');
    collectCoin(e, 2);
  };

  const saveHighScore = () => {
    const newScores = [...highScores, { name: playerName, score }]
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);
    setHighScores(newScores);
    playSound('achievement');
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden font-mono relative">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
        
        .pixel-font {
          font-family: 'Press Start 2P', monospace;
        }
        
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        
        @keyframes slideDown {
          from { transform: translateY(-100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes pixelPop {
          0% { transform: scale(0); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes floatUp {
          0% { transform: translateY(0) scale(1); opacity: 1; }
          100% { transform: translateY(-100px) scale(1.5); opacity: 0; }
        }
        
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        
        @keyframes slideInRight {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes slideInLeft {
          from { transform: translateX(-100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        
        .animate-blink { animation: blink 1s step-end infinite; }
        .animate-slide-down { animation: slideDown 0.5s ease-out; }
        .animate-pixel-pop { animation: pixelPop 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55); }
        .animate-float { animation: float 3s ease-in-out infinite; }
        .animate-float-up { animation: floatUp 1s ease-out forwards; }
        .animate-pulse { animation: pulse 0.5s ease-in-out; }
        .animate-slide-in-right { animation: slideInRight 0.5s ease-out; }
        .animate-slide-in-left { animation: slideInLeft 0.5s ease-out; }
        .animate-fade-in { animation: fadeIn 0.5s ease-out; }
        .animate-bounce { animation: bounce 2s ease-in-out infinite; }
        
        .pixel-border {
          box-shadow: 
            0 -4px 0 0 currentColor,
            4px 0 0 0 currentColor,
            0 4px 0 0 currentColor,
            -4px 0 0 0 currentColor,
            8px 8px 0 0 rgba(0, 0, 0, 0.9);
        }
        
        .pixel-border-sm {
          box-shadow: 
            0 -2px 0 0 currentColor,
            2px 0 0 0 currentColor,
            0 2px 0 0 currentColor,
            -2px 0 0 0 currentColor,
            4px 4px 0 0 rgba(0, 0, 0, 0.9);
        }
        
        .retro-grid {
          background-image: 
            linear-gradient(rgba(255, 0, 110, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 0, 110, 0.1) 1px, transparent 1px);
          background-size: 20px 20px;
        }
        
        .combo-text {
          text-shadow: 2px 2px 0 rgba(255, 190, 11, 0.5);
        }
        
        .glow {
          box-shadow: 0 0 20px currentColor;
        }
      `}</style>

      {/* Floating Coins */}
      {floatingCoins.map(coin => (
        <div
          key={coin.id}
          className="fixed pointer-events-none z-50 pixel-font text-yellow-400 animate-float-up text-xs"
          style={{ left: coin.x, top: coin.y }}
        >
          +{coin.value} 🪙 {coin.combo > 1 && <span className="text-orange-400">({coin.combo}x)</span>}
        </div>
      ))}

      {/* Achievement Popup */}
      {showAchievement && (
        <div className="fixed top-24 right-4 z-50 bg-yellow-400 text-black p-4 border-4 border-black pixel-border-sm animate-slide-in-right max-w-xs">
          <div className="pixel-font text-xs mb-2">🏆 ACHIEVEMENT!</div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">{showAchievement.icon}</span>
            <div>
              <div className="font-bold text-sm">{showAchievement.name}</div>
              <div className="text-xs opacity-80">{showAchievement.desc}</div>
            </div>
          </div>
        </div>
      )}

      {/* Combo Counter */}
      {clickCombo > 1 && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none z-50">
          <div className={`pixel-font text-4xl md:text-6xl combo-text animate-pulse ${
            clickCombo === 20 ? 'text-orange-500 glow' : 'text-yellow-400'
          }`}>
            {clickCombo}x COMBO! {clickCombo === 20 && <span className="text-red-500">MAX!</span>}
          </div>
        </div>
      )}

      {/* Mini Game Overlay */}
      {miniGameActive && (
        <div className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm flex items-center justify-center">
          <div className="relative w-full h-full max-w-4xl">
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 pixel-font text-yellow-400 text-xl">
              SCORE: {miniGameScore} 🎯
            </div>
            {targets.map(target => (
              <button
                key={target.id}
                onClick={(e) => hitTarget(target.id, e)}
                className="absolute w-16 h-16 bg-pink-500 border-4 border-black pixel-border-sm animate-bounce cursor-crosshair"
                style={{ left: `${target.x}%`, top: `${target.y}%` }}
              >
                🎯
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Retro Grid Background */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-20">
        <div className="retro-grid w-full h-full"></div>
      </div>

      {/* HUD */}
      <div className="fixed top-0 w-full z-50 bg-black/90 backdrop-blur-sm border-b-4 border-pink-500">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center text-xs md:text-sm flex-wrap gap-2">
          <div className="flex gap-4 items-center">
            <div className="pixel-font text-pink-500">
              {isEditing ? (
                <input
                  type="text"
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value.toUpperCase().slice(0, 8))}
                  onBlur={() => setIsEditing(false)}
                  className="bg-transparent border-b-2 border-pink-500 w-24 outline-none"
                  autoFocus
                />
              ) : (
                <span onClick={() => setIsEditing(true)} className="cursor-pointer hover:text-pink-300">
                  {playerName}
                </span>
              )}
            </div>
            <div className="pixel-font text-yellow-400">
              {score.toString().padStart(8, '0')}
            </div>
          </div>
          <div className="flex gap-4 items-center">
            <button 
              onClick={(e) => collectCoin(e, 1)}
              className="flex gap-2 items-center hover:scale-110 transition-transform cursor-pointer"
            >
              <span className="text-yellow-400 text-lg animate-float">🪙</span>
              <span className="pixel-font text-yellow-400">x{coins}</span>
            </button>
            <div className="flex gap-2 items-center text-purple-400">
              <span>⭐</span>
              <span className="pixel-font">SP:{skillPoints}</span>
            </div>
            <div className="pixel-font text-green-400">LV.{currentLevel}</div>
            <button 
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={`text-lg ${soundEnabled ? 'text-green-400' : 'text-gray-600'}`}
            >
              {soundEnabled ? '🔊' : '🔇'}
            </button>
            <div className="flex gap-1">
              {[...Array(3)].map((_, i) => (
                <span 
                  key={i} 
                  className={`text-lg transition-all ${i < lives ? 'text-pink-500 animate-pulse' : 'opacity-20'}`}
                >
                  ❤️
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* INSERT COIN Screen */}
      {!gameStarted && (
        <div className="fixed inset-0 z-40 bg-black flex items-center justify-center animate-slide-down">
          <div className="text-center">
            <h1 className="pixel-font text-4xl md:text-6xl text-pink-500 mb-8 animate-blink">
              INSERT COIN
            </h1>
            <div className="text-yellow-400 pixel-font text-lg mb-8 animate-bounce">
              ▼ ▼ ▼
            </div>
            <button
              onClick={startGame}
              className="bg-yellow-400 text-black px-12 py-6 pixel-font text-sm border-4 border-black pixel-border hover:translate-x-2 hover:translate-y-2 transition-all duration-300 mb-8"
            >
              PRESS START
            </button>
            <div className="mt-8 text-gray-500 text-xs pixel-font max-w-md mx-auto leading-relaxed">
              CLICK ANYWHERE TO COLLECT COINS! <br/>
              BUILD COMBOS FOR BONUS MULTIPLIERS!<br/>
              UNLOCK ACHIEVEMENTS & COMPLETE QUESTS!
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-4 pt-20 relative">
        <div className="max-w-7xl w-full text-center">
          <div className="mb-12">
            <button
              onClick={() => {
                setCurrentLevel(prev => prev + 1);
                setScore(prev => prev + 1000);
                setCoins(prev => prev + 3);
                playSound('levelup');
              }}
              className="inline-block bg-yellow-400 text-black px-6 py-2 pixel-font text-xs mb-6 animate-pixel-pop hover:scale-105 transition-transform cursor-pointer border-2 border-black"
            >
              ★ LEVEL UP! ★
            </button>
          </div>
          
          <h1 className="pixel-font text-3xl md:text-6xl lg:text-7xl mb-8 leading-relaxed">
            <div className="text-pink-500 mb-4 animate-pixel-pop">CREATIVE</div>
            <div className="text-blue-500 mb-4 animate-pixel-pop">DEVELOPER</div>
            <div className="text-yellow-400 animate-pixel-pop">&amp; DESIGNER</div>
          </h1>
          
          <p className="text-base md:text-xl text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed">
            Building epic digital experiences with retro vibes and modern tech 🎮
          </p>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {[
              { label: 'PROJECTS', value: projectStates.filter(p => p.completed).length + '+', color: 'text-pink-500 border-pink-500', icon: '🎮' },
              { label: 'CLIENTS', value: '25+', color: 'text-blue-500 border-blue-500', icon: '👥' },
              { label: 'AWARDS', value: achievements.length, color: 'text-yellow-400 border-yellow-400', icon: '🏆' },
              { label: 'LEVEL', value: currentLevel, color: 'text-green-400 border-green-400', icon: '⭐' },
            ].map((stat, i) => (
              <button
                key={i}
                onClick={(e) => collectCoin(e, 2)}
                className={`${stat.color} border-4 p-6 pixel-border hover:translate-x-2 hover:translate-y-2 transition-all duration-200 cursor-pointer bg-black animate-float`}
                style={{ animationDelay: `${i * 0.2}s` }}
              >
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="pixel-font text-2xl md:text-3xl mb-2">{stat.value}</div>
                <div className="text-xs pixel-font opacity-80">{stat.label}</div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Skill Progression */}
      <section className="min-h-screen flex items-center justify-center px-4 py-20 bg-gradient-to-b from-black via-purple-950/20 to-black">
        <div className="max-w-7xl w-full">
          <div className="text-center mb-16">
            <div className="inline-block bg-purple-500 text-black px-6 py-3 pixel-font text-sm mb-4">
              ⚡ SKILL TREE - SPEND {skillPoints} SP ⚡
            </div>
            <h2 className="pixel-font text-4xl md:text-6xl text-purple-500 mb-4">
              ABILITIES
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillLevels.map((skill, i) => (
              <div
                key={skill.name}
                className={`bg-black border-4 ${skill.color} border-current p-6 pixel-border-sm hover:translate-x-1 hover:translate-y-1 transition-all duration-200 animate-pixel-pop`}
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="pixel-font text-xs">{skill.name}</span>
                  <span className="text-2xl">{skill.icon}</span>
                </div>
                
                {/* XP Bar */}
                <div className="relative h-6 bg-gray-800 border-2 border-current mb-3">
                  <div 
                    className={`absolute inset-0 ${skill.color} transition-all duration-1000`}
                    style={{ width: `${skill.level}%` }}
                  ></div>
                  <div className="absolute inset-0 flex items-center justify-center pixel-font text-xs text-white mix-blend-difference">
                    {skill.level}/{skill.maxLevel}
                  </div>
                </div>
                
                <button
                  onClick={() => levelUpSkill(i)}
                  disabled={skillPoints < 1 || skill.level >= skill.maxLevel}
                  className={`w-full py-2 pixel-font text-xs border-2 border-current transition-all ${
                    skillPoints >= 1 && skill.level < skill.maxLevel
                      ? 'bg-white text-black hover:bg-black hover:text-white cursor-pointer'
                      : 'opacity-50 cursor-not-allowed'
                  }`}
                >
                  {skill.level >= skill.maxLevel ? 'MAXED OUT!' : 'UPGRADE (1 SP)'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Portfolio */}
      <section className="min-h-screen flex items-center justify-center px-4 py-20">
        <div className="max-w-7xl w-full">
          <div className="text-center mb-16">
            <div className="inline-block bg-green-400 text-black px-6 py-3 pixel-font text-sm mb-4">
              🏆 PROJECT SHOWCASE 🏆
            </div>
            <h2 className="pixel-font text-4xl md:text-6xl text-green-400">
              MY WORK
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projectStates.map((project, i) => (
              <button
                key={i}
                onClick={() => completeProject(i)}
                disabled={!project.unlocked}
                className={`${project.unlocked ? project.color : 'bg-gray-700'} p-6 border-8 border-black pixel-border hover:translate-x-2 hover:translate-y-2 transition-all duration-300 cursor-pointer text-left relative ${
                  project.completed ? 'opacity-75' : ''
                } ${!project.unlocked ? 'cursor-not-allowed' : ''}`}
              >
                {project.completed && (
                  <div className="absolute top-4 right-4 text-4xl animate-pulse">✅</div>
                )}
                {!project.unlocked && (
                  <div className="absolute inset-0 bg-black/80 flex items-center justify-center border-8 border-black">
                    <div className="text-center">
                      <div className="text-6xl mb-4">🔒</div>
                      <div className="pixel-font text-xs text-white">
                        {project.title === 'PIXEL PERFECT' && 'NEED 10 COINS'}
                        {project.title === 'COLOR BURST' && 'NEED 25 COINS'}
                        {project.title === 'CRYPTO DASH' && 'NEED 50 COINS'}
                        {project.title === 'AI PLAYGROUND' && 'NEED 75 COINS'}
                      </div>
                    </div>
                  </div>
                )}
                <div className="text-black">
                  <div className="flex items-start justify-between mb-3">
                    <div className="text-4xl">{project.icon}</div>
                    <div className="bg-black text-white px-2 py-1 pixel-font text-xs">
                      {project.year}
                    </div>
                  </div>
                  
                  <h3 className="pixel-font text-lg mb-2 leading-relaxed">
                    {project.title}
                  </h3>
                  
                  <p className="font-bold text-xs mb-3 opacity-90">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-1 mb-3">
                    {project.tech.map((tech, idx) => (
                      <span key={idx} className="bg-black/20 px-2 py-1 text-xs font-bold">
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="bg-black text-yellow-400 px-3 py-1 pixel-font text-xs">
                      +{project.xp} XP
                    </div>
                    <div className="bg-black text-white px-2 py-1 pixel-font text-xs">
                      {project.difficulty}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Carousel */}
      <section className="min-h-screen flex items-center justify-center px-4 py-20 bg-gradient-to-b from-black via-blue-950/20 to-black">
        <div className="max-w-4xl w-full">
          <div className="text-center mb-16">
            <div className="inline-block bg-blue-500 text-black px-6 py-3 pixel-font text-sm mb-4">
              💬 CLIENT REVIEWS 💬
            </div>
            <h2 className="pixel-font text-4xl md:text-6xl text-blue-500">
              FEEDBACK
            </h2>
          </div>

          <div className="bg-blue-500 p-8 md:p-12 border-8 border-black pixel-border animate-fade-in">
            <div className="text-black">
              <div className="text-6xl mb-6 text-center">{testimonials[currentTestimonial].icon}</div>
              <div className="mb-6 flex justify-center gap-1">
                {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                  <span key={i} className="text-2xl text-yellow-400">⭐</span>
                ))}
              </div>
              <p className="text-lg md:text-xl font-bold mb-6 text-center leading-relaxed">
                "{testimonials[currentTestimonial].text}"
              </p>
              <div className="text-center">
                <div className="pixel-font text-sm mb-1">{testimonials[currentTestimonial].author}</div>
                <div className="text-sm opacity-80">{testimonials[currentTestimonial].role}</div>
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-3 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentTestimonial(i)}
                className={`w-4 h-4 border-2 border-blue-500 transition-all ${
                  i === currentTestimonial ? 'bg-blue-500' : 'bg-transparent'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Gallery */}
      <section className="min-h-screen flex items-center justify-center px-4 py-20">
        <div className="max-w-7xl w-full">
          <div className="text-center mb-16">
            <div className="inline-block bg-yellow-400 text-black px-6 py-3 pixel-font text-sm mb-4">
              🏆 ACHIEVEMENTS {achievements.length}/{allAchievements.length} 🏆
            </div>
            <h2 className="pixel-font text-4xl md:text-6xl text-yellow-400">
              TROPHIES
            </h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {allAchievements.map((achievement) => {
              const unlocked = achievements.includes(achievement.id);
              return (
                <div
                  key={achievement.id}
                  className={`border-4 p-6 pixel-border-sm transition-all ${
                    unlocked 
                      ? 'bg-yellow-400 text-black border-yellow-400 animate-pixel-pop' 
                      : 'bg-gray-900 text-gray-600 border-gray-600'
                  }`}
                >
                  <div className="text-4xl mb-3 text-center">{unlocked ? achievement.icon : '🔒'}</div>
                  <div className="pixel-font text-xs mb-2 text-center">{achievement.name}</div>
                  <div className="text-xs opacity-80 text-center">{achievement.desc}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* High Scores */}
      <section className="min-h-screen flex items-center justify-center px-4 py-20 bg-gradient-to-b from-black via-purple-950/20 to-black">
        <div className="max-w-3xl w-full">
          <div className="text-center mb-16">
            <div className="inline-block bg-purple-500 text-black px-6 py-3 pixel-font text-sm mb-4">
              👑 HALL OF FAME 👑
            </div>
            <h2 className="pixel-font text-4xl md:text-6xl text-purple-500 mb-8">
              TOP SCORES
            </h2>
          </div>

          <div className="bg-black border-4 border-purple-500 pixel-border p-8">
            {highScores.map((entry, i) => (
              <div
                key={i}
                className={`flex justify-between items-center py-4 border-b-2 ${
                  i === highScores.length - 1 ? 'border-transparent' : 'border-purple-500/30'
                } ${entry.name === playerName ? 'text-yellow-400' : 'text-white'}`}
              >
                <div className="flex items-center gap-4">
                  <span className="pixel-font text-2xl">
                    {i === 0 && '🥇'}
                    {i === 1 && '🥈'}
                    {i === 2 && '🥉'}
                    {i > 2 && `${i + 1}.`}
                  </span>
                  <span className="pixel-font text-lg">{entry.name}</span>
                </div>
                <span className="pixel-font text-lg">{entry.score.toString().padStart(8, '0')}</span>
              </div>
            ))}
          </div>

          <button
            onClick={saveHighScore}
            className="w-full mt-6 bg-purple-500 text-black px-8 py-4 pixel-font text-sm border-4 border-black pixel-border hover:translate-x-2 hover:translate-y-2 transition-all duration-300"
          >
            SAVE MY SCORE
          </button>
        </div>
      </section>

      {/* Mini Game Section */}
      <section className="min-h-screen flex items-center justify-center px-4 py-20">
        <div className="max-w-3xl w-full text-center">
          <div className="mb-12">
            <div className="inline-block bg-orange-500 text-black px-6 py-3 pixel-font text-sm mb-4">
              🎯 BONUS GAME 🎯
            </div>
            <h2 className="pixel-font text-4xl md:text-6xl text-orange-500 mb-8">
              TARGET PRACTICE
            </h2>
            <p className="text-gray-400 mb-8">
              Click the targets before they disappear! Score 10+ to unlock achievement!
            </p>
          </div>

          <button
            onClick={startMiniGame}
            disabled={miniGameActive}
            className="bg-orange-500 text-black px-12 py-6 pixel-font text-sm border-4 border-black pixel-border hover:translate-x-2 hover:translate-y-2 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {miniGameActive ? 'GAME IN PROGRESS...' : 'START GAME'}
          </button>

          {!miniGameActive && miniGameScore > 0 && (
            <div className="mt-8 pixel-font text-xl text-yellow-400">
              LAST SCORE: {miniGameScore} 🎯
            </div>
          )}
        </div>
      </section>

      {/* Contact/Boss Battle */}
      <section className="min-h-screen flex items-center justify-center px-4 py-20 bg-gradient-to-b from-black via-red-950/20 to-black">
        <div className="max-w-7xl w-full text-center">
          <div className="mb-12">
            <div className="inline-block bg-red-500 text-white px-6 py-3 pixel-font text-sm mb-4 animate-blink">
              ⚠️ FINAL BOSS ⚠️
            </div>
          </div>
          
          <h2 className="pixel-font text-3xl md:text-6xl mb-8 leading-relaxed">
            <div className="text-orange-500">READY TO</div>
            <div className="text-pink-500">COLLABORATE?</div>
          </h2>
          
          <p className="text-xl text-gray-400 mb-12 pixel-font text-sm">
            LET'S BUILD SOMETHING EPIC TOGETHER
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <button 
              onClick={(e) => {
                collectCoin(e, 5);
                alert('📧 hello@portfolio.dev - Message sent! +5 coins! 🪙');
              }}
              className="bg-pink-500 text-black px-12 py-6 pixel-font text-sm border-4 border-black pixel-border hover:translate-x-2 hover:translate-y-2 transition-all duration-300"
            >
              SEND MESSAGE
            </button>
            <button 
              onClick={(e) => {
                collectCoin(e, 3);
                alert('📄 Downloading resume... +3 coins! 🪙');
              }}
              className="bg-blue-500 text-black px-12 py-6 pixel-font text-sm border-4 border-black pixel-border hover:translate-x-2 hover:translate-y-2 transition-all duration-300"
            >
              DOWNLOAD CV
            </button>
            <button 
              onClick={(e) => {
                collectCoin(e, 2);
                alert('📅 Opening calendar... +2 coins! 🪙');
              }}
              className="bg-green-400 text-black px-12 py-6 pixel-font text-sm border-4 border-black pixel-border hover:translate-x-2 hover:translate-y-2 transition-all duration-300"
            >
              SCHEDULE CALL
            </button>
          </div>

          {/* Social Links */}
          <div className="flex gap-4 justify-center flex-wrap mb-12">
            {[
              { name: 'GH', color: 'bg-yellow-400 border-yellow-400', label: 'GitHub' },
              { name: 'LI', color: 'bg-green-400 border-green-400', label: 'LinkedIn' },
              { name: 'TW', color: 'bg-purple-500 border-purple-500', label: 'Twitter' },
              { name: 'DR', color: 'bg-orange-500 border-orange-500', label: 'Dribbble' },
              { name: 'YT', color: 'bg-red-500 border-red-500', label: 'YouTube' },
              { name: 'IG', color: 'bg-pink-500 border-pink-500', label: 'Instagram' },
            ].map((social, i) => (
              <button
                key={social.name}
                onClick={(e) => {
                  collectCoin(e, 1);
                  alert(`Opening ${social.label}... +1 coin! 🪙`);
                }}
                className={`${social.color} text-black w-16 h-16 flex items-center justify-center pixel-font text-xs border-4 border-current pixel-border-sm hover:translate-x-1 hover:translate-y-1 transition-all duration-200`}
              >
                {social.name}
              </button>
            ))}
          </div>

          {/* Easter Egg Hint */}
          <div className="text-gray-600 text-xs pixel-font">
            💡 SECRET CODE: ↑↑↓↓←→←→BA
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t-4 border-pink-500 py-8 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-500 pixel-font text-xs mb-2">
            GAME OVER - THANKS FOR PLAYING!
          </p>
          <p className="text-gray-600 text-xs mb-4">
            SCORE: {score.toString().padStart(8, '0')} • COINS: {coins} • LEVEL: {currentLevel}
          </p>
          <p className="text-gray-700 text-xs">
            © 2024 ARCADE PORTFOLIO • MADE WITH ❤️ & NEXT.JS
          </p>
        </div>
      </footer>
    </div>
  );
}
