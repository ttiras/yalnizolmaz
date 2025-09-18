import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");
  const page = searchParams.get("page") || "1";
  const maxResults = searchParams.get("maxResults") || "10";

  if (!query) {
    return NextResponse.json({ error: "Query parameter 'q' is required" }, { status: 400 });
  }

  try {
    // Using Google Books API (free)
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&startIndex=${(parseInt(page) - 1) * parseInt(maxResults)}&maxResults=${maxResults}&langRestrict=tr`,
    );

    if (!response.ok) {
      throw new Error(`Google Books API error: ${response.status}`);
    }

    const data = await response.json();

    const books =
      data.items?.map(
        (item: {
          id: string;
          volumeInfo: {
            title: string;
            authors?: string[];
            publisher?: string;
            publishedDate?: string;
            description?: string;
            pageCount?: number;
            categories?: string[];
            averageRating?: number;
            ratingsCount?: number;
            imageLinks?: {
              thumbnail?: string;
              smallThumbnail?: string;
            };
            industryIdentifiers?: Array<{
              type: string;
              identifier: string;
            }>;
            previewLink?: string;
            infoLink?: string;
            language?: string;
          };
        }) => {
          const volumeInfo = item.volumeInfo;
          return {
            id: item.id,
            title: volumeInfo.title,
            authors: volumeInfo.authors || [],
            publisher: volumeInfo.publisher,
            publishedDate: volumeInfo.publishedDate,
            year: volumeInfo.publishedDate
              ? new Date(volumeInfo.publishedDate).getFullYear()
              : null,
            description: volumeInfo.description,
            pageCount: volumeInfo.pageCount,
            categories: volumeInfo.categories || [],
            averageRating: volumeInfo.averageRating,
            ratingsCount: volumeInfo.ratingsCount,
            imageUrl:
              volumeInfo.imageLinks?.thumbnail || volumeInfo.imageLinks?.smallThumbnail || null,
            previewUrl: volumeInfo.previewLink,
            infoUrl: volumeInfo.infoLink,
            isbn:
              volumeInfo.industryIdentifiers?.find(
                (id: { type: string; identifier: string }) => id.type === "ISBN_13",
              )?.identifier ||
              volumeInfo.industryIdentifiers?.find(
                (id: { type: string; identifier: string }) => id.type === "ISBN_10",
              )?.identifier,
            language: volumeInfo.language,
          };
        },
      ) || [];

    return NextResponse.json({
      books,
      totalItems: data.totalItems,
      hasMore: data.items && data.items.length === parseInt(maxResults),
    });
  } catch (error) {
    console.error("Book search error:", error);
    return NextResponse.json({ error: "Failed to search books" }, { status: 500 });
  }
}
