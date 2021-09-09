type Series = {
  id: number;
  title: string;
  anchor: string; // For navigation links
  chapters: Chapter[];
};

type Chapter = {
  id: number;
  title: string;
  path: string;
  articleNum: number;
};

// For each series and chapter, `id` is the same as the corresponding index
const allSeries: Series[] = [
  {
    id: 0,
    title: "長篇小說",
    anchor: "novel",
    chapters: [
      {
        id: 0,
        title: "一、豢養之章（完結）",
        path: "novel/chapter-1",
        articleNum: 21,
      },
      {
        id: 1,
        title: "二、掠食之章（完結）",
        path: "novel/chapter-2",
        articleNum: 18,
      },
      {
        id: 2,
        title: "三、牧與獵之章",
        path: "novel/chapter-3",
        articleNum: 4,
      },
    ],
  },
  {
    id: 1,
    title: "短篇小說",
    anchor: "short-story",
    chapters: [
      {
        id: 0,
        title: "短篇小說",
        path: "short-story",
        articleNum: 6,
      },
    ],
  },
  {
    id: 2,
    title: "極短篇小說",
    anchor: "flash-fiction",
    chapters: [
      {
        id: 0,
        title: "極短篇小說",
        path: "flash-fiction",
        articleNum: 14,
      },
    ],
  },
  {
    id: 3,
    title: "七號圖書館",
    anchor: "seven-library",
    chapters: [
      {
        id: 0,
        title: "七號圖書館",
        path: "seven-library",
        articleNum: 3,
      },
    ],
  },
];

export default allSeries;
