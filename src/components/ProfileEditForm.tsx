"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import UserAvatar from "@/components/UserAvatar";
import { ArrowLeft, Save, User } from "lucide-react";
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

type ProfileEditFormProps = {
  user: SessionUser;
  profile: UserProfile | null;
};

export default function ProfileEditForm({ user, profile }: ProfileEditFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    displayName: user.displayName || "",
    bio: profile?.bio || "",
    location: profile?.location || "",
    website: profile?.website || "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Update display name if it changed
      if (formData.displayName !== user.displayName) {
        const displayNameResponse = await fetch("/api/profil/gorunen-ad-guncelle", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ displayName: formData.displayName }),
        });

        await displayNameResponse.json();

        if (!displayNameResponse.ok) {
          throw new Error("Display name güncellenirken bir hata oluştu");
        }
      }

      // Update profile data
      const { displayName: _, ...profileData } = formData;
      const response = await fetch("/api/profil/guncelle", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profileData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Profil güncellenirken bir hata oluştu");
      }

      toast.success("Profil başarıyla güncellendi");
      router.push("/profil");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Beklenmeyen bir hata oluştu";
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto max-w-2xl px-4 py-8">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/profil">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Geri
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Profil Düzenle</h1>
            <p className="text-muted-foreground">Profil bilgilerinizi güncelleyin</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Profile Picture Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <User className="h-5 w-5" />
                Profil Fotoğrafı
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <UserAvatar
                  src={user.avatarUrl}
                  name={formData.displayName || user.displayName}
                  email={user.email}
                  size={80}
                  className="border-border border-2"
                />
                <div>
                  <p className="text-muted-foreground mb-2 text-sm">
                    Profil fotoğrafı güncelleme özelliği yakında eklenecek.
                  </p>
                  <Button variant="outline" size="sm" disabled>
                    Fotoğraf Değiştir
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Temel Bilgiler</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="displayName">Görünen Ad</Label>
                <Input
                  id="displayName"
                  value={formData.displayName}
                  onChange={(e) => handleInputChange("displayName", e.target.value)}
                  placeholder="Görünen adınızı girin"
                  maxLength={100}
                />
                <p className="text-muted-foreground mt-1 text-xs">
                  {formData.displayName.length}/100 karakter
                </p>
              </div>

              <div>
                <Label htmlFor="bio">Biyografi</Label>
                <Textarea
                  id="bio"
                  value={formData.bio}
                  onChange={(e) => handleInputChange("bio", e.target.value)}
                  placeholder="Kendiniz hakkında kısa bir açıklama yazın"
                  rows={4}
                  maxLength={500}
                />
                <p className="text-muted-foreground mt-1 text-xs">
                  {formData.bio.length}/500 karakter
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">İletişim Bilgileri</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="email">E-posta</Label>
                <Input id="email" value={user.email || ""} disabled className="bg-muted" />
                <p className="text-muted-foreground mt-1 text-xs">E-posta adresi değiştirilemez</p>
              </div>

              <Separator />

              <div>
                <Label htmlFor="location">Konum</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => handleInputChange("location", e.target.value)}
                  placeholder="Şehir, Ülke"
                  maxLength={100}
                />
              </div>

              <div>
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  value={formData.website}
                  onChange={(e) => handleInputChange("website", e.target.value)}
                  placeholder="https://example.com"
                  type="url"
                  maxLength={200}
                />
                <p className="text-muted-foreground mt-1 text-xs">
                  Web sitenizin tam URL&apos;sini girin
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex justify-end gap-3">
            <Button variant="outline" asChild>
              <Link href="/profil">İptal</Link>
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Kaydediliyor...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Kaydet
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
