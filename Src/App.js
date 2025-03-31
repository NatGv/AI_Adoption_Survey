import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { motion } from 'framer-motion';
import { Line } from 'recharts';
import { LineChart, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

const questions = [
  {
    question: "📱 באיזו תדירות את/ה משתמש/ת בכלי AI בעבודה היומיומית שלך?",
    options: [
      "כמעט תמיד (יותר מפעם ביום)",
      "לעיתים קרובות (מספר פעמים בשבוע)",
      "לעיתים רחוקות (פעם בשבוע או פחות)",
      "כמעט אף פעם"
    ]
  },
  {
    question: "💡 עד כמה את/ה מרגיש/ה בנוח להשתמש בכלי AI כדי לשפר את הביצועים שלך?",
    options: ["מאוד בנוח", "די בנוח", "קצת לא בנוח", "מאוד לא בנוח"]
  },
  {
    question: "🧠 באיזו מידה את/ה רואה את כלי ה-AI כחלק חיוני מהתפקיד שלך?",
    options: ["בלתי ניתן להחלפה", "עוזר משמעותית", "שימושי לפעמים", "לא משמעותי"]
  },
  {
    question: "🔍 עד כמה את/ה מרגיש/ה שיש לך את הידע והמיומנויות הדרושים כדי לעבוד עם AI?",
    options: ["ידע מצוין", "ידע טוב", "ידע בסיסי בלבד", "אין לי כמעט ידע"]
  },
  {
    question: "📈 כמה את/ה פתוח/ה ללמוד עוד על כלים וטכנולוגיות AI?",
    options: ["מאוד פתוח/ה", "די פתוח/ה", "פתוח/ה במידה מסוימת", "לא פתוח/ה"]
  }
];

const App = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [progressData, setProgressData] = useState([]);

  const handleAnswer = (index) => {
    const newScore = score + (4 - index);
    setScore(newScore);

    setProgressData([...progressData, { question: `שאלה ${currentQuestion + 1}`, score: newScore }]);

    if (currentQuestion + 1 === questions.length) {
      setFinished(true);
    } else {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-blue-200 p-4">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        <Card className="w-full max-w-xl p-6 mb-4 shadow-2xl rounded-2xl">
          <CardContent>
            {finished ? (
              <div className="text-center">
                <h2 className="text-3xl font-bold mb-4">✨ סיכום</h2>
                <p className="mb-2 text-lg">רמת השימוש והאימוץ שלך ב-AI היא: {Math.round((score / (questions.length * 4)) * 100)}%</p>
                <Progress value={(score / (questions.length * 4)) * 100} className="mb-4" />

                <LineChart width={400} height={200} data={progressData} className="mx-auto mb-4">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="question" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="score" stroke="#8884d8" />
                </LineChart>

                <p className="text-md">📢 מומלץ להירשם לסדנאות בתוכנית כדי להרחיב את הידע ולשפר את המיומנויות שלך בתחום ה-AI! 🚀</p>
              </div>
            ) : (
              <div>
                <h2 className="text-2xl mb-4 font-semibold">{questions[currentQuestion].question}</h2>
                {questions[currentQuestion].options.map((option, index) => (
                  <Button key={index} className="w-full mb-2 transition-transform transform hover:scale-105" onClick={() => handleAnswer(index)}>
                    {option}
                  </Button>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default App;
