-- 1.以公司为单位举办一场比赛
-- 查询出对战表
SELECT c1.name as '主场', c2.name as '客场'
FROM company as c1,company as c2 
WHERE c1.id != c2.id
ORDER BY c1.name

-- 2. 显示出所有员工的姓名、性别（使用男或女显示）、入职时间、薪水、所属部门（显示部门名称）、所属公司（显示公司名称）
SELECT 
e.`name` as '姓名',
CASE 
	WHEN e.ismale=1 THEN '男'
	ELSE '女'
END as '性别',
e.joinDate as '入职时间',
e.salary as '薪水',
d.`name` as '部门',
c.`name` as '公司'
FROM employee as e INNER JOIN department as d ON e.deptId=d.id
INNER JOIN company as c ON d.companyId=c.id

-- 3. 查询腾讯和蚂蚁金服的所有员工姓名、性别、入职时间、部门名、公司名
SELECT 
e.`name` as ename,
CASE 
	WHEN e.ismale=1 THEN '男'
	ELSE '女'
END as eismale,
e.joinDate as ejoindate,
d.`name` as dname,
c.`name` as cname
FROM company as c INNER JOIN department as d ON c.id=d.companyId
INNER JOIN employee as e ON d.id=e.deptId
WHERE c.`name` IN ('腾讯科技','蚂蚁金服')

-- 4. 查询渡一教学部的所有员工姓名、性别、入职时间、部门名、公司名
SELECT 
e.`name` as ename,
CASE 
	WHEN e.ismale=1 THEN '男'
	ELSE '女'
END as eismale,
e.joinDate as ejoindate,
d.`name` as dname,
c.`name` as cname
FROM company as c INNER JOIN department as d ON c.id=d.companyId
INNER JOIN employee as e ON d.id=e.deptId
WHERE c.`name`="渡一教育"
AND d.name="教学部"

-- 5. 列出所有公司员工居住的地址（要去掉重复）
SELECT 
location
FROM employee
WHERE location IS NOT NULL
GROUP BY location

SELECT 
DISTINCT location
FROM employee
WHERE location IS NOT NULL

