import { AppShell } from "@/components/app-shell";
import { ProfileView } from "@/components/profile-view";
import { getCurrentUser } from "@/lib/auth";
import { getLocale, translate } from "@/lib/i18n";
import { getAppOrigin } from "@/lib/app-origin";

type Post = {
  id: number;
  title: string;
  created_at: string;
  tags?: string[];
  likes?: number;
  comments_count?: number;
  has_ai?: boolean;
};

async function getPosts(userId: number): Promise<Post[]> {
  const appOrigin = await getAppOrigin();
  const response = await fetch(`${appOrigin}/api/posts?user_id=${userId}`, {
    cache: "no-store",
  });
  if (!response.ok) return [];
  const payload = (await response.json()) as { data?: Post[] };
  return payload.data ?? [];
}

export default async function ProfilePage() {
  const locale = await getLocale();
  const currentUser = await getCurrentUser();
  const posts = currentUser ? await getPosts(currentUser.id) : [];
  const t = (key: string, vars?: Record<string, string | number>) =>
    translate(locale, key, vars);

  return (
    <AppShell currentUser={currentUser} locale={locale} pathname="/profile">
      <ProfileView
        copy={{
          eyebrow: t("profile.eyebrow"),
          title: t("profile.title"),
          body: t("profile.copy"),
          joinedOn: t("profile.joined_on", { date: "{date}" }),
          posts: t("profile.posts"),
          points: t("profile.points"),
          comments: t("profile.comments"),
          likes: t("profile.likes"),
          empty: t("profile.empty"),
          loginRequired: t("auth.enter_credentials"),
        }}
        currentUser={currentUser}
        posts={posts}
      />
    </AppShell>
  );
}
