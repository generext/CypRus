--
-- Файл сгенерирован с помощью SQLiteStudio v3.4.4 в Вт фев 6 19:35:35 2024
--
-- Использованная кодировка текста: System
--
PRAGMA foreign_keys = off;
BEGIN TRANSACTION;

-- Таблица: articles
CREATE TABLE IF NOT EXISTS articles (id INTEGER UNIQUE, idCategory INTEGER, idCypr INTEGER, header_ru TEXT, header_eng TEXT, articles_ru TEXT, articles_eng);
INSERT INTO articles (id, idCategory, idCypr, header_ru, header_eng, articles_ru, articles_eng) VALUES (1, 1, 1, 'как легально прогулять уроки', 'kak legalno progulyat uroki', 'напишите егору', 'wtire Egoru');
INSERT INTO articles (id, idCategory, idCypr, header_ru, header_eng, articles_ru, articles_eng) VALUES (2, 1, 2, 'как написать книгу с нуля', 'kak napisat knigu s nulya', 'запаситесь вдохновением', 'ne znayu takih slov');

COMMIT TRANSACTION;
PRAGMA foreign_keys = on;
