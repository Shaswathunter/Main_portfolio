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

  const pads = [

    {
      color: "#ef4444",
      glow: "rgba(239,68,68,0.55)",
      label: "RED",
    },

    {
      color: "#22c55e",
      glow: "rgba(34,197,94,0.55)",
      label: "GREEN",
    },

    {
      color: "#3b82f6",
      glow: "rgba(59,130,246,0.55)",
      label: "BLUE",
    },

    {
      color: "#eab308",
      glow: "rgba(234,179,8,0.55)",
      label: "YELLOW",
    },
  ];

  /* ================= STATES ================= */

  const [sequence, setSequence] =
    useState([]);

  const [user, setUser] =
    useState([]);

  const [active, setActive] =
    useState(null);

  const [score, setScore] =
    useState(0);

  const [started, setStarted] =
    useState(false);

  const [gameOver, setGameOver] =
    useState(false);

  const [locked, setLocked] =
    useState(false);

  /* ================= PLAY SEQUENCE ================= */

  const playSequence = async (
    seq
  ) => {

    setLocked(true);

    for (
      let i = 0;
      i < seq.length;
      i++
    ) {

      const current = seq[i];

      setActive(current);

      gsap.fromTo(
        `.simon-${current}`,
        { scale: 1 },
        {
          scale: 1.05,
          duration: 0.15,
          repeat: 1,
          yoyo: true,
        }
      );

      await new Promise((r) =>
        setTimeout(r, 550)
      );

      setActive(null);

      await new Promise((r) =>
        setTimeout(r, 180)
      );
    }

    setLocked(false);
  };

  /* ================= NEXT ROUND ================= */

  const nextRound = async () => {

    const next =
      Math.floor(
        Math.random() * 4
      );

    const updated = [
      ...sequence,
      next,
    ];

    setSequence(updated);

    setUser([]);

    await playSequence(updated);
  };

  /* ================= START ================= */

  const startGame = async () => {

    setStarted(true);

    setGameOver(false);

    setScore(0);

    setSequence([]);

    setUser([]);

    const first =
      Math.floor(
        Math.random() * 4
      );

    const newSeq = [first];

    setSequence(newSeq);

    await playSequence(newSeq);
  };

  /* ================= HANDLE CLICK ================= */

  const handleClick = async (
    index
  ) => {

    if (
      locked ||
      gameOver ||
      !started
    ) {
      return;
    }

    const updatedUser = [
      ...user,
      index,
    ];

    setUser(updatedUser);

    /* pad animation */

    setActive(index);

    gsap.fromTo(
      `.simon-${index}`,
      { scale: 1 },
      {
        scale: 1.08,
        duration: 0.12,
        repeat: 1,
        yoyo: true,
      }
    );

    setTimeout(() => {
      setActive(null);
    }, 180);

    /* wrong */

    if (
      sequence[
        updatedUser.length - 1
      ] !== index
    ) {

      setGameOver(true);

      setStarted(false);

      gsap.fromTo(
        ".simon-board",
        { x: -8 },
        {
          x: 8,
          duration: 0.08,
          repeat: 5,
          yoyo: true,
        }
      );

      return;
    }

    /* complete */

    if (
      updatedUser.length ===
      sequence.length
    ) {

      setScore(
        (prev) => prev + 1
      );

      setLocked(true);

      setTimeout(async () => {

        await nextRound();

      }, 900);
    }
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

      {/* GLOW */}

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
          Simon Says
        </h3>

        {/* SCORE */}

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
            Score: {score}
          </p>

        </div>
      </div>

      {/* BOARD */}

      <div
        className="
          simon-board

          grid
          grid-cols-2
          gap-3

          rounded-[30px]

          border
          border-white/10

          bg-white/[0.04]

          p-4

          backdrop-blur-2xl

          shadow-[0_0_60px_rgba(6,182,212,0.16)]

          w-full
          max-w-[320px]

          sm:max-w-[420px]
        "
      >

        {pads.map((pad, i) => {

          const activeNow =
            active === i;

          return (

            <motion.button

              key={i}

              whileHover={{
                scale: 1.04,
              }}

              whileTap={{
                scale: 0.96,
              }}

              onClick={() =>
                handleClick(i)
              }

              className={`
                simon-${i}

                aspect-square
                w-full

                rounded-3xl

                border
                border-white/10

                relative
                overflow-hidden
              `}

              style={{

                background:
                  activeNow

                    ? `linear-gradient(135deg,
                      ${pad.color},
                      #ffffff
                    )`

                    : `linear-gradient(135deg,
                      ${pad.color},
                      ${pad.color}aa
                    )`,

                boxShadow:
                  activeNow

                    ? `0 0 40px ${pad.glow}`

                    : `0 0 20px ${pad.glow}`,
              }}
            >

              {/* SHINE */}

              <div
                className="
                  absolute
                  inset-0
                  bg-white/10
                "
              />

              {/* LABEL */}

              <span
                className="
                  absolute
                  bottom-3
                  left-1/2

                  -translate-x-1/2

                  text-xs
                  font-black
                  tracking-[2px]
                  text-white

                  sm:text-sm
                "
              >
                {pad.label}
              </span>

            </motion.button>
          );
        })}
      </div>

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

          💀 Wrong Move!

        </motion.div>
      )}

      {/* START BUTTON */}

      <motion.button

        whileHover={{
          scale: 1.05,
        }}

        whileTap={{
          scale: 0.95,
        }}

        onClick={startGame}

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

        {started
          ? "Restart"
          : "Start Game"}

      </motion.button>

    </motion.div>
  );
}

/* ---------- 4) Whack a Mole ---------- */
function WhackAMole() {

  /* ================= STATES ================= */

  const [holes, setHoles] =
    useState(Array(9).fill(false));

  const [score, setScore] =
    useState(0);

  const [timeLeft, setTimeLeft] =
    useState(30);

  const [started, setStarted] =
    useState(false);

  const [gameOver, setGameOver] =
    useState(false);

  const [bestScore, setBestScore] =
    useState(0);

  /* ================= START GAME ================= */

  useEffect(() => {

    if (!started || gameOver) return;

    /* countdown */

    const timer = setInterval(() => {

      setTimeLeft((prev) => {

        if (prev <= 1) {

          clearInterval(timer);

          setGameOver(true);

          setStarted(false);

          setBestScore((b) =>
            Math.max(b, score)
          );

          return 0;
        }

        return prev - 1;
      });

    }, 1000);

    return () =>
      clearInterval(timer);

  }, [started, gameOver, score]);

  /* ================= MOLE LOOP ================= */

  useEffect(() => {

    if (!started || gameOver) return;

    const interval = setInterval(() => {

      const index =
        Math.floor(
          Math.random() * 9
        );

      const updated =
        Array(9).fill(false);

      updated[index] = true;

      setHoles(updated);

      gsap.fromTo(
        `.mole-${index}`,
        {
          y: 12,
          scale: 0.7,
        },
        {
          y: 0,
          scale: 1,
          duration: 0.22,
          ease: "back.out(2)",
        }
      );

      setTimeout(() => {

        setHoles(
          Array(9).fill(false)
        );

      }, 650);

    }, 850);

    return () =>
      clearInterval(interval);

  }, [started, gameOver]);

  /* ================= HIT ================= */

  const hit = (i) => {

    if (!holes[i]) return;

    setScore((prev) => prev + 1);

    /* smash animation */

    gsap.fromTo(
      `.mole-${i}`,
      {
        scale: 1,
      },
      {
        scale: 0.4,
        opacity: 0,
        duration: 0.12,
      }
    );

    /* screen bounce */

    gsap.fromTo(
      ".whack-board",
      { scale: 1 },
      {
        scale: 1.02,
        duration: 0.08,
        repeat: 1,
        yoyo: true,
      }
    );

    const updated =
      [...holes];

    updated[i] = false;

    setHoles(updated);
  };

  /* ================= RESET ================= */

  const startGame = () => {

    setScore(0);

    setTimeLeft(30);

    setGameOver(false);

    setStarted(true);

    setHoles(
      Array(9).fill(false)
    );
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
          bg-green-500/10
          blur-3xl
        "
      />

      {/* TOP */}

      <div className="mb-5 text-center">

        <h3
          className="
            text-2xl
            font-black
            text-green-400

            sm:text-3xl
          "
        >
          Whack A Mole
        </h3>

        {/* STATS */}

        <div
          className="
            mt-3
            flex
            flex-wrap
            items-center
            justify-center
            gap-3
          "
        >

          {/* SCORE */}

          <div
            className="
              rounded-2xl
              border
              border-green-400/10
              bg-green-500/10
              px-4
              py-2
              backdrop-blur-xl
            "
          >

            <p
              className="
                text-xs
                font-medium
                text-green-300

                sm:text-sm
              "
            >
              Score: {score}
            </p>

          </div>

          {/* TIME */}

          <div
            className="
              rounded-2xl
              border
              border-yellow-400/10
              bg-yellow-500/10
              px-4
              py-2
              backdrop-blur-xl
            "
          >

            <p
              className="
                text-xs
                font-medium
                text-yellow-300

                sm:text-sm
              "
            >
              Time: {timeLeft}s
            </p>

          </div>

          {/* BEST */}

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
              Best: {bestScore}
            </p>

          </div>

        </div>
      </div>

      {/* BOARD */}

      <div
        className="
          whack-board

          grid
          grid-cols-3
          gap-3

          rounded-[30px]

          border
          border-white/10

          bg-white/[0.04]

          p-4

          backdrop-blur-2xl

          shadow-[0_0_60px_rgba(34,197,94,0.16)]

          w-full
          max-w-[320px]

          sm:max-w-[420px]
        "
      >

        {holes.map((active, i) => (

          <motion.button

            key={i}

            whileHover={{
              scale: 1.04,
            }}

            whileTap={{
              scale: 0.92,
            }}

            onClick={() => hit(i)}

            className="
              relative

              aspect-square
              w-full

              overflow-hidden

              rounded-2xl

              border
              border-white/10

              bg-[#111827]
            "
          >

            {/* HOLE */}

            <div
              className="
                absolute
                bottom-0
                left-1/2

                h-[40%]
                w-[80%]

                -translate-x-1/2

                rounded-full

                bg-black/60

                blur-[2px]
              "
            />

            {/* MOLE */}

            {active && (

              <motion.div

                initial={{
                  y: 40,
                  scale: 0.7,
                }}

                animate={{
                  y: 0,
                  scale: 1,
                }}

                exit={{
                  y: 40,
                  opacity: 0,
                }}

                className={`
                  mole-${i}

                  absolute
                  bottom-4
                  left-1/2

                  flex
                  h-[60%]
                  w-[60%]

                  -translate-x-1/2

                  items-center
                  justify-center

                  rounded-full

                  bg-gradient-to-br
                  from-green-400
                  to-emerald-600

                  text-3xl

                  shadow-[0_0_30px_rgba(34,197,94,0.45)]
                `}
              >

                🐹

              </motion.div>
            )}

          </motion.button>
        ))}
      </div>

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

          💀 Time Up! Final Score: {score}

        </motion.div>
      )}

      {/* START */}

      <motion.button

        whileHover={{
          scale: 1.05,
        }}

        whileTap={{
          scale: 0.95,
        }}

        onClick={startGame}

        className="
          mt-5
          rounded-xl
          bg-green-500
          px-5
          py-2
          text-sm
          font-semibold
          text-white

          shadow-[0_0_25px_rgba(34,197,94,0.35)]

          sm:text-base
        "
      >

        {started
          ? "Playing..."
          : "Start Game"}

      </motion.button>

    </motion.div>
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

  /* ================= QUESTIONS ================= */

  const questions = [

    {
      question:
        "Which company created React.js?",
      options: [
        "Google",
        "Facebook",
        "Microsoft",
        "Apple",
      ],
      answer: "Facebook",
    },

    {
      question:
        "What does CSS stand for?",
      options: [
        "Creative Style Sheets",
        "Cascading Style Sheets",
        "Computer Style Syntax",
        "Colorful Style System",
      ],
      answer:
        "Cascading Style Sheets",
    },

    {
      question:
        "Which hook is used for side effects in React?",
      options: [
        "useState",
        "useMemo",
        "useEffect",
        "useRef",
      ],
      answer: "useEffect",
    },

    {
      question:
        "What does API stand for?",
      options: [
        "Application Programming Interface",
        "Advanced Program Internet",
        "Application Process Integration",
        "Applied Program Interface",
      ],
      answer:
        "Application Programming Interface",
    },

    {
      question:
        "Which language runs in the browser?",
      options: [
        "Python",
        "C++",
        "Java",
        "JavaScript",
      ],
      answer: "JavaScript",
    },
  ];

  /* ================= STATES ================= */

  const [current, setCurrent] =
    useState(0);

  const [selected, setSelected] =
    useState(null);

  const [score, setScore] =
    useState(0);

  const [showResult, setShowResult] =
    useState(false);

  const [answered, setAnswered] =
    useState(false);

  /* ================= SUBMIT ================= */

  const submitAnswer = () => {

    if (!selected || answered)
      return;

    setAnswered(true);

    const correct =
      questions[current].answer;

    if (selected === correct) {

      setScore(
        (prev) => prev + 1
      );

      gsap.fromTo(
        ".quiz-card",
        { scale: 1 },
        {
          scale: 1.02,
          duration: 0.12,
          repeat: 1,
          yoyo: true,
        }
      );
    }

    setTimeout(() => {

      if (
        current + 1 <
        questions.length
      ) {

        setCurrent(
          (prev) => prev + 1
        );

        setSelected(null);

        setAnswered(false);

      } else {

        setShowResult(true);
      }

    }, 900);
  };

  /* ================= RESET ================= */

  const resetQuiz = () => {

    setCurrent(0);

    setSelected(null);

    setScore(0);

    setAnswered(false);

    setShowResult(false);
  };

  /* ================= RESULT PERCENT ================= */

  const percent =
    Math.round(
      (score /
        questions.length) *
        100
    );

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

      {/* GLOW */}

      <div
        className="
          absolute
          inset-0
          -z-10
          rounded-full
          bg-blue-500/10
          blur-3xl
        "
      />

      {/* TOP */}

      <div className="mb-5 text-center">

        <h3
          className="
            text-2xl
            font-black
            text-blue-400

            sm:text-3xl
          "
        >
          Mini Quiz
        </h3>

        {!showResult && (

          <div
            className="
              mt-3
              rounded-2xl
              border
              border-blue-400/10
              bg-blue-500/10
              px-5
              py-2
              backdrop-blur-xl
            "
          >

            <p
              className="
                text-sm
                font-medium
                text-blue-300
              "
            >
              Question
              {" "}
              {current + 1}
              /{questions.length}
            </p>

          </div>
        )}

      </div>

      {/* QUIZ CARD */}

      {!showResult ? (

        <motion.div

          key={current}

          initial={{
            opacity: 0,
            y: 25,
          }}

          animate={{
            opacity: 1,
            y: 0,
          }}

          transition={{
            duration: 0.35,
          }}

          className="
            quiz-card

            w-full
            max-w-[520px]

            rounded-[30px]

            border
            border-white/10

            bg-white/[0.04]

            p-5

            backdrop-blur-2xl

            shadow-[0_0_60px_rgba(59,130,246,0.14)]
          "
        >

          {/* QUESTION */}

          <h4
            className="
              mb-5
              text-lg
              font-bold
              text-white

              sm:text-xl
            "
          >
            {
              questions[current]
                .question
            }
          </h4>

          {/* OPTIONS */}

          <div
            className="
              flex
              flex-col
              gap-3
            "
          >

            {questions[
              current
            ].options.map(
              (option, i) => {

                const correct =
                  questions[current]
                    .answer;

                const isCorrect =
                  option === correct;

                const isSelected =
                  selected === option;

                return (

                  <motion.button

                    key={i}

                    whileHover={{
                      scale: 1.02,
                    }}

                    whileTap={{
                      scale: 0.98,
                    }}

                    onClick={() =>
                      !answered &&
                      setSelected(option)
                    }

                    className="
                      rounded-2xl
                      border
                      border-white/10

                      px-4
                      py-3

                      text-left
                      text-sm
                      font-medium

                      transition-all
                      duration-300

                      sm:text-base
                    "

                    style={{

                      background:

                        answered

                          ? isCorrect

                            ? "linear-gradient(135deg,#22c55e,#16a34a)"

                            : isSelected

                            ? "linear-gradient(135deg,#ef4444,#dc2626)"

                            : "rgba(255,255,255,0.05)"

                          : isSelected

                          ? "linear-gradient(135deg,#3b82f6,#2563eb)"

                          : "rgba(255,255,255,0.05)",

                      color:
                        "#fff",

                      boxShadow:

                        isSelected

                          ? "0 0 25px rgba(59,130,246,0.25)"

                          : "none",
                    }}
                  >

                    {option}

                  </motion.button>
                );
              }
            )}

          </div>

          {/* BUTTON */}

          <motion.button

            whileHover={{
              scale: 1.04,
            }}

            whileTap={{
              scale: 0.95,
            }}

            onClick={submitAnswer}

            className="
              mt-5
              w-full

              rounded-xl

              bg-blue-500

              px-5
              py-3

              text-sm
              font-semibold
              text-white

              shadow-[0_0_25px_rgba(59,130,246,0.35)]

              sm:text-base
            "
          >

            Submit Answer

          </motion.button>

        </motion.div>

      ) : (

        /* RESULT */

        <motion.div

          initial={{
            opacity: 0,
            scale: 0.85,
          }}

          animate={{
            opacity: 1,
            scale: 1,
          }}

          className="
            w-full
            max-w-[420px]

            rounded-[30px]

            border
            border-white/10

            bg-white/[0.04]

            p-6

            text-center

            backdrop-blur-2xl

            shadow-[0_0_60px_rgba(59,130,246,0.14)]
          "
        >

          <h4
            className="
              text-2xl
              font-black
              text-blue-400
            "
          >
            Quiz Complete 🎉
          </h4>

          <p
            className="
              mt-4
              text-lg
              text-white
            "
          >
            Score:
            {" "}
            {score}
            /
            {questions.length}
          </p>

          <div
            className="
              mt-5

              rounded-2xl

              border
              border-green-400/10

              bg-green-500/10

              px-5
              py-4
            "
          >

            <p
              className="
                text-3xl
                font-black
                text-green-300
              "
            >
              {percent}%
            </p>

          </div>

          {/* RESET */}

          <motion.button

            whileHover={{
              scale: 1.04,
            }}

            whileTap={{
              scale: 0.95,
            }}

            onClick={resetQuiz}

            className="
              mt-5

              rounded-xl

              bg-blue-500

              px-5
              py-3

              text-sm
              font-semibold
              text-white

              shadow-[0_0_25px_rgba(59,130,246,0.35)]

              sm:text-base
            "
          >

            Play Again

          </motion.button>

        </motion.div>
      )}

    </motion.div>
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

  const [score, setScore] =
    useState(0);

  const [bestScore, setBestScore] =
    useState(0);

  const [started, setStarted] =
    useState(false);

  const [gameOver, setGameOver] =
    useState(false);

  useEffect(() => {

    const canvas =
      canvasRef.current;

    if (!canvas) return;

    const ctx =
      canvas.getContext("2d");

    /* ================= SIZE ================= */

    const wrapper =
      canvas.parentElement;

    const width =
      wrapper.clientWidth;

    const height =
      window.innerHeight * 0.72;

    canvas.width = width;

    canvas.height = height;

    let animationFrame;

    let running = true;

    /* ================= STARS ================= */

    const stars = Array.from(
      { length: 100 },
      () => ({
        x:
          Math.random() *
          canvas.width,

        y:
          Math.random() *
          canvas.height,

        r:
          Math.random() * 2,
      })
    );

    /* ================= PADDLE ================= */

    const paddle = {

      width:
        canvas.width * 0.18,

      height: 18,

      x:
        canvas.width / 2 -
        (canvas.width * 0.18) / 2,

      y:
        canvas.height - 45,

      targetX:
        canvas.width / 2 -
        (canvas.width * 0.18) / 2,
    };

    /* ================= BALLS ================= */

    let balls = [

      {
        x:
          canvas.width / 2,

        y:
          canvas.height / 2,

        radius:
          canvas.width * 0.012,

        dx: 3,

        dy: -3,

        speed: 3,

        fire: false,
      },
    ];

    /* ================= BRICKS ================= */

    const brickRows = 6;

    const brickCols = 10;

    const brickGap = 2;

    const brickWidth =
      (canvas.width -
        brickGap *
          (brickCols + 1)) /
      brickCols;

    const brickHeight = 30;

    let bricks = [];

    for (
      let r = 0;
      r < brickRows;
      r++
    ) {

      for (
        let c = 0;
        c < brickCols;
        c++
      ) {

        const doubleBrick =
          Math.random() > 0.72;

        bricks.push({

          x:
            c *
              (brickWidth +
                brickGap) +
            brickGap,

          y:
            r *
              (brickHeight +
                brickGap) +
            18,

          width:
            brickWidth,

          height:
            brickHeight,

          destroyed:
            false,

          hits:
            doubleBrick
              ? 2
              : 1,

          double:
            doubleBrick,

          color:
            doubleBrick
              ? "#9333ea"
              : `hsl(${
                  c * 35
                },90%,60%)`,
        });
      }
    }

    /* ================= POWERS ================= */

    let powers = [];

    const powerTypes = [
      "double",
      "fire",
      "bigBall",
      "bigPaddle",
    ];

    setInterval(() => {

      const type =
        powerTypes[
          Math.floor(
            Math.random() *
              powerTypes.length
          )
        ];

      powers.push({

        x:
          Math.random() *
          (canvas.width - 60),

        y:
          Math.random() *
          (canvas.height *
            0.35),

        width: 46,

        height: 46,

        type,

        glow:
          Math.random() * 360,
      });

    }, 7000);

    /* ================= PARTICLES ================= */

    let particles = [];

    function createParticles(
      x,
      y,
      color
    ) {

      for (
        let i = 0;
        i < 24;
        i++
      ) {

        particles.push({

          x,
          y,

          dx:
            (Math.random() - 0.5) * 10,

          dy:
            (Math.random() - 0.5) * 10,

          radius:
            Math.random() * 4 + 1,

          alpha: 1,

          color,
        });
      }
    }

    function drawParticles() {

      particles.forEach(
        (p, index) => {

          p.x += p.dx;

          p.y += p.dy;

          p.alpha -= 0.02;

          ctx.beginPath();

          ctx.fillStyle =
            `rgba(${p.color},${p.alpha})`;

          ctx.arc(
            p.x,
            p.y,
            p.radius,
            0,
            Math.PI * 2
          );

          ctx.fill();

          if (p.alpha <= 0) {

            particles.splice(
              index,
              1
            );
          }
        }
      );
    }

    /* ================= BACKGROUND ================= */

    function drawBackground() {

      const bg =
        ctx.createLinearGradient(
          0,
          0,
          canvas.width,
          canvas.height
        );

      bg.addColorStop(
        0,
        "#020617"
      );

      bg.addColorStop(
        1,
        "#0f172a"
      );

      ctx.fillStyle = bg;

      ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
      );

      stars.forEach((star) => {

        ctx.fillStyle =
          "rgba(255,255,255,0.08)";

        ctx.beginPath();

        ctx.arc(
          star.x,
          star.y,
          star.r,
          0,
          Math.PI * 2
        );

        ctx.fill();
      });
    }

    /* ================= BRICKS ================= */

    function drawBricks() {

      bricks.forEach(
        (brick) => {

          if (
            brick.destroyed
          )
            return;

          ctx.shadowBlur =
            brick.double
              ? 35
              : 18;

          ctx.shadowColor =
            brick.color;

          const gradient =
            ctx.createLinearGradient(
              brick.x,
              brick.y,
              brick.x,
              brick.y +
                brick.height
            );

          if (
            brick.double
          ) {

            gradient.addColorStop(
              0,
              "#d8b4fe"
            );

            gradient.addColorStop(
              0.4,
              "#a855f7"
            );

            gradient.addColorStop(
              1,
              "#581c87"
            );

          } else {

            gradient.addColorStop(
              0,
              "#ffffff"
            );

            gradient.addColorStop(
              0.15,
              brick.color
            );

            gradient.addColorStop(
              1,
              "#111827"
            );
          }

          ctx.fillStyle =
            gradient;

          ctx.beginPath();

          ctx.roundRect(
            brick.x,
            brick.y,
            brick.width,
            brick.height,
            8
          );

          ctx.fill();

          /* shine */

          ctx.fillStyle =
            "rgba(255,255,255,0.28)";

          ctx.beginPath();

          ctx.roundRect(
            brick.x + 2,
            brick.y + 2,
            brick.width - 4,
            7,
            5
          );

          ctx.fill();

          if (
            brick.double
          ) {

            ctx.fillStyle =
              "#fff";

            ctx.font =
              "bold 15px Arial";

            ctx.fillText(
              "2X",
              brick.x +
                brick.width / 2 -
                12,
              brick.y + 20
            );
          }

          ctx.shadowBlur = 0;
        }
      );
    }

    /* ================= BALLS ================= */

    function drawBalls() {

      balls.forEach((ball) => {

        const glow =
          ctx.createRadialGradient(
            ball.x,
            ball.y,
            0,
            ball.x,
            ball.y,
            ball.radius * 4
          );

        glow.addColorStop(
          0,
          "#ffffff"
        );

        glow.addColorStop(
          1,
          ball.fire
            ? "#ff4500"
            : "#06b6d4"
        );

        ctx.beginPath();

        ctx.fillStyle = glow;

        ctx.shadowBlur = 35;

        ctx.shadowColor =
          ball.fire
            ? "#ff4500"
            : "#06b6d4";

        ctx.arc(
          ball.x,
          ball.y,
          ball.radius,
          0,
          Math.PI * 2
        );

        ctx.fill();

        ctx.shadowBlur = 0;
      });
    }

    /* ================= PADDLE ================= */

    function drawPaddle() {

      paddle.x +=
        (paddle.targetX -
          paddle.x) *
        0.14;

      const gradient =
        ctx.createLinearGradient(
          paddle.x,
          paddle.y,
          paddle.x +
            paddle.width,
          paddle.y
        );

      gradient.addColorStop(
        0,
        "#06b6d4"
      );

      gradient.addColorStop(
        1,
        "#8b5cf6"
      );

      ctx.fillStyle =
        gradient;

      ctx.shadowBlur = 30;

      ctx.shadowColor =
        "#06b6d4";

      ctx.beginPath();

      ctx.roundRect(
        paddle.x,
        paddle.y,
        paddle.width,
        paddle.height,
        30
      );

      ctx.fill();

      ctx.shadowBlur = 0;
    }

    /* ================= POWERS ================= */

    function drawPowers() {

      powers.forEach(
        (power) => {

          power.y += 2.2;

          power.glow += 4;

          ctx.save();

          ctx.shadowBlur = 30;

          ctx.shadowColor =
            `hsl(${power.glow},100%,70%)`;

          const gradient =
            ctx.createLinearGradient(
              power.x,
              power.y,
              power.x,
              power.y +
                power.height
            );

          gradient.addColorStop(
            0,
            "#ffffff"
          );

          gradient.addColorStop(
            1,
            "#111827"
          );

          ctx.fillStyle =
            gradient;

          ctx.beginPath();

          ctx.roundRect(
            power.x,
            power.y,
            power.width,
            power.height,
            14
          );

          ctx.fill();

          ctx.fillStyle =
            "#000";

          ctx.font =
            "bold 22px Arial";

          ctx.fillText(

            power.type ===
              "double"
              ? "2X"

              : power.type ===
                "fire"
              ? "🔥"

              : power.type ===
                "bigBall"
              ? "⚽"

              : "⬅",

            power.x + 8,
            power.y + 31
          );

          ctx.restore();

          /* collision */

          if (

            power.y +
              power.height >=
              paddle.y &&

            power.x <=
              paddle.x +
                paddle.width &&

            power.x +
              power.width >=
              paddle.x

          ) {

            applyPower(
              power.type
            );

            powers =
              powers.filter(
                (p) =>
                  p !== power
              );
          }
        }
      );
    }

    /* ================= APPLY POWER ================= */

    function applyPower(
      type
    ) {

      if (
        type === "double"
      ) {

        const extra =
          balls.map(
            (b) => ({
              ...b,
              dx: -b.dx,
            })
          );

        balls = [
          ...balls,
          ...extra,
        ];
      }

      if (
        type === "fire"
      ) {

        balls.forEach(
          (b) =>
            (b.fire = true)
        );

        setTimeout(() => {

          balls.forEach(
            (b) =>
              (b.fire = false)
          );

        }, 10000);
      }

      if (
        type ===
        "bigBall"
      ) {

        balls.forEach(
          (b) =>
            (b.radius += 8)
        );
      }

      if (
        type ===
        "bigPaddle"
      ) {

        paddle.width += 90;
      }
    }

    /* ================= UPDATE ================= */

    function update() {

      if (
        !running ||
        !started
      )
        return;

      balls.forEach((ball) => {

        ball.x += ball.dx;

        ball.y += ball.dy;

        /* walls */

        if (

          ball.x <=
            ball.radius ||

          ball.x >=
            canvas.width -
              ball.radius

        ) {

          ball.dx *= -1;
        }

        if (
          ball.y <=
          ball.radius
        ) {

          ball.dy *= -1;
        }

        /* paddle */

        if (

          ball.y +
            ball.radius >=
            paddle.y &&

          ball.x >=
            paddle.x &&

          ball.x <=
            paddle.x +
              paddle.width

        ) {

          const collidePoint =
            ball.x -
            (paddle.x +
              paddle.width / 2);

          const normalized =
            collidePoint /
            (paddle.width / 2);

          const angle =
            normalized *
            (Math.PI / 3);

          ball.speed += 0.08;

          ball.dx =
            ball.speed *
            Math.sin(angle);

          ball.dy =
            -ball.speed *
            Math.cos(angle);
        }

        /* BRICK COLLISION */

        bricks.forEach(
          (brick) => {

            if (
              brick.destroyed
            )
              return;

            if (

              ball.x >
                brick.x &&

              ball.x <
                brick.x +
                  brick.width &&

              ball.y -
                ball.radius <
                brick.y +
                  brick.height &&

              ball.y +
                ball.radius >
                brick.y

            ) {

              brick.hits--;

              if (
                brick.hits <= 0
              ) {

                brick.destroyed =
                  true;

                setScore(
                  (prev) =>
                    prev + 20
                );

                createParticles(
                  brick.x +
                    brick.width /
                      2,

                  brick.y +
                    brick.height /
                      2,

                  "255,255,255"
                );

              } else {

                brick.color =
                  "#f472b6";

                createParticles(
                  brick.x +
                    brick.width /
                      2,

                  brick.y +
                    brick.height /
                      2,

                  "168,85,247"
                );
              }

              if (
                !ball.fire
              ) {

                ball.dy *= -1;
              }
            }
          }
        );

        /* GAME OVER */

        if (
          ball.y >
          canvas.height + 50
        ) {

          setGameOver(true);

          setStarted(false);

          setBestScore(
            (prev) =>
              Math.max(
                prev,
                score
              )
          );

          running = false;
        }
      });
    }

    /* ================= RENDER ================= */

    function render() {

      drawBackground();

      drawParticles();

      drawBricks();

      drawBalls();

      drawPaddle();

      drawPowers();
    }

    /* ================= LOOP ================= */

    function loop() {

      update();

      render();

      animationFrame =
        requestAnimationFrame(
          loop
        );
    }

    loop();

    /* ================= CONTROLS ================= */

    const handleMouseMove =
      (e) => {

        const rect =
          canvas.getBoundingClientRect();

        paddle.targetX =
          e.clientX -
          rect.left -
          paddle.width / 2;

        paddle.targetX =
          Math.max(
            0,
            Math.min(
              paddle.targetX,
              canvas.width -
                paddle.width
            )
          );
      };

    const handleTouchMove =
      (e) => {

        const rect =
          canvas.getBoundingClientRect();

        const touch =
          e.touches[0];

        paddle.targetX =
          touch.clientX -
          rect.left -
          paddle.width / 2;

        paddle.targetX =
          Math.max(
            0,
            Math.min(
              paddle.targetX,
              canvas.width -
                paddle.width
            )
          );
      };

    canvas.addEventListener(
      "mousemove",
      handleMouseMove
    );

    canvas.addEventListener(
      "touchmove",
      handleTouchMove
    );

    return () => {

      running = false;

      cancelAnimationFrame(
        animationFrame
      );

      canvas.removeEventListener(
        "mousemove",
        handleMouseMove
      );

      canvas.removeEventListener(
        "touchmove",
        handleTouchMove
      );
    };

  }, [started]);

  /* ================= START ================= */

  const startGame = () => {

    setScore(0);

    setGameOver(false);

    setStarted(true);
  };

  return (

    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      className="
        flex
        w-full
        flex-col
        items-center
      "
    >

      <div className="mb-5 text-center">

        <h3
          className="
            text-3xl
            font-black
            text-cyan-400

            sm:text-5xl
          "
        >
          Brick Breaker Arena
        </h3>

        <div
          className="
            mt-4
            flex
            flex-wrap
            items-center
            justify-center
            gap-3
          "
        >

          <div
            className="
              rounded-2xl
              border
              border-cyan-400/10
              bg-cyan-500/10
              px-5
              py-2
            "
          >
            <p className="text-cyan-300">
              Score: {score}
            </p>
          </div>

          <div
            className="
              rounded-2xl
              border
              border-purple-400/10
              bg-purple-500/10
              px-5
              py-2
            "
          >
            <p className="text-purple-300">
              Best: {bestScore}
            </p>
          </div>

        </div>
      </div>

      {/* GAME */}

      <div
        className="
          w-full
          flex-1
          rounded-[35px]
          border
          border-white/10
          bg-black/40
          p-2
          shadow-[0_0_100px_rgba(6,182,212,0.16)]
        "
      >

        <canvas

          ref={canvasRef}

          className="
            h-full
            w-full
            rounded-[28px]
            bg-black
          "
        />

      </div>

      <p
        className="
          mt-4
          text-center
          text-xs
          text-zinc-400

          sm:text-sm
        "
      >
        Catch powers • break bricks • survive
      </p>

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
          "
        >

          💀 Game Over

        </motion.div>
      )}

      <motion.button

        whileHover={{
          scale: 1.05,
        }}

        whileTap={{
          scale: 0.95,
        }}

        onClick={startGame}

        className="
          mt-5
          rounded-xl
          bg-cyan-500
          px-6
          py-3
          font-semibold
          text-white

          shadow-[0_0_25px_rgba(6,182,212,0.35)]
        "
      >

        {started
          ? "Playing..."
          : "Start Game"}

      </motion.button>

    </motion.div>
  );
}

/* ---------- 9) Mini Minesweeper ---------- */
function MiniMinesweeper() {

  /* ================= CONFIG ================= */

  const size = 5;

  const mineCount = 5;

  /* ================= CREATE BOARD ================= */

  const createBoard = () => {

    const board =
      Array(size)
        .fill()
        .map(() =>
          Array(size)
            .fill()
            .map(() => ({
              mine: false,
              revealed: false,
              flagged: false,
              count: 0,
            }))
        );

    /* mines */

    let placed = 0;

    while (
      placed < mineCount
    ) {

      const x =
        Math.floor(
          Math.random() * size
        );

      const y =
        Math.floor(
          Math.random() * size
        );

      if (!board[x][y].mine) {

        board[x][y].mine = true;

        placed++;
      }
    }

    /* numbers */

    for (
      let x = 0;
      x < size;
      x++
    ) {

      for (
        let y = 0;
        y < size;
        y++
      ) {

        if (board[x][y].mine)
          continue;

        let count = 0;

        for (
          let dx = -1;
          dx <= 1;
          dx++
        ) {

          for (
            let dy = -1;
            dy <= 1;
            dy++
          ) {

            const nx = x + dx;

            const ny = y + dy;

            if (
              nx >= 0 &&
              ny >= 0 &&
              nx < size &&
              ny < size &&
              board[nx][ny].mine
            ) {
              count++;
            }
          }
        }

        board[x][y].count =
          count;
      }
    }

    return board;
  };

  /* ================= STATES ================= */

  const [board, setBoard] =
    useState(createBoard);

  const [gameOver, setGameOver] =
    useState(false);

  const [won, setWon] =
    useState(false);

  const [score, setScore] =
    useState(0);

  /* ================= REVEAL ================= */

  const reveal = (x, y) => {

    if (
      gameOver ||
      won
    ) return;

    const updated =
      [...board];

    const cell =
      updated[x][y];

    if (
      cell.revealed ||
      cell.flagged
    ) return;

    cell.revealed = true;

    /* mine */

    if (cell.mine) {

      setGameOver(true);

      /* reveal all */

      updated.forEach(
        (row) =>
          row.forEach(
            (c) =>
              (c.revealed = true)
          )
      );

      gsap.fromTo(
        ".mine-board",
        { x: -8 },
        {
          x: 8,
          duration: 0.08,
          repeat: 5,
          yoyo: true,
        }
      );

    } else {

      setScore(
        (prev) => prev + 10
      );

      /* empty flood */

      if (cell.count === 0) {

        floodReveal(
          updated,
          x,
          y
        );
      }

      gsap.fromTo(
        ".mine-board",
        { scale: 1 },
        {
          scale: 1.01,
          duration: 0.08,
          repeat: 1,
          yoyo: true,
        }
      );
    }

    setBoard([...updated]);

    /* win */

    const safeCells =
      updated.flat().filter(
        (c) =>
          !c.mine &&
          c.revealed
      ).length;

    if (
      safeCells ===
      size * size - mineCount
    ) {

      setWon(true);
    }
  };

  /* ================= FLOOD ================= */

  const floodReveal = (
    board,
    x,
    y
  ) => {

    for (
      let dx = -1;
      dx <= 1;
      dx++
    ) {

      for (
        let dy = -1;
        dy <= 1;
        dy++
      ) {

        const nx = x + dx;

        const ny = y + dy;

        if (
          nx >= 0 &&
          ny >= 0 &&
          nx < size &&
          ny < size
        ) {

          const cell =
            board[nx][ny];

          if (
            !cell.revealed &&
            !cell.mine
          ) {

            cell.revealed = true;

            if (
              cell.count === 0
            ) {

              floodReveal(
                board,
                nx,
                ny
              );
            }
          }
        }
      }
    }
  };

  /* ================= FLAG ================= */

  const toggleFlag = (
    e,
    x,
    y
  ) => {

    e.preventDefault();

    if (
      gameOver ||
      won
    ) return;

    const updated =
      [...board];

    const cell =
      updated[x][y];

    if (!cell.revealed) {

      cell.flagged =
        !cell.flagged;

      setBoard([...updated]);
    }
  };

  /* ================= RESET ================= */

  const reset = () => {

    setBoard(createBoard());

    setGameOver(false);

    setWon(false);

    setScore(0);
  };

  /* ================= COLORS ================= */

  const numberColors = {

    1: "#3b82f6",
    2: "#22c55e",
    3: "#ef4444",
    4: "#8b5cf6",
    5: "#f97316",
    6: "#06b6d4",
    7: "#ec4899",
    8: "#eab308",
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

      {/* GLOW */}

      <div
        className="
          absolute
          inset-0
          -z-10
          rounded-full
          bg-red-500/10
          blur-3xl
        "
      />

      {/* TOP */}

      <div className="mb-5 text-center">

        <h3
          className="
            text-2xl
            font-black
            text-red-400

            sm:text-3xl
          "
        >
          Mini Minesweeper
        </h3>

        {/* SCORE */}

        <div
          className="
            mt-3
            rounded-2xl
            border
            border-red-400/10
            bg-red-500/10
            px-5
            py-2
            backdrop-blur-xl
          "
        >

          <p
            className="
              text-sm
              font-medium
              text-red-300
            "
          >
            Score: {score}
          </p>

        </div>
      </div>

      {/* BOARD */}

      <div
        className="
          mine-board

          grid
          grid-cols-5
          gap-2

          rounded-[28px]

          border
          border-white/10

          bg-white/[0.04]

          p-4

          backdrop-blur-2xl

          shadow-[0_0_60px_rgba(239,68,68,0.16)]

          w-full
          max-w-[340px]

          sm:max-w-[430px]
        "
      >

        {board.map(
          (row, i) =>
            row.map(
              (cell, j) => {

                return (

                  <motion.button

                    key={`${i}-${j}`}

                    whileHover={{
                      scale: 1.04,
                    }}

                    whileTap={{
                      scale: 0.94,
                    }}

                    onClick={() =>
                      reveal(i, j)
                    }

                    onContextMenu={(
                      e
                    ) =>
                      toggleFlag(
                        e,
                        i,
                        j
                      )
                    }

                    className="
                      aspect-square
                      w-full

                      rounded-xl

                      border
                      border-white/10

                      text-sm
                      font-black

                      sm:text-lg
                    "

                    style={{

                      background:

                        cell.revealed

                          ? cell.mine

                            ? "linear-gradient(135deg,#ef4444,#dc2626)"

                            : "rgba(255,255,255,0.08)"

                          : "linear-gradient(135deg,#1e293b,#0f172a)",

                      color:
                        numberColors[
                          cell.count
                        ] || "#fff",

                      boxShadow:

                        cell.mine &&
                        cell.revealed

                          ? "0 0 25px rgba(239,68,68,0.45)"

                          : "none",
                    }}
                  >

                    {cell.revealed ? (

                      cell.mine

                        ? "💣"

                        : cell.count ||
                          ""

                    ) : cell.flagged ? (

                      "🚩"

                    ) : (

                      "?"
                    )}

                  </motion.button>
                );
              }
            )
        )}
      </div>

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

          💀 Boom! You hit a mine

        </motion.div>
      )}

      {/* WIN */}

      {won && (

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
            border-green-400/20
            bg-green-500/10
            px-5
            py-3
            text-green-300
            backdrop-blur-xl
          "
        >

          🎉 You Cleared The Minefield

        </motion.div>
      )}

      {/* BUTTON */}

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
          bg-red-500
          px-5
          py-2
          text-sm
          font-semibold
          text-white

          shadow-[0_0_25px_rgba(239,68,68,0.35)]

          sm:text-base
        "
      >

        Restart

      </motion.button>

      {/* INFO */}

      <p
        className="
          mt-4
          text-center
          text-xs
          text-zinc-400

          sm:text-sm
        "
      >
        Right click / long press
        to place 🚩 flags
      </p>

    </motion.div>
  );
}

export default PortfolioGamesComponent;
