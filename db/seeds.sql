INSERT INTO departments (department_name)
VALUES
    ('IT'),
    ('HR'),
    ('Marketing'),
    ('Sales'),
    ('Production');

INSERT INTO job (title, salary, department_id)
VALUES
    ('HR Coordinator', 10, 2),
    ('Production Analyst', 10, 5),
    ('Production Supervisor', 10, 5),
    ('Salesman', 10, 4),
    ('IT Engineer', 10, 1);

INSERT INTO employee (first_name, last_name, job_id, manager_id, department_id)
VALUES
    ('John', 'Seed', 1, 2, 2),
    ('Samantha', 'Shaw', 3, 1, 5),
    ('Colton', 'Crow', 4, 1, 4),
    ('Debbie', 'Dolphin', 5, 3, 1),
    ('Ed', 'Eddy', 5, 3, 1),
    ('Fanny', 'Flubber', 2, 6, 5),
    ('Gary', 'Gum', 2, 6, 5),
    ('Hillary', 'Hoop', 1, 2, 2),
    ('Isaac', 'Init', 2, 6, 5);
