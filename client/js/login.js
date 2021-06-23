const usernameDom = document.getElementById("username");
const passwordDom = document.getElementById("password");
const loginBtnDom = document.getElementById("loginBtn");

loginBtnDom.addEventListener("click", async () => {
  const user_name = usernameDom.value;
  const password = passwordDom.value;

  try {
    const res = await axios.post("/api/auth/login", {
      user_name,
      password
    });
    alert(`hellow ${res.data.nick_name}`);
  } catch (error) {
    alert(JSON.stringify(error.response.data.message));
  }
});
