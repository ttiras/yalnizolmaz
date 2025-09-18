import { Card, CardContent } from "@/components/ui/card";
import UserAvatar from "@/components/UserAvatar";
import { MapPin, Globe, Mail, Calendar } from "lucide-react";

type UserProfile = {
  user_id: string;
  bio?: string | null;
  location?: string | null;
  website?: string | null;
  created_at?: string;
  updated_at?: string;
};

type SessionUser = {
  id: string;
  email?: string | null;
  displayName?: string | null;
  avatarUrl?: string | null;
};

type ProfilePageProps = {
  user: SessionUser;
  profile: UserProfile | null;
  counts?: {
    posts: number;
    blogComments: number;
    postComments: number;
    likes: number;
    contributions: number;
  };
};

export default function ProfilePage({ user, profile, counts }: ProfilePageProps) {
  const displayName = user.displayName || "Kullanıcı";
  const bio = profile?.bio || "Henüz bir biyografi eklenmemiş.";
  const location = profile?.location;
  const website = profile?.website;
  const avatarUrl = user.avatarUrl;
  const email = user.email;

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
            <div className="flex-shrink-0 sm:order-last sm:ml-auto">
              <UserAvatar
                src={avatarUrl}
                name={displayName}
                email={email}
                size={120}
                className="border-background border-4 shadow-lg"
              />
            </div>
            <div className="flex-1 space-y-3">
              <div>
                <h1 className="text-foreground text-3xl font-bold">{displayName}</h1>
                {email && (
                  <div className="text-muted-foreground mt-1 flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    <span>{email}</span>
                  </div>
                )}
              </div>
              <p className="text-muted-foreground leading-relaxed">{bio}</p>
              {typeof counts !== "undefined" && (
                <div className="text-muted-foreground flex items-center gap-2 text-xs whitespace-nowrap">
                  <span>
                    <strong>{counts?.posts ?? 0}</strong> Yazı
                  </span>
                  <span className="opacity-50">•</span>
                  <span>
                    <strong>{(counts?.blogComments ?? 0) + (counts?.postComments ?? 0)}</strong>{" "}
                    Yorum
                  </span>
                  <span className="opacity-50">•</span>
                  <span>
                    <strong>{counts?.likes ?? 0}</strong> Beğeni
                  </span>
                  <span className="opacity-50">•</span>
                  <span>
                    <strong>{counts?.contributions ?? 0}</strong> Katkı
                  </span>
                </div>
              )}
              <div className="text-muted-foreground flex flex-wrap items-center gap-4 text-sm">
                {location && (
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span>{location}</span>
                  </div>
                )}
                {website && (
                  <div className="flex items-center gap-1">
                    <Globe className="h-4 w-4" />
                    <a
                      href={website.startsWith("http") ? website : `https://${website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-foreground transition-colors"
                    >
                      {website}
                    </a>
                  </div>
                )}
                {profile?.created_at && (
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>
                      {new Date(profile.created_at).toLocaleDateString("tr-TR", {
                        year: "numeric",
                        month: "long",
                      })}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
