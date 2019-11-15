CREATE TABLE users (
	userId SERIAL PRIMARY KEY,
	firstName varchar(255) NOT NULL,
    lastName varchar(255),
    email varchar(255) NOT NULL,
    password varchar(255) NOT NULL,
    gender varchar(255) NOT NULL,
    jobRole varchar(255) NOT NULL,
    department varchar(255) NOT NULL,
    address varchar(255) NOT NULL
);


   CREATE TABLE commentGif(
    commentId SERIAL PRIMARY KEY,
	gifId varchar(255),
    comment varchar(255),
    createdon varchar(255)
);


    CREATE TABLE articles (
    articleid SERIAL,
    title varchar(255) NOT NULL,
    article varchar(255) NOT NULL,
    PRIMARY KEY (articleid)
    );

    CREATE TABLE commentarticle (
    commentid SERIAL,
    articleid varchar(255) NOT NULL,
    comment varchar(255),
    createdon varchar(255),

    PRIMARY KEY (commentid)
    );

    CREATE TABLE gifs (
    gifid SERIAL,
    image varchar(255),
    title varchar(255),
    createdon varchar(255),

    PRIMARY KEY (gifid)
    );