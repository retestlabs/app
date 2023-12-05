const log_nota_proyecto = async () => {
  let res = await fetch(
    "https://api.utec.edu.pe/academico-api/alumnos/me/course/details",
    {
      method: "POST",
      body: JSON.stringify({
        program: "1",
        period: 883,
        studentKey: null,
      }),
      headers: {
        "Content-Type": "application/json",
        "X-Auth-Token": JSON.parse(localStorage.session).tokenV1,
      },
    }
  );

  if (!res.ok) {
    throw new Error(
      "Ocurrió un error. Vuelve a cargar la página e intenta de nuevo."
    );
  }

  let json = await res.json();

  let course = json.content.find((c) => c.codeCourse === 1571);
  let score = course.scores.find((s) => s.code === "EPR 1");

  console.log({
    hora_ultima_revision: new Date(json.timestamp).toLocaleTimeString("es-PE", {
      hour12: false,
    }),
    nota_proyecto: score.score,
  });
}

// call the function every 30 seconds
setInterval(log_nota_proyecto, 30000);