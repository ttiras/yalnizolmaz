import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");
  const type = searchParams.get("type") || "track"; // track, album, artist, playlist
  const limit = searchParams.get("limit") || "20";

  if (!query) {
    return NextResponse.json({ error: "Query parameter 'q' is required" }, { status: 400 });
  }

  try {
    // Using Spotify API
    const clientId = process.env.SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
      return NextResponse.json({ error: "Spotify API credentials not configured" }, { status: 500 });
    }

    // Get access token
    const tokenResponse = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`,
      },
      body: "grant_type=client_credentials",
    });

    if (!tokenResponse.ok) {
      throw new Error(`Spotify token error: ${tokenResponse.status}`);
    }

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    // Search for music
    const searchResponse = await fetch(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=${type}&limit=${limit}&market=TR`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!searchResponse.ok) {
      throw new Error(`Spotify search error: ${searchResponse.status}`);
    }

    const searchData = await searchResponse.json();

    let results = [];
    if (type === "track") {
      results = searchData.tracks?.items?.map((track: any) => ({
        id: track.id,
        name: track.name,
        artists: track.artists.map((artist: any) => ({
          id: artist.id,
          name: artist.name,
        })),
        album: {
          id: track.album.id,
          name: track.album.name,
          images: track.album.images,
          releaseDate: track.album.release_date,
        },
        duration: track.duration_ms,
        popularity: track.popularity,
        previewUrl: track.preview_url,
        externalUrls: track.external_urls,
        explicit: track.explicit,
        trackNumber: track.track_number,
        discNumber: track.disc_number,
      })) || [];
    } else if (type === "album") {
      results = searchData.albums?.items?.map((album: any) => ({
        id: album.id,
        name: album.name,
        artists: album.artists.map((artist: any) => ({
          id: artist.id,
          name: artist.name,
        })),
        images: album.images,
        releaseDate: album.release_date,
        totalTracks: album.total_tracks,
        albumType: album.album_type,
        popularity: album.popularity,
        externalUrls: album.external_urls,
        genres: album.genres,
      })) || [];
    } else if (type === "artist") {
      results = searchData.artists?.items?.map((artist: any) => ({
        id: artist.id,
        name: artist.name,
        images: artist.images,
        popularity: artist.popularity,
        genres: artist.genres,
        externalUrls: artist.external_urls,
        followers: artist.followers,
      })) || [];
    }

    return NextResponse.json({
      results,
      total: searchData[`${type}s`]?.total || 0,
      hasMore: searchData[`${type}s`]?.next ? true : false,
    });
  } catch (error) {
    console.error("Music search error:", error);
    return NextResponse.json(
      { error: "Failed to search music" },
      { status: 500 }
    );
  }
}
