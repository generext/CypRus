--
-- ���� ������������ � ������� SQLiteStudio v3.4.4 � �� ��� 6 19:35:35 2024
--
-- �������������� ��������� ������: System
--
PRAGMA foreign_keys = off;
BEGIN TRANSACTION;

-- �������: articles
CREATE TABLE IF NOT EXISTS articles (id INTEGER UNIQUE, idCategory INTEGER, idCypr INTEGER, header_ru TEXT, header_eng TEXT, articles_ru TEXT, articles_eng);
INSERT INTO articles (id, idCategory, idCypr, header_ru, header_eng, articles_ru, articles_eng) VALUES (1, 1, 1, '��� �������� ��������� �����', 'kak legalno progulyat uroki', '�������� �����', 'wtire Egoru');
INSERT INTO articles (id, idCategory, idCypr, header_ru, header_eng, articles_ru, articles_eng) VALUES (2, 1, 2, '��� �������� ����� � ����', 'kak napisat knigu s nulya', '���������� ������������', 'ne znayu takih slov');

COMMIT TRANSACTION;
PRAGMA foreign_keys = on;
