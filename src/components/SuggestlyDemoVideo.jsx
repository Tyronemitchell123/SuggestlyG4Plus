import React, { useRef, useEffect, useState } from 'react';

const SuggestlyDemoVideo = ({ onVideoReady, autoPlay = true }) => {
  const canvasRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration] = useState(30); // 30 seconds

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = 1280;
    canvas.height = 720;

    let startTime = Date.now();
    let animationId;

    // Demo content and animations
    const demoContent = [
      {
        time: 0,
        duration: 3,
        type: 'intro',
        title: 'SUGGESTLY ELITE',
        subtitle: 'Quantum AI Platform',
        color: '#ffd700',
      },
      {
        time: 3,
        duration: 4,
        type: 'feature',
        title: 'AI-Powered Content Generation',
        description: 'Advanced neural networks create compelling content',
        icon: '🧠',
        color: '#3b82f6',
      },
      {
        time: 7,
        duration: 4,
        type: 'feature',
        title: 'Quantum Computing Integration',
        description: 'Exponential processing power for complex tasks',
        icon: '⚛️',
        color: '#10b981',
      },
      {
        time: 11,
        duration: 4,
        type: 'feature',
        title: 'Automated Workflow Management',
        description: 'Streamline operations with intelligent automation',
        icon: '🤖',
        color: '#f59e0b',
      },
      {
        time: 15,
        duration: 4,
        type: 'feature',
        title: 'Real-time Analytics Dashboard',
        description: 'Monitor performance with live insights',
        icon: '📊',
        color: '#8b5cf6',
      },
      {
        time: 19,
        duration: 4,
        type: 'feature',
        title: 'Enterprise Security',
        description: 'Bank-grade security for Fortune 500 companies',
        icon: '🔒',
        color: '#ef4444',
      },
      {
        time: 23,
        duration: 4,
        type: 'feature',
        title: 'Advanced Payment Processing',
        description: 'Seamless transactions with multiple payment methods',
        icon: '💳',
        color: '#06b6d4',
      },
      {
        time: 27,
        duration: 3,
        type: 'outro',
        title: 'Ready to Transform Your Business?',
        subtitle: 'Join the Elite',
        color: '#ffd700',
      },
    ];

    // Animation functions
    const easeInOut = t => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);

    const drawBackground = time => {
      // Animated gradient background
      try {
        const gradient = ctx.createLinearGradient(
          0,
          0,
          canvas.width,
          canvas.height
        );
        if (gradient && typeof gradient.addColorStop === 'function') {
          const hue = (time * 0.1) % 360;
          gradient.addColorStop(0, `hsl(${hue}, 70%, 5%)`);
          gradient.addColorStop(0.5, `hsl(${hue + 30}, 60%, 8%)`);
          gradient.addColorStop(1, `hsl(${hue + 60}, 70%, 5%)`);
          ctx.fillStyle = gradient;
        } else {
          // Fallback to solid color if gradient creation fails
          ctx.fillStyle = '#0a0a0a';
        }
      } catch (error) {
        console.warn('Gradient creation failed, using fallback color:', error);
        ctx.fillStyle = '#0a0a0a';
      }
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Animated particles
      for (let i = 0; i < 50; i++) {
        const x = ((time * 50 + i * 100) % (canvas.width + 100)) - 50;
        const y = ((time * 30 + i * 70) % (canvas.height + 100)) - 50;
        const size = Math.sin(time + i) * 2 + 3;
        const opacity = Math.sin(time * 0.5 + i) * 0.3 + 0.1;

        ctx.fillStyle = `rgba(255, 215, 0, ${opacity})`;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const drawIntro = (content, progress) => {
      try {
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;

        // Main title
        ctx.font = 'bold 72px Arial, sans-serif';
        ctx.fillStyle = content.color;
        ctx.textAlign = 'center';
        ctx.globalAlpha = easeInOut(progress);
        ctx.fillText(content.title, centerX, centerY - 50);

        // Subtitle
        ctx.font = '36px Arial, sans-serif';
        ctx.fillStyle = '#ffffff';
        ctx.globalAlpha = easeInOut(Math.max(0, (progress - 0.3) / 0.7));
        ctx.fillText(content.subtitle, centerX, centerY + 50);

        // Animated border
        ctx.strokeStyle = content.color;
        ctx.lineWidth = 4;
        ctx.globalAlpha = 0.8;
        ctx.beginPath();
        ctx.rect(100, 100, canvas.width - 200, canvas.height - 200);
        ctx.stroke();

        ctx.globalAlpha = 1;
      } catch (error) {
        console.warn('Draw intro error:', error);
      }
    };

    const drawFeature = (content, progress) => {
      try {
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;

        // Background card
        const cardWidth = 600;
        const cardHeight = 300;
        const cardX = centerX - cardWidth / 2;
        const cardY = centerY - cardHeight / 2;

        ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
        ctx.strokeStyle = content.color;
        ctx.lineWidth = 2;
        ctx.globalAlpha = easeInOut(progress);
        ctx.fillRect(cardX, cardY, cardWidth, cardHeight);
        ctx.strokeRect(cardX, cardY, cardWidth, cardHeight);

        // Icon
        ctx.font = '64px Arial, sans-serif';
        ctx.fillStyle = content.color;
        ctx.textAlign = 'center';
        ctx.globalAlpha = easeInOut(Math.max(0, (progress - 0.2) / 0.8));
        ctx.fillText(content.icon, centerX, centerY - 80);

        // Title
        ctx.font = 'bold 32px Arial, sans-serif';
        ctx.fillStyle = '#ffffff';
        ctx.globalAlpha = easeInOut(Math.max(0, (progress - 0.4) / 0.6));
        ctx.fillText(content.title, centerX, centerY);

        // Description
        ctx.font = '18px Arial, sans-serif';
        ctx.fillStyle = '#a0a0a0';
        ctx.globalAlpha = easeInOut(Math.max(0, (progress - 0.6) / 0.4));
        ctx.fillText(content.description, centerX, centerY + 40);

        // Progress bar
        const barWidth = 400;
        const barHeight = 6;
        const barX = centerX - barWidth / 2;
        const barY = centerY + 80;

        ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.fillRect(barX, barY, barWidth, barHeight);

        ctx.fillStyle = content.color;
        ctx.fillRect(barX, barY, barWidth * progress, barHeight);

        ctx.globalAlpha = 1;
      } catch (error) {
        console.warn('Draw feature error:', error);
      }
    };

    const drawOutro = (content, progress) => {
      try {
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;

        // Main title
        ctx.font = 'bold 48px Arial, sans-serif';
        ctx.fillStyle = content.color;
        ctx.textAlign = 'center';
        ctx.globalAlpha = easeInOut(progress);
        ctx.fillText(content.title, centerX, centerY - 30);

        // Subtitle
        ctx.font = '24px Arial, sans-serif';
        ctx.fillStyle = '#ffffff';
        ctx.globalAlpha = easeInOut(Math.max(0, (progress - 0.3) / 0.7));
        ctx.fillText(content.subtitle, centerX, centerY + 30);

        // Call to action button
        const buttonWidth = 200;
        const buttonHeight = 50;
        const buttonX = centerX - buttonWidth / 2;
        const buttonY = centerY + 60;

        ctx.fillStyle = content.color;
        ctx.globalAlpha = easeInOut(Math.max(0, (progress - 0.5) / 0.5));
        ctx.fillRect(buttonX, buttonY, buttonWidth, buttonHeight);

        ctx.fillStyle = '#000000';
        ctx.font = 'bold 16px Arial, sans-serif';
        ctx.fillText('Get Started Now', centerX, buttonY + 32);

        ctx.globalAlpha = 1;
      } catch (error) {
        console.warn('Draw outro error:', error);
      }
    };

    const animate = () => {
      try {
        const elapsed = (Date.now() - startTime) / 1000;
        const currentTime = Math.min(elapsed, duration);

        setCurrentTime(currentTime);

        // Find current content
        const currentContent = demoContent.find(
          content =>
            currentTime >= content.time &&
            currentTime < content.time + content.duration
        );

        if (currentContent) {
          const segmentProgress =
            (currentTime - currentContent.time) / currentContent.duration;

          // Draw background
          drawBackground(currentTime);

          // Draw content based on type
          switch (currentContent.type) {
            case 'intro':
              drawIntro(currentContent, segmentProgress);
              break;
            case 'feature':
              drawFeature(currentContent, segmentProgress);
              break;
            case 'outro':
              drawOutro(currentContent, segmentProgress);
              break;
            default:
              // No specific drawing for this type, just draw background
              drawBackground(currentTime);
              break;
          }
        }

        if (currentTime < duration && isPlaying) {
          animationId = requestAnimationFrame(animate);
        } else if (currentTime >= duration) {
          setIsPlaying(false);
          if (onVideoReady) onVideoReady();
        }
      } catch (error) {
        console.error('Animation error:', error);
        // Stop animation on error
        setIsPlaying(false);
      }
    };

    if (autoPlay && isPlaying) {
      animate();
    }

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [isPlaying, autoPlay, duration, onVideoReady]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const restart = () => {
    setCurrentTime(0);
    setIsPlaying(true);
  };

  const formatTime = time => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="suggestly-demo-video">
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: 'auto',
          maxWidth: '1280px',
          border: '2px solid #ffd700',
          borderRadius: '8px',
          backgroundColor: '#000',
        }}
      />

      <div
        className="video-controls"
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '1rem',
          marginTop: '1rem',
          padding: '1rem',
        }}
      >
        <button
          onClick={togglePlay}
          style={{
            background: '#ffd700',
            color: '#000',
            border: 'none',
            padding: '0.5rem 1rem',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 'bold',
          }}
        >
          {isPlaying ? '⏸️ Pause' : '▶️ Play'}
        </button>

        <button
          onClick={restart}
          style={{
            background: '#333',
            color: '#fff',
            border: 'none',
            padding: '0.5rem 1rem',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          🔄 Restart
        </button>

        <span style={{ color: '#fff', fontFamily: 'monospace' }}>
          {formatTime(currentTime)} / {formatTime(duration)}
        </span>
      </div>

      <div
        className="video-info"
        style={{
          textAlign: 'center',
          marginTop: '1rem',
          color: '#a0a0a0',
          fontSize: '0.9rem',
        }}
      >
        <p>🎬 Custom Suggestly Elite Demo Video</p>
        <p>Showcasing AI, Quantum Computing, Automation & Analytics</p>
      </div>
    </div>
  );
};

export default SuggestlyDemoVideo;
