-- Esquema inicial de ConectaUCE. Los cambios futuros deben agregarse como nuevas migraciones.

CREATE TABLE app_user (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    institutional_email VARCHAR(254) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(160) NOT NULL,
    faculty VARCHAR(120),
    career VARCHAR(120),
    biography VARCHAR(500),
    avatar_url TEXT,
    email_verified BOOLEAN NOT NULL DEFAULT FALSE,
    account_status VARCHAR(20) NOT NULL DEFAULT 'PENDING',
    role VARCHAR(20) NOT NULL DEFAULT 'STUDENT',
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT ck_app_user_status CHECK (account_status IN ('PENDING', 'ACTIVE', 'SUSPENDED', 'DELETED')),
    CONSTRAINT ck_app_user_role CHECK (role IN ('STUDENT', 'MODERATOR', 'ADMIN'))
);

CREATE TABLE post (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    author_id UUID NOT NULL REFERENCES app_user(id),
    content TEXT NOT NULL,
    visibility VARCHAR(20) NOT NULL DEFAULT 'UNIVERSITY',
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT ck_post_visibility CHECK (visibility IN ('UNIVERSITY', 'FACULTY')),
    CONSTRAINT ck_post_content_length CHECK (char_length(content) BETWEEN 1 AND 5000)
);
CREATE INDEX idx_post_created_at ON post (created_at DESC);
CREATE INDEX idx_post_author_id ON post (author_id);

CREATE TABLE post_comment (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    post_id UUID NOT NULL REFERENCES post(id) ON DELETE CASCADE,
    author_id UUID NOT NULL REFERENCES app_user(id),
    content VARCHAR(1500) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT ck_post_comment_content CHECK (char_length(content) BETWEEN 1 AND 1500)
);
CREATE INDEX idx_post_comment_post_id ON post_comment(post_id, created_at);

CREATE TABLE post_reaction (
    post_id UUID NOT NULL REFERENCES post(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES app_user(id) ON DELETE CASCADE,
    reaction_type VARCHAR(20) NOT NULL DEFAULT 'LIKE',
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (post_id, user_id),
    CONSTRAINT ck_post_reaction_type CHECK (reaction_type IN ('LIKE', 'SUPPORT', 'CELEBRATE'))
);

CREATE TABLE forum_category (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(80) NOT NULL UNIQUE,
    description VARCHAR(300),
    active BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE forum_question (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    author_id UUID NOT NULL REFERENCES app_user(id),
    category_id UUID NOT NULL REFERENCES forum_category(id),
    title VARCHAR(180) NOT NULL,
    content TEXT NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'OPEN',
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT ck_forum_question_status CHECK (status IN ('OPEN', 'RESOLVED', 'CLOSED'))
);
CREATE INDEX idx_forum_question_category_created ON forum_question(category_id, created_at DESC);

CREATE TABLE forum_answer (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    question_id UUID NOT NULL REFERENCES forum_question(id) ON DELETE CASCADE,
    author_id UUID NOT NULL REFERENCES app_user(id),
    content TEXT NOT NULL,
    is_accepted BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_forum_answer_question_created ON forum_answer(question_id, created_at);

CREATE TABLE forum_answer_vote (
    answer_id UUID NOT NULL REFERENCES forum_answer(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES app_user(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (answer_id, user_id)
);

INSERT INTO forum_category (name, description) VALUES
    ('Materias', 'Preguntas sobre asignaturas y contenidos académicos'),
    ('Tareas', 'Ayuda y orientación sobre tareas y proyectos'),
    ('Trámites', 'Consultas sobre procesos y gestiones universitarias'),
    ('Facultades', 'Información y dudas específicas de cada facultad')
ON CONFLICT (name) DO NOTHING;
