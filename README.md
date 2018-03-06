# Task-node.js
## Задание
1. таблица user - поля: (firstName, lastName, image(binary), pdf(binary))
2. сделать веб сервис в который подается firstName
3. далее функция находит пользователя в базе по firstName
a. генерит pdf файл вида firstName + lastName + image
4. сохраняет pdf файл в поле pdf базы данных- возвращает пользователю результат   в виде JSON (true/false).
5. Залить решение на гит, прислать ссылку.
##
БД использовалась MySQL(``login:"root", pass:""``)

В таблице уже есть 3 записи с заполнеными столбцами firstName, lastName и image. В качестве примера в первой строке заполнен столбец pdf
