const res = await fetch("/api/results-login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password }),
  });
  
  if (res.ok) {
    router.push("/results");
    router.refresh();
  } else {
    alert("Incorrect results password.");
  }