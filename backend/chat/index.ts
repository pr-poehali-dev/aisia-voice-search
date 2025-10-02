/**
 * Business: AI chat assistant with OpenAI integration
 * Args: event with httpMethod, body containing user message and language
 * Returns: HTTP response with AI assistant reply
 */

exports.handler = async (event, context) => {
  const { httpMethod } = event;

  if (httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Max-Age': '86400',
      },
      body: '',
    };
  }

  if (httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        error: 'OpenAI API key not configured',
      }),
    };
  }

  const body = JSON.parse(event.body || '{}');
  const { message, language = 'ru-RU', history = [] } = body;

  if (!message) {
    return {
      statusCode: 400,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ error: 'Message is required' }),
    };
  }

  const systemPrompts = {
    'ru-RU': 'Ты Аиси - дружелюбный женский голосовой помощник. Отвечай кратко, по-дружески и естественно, как живой человек. Используй эмодзи где уместно.',
    'en-US': 'You are Aisi - a friendly female voice assistant. Answer briefly, friendly and naturally, like a real person. Use emojis where appropriate.',
    'pt-BR': 'Você é Aisi - uma assistente de voz feminina amigável. Responda brevemente, de forma amigável e natural, como uma pessoa real. Use emojis quando apropriado.',
    'fr-FR': 'Vous êtes Aisi - une assistante vocale féminine amicale. Répondez brièvement, amicalement et naturellement, comme une vraie personne. Utilisez des emojis si approprié.',
    'es-ES': 'Eres Aisi - una asistente de voz femenina amigable. Responde brevemente, amigablemente y naturalmente, como una persona real. Usa emojis cuando sea apropiado.',
    'de-DE': 'Du bist Aisi - eine freundliche weibliche Sprachassistentin. Antworte kurz, freundlich und natürlich, wie eine echte Person. Verwende Emojis, wo es angebracht ist.',
    'it-IT': 'Sei Aisi - un assistente vocale femminile amichevole. Rispondi brevemente, amichevolmente e naturalmente, come una persona reale. Usa emoji dove appropriato.',
    'ja-JP': 'あなたはAisiです - フレンドリーな女性音声アシスタント。短く、フレンドリーで自然に、本物の人間のように答えてください。適切な場所で絵文字を使用してください。',
    'zh-CN': '你是Aisi - 一个友好的女性语音助手。简短、友好、自然地回答，像真人一样。在适当的地方使用表情符号。',
  };

  const messages = [
    {
      role: 'system',
      content: systemPrompts[language] || systemPrompts['ru-RU'],
    },
    ...history.slice(-10).map((msg) => ({
      role: msg.role,
      content: msg.content,
    })),
    {
      role: 'user',
      content: message,
    },
  ];

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages,
        temperature: 0.8,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('OpenAI API error:', error);
      return {
        statusCode: response.status,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
          error: 'Failed to get AI response',
        }),
      };
    }

    const data = await response.json();
    const reply = data.choices[0]?.message?.content || 'Извините, я не смогла сформировать ответ.';

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      isBase64Encoded: false,
      body: JSON.stringify({
        reply,
        requestId: context.requestId,
      }),
    };
  } catch (error) {
    console.error('Error calling OpenAI:', error);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        error: 'Internal server error',
        message: error.message,
      }),
    };
  }
};