const ROUTES = {
  HOME: "/",
  SIGN_IN: "/sign-in",
  SIGN_UP: "/sign-up",
  QUESTION: (_id: string) => `/questions/${_id}`,
  TAG: (_id: string) => `/tags/${_id}`,
  ASK_QUESTION: "/ask-quertion",
};
export default ROUTES;
