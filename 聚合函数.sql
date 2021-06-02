-- 获取所有员工平均工资
SELECT 
AVG(salary)
FROM employee

-- 获取员工总数
SELECT 
COUNT(id)
FROM employee

SELECT
COUNT(id) as '员工数量',
TRUNCATE(AVG(salary),2) as '平均工资',
MAX(salary) as '最高工资',
MIN(salary) as '最低工资',
SUM(salary) as '工资总和'
FROM employee