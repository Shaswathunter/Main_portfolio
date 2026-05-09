import ticImg from "../assets/tic.png";
import memoryImg from "../assets/Memory.png";
import simonImg from "../assets/simon.png";
import whackImg from "../assets/whake.png";
import _2048 from "../assets/2048.png";
import quizImg from "../assets/quiz.png";
import snakeImg from "../assets/snake.png";
import pongImg from "../assets/clicker.png";
import minesImg from "../assets/snake.png";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";

// 🖼️ Corrected image imports (relative paths fixed)

function PortfolioGamesComponent() {
  const games = [
    { id: "tic", title: "Tic Tac Toe", comp: TicTacToe, img: ticImg },
    { id: "memory", title: "Memory Match", comp: MemoryMatch, img: memoryImg },
    { id: "simon", title: "Simon Says", comp: SimonGame, img: simonImg },
    { id: "whack", title: "Whack a Mole", comp: WhackAMole, img: whackImg },
    { id: "2048", title: "2048", comp: Game2048, img: _2048 },
    { id: "quiz", title: "Mini Quiz", comp: MiniQuiz, img: quizImg },
    { id: "snake", title: "Snake (Canvas)", comp: SnakeGame, img: snakeImg },
    { id: "pong", title: "Pong (Canvas)", comp: PongGame, img: pongImg },
    { id: "mines", title: "Minesweeper", comp: MiniMinesweeper, img: minesImg },
  ];

  const [active, setActive] = useState(null);

  return (
    <div
      className="
      w-full
      overflow-hidden
      rounded-3xl
      border
      border-white/10
      bg-gradient-to-br
      from-[#111827]
      via-[#0f172a]
      to-[#111827]
      p-4
      sm:p-6
      lg:p-8
    "
    >
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
                  <h3 className="text-lg font-semibold text-white mb-1">
                    {g.title}
                  </h3>
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
              <div className="text-center space-y-6 text-white flex flex-col justify-center items-center w-full">
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

  const [board, setBoard] =
    useState(Array(9).fill(null));

  const [xNext, setXNext] =
    useState(true);

  const [winningLine, setWinningLine] =
    useState([]);

  const winner =
    calcWinner(board);

  /* ================= HANDLE CLICK ================= */

  function handleClick(i) {

    if (board[i] || winner) return;

    const nextBoard = [...board];

    nextBoard[i] =
      xNext ? "X" : "O";

    setBoard(nextBoard);

    setXNext(!xNext);

    /* win line */

    const result =
      calcWinner(nextBoard, true);

    if (result?.line) {
      setWinningLine(result.line);

      gsap.fromTo(
        ".ttt-board",
        { scale: 1 },
        {
          scale: 1.03,
          duration: 0.18,
          repeat: 1,
          yoyo: true,
        }
      );
    }
  }

  /* ================= RESET ================= */

  function reset() {

    setBoard(
      Array(9).fill(null)
    );

    setXNext(true);

    setWinningLine([]);
  }

  /* ================= DRAW ================= */

  const isDraw =
    !winner &&
    board.every((cell) => cell);

  return (

    <motion.div

      initial={{
        opacity: 0,
        scale: 0.9,
      }}

      animate={{
        opacity: 1,
        scale: 1,
      }}

      transition={{
        duration: 0.4,
      }}

      className="
        relative
        flex
        w-full
        flex-col
        items-center
        justify-center
        px-2
      "
    >

      {/* BACKGROUND GLOW */}

      <div
        className="
          absolute
          inset-0
          -z-10
          rounded-full
          bg-cyan-500/10
          blur-3xl
        "
      />

      {/* TOP */}

      <div className="mb-5 text-center">

        <h3
          className="
            text-2xl
            font-black
            text-cyan-400

            sm:text-3xl
          "
        >
          Tic Tac Toe
        </h3>

        <div
          className="
            mt-3
            rounded-2xl
            border
            border-cyan-400/10
            bg-cyan-500/10
            px-5
            py-2
            backdrop-blur-xl
          "
        >

          <p
            className="
              text-sm
              font-medium
              text-cyan-300
            "
          >

            {winner
              ? `Winner: ${winner}`
              : isDraw
              ? "Draw Match"
              : `Next: ${
                  xNext ? "X" : "O"
                }`}

          </p>

        </div>
      </div>

      {/* BOARD */}

      <div
        className="
          ttt-board

          grid
          grid-cols-3
          gap-2

          rounded-[28px]
          border
          border-white/10

          bg-white/[0.04]

          p-3

          backdrop-blur-2xl

          shadow-[0_0_60px_rgba(6,182,212,0.14)]

          w-full
          max-w-[320px]

          sm:max-w-[380px]
        "
      >

        {board.map((value, i) => {

          const isWinning =
            winningLine.includes(i);

          return (

            <motion.button

              key={i}

              whileHover={{
                scale: 1.04,
              }}

              whileTap={{
                scale: 0.94,
              }}

              initial={{
                opacity: 0,
                scale: 0.7,
              }}

              animate={{
                opacity: 1,
                scale: 1,
              }}

              transition={{
                type: "spring",
                stiffness: 260,
                damping: 18,
              }}

              onClick={() =>
                handleClick(i)
              }

              className="
                aspect-square
                w-full

                rounded-2xl

                border
                border-white/10

                text-3xl
                font-black

                transition-all
                duration-300

                sm:text-5xl
              "

              style={{

                background:

                  isWinning

                    ? "linear-gradient(135deg,#06b6d4,#8b5cf6)"

                    : "rgba(255,255,255,0.05)",

                color:

                  value === "X"

                    ? "#06b6d4"

                    : "#ec4899",

                boxShadow:

                  isWinning

                    ? "0 0 30px rgba(6,182,212,0.45)"

                    : "none",
              }}
            >

              {/* ANIMATED SYMBOL */}

              <motion.span

                initial={{
                  scale: 0,
                  rotate: -90,
                }}

                animate={{
                  scale: 1,
                  rotate: 0,
                }}

                transition={{
                  type: "spring",
                  stiffness: 240,
                }}
              >

                {value}

              </motion.span>

            </motion.button>
          );
        })}
      </div>

      {/* WIN MESSAGE */}

      {winner && (

        <motion.div

          initial={{
            opacity: 0,
            y: 15,
          }}

          animate={{
            opacity: 1,
            y: 0,
          }}

          className="
            mt-5
            rounded-2xl
            border
            border-green-400/20
            bg-green-500/10
            px-5
            py-3
            text-green-300
            backdrop-blur-xl
          "
        >

          🎉 {winner} Wins!

        </motion.div>
      )}

      {/* DRAW */}

      {isDraw && (

        <motion.div

          initial={{
            opacity: 0,
            y: 15,
          }}

          animate={{
            opacity: 1,
            y: 0,
          }}

          className="
            mt-5
            rounded-2xl
            border
            border-yellow-400/20
            bg-yellow-500/10
            px-5
            py-3
            text-yellow-300
            backdrop-blur-xl
          "
        >

          🤝 Draw Match

        </motion.div>
      )}

      {/* RESET */}

      <motion.button

        whileHover={{
          scale: 1.05,
        }}

        whileTap={{
          scale: 0.95,
        }}

        onClick={reset}

        className="
          mt-5
          rounded-xl
          bg-cyan-500
          px-5
          py-2
          text-sm
          font-semibold
          text-white

          shadow-[0_0_25px_rgba(6,182,212,0.35)]

          sm:text-base
        "
      >

        Restart

      </motion.button>

    </motion.div>
  );
}

/* ================= WINNER ================= */

function calcWinner(board, full = false) {

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

  for (let line of lines) {

    const [a, b, c] = line;

    if (
      board[a] &&
      board[a] === board[b] &&
      board[a] === board[c]
    ) {

      if (full) {

        return {
          winner: board[a],
          line,
        };
      }

      return board[a];
    }
  }

  return full ? null : null;
}

/* ---------- 2) Memory Match ---------- */
function MemoryMatch() {

  /* ================= SYMBOLS ================= */

  const symbols = [
    "🚀",
    "🎮",
    "🔥",
    "⚡",
    "👾",
    "💎",
    "🧠",
    "🌌",
  ];

  /* ================= INIT ================= */

  const init = () => {

    const vals =
      symbols.flatMap((s) => [s, s]);

    return vals
      .sort(() => Math.random() - 0.5)
      .map((val) => ({
        val,
        revealed: false,
        matched: false,
      }));
  };

  /* ================= STATES ================= */

  const [cards, setCards] =
    useState(init);

  const [first, setFirst] =
    useState(null);

  const [moves, setMoves] =
    useState(0);

  const [won, setWon] =
    useState(false);

  const [locked, setLocked] =
    useState(false);

  /* ================= FLIP ================= */

  const flip = (i) => {

    if (
      locked ||
      cards[i].revealed ||
      cards[i].matched
    ) {
      return;
    }

    const updated = [...cards];

    updated[i].revealed = true;

    setCards(updated);

    /* first card */

    if (first === null) {

      setFirst(i);

      return;
    }

    /* second card */

    setMoves((prev) => prev + 1);

    setLocked(true);

    if (
      updated[i].val ===
      updated[first].val
    ) {

      updated[i].matched = true;

      updated[first].matched = true;

      setCards([...updated]);

      setFirst(null);

      setLocked(false);

      /* match animation */

      gsap.fromTo(
        ".memory-board",
        { scale: 1 },
        {
          scale: 1.02,
          duration: 0.12,
          repeat: 1,
          yoyo: true,
        }
      );

      /* win */

      const allMatched =
        updated.every(
          (c) => c.matched
        );

      if (allMatched) {

        setTimeout(() => {
          setWon(true);
        }, 300);
      }

    } else {

      setTimeout(() => {

        updated[i].revealed = false;

        updated[first].revealed = false;

        setCards([...updated]);

        setFirst(null);

        setLocked(false);

      }, 700);
    }
  };

  /* ================= RESET ================= */

  const reset = () => {

    setCards(init());

    setFirst(null);

    setMoves(0);

    setWon(false);

    setLocked(false);
  };

  return (

    <motion.div

      initial={{
        opacity: 0,
        scale: 0.9,
      }}

      animate={{
        opacity: 1,
        scale: 1,
      }}

      transition={{
        duration: 0.4,
      }}

      className="
        relative
        flex
        w-full
        flex-col
        items-center
        justify-center
        px-2
      "
    >

      {/* BACKGROUND GLOW */}

      <div
        className="
          absolute
          inset-0
          -z-10
          rounded-full
          bg-pink-500/10
          blur-3xl
        "
      />

      {/* TOP */}

      <div className="mb-5 text-center">

        <h3
          className="
            text-2xl
            font-black
            text-pink-400

            sm:text-3xl
          "
        >
          Memory Match
        </h3>

        {/* STATS */}

        <div
          className="
            mt-3
            flex
            items-center
            gap-3
          "
        >

          <div
            className="
              rounded-2xl
              border
              border-pink-400/10
              bg-pink-500/10
              px-4
              py-2
              backdrop-blur-xl
            "
          >

            <p
              className="
                text-xs
                font-medium
                text-pink-300

                sm:text-sm
              "
            >
              Moves: {moves}
            </p>

          </div>

          <div
            className="
              rounded-2xl
              border
              border-cyan-400/10
              bg-cyan-500/10
              px-4
              py-2
              backdrop-blur-xl
            "
          >

            <p
              className="
                text-xs
                font-medium
                text-cyan-300

                sm:text-sm
              "
            >
              Matches:
              {" "}
              {
                cards.filter(
                  (c) => c.matched
                ).length / 2
              }
              /8
            </p>

          </div>

        </div>
      </div>

      {/* BOARD */}

      <div
        className="
          memory-board

          grid
          grid-cols-4
          gap-2

          rounded-[28px]

          border
          border-white/10

          bg-white/[0.04]

          p-3

          backdrop-blur-2xl

          shadow-[0_0_60px_rgba(236,72,153,0.16)]

          w-full
          max-w-[340px]

          sm:max-w-[420px]
        "
      >

        {cards.map((card, i) => {

          const active =
            card.revealed ||
            card.matched;

          return (

            <motion.button

              key={i}

              whileHover={{
                scale: active
                  ? 1
                  : 1.05,
              }}

              whileTap={{
                scale: 0.94,
              }}

              initial={{
                opacity: 0,
                scale: 0.7,
              }}

              animate={{
                opacity: 1,
                scale: 1,
                rotateY: active
                  ? 180
                  : 0,
              }}

              transition={{
                type: "spring",
                stiffness: 260,
                damping: 18,
              }}

              onClick={() =>
                flip(i)
              }

              className="
                aspect-square
                w-full

                rounded-2xl

                border
                border-white/10

                text-2xl

                sm:text-3xl

                flex
                items-center
                justify-center

                relative
                overflow-hidden
              "

              style={{

                background:

                  active

                    ? "linear-gradient(135deg,#ec4899,#8b5cf6)"

                    : "rgba(255,255,255,0.05)",

                color:
                  active
                    ? "#fff"
                    : "transparent",

                boxShadow:

                  active

                    ? "0 0 25px rgba(236,72,153,0.35)"

                    : "none",
              }}
            >

              {/* INNER GLOW */}

              {active && (

                <div
                  className="
                    absolute
                    inset-0
                    bg-white/10
                  "
                />
              )}

              <span
                className="
                  relative
                  z-10
                "
              >
                {active
                  ? card.val
                  : "?"}
              </span>

            </motion.button>
          );
        })}
      </div>

      {/* WIN */}

      {won && (

        <motion.div

          initial={{
            opacity: 0,
            y: 15,
          }}

          animate={{
            opacity: 1,
            y: 0,
          }}

          className="
            mt-5
            rounded-2xl
            border
            border-green-400/20
            bg-green-500/10
            px-5
            py-3
            text-green-300
            backdrop-blur-xl
          "
        >

          🎉 Perfect Memory!

        </motion.div>
      )}

      {/* RESET */}

      <motion.button

        whileHover={{
          scale: 1.05,
        }}

        whileTap={{
          scale: 0.95,
        }}

        onClick={reset}

        className="
          mt-5
          rounded-xl
          bg-pink-500
          px-5
          py-2
          text-sm
          font-semibold
          text-white

          shadow-[0_0_25px_rgba(236,72,153,0.35)]

          sm:text-base
        "
      >

        Restart

      </motion.button>

    </motion.div>
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
              backgroundColor: active === i ? c : `${c}`,
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
function Game2048() {

  const SIZE = 4;

  /* ================= CREATE BOARD ================= */

  const createBoard = () => {

    const board = Array(SIZE)
      .fill()
      .map(() => Array(SIZE).fill(0));

    addNumber(board);
    addNumber(board);

    return board;
  };

  /* ================= ADD NUMBER ================= */

  const addNumber = (board) => {

    const empty = [];

    board.forEach((row, i) =>
      row.forEach((cell, j) => {

        if (cell === 0) {
          empty.push([i, j]);
        }

      })
    );

    if (!empty.length) return;

    const [x, y] =
      empty[
        Math.floor(
          Math.random() * empty.length
        )
      ];

    board[x][y] =
      Math.random() > 0.85 ? 4 : 2;
  };

  /* ================= STATES ================= */

  const [board, setBoard] =
    useState(createBoard);

  const [score, setScore] =
    useState(0);

  const [gameOver, setGameOver] =
    useState(false);

  const [won, setWon] =
    useState(false);

  /* ================= TILE COLORS ================= */

  const tileColors = {
    0: "#18181b",
    2: "#3b82f6",
    4: "#8b5cf6",
    8: "#ec4899",
    16: "#f97316",
    32: "#ef4444",
    64: "#22c55e",
    128: "#14b8a6",
    256: "#06b6d4",
    512: "#6366f1",
    1024: "#eab308",
    2048: "#facc15",
  };

  /* ================= SLIDE ================= */

  const slide = (row) => {

    let arr = row.filter(Boolean);

    for (
      let i = 0;
      i < arr.length - 1;
      i++
    ) {

      if (arr[i] === arr[i + 1]) {

        arr[i] *= 2;

        setScore(
          (prev) => prev + arr[i]
        );

        if (arr[i] === 2048) {
          setWon(true);
        }

        arr[i + 1] = 0;
      }
    }

    arr = arr.filter(Boolean);

    while (arr.length < SIZE) {
      arr.push(0);
    }

    return arr;
  };

  /* ================= ROTATE ================= */

  const rotate = (matrix) =>
    matrix[0].map((_, i) =>
      matrix.map((row) => row[i]).reverse()
    );

  /* ================= GAME OVER ================= */

  const isGameOver = (board) => {

    for (let row of board) {

      if (row.includes(0)) {
        return false;
      }
    }

    /* horizontal */

    for (let i = 0; i < SIZE; i++) {

      for (
        let j = 0;
        j < SIZE - 1;
        j++
      ) {

        if (
          board[i][j] ===
          board[i][j + 1]
        ) {
          return false;
        }
      }
    }

    /* vertical */

    for (
      let i = 0;
      i < SIZE - 1;
      i++
    ) {

      for (
        let j = 0;
        j < SIZE;
        j++
      ) {

        if (
          board[i][j] ===
          board[i + 1][j]
        ) {
          return false;
        }
      }
    }

    return true;
  };

  /* ================= MOVE ================= */

  const handleMove = (dir) => {

    if (gameOver) return;

    let newBoard =
      board.map((r) => [...r]);

    const original =
      JSON.stringify(newBoard);

    if (dir === "ArrowLeft") {

      newBoard =
        newBoard.map((row) =>
          slide(row)
        );
    }

    if (dir === "ArrowRight") {

      newBoard =
        newBoard.map((row) =>
          slide(
            [...row].reverse()
          ).reverse()
        );
    }

    if (dir === "ArrowUp") {

      newBoard =
        rotate(
          rotate(
            rotate(newBoard)
          )
        );

      newBoard =
        newBoard.map((row) =>
          slide(row)
        );

      newBoard =
        rotate(newBoard);
    }

    if (dir === "ArrowDown") {

      newBoard =
        rotate(newBoard);

      newBoard =
        newBoard.map((row) =>
          slide(row)
        );

      newBoard =
        rotate(
          rotate(
            rotate(newBoard)
          )
        );
    }

    /* no movement */

    if (
      JSON.stringify(newBoard) ===
      original
    ) {
      return;
    }

    addNumber(newBoard);

    setBoard(newBoard);

    if (isGameOver(newBoard)) {
      setGameOver(true);
    }
  };

  /* ================= KEYBOARD ================= */

  useEffect(() => {

    const handleKey = (e) => {

      if (
        [
          "ArrowUp",
          "ArrowDown",
          "ArrowLeft",
          "ArrowRight",
        ].includes(e.key)
      ) {
        handleMove(e.key);
      }
    };

    window.addEventListener(
      "keydown",
      handleKey
    );

    return () =>
      window.removeEventListener(
        "keydown",
        handleKey
      );

  }, [board, gameOver]);

  /* ================= RESET ================= */

  const resetGame = () => {

    setBoard(createBoard());

    setScore(0);

    setGameOver(false);

    setWon(false);
  };

  return (

    <motion.div

      initial={{
        opacity: 0,
        scale: 0.92,
      }}

      animate={{
        opacity: 1,
        scale: 1,
      }}

      transition={{
        duration: 0.45,
      }}

      className="
        relative
        flex
        w-full
        flex-col
        items-center
        justify-center
        px-2
      "
    >

      {/* BACKGROUND GLOW */}

      <div
        className="
          absolute
          inset-0
          -z-10
          rounded-full
          bg-orange-500/10
          blur-3xl
        "
      />

      {/* TOP */}

      <div className="mb-4 text-center">

        <h3
          className="
            text-2xl
            font-black
            text-orange-400

            sm:text-3xl
          "
        >
          2048
        </h3>

        {/* SCORE */}

        <div
          className="
            mt-3
            rounded-2xl
            border
            border-orange-400/10
            bg-orange-500/10
            px-4
            py-2
            backdrop-blur-xl
          "
        >
          <p
            className="
              text-sm
              font-medium
              text-orange-300
            "
          >
            Score: {score}
          </p>
        </div>

      </div>

      {/* BOARD */}

      <div
        className="
          relative
          grid
          grid-cols-4
          gap-2

          rounded-[24px]
          border
          border-white/10

          bg-white/[0.04]
          p-2.5

          backdrop-blur-2xl

          shadow-[0_0_60px_rgba(249,115,22,0.12)]

          w-full
          max-w-[340px]

          sm:max-w-[420px]
          md:max-w-[520px]
        "
      >

        {board.flat().map((num, i) => (

          <motion.div

            key={i}

            layout

            initial={{
              scale: 0.5,
              opacity: 0,
              rotate: -8,
            }}

            animate={{
              scale: 1,
              opacity: 1,
              rotate: 0,
            }}

            transition={{
              type: "spring",
              stiffness: 260,
              damping: 18,
            }}

            whileHover={{
              scale: 1.04,
            }}

            className="
              aspect-square
              w-full

              flex
              items-center
              justify-center

              rounded-xl

              text-sm
              font-black
              text-white

              sm:text-lg
              md:text-xl
            "

            style={{

              background:

                num === 0

                  ? "rgba(255,255,255,0.04)"

                  : `linear-gradient(
                      135deg,
                      ${tileColors[num] || "#22c55e"},
                      ${tileColors[num] || "#22c55e"}aa
                    )`,

              boxShadow:

                num !== 0

                  ? `
                    0 0 25px ${tileColors[num]}55,
                    inset 0 0 12px rgba(255,255,255,0.12)
                  `

                  : "none",

              backdropFilter: "blur(10px)",
            }}
          >

            {num !== 0 ? num : ""}

          </motion.div>
        ))}
      </div>

      {/* WIN */}

      {won && (

        <motion.div

          initial={{
            opacity: 0,
            y: 15,
          }}

          animate={{
            opacity: 1,
            y: 0,
          }}

          className="
            mt-5
            rounded-2xl
            border
            border-yellow-400/20
            bg-yellow-500/10
            px-5
            py-3
            text-yellow-300
            backdrop-blur-xl
          "
        >

          🎉 You Reached 2048!

        </motion.div>
      )}

      {/* GAME OVER */}

      {gameOver && (

        <motion.div

          initial={{
            opacity: 0,
            scale: 0.8,
          }}

          animate={{
            opacity: 1,
            scale: 1,
          }}

          className="
            mt-5
            rounded-2xl
            border
            border-red-400/20
            bg-red-500/10
            px-5
            py-3
            text-red-300
            backdrop-blur-xl
          "
        >

          💀 Game Over

        </motion.div>
      )}

      {/* RESTART */}

      <motion.button

        whileHover={{
          scale: 1.05,
        }}

        whileTap={{
          scale: 0.95,
        }}

        onClick={resetGame}

        className="
          mt-5
          rounded-xl
          bg-orange-500
          px-5
          py-2
          text-sm
          font-semibold
          text-white

          shadow-[0_0_25px_rgba(249,115,22,0.35)]

          sm:text-base
        "
      >

        Restart

      </motion.button>

    </motion.div>
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

  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const size =
      window.innerWidth < 640 ? 280 : 420;

    canvas.width = size;
    canvas.height = size;

    const tile = 20;

    /* ================= GAME STATE ================= */

    let snake = [
      { x: 8 * tile, y: 10 * tile },
      { x: 7 * tile, y: 10 * tile },
      { x: 6 * tile, y: 10 * tile },
    ];

    let food = randomFood();

    let dx = tile;
    let dy = 0;

    let nextDx = dx;
    let nextDy = dy;

    let speed = 95;

    let running = true;

    /* ================= FOOD ================= */

    function randomFood() {

      let position;

      do {

        position = {
          x:
            Math.floor(
              Math.random() * (size / tile)
            ) * tile,

          y:
            Math.floor(
              Math.random() * (size / tile)
            ) * tile,
        };

      } while (
        snake.some(
          (s) =>
            s.x === position.x &&
            s.y === position.y
        )
      );

      return position;
    }

    /* ================= GRID ================= */

    function drawGrid() {

      ctx.strokeStyle =
        "rgba(255,255,255,0.04)";

      for (
        let i = 0;
        i < size;
        i += tile
      ) {

        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, size);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(size, i);
        ctx.stroke();
      }
    }

    /* ================= BACKGROUND ================= */

    function drawBackground() {

      const bg =
        ctx.createLinearGradient(
          0,
          0,
          size,
          size
        );

      bg.addColorStop(0, "#020617");
      bg.addColorStop(0.5, "#071426");
      bg.addColorStop(1, "#0f172a");

      ctx.fillStyle = bg;

      ctx.fillRect(0, 0, size, size);
    }

    /* ================= FOOD ================= */

    function drawFood() {

      const pulse =
        Math.sin(Date.now() * 0.01) * 2;

      ctx.beginPath();

      ctx.fillStyle = "#ef4444";

      ctx.shadowBlur = 25;
      ctx.shadowColor = "#ef4444";

      ctx.arc(
        food.x + tile / 2,
        food.y + tile / 2,
        tile / 2.5 + pulse,
        0,
        Math.PI * 2
      );

      ctx.fill();

      /* inner glow */

      ctx.beginPath();

      ctx.fillStyle = "#fff";

      ctx.arc(
        food.x + tile / 2,
        food.y + tile / 2,
        tile / 6,
        0,
        Math.PI * 2
      );

      ctx.fill();
    }

    /* ================= SNAKE ================= */

    function drawSnake() {

      snake.forEach((part, index) => {

        const gradient =
          ctx.createLinearGradient(
            part.x,
            part.y,
            part.x + tile,
            part.y + tile
          );

        gradient.addColorStop(
          0,
          index === 0
            ? "#4ade80"
            : "#22c55e"
        );

        gradient.addColorStop(
          1,
          "#15803d"
        );

        ctx.fillStyle = gradient;

        ctx.shadowBlur =
          index === 0 ? 35 : 15;

        ctx.shadowColor = "#22c55e";

        ctx.beginPath();

        ctx.roundRect(
          part.x,
          part.y,
          tile - 2,
          tile - 2,
          7
        );

        ctx.fill();

        /* glow trail */

        ctx.fillStyle =
          "rgba(34,197,94,0.15)";

        ctx.beginPath();

        ctx.arc(
          part.x + tile / 2,
          part.y + tile / 2,
          tile / 3,
          0,
          Math.PI * 2
        );

        ctx.fill();

        /* snake eyes */

        if (index === 0) {

          ctx.fillStyle = "#fff";

          ctx.beginPath();

          ctx.arc(
            part.x + 6,
            part.y + 7,
            2,
            0,
            Math.PI * 2
          );

          ctx.arc(
            part.x + 14,
            part.y + 7,
            2,
            0,
            Math.PI * 2
          );

          ctx.fill();
        }
      });
    }

    /* ================= GAME OVER ================= */

    function stopGame() {

      running = false;

      setGameOver(true);

      gsap.fromTo(
        canvas,
        { scale: 1 },
        {
          scale: 0.96,
          duration: 0.12,
          repeat: 1,
          yoyo: true,
        }
      );
    }

    /* ================= UPDATE ================= */

    function update() {

      if (!running) return;

      dx = nextDx;
      dy = nextDy;

      const head = {
        x: snake[0].x + dx,
        y: snake[0].y + dy,
      };

      /* wall collision */

      if (
        head.x < 0 ||
        head.y < 0 ||
        head.x >= size ||
        head.y >= size
      ) {
        stopGame();
        return;
      }

      /* self collision */

      for (
        let i = 1;
        i < snake.length;
        i++
      ) {

        if (
          head.x === snake[i].x &&
          head.y === snake[i].y
        ) {
          stopGame();
          return;
        }
      }

      snake.unshift(head);

      /* food eat */

      if (
        head.x === food.x &&
        head.y === food.y
      ) {

        food = randomFood();

        setScore(
          (prev) => prev + 1
        );

        /* screen shake */

        gsap.fromTo(
          canvas,
          { x: -3 },
          {
            x: 3,
            duration: 0.08,
            repeat: 3,
            yoyo: true,
            ease: "power1.inOut",
          }
        );

        /* speed increase */

        speed = Math.max(
          55,
          speed - 1.5
        );

      } else {

        snake.pop();
      }
    }

    /* ================= RENDER ================= */

    function render() {

      drawBackground();
      drawGrid();
      drawFood();
      drawSnake();
    }

    /* ================= GAME LOOP ================= */

    let lastRender = 0;

    function gameLoop(timestamp) {

      if (!running) return;

      const delta =
        timestamp - lastRender;

      if (delta > speed) {

        update();
        render();

        lastRender = timestamp;
      }

      animationFrame =
        requestAnimationFrame(
          gameLoop
        );
    }

    let animationFrame =
      requestAnimationFrame(
        gameLoop
      );

    /* ================= CONTROLS ================= */

    function handleKey(e) {

      if (
        e.key === "ArrowUp" &&
        dy === 0
      ) {
        nextDx = 0;
        nextDy = -tile;
      }

      if (
        e.key === "ArrowDown" &&
        dy === 0
      ) {
        nextDx = 0;
        nextDy = tile;
      }

      if (
        e.key === "ArrowLeft" &&
        dx === 0
      ) {
        nextDx = -tile;
        nextDy = 0;
      }

      if (
        e.key === "ArrowRight" &&
        dx === 0
      ) {
        nextDx = tile;
        nextDy = 0;
      }
    }

    window.addEventListener(
      "keydown",
      handleKey
    );

    return () => {

      running = false;

      cancelAnimationFrame(
        animationFrame
      );

      window.removeEventListener(
        "keydown",
        handleKey
      );
    };

  }, []);

  return (
    <div className="flex flex-col items-center">

      {/* TOP */}

      <div className="mb-4 text-center">

        <h3
          className="
            text-3xl
            font-black
            text-green-400
          "
        >
          Neon Snake
        </h3>

        <p
          className="
            mt-1
            text-sm
            text-zinc-400
          "
        >
          Score: {score}
        </p>

      </div>

      {/* CANVAS */}

      <canvas
        ref={canvasRef}
        className="
          rounded-3xl
          border
          border-green-400/20
          bg-black
          shadow-[0_0_60px_rgba(34,197,94,0.18)]
        "
      />

      {/* GAME OVER */}

      {gameOver && (

        <motion.div
          initial={{
            opacity: 0,
            scale: 0.7,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          className="
            mt-5
            rounded-2xl
            border
            border-red-400/20
            bg-red-500/10
            px-6
            py-4
            text-center
            backdrop-blur-xl
          "
        >

          <p
            className="
              text-xl
              font-bold
              text-red-400
            "
          >
            Game Over
          </p>

          <p
            className="
              mt-1
              text-sm
              text-zinc-300
            "
          >
            Final Score: {score}
          </p>

          <button
            onClick={() =>
              window.location.reload()
            }
            className="
              mt-4
              rounded-xl
              bg-green-500
              px-5
              py-2
              text-sm
              font-semibold
              text-black
              transition
              hover:scale-105
            "
          >
            Play Again
          </button>

        </motion.div>
      )}
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
      .map(() => Array(size).fill(false)),
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
          )),
        )}
      </div>
    </div>
  );
}

export default PortfolioGamesComponent;
