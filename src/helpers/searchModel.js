import { Configuration, OpenAIApi } from "openai";

const searchModel = async (prompt, text) => {
  const configuration = new Configuration({
    apiKey: "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",
  });
  const openai = new OpenAIApi(configuration);

  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `${prompt}: \n\n\n${text}`,
    temperature: 0.5,
    max_tokens: 60,
    top_p: 1,
    frequency_penalty: 0.8,
    presence_penalty: 0,
  });

  // console.log("from openai", )
  return response.data.choices[0].text;
};

export default searchModel;
