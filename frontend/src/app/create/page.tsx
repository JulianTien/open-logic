import { AppShell } from "@/components/app-shell";
import { CreateForm } from "@/components/create-form";
import { getCurrentUser } from "@/lib/auth";
import { getLocale, translate } from "@/lib/i18n";

export default async function CreatePage() {
  const locale = await getLocale();
  const currentUser = await getCurrentUser();
  const t = (key: string) => translate(locale, key);

  return (
    <AppShell currentUser={currentUser} locale={locale} pathname="/create">
      <section className="stack">
        <article className="page-card">
          <span className="eyebrow">{t("create.eyebrow")}</span>
          <h1>{t("create.title")}</h1>
          <p className="lead">{t("create.copy")}</p>
        </article>

        <CreateForm
          copy={{
            titleLabel: t("create.field_title_label"),
            titleNote: t("create.field_title_note"),
            titlePlaceholder: t("create.field_title_placeholder"),
            contentLabel: t("create.field_content_label"),
            contentNote: t("create.field_content_note"),
            contentPlaceholder: t("create.field_content_placeholder"),
            tagsLabel: t("create.field_tags_label"),
            tagsNote: t("create.field_tags_note"),
            tagsDefault: t("create.tags_default"),
            submit: t("create.submit"),
            backHome: t("create.back_home"),
            missingTitle: t("create.missing_title"),
            missingContent: t("create.missing_content"),
            missingTag: t("create.missing_tag"),
            publishLoading: t("create.publish_loading"),
            publishSuccess: t("create.publish_success"),
            publishFailed: t("create.publish_failed"),
          }}
        />
      </section>
    </AppShell>
  );
}
