import OpenAI from 'openai';

const getOpenAIInstance = () => {
  const apiKey = localStorage.getItem('openai_api_key');
  if (!apiKey) {
    throw new Error('OpenAI API key not found. Please set your API key in settings.');
  }
  
  return new OpenAI({
    apiKey: apiKey,
    dangerouslyAllowBrowser: true
  });
};

export const generatePickupLine = async (location, situation, style) => {
  try {
    const openai = getOpenAIInstance();
    
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a creative pickup line generator. Generate a pickup line that is appropriate for the given location, situation, and style."
        },
        {
          role: "user",
          content: `Generate a ${style} pickup line for someone at a ${location} in this situation: ${situation}`
        }
      ],
      max_tokens: 100,
      temperature: 0.7
    });

    return response.choices[0].message.content.trim();
  } catch (error) {
    if (error.message.includes('API key')) {
      throw new Error('Please set your OpenAI API key in settings to generate AI pickup lines.');
    }
    console.error('Error generating pickup line:', error);
    throw error;
  }
};