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
    date_created TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    date_updated TIMESTAMPTZ NOT NULL DEFAULT NOW(),
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

CREATE TABLE image_classes(
    class_id SERIAL PRIMARY KEY,
    filter_class TEXT NOT NULL DEFAULT 'no-filter',
    fit_class TEXT NOT NULL DEFAULT 'coverImg', 
    position_x NUMERIC NOT NULL DEFAULT 0,
    position_y NUMERIC NOT NULL DEFAULT 0, 
    scale NUMERIC NOT NULL DEFAULT 1,
    brightness NUMERIC NOT NULL DEFAULT 100,
    contrast NUMERIC NOT NULL DEFAULT 100,
    saturate NUMERIC NOT NULL DEFAULT 100,
    grayscale NUMERIC NOT NULL DEFAULT 0,
    sepia NUMERIC NOT NULL DEFAULT 0,
    hue NUMERIC NOT NULL DEFAULT 0,
    opacity NUMERIC NOT NULL DEFAULT 100,
    blur NUMERIC NOT NULL DEFAULT 0,
    rotate NUMERIC NOT NULL DEFAULT 0,
    vignette BOOLEAN NOT NULL DEFAULT FALSE,
    vignette_class TEXT NOT NULL DEFAULT 'vignette',
    vignette_blur NUMERIC NOT NULL DEFAULT 0,
    vignette_spread NUMERIC NOT NULL DEFAULT 0,
    unedited BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE posts_images(
    img_id INT NOT NULL,
    post_id INT NOT NULL,
    class_id INT NOT NULL,
    CONSTRAINT fk_class
        FOREIGN KEY(class_id)
        REFERENCES image_classes(class_id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
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