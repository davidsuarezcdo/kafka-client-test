import safeEval from "safe-eval";
export const parseJson = (jsonStr: string) => {
  try {
    return JSON.parse(jsonStr);
  } catch (error) {
    return;
  }
};

export const parseJsObject = (input: string) => {
  try {
    return safeEval(`(${input})`);
  } catch (e) {
    return;
  }
};
