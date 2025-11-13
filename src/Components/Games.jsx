import ticImg from "../assets/tic.png";
import memoryImg from "../assets/memory.png";
import simonImg from "../assets/simon.png";
import whackImg from "../assets/whake.png";
import clickerImg from "../assets/clicker.png";
import quizImg from "../assets/quiz.png";
import snakeImg from "../assets/snake.png";
import pongImg from "../assets/clicker.png";
import minesImg from "../assets/snake.png";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// 🖼️ Corrected image imports (relative paths fixed)

function PortfolioGamesComponent() {
  const games = [
    { id: "tic", title: "Tic Tac Toe", comp: TicTacToe, img: ticImg },
    { id: "memory", title: "Memory Match", comp: MemoryMatch, img: memoryImg },
    { id: "simon", title: "Simon Says", comp: SimonGame, img: simonImg },
    { id: "whack", title: "Whack a Mole", comp: WhackAMole, img: whackImg },
    { id: "clicker", title: "Clicker", comp: Clicker, img: clickerImg },
    { id: "quiz", title: "Mini Quiz", comp: MiniQuiz, img: quizImg },
    { id: "snake", title: "Snake (Canvas)", comp: SnakeGame, img: snakeImg },
    { id: "pong", title: "Pong (Canvas)", comp: PongGame, img: pongImg },
    { id: "mines", title: "Minesweeper", comp: MiniMinesweeper, img: minesImg },
  ];

  const [active, setActive] = useState(null);

  return (
    <div className="p-8 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-3xl shadow-2xl border border-gray-700 overflow-hidden">
      <AnimatePresence mode="wait">
        {!active ? (
          <motion.div
            key="list"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
              🎮 Play 9 Mini Games
            </h2>
            <p className="text-gray-400 text-center max-w-md mx-auto">
              Each of these is a mini React project — click to play instantly!
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              {games.map((g, i) => (
                <motion.div
                  key={g.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="p-4 bg-gray-800 rounded-2xl shadow-lg border border-gray-700 cursor-pointer hover:shadow-purple-500/20 transition flex flex-col items-center"
                  onClick={() => setActive(g.id)}
                >
                  <img
                    src={g.img}
                    alt={g.title}
                    className="w-24 h-24 rounded-lg mb-3 object-cover border border-gray-700"
                  />
                  <h3 className="text-lg font-semibold text-white mb-1">{g.title}</h3>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="game"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center justify-center"
          >
            <button
              onClick={() => setActive(null)}
              className="text-sm text-purple-400 hover:text-purple-300 mb-6 self-start transition"
            >
              ← Back to Games
            </button>

            <div className="w-full max-w-md min-h-[400px] bg-gray-800 rounded-2xl border border-gray-700 shadow-inner flex justify-center items-center p-6">
              <div className="text-center space-y-3 text-white flex flex-col justify-center items-center w-full">
                {React.createElement(games.find((g) => g.id === active).comp)}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ---------- All 9 Game Components ---------- */
// ✅ copy all your existing game components (TicTacToe, MemoryMatch, SimonGame, etc.)
// exactly as they are below this point

/* ✅ (All game components remain the same — don’t change them) */


/* ---------- 1) Tic Tac Toe ---------- */
function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xNext, setXNext] = useState(true);
  const winner = calcWinner(board);

  function handleClick(i) {
    if (board[i] || winner) return;
    const b = [...board];
    b[i] = xNext ? "X" : "O";
    setBoard(b);
    setXNext(!xNext);
  }

  function reset() {
    setBoard(Array(9).fill(null));
    setXNext(true);
  }

  return (
    <div className="flex flex-col items-center">
      <h3 className="text-xl font-semibold mb-3">Tic Tac Toe</h3>
      <div className="grid grid-cols-3 gap-2">
        {board.map((v, i) => (
          <button
            key={i}
            onClick={() => handleClick(i)}
            className="w-16 h-16 text-2xl font-bold bg-gray-100 rounded-lg text-black hover:bg-gray-200 transition"
          >
            {v}
          </button>
        ))}
      </div>
      <p className="mt-3 text-sm">
        {winner ? <strong>Winner: {winner}</strong> : `Next: ${xNext ? "X" : "O"}`}
      </p>
      <button
        className="mt-3 px-4 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        onClick={reset}
      >
        Reset
      </button>
    </div>
  );
}

function calcWinner(b) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let l of lines) {
    const [a, b1, c] = l;
    if (b[a] && b[a] === b[b1] && b[a] === b[c]) return b[a];
  }
  return null;
}

/* ---------- 2) Memory Match ---------- */
function MemoryMatch() {
  const init = () => {
    const vals = [...Array(8).keys()].flatMap((i) => [i, i]);
    return vals
      .sort(() => Math.random() - 0.5)
      .map((v) => ({ val: v, revealed: false, matched: false }));
  };

  const [cards, setCards] = useState(init);
  const [first, setFirst] = useState(null);

  const flip = (i) => {
    if (cards[i].revealed || cards[i].matched) return;
    const c = [...cards];
    c[i].revealed = true;
    setCards(c);
    if (first === null) setFirst(i);
    else {
      if (c[i].val === c[first].val) {
        c[i].matched = c[first].matched = true;
        setCards([...c]);
      } else {
        setTimeout(() => {
          c[i].revealed = c[first].revealed = false;
          setCards([...c]);
        }, 600);
      }
      setFirst(null);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h3 className="text-xl font-semibold mb-3">Memory Match</h3>
      <div className="grid grid-cols-4 gap-2">
        {cards.map((c, i) => (
          <button
            key={i}
            onClick={() => flip(i)}
            className={`w-14 h-14 text-lg font-bold rounded-lg ${
              c.revealed || c.matched
                ? "bg-white text-black"
                : "bg-gray-400 text-gray-400"
            }`}
          >
            {c.revealed || c.matched ? c.val : "?"}
          </button>
        ))}
      </div>
      <button
        onClick={() => {
          setCards(init());
          setFirst(null);
        }}
        className="mt-4 px-4 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Reset
      </button>
    </div>
  );
}

/* ---------- 3) Simon Says ---------- */
function SimonGame() {
  const colors = ["red", "green", "blue", "yellow"];
  const [seq, setSeq] = useState([]);
  const [user, setUser] = useState([]);
  const [active, setActive] = useState(null);
  const [score, setScore] = useState(0);

  const play = (i) => {
    setUser([...user, i]);
    if (seq[user.length] !== i) {
      alert("Wrong! Score: " + score);
      reset();
    } else if (user.length + 1 === seq.length) {
      setScore(score + 1);
      nextRound();
    }
  };

  const nextRound = () => {
    const next = Math.floor(Math.random() * 4);
    const newSeq = [...seq, next];
    setSeq(newSeq);
    setUser([]);
    let i = 0;
    const interval = setInterval(() => {
      setActive(newSeq[i]);
      setTimeout(() => setActive(null), 300);
      i++;
      if (i >= newSeq.length) clearInterval(interval);
    }, 600);
  };

  const reset = () => {
    setSeq([]);
    setUser([]);
    setScore(0);
  };

  return (
    <div className="flex flex-col items-center">
      <h3 className="text-xl font-semibold mb-3">Simon Says</h3>
      <div className="grid grid-cols-2 gap-2">
        {colors.map((c, i) => (
          <button
            key={i}
            onClick={() => play(i)}
            className={`w-20 h-20 rounded-lg ${
              active === i ? `${c}-400` : `${c}-600`
            } transition`}
            style={{
              backgroundColor:
                active === i ? c : `${c}`,
              opacity: active === i ? 0.6 : 1,
            }}
          />
        ))}
      </div>
      <p className="mt-3 text-sm">Score: {score}</p>
      <button
        onClick={nextRound}
        className="mt-2 px-4 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Start
      </button>
    </div>
  );
}

/* ---------- 4) Whack a Mole ---------- */
function WhackAMole() {
  const [holes, setHoles] = useState(Array(9).fill(false));
  const [score, setScore] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const i = Math.floor(Math.random() * 9);
      const h = Array(9).fill(false);
      h[i] = true;
      setHoles(h);
      setTimeout(() => setHoles(Array(9).fill(false)), 600);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const hit = (i) => {
    if (holes[i]) setScore(score + 1);
  };

  return (
    <div className="flex flex-col items-center">
      <h3 className="text-xl font-semibold mb-3">Whack a Mole</h3>
      <div className="grid grid-cols-3 gap-2">
        {holes.map((v, i) => (
          <button
            key={i}
            onClick={() => hit(i)}
            className={`w-16 h-16 rounded-lg ${
              v ? "bg-green-500" : "bg-gray-500"
            }`}
          />
        ))}
      </div>
      <p className="mt-3 text-sm">Score: {score}</p>
    </div>
  );
}

/* ---------- 5) Clicker ---------- */
function Clicker() {
  const [count, setCount] = useState(0);
  return (
    <div className="flex flex-col items-center">
      <h3 className="text-xl font-semibold mb-3">Clicker</h3>
      <p className="text-lg mb-3">Score: {count}</p>
      <button
        onClick={() => setCount(count + 1)}
        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Click Me!
      </button>
    </div>
  );
}

/* ---------- 6) Mini Quiz ---------- */
function MiniQuiz() {
  const q = [
    { q: "2 + 2 = ?", a: "4" },
    { q: "Capital of India?", a: "Delhi" },
  ];
  const [i, setI] = useState(0);
  const [ans, setAns] = useState("");
  const [score, setScore] = useState(0);

  const submit = () => {
    if (ans.toLowerCase() === q[i].a.toLowerCase()) setScore(score + 1);
    setAns("");
    setI(i + 1);
  };

  return (
    <div className="flex flex-col items-center">
      <h3 className="text-xl font-semibold mb-3">Mini Quiz</h3>
      {i < q.length ? (
        <>
          <p className="mb-2">{q[i].q}</p>
          <input
            className="p-1 text-black rounded mb-2"
            value={ans}
            onChange={(e) => setAns(e.target.value)}
          />
          <button
            onClick={submit}
            className="px-4 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Submit
          </button>
        </>
      ) : (
        <p>Score: {score}</p>
      )}
    </div>
  );
}

/* ---------- 7) Snake Game ---------- */
function SnakeGame() {
  const canvasRef = useRef(null);
  const [running, setRunning] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = 300;
    canvas.height = 300;

    let snake = [{ x: 150, y: 150 }];
    let food = { x: 100, y: 100 };
    let dx = 10,
      dy = 0;

    const game = setInterval(() => {
      if (!running) return;
      const head = { x: snake[0].x + dx, y: snake[0].y + dy };
      if (
        head.x < 0 ||
        head.y < 0 ||
        head.x >= canvas.width ||
        head.y >= canvas.height
      ) {
        setRunning(false);
        clearInterval(game);
        alert("Game Over");
      } else {
        snake.unshift(head);
        if (head.x === food.x && head.y === food.y)
          food = {
            x: Math.floor(Math.random() * 30) * 10,
            y: Math.floor(Math.random() * 30) * 10,
          };
        else snake.pop();

        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, 300, 300);
        ctx.fillStyle = "red";
        ctx.fillRect(food.x, food.y, 10, 10);
        ctx.fillStyle = "lime";
        snake.forEach((s) => ctx.fillRect(s.x, s.y, 10, 10));
      }
    }, 100);

    const handleKey = (e) => {
      if (e.key === "ArrowUp" && dy === 0) (dx = 0), (dy = -10);
      if (e.key === "ArrowDown" && dy === 0) (dx = 0), (dy = 10);
      if (e.key === "ArrowLeft" && dx === 0) (dx = -10), (dy = 0);
      if (e.key === "ArrowRight" && dx === 0) (dx = 10), (dy = 0);
    };

    document.addEventListener("keydown", handleKey);
    return () => {
      clearInterval(game);
      document.removeEventListener("keydown", handleKey);
    };
  }, [running]);

  return (
    <div className="flex flex-col items-center">
      <h3 className="text-xl font-semibold mb-3">Snake</h3>
      <canvas ref={canvasRef} className="border border-gray-600 rounded-lg" />
    </div>
  );
}

/* ---------- 8) Pong ---------- */
function PongGame() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = 300;
    canvas.height = 300;
    let ball = { x: 150, y: 150, dx: 2, dy: 2 };
    let paddle = 130;

    const draw = () => {
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, 300, 300);
      ctx.fillStyle = "white";
      ctx.fillRect(ball.x, ball.y, 10, 10);
      ctx.fillRect(paddle, 280, 60, 10);
    };

    const move = () => {
      ball.x += ball.dx;
      ball.y += ball.dy;
      if (ball.x <= 0 || ball.x >= 290) ball.dx *= -1;
      if (ball.y <= 0) ball.dy *= -1;
      if (ball.y >= 270 && ball.x > paddle && ball.x < paddle + 60)
        ball.dy *= -1;
      if (ball.y > 300) {
        ball = { x: 150, y: 150, dx: 2, dy: 2 };
      }
    };

    const loop = setInterval(() => {
      move();
      draw();
    }, 20);

    const handleKey = (e) => {
      if (e.key === "ArrowLeft" && paddle > 0) paddle -= 20;
      if (e.key === "ArrowRight" && paddle < 240) paddle += 20;
    };
    document.addEventListener("keydown", handleKey);

    return () => {
      clearInterval(loop);
      document.removeEventListener("keydown", handleKey);
    };
  }, []);

  return (
    <div className="flex flex-col items-center">
      <h3 className="text-xl font-semibold mb-3">Pong</h3>
      <canvas ref={canvasRef} className="border border-gray-600 rounded-lg" />
    </div>
  );
}

/* ---------- 9) Mini Minesweeper ---------- */
function MiniMinesweeper() {
  const size = 5;
  const mines = 3;
  const [grid, setGrid] = useState([]);

  useEffect(() => {
    const g = Array(size)
      .fill(0)
      .map(() => Array(size).fill(0));
    let m = mines;
    while (m) {
      const x = Math.floor(Math.random() * size);
      const y = Math.floor(Math.random() * size);
      if (g[x][y] === 0) {
        g[x][y] = "💣";
        m--;
      }
    }
    setGrid(g);
  }, []);

  const [revealed, setRevealed] = useState(
    Array(size)
      .fill(0)
      .map(() => Array(size).fill(false))
  );

  const reveal = (x, y) => {
    const r = revealed.map((row) => [...row]);
    r[x][y] = true;
    setRevealed(r);
  };

  return (
    <div className="flex flex-col items-center">
      <h3 className="text-xl font-semibold mb-3">Mini Minesweeper</h3>
      <div className="grid grid-cols-5 gap-1">
        {grid.map((row, i) =>
          row.map((v, j) => (
            <button
              key={i + "-" + j}
              onClick={() => reveal(i, j)}
              className="w-12 h-12 rounded bg-gray-600 text-white"
            >
              {revealed[i][j] ? v : "?"}
            </button>
          ))
        )}
      </div>
    </div>
  );
}

export default PortfolioGamesComponent;
