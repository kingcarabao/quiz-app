const createPath = (root: string, path: string) => `${root}${path}`;

const ROOT_CLIENT = "/";

const paths = {
  admin: {},
  client: [
    {
      label: "Dashboard",
      url: createPath(ROOT_CLIENT, "quiz"),
    },
    {
      label: "Quiz Sets",
      url: createPath(ROOT_CLIENT, "quiz-set"),
    },
  ],
};

export default paths;
