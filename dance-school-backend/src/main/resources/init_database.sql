INSERT INTO courses (direction, instructor, styles, schedule, more_info_link) VALUES
('F', 'Дарья Хандогина', 'Vogue, Jazz Funk, Experimental, Frame Up, Hip-hop, High Heels', 'пн / ср / пт', 'https://m.vk.com/@freemotion-f'),
('K', 'Лилия Аглиуллина', 'K-Pop, Experimental, Hip-hop', 'вт/ чт', 'https://m.vk.com/@freemotion-k'),
('C', 'Екатерина Сошникова', 'Hip-Hop, Experimental', 'вт/чт', 'https://m.vk.com/@freemotion-c'),
('V', 'Виктория Еремеева', 'Hip-Hop, Jazz Funk, High Heels', 'ср/пт', 'https://m.vk.com/@freemotion-vi'),
('R', 'Ярослав Руди', 'Hip-hop, Popping, Experimental, House, Krump', 'пн / ср / пт', 'https://m.vk.com/@freemotion-r'),
('L', 'Елизавета Воротова', 'Hip-hop, Vogue, Experimental, Авторская хореография', 'пн / чт / сб', 'https://m.vk.com/@freemotion-l'),
('N', 'Анастасия Липина', 'Experimental, Hip-hop, Vogue', 'пн / ср / пт', 'https://m.vk.com/@freemotion-n'),
('G', 'Мария Глубина', 'Contemporary, Hip-hop, Experimental', 'вт / чт / сб', 'https://m.vk.com/@freemotion-gg');

-- Вставка данных в таблицу course_levels
INSERT INTO course_levels (course_id, level) VALUES
(1, 'Начинающие / продвинутые с 18:00 до 19:00'),
(1, 'Frame Up Strip с 19:00 до 20:15'),
(1, 'Продвинутые / полупрофессионалы с 20:15 до 21:45'),
(2, 'Начинающие с 19:00 до 20:15'),
(2, 'Продвинутые / полупрофессионалы с 20:15 до 21:45'),
(3, 'Начинающие с 18:30 до 19:30'),
(3, 'Начинающие / продвинутые с 19:30 до 20:30'),
(3, 'Продвинутые с 20:30 до 21:30'),
(4, 'Начинающие / продвинутые с 17:00 до 18:00'),
(4, 'Начинающие с 18:00 до 19:00'),
(5, 'Начинающие с 19:00 до 20:00'),
(5, 'Начинающие / продвинутые с 20:00 до 21:00'),
(6, 'Начинающие с 18:00 до 19:00 / с 17:30 до 18:30 / 18:00 до 19:30'),
(7, 'Начинающие с 17:00-18:00'),
(8, 'Начинающие с 10:30 до 12:00'),
(8, 'Продвинутые / полупрофессионалы с 16:30 до 18:00 / с 16:30 до 18:00 / с 19:30 до 21:00'),
(8, 'Начинающие / продвинутые с 18:00 до 19:00 / с 18:00 до 19:00 / с 18:30 до 19:30');