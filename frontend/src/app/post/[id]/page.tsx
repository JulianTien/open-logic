import { AppShell } from "@/components/app-shell";
import { PostDetailView } from "@/components/post-detail-view";
import { getCurrentUser } from "@/lib/auth";
import { getLocale, translate } from "@/lib/i18n";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function PostDetailPage({ params }: Props) {
  const { id } = await params;
  const locale = await getLocale();
  const currentUser = await getCurrentUser();
  const t = (key: string) => translate(locale, key);

  return (
    <AppShell currentUser={currentUser} locale={locale} pathname={`/post/${id}`}>
      <PostDetailView
        copy={{
          loadFailed: t("post.load_failed"),
          comment: t("post.comment"),
          like: t("post.like"),
          replyTitle: t("post.reply_title"),
          replyPlaceholder: t("post.reply_placeholder"),
          replySubmit: t("post.reply_submit"),
          replyEmpty: t("post.reply_empty"),
          replyFailed: t("post.reply_failed"),
          noDiscussion: t("post.no_discussion"),
          aiInteractive: t("post.ai_interactive"),
        }}
        postId={id}
      />
    </AppShell>
  );
}
