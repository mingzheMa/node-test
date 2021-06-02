-- 左右关联，如果关联目标不存在则会创建一行数据
SELECT * 
FROM company as c LEFT JOIN department as d ON d.companyId=c.id

SELECT * 
FROM company as c RIGHT JOIN department as d ON d.companyId=c.id

-- 内联
SELECT c.name as "公司", d.name as "部门", e.name as "姓名"
FROM company as c INNER JOIN department as d ON d.companyId=c.id INNER JOIN employee as e ON e.deptId=d.id