const login = async () => {

  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email,
      password
    })
  });

  const data = await res.json();

  if (res.ok) {

    localStorage.setItem("user", JSON.stringify(data.user));

    if (data.user.role === "admin") {
      router.push("/admin/dashboard");
    } else {
      router.push("/");
    }

  } else {
    alert(data.message);
  }

};