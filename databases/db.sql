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
    user_id INT NOT NULL,
    date_created DATE NOT NULL DEFAULT CURRENT_DATE,
    date_updated DATE NOT NULL DEFAULT CURRENT_DATE,
    CONSTRAINT fk_theme
        FOREIGN KEY(theme_id)
            REFERENCES themes(id)
            ON DELETE CASCADE,
    CONSTRAINT fk_user
        FOREIGN KEY(user_id)
            REFERENCES users(id)
            ON DELETE CASCADE
);

CREATE TABLE blog_themes(
    id SERIAL PRIMARY KEY,
    theme_name NVARCHAR(50) NOT NULL UNIQUE
);



