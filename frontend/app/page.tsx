"use client";

import { useState } from "react";

export default function Home() {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setPdfFile(file);
  };

  const handleSubmit = async () => {
    if (!pdfFile || !question) {
      alert("PDFファイルと質問を入力してください。");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("file", pdfFile);
    formData.append("question", question); // questionをFormDataに含める

    try {
      const response = await fetch("http://localhost:8000/ask-pdf/", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(`エラー: ${errorData.detail || "不明なエラー"}`);
        throw new Error("サーバーからエラーが返されました。");
      }

      const data = await response.json();
      setAnswer(data.answer || "回答が見つかりませんでした。");
    } catch (error) {
      console.error(error);
      alert("エラーが発生しました。もう一度試してください。");
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">PDF知識ベース質問応答システム</h1>
      <div className="mb-4">
        <label htmlFor="pdf-file" className="block mb-2">
          PDFファイルを選択:
        </label>
        <input
          type="file"
          id="pdf-file"
          accept="application/pdf"
          onChange={handleFileChange}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="question" className="block mb-2">
          質問を入力:
        </label>
        <input
          type="text"
          id="question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="border rounded px-2 py-1 w-full"
          placeholder="質問を入力してください"
        />
      </div>
      <button
        onClick={handleSubmit}
        disabled={loading}
        className={`px-4 py-2 rounded ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-600"}`}
      >
        {loading ? "送信中..." : "質問する"}
      </button>
      {answer && (
        <div className="mt-6 border-t pt-4">
          <h2 className="text-xl font-semibold">回答:</h2>
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
}
