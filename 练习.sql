-- 1. 查询渡一每个部门的员工数量
SELECT
d.`name` as '部门',
COUNT(e.id) as '员工数量'
FROM company as c INNER JOIN department as d ON c.id=d.companyId
INNER JOIN employee as e ON d.id=e.deptId
WHERE c.`name`='渡一教育'
GROUP BY d.name

-- 2. 查询每个公司的员工数量
SELECT
c.`name` as '公司',
COUNT(e.id) as '员工数量'
FROM company as c INNER JOIN department as d ON c.id=d.companyId
INNER JOIN employee as e ON d.id=e.deptId
GROUP BY c.name

-- 3. 查询所有公司5年内入职的居住在万家湾的女员工数量
SELECT
c.`name` as '公司',
COUNT(e.id) as '员工数量'
FROM company as c INNER JOIN department as d ON c.id=d.companyId
INNER JOIN employee as e ON d.id=e.deptId
WHERE TIMESTAMPDIFF(YEAR,e.joinDate,CURDATE())<=5
AND e.ismale=0
AND e.location='万家湾'
GROUP BY c.name

-- 4. 查询渡一所有员工分布在哪些居住地，每个居住地的数量
SELECT
e.location as '地址',
COUNT(e.id) as '员工数量'
FROM company as c INNER JOIN department as d ON c.id=d.companyId
INNER JOIN employee as e ON d.id=e.deptId
WHERE c.`name`='渡一教育'
GROUP BY e.location

-- 5. 查询员工人数大于200的公司信息
SELECT * 
FROM company
WHERE id in (
SELECT
c.id
FROM company as c INNER JOIN department as d ON c.id=d.companyId
INNER JOIN employee as e ON d.id=e.deptId
GROUP BY c.id
HAVING COUNT(e.id)>200
)

-- 6. 查询渡一公司里比独一平均工资高的员工
SELECT
*
FROM company as c INNER JOIN department as d ON c.id=d.companyId
INNER JOIN employee as e ON d.id=e.deptId
WHERE c.`name`='渡一教育'
AND e.salary>(
	SELECT
	AVG(e.salary)
	FROM company as c INNER JOIN department as d ON c.id=d.companyId
	INNER JOIN employee as e ON d.id=e.deptId
	WHERE c.`name`='渡一教育'
)

-- 7. 查询渡一所有名字为两个字和三个字的员工对应人数
SELECT
CHAR_LENGTH(e.`name`) as namelength,
COUNT(e.id)
FROM company as c INNER JOIN department as d ON c.id=d.companyId
INNER JOIN employee as e ON d.id=e.deptId
WHERE c.`name`='渡一教育'
GROUP BY CHAR_LENGTH(e.`name`)
HAVING namelength IN (2,3)

-- 8. 查询每个公司每个月的总支出薪水，并按照从低到高排序
SELECT
c.`name`,
SUM(e.salary) as allsalary
FROM company as c INNER JOIN department as d ON c.id=d.companyId
INNER JOIN employee as e ON d.id=e.deptId
GROUP BY c.`name`
ORDER BY allsalary










