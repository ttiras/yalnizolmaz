import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import UserAvatar from "@/components/UserAvatar";
import { CalendarDays, MapPin, Globe, Edit, Mail } from "lucide-react";
import Link from "next/link";

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
};

export default function ProfilePage({ user, profile }: ProfilePageProps) {
  const displayName = user.displayName || "Kullanıcı";
  const bio = profile?.bio || "Henüz bir biyografi eklenmemiş.";
  const location = profile?.location;
  const website = profile?.website;
  const avatarUrl = user.avatarUrl;
  const email = user.email;

  const formatDate = (dateString?: string) => {
    if (!dateString) return null;
    return new Date(dateString).toLocaleDateString("tr-TR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <div className="space-y-6">
        {/* Header Card */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col gap-6 sm:flex-row">
              <div className="flex-shrink-0">
                <UserAvatar
                  src={avatarUrl}
                  name={displayName}
                  email={email}
                  size={120}
                  className="border-background border-4 shadow-lg"
                />
              </div>
              <div className="flex-1 space-y-4">
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

                <div className="text-muted-foreground flex flex-wrap gap-4 text-sm">
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
                </div>
              </div>

              <div className="flex-shrink-0">
                <Button asChild>
                  <Link href="/profil/duzenle">
                    <Edit className="mr-2 h-4 w-4" />
                    Düzenle
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Profile Information */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Account Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Hesap Bilgileri</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-muted-foreground text-sm font-medium">E-posta</label>
                <p className="text-sm">{email || "Belirtilmemiş"}</p>
              </div>

              <Separator />

              <div>
                <label className="text-muted-foreground text-sm font-medium">Kullanıcı ID</label>
                <p className="text-muted-foreground font-mono text-sm">{user.id}</p>
              </div>

              {profile?.created_at && (
                <>
                  <Separator />
                  <div>
                    <label className="text-muted-foreground text-sm font-medium">
                      Üyelik Tarihi
                    </label>
                    <div className="flex items-center gap-2 text-sm">
                      <CalendarDays className="h-4 w-4" />
                      <span>{formatDate(profile.created_at)}</span>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Profile Statistics */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Profil İstatistikleri</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-foreground text-2xl font-bold">0</div>
                  <div className="text-muted-foreground text-sm">Yazı</div>
                </div>
                <div className="text-center">
                  <div className="text-foreground text-2xl font-bold">0</div>
                  <div className="text-muted-foreground text-sm">Yorum</div>
                </div>
                <div className="text-center">
                  <div className="text-foreground text-2xl font-bold">0</div>
                  <div className="text-muted-foreground text-sm">Beğeni</div>
                </div>
                <div className="text-center">
                  <div className="text-foreground text-2xl font-bold">0</div>
                  <div className="text-muted-foreground text-sm">Katkı</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Son Aktiviteler</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-muted-foreground py-8 text-center">
              <p>Henüz aktivite bulunmuyor.</p>
              <p className="mt-2 text-sm">Yazı yazmaya başladığınızda burada görünecek.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
