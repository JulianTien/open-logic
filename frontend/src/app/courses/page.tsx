import { AppShell } from "@/components/app-shell";
import { CoursesView } from "@/components/courses-view";
import { getCurrentUser } from "@/lib/auth";
import { getLocale, translate } from "@/lib/i18n";

export default async function CoursesPage() {
  const locale = await getLocale();
  const currentUser = await getCurrentUser();
  const t = (key: string) => translate(locale, key);

  return (
    <AppShell currentUser={currentUser} locale={locale} pathname="/courses">
      <CoursesView
        copy={{
          title: t("courses.panel_eyebrow"),
          subtitle: t("courses.panel_title"),
          loading: t("courses.loading"),
          previous: t("courses.prev"),
          next: t("courses.next"),
          run: t("courses.run"),
          clear: t("courses.clear_code"),
          output: t("courses.output_title"),
          placeholder: t("courses.output_placeholder"),
          running: t("courses.running"),
          noOutput: t("courses.no_output"),
          failed: t("courses.network_failed"),
          python: t("courses.track_python"),
          c: t("courses.track_c"),
          vibe: t("courses.track_vibe"),
          pythonTemplate: t("courses.python_template"),
          cTemplate: t("courses.c_template"),
        }}
      />
    </AppShell>
  );
}
