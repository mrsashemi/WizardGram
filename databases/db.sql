CREATE DATABASE artwebsite;

CREATE TABLE users(
    users_id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    hashed_password VARCHAR(100) NOT NULL,
    email VARCHAR(320) NOT NULL UNIQUE,
    username VARCHAR(10) NOT NULL UNIQUE,
    address_id INT,
    phonenumber TEXT UNIQUE,
    date_created DATE NOT NULL DEFAULT CURRENT_DATE,
    date_updated DATE NOT NULL DEFAULT CURRENT_DATE,
    administrator BOOLEAN NOT NULL DEFAULT FALSE, 
    verified BOOLEAN NOT NULL DEFAULT FALSE,
    profile_pic TEXT,
    CONSTRAINT fk_address
        FOREIGN KEY(address_id)
            REFERENCES addresses(address_id)
            ON DELETE SET NULL
);

CREATE TABLE blog_posts(
    blog_id SERIAL PRIMARY KEY,
    theme_id INT NOT NULL,
    title TEXT NOT NULL,
    body TEXT NOT NULL,
    photos TEXT[], 
    users_id INT NOT NULL,
    date_created DATE NOT NULL DEFAULT CURRENT_DATE,
    date_updated DATE NOT NULL DEFAULT CURRENT_DATE,
    CONSTRAINT fk_theme
        FOREIGN KEY(theme_id)
            REFERENCES themes(theme_id)
            ON DELETE CASCADE,
    CONSTRAINT fk_user
        FOREIGN KEY(users_id)
            REFERENCES users(users_id)
            ON DELETE CASCADE
);

CREATE TABLE blog_themes(
    theme_id SERIAL PRIMARY KEY,
    theme_name VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE comments(
    comment_id SERIAL PRIMARY KEY,
    body VARCHAR(500) NOT NULL,
    users_id INT NOT NULL,
    blog_id INT NOT NULL,
    parent_comment_id INT, 
    date_created TIMESTAMPTZ DEFAULT NOW(),
    date_updated TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT fk_user
        FOREIGN KEY(users_id)
            REFERENCES users(users_id)
            ON DELETE CASCADE,
    CONSTRAINT fk_blog
        FOREIGN KEY(blog_id)
            REFERENCES blog_posts(blog_id)
            ON DELETE CASCADE,
    CONSTRAINT fk_parent_comment
        FOREIGN KEY(parent_comment_id)
            REFERENCES comments(comment_id)
            ON DELETE SET NULL
);

CREATE TABLE addresses(
    address_id SERIAL PRIMARY KEY,
    city VARCHAR(50) NOT NULL,
    street VARCHAR(25) NOT NULL,
    state_code VARCHAR(2) NOT NULL,
    zip VARCHAR(10) NOT NULL
);

CREATE TABLE users_addresses(
    users_id INT NOT NULL,
    address_id INT NOT NULL,
    address_type VARCHAR(20) NOT NULL,
    CONSTRAINT fk_address
        FOREIGN KEY(address_id)
            REFERENCES addresses(address_id)
            ON DELETE CASCADE,
    CONSTRAINT fk_user
        FOREIGN KEY(users_id)
            REFERENCES users(users_id)
            ON DELETE CASCADE
)

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
    ON comments
    FOR EACH ROW
        EXECUTE PROCEDURE UPDATE_TIMESTAMP();