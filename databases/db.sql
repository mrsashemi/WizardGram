CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    first_name NVARCHAR(100) NOT NULL,
    last_name NVARCHAR(100) NOT NULL,
    hashed_password NVARCHAR(100) NOT NULL,
    email NVARCHAR(320) NOT NULL UNIQUE,
    username NVARCHAR(100) NOT NULL UNIQUE,
    address_id INT,
    date_created DATE NOT NULL DEFAULT CURRENT_DATE,
    date_updated DATE NOT NULL DEFAULT CURRENT_DATE,
    administrator BOOLEAN NOT NULL DEFAULT FALSE, 
    profile_pic TEXT,
    CONSTRAINT fk_address
        FOREIGN KEY(address_id)
            REFERENCES addresses(id)
            ON DELETE SET NULL
);

CREATE TABLE blog_posts(
    id SERIAL PRIMARY KEY,
    theme_id INT NOT NULL,
    title TEXT NOT NULL,
    body TEXT NOT NULL,
    photos TEXT[], 
    users_id INT NOT NULL,
    date_created DATE NOT NULL DEFAULT CURRENT_DATE,
    date_updated DATE NOT NULL DEFAULT CURRENT_DATE,
    CONSTRAINT fk_theme
        FOREIGN KEY(theme_id)
            REFERENCES themes(id)
            ON DELETE CASCADE,
    CONSTRAINT fk_user
        FOREIGN KEY(users_id)
            REFERENCES users(id)
            ON DELETE CASCADE
);

CREATE TABLE blog_themes(
    id SERIAL PRIMARY KEY,
    theme_name NVARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE comments(
    id SERIAL PRIMARY KEY,
    body NVARCHAR(500) NOT NULL,
    users_id INT NOT NULL,
    blog_id INT NOT NULL,
    parent_comment_id INT, 
    date_created TIMESTAMPTZ DEFAULT NOW(),
    date_updated TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT fk_user
        FOREIGN KEY(users_id)
            REFERENCES users(id)
            ON DELETE CASCADE,
    CONSTRAINT fk_blog
        FOREIGN KEY(blog_id)
            REFERENCES blog_posts(id)
            ON DELETE CASCADE,
    CONSTRAINT fk_parent_comment
        FOREIGN KEY(parent_comment_id)
            REFERENCES comments(id)
            ON DELETE SET NULL
);

CREATE TABLE addresses(
    id SERIAL PRIMARY KEY,
    users_id INT NOT NULL,
    city NVARCHAR(50) NOT NULL,
    street NVARCHAR(25) NOT NULL,
    state_code NVARCHAR(2) NOT NULL,
    zip NVARCHAR(10) NOT NULL,
    CONSTRAINT fk_user
        FOREIGN KEY(users_id)
            REFERENCES users(id)
            ON DELETE CASCADE
);

CREATE OR REPLACE FUNCTION UPDATE_DATE()
    RETURNS TRIGGER
    LANGUAGE PLPGSQL
AS $$
BEGIN 
    NEW.date_updated = CURRENT_DATE;
    RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION UPDATE_TIMESTAMP()
    RETURNS TRIGGER
    LANGUAGE plpgsql
AS $$
BEGIN 
    NEW.date_updated = NOW();
    RETURN NEW;
END;
$$;

CREATE TRIGGER update_blog_date
    BEFORE UPDATE 
    ON blog_posts
    FOR EACH ROW
        EXECUTE PROCEDURE UPDATE_DATE();

CREATE TRIGGER update_users_date
    BEFORE UPDATE 
    ON users
    FOR EACH ROW
        EXECUTE PROCEDURE UPDATE_DATE();

CREATE TRIGGER update_users_date
    BEFORE UPDATE 
    ON users
    FOR EACH ROW
        EXECUTE PROCEDURE UPDATE_TIMESTAMP();