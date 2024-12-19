# app/openai_utils.py

import openai
import os
from dotenv import load_dotenv

# .envファイルを読み込む
load_dotenv()

# OpenAI APIキーを環境変数から取得
openai.api_key = os.getenv("OPENAI_API_KEY")

def get_answer_from_openai(extracted_text: str, question: str) -> str:
    """OpenAI APIを使用して質問に対する回答を取得"""
    try:
        # OpenAI Chat APIを使用して質問と回答を行う
        response = openai.ChatCompletion.create(
            model="gpt-4o-mini",  # 新しいモデルを使用
            messages=[
                {"role": "system", "content": "あなたは有能なアシスタントです。"},
                {"role": "user", "content": f"質問: {question}\nテキスト: {extracted_text}"}
            ],
            max_tokens=100,
            temperature=0.5
        )
        
        # 回答を返す
        return response['choices'][0]['message']['content'].strip()
    
    except Exception as e:
        raise Exception(f"OpenAI APIエラー: {str(e)}")
