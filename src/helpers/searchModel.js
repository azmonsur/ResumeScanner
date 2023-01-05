import { Configuration, OpenAIApi } from "openai";

const searchModel = async (prompt, text) => {
  const configuration = new Configuration({
    apiKey: process.env.REACT_APP_OPENAI_KEY,
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
