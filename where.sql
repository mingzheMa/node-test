-- 单条件
SELECT * FROM employee WHERE ismale=1

-- 多条件
SELECT * FROM employee 
WHERE ismale=1
AND salary>10000

-- 枚举
SELECT * FROM employee
WHERE location in ("天府三街","春熙路")

-- 为空
SELECT * FROM employee
WHERE location is NULL

-- 不为空
SELECT * FROM employee
WHERE location is NOT NULL

-- 范围
SELECT * FROM employee
WHERE salary BETWEEN 10000 AND 11000

-- 模糊匹配
SELECT * FROM employee
WHERE name LIKE "%袁%"
-- 匹配头
SELECT * FROM employee
WHERE name LIKE "袁%"
-- 匹配尾
SELECT * FROM employee
WHERE name LIKE "%袁"
-- 匹配头后只有一个字符
SELECT * FROM employee
WHERE name LIKE "袁_"
-- 匹配头后只有两个字符
SELECT * FROM employee
WHERE name LIKE "袁__"

-- 组合拳
SELECT * FROM employee
WHERE name LIKE "张%"
AND ismale=0
AND salary>=10000