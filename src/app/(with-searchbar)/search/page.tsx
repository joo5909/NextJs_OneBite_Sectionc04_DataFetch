import BookItem from "@/components/book-item";
import { BookData } from "@/types";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{
    q?: string;
  }>;
}) {
  const { q: query } = await searchParams;

  if (!query) {
    return <div>검색어를 입력해주세요.</div>;
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/search?q=${query}`,
    { cache: 'force-cache' }
  );

  if (!response.ok) {
    throw new Error("검색 결과를 가져오는데 실패했습니다.");
  }

  const books: BookData[] = await response.json();

  if (books.length === 0) {
    return <div>검색 결과가 없습니다.</div>;
  }

  return (
    <div>
      <div>
        {books.map((book) => (
          <BookItem key={book.id} {...book} />
        ))}
      </div>
    </div>
  );
}
