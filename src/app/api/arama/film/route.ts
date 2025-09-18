import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");
  const page = searchParams.get("page") || "1";

  if (!query) {
    return NextResponse.json({ error: "Query parameter 'q' is required" }, { status: 400 });
  }

  try {
    // Using TMDB API for movie search (free and reliable)
    const apiKey = process.env.TMDB_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "TMDB API key not configured" }, { status: 500 });
    }

    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(query)}&page=${page}&language=tr-TR&include_adult=false`,
    );

    if (!response.ok) {
      throw new Error(`TMDB API error: ${response.status}`);
    }

    const data = await response.json();

    const movies = data.results.map(
      (movie: {
        id: number;
        title: string;
        original_title: string;
        release_date: string;
        overview: string;
        poster_path: string | null;
        backdrop_path: string | null;
        vote_average: number;
        vote_count: number;
        imdb_id: string | null;
      }) => ({
        id: movie.id,
        title: movie.title,
        originalTitle: movie.original_title,
        year: movie.release_date ? new Date(movie.release_date).getFullYear() : null,
        overview: movie.overview,
        posterUrl: movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : null,
        backdropUrl: movie.backdrop_path
          ? `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`
          : null,
        rating: movie.vote_average,
        voteCount: movie.vote_count,
        sourceUrl: `https://www.themoviedb.org/movie/${movie.id}`,
        imdbId: movie.imdb_id,
      }),
    );

    return NextResponse.json({
      movies,
      totalPages: data.total_pages,
      totalResults: data.total_results,
      page: data.page,
    });
  } catch (error) {
    console.error("Movie search error:", error);
    return NextResponse.json({ error: "Failed to search movies" }, { status: 500 });
  }
}
