const API_URL = import.meta.env.VITE_NASA_URL_ROVERS;
const API_KEY = import.meta.env.VITE_NASA_API_KEY;

export function buildQuery(queryData) {
  const { rover, camera, earthDate, solDate } = queryData;

  const queryParams = [];

  // Agregar parámetros de acuerdo a las condiciones
  if (earthDate && earthDate !== "") {
    queryParams.push(`earth_date=${earthDate}`);
  }

  if (earthDate === "" && solDate === "") {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() - 1);
    const formattedDate = currentDate.toISOString().slice(0, 10);
    queryParams.push(`earth_date=${formattedDate}`);
  }

  if (solDate && solDate !== "") {
    queryParams.push(`sol=${solDate}`);
  }

  if (camera && camera !== "") {
    queryParams.push(`camera=${camera}`);
  }

  // Construir la query final con los parámetros
  let query = `${API_URL}${rover}/photos`;
  if (queryParams.length > 0) {
    query += `?${queryParams.join("&")}`;
  }

  // Agregar el parámetro 'api_key' siempre
  query += `&api_key=${API_KEY}`;

  return query;
}
