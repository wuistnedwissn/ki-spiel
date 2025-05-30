import { useState } from "react";
import { motion } from "framer-motion";

const trainingData = [
  { text: "Hat Schnurrhaare, miaut", category: "Katze" },
  { text: "Bellt, liebt Stöckchen", category: "Hund" },
  { text: "Jagt Mäuse, schnurrt", category: "Katze" },
  { text: "Bringt Zeitung, bellt", category: "Hund" },
];

const testData = [
  { text: "Miaut, schläft auf der Fensterbank", correct: "Katze" },
  { text: "Wird gern Gassi geführt", correct: "Hund" },
  { text: "Leckt sich das Fell", correct: "Katze" },
  { text: "Rennt dem Ball hinterher", correct: "Hund" },
];

export default function KISpiel() {
  const [phase, setPhase] = useState("intro");
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);

  const handleChoice = (choice: string) => {
    const isCorrect = choice === testData[index].correct;
    if (isCorrect) setScore(score + 1);
    if (index + 1 < testData.length) {
      setIndex(index + 1);
    } else {
      setPhase("result");
    }
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "600px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "2rem", textAlign: "center" }}>Du bist die KI!</h1>

      {phase === "intro" && (
        <div style={{ textAlign: "center" }}>
          <p>Du bekommst Trainingsdaten und sollst neue Beispiele klassifizieren – wie eine KI!</p>
          <button onClick={() => setPhase("train")}>Training starten</button>
        </div>
      )}

      {phase === "train" && (
        <div>
          <h2>Trainingsdaten</h2>
          {trainingData.map((item, i) => (
            <div key={i}>{item.text} → <strong>{item.category}</strong></div>
          ))}
          <button onClick={() => setPhase("test")}>Zum Test</button>
        </div>
      )}

      {phase === "test" && (
        <div>
          <h2>Teste dich!</h2>
          <div>{testData[index].text}</div>
          <button onClick={() => handleChoice("Katze")}>Katze</button>
          <button onClick={() => handleChoice("Hund")}>Hund</button>
        </div>
      )}

      {phase === "result" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h2>Auswertung</h2>
          <p>Du hast {score} von {testData.length} richtig!</p>
          <button onClick={() => {
            setPhase("intro");
            setIndex(0);
            setScore(0);
          }}>Nochmal spielen</button>
        </motion.div>
      )}
    </div>
  );
}
