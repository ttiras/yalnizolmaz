export const AUTH_ROUTES = {
  public: ["/", "/hakkinda", "/iletisim", "/blog"],
  guestOnly: ["/login", "/signup", "/kayit", "/giris"],
  authRequired: ["/profil", "/mesajlar", "/ayarlar"],
};

export function pathStartsWithAny(pathname: string, prefixes: string[]): boolean {
  return prefixes.some((p) => pathname === p || pathname.startsWith(p + "/"));
}
