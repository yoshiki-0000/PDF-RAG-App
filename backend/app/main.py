# app/main.py

from fastapi import FastAPI, File, UploadFile, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from app.pdf_utils import extract_text_from_pdf
from app.openai_utils import get_answer_from_openai

app = FastAPI()

# CORS設定
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 許可するオリジンを設定
    allow_credentials=True,
    allow_methods=["*"],  # 許可するHTTPメソッドを設定
    allow_headers=["*"],  # 許可するヘッダーを設定
)

@app.post("/extract-pdf/")
async def extract_pdf(file: UploadFile = File(...)):
    """PDFファイルからテキストを抽出"""
    try:
        pdf_file = await file.read()
        extracted_text = extract_text_from_pdf(pdf_file)
        return {"extracted_text": extracted_text[:1000]}  # 最初の1000文字を返す
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"PDF処理エラー: {str(e)}")

@app.post("/ask-pdf/")
async def ask_pdf(file: UploadFile = File(...), question: str = Form(...)):
    """PDFファイルを質問と一緒に送信し、質問に対する回答を取得"""
    try:
        pdf_file = await file.read()
        extracted_text = extract_text_from_pdf(pdf_file)
        answer = get_answer_from_openai(extracted_text, question)
        return {"question": question, "answer": answer}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"質問処理中にエラーが発生しました: {str(e)}")
