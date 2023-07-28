const API_URL = import.meta.env.VITE_NASA_URL_ROVERS;
const API_KEY = import.meta.env.VITE_NASA_API_KEY;

export function formatDate(inputDate) {
  const parts = inputDate.split("/"); // parts = ["7", "28", "2023"]
  const day = parts[1];
  const month = parts[0];
  const year = parts[2];

  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
}

export function buildQuery(queryData) {
  const { rover, camera, earthDate, solDate } = queryData;

  const queryParams = [];

  // Agregar parámetros de acuerdo a las condiciones
  if (earthDate && earthDate !== "") {
    queryParams.push(`earth_date=${earthDate}`);
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