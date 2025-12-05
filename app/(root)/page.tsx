import HomeFilter from "@/components/filters/HomeFilter";
import LocalSearch from "@/components/search/LocalSearch";
import { Button } from "@/components/ui/button";
import ROUTES from "@/constants/routes";
import Image from "next/image";
import Link from "next/link";
const questions = [
  {
    _id: "1",
    title: "How to Learn React?",
    description: "I want to learn react in a very simple way",
    tags: [
      { _id: "1", name: "react" },
      { _id: "2", name: "javascript" },
    ],
    author: { _id: "1", name: "rala" },
    createdAt: new Date(),
    upVote: 100,
    answers: 50,
    views: 300,
  },
  {
    _id: "2",
    title: "How to Learn JavaScript?",
    description: "I want to learn javascript in a very simple way",
    tags: [
      { _id: "1", name: "js" },
      { _id: "2", name: "javascript" },
    ],
    author: { _id: "1", name: "rala" },
    createdAt: new Date(),
    upVote: 100,
    answers: 50,
    views: 500,
  },
];
interface SeachParams {
  searchParams: Promise<{ [key: string]: string }>;
}
//! in Server Component we can access search paras as props
export default async function Home({ searchParams }: SeachParams) {
  const { query = "", filter = "" } = await searchParams;
  const filterdQuestions = questions.filter((question) => {
    const matchQuery = question.title
      .toLowerCase()
      .includes(query.toLowerCase());
    const matchFilter = question.title
      .toLowerCase()
      .includes(filter.toLowerCase());
    return matchQuery && matchFilter;
  });
  return (
    <>
      <section className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>
        <Button
          className="primary-gradient text-light-900! min-h-[46px] px-4 py-3"
          asChild
        >
          <Link href={ROUTES.ASK_QUESTION} className="max-sm:w-full">
            Ask a Question
          </Link>
        </Button>
      </section>
      <section className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearch
          placeholder="Seach For ..."
          route="/"
          imgSrc="/icons/search.svg"
          otherClasses="flex-1"
        />
      </section>
      <HomeFilter />
      <div className="mt-11 flex flex-col gap-6 w-full">
        {filterdQuestions.map((question) => (
          <p key={question._id}>{question.title}</p>
        ))}
      </div>
    </>
  );
}
