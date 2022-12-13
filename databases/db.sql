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
    refresh_token TEXT,
    CONSTRAINT fk_address
        FOREIGN KEY(address_id)
            REFERENCES addresses(address_id)
            ON DELETE SET NULL
);

CREATE TABLE posts(
    post_id SERIAL PRIMARY KEY,
    theme_id INT,
    post_type TEXT NOT NULL,
    title TEXT NOT NULL,
    body TEXT NOT NULL,
    users_id INT NOT NULL,
    date_created DATE NOT NULL DEFAULT CURRENT_DATE,
    date_updated DATE NOT NULL DEFAULT CURRENT_DATE,
    CONSTRAINT fk_theme
        FOREIGN KEY(theme_id)
            REFERENCES posts_themes(theme_id)
            ON UPDATE CASCADE,
    CONSTRAINT fk_user
        FOREIGN KEY(users_id)
            REFERENCES users(users_id)
            ON UPDATE CASCADE
            ON DELETE CASCADE
);

CREATE TABLE images(
    img_id SERIAL PRIMARY KEY,
    img_location TEXT NOT NULL,
    img_key TEXT
);

CREATE TABLE posts_images(
    img_id INT NOT NULL,
    post_id INT NOT NULL,
    CONSTRAINT fk_img
        FOREIGN KEY(img_id)
        REFERENCES images(img_id)
        ON UPDATE CASCADE,
    CONSTRAINT fk_post
        FOREIGN KEY (post_id)
        REFERENCES posts(post_id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    CONSTRAINT img_posts_id 
        PRIMARY KEY (img_id, post_id)
);

CREATE TABLE posts_themes(
    theme_id SERIAL PRIMARY KEY,
    theme_name VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE comments(
    comment_id SERIAL PRIMARY KEY,
    body VARCHAR(500) NOT NULL,
    users_id INT NOT NULL,
    posts_id INT NOT NULL,
    parent_comment_id INT, 
    date_created TIMESTAMPTZ DEFAULT NOW(),
    date_updated TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT fk_user
        FOREIGN KEY(users_id)
            REFERENCES users(users_id)
            ON UPDATE CASCADE
            ON DELETE CASCADE,
    CONSTRAINT fk_posts
        FOREIGN KEY(posts_id)
            REFERENCES posts(posts_id)
            ON UPDATE CASCADE
            ON DELETE CASCADE,
    CONSTRAINT fk_parent_comment
        FOREIGN KEY(parent_comment_id)
            REFERENCES comments(comment_id)
            ON DELETE CASCADE
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

CREATE TRIGGER update_posts_date
    BEFORE UPDATE 
    ON posts_posts
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