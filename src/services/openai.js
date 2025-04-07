import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export const generatePickupLine = async (location, situation, style) => {
  try {
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
    console.error('Error generating pickup line:', error);
    throw error;
  }
};