type Series = {
  id: number;
  title: string;
  chapters: Chapter[];
};

type Chapter = {
  id: number;
  path: string;
  articleNum: number;
};

const allSeries: Series[] = [
  {
    id: 2,
    title: "短篇小說",
    chapters: [
      {
        id: 1,
        path: "short-story",
        articleNum: 6,
      },
    ],
  },
  {
    id: 3,
    title: "極短篇小說",
    chapters: [
      {
        id: 1,
        path: "flash-fiction",
        articleNum: 14,
      },
    ],
  },
  {
    id: 4,
    title: "七號圖書館",
    chapters: [
      {
        id: 1,
        path: "seven-library",
        articleNum: 3,
      },
    ],
  },
];

export default allSeries;
