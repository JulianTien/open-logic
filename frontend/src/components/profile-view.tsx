"use client";

type User = {
  id: number;
  username: string;
  created_at?: string;
};

type Post = {
  id: number;
  title: string;
  created_at: string;
  tags?: string[];
  likes?: number;
  comments_count?: number;
  has_ai?: boolean;
};

type ProfileViewProps = {
  currentUser: User | null;
  posts: Post[];
  copy: {
    eyebrow: string;
    title: string;
    body: string;
    joinedOn: string;
    posts: string;
    points: string;
    comments: string;
    likes: string;
    empty: string;
    loginRequired: string;
  };
};

export function ProfileView({ currentUser, posts, copy }: ProfileViewProps) {
  const joinedText = !currentUser?.created_at
    ? copy.joinedOn.replace("{date}", "--")
    : copy.joinedOn.replace(
        "{date}",
        new Date(currentUser.created_at).toLocaleDateString(),
      );

  if (!currentUser) {
    return (
      <article className="page-card">
        <h1>{copy.loginRequired}</h1>
      </article>
    );
  }

  return (
    <section className="content-grid">
      <article className="page-card">
        <span className="eyebrow">{copy.eyebrow}</span>
        <h1>{copy.title}</h1>
        <p className="lead">{copy.body}</p>

        <div className="stack">
          {posts.length === 0 ? (
            <p>{copy.empty}</p>
          ) : (
            posts.map((post) => (
              <a className="panel" href={`/post/${post.id}`} key={post.id}>
                <strong>{post.title}</strong>
                <p className="lead">{post.created_at}</p>
                <div className="chip-row">
                  <span className="chip">
                    {copy.comments}: {post.comments_count || 0}
                  </span>
                  <span className="chip">
                    {copy.likes}: {post.likes || 0}
                  </span>
                  {post.has_ai ? <span className="chip">AI</span> : null}
                </div>
              </a>
            ))
          )}
        </div>
      </article>

      <aside className="page-card">
        <div className="auth-card-header">
          <span className="user-badge">
            {currentUser.username[0]?.toUpperCase()}
          </span>
          <h2>{currentUser.username}</h2>
          <p className="lead">{joinedText}</p>
        </div>

        <div className="chip-row">
          <span className="chip">
            {copy.posts}: {posts.length}
          </span>
          <span className="chip">{copy.points}: 0</span>
        </div>
      </aside>
    </section>
  );
}
