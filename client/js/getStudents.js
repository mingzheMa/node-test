const pageDom = document.getElementById("page");
const pagesizeDom = document.getElementById("pagesize");
const getStudentsBtnDom = document.getElementById("getStudentsBtn");
const studentsDom = document.getElementById("students");

getStudentsBtnDom.addEventListener("click", async () => {
  try {
    const res = await axios.get("/api/student", {
      params: {
        page: pageDom.value,
        limit: pagesizeDom.value
      }
    });

    studentsDom.innerHTML = "";
    res.data.rows.forEach(r => {
      const li = document.createElement("li");
      li.innerText = `name：${r.name}；age：${r.age}；class_id：${r.class_id}`;
      studentsDom.appendChild(li);
    });
  } catch (error) {
    if (error.response.status === 401) {
      studentsDom.innerHTML = "pleace login";
    }
  }
});
