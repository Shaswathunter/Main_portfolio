import React, { useEffect, useRef } from "react";

const HiddenRunner = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const isMobile = window.innerWidth < 768;

    let stickman = {
      x: isMobile ? 80 : 150,
      y: canvas.height - (isMobile ? 100 : 150),
      width: isMobile ? 10 : 16,
      height: isMobile ? 40 : 60,
      vy: 0,
      jumping: false,
      frame: 0,
    };

    const gravity = isMobile ? 0.6 : 0.7;
    const jumpPower = isMobile ? -15 : -18;

    const initialGap = isMobile ? 500 : 700;

    // Start with 1 obstacle for mobile and desktop
    let obstacles = [
      {
        x: canvas.width + initialGap,
        y: canvas.height - (isMobile ? 60 : 80),
        width: isMobile ? 25 : 35,
        height: isMobile ? 40 : 55,
        speed: isMobile ? 3.5 : 5.5,
      },
    ];

    let score = 0;
    let gameOver = false;

    const jump = () => {
      if (gameOver) {
        restart();
      } else if (!stickman.jumping) {
        stickman.vy = jumpPower;
        stickman.jumping = true;
      }
    };

    const drawStickman = () => {
      ctx.lineWidth = isMobile ? 2.5 : 4;
      ctx.strokeStyle = "white";
      ctx.fillStyle = "white";
      ctx.shadowColor = "cyan";
      ctx.shadowBlur = 10;

      const t = stickman.frame / 7;
      const bounce = Math.abs(Math.sin(t)) * 3;

      const bodyX = stickman.x;
      const bodyY = stickman.y - bounce;

      // Body
      ctx.beginPath();
      ctx.moveTo(bodyX, bodyY);
      ctx.lineTo(bodyX, bodyY + stickman.height);
      ctx.stroke();

      // Head
      ctx.beginPath();
      const headRadius = isMobile ? 8 : 10;
      ctx.arc(bodyX, bodyY - headRadius * 1.8, headRadius, 0, Math.PI * 2);
      ctx.fill();

      // Arms
      const armSwing = Math.sin(t) * (isMobile ? 12 : 16);
      ctx.beginPath();
      ctx.moveTo(bodyX, bodyY + (isMobile ? 12 : 18));
      ctx.lineTo(bodyX - armSwing, bodyY + (isMobile ? 26 : 32));
      ctx.moveTo(bodyX, bodyY + (isMobile ? 12 : 18));
      ctx.lineTo(bodyX + armSwing, bodyY + (isMobile ? 26 : 32));
      ctx.stroke();

      // Legs
      const legSwing = Math.sin(t + Math.PI / 2) * (isMobile ? 12 : 16);
      ctx.beginPath();
      ctx.moveTo(bodyX, bodyY + stickman.height);
      ctx.lineTo(bodyX - legSwing, bodyY + stickman.height + (isMobile ? 22 : 26));
      ctx.moveTo(bodyX, bodyY + stickman.height);
      ctx.lineTo(bodyX + legSwing, bodyY + stickman.height + (isMobile ? 22 : 26));
      ctx.stroke();

      stickman.frame++;
      ctx.shadowBlur = 0;
    };

    const drawObstacles = () => {
      obstacles.forEach((ob) => {
        ctx.fillStyle = "#ff2b4f";
        ctx.shadowColor = "#ff2b4f";
        ctx.shadowBlur = 8;
        ctx.fillRect(ob.x, ob.y, ob.width, ob.height);
        ctx.shadowBlur = 0;
      });
    };

    const detectCollision = () => {
      return obstacles.some((ob) => {
        const smLeft = stickman.x - 10;
        const smRight = stickman.x + 10;
        const smTop = stickman.y - 12;
        const smBottom = stickman.y + stickman.height + 15;

        return (
          smRight > ob.x &&
          smLeft < ob.x + ob.width &&
          smBottom > ob.y &&
          smTop < ob.y + ob.height
        );
      });
    };

    const update = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Ground
      ctx.fillStyle = "rgba(0,255,255,0.2)";
      ctx.fillRect(0, canvas.height - 20, canvas.width, 2);

      stickman.y += stickman.vy;
      stickman.vy += gravity;

      if (stickman.y + stickman.height > canvas.height - 20) {
        stickman.y = canvas.height - stickman.height - 20;
        stickman.vy = 0;
        stickman.jumping = false;
      }

      // Move obstacles
      obstacles.forEach((ob, i) => {
        ob.x -= ob.speed;

        if (ob.x + ob.width < 0) {
          // Chance to add a second obstacle for desktop after score 5
          if (!isMobile && score > 5 && Math.random() < 0.3 && obstacles.length < 2) {
            obstacles.push({
              x: canvas.width + 200 + Math.random() * 200,
              y: canvas.height - 80,
              width: 35,
              height: 55,
              speed: ob.speed,
            });
          }

          // Reset current obstacle
          ob.x = canvas.width + 400 + Math.random() * 200;

          // Gradually increase speed
          ob.speed += isMobile ? 0.05 : 0.1;

          score++;
        }
      });

      // Remove second obstacle if far off screen
      if (obstacles.length > 1 && obstacles[1].x + obstacles[1].width < 0) {
        obstacles.splice(1, 1);
      }

      drawStickman();
      drawObstacles();

      // Score
      ctx.font = isMobile ? "14px monospace" : "18px monospace";
      ctx.fillStyle = "white";
      ctx.fillText(`Score: ${score}`, 20, 40);

      if (detectCollision()) {
        gameOver = true;
        cancelAnimationFrame(animationRef.current);

        ctx.font = isMobile ? "22px monospace" : "32px monospace";
        ctx.fillStyle = "red";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("💀 Game Over", canvas.width / 2, canvas.height / 2 - 20);

        ctx.fillStyle = "white";
        ctx.font = isMobile ? "18px monospace" : "24px monospace";
        ctx.fillText(`Score: ${score}`, canvas.width / 2, canvas.height / 2 + 20);
        ctx.font = isMobile ? "14px monospace" : "18px monospace";
        ctx.fillText(
          "Press Space / Enter / Tap to Restart",
          canvas.width / 2,
          canvas.height / 2 + 60
        );
        return;
      }

      animationRef.current = requestAnimationFrame(update);
    };

    const restart = () => {
      cancelAnimationFrame(animationRef.current);
      score = 0;
      gameOver = false;
      obstacles = [
        {
          x: canvas.width + initialGap,
          y: canvas.height - (isMobile ? 60 : 80),
          width: isMobile ? 25 : 35,
          height: isMobile ? 40 : 55,
          speed: isMobile ? 3.5 : 5.5,
        },
      ];
      stickman.y = canvas.height - (isMobile ? 100 : 150);
      stickman.vy = 0;
      stickman.jumping = false;
      stickman.frame = 0;
      update();
    };

    const handleKey = (e) => {
      if (e.code === "Space" || e.code === "Enter") {
        e.preventDefault();
        jump();
      }
    };

    const handleTouch = () => {
      jump();
    };

    window.addEventListener("keydown", handleKey);
    window.addEventListener("touchstart", handleTouch, { passive: true });
    window.addEventListener("click", handleTouch);

    update();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("keydown", handleKey);
      window.removeEventListener("touchstart", handleTouch);
      window.removeEventListener("click", handleTouch);
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: -1,
        width: "100%",
        height: "100%",
        background: "transparent",
        pointerEvents: "none",
      }}
    />
  );
};

export default HiddenRunner;
